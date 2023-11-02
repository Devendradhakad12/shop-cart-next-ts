'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

const SignUpPage = () => {

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter()

  // signup form submit handler
  const handleSubmit = async (e: FormEvent) => {
    setLoading(true)
    e.preventDefault();
    try {
      await axios.post("/api/auth/signup", userData)
      toast.success("Signup successfully")
      router.refresh()
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
        <h1 className="loginH1">Sign Up</h1>
        <form className="loginForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Your Name"
            className="formInput"
            required
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
            value={userData.username}
          />
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
            {loading ? "Sign Up........" : "Sign Up"}
          </button>
        </form>
        <p className="loginP">
          New User? <Link href="/login">Login</Link>{" "}
        </p>
      </div>
    </div>
  )
}

export default SignUpPage
