'use client'


import { addItemsToCart, removeItemsToCart } from '@/redux/actions/cart-action'
import { getProduct } from '@/redux/actions/product-action'
import { useAppDispatch } from '@/redux/hook'
import { Delete } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const DeskTopCart = ({ products, total, totalItem, subtotal }: { products: any, totalItem: number, total: number, subtotal: [] }) => {


    const dispatch = useAppDispatch()
    const router = useRouter()
    const RemoveHandler = (id: string) => {
        dispatch(removeItemsToCart(id))
    }

    useEffect(() => {
        dispatch(getProduct({}))
    }, [dispatch])


    const PlusTocart = (prevQuntity: number, id: string, stock: number) => {
        const newQuantity = prevQuntity < stock ? prevQuntity + 1 : prevQuntity
        prevQuntity < stock && dispatch(addItemsToCart(id, newQuantity))
    }

    const MinusTocart = (prevQuntity: number, id: string) => {
        const newQuantity = prevQuntity > 1 ? prevQuntity - 1 : 1
        prevQuntity > 1 && dispatch(addItemsToCart(id, newQuantity))
    }


    //* checkout handler
    const checkout = () => {
        router.push("/checkout/address")
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
                            <th className='py-3'>SubTotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.length && products.map((obj: any) => (
                                <tr key={obj.product._id} className='border-b border-slate-100'>
                                    <td className='text-center'><p className='py-4 flex ml-10 text-orange-500 opacity-100'> <img src={obj.product.images[0].url} className='w-[30px] h-[30px] mr-3' alt="" /> {obj.product.name}</p></td>
                                    <td className='text-center'>₹{obj.product.price}</td>
                                    <td className='text-center'>
                                        <div className='flex'>
                                            <button onClick={() => MinusTocart(obj.quantity, obj.product._id)} className='bg-orange-500 text-black w-10 font-bold text-xl rounded-none m-0'>-</button>
                                            <p className=' border-y border-orange-500 w-10 text-center m-0 '>{obj.quantity}</p>
                                            <button onClick={() => PlusTocart(obj.quantity, obj.product._id, obj.product.stock)} className='bg-orange-500 text-black w-10 font-bold text-xl rounded-none m-0'>+</button>
                                        </div>
                                    </td>
                                    <td className='text-center h-[70px] flex justify-center items-center'>₹{obj.product.price * obj.quantity} <button className='ml-4' onClick={() => RemoveHandler(obj.product._id)} ><Delete /></button> </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>


            <div className=' w-[400px] h-[400px] border-opacity-25 border-[0.1px] border-slate-50'>
                <div className=' text-2xl border-b border-opacity-20 h-14 flex justify-center items-center'>
                    Cart Total
                </div>
                <div>

                    <div className='flex flex-col  items-center mt-20 gap-5 '>
                        <div className='flex flex-col gap-4'>
                            <h3>  <span className='text-xl mr-8 '> Total Items :</span> <span className='text-2xl font-bold'> {totalItem} </span> </h3>
                            <h3>   <span className='text-xl mr-3 '> Total Amount :</span> <span className='text-2xl font-bold'> ₹{total} </span></h3>
                        </div>
                    </div>

                    <div className='flex justify-center items-center mt-20'>
                        <button onClick={checkout} className=' button bg-orange-500 text-black font-bold text-2xl px-4 py-3 rounded-lg'>Proceed To Checkout</button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default DeskTopCart
