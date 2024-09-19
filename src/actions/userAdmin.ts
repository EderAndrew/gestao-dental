'user server'
import { IUseradmin } from "@/interfaces/IUseradmin"
import { verifySession } from "@/lib/dal"
import { getUsersAdmin, PostUseradmin } from "@/services/UserAdmin"

export const createUserAdmin = async(data: IUseradmin) => {
    const session = await verifySession()
    if(!session) return null
    try{
        const resp = await PostUseradmin(data)

        return resp
    }catch(error){
        console.log(error)
    }
}

export const allUsersAdmin = async() => {
    const session = await verifySession()
    if(!session) return null
    try{
        const resp = await getUsersAdmin()
        
        return resp
    }catch(error){
        console.log(error)
    }
}

export const currentUserAdmin = async() => {
    const session = await verifySession()
    if(!session) return null
}