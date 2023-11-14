'use client'


import Loader from '@/components/loader'
import { addItemsToCart } from '@/redux/actions/cart-action'
import { getProduct } from '@/redux/actions/product-action'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { Rating } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const ProductPAge = ({ params }: { params: { query: string } }) => {
  const query = params.query
  const { products, loading, error } = useAppSelector((state) => state.products)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [price, settPrice] = useState([0, 2000000000])
  const [category, setCategory] = useState<string | null>(null)


  useEffect(() => {
    if (category) {
      dispatch(getProduct({ category }))
    } else {
      dispatch(getProduct({ keyword: query }))
    }
  }, [dispatch, query, category])
  // console.log(query)

  const onClick = (id: string) => {
    router.push(`/product/details/${id}`)
  }

  const addToCart = (id: string) => {
    dispatch(addItemsToCart(id, 1))
  }
  const shopNowHandler = (id: string) => {
    router.push(`/checkout/address?productid=${id}`)
  }

  //xconsole.log(products)
  //  console.log(loading)
  const categories = ["phones", "laptops", "cloths", "gadgets", "toys", "food", "beauty", "sports", "watch", "shoes", "bag"]
  return (
    <div className='flex '>

  {/*     <div className='md:flex hidden justify-center pt-5 border-r border-r-rose-50 min-h-[100vh] min-w-[20vw]'>
        <div>

          <select id="countries" className={"selectButton"} onChange={(e) => setCategory(e.target.value)} required >
            <option value={""} selected>Choose a Category</option>
            {
              categories.map((item) => (
                <option key={item} value={item} className=" capitalize py-2" >{item}</option>
              ))
            }
          </select>
        </div>
      </div> */}


      {/* products container  */}
      <div className='flex min-w-full flex-col items-center'>
        <h2 className=' text-2xl text-center capitalize mt-5 '>{query}</h2>
        <div className='flex justify-center items-center flex-wrap gap-10 pb-10 mt-10'>
          {/* product  */}
          {
            loading ? <Loader /> : <>{products.length ?
              <>
                {
                  products && products.map((product: any) => (

                    <div className='md:w-fit w-[150px]' key={product._id}>
                      <button onClick={() => onClick(product._id)}>
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

                        <button onClick={() => addToCart(product._id)} className='button bg-orange-600 md:text-sm text-xs text-black mr-2 px-3 py-1'>CART</button>
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
      </div>

    </div>
  )
}

export default ProductPAge
