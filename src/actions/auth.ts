'use server'
import { compareCrypt } from "@/components/utils/cryptoHash"
import { userAdminLogin } from "@/services/UserAdmin"
import { createSession, deleteSession } from '../lib/session'
import { redirect } from 'next/navigation'

type LoginProps = {
    email: string
    password: string
}

export const signupAdmin = async(formData: LoginProps) => {
    try{
        
        const data = await userAdminLogin(formData.email)
        
        if(!data) return { message: "Email ou senha invalidos", status: 500, user: null }

        const hashedPassword = await compareCrypt(formData.password, data.password)
        
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
        
        return { message: "Login efetuado com sucesso", status: 200, user: payload }
    }catch(error){
        console.log(error)
    }    
}

export const logout = async() => {
    deleteSession()
    redirect('/login')
}