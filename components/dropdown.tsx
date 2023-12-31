'use client'

import { DataStoredInToken, userProps } from "@/lib/props";
import { useAppSelector } from "@/redux/hook";
import { Backdrop, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import axios from "axios";
import { Box, Home, LayoutDashboard, List, LogIn, ShoppingCart, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface DropdownProps {
    token: string | undefined | null,
    user:DataStoredInToken
}



const Dropdown = ({ token,user }: DropdownProps) => {

    const {cart:Cart} = useAppSelector((state)=>state.cart)
    const [open, setOpen] = useState(false)
    const router = useRouter()
    


  

    const option = [
        {
            icon: token ? <User /> : <LogIn />,
            name: token ? "Profile" : "Login",
            func: token ? profile : logIn,
        },
 

        {
            icon: <Box />,
            name: "Orders",
            func: order,
        },

        {
            icon: <ShoppingCart />,
            name: `Cart ${Cart.cartItems.length}`,
            func: cart,
        },

        {
            icon: <Home />,
            name: `Home`,
            func: home,
        },

    ];
    if (user) {
        if (user?.role === "admin") {
            option.push({
                icon: <LayoutDashboard />,
                name: "Dashboard",
                func: dashboard,
            });
        }
    }


    function dashboard() {
        router.replace("/admin/dashboard")
        setOpen(false)
    }
    function order() {
        router.replace("/orders")
        setOpen(false)
    }
    function account() {
        router.replace("/account")
        setOpen(false)

    }
    function cart() {
        router.replace("/cart")
        setOpen(false)


    }
    function home() {
        router.replace("/")
        setOpen(false)
    }
    function profile() {
        router.replace("/profile")
        setOpen(false)
    }
    function logIn() {
        router.replace("/login")
        setOpen(false)
    }

    return (

        <>
            <Backdrop open={open} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                icon={<SpeedDialIcon className='text-black bg-sky-600 w-full h-full rounded-full flex justify-center items-center' />}
                sx={{ position: 'fixed', bottom: 36, right: 36 }}
            >
                {option.map((op, i) => (
                    <SpeedDialAction className='text-white hover:bg-white hover:text-black' icon={op.icon} tooltipTitle={op.name} key={i} onClick={op.func} />
                ))}
            </SpeedDial>
        </>
    )
}

export default Dropdown
