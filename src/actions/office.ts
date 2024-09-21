import { IOfficeSchema } from "@/interfaces/IOfficeSchema";
import { getOffice, postOffice } from "@/services/Offices";

export const createOffice = async(data:IOfficeSchema) => {
    try{
        if(data.password !== data.repeatPassword) return { message: "As senhas devem ser iguais", status: 404 }
        //TODO: VERIFICAR SE JÁ EXISTE ESSE CNPJ CADASTRADO
        const haveOffice = await getOffice(data.cnpj)

        if(haveOffice) return {message: "Já existe um Consultório com esse CNPJ", status: 404}
        
        const resp = await postOffice(data)

        if(!resp) return { message: "Erro ao criar o Consultório.", status: 500 }

        return {message: "Consultório criado com sucesso.", status: 200}
        
    }catch(error){
        if(error instanceof Error){
            console.log(error.message)
        }
    }
}