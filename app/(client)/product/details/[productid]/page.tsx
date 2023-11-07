'use client'


import Loader from '@/components/loader'
import { getProduct } from '@/redux/actions/product-action'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const ProductDetailsPage = ({ params }: { params: { productid: string } }) => {
    const productid = params.productid
    const router = useRouter()
    const { products, loading, error } = useAppSelector((state) => state.products)
    const dispatch = useAppDispatch()
    const [imageurl,setImageUrl] = useState("")

    const filteredProduct = products.filter((product) => product?._id === params.productid)



    useEffect(() => {
        if (products.length < 2) dispatch(getProduct({}))
       if(!imageurl)  setImageUrl(filteredProduct[0]?.images[0].url)
    console.log("useEffet")
    }, [dispatch, productid,filteredProduct])
   // console.log("Produucts", products)
  //  console.log("filterProducts", filteredProduct[0]?.images[0].url)
  //  console.log("imageurl", imageurl)
  //  console.log(loading)
    return (
        <div>
            {
                loading ? <Loader /> : <>
                    {
                        filteredProduct ? <>

                            <div className='flex justify-evenly items-center md:flex-row flex-col'>

                                <div className='imagesDiv flex flex-col justify-center items-center mt-10 mx-4'>

                                        <img className='md:w-[500px] md:h-[400px] w-[400px]  h-[300px] object-cover   rounded-xl' src={imageurl} alt="" />
                                    <div className='flex mt-3'>
                                        {
                                            filteredProduct[0].images.map((image, index) => (
                                                <img className='w-[120px] h-[90px] object-cover mx-1 cursor-pointer' src={image.url} alt="" key={index}  onClick={()=>setImageUrl(image.url)} />
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className='productDetialsDiv md:mt-0 m-20'>
                                   producct detals
                                </div>


                            </div>
                        </> : <>
                            <div className='flex justify-center items-center mt-10 flex-col'>
                                Something went wrong! click  below to refresh
                                <button onClick={() => router.refresh()}>Refresh</button>
                                <Link href={"/"}>Home</Link>
                            </div>
                        </>
                    }
                </>
            }

        </div>
    )
}

export default ProductDetailsPage
