/* eslint-disable @typescript-eslint/no-explicit-any */

import { IUser } from "@/interfaces/IUseradmin"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export const createSessionStorage = async(data: IUser, url: string, router: AppRouterInstance) => {
    
    let userInfo = {}
    if("officeId" in data){
        userInfo = {
            id: data.id as number,
            name: data.name as string,
            email: data.email as string,
            officeId: data.officeId as string,
            role: data.role as string
        }
        sessionStorage.setItem("regular_user", JSON.stringify(userInfo))
    }else{
        userInfo = {
            id: data.id as number,
            name: data.name as string,
            email: data.email as string,
            role: data.role as string
        }
        sessionStorage.setItem("backoffice_user", JSON.stringify(userInfo))
    }
   

    
    router.push(url)
}
