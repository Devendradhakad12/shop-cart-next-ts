'use client'

import Loader from '@/components/loader'
import { getProduct } from '@/redux/actions/product-action'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { useEffect, useState } from 'react'

export default function Home() {
  const {products,loading,error} = useAppSelector((state)=>state.products)
  const dispatch = useAppDispatch()
 
  useEffect(()=>{
      dispatch(getProduct({}))
  },[dispatch])

  console.log(products)
  //console.log(loading)
  return (
    <div>
    {
      loading ? <Loader /> : <div>shop cart</div>
    }
    </div>
  )
}
