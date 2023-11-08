'use client'


import Loader from '@/components/loader'
import { getProduct } from '@/redux/actions/product-action'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ReactImageMagnify from 'react-image-magnify'

const ProductDetailsPage = ({ params }: { params: { productid: string } }) => {
    const productid = params.productid
    const router = useRouter()
    const { products, loading, error } = useAppSelector((state) => state.products)
    const dispatch = useAppDispatch()
    const [imageurl, setImageUrl] = useState("")
    const [itemCount,setItemsCount] = useState(1)

    const filteredProduct = products.filter((product) => product?._id === params.productid)



    useEffect(() => {
        if (products.length < 2) dispatch(getProduct({}))
        if (!imageurl) setImageUrl(filteredProduct[0]?.images[0].url)
        //    console.log("useEffet")
    }, [dispatch, productid, filteredProduct])
    // console.log("Produucts", products)
    console.log("filterProducts", filteredProduct)
    //  console.log("imageurl", imageurl)
    //  console.log(loading)

    return (
        <div>
            {
                loading ? <Loader /> : <>
                    {
                        filteredProduct ? <>

                            <div className='flex justify-evenly  md:flex-row  flex-col '>

                                <div className='imagesDiv flex flex-col justify-center items-center mt-10 mx-4'>

                                    <div className='md:w-[500px]  h-[400px]  text-center object-cover mb-[10px] flex justify-center items-center  rounded-xl'>
                                        <ReactImageMagnify {...{
                                            smallImage: {
                                                alt: 'Wristwatch by Ted Baker London',
                                                isFluidWidth: false,
                                                src: imageurl,
                                                height: window.innerWidth < 700 ? 350 : 400,
                                                width: window.innerWidth < 700 ? 300 : 500,


                                            },
                                            largeImage: {
                                                src: imageurl,
                                                width: window.innerWidth < 700 ? 300 : 400,
                                                height: window.innerWidth < 700 ? 600 : 1000

                                            },
                                            enlargedImagePosition: "over"

                                        }}
                                        />
                                    </div>




                                    {/*                                     <img className='md:w-[500px] md:h-[400px] w-[400px]  h-[300px] object-cover   rounded-xl' src={imageurl} alt="" /> */}
                                    <div className='flex mt-3'>
                                        {
                                            filteredProduct[0].images.map((image, index) => (
                                                <img className='w-[120px] h-[90px] object-cover mx-1 cursor-pointer' src={image.url} alt="" key={index} onClick={() => setImageUrl(image.url)} />
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className='md:pl-10 pl-20  w-full  md:mt-20 mt-10'>
                                    <div>
                                        <h3 className='mb-5 capitalize text-orange-600'>{filteredProduct && filteredProduct[0].category}</h3>
                                        <h3 className='mb-2 md:text-4xl text-2xl capitalize font-bold font-mono'>{filteredProduct && filteredProduct[0].name}</h3>
                                        <p className='mb-1 md:text-3xl text-xl capitalize font-bold font-mono'>₹{filteredProduct && filteredProduct[0].price}</p>
                                        {
                                        filteredProduct && filteredProduct[0]?.stock !== 0 ?  <p className=' text-green-600'>Stock</p> : <p className=' text-red-600'>OutOfStock</p>
                                       }
                                        <div className=' flex gap-4 mt-1 mb-3'>
                                            <div className='flex'>
                                                <button onClick={()=>{if(itemCount > 1){setItemsCount((pre)=>{return pre-1})}}} className='bg-orange-500 text-black w-10 font-bold text-xl rounded-none m-0'>-</button>
                                                <p className=' border-y border-orange-500 w-10 text-center m-0 '>{itemCount}</p>
                                                <button  onClick={()=>{if(itemCount < filteredProduct[0]?.stock ){setItemsCount((pre)=>{return pre+1})}}} className='bg-orange-500 text-black w-10 font-bold text-xl rounded-none m-0'>+</button>
                                            </div>
                                            <button  className='border border-sky-300 text-sm text-white rounded-none px-3 py-1'><ShoppingCart /></button>
                                        </div>
                                        <p className='md:text-2xl text-lg capitalize'>{filteredProduct && filteredProduct[0].description}</p>
                                     
                                    </div>
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
