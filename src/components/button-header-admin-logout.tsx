'use client'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { logout } from '@/actions/auth'

const ButtonHeaderAdminLogout = () => {
    const [userSession, setUserSession] = useState({
        id: 0,
        name: '',
        email: '',
        role: ''
    })
    useEffect(() => {
        (()=>{
            const localSession = sessionStorage.getItem('backoffice_user')
            const user = JSON.parse(localSession as string)
            setUserSession(user)
        })()
    },[])
    const handleLogout = async() => {
        await logout()
        sessionStorage.clear()
    }
  return (
    <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
            <span className="text-xs text-slate-300">{userSession ? userSession?.email : ''}</span>
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
        </div>
        <Button onClick={handleLogout}
            className="bg-transparent border text-white hover:bg-white hover:text-slate-800"
        >
            Logout
        </Button>
    </div>
    
  )
}

export default ButtonHeaderAdminLogout