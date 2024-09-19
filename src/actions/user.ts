'use server'

import { getUserById } from "@/services/User"

export const currentUser = async(id: number) => {
    try{
        const user = await getUserById(id)

        if(!user) return {message: "Nenhum"}
    }catch(error){
        console.log(error)
    }
}