'use client'

import Loader from '@/components/loader'
import { getProduct } from '@/redux/actions/product-action'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { Rating } from '@mui/material'
import { useEffect, useState } from 'react'

const FeaturedProducts = () => {
  const { products, loading, error } = useAppSelector((state) => state.products)
  const dispatch = useAppDispatch()
  /*    
      useEffect(()=>{
          dispatch(getProduct({}))
      },[dispatch]) */

  // console.log(products)
  // console.log(loading)
  return (
    <div className='pt-10 relative featureProduct'>
      <div className='flex flex-col justify-center items-center  mb-10  m-auto pb-5'>
        <p className=' text-sky-400 uppercase'>Best Selling</p>
        <h2 className='md:text-5xl text-4xl font-mono font-bold'>Products</h2>
        <div className=' w-[50px] opacity-50 bg-slate-50 h-[1px] md:mt-5 mt-3'>  </div>
      </div>
      {/*    {    
      loading ? <Loader /> : <div>shop cart featured product</div>
    } */}


      {/* products container  */}
      <div className='flex justify-center items-center flex-wrap gap-10 pb-10'>

        {/* product  */}
        <div>
          <div>
            <img className='w-[300px] h-[300px] rounded-sm object-cover' src="https://websitedemos.net/halloween-shop-04/wp-content/uploads/sites/1398/2023/09/product-01-a-300x300.jpg" alt="" />
          </div>
          <div>
            <Rating value={5} className='mt-3' />
            <h2 className=' text-xl'>Product Name</h2>
            <p>$21.00</p>
          </div>
          <div className='mt-3'>
            <button className='bg-sky-600 text-sm text-black mr-2 px-3 py-2'>ADD TO CART</button>
            <button className='bg-sky-600 text-sm text-black ml-2 px-3 py-2' >BUY NOW</button>
          </div>
        </div>
      
        <div>
          <div>
            <img className='w-[300px] h-[300px] rounded-sm object-cover' src="https://websitedemos.net/halloween-shop-04/wp-content/uploads/sites/1398/2023/09/product-01-a-300x300.jpg" alt="" />
          </div>
          <div>
            <Rating value={5} className='mt-3' />
            <h2 className=' text-xl'>Product Name</h2>
            <p>$21.00</p>
          </div>
          <div className='mt-3'>
            <button className='bg-sky-600 text-sm text-black mr-2 px-3 py-2'>ADD TO CART</button>
            <button className='bg-sky-600 text-sm text-black ml-2 px-3 py-2' >BUY NOW</button>
          </div>
        </div>
      
       

      </div>
      <div className=' md:w-[70%] w-[90%] opacity-50 bg-slate-50 h-[0.4px] m-auto'>  </div>
    </div>
  )
}

export default FeaturedProducts
