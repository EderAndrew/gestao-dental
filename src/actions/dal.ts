import 'server-only'
import { cookies } from 'next/headers'
import { decryptSession } from './session'
import { cache } from 'react'
import { redirect } from 'next/navigation'

export const verifySession = cache(async() => {
    const regular_session = cookies().has('regular_session')
    
    if(regular_session){
        const cookie = cookies().get('regular_session')?.value as string
        const session = await decryptSession(cookie)

        if(!session?.id) {
            redirect('/login')
        }

        return { isAuth: true, user: session }
    }

    const cookie = cookies().get('backoffice_session')?.value as string
    const session = await decryptSession(cookie)

    if(!session?.id) {
        redirect('/login')
    }

    return { isAuth: true, user: session }

})