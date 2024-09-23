import FormLogin from '@/components/forms/form-login'
import { cn } from '@/lib/utils'
import React from 'react'
import toothIcon from '../../../public/assets/img/dente.png'
import Image from 'next/image'

const Login = () => {
  return (
    <section className="flex justify-between">
      <div className={cn("bg-girl-banner  w-[50%] bg-cover border-r-2 border-blue-light")}>
        <div className={cn("bg-gradient-to-t from-blue-light from-10% to-transparent p-8 flex flex-col justify-between h-screen")}>
          <div className={cn("flex items-center gap-4")}>
            <Image src={toothIcon} alt="tooth icon" className={cn("w-11")} priority={true} quality={100}/>
            <h1 className={cn("text-3xl title font-bold text-gray-100")}>Agenda Dental</h1>
          </div>
          <p className={cn("text-xs text-white")}>H&ADesenvolvimento &copy; 2024 - Todos os direitos reservados.</p>
        </div>
      </div>
      <div className={cn("flex flex-col items-center justify-center h-screen w-[50%]")}>
        <div className={cn("w-[500px]")}>
          <h1 className="text-5xl mb-10 font-bold">Bem vindo 👋</h1>
        </div>
        <FormLogin />
      </div>
    </section>
  )
}

export default Login