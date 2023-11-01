import { tokenValue } from '@/lib/token'
import { Search, ShoppingCart, User } from "lucide-react"
import Link from 'next/link'


const Navbar = async () => {
    const token = tokenValue()


    return (

        <div className='bg-sky-400 text-black fixed top-0 left-0 w-full '>
            <nav className='flex justify-evenly h-14 items-center'>

                <div>
                    <h1 className=' italic text-xl font-bold'><Link href={"/"}> ShopCart</Link> </h1>
                </div>


                <div className='w-[50%] df relative'>
                    <input type="text" id="first_name" className="input" placeholder="Search for Product, Brands and more" required />
                    <button className=' absolute right-5 text-white'><Search /></button>
                </div>


                {
                    !token ? <div className='sm:flex hidden'>
                        <Link href={"/login"} className='df'>  <User /> Login</Link>
                    </div> : <div className='sm:flex hidden'>  <Link href={"/profile"} className='df'>  <User /> Profile</Link></div>
                }


                <div className='md:flex hidden'>
                    <Link href={"/cart"} className='df'>   <ShoppingCart /> Cart</Link>
                </div>

            </nav>
        </div>
    )
}



export default Navbar
