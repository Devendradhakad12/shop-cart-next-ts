'use client'

import { useAppSelector } from '@/redux/hook'
import React from 'react'
import DeskTopCart from './_components/desktop-cat'
import MobileCart from './_components/mobile-cart'

const CartPage = () => {
  const { cart } = useAppSelector((state) => state.cart)
  const products = cart.cartItems

  // calculate total price
  const subtotal = products.map((obj: any) => {
    return obj.product.price * obj.quantity
  })
  const total = subtotal.reduce((acc: number, price: number) => acc + price, 0)

  return (
    <>
      <h2 className='text-center text-4xl mt-14 text-orange-500 italic font-mono'>Cart</h2>
      <DeskTopCart products={products} total={total} subtotal={subtotal} />
      <MobileCart products={products} total={total} subtotal={subtotal} />
    </>
  )
}

export default CartPage
