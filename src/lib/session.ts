import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { postAdminSession } from '@/services/UserAdmin'

const secret = new TextEncoder().encode(process.env.SESSION_SECRET)

type Payload = {
    id: number,
    role: string,
}
export const encrypt = async(payload:Payload) => {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('8h')
        .sign(secret)
}

export const decrypt = async(cookie: string) => {
    try{
        const { payload } = await jwtVerify(cookie, secret, { })
        return payload
    }catch(error){
        if(error instanceof Error){
            if(error.message === '\"exp\" claim timestamp check failed'){
                return {message: "Tempo de sessão expirou. Por favor, faca login novamente.", status: 400}
                
            }

            console.log(`${error.message}`)
        }
        
    }
}

export const createSession = async(payload: Payload) => {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const createdAt = new Date().toISOString()
    const session = await encrypt(payload)
    
    if(payload.role === 'ADMIN' || payload.role === 'USER') {
        await cookieSession('regular_session', createdAt, session, expiresAt, payload.id)
    }

    await cookieSession('backoffice_session', createdAt, session, expiresAt, payload.id)

}

export const updateSession = async() => {
    const regular_session = cookies().has('regular_session')
    let session = ""

    if(regular_session) {
        session = cookies().get('regular_session')?.value as string
    }else{
        session = cookies().get('backoffice_session')?.value as string
    }

    const payload = await decrypt(session)

    if(!session || !payload) return null

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: 'lax',
        path: '/'
    })
}

export const deleteSession = async() => {
    cookies().getAll().forEach(cookie => cookies().delete(cookie.name))
}

export const cookieSession = async(name_session: string, createdAt: string,  session: string, expiresAt: Date, userId: number) => {
    cookies().set(name_session, session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/'
    })

    if(name_session === 'regular_session') {
        //TODO: CRIAR SESSÃO NO USER NO BANCO
        return
    }

    await postAdminSession(createdAt, createdAt, expiresAt.toISOString(),userId)
}