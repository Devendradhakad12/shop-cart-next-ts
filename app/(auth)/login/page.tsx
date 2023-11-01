import React from 'react'
import LoginComponent from './_component/login'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// login page
const LoginPage = async () => {
  const cookieStore = cookies()
  const token =  cookieStore.get("scat")
  if (token?.value) return redirect("/")  // Redirect logged in user to homepage 
  return (
    <LoginComponent />
  )
}

export default LoginPage
 