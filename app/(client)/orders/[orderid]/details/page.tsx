'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import OrderDetiailsMobile from './_components/order-details-mobile'
import Loader from '@/components/loader'
import OrderDetailsDesktop from './_components/order-detials-desktop'

const OrderDetailsPage = ({ params }: { params: { orderid: string } }) => {
    const orderid = params.orderid
    const [order, setOrder] = useState<{status:string, products: [], totalPrice: number, totalItem: number, orderId: string }[]>([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getOrder = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`/api/orders/order-details/${orderid}`)
                setOrder(res.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getOrder()
    }, [orderid])
  //  console.log(order[0]?.status)
    return (
        <div>
            <h2 className='text-center text-4xl mt-14 text-orange-500 italic font-bold'>Order Details</h2>
            {
                loading ? <Loader /> : <>
                    <OrderDetiailsMobile status={order[0]?.status} orderId={order[0]?.orderId} products={order[0]?.products} total={order[0]?.totalPrice} totalItem={order[0]?.totalItem} />
                    <OrderDetailsDesktop status={order[0]?.status} orderId={order[0]?.orderId} products={order[0]?.products} total={order[0]?.totalPrice} totalItem={order[0]?.totalItem} />
                </>
            }
        </div>
    )
}

export default OrderDetailsPage
