'use client'

import Loader from '@/components/loader'
import { UserAddress } from '@/lib/props'
import axios from 'axios'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Profile = ({ token }: { token: string }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true) // Show loading when loading user data for the first time
  const [userid, setUserId] = useState("")   // store user id when userdata loaded

  const [editinfo, setEditInfo] = useState(true)   //  Set user and email input fields Readonly when it is true and show Edit complete button and if it is false then show Done Button
  const [editLod, setEditLod] = useState(false)  // show loading (Edit....) when username and email updating
  const [userinfo, setUserInfo] = useState({
    username: "", 
    email: ""
  })
  const [editAddressLod, setEditAddressLod] = useState(false)  // show loading (Edit.... or Add....) when Address adding and updating
  const [editAddress, setEditAddress] = useState(true)   //  show address (p) when it is true and show addresss input fileds when it is false
  const [AddressInfo, setAddressInfo] = useState<UserAddress>({
    name: "",
    mobile: null,
    pincode: null,
    locality: "",
    city: "",
    state: ""
  })


  useEffect(() => {
    async function getUserInfo() {
      setLoading(true)
      try {
        const res = await axios.get("/api/auth/user/userinfo")
        setUserInfo({
          username: res.data.username,
          email: res.data.email
        })
        setUserId(res.data._id)
        setAddressInfo(res.data.address)
        //  console.log(res.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    if (token && !userid) getUserInfo()
    if (!token) {
      setUserInfo({
        username: "",
        email: ""
      })
      setUserId("")
    }
  }, [])



  // profile update handler
  const profileUpdate = async () => {
    setEditInfo(!editinfo)
    if (!editinfo) {
      setEditLod(true)
      try {
        await axios.put(`/api/auth/user/${userid}`, userinfo)
        toast.success("User Data Updated")
      } catch (error) {
        console.log(error)
        toast.error("Something went wrong")
      } finally {
        setEditLod(false)
      }
    }
  }

  // address edit and add  handler
  const addAddressHandler = async (e: FormEvent) => {
    e.preventDefault()

    if (!editAddress) {
      setEditAddressLod(true)
      try {
        await axios.put(`/api/auth/user/${userid}`, { AddressInfo })
        toast.success("User Address Added")
        setEditAddress(true)
      } catch (error) {
        console.log(error)
        toast.error("Something went wrong")
      } finally {
        setEditAddressLod(false)
      }
    }

  }


  // logut handler
  const logoutHandler = async () => {
    await axios.post("/api/auth/logout")
    toast.success("loggedout")
    router.refresh()
  }

  const style = editinfo ? "bg-transparent inputProfile" : "inputProfile bg-slate-700"

  return (

    <>
      {
        loading ? <Loader /> : <>

          {
            userinfo ? <>
              <div className='flex flex-col gap-2 justify-center items-center'>
                <div className=' bg-slate-800 md:w-[500px] w-[90%] flex flex-col items-center justify-center shadow-sm shadow-slate-400 py-14 mt-5'>
                  <div className='flex gap-5 pb-5'>   <h2 className='text-xl'>Profile Information</h2> <button onClick={profileUpdate} className='bg-sky-600 px-3 rounded-md font-bold'>{!editinfo ? "Done" : <>{editLod ? "Edit.." : "Edit"}</>}</button></div>
                  <div>
                    <div className='flex flex-col justify-center items-center gap-5'>
                      <input type="text" className={style} value={userinfo.username} readOnly={editinfo} onChange={(e) => setUserInfo({ ...userinfo, username: e.target.value })} />
                      <input type="email" className={style} value={userinfo.email} readOnly={editinfo} onChange={(e) => setUserInfo({ ...userinfo, email: e.target.value })} />
                    </div>
                  </div>
                </div>


                {/* Address info */}
                <div className=' bg-slate-800 md:w-[500px] w-[90%] flex flex-col items-center justify-center shadow-sm shadow-slate-400 py-14 my-5'>
                  <div className='flex gap-5 pb-5 justify-center items-center'>   <h2 className='text-xl'>Manage Address</h2> {editAddress && <button onClick={() => setEditAddress(false)} className='bg-sky-600 px-3 rounded-md font-bold flex py-2' >  {AddressInfo.pincode !== null ? <>Edit</> : <>Add <Plus /></>}  </button>}</div>
                  <div>
                    <div >
                      {
                        !editAddress ? <form onSubmit={addAddressHandler} className='flex flex-wrap justify-center items-center gap-5'>
                          <input type="text" className='inputAddress bg-transparent' placeholder='Full Name' value={AddressInfo.name} onChange={(e) => setAddressInfo({ ...AddressInfo, name: e.target.value })} required />

                          <input type="number" className='inputAddress bg-transparent' placeholder='Mobile' value={AddressInfo.mobile ? AddressInfo.mobile : ""} onChange={(e) => setAddressInfo({ ...AddressInfo, mobile: Number(e.target.value) })} required />

                          <input type="number" className='inputAddress bg-transparent' placeholder='Pincode' value={AddressInfo.pincode ? AddressInfo.pincode : ""} onChange={(e) => setAddressInfo({ ...AddressInfo, pincode: Number(e.target.value) })} required />

                          <input type="text" className='inputAddress bg-transparent' placeholder='Locality' value={AddressInfo.locality} onChange={(e) => setAddressInfo({ ...AddressInfo, locality: e.target.value })} required />

                          <input type="text" className='inputAddress bg-transparent' placeholder='City' value={AddressInfo.city}
                            onChange={(e) => setAddressInfo({ ...AddressInfo, city: e.target.value })}
                            required />

                          <input type="text" className='inputAddress bg-transparent' placeholder='State' value={AddressInfo.state}
                            onChange={(e) => setAddressInfo({ ...AddressInfo, state: e.target.value })}
                            required />

                          <button className='bg-sky-600 px-3 rounded-md font-bold flex py-2'>{editAddressLod ? <>{AddressInfo.pincode !== null ? <>Edit...</> : <>Add...</>} </> : <>{AddressInfo.pincode !== null ? <>Edit</> : <>Add <Plus /></>} </>}</button>
                        </form> : <p className='mx-10 text-center'> {AddressInfo.pincode !== null ? <>
                          {AddressInfo.name}, {AddressInfo.locality} , {AddressInfo.city} , {AddressInfo.state}, Pincode - {AddressInfo.pincode} , Mobile - {AddressInfo.mobile}
                        </> : <>Please Add Address</>} </p>
                      }
                    </div>
                  </div>
                </div>

                <button className='mb-10' onClick={logoutHandler}>Logout</button>

              </div>

            </>
              : <> {!loading && userinfo && <div className='flex justify-center items-center'>Something went wrong</div>}</>
          }

        </>
      }
    </>
  )
}

export default Profile

//{AddressInfo.pincode === null ? <>{editAddressLod ? "Edit.." : "Edit"}</> :