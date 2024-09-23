'use client'
import { cn } from '@/lib/utils'
import React from 'react'
import IconLogOut from '../../public/assets/icons/IconLogout'
import { logout } from '@/actions/auth'

const MenuOffice = () => {

    const handlerLogout = async() => {
        window.sessionStorage.clear()
        await logout()
    }
  return (
    <>
        <section className={cn(`transition-all ease-in-out flex flex-col justify-between items-center pb-8 w-14 h-screen hover:w-36 bg-[#6DE7F7] text-white`)}>
            <div>...</div>
            <div
                className={cn(`flex p-2 hover:cursor-pointer hover:bg-[#1965B3] hover:border hover:rounded-md hover:border-[#1965B3]`)}
                onClick={handlerLogout}
            >
                <IconLogOut width={20} height={20} />
            </div>
        </section>
        
    </>
  )
}

export default MenuOffice