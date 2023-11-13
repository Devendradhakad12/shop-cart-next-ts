'use client'


import Loader from '@/components/loader'
import { addItemsToCart } from '@/redux/actions/cart-action'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Rating,
} from "@mui/material"
import axios from 'axios'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import ReactImageMagnify from 'react-image-magnify'
import ReviewCard from './_components/review-card'

interface ProductTypes {
    product: {
        _id: string,
        reviews: [],
        description: string,
        stock: number,
        price: number,
        name: string,
        ratings: number,
        category: string,
        images: [{ url: string }]
    }[]
}

const ProductDetailsPage = ({ params }: { params: { productid: string } }) => {
    const productid = params.productid
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const { user, token } = useAppSelector((state) => state.userToken)
    const dispatch = useAppDispatch()
    const [imageurl, setImageUrl] = useState("")
    const [itemCount, setItemsCount] = useState(1)
    const [product, setproduct] = useState<ProductTypes['product']>([])


    const getProduct = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`/api/product/${productid}`)
            setproduct([res.data])
            setImageUrl(res.data.images[0].url)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getProduct()

    }, [productid])

    const addToCart = (id: string) => {
        dispatch(addItemsToCart(id, itemCount))
    }





    //* submit review function
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("")
    const [success, setSuccess] = useState(false) // for reviews
    const [revLoading, setRevLoading] = useState(false) // for reviews

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true)
    };

    const reviewSubmitHandler = async () => {
        if (!token || !user) return router.push("/login")
        if (rating === 0 || comment === "") {
            toast.error("Please Add Ratings and Comment")
        } else {
            const config = {
                headers: {
                    "Content-Type": "application/json",

                }
            }
            const reviewData = {
                rating: rating,
                comment: comment,
                productId: productid
            }
            try {
                setRevLoading(true)
                const { data } = await axios.put(`/api/product/${productid}/review`, reviewData, config);
                console.log(data)
                toast.success("Review added")
                setOpen(false)
                setSuccess(!success)
                setRating(0)
                setComment("")
                 getProduct()
            } catch (error) {
                toast.error("Something went wrong");
                console.log(error)
            } finally {
                setRevLoading(false)
            }
        }
    }


    return (
        <div>
            {
                loading ? <Loader /> : <>
                    {
                        product ? <>

                            <div className='flex justify-evenly m-auto    md:flex-row  flex-col '>

                                <div className=' md:w-[50%]   imagesDiv flex flex-col justify-center items-center mt-10 mx-4'>

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
                                            product[0].images.map((image, index) => (
                                                <img className='w-[120px] h-[90px] object-cover mx-1 cursor-pointer' src={image.url} alt="" key={index} onClick={() => setImageUrl(image.url)} />
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className=' md:pl-10 pl-20 flex flex-col justify-center items-center md:items-start   md:w-[50%]  md:mt-20 mt-10'>
                                    <div>
                                        <h3 className='mb-5 capitalize text-orange-600'>{product && product[0].category}</h3>
                                        <Rating name="half-rating" readOnly value={product[0].ratings} size='small' />
                                        <h3 className='mb-2 md:text-4xl text-2xl capitalize font-bold font-mono'>{product && product[0].name}</h3>
                                        <p className='mb-1 md:text-3xl text-xl capitalize font-bold font-mono'>₹{product && product[0].price}</p>
                                        {
                                            product && product[0]?.stock !== 0 ? <p className=' text-green-600'>Stock</p> : <p className=' text-red-600'>OutOfStock</p>
                                        }
                                        <div className=' flex gap-4 mt-1 mb-3'>
                                            <div className='flex'>
                                                <button onClick={() => { if (itemCount > 1) { setItemsCount((pre) => { return pre - 1 }) } }} className='bg-orange-500 text-black w-10 font-bold text-xl rounded-none m-0'>-</button>
                                                <p className=' border-y border-orange-500 w-10 text-center m-0 '>{itemCount}</p>
                                                <button onClick={() => { if (itemCount < product[0]?.stock) { setItemsCount((pre) => { return pre + 1 }) } }} className='bg-orange-500 text-black w-10 font-bold text-xl rounded-none m-0'>+</button>
                                            </div>
                                            <button onClick={() => addToCart(product[0]._id)} className='border border-sky-300 text-sm text-white rounded-none px-3 py-1'><ShoppingCart /></button>

                                        </div>

                                        <p className='md:text-2xl text-lg capitalize'>{product && product[0].description}</p>

                                        <div className='mb-10 mt-5'>
                                            {/* Submit review */}
                                            <button className=" bg-amber-500 text-black px-2 py-2 rounded-xl font-bold text-xl button" onClick={() => { if (!token) { router.push("/login") } else { setOpen(true) } }}>Submit Review</button>
                                            <Dialog
                                                open={open}
                                                onClose={submitReviewToggle}
                                            >
                                                <DialogTitle>Submit Review</DialogTitle>
                                                <DialogContent className="flex items-center flex-col md:w-[400px] w-[300px]">
                                                    <Rating onChange={(e: any) => setRating(Number(e.target.value))} value={rating} size="large" />
                                                    <textarea className="w-full px-10 py-3 border border-opacity-60 border-slate-600" rows={4} value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={submitReviewToggle} color="secondary">Cancel</Button>
                                                    <Button onClick={reviewSubmitHandler} className=' disabled:opacity-70' disabled={revLoading}>Submit</Button>
                                                </DialogActions>
                                            </Dialog>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <ReviewCard reviews={product[0].reviews} />
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
