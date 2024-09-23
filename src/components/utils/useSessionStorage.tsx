import { useEffect, useState } from "react"

export const useSessionStorage = (key: string) => {
    const [value, setValue] = useState('')

    useEffect(() => {
        if(typeof window !== 'undefined') {
            const storedValue = sessionStorage.getItem(key)
            if(storedValue){
                setValue(storedValue)
            }
        }
    }, [key])

    return value
}