import React from 'react'
import {Camera, ShoppingCart, User} from "lucide-react"
import Dropdown from './dropdown'
import Link from 'next/link'
const Navbar = () => {


    return (

        <div className='bg-sky-400 text-black fixed top-0 left-0 w-full '>
            <nav className='flex justify-evenly h-14 items-center'>

                {/* logo */}
                <div>
                   <h1 className=' italic text-xl font-bold'><Link href={"/"}> ShopCart</Link> </h1>
                </div>

                {/* search input */}
                <div className='w-[50%]'>
                <input type="text" id="first_name" className="input" placeholder="Search for Product, Brands and more" required />
                </div>

                {/* login or profile icon  */}
                <div className='sm:flex hidden'>
              <Link href={"/login"} className='df'>  <User /> Login</Link>
                </div>

                {/*   cart icon */}
                <div className='md:flex hidden'>
                 <Link href={"/cart"} className='df'>   <ShoppingCart /> Cart</Link>
                </div>

             


            </nav>
        </div>
    )
}

export default Navbar
