import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const getUserById = async (id: number) => {
    try {
        const resp = await prisma.users.findUnique({
            where: {
                id
            }
        })

        return resp
    }catch(error){
        console.log(error)
    }
}