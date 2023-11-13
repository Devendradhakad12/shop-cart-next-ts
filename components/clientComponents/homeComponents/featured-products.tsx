'use client'

import Loader from '@/components/loader'
import { addItemsToCart } from '@/redux/actions/cart-action'
import { getProduct } from '@/redux/actions/product-action'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { Rating } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const FeaturedProducts = () => {

  const { products, loading, error } = useAppSelector((state) => state.products)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    dispatch(getProduct({})) 
  }, [dispatch])

  // console.log(products)
  // console.log(loading)

  const onClick = (id: string) => {
    router.push(`/product/details/${id}`)
  }

  const addToCart = (id: string) => {
    dispatch(addItemsToCart(id, 1))
  }
  const shopNowHandler = (id: string) => { 
    router.push(`/checkout/address?productid=${id}`) 
  }

  return (
    <div className='md:pt-10 pt-2 relative featureProduct'>
      <div className='flex flex-col justify-center items-center  mb-10  m-auto pb-5'>
        <p className=' text-sky-400 uppercase'>Best Selling</p>
        <h2 className='md:text-5xl text-4xl font-mono font-bold'>Products</h2>
        <div className=' w-[50px] opacity-50 bg-slate-50 h-[1px] md:mt-5 mt-3'>  </div>
      </div>



      {/* products container  */}
      <div className='flex justify-center items-center flex-wrap gap-10 pb-10'>

        {/* product  */}
        {
          loading ? <Loader /> : <>{products[0].name !== "" ?
            <>
              {
                products && products.map((product: any) => (

                  <div className='  md:w-fit w-[150px]' key={product._id}>
                    <button className='' onClick={() => onClick(product._id)}>
                      <div className='flex justify-center items-center '>
                        <img className='md:w-[240px] w-[100px] md:h-[240px] h-[100px] rounded-sm object-contain' src={product.images[0].url} alt="" />

                      </div>
                      <div>
                        <Rating name="half-rating" value={product.ratings} readOnly className='mt-3' size='small' />
                        <h2 className=' text-xl'>{product.name}</h2>
                        <p className=' font-bold'>₹ {product.price}</p>
                      </div>
                    </button>
                    <div className='mt-3 text-center justify-center items-center flex gap-2'>

                      <button onClick={() => addToCart(product._id)} className='button bg-orange-600 md:text-sm text-xs text-black mr-2 px-3 py-1'>ADD TO CART</button>
                      <button onClick={() => shopNowHandler(product._id)} className='bg-orange-600 button md:text-sm  text-xs font-bold text-black ml-2 px-3 py-1' >BUY</button>
                    </div>
                  </div>

                ))
              }
            </> :

            <>
              <div>Product not Available</div>
            </>}</>
        }






      </div>
      <div className=' md:w-[70%] w-[90%] opacity-50 bg-slate-50 h-[0.4px] m-auto'>  </div>
    </div>
  )
}

export default FeaturedProducts
