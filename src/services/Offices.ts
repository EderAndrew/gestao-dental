'use server'
import { IOfficeSchema } from "@/interfaces/IOfficeSchema"
import { Prisma, PrismaClient } from "@prisma/client"
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export const getOffice = async(cnpj: string) => {
    try{
        const office = await prisma.offices.findUnique({
            where: {
                cnpj
            }
        })

        return office
    }catch(error){
        console.log(error)
    }
}

export const postOffice = async(offices: IOfficeSchema) => {
    const includeAddress = true
    let office: Prisma.officesCreateInput
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(offices.password, salt)

    const address: Prisma.addressesCreateWithoutOfficesInput = {
        cep: offices.cep ? offices.cep : "",
        street: offices.street ? offices.street : "",
        complement: offices.complement ? offices.complement : "",
        number: offices.number ? offices.number : "",
        neighborhood: offices.neighborhood ? offices.neighborhood : "",
        city: offices.city ? offices.city : "",
        state: offices.state ? offices.state : "",
        updatedAt: new Date().toISOString()
    };

    const user: Prisma.usersCreateWithoutOfficesInput = {
        name: offices.userName,
        email: offices.email,
        password: hash,
        tel: offices.tel,
        status: true,
        role: "ADMIN",
        updatedAt: new Date().toISOString()
    }
    try{
        if(includeAddress){
            office = {
                identity: offices.identity,
                cnpj: offices.cnpj,
                corporate: offices.corporate,
                name: offices.name,
                tel: offices.tel,
                updatedAt: new Date().toISOString(),
                addresses:{
                    create: address
                },
                users: {
                    create : user
                }
            }
        }else{
            office = {
                identity: offices.identity,
                cnpj: offices.cnpj,
                corporate: offices.corporate,
                name: offices.name,
                tel: offices.tel,
                updatedAt: new Date().toISOString(),
                users: {
                    create : user
                }
            }
        }

        const resp = await prisma.offices.create({
            data: office
         })
        
         return resp
    }catch(error){
        if(error instanceof Error){
            console.log(error.message)
        }
    }
}