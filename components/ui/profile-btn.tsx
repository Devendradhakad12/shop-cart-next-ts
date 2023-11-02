'use client'

import { userProps } from '@/lib/props'
import axios from 'axios'
import { LogIn, User } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const ProfileBtn = ({ token }: { token: string }) => {
    const [user, setUser] = useState<userProps>()
   
    useEffect(() => {
        async function getUser() {
            try {
                const res = await axios.get("/api/auth/user");
                const user = await res.data;
                setUser(user)

            } catch (error) {
                console.log(error)
            }
        }
        if (token) getUser()
        if (!token) setUser(undefined)
    }, [token])
    return (
        <>
            {
                token ? <div ><Link href={"/profile"} className='flex' ><User />{user && user?.name}</Link></div> : <div className='df'>  <Link href={"/login"}>Login</Link> <LogIn /></div>
            }
        </>
    )
}

export default ProfileBtn
