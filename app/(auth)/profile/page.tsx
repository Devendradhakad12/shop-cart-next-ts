'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const ProfilePage = () => {

    const [user, setUser] = useState()
    const router = useRouter()
  //  console.log(user)
 
    // logout function
    const logoutHandler = async () => {
        await axios.post("/api/auth/logout")
        toast.success("loggedout")
        router.refresh()
        router.push("/")
    }


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

        getUser()

    }, [])


    return (
        <div>
            <button onClick={logoutHandler}>Logout</button>
            
        </div>
    )
}

export default ProfilePage
