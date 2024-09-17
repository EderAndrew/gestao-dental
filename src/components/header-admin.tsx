import { cn } from '@/lib/utils'
import React from 'react'
import Link from 'next/link'

const HeaderAdmin = () => {
  return (
    <header className={cn("w-full h-12 bg-slate-800 px-10 flex items-center justify-between")}>
      <div className={cn("flex gap-8")}>
        <Link href="/dashboard" className={cn("text-white title")}>Gestão Dental</Link>
          <ul className={cn("flex gap-4")}>
            <li>
              <Link href="/dashboard" className={cn("text-white")}>Home</Link>
            </li>
            <li>
              <Link href="/new-admin-user" className={cn("text-white")}>Usuários</Link>
            </li>
          </ul>
      </div>
       
        <Link href="/administrator" className={cn("border border-white text-white text-xs p-2 rounded")}>Logout</Link>
    </header>
  )
}

export default HeaderAdmin