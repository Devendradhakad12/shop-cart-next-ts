import { LinkedIn } from '@mui/icons-material'
import { Github, Instagram, Linkedin, Lock, Lollipop, LucideIcon, Satellite, TrainTrackIcon, Truck } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
<>
<div className=" flex justify-start items-center flex-col md:mx-[150px] mx-0">

<div className='flex md:flex-row flex-col md:my-10 my-4'>
  <FooterOne icon={Truck} heding='FREE SHIPPING' para='Enjoy the treat of free shipping on all your Halloween must-haves' />
  <FooterOne icon={Lock} heding='SECURE PAYMENTS' para='Shop with confidence knowing that your payments are securely processed for a worry-free Halloween experience' />
  <FooterOne icon={Satellite} heding='ORDER TRACKING' para='Stay in the know with real-time order tracking to ensure your Halloween treasures arrive right on time' />
</div>

<div className=' md:w-[90%] w-[90%] md:opacity-50 opacity-0 bg-slate-50 h-[0.4px] m-auto'>  </div>


<div className='flex justify-evenly my-14 gap-5 w-full mx-20'>

  <div className=' italic text-2xl font-bold text-sky-600'>ShopCart</div>

  <div>
    <ul className=''>
      <li className=' list-none text-orange-500'><Link href={"/"} >Home</Link></li>
      <li className=' list-none'><Link href={"https://devendra-dhakad-portfolio.vercel.app/"}  target='_blank'>About</Link></li>
      <li className=' list-none'><Link href={"https://devendra-dhakad-portfolio.vercel.app/"} target='_blank' >Contact</Link></li>
    </ul>
  </div>

  <div className='flex gap-3'>
      <Link href={"https://www.linkedin.com/in/devendra-dhakad-2a6229253"} target='_blank'><Linkedin/></Link>
      <Link href={"https://github.com/Devendradhakad12"} target='_blank'><Github /></Link>
      <Link href={"https://devendra-dhakad-portfolio.vercel.app/"} target='_blank' ><Instagram /></Link>
  </div>

</div>

</div>
<div className=' md:w-[98vw] w-[90%] opacity-50 bg-slate-50 h-[0.4px] m-auto'>  </div>

<div className='m-auto  text-center my-10'>
  <p>
  Copyright © 2023 ShopCart | Powered by ShopCart
  </p>
</div>
</>
  )
}
interface FooterOne {
  heding: string,
  para: string,
  icon: LucideIcon
}

function FooterOne({ heding, para, icon: Icon }: FooterOne) {
  return (

    <div className='flex justify-center items-center flex-col mt-10 px-10 gap-3'>
      <Icon size={'34'} />
      <h2 className='font-bold text-2xl'> {heding}</h2>
      <p className='text-center  opacity-60'>{para}</p>
      <div className=' md:w-[0%] w-[90%] opacity-30 bg-slate-50 h-[0.1px] mt-10 m-auto'>  </div>
    </div>
  )
}

export default Footer
