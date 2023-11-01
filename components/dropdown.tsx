'use client'

import { CarIcon, Home, LayoutDashboard, List, LogOut, PersonStanding, ShoppingCart } from 'lucide-react';
import React, { useState } from 'react'
import { Backdrop, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { useRouter, usePathname, redirect } from 'next/navigation';
import { toast } from "react-hot-toast"

const Dropdown = () => {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const navigate = usePathname()
    const item = 0
    const role = "admin"
    const option = [
        {
            icon: <LogOut />,
            name: "Logout",
            func: logOut,
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
    if (role === "admin") {
        option.push({
            icon: <LayoutDashboard />,
            name: "Dashboard",
            func: dashboard,
        });
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
    function logOut() {
        // dispatch(logoutUser())
        toast.success("Logout Successfully")
        router.replace("/")
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
