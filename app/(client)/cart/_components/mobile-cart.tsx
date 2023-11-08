import React from 'react'

const MobileCart = ({ products, total, subtotal }: { products: any, total: number, subtotal: [] }) => {
    return (

        <div className='flex justify-center items-center md:hidden flex-col gap-4 my-10'>



            {
                products.length && products.map((obj: any) => (
                    <div className=' w-[400px] h-full rounded-md border-opacity-25 border-[0.1px] border-slate-50'>
                        <div className=' border-b flex justify-center py-4 px-4 text-lg '><img src={obj.product.images[0].url} className='w-[100px] object-contain h-[100px] mr-3' alt="" /></div>
                        <div className=' border-b flex justify-between py-4 px-4 text-lg '><span>Product:</span><span className='text-orange-500'> {obj.product.name}</span></div>
                        <div className=' border-b flex justify-between py-4 px-4 text-lg '><span>Price:</span><span>₹{obj.product.price}</span></div>
                        <div className=' border-b flex justify-between py-4 px-4 text-lg '><span>Quantity:</span><span>{obj.quantity}</span></div>
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
                            <h3>  <span className='text-xl mr-8 '> Total Items :</span> <span className='text-2xl font-bold'> {subtotal.length} </span> </h3>
                            <h3>   <span className='text-xl mr-3 '> Total Amount :</span> <span className='text-2xl font-bold'> ₹{total} </span></h3>
                        </div>
                    </div>

                    <div className='flex justify-center items-center mt-20'>
                        <button className=' button bg-orange-500 text-black font-bold text-2xl px-4 py-3 rounded-lg'>Proceed To Checkout</button>
                    </div>

                </div>
            </div>



        </div>
    )
}

export default MobileCart
