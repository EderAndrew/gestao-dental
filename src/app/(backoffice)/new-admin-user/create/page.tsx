import FormNewAdmin from '@/components/form-new-admin'
import { cn } from '@/lib/utils'
import React from 'react'

const CreateUser = () => {
  return (
    <div>
        <h1 className={cn("h1-semi-bold")}>Novo Administrador</h1>
        <div className={cn("w-ful flex justify-center mt-20")}>
            <FormNewAdmin />
        </div>
        
    </div>
  )
}

export default CreateUser