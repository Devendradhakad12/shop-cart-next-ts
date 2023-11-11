import { getUserDataFromToken } from "@/lib/getDataFromToken";
import { DataStoredInToken } from "@/lib/props";
import { tokenValue } from "@/lib/token";
import { Order } from "@/models/order.model";
import { NextResponse } from "next/server"

export async function GET(){
    try {
        const token = await tokenValue()
        const user =  await getUserDataFromToken() as DataStoredInToken
        if(!token || !user) new NextResponse("Unauthorized", { status: 500 });
        const orders = await Order.find({user:user.id,paymentStatus:"paid"}).select("-shippingAddress").select("-payment").populate('products.product');
        return NextResponse.json(orders,{status:200})
    } catch (error) {
        console.log("GET_ORDER_ERROR",error)
        return new NextResponse("Server error",{status:500})
    }
}