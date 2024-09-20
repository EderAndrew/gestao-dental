import { IOfficeSchema } from "@/interfaces/IOfficeSchema"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const postOffice = async(offices: IOfficeSchema) => {
    try{
        const resp = await prisma.offices.create({
            data: {

            }
        })
    }catch(error){
        if(error instanceof Error){
            console.log(error.message)
        }
    }
}