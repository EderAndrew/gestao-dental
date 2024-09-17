'use client'
import { IUseradmin } from '@/interfaces/IUseradmin'
import React from 'react'

type Props = {
    users: IUseradmin[]
}

const TableUserAdmin = ({users}: Props) => {
    console.log("TESTE: ", users)
  return (
    <div>
        ...
    </div>
  )
}

export default TableUserAdmin