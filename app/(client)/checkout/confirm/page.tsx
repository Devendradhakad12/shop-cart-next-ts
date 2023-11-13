'use client'
import Loader from '@/components/loader'
import { useAppSelector } from '@/redux/hook'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const ConfirmOrderPage = () => {
    const productid = useSearchParams().get("productid")

    const router = useRouter()
    const { address } = useAppSelector((state) => state.address)

    const { user } = useAppSelector((state) => state.userToken)
    const [productFetchLoading, setProdctFetchLoading] = useState(false)
    const [products, setProduct] = useState<{ price: number, name: string }[]>([])

    useEffect(() => {
        const getProduct = async () => {
            try {
                setProdctFetchLoading(true)
                const res = await axios.get(`/api/product/${productid}`)
                setProduct([res.data])
            } catch (error) {
                console.log(error)
            } finally {
                setProdctFetchLoading(false)
            }
        }
        getProduct()
    }, [productid])



    const [loading, setLoading] = useState(false)
    const [confirmOrderLoading, setConfirmOrderLoading] = useState(false)


    //* order confirm handler 

    const confirmOrder = async () => {
        try {
            setLoading(true)
            const data = {
                products: [{ product: products[0], quantity: 1 }],
                amount: products[0]?.price,
                shippingAddress: address,
                totalItem: 1
            }
            const order: any = await axios.post("/api/checkout/create-order", data)

            const options = {
                key: "rzp_test_1EBareX6d8Ne1z", // Enter the Key ID generated from the Dashboard
                amount: order.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                name: "Dev Dhaakd",
                description: "Test Transaction",
                image: "https://avatars.githubusercontent.com/u/121676745?v=4",
                order_id: order.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                //  callback_url: "http://localhost:5050/api/paymentVerification",
                // redirect: true,
                handler: async function (response: any) {
                    // Validate payment at server - using webhooks is a better idea.


                    try {
                        setConfirmOrderLoading(true)
                        const paymentData = {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            orderId: order.data.id
                        }
                        const res = await axios.post("/api/checkout/confirm-order", paymentData)
                        toast.success("Order Created")
                        router.push("/orders")
                    } catch (error) {
                        toast.error("Something went wrong")
                        console.log(error)
                    } finally {
                        setConfirmOrderLoading(false)
                    }
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
            {
                productFetchLoading ? <Loader /> : <>
                    {
                        confirmOrderLoading ? <Loader /> :
                            <div className=' bg-slate-800 md:w-[500px] w-[90%] flex flex-col items-center justify-center shadow-sm shadow-orange-400 py-14 my-5'>
                                {
                                    products.length ? <>
                                        <h2 className='font-mono text-2xl '>Confirm Order</h2>
                                        <p className='mt-4 text-xl flex justify-center w-[100%]'>
                                          <span>Product :</span>  <span className='ml-5'> {products[0].name}</span>
                                        </p>
                                        <p className=' text-xl mt-5 flex justify-center w-[50%]'>
                                            <span className=' mr-5'>Price : </span> ₹{products[0]?.price}
                                        </p>
                                        <button disabled={loading || !products.length} onClick={confirmOrder} className=' disabled:opacity-40 mt-10 button bg-orange-500 text-black px-3 py-1 rounded-lg text-xl font-bold'>Confirm Order</button>
                                    </> : <>
                                        Sorry! Product Not Found
                                    </>
                                }

                            </div>

                    }

                    <div className='mt-5 mb-5 gap-4 flex flex-col justify-center items-center'>
                        <h2 className=' text-3xl'>Payment Guide</h2>
                        <video controls className='md:w-[40%] w-[70%]' src="https://res.cloudinary.com/dvkfio4zq/video/upload/v1699766710/shopcart/ofdovcplfr6y0zndch3a.mkv"></video>
                        <p >Card Number - 4111 1111 1111 1111 </p>
                        <p>Expiry - 12/33</p>
                        <p className='mb-10'>CVV - 123</p>
                    </div>
                </>
            }
        </div>
    )
}

export default ConfirmOrderPage
