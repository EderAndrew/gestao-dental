'use client'
import { cn } from '@/lib/utils'
import React from 'react'
import { useSessionStorage } from './useSessionStorage'

const HeaderOffice = () => {
    const myData = useSessionStorage('regular_user')
    const data = JSON.parse(myData)
  return (
    <div className={cn(`flex w-full h-12 bg-[#f4f6f7] border-b border-gray-300 items-center px-8 justify-between`)}>
        <div className='flex items-center gap-2'>
            <span className="font-semibold text-slate-500">Total de Pacientes: </span>
            <span className="bg-[#E3B79A] px-4 rounded-md text-[#1A4474] font-semibold">89</span>
        </div>
        <div>
            <span className="text-xs text-slate-400">Usuário: {data.name}</span>
        </div>
    </div>
  )
}

export default HeaderOffice