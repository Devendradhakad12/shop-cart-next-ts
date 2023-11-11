

import { Details } from '@mui/icons-material'

const MobileCart = ({ orders }: {  orders: {}[] }) => {

    return (

        <div className='flex justify-center items-center md:hidden flex-col gap-4 my-10'>
            {
                orders.length && orders.map((order: any) => (
                    <div className=' w-[400px] h-full rounded-md border-opacity-25 border-[0.1px] border-slate-50'>
                        <div className=' border-b flex justify-center py-4 px-4 text-lg items-center '><img src={order.products[0].product.images[0].url} className='w-[100px] object-contain h-[100px] mr-3' alt="" /> <button className=' float-right text-green-500 flex justify-center items-center gap3'> <span>Details</span><Details /></button> </div>
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

export default MobileCart
