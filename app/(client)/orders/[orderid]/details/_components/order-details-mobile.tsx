'use client'

import Step from '@mui/material/Step';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const OrderDetiailsMobile = ({ products, total, totalItem, orderId ,status}: {status:string, products: [], totalItem: number, total: number, orderId: string }) => {
    const router = useRouter()

    const onClick = (id: string) => {
        router.push(`/product/details/${id}`)
    }

    //* steper
    const steps = [
        "pending", "processing", "shipped", "delivered"
    ]

    
const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#784af4',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#784af4',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));


    return (

        <div className='flex justify-center items-center md:hidden flex-col gap-4 my-10'>

            {
                products && products.length && products.map((obj: any) => (
                    <div key={obj.product._id} className=' w-[400px] h-full rounded-md border-opacity-25 border-[0.1px] border-slate-50'>
                        <div className=' border-b flex justify-center py-4 px-4 text-lg items-center '> <button onClick={() => onClick(obj.product._id)}><Image height={100} width={100} src={obj.product.images[0].url} className='w-[100px] object-contain h-[100px] mr-3' alt="" /> </button> </div>
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
            <div className='mt-6 w-[90%]'>
                <Stepper alternativeLabel activeStep={steps.indexOf(status) || 0}   connector={<QontoConnector />} >
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel><span className='text-white'>{label}</span></StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>



        </div>
    )
}

export default OrderDetiailsMobile
