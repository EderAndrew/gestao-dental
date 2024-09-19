import FormAdminLogin from '@/components/forms/form-admin-login'
import { cn } from '@/lib/utils'
import React from 'react'

const LoginAdmin = () => {
  return (
    <section className={cn("flex flex-col w-screen h-screen justify-center items-center")}>
        <h1 className={cn("title text-2xl font-semibold mb-4")}>Gestão Dental - Admin</h1>
        <FormAdminLogin />
    </section>
  )
}

export default LoginAdmin