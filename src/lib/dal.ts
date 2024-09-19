import 'server-only'
import { cookies } from 'next/headers'
import { decrypt } from './session'
import { cache } from 'react'
import { redirect } from 'next/navigation'

export const verifySession = cache(async() => {
    const regular_session = cookies().has('regular_session')
    
    if(regular_session){
        return cookiesInformation('regular_session')
    }

    return cookiesInformation('backoffice_session')

})

export const cookiesInformation = async(name: string) => {
    const cookie = cookies().get(name)?.value as string
        const session = await decrypt(cookie)

        if(!session?.id) {
            redirect('/login')
        }

        return { isAuth: true, user: session }
}