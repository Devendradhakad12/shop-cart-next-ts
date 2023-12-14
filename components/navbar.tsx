import { tokenValue } from '@/lib/token'
import { LogIn, Search, ShoppingCart, User } from "lucide-react"
import Link from 'next/link'
import SearchBar from './clientComponents/searchbar'
import CartIcon from './clientComponents/carticon-navbar'
import { getUserDataFromToken } from '@/lib/getDataFromToken'
import { DataStoredInToken } from '@/lib/props'
import { Dashboard } from '@mui/icons-material'


const Navbar = async () => {
    const token = tokenValue()

    const user = await getUserDataFromToken() as DataStoredInToken 
    
    return (

        <div className='bg-sky-500 text-black fixed top-0 left-0 w-full z-40 '>
            <nav className='flex justify-evenly h-14 items-center'>

                <div>
                    <h1 className=' italic text-xl font-bold'><Link href={"/"}> ShopCart</Link> </h1>
                </div>



                <SearchBar token={token} user={user} /> 


                <div className='flex gap-10'>
                    {
                        token ? <div className='sm:flex hidden' ><Link href={"/profile"} className='flex' ><User /></Link></div> : <div className='df'>  <Link href={"/login"} className='df'>Login <LogIn /></Link> </div>
                    }
                     {
                        token && user && user?.role === "admin" && <Link className='sm:flex hidden' href={"/admin/dashboard"}><Dashboard /></Link>
                     }

                    <CartIcon />
                </div>



            </nav>
        </div>
    )
}



export default Navbar
