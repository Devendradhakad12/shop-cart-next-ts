import { cookies } from 'next/headers'
 

export const tokenValue = () =>{
    const cookieStore = cookies()
    const token =  cookieStore.get("scat")
    return token?.value
} 