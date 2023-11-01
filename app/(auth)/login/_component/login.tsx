'use client'

import Link from 'next/link';
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const LoginComponent = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = () =>{
    toast.success("mdcjnv")
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
        <button type="submit" className="lsBtn">
          {loading ? "Login....." :"Login"}
        </button>
      </form>
      <p className="loginP">
        New User? <Link href="/signup">Sign Up</Link>{" "}
      </p>
      <p>
         Email : dev@gmail.com <br />
         Password : 12345
      </p>
    </div>
  </div>
  )
}

export default LoginComponent
