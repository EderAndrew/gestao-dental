import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const Dashboard = () => {
  return (
    <div>
        <h1 className={cn("text-2xl font-semibold")}>Consultórios Dentários</h1>
        <div className={cn("mt-4 w-full flex justify-end")}>
            <Link
                href="/new-office"
                className={cn("bg-green-500 text-white p-2 rounded-md")}
            >novo consultório</Link>
        </div>
        <div>
            Tabela de consultórios
        </div>
    </div>
  )
}

export default Dashboard