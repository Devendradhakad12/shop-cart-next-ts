'use client'

import Loader from '@/components/loader'
import axios from 'axios'
import { useEffect, useState } from 'react'
import DeskTopOrders from './_components/desktop-order'
import MobileOrders from './_components/mobile-order'

const CartPage = () => {

  const [orders, setOrders] = useState<{}[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true)
        const res = await axios.get("/api/orders/order-me")
        setOrders(res.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getOrders()
  }, [])


  return (
    <>
      <h2 className='text-center text-4xl mt-14 text-orange-500 italic font-bold'>Orders</h2>
      {
        loading ? <Loader /> : <>
          <DeskTopOrders orders={orders} />
          <MobileOrders orders={orders} />
        </>
      }
    </>
  )
}

export default CartPage 
