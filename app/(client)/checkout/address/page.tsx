
'use client'

import Loader from '@/components/loader'
import { UserAddress } from '@/lib/props'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import addressSlice, { setUseraddress } from '@/redux/slices/address-slice'
import axios from 'axios'
import { Plus } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const CheckOutAddressPage = () => {
    const productid = useSearchParams().get("productid") 
 
    const router = useRouter()
    const [loading, setLoading] = useState(true) // Show loading when loading user data for the first time
    const [userid, setUserId] = useState("")   // store user id when userdata loaded
     
     const dispatch = useAppDispatch()
    const { address } = useAppSelector((state) => state.address)
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
    const [showEditOrAdd, setShowEditAdd] = useState(false)


    useEffect(() => {
     
        async function getUserInfo() { 
            setLoading(true)
            try {
                const res = await axios.get("/api/auth/user/userinfo")
                setAddressInfo(res.data.address)
                setShowEditAdd(res.data.address && true)
                setUserId(res.data._id)
                localStorage.setItem("address",JSON.stringify(res.data.address))  
                dispatch(setUseraddress({address:res.data.address}))
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getUserInfo()

    }, [])





    // address edit and add  handler
    const addAddressHandler = async (e: FormEvent) => {
        e.preventDefault()

        if (!editAddress) {
            setEditAddressLod(true)
            try {
                await axios.put(`/api/auth/user/${userid}`, { AddressInfo })
                toast.success("User Address Added")
                setEditAddress(true)
                localStorage.setItem("address",JSON.stringify(AddressInfo))  
                dispatch(setUseraddress({address:AddressInfo}))
            } catch (error) {
                console.log(error)
                toast.error("Something went wrong")
            } finally {
                setEditAddressLod(false)
            } 
        }

    }
 

    //* confirm order handler
    const continewoConfirmOrder = () =>{
      if(address){
        if(productid){
            router.push(`/checkout/confirm?productid=${productid}`)
        }else{
            router.push("/checkout/confirm-order")
        }
      }
      else{
        toast.error("Please Add Address")
      }
    }
    return (
        <div className='flex justify-center items-center flex-col'>
            {
                loading ? <Loader /> :
                    <div className=' bg-slate-800 md:w-[500px] w-[90%] flex flex-col items-center justify-center shadow-sm shadow-orange-400 py-14 my-5'>
                        <div className='flex gap-5 pb-5 justify-center items-center'>   <h2 className='text-xl'>Confirm Address</h2> {editAddress && <button onClick={() => setEditAddress(false)} className='bg-sky-600 px-3 rounded-md font-bold flex py-2' >  {showEditOrAdd ? <>Edit</> : <>Add <Plus /></>}  </button>}</div>
                        <div>
                            <div >
                                {
                                    !editAddress ? <form onSubmit={addAddressHandler} className='flex flex-wrap justify-center items-center gap-5'>
                                        <input type="text" className='inputAddress bg-transparent' placeholder='Full Name' value={AddressInfo?.name} onChange={(e) => setAddressInfo({ ...AddressInfo, name: e.target.value })} required />

                                        <input type="number" className='inputAddress bg-transparent' placeholder='Mobile' value={AddressInfo?.mobile ? AddressInfo.mobile : ""} onChange={(e) => setAddressInfo({ ...AddressInfo, mobile: Number(e.target.value) })} required />

                                        <input type="number" className='inputAddress bg-transparent' placeholder='Pincode' value={AddressInfo?.pincode ? AddressInfo.pincode : ""} onChange={(e) => setAddressInfo({ ...AddressInfo, pincode: Number(e.target.value) })} required />

                                        <input type="text" className='inputAddress bg-transparent' placeholder='Locality' value={AddressInfo?.locality} onChange={(e) => setAddressInfo({ ...AddressInfo, locality: e.target.value })} required />

                                        <input type="text" className='inputAddress bg-transparent' placeholder='City' value={AddressInfo?.city}
                                            onChange={(e) => setAddressInfo({ ...AddressInfo, city: e.target.value })}
                                            required />

                                        <input type="text" className='inputAddress bg-transparent' placeholder='State' value={AddressInfo?.state}
                                            onChange={(e) => setAddressInfo({ ...AddressInfo, state: e.target.value })}
                                            required />

                                        <button className='bg-sky-600 px-3 rounded-md font-bold flex py-2'>{editAddressLod ? <>{showEditOrAdd ? <>Edit...</> : <>Add...</>} </> : <>{showEditOrAdd ? <>Edit</> : <>Add <Plus /></>} </>}</button>
                                    </form> : <p className='mx-10 text-center'> {AddressInfo ? <>
                                        {AddressInfo?.name}, {AddressInfo?.locality} , {AddressInfo?.city} , {AddressInfo?.state}, Pincode - {AddressInfo?.pincode} , Mobile - {AddressInfo?.mobile}
                                    </> : <>Please Add Address</>} </p>
                                }
                            </div>
                        </div>
                        <button onClick={continewoConfirmOrder} className='mt-5 button bg-orange-500 text-black px-3 py-1 rounded-lg text-xl font-bold'>Continew </button>
                    </div>

            }


        </div>
    )
}

export default CheckOutAddressPage
