import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey!)

type Payload = {
    id: number,
    name: string,
    email: string,
    role: string,
    status: boolean,
    officeId?: number
}
export const encryptSession = async(payload:Payload) => {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('8h')
        .sign(encodedKey)
}

export const decryptSession = async(session: string | undefined = '') => {
    try{
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256']
        })

        return payload
    }catch(error){
        console.log("Errro ao verificar a sessão.")
    }
}

export const createSession = async(payload: Payload) => {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encryptSession(payload)

    if(payload.role === 'ADMIN' || payload.role === 'USER') {
        cookies().set('regular_session', session, {
            httpOnly: true,
            secure: true,
            expires: expiresAt,
            sameSite: 'lax',
            path: '/'
        })
        return
    }

    cookies().set('backoffice_session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/'
    })
    
}

export const updateSession = async() => {
    const regular_session = cookies().has('regular_session')
    let session = ""

    if(regular_session) {
        session = cookies().get('regular_session')?.value as string
    }else{
        session = cookies().get('backoffice_session')?.value as string
    }

    const payload = await decryptSession(session)

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