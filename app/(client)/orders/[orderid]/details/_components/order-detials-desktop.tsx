"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

const OrderDetailsDesktop = ({ products, total, totalItem, orderId }: { products: [], totalItem: number, total: number, orderId: string }) => {
    const router = useRouter()

    const onClick = (id: string) => {
        router.push(`/product/details/${id}`)
    }
    return (
        <div className='md:flex hidden justify-center md:items-start items-center mt-[50px] gap-10'>
            <div className='w-[800px]   min-h-[100px] border-opacity-25 opacity-100 border-[0.1px] border-slate-200 '>
                <table className="table-auto w-full ">
                    <thead className=' text-2xl border-b border '>
                        <tr >
                            <th className='py-3'>Product</th>
                            <th className='py-3'>Price</th>
                            <th className='py-3'>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products && products.length && products.map((obj: any) => (
                                <tr key={obj.product._id} className='border-b border-slate-100'>
                                    <td className='text-center'><button onClick={() => onClick(obj.product._id)}><p className='py-4 flex ml-10 text-orange-500 opacity-100'> <img src={obj.product.images[0].url} className='w-[30px] h-[30px] mr-3' alt="" /> {obj.product.name}</p></button></td>
                                    <td className='text-center'>₹{obj.product.price}</td>
                                    <td className='text-center'>
                                        <div className='text-center'>
                                            {obj.quantity}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>


            <div className=' w-[400px] h-[250px] border-opacity-25 border-[0.1px] border-slate-50'>
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

export default OrderDetailsDesktop
