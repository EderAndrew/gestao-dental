import { FormOffice } from '@/components/forms/form-office'
import React from 'react'


const Register = () => {
  return (
    <div className="w-full p-10 flex flex-col items-center">
        <h1 className="title text-3xl font-bold underline">GESTÃO-DENTAL</h1>
        <p className="mt-5 text-lg">Cadastre o seu consultório Dentário e começe hoje mesmo a fazer toda a gestão dos seus pacientes, tratamentos e pagamentos.</p>
        <FormOffice />
    </div>
  )
}

export default Register