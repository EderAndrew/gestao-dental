'use server'
import { IUseradmin } from "@/interfaces/IUseradmin"
import { getUsersAdmin, PostUseradmin } from "@/services/UserAdmin"

export const createUserAdmin = async(data: IUseradmin) => {
    try{
        const resp = await PostUseradmin(data)

        return resp
    }catch(error){
        console.log(error)
    }
}

export const allUsersAdmin = async() => {
    try{
        const resp = await getUsersAdmin()
        
        return resp
    }catch(error){
        console.log(error)
    }
}