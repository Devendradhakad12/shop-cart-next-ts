import { Details } from '@mui/icons-material'
 

const DeskTopCart = ({  orders }: {  orders: {}[]}) => {


   

    return (
        <div className='md:flex hidden justify-center md:items-start items-center mt-[50px] gap-10'>
            <div className='w-[800px]   min-h-[100px] border-opacity-25 opacity-100 border-[0.1px] border-slate-200 '>
                <table className="table-auto w-full ">
                    <thead className=' text-2xl border-b border '>
                        <tr >
                            <th className='py-3'>Order Id</th>
                            <th className='py-3'>Total Price</th>
                            <th className='py-3'>Total Items</th>
                            <th className='py-3 text-green-500'><Details /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.length && orders.map((order: any) => (
                                <tr key={order._id} className='border-b border-slate-100'>
                                    <td className='text-center'><p className='py-4 flex ml-10 text-orange-500 opacity-100'> <img src={order.products[0].product.images[0].url} className='w-[30px] h-[30px] mr-3' alt="" /> {order.orderId}</p></td>
                                    <td className='text-center'>₹{order.totalPrice}</td>
                                    <td className='text-center'>
                                        <div className='text-center'>
                                        {order.totalItem}
                                        </div>
                                    </td>
                                    <td className='text-center h-[70px] flex justify-center items-center'> <button  className='text-green-500'  >Details</button> </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>


           

        </div>
    )
}

export default DeskTopCart
