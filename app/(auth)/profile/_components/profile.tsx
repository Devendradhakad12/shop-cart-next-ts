'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Profile = () => {
    const router = useRouter()
    const [editinfo,setEditInfo] = useState(false)

 
    // logut handler
    const logoutHandler = async () => {
        await axios.post("/api/auth/logout")
        toast.success("loggedout")
        router.refresh()
      //  router.push("/")
    }
    
    return (

        <div className='flex flex-col gap-2 justify-center items-center'>
            <div className=' bg-slate-800 w-[500px] flex flex-col items-center justify-center shadow-sm shadow-slate-400 py-14 mt-5'>
            <div className='flex gap-5 pb-5'>   <h2 className='text-xl'>Profile Information</h2> <button onClick={()=>setEditInfo(!editinfo)} className='bg-sky-600 px-3 rounded-md font-bold'>Edit</button></div>
                <div>
                  <div className='flex flex-col justify-center items-center gap-5'>
                    <input type="text" className='inputProfile' value={"Name"} readOnly={editinfo} />
                    <input type="email" className='inputProfile' value={"Email"} readOnly={editinfo} />
                  </div>
                </div>
            </div>

            {/* Address info */}
            <div className=' bg-slate-800 w-[500px] flex flex-col items-center justify-center shadow-sm shadow-slate-400 py-14 my-5'>
            <div className='flex gap-5 pb-5'>   <h2 className='text-xl'>Manage Address</h2> <button className='bg-sky-600 px-3 rounded-md font-bold'>Edit</button></div>
                <div>
                  <div className='flex flex-col justify-center items-center gap-5'>
                    <input type="text" className='inputProfile' value={"Name"} readOnly />
                    <input type="email" className='inputProfile' value={"Email"} readOnly />
                    <input type="email" className='inputProfile' value={"Phone"} readOnly />
                  </div>
                </div>
            </div>

            <button className='mb-10' onClick={logoutHandler}>Logout</button>

        </div>
    )
}

export default Profile