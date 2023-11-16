import { getUserDataFromToken } from "@/lib/getDataFromToken";
import { DataStoredInToken } from "@/lib/props";
import { tokenValue } from "@/lib/token";
import { Order } from "@/models/order.model";
import { NextResponse } from "next/server"

export async function GET(){
    try {
        const token = await tokenValue()
        const user =  await getUserDataFromToken() as DataStoredInToken
        if(!token || !user || user.role!=="admin") new NextResponse("Unauthorized", { status: 400 });
        const orders = await Order.find({paymentStatus:"paid"}).select("-payment").populate('products.product');
        return NextResponse.json(orders,{status:200})
    } catch (error) {
        console.log("GET_ORDERS_ERROR",error)
        return new NextResponse("Server error")
    }
}