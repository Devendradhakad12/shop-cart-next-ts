'use client'

import { addItemsToCart, removeItemsToCart } from '@/redux/actions/cart-action'
import { getProduct } from '@/redux/actions/product-action'
import { useAppDispatch } from '@/redux/hook'
import { Delete } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const MobileCart = ({ products, total,totalItem, subtotal }: { products: any,totalItem:number, total: number, subtotal: [] }) => {
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
    const checkout = () =>{
         router.push("/checkout/address")
    }


    return (

        <div className='flex justify-center items-center md:hidden flex-col gap-4 my-10'>



            {
                products.length && products.map((obj: any) => (
                    <div key={obj.product._id} className=' w-[400px] h-full rounded-md border-opacity-25 border-[0.1px] border-slate-50'>
                        <div className=' border-b flex justify-center py-4 px-4 text-lg items-center '><Image width={100} height={100} src={obj.product.images[0].url} className='w-[100px] object-contain h-[100px] mr-3' alt="" /> <button onClick={() => RemoveHandler(obj.product._id)} className=' float-right'><Delete /></button> </div>
                        <div className=' border-b flex justify-between py-4 px-4 text-lg '><span>Product:</span><span className='text-orange-500'> {obj.product.name}</span></div>
                        <div className=' border-b flex justify-between py-4 px-4 text-lg '><span>Price:</span><span>₹{obj.product.price}</span></div>
                        <div className=' border-b flex justify-between py-4 px-4 text-lg '><span>Quantity:</span>
                            <span>

                                <div className='flex'>
                                    <button onClick={() => MinusTocart(obj.quantity, obj.product._id)} className='bg-orange-500 text-black w-10 font-bold text-xl rounded-none m-0'>-</button>
                                    <p className=' border-y border-orange-500 w-10 text-center m-0 '>{obj.quantity}</p>
                                    <button onClick={() => PlusTocart(obj.quantity, obj.product._id, obj.product.stock)} className='bg-orange-500 text-black w-10 font-bold text-xl rounded-none m-0'>+</button>
                                </div>


                            </span>
                        </div>
                        <div className=' border-b flex justify-between py-4 px-4 text-lg '> <span>Subtotal:</span><span>₹{obj.product.price * obj.quantity}</span> </div>
                    </div>
                ))
            }




            {/* total amount ------------------------------- */}
            <div className=' w-[400px] h-[400px] border-opacity-70 border-[0.1px] border-slate-50'>
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
                        <button onClick={checkout} disabled={!products.length} className=' disabled:opacity-50 button bg-orange-500 text-black font-bold text-2xl px-4 py-3 rounded-lg'>Proceed To Checkout</button>
                    </div>

                </div>
            </div>



        </div>
    )
}

export default MobileCart
    