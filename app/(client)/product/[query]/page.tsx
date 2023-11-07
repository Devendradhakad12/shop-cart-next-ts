'use client'

 
import Loader from '@/components/loader'
import { getProduct } from '@/redux/actions/product-action'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { useEffect, useState } from 'react'

const ProductPAge = ({params}:{params:{query:string}}) => {
    const query = params.query
    const {products,loading,error} = useAppSelector((state)=>state.products)
    const dispatch = useAppDispatch()
 
    const [currentPage,setCurrentPage] = useState(1)
    const [price,settPrice] = useState([0,2000000000])
    const [category,setCategory] = useState<string | null>(null)
      
  
    useEffect(()=>{
        dispatch(getProduct({keyword:query}))
    },[dispatch,query])
    console.log(query)
  
    console.log(products)
    console.log(loading)
  return (
    <div>
        {
      loading ? <Loader /> : <div>{query}</div>
    }
      
    </div>
  )
} 

export default ProductPAge
