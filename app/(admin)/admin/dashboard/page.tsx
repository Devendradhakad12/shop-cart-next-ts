import { getUserDataFromToken } from '@/lib/getDataFromToken'
import { DataStoredInToken } from '@/lib/props'
import { redirect } from 'next/navigation'
import React from 'react'

const DashboardPage = async () => {
    const userRole = await getUserDataFromToken() as DataStoredInToken
    

    if(userRole?.role !== "admin") return redirect("/")
  return (
    <div>
      Dashboard
    </div>
  )
}

export default DashboardPage
