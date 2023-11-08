'use client'

import { useAppSelector } from '@/redux/hook'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CartIcon = () => {
    const {cart} = useAppSelector((state)=>state.cart)
    
    return (
        <div className='sm:flex hidden relative'>
            <p className=' absolute bottom-3 left-5 bg-slate-100 rounded-full text-center w-[20px] h-[20px] text-sm'>{cart.cartItems.length}</p>
            <Link href={"/cart"} className='df'>   <ShoppingCart /></Link>
        </div>
    )
}

export default CartIcon
