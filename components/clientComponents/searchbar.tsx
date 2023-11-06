'use client'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SearchBar = () => {
    const [keyword,setKeyword] = useState("")
    const router = useRouter()
    const onSearch = ()  =>{
      if(keyword) {
        router.push(`/product/${keyword}`)
        setKeyword("")
    }
    
    }
  return (
    <div className='w-[50%] df relative'>
    <input value={keyword} onKeyDown={(e)=>{if(e.key === "Enter"){onSearch()}}} onChange={(e)=>setKeyword(e.target.value)} type="text" id="first_name" className="inputSearch" placeholder="Search for Product, Brands and more" required />

    <button className=' absolute right-5 text-white' onClick={onSearch}><Search /></button>
</div>
  )
}

export default SearchBar
