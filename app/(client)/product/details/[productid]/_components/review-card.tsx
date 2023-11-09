import { Rating } from '@mui/material'
import { User } from 'lucide-react'
import React from 'react'

const ReviewCard = ({ reviews }: { reviews: {}[] }) => {
    console.log(reviews)
    return (
        <div className='flex justify-center items-center flex-col my-3'>
            <h2 className='text-3xl border-b border-sky-200 pb-3'>Reviews</h2>
            {
                reviews.length ? <>
                    <div className='mt-10'>
                        {
                            reviews.map((review:any) => (
                                <div className='border w-[300px] border-gray-300 rounded-lg flex gap-6 px-10 py-5  justify-center items-center flex-col  ' key={review._id}>
                                    <h3 className=' text-xl text-center'><User className='ml-1' />  {review.name}</h3>
                                    <Rating name="half-rating" value={review.rating} readOnly size='small'  />
                                    <p className='text-center'>{review.comment}</p>
                                </div>
                            ))
                        }
                    </div>
                </> : <>
                    <div>
                        No Reviews yet
                    </div>
                </>
            }
        </div>
    )
}

export default ReviewCard
