import React from 'react'
import LoginComponent from './_component/login'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
const LoginPage = () => {
  const cookieStore = cookies()
  const token = cookieStore.get("scat")
  if (token?.value) return redirect("/")
  return (
    <LoginComponent />
  )
}

export default LoginPage
