import { connectToDB } from "@/lib/database";
import { getUserDataFromToken } from "@/lib/getDataFromToken";
import { DataStoredInToken } from "@/lib/props";
import { tokenValue } from "@/lib/token";
import { Order } from "@/models/order.model";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
//import shortid from "shortid"

export const instance =  new Razorpay({ 
    key_id: process.env.RAZORPAY_API_KEY!,
    key_secret: process.env.PAZORPAY_API_SECRET!,
  });

export async function POST(req:Request) {
    try {
     
        await connectToDB()
        const token = await tokenValue()
        const user =  await getUserDataFromToken() as DataStoredInToken
        if(!token || !user ) new NextResponse("Unauthorized", { status: 500 });
          
        const {products,amount,shippingAddress,totalItem} = await  req.json()
        const options = {
            amount: Number(amount * 100), // amount in the smallest currency unit Rs. 500
            currency: "INR",
            payment_capture:1,
          };
          const order = await instance.orders.create(options);
          await Order.create({
            user:user.id,
            products,
            totalPrice:amount,
            totalItem,
            shippingAddress,
            orderId:order.id,
            paymentStatus:"pending"
          })
     
        return  NextResponse.json(order,{status:200})

    } catch (error) {
              console.log("CREATE_ORDER_ERROR",error)
        return new NextResponse("Server error",{status:500})
    }
} 