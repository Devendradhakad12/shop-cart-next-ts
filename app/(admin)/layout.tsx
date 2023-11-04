import Sidebar from '@/components/adminComponents/sidebar'
import { getUserDataFromToken } from '@/lib/getDataFromToken'
import { DataStoredInToken } from '@/lib/props'
import { redirect } from 'next/navigation'
import React from 'react'


const LayoutRoute = async ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    const userRole = await getUserDataFromToken() as DataStoredInToken
    

    if(userRole?.role !== "admin") return redirect("/")
  return (
    
      <div className='dashboard z-50'>
      <Sidebar />
        {children}
      </div>
    
  )
}

export default LayoutRoute
