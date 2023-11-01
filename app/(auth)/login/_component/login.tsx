'use client'

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

const LoginComponent = () => {

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
      router.push("/")
    } catch (error: any) {
      console.log(error)
      toast.error(error.response ? error.response.data : "Something went wrong")
    } finally {
      setLoading(false)
    }
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
        <p className="loginP">
          New User? <Link href="/signup">Sign Up</Link>{" "}
        </p>
        <p>
          Email : dev@gmail.com <br />
          Password : 123456
        </p>
      </div>
    </div>
  )
}

export default LoginComponent
