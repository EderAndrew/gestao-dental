import 'server-only'
import { compareCrypt } from "@/components/utils/cryptoHash"
import { userAdminLogin } from "@/services/UserAdmin"
import { createSession, deleteSession } from './session'
import { redirect } from 'next/navigation'

type LoginProps = {
    email: string
    password: string
}

export const signupAdmin = async(formData: LoginProps) => {
    try{
        const data = await userAdminLogin(formData.email)

        if(!data) return { message: "Email ou senha invalidos", status: 500, user: null }

        const hashedPassword = await compareCrypt(formData.email, data.password)

        if(!hashedPassword) return { message: "Email ou senha invalidos", status: 500, user: null }

        //TODO: Criar sessão
        const payload = {
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role,
            status: data.status,
        }

        await createSession(payload)
        
        redirect('/dashboard')
    }catch(error){
        console.log(error)
    }    
}

export const logout = async() => {
    deleteSession()
    redirect('/login')
}