import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";
import { decrypt } from "./lib/session";

const protectedRoutes = ['/dashboard', '/patients']
const publicRoutes = ['/login']

export const middleware = async (req: NextRequest) => {
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)
    const regularSession = cookies().has('regular_session')
    /* if(regularSession){
        const cookie = cookies().get('regular_session')?.value
        const session = await decryptSession(cookie)
        const user = JSON.parse(session as unknown as string)

        if(isProtectedRoute && !user?.id){
            return NextResponse.redirect(new URL('/login', req.url))
        }

        if(isPublicRoute && user?.id && !req.nextUrl.pathname.startsWith('/patients')){
            return NextResponse.redirect(new URL('/patients', req.url))
        }

        return NextResponse.next()
    } */

    const cookie = cookies().get('backoffice_session')?.value
    console.log("Cookie: ", cookie)
    const session = await decrypt(cookie)
    const user = JSON.parse(session as unknown as string)
    console.log(user)
/* 
    if(isProtectedRoute && !user?.id){
        return NextResponse.redirect(new URL('/login', req.url))
    }

    if(isPublicRoute && user?.id && !req.nextUrl.pathname.startsWith('/dashboard')){
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next() */
    
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
