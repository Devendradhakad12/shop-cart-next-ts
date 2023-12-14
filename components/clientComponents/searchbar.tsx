'use client'
import { useAppDispatch } from '@/redux/hook'
import { setUserToken } from '@/redux/slices/user-token-slice'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const SearchBar = ({token,user}:{token:string | undefined,user:{}}) => {
    const [keyword,setKeyword] = useState("")
    const router = useRouter()
    const dispatch = useAppDispatch()
    const onSearch = ()  =>{
      if(keyword) {
        router.push(`/product/query?keyword=${keyword}`)
        setKeyword("")
    }}

    //* set userToken in redux store
    
    useEffect(()=>{ 
     dispatch(setUserToken({token,user}))
    },[token])

  return (
    <div className='w-[50%] df relative'>
    <input value={keyword} onKeyDown={(e)=>{if(e.key === "Enter"){onSearch()}}} onChange={(e)=>setKeyword(e.target.value)} type="text" id="first_name" className="inputSearch" placeholder="Search for Product, Brands and more" required />

    <button className=' absolute right-5 text-white' onClick={onSearch}><Search /></button>
</div>
  )
}

export default SearchBar
