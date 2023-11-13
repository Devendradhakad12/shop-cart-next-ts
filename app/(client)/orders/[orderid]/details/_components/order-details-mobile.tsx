'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

const OrderDetiailsMobile = ({ products, total, totalItem, orderId }: { products: [], totalItem: number, total: number, orderId: string }) => {
    const router = useRouter()

    const onClick = (id: string) => {
        router.push(`/product/details/${id}`)
    }
    return (

        <div className='flex justify-center items-center md:hidden flex-col gap-4 my-10'>

            {
                products && products.length && products.map((obj: any) => (
                    <div className=' w-[400px] h-full rounded-md border-opacity-25 border-[0.1px] border-slate-50'>
                        <div className=' border-b flex justify-center py-4 px-4 text-lg items-center '> <button onClick={() => onClick(obj.product._id)}><img src={obj.product.images[0].url} className='w-[100px] object-contain h-[100px] mr-3' alt="" /> </button> </div>
                        <div className=' border-b flex justify-between py-4 px-4 text-lg '><span>Product:</span><span className='text-orange-500'> {obj.product.name}</span></div>
                        <div className=' border-b flex justify-between py-4 px-4 text-lg '><span>Price:</span><span>₹{obj.product.price}</span></div>
                        <div className=' border-b flex justify-between py-4 px-4 text-lg '><span>Quantity:</span>
                            <span>
                                <div className='flex'>
                                    {obj.quantity}
                                </div>
                            </span>
                        </div>
                    </div>
                ))
            }

            {/* total amount ------------------------------- */}
            <div className='mt-10 w-[400px] h-[250px] border-opacity-70 border-[0.1px] border-slate-50'>
                <div className=' text-2xl border-b border-opacity-20 h-14 flex justify-center items-center'>
                    Total Pay Amount
                </div>
                <div>
                    <div className='flex flex-col  items-center mt-10 gap-5 '>
                        <div className='flex flex-col gap-4'>
                            <h3>  <span className='text-xl mr-4 '> Order Id :</span> <span className='text-xl'> {orderId} </span> </h3>
                            <h3>  <span className='text-xl mr-8 '> Total Items :</span> <span className='text-2xl font-bold'> {totalItem} </span> </h3>
                            <h3>   <span className='text-xl mr-3 '> Total Amount :</span> <span className='text-2xl font-bold'> ₹{total} </span></h3>
                        </div>
                    </div>



                </div>
            </div>



        </div>
    )
}

export default OrderDetiailsMobile
