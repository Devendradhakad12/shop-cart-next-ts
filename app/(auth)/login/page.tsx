'use client'

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

const LoginPage = () => {

  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  //  login function
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      await axios.post("/api/auth/login", userData)
      toast.success("Login successfully")
      router.refresh()
    } catch (error: any) {
      console.log(error)
      toast.error(error.response ? error.response.data : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  // test user
  const testUser = () =>{
  setUserData({
    email:"dev@gmail.com",
    password:"123456"
  })
 

  }
  return (
    <div className="mainDiv">
      <div className="loginDiv">
        <h1 className="loginH1">Login</h1>
        <form className="loginForm" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Your Email"
            className="formInput"
            required
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            value={userData.email}
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            className="formInput"
            required
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            value={userData.password}
          />
          <button type="submit" className="lsBtn disabled:bg-sky-200" disabled={loading}>
            {loading ? "Login....." : "Login"}
          </button>
        </form>

        <button className='lsBtn px-10 mt-0' onClick={testUser}>Test User</button>
        <p className="loginP">
          New User? <Link href="/signup">Sign Up</Link>{" "}
        </p>
       
      </div>
    </div>
  )
}

export default LoginPage
