import React from 'react'
import SignUpComponent from './_component/signup'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


const SignUpPage = () => {
  const cookieStore = cookies()
  const token = cookieStore.get("scat")
 if(token?.value) return redirect("/")
  return  <SignUpComponent />
}

export default SignUpPage
