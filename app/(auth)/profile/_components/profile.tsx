'use client'

import Loader from '@/components/loader'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Profile = ({ token }: { token: string }) => {
  const router = useRouter()
  const [editinfo, setEditInfo] = useState(true)
  const [userinfo, setUserInfo] = useState({
    username: "",
    email: ""
  })
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    async function getUserInfo() {
      setLoading(true)
      try {
        const res = await axios.get("/api/auth/userinfo")
        setUserInfo({
          username: res.data.username,
          email: res.data.email
        })
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    if (token) getUserInfo()
    if (!token) setUserInfo({
      username: "",
      email: ""
    })
  }, [])

 // console.log(userinfo)


  // logut handler
  const logoutHandler = async () => {
    await axios.post("/api/auth/logout")
    toast.success("loggedout")
    router.refresh()
  }

  const style =  editinfo ? "bg-transparent inputProfile": "inputProfile bg-slate-700" 

  return (

    <>
      {
        loading ? <Loader /> : <>

          {
            userinfo ? <div className='flex flex-col gap-2 justify-center items-center'>
              <div className=' bg-slate-800 w-[500px] flex flex-col items-center justify-center shadow-sm shadow-slate-400 py-14 mt-5'>
                <div className='flex gap-5 pb-5'>   <h2 className='text-xl'>Profile Information</h2> <button onClick={() => { setEditInfo(!editinfo) }} className='bg-sky-600 px-3 rounded-md font-bold'>{!editinfo ? "Done" : "Edit"}</button></div>
                <div>
                  <div className='flex flex-col justify-center items-center gap-5'>
                    <input type="text" className={style} value={userinfo.username} readOnly={editinfo} onChange={(e)=>setUserInfo({...userinfo,username:e.target.value})} />
                    <input type="email" className={style} value={userinfo.email} readOnly={editinfo} onChange={(e)=>setUserInfo({...userinfo,email:e.target.value})}  />
                  </div>
                </div>
              </div>

              {/* Address info */}
              <div className=' bg-slate-800 w-[500px] flex flex-col items-center justify-center shadow-sm shadow-slate-400 py-14 my-5'>
                <div className='flex gap-5 pb-5'>   <h2 className='text-xl'>Manage Address</h2> <button className='bg-sky-600 px-3 rounded-md font-bold'>Edit</button></div>
                <div>
                  <div className='flex flex-col justify-center items-center gap-5'>
                    <input type="text" className='inputProfile bg-transparent' value={"Name"} readOnly />
                    <input type="email" className='inputProfile bg-transparent' value={"Email"} readOnly />
                    <input type="email" className='inputProfile bg-transparent' value={"Phone"} readOnly />
                  </div>
                </div>
              </div>

              <button className='mb-10' onClick={logoutHandler}>Logout</button>

            </div> : <> {!loading && userinfo && <div className='flex justify-center items-center'>Something went wrong</div>}</>
          }

        </>
      }
    </>
  )
}

export default Profile