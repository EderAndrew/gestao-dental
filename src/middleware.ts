import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./lib/session";

const protectedRoutes = ['/dashboard', '/offices']
const publicRoutes = ['/login', '/register']

export const middleware = async (req: NextRequest) => {
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)
    const regularSession = cookies().has('regular_session')

    if(regularSession){
        const cookie = cookies().get('regular_session')?.value as string

        if(cookie){
            const session = await decrypt(cookie)
            const expires = new Date(session?.exp as number * 1000).toISOString()
            const dateNow = new Date().toISOString()
            
            if(expires < dateNow){
                cookies().delete('regular_session')
                return NextResponse.redirect(new URL('/login', req.url))
            }
            if(isProtectedRoute && !session?.id){
                return NextResponse.redirect(new URL('/login', req.url))
            }
    
            if(isPublicRoute && session?.id && !req.nextUrl.pathname.startsWith('/offices')){
                return NextResponse.redirect(new URL(`/offices/${session.officeId as string}/home`, req.url))
            }
    
            return NextResponse.next()
        }
       
    }

    const cookie = cookies().get('backoffice_session')?.value as string
    if(cookie){
        const session = await decrypt(cookie)
        const expires = new Date(session?.exp as number * 1000).toISOString()
        const dateNow = new Date().toISOString()

        if(isProtectedRoute && !session?.id){
            return NextResponse.redirect(new URL('/login', req.url))
        }
        if(expires < dateNow){
            cookies().delete('backoffice_session')
            return NextResponse.redirect(new URL('/login', req.url))
        }

        if(isPublicRoute && session?.id && !req.nextUrl.pathname.startsWith('/dashboard')){
            return NextResponse.redirect(new URL('/dashboard', req.url))
        }

        return NextResponse.next()
    }

    return NextResponse.next()
    
    
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
