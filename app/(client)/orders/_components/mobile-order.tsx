

import { Details } from '@mui/icons-material'
import Image from 'next/image'
import Link from 'next/link'

const MobileOrders = ({ orders }: { orders: {}[] }) => {
     //console.log(orders)
    return (

        <div className='flex justify-center items-center md:hidden flex-col gap-4 my-10'>
            {
                orders.length && orders.map((order: any) => (
                    <div key={order._id} className=' w-[360px] mx-2 h-full rounded-md border-opacity-25 border-[0.1px] border-slate-50'>
                        <div className=' border-b flex justify-center py-4 px-4 text-lg items-center '><Image height={100} width={100} src={order.products[0].product.images[0].url} className='w-[100px] object-contain h-[100px] mr-3' alt="" /> <Link href={`/orders/${order._id}/details`} className=' float-right text-green-500 flex justify-center items-center gap3'> <span>Details</span><Details /></Link> </div>
                        <div className=' border-b flex justify-between py-4 px-4 text-lg '><span>Order Id:</span><span className='text-orange-500'> {order.orderId}</span></div>
                        <div className=' border-b flex justify-between py-4 px-4 text-lg '><span>Total Price:</span><span>₹{order.totalPrice}</span></div>
                        <div className=' border-b flex justify-between py-4 px-4 text-lg '><span>Total Items: </span>
                            <span>
                                <div className='flex'>
                                    {order.totalItem}
                                </div>
                            </span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default MobileOrders
