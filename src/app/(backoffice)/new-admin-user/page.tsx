import { allUsersAdmin } from '@/actions/userAdmin'
import TableUserAdmin from '@/components/table-user-admin'
import { IUseradmin } from '@/interfaces/IUseradmin'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const NewAdminUser = async() => {
  const users = await allUsersAdmin() as unknown as IUseradmin[]

  return (
    <div>
        <h1 className={cn("h1-semi-bold")}>Usuários Administradores</h1>
        <div className={cn("w-full flex justify-end")}>
            <Link
                href="/new-admin-user/create"
                className={cn("bg-green-500 p-2 rounded-md text-white")}
            >Criar Administrador</Link>
        </div>
        <TableUserAdmin
          users={users}
        />
    </div>
  )
}

export default NewAdminUser