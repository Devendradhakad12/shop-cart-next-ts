import React from 'react'



const BannerOne = () => {
  return (
    <div className='bannerDiv flex flex-col gap-4 justify-center md:items-start items-center    sm:m-14 m-8 md:pl-[130px] pl-0  py-10 rounded-xl relative sm:h-[520px] h-[450px]'>
 <p>NEW COLLECTION</p>
<h2 className=' font-mono md:text-5xl text-3xl font-bold md:text-start text-center md:w-[300px] '>ShopCart  New Laptops</h2>
<p className='md:w-[60%] w-[95%] md:text-start text-center'>Whether you prefer the charm of classic Halloween decor or the thrill of modern and innovative designs, these decorations invite you to join in the celebration of all things eerie, enigmatic, and enchanting.</p>
<button className=' float-left rounded-xl px-2 py-2 mt-10 bg-sky-500 font-bold text-black w-[150px]  text-xl'>Shop Now</button>
    </div>
  )
}

export default BannerOne
 