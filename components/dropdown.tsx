'use client'

import { DataStoredInToken, userProps } from "@/lib/props";
import { Backdrop, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import axios from "axios";
import { Home, LayoutDashboard, List, LogIn, ShoppingCart, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface DropdownProps {
    token: string | undefined | null,
    user:DataStoredInToken
}



const Dropdown = ({ token,user }: DropdownProps) => {

  
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const item = 0


  

    const option = [
        {
            icon: token ? <User /> : <LogIn />,
            name: token ? "Profile" : "Login",
            func: token ? profile : logIn,
        },


        {
            icon: <List />,
            name: "Orders",
            func: order,
        },

        {
            icon: <ShoppingCart />,
            name: `Cart ${item}`,
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
    }
    function order() {
        router.replace("/order/me")
    }
    function account() {
        router.replace("/account")

    }
    function cart() {
        router.replace("/cart")


    }
    function home() {
        router.replace("/")
    }
    function profile() {
        router.replace("/profile")
    }
    function logIn() {
        router.replace("/login")
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
