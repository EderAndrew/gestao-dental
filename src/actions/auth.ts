'use server'
import { compareCrypt } from "@/components/utils/cryptoHash"
import { userLogin } from "@/services/UserAdmin"
import { createSession, deleteSession } from '../lib/session'
import { redirect } from 'next/navigation'
import { IUser, IUseradmin } from "@/interfaces/IUseradmin"

type LoginProps = {
    email: string
    password: string
}

export const signin = async(formData: LoginProps) => {
    try{
        
        const data = await userLogin(formData.email) as IUser | IUseradmin
        
        if(!data) return { message: "Email ou senha invalidos", status: 500, user: null }

        const hashedPassword = await compareCrypt(formData.password, data.password as string)
        
        if(!hashedPassword) return { message: "Email ou senha invalidos", status: 500, user: null }

        //TODO: Criar sessão
        const payload = {
            id: data.id as number,
            role: data.role as string
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