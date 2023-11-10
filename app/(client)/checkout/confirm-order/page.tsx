'use client'
import { useAppSelector } from '@/redux/hook'
import axios from 'axios'
import React, { useState } from 'react'

const ConfirmOrderPage = () => {
    const { address } = useAppSelector((state) => state.address)
    const { cart } = useAppSelector((state) => state.cart)
    const { user } = useAppSelector((state) => state.userToken)
    const products = cart.cartItems
    // calculate total price
    const subtotal = products.map((obj: any) => {
        return obj.product.price * obj.quantity
    })
    const total = subtotal.reduce((acc: number, price: number) => acc + price, 0)
    const totalItem = products.reduce((acc: number, product: any) => acc + product.quantity, 0)
    const [loading, setLoading] = useState(false)
    /*    console.log(products)
      console.log(totalItem) */

    //* order confirm handler
 
    const confirmOrder = async () => {
        try {
            setLoading(true)
            const data = {
                products,
                amount: total,
                shippingAddress: address,
                totalItem
            }
            const order:any = await axios.post("/api/checkout/create-order", data)
       
            const options = {
                key:"rzp_test_1EBareX6d8Ne1z", // Enter the Key ID generated from the Dashboard
                amount: order.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                name: "Dev Dhaakd",
                description: "Test Transaction",
                image: "https://avatars.githubusercontent.com/u/121676745?v=4",
                order_id: order.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
              //  callback_url: "http://localhost:5050/api/paymentVerification",
               // redirect: true,
               handler: function (response:any) {
                // Validate payment at server - using webhooks is a better idea.
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature);
              },
                prefill: {
                  name: user.name,
                  email: user.email,
                  contact: address.mobile,
                },
                notes: {
                  address: "Razorpay Corporate Office",
                },
                theme: {
                  color: "#121212",
                },
              };
            
              const razor = new (window as any).Razorpay(options);
              razor.open();
           
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='mt-8 flex justify-center items-center flex-col'>
            <div className=' bg-slate-800 md:w-[500px] w-[90%] flex flex-col items-center justify-center shadow-sm shadow-orange-400 py-14 my-5'>
                <h2 className='font-mono text-2xl '>Confirm Order</h2>
                <p className='mt-4 text-xl flex justify-between w-[70%]'>
                    <span>Total Items : </span><span> {totalItem}</span>
                </p>
                <p className=' text-xl flex justify-between w-[70%]'>
                    <span>Total Price : </span> ₹{total}
                </p>
                <button disabled={loading} onClick={confirmOrder} className=' disabled:opacity-40 mt-10 button bg-orange-500 text-black px-3 py-1 rounded-lg text-xl font-bold'>Confirm Order</button>
            </div>
        </div>
    )
}

export default ConfirmOrderPage
