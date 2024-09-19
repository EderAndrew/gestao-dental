
import { encrypt } from "@/components/utils/cryptoHash";
import { IUseradmin } from "@/interfaces/IUseradmin";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

export const PostUseradmin = async(data: IUseradmin) => {
    try{
        const haveUser = await prisma.usersAdmin.findUnique({
            where: {
                email: data.email
            }
        })

        if(haveUser){
            return { message: "Usuário ja existe no banco de dados", status: 200 }
        }

        const hash = await encrypt(data.password)

        const user = await prisma.usersAdmin.create({
            data: {
                name: data.name,
                email: data.email,
                password: hash,
                updatedAt: new Date().toISOString(),
            }
        })

        if(!user) {
            return { message: "Erro ao criar o Usuário", status: 500 }
        }

        return { message: "Usuário criado com sucesso", status: 200 }
    }catch(error){
        console.log(error)
    }
}

export const getUsersAdmin = async() => {
    try{
        const data = await prisma.usersAdmin.findMany()

        if(data.length === 0) return { users: [] }

        return { users: data }
    }catch(error){
        console.log(error)
    }
}

export const userAdminLogin = async(email: string) => {
    try{
        const data = await prisma.usersAdmin.findUnique({
            where: {
                email
            }
        })

        return data
    }catch(error){
        console.log(error)
    }
}

export const postAdminSession = async(createdAt: string, updatedAt: string, expiresAt: string, userId: number) => {
    try{
        await prisma.sessionsAdmin.create({
            data: {
                createdAt,
                updatedAt,
                expiresAt,
                userAdminId: userId
            }
        })
    }catch(error){
        console.log(error)
    }
}