import { getUserDataFromToken } from "@/lib/getDataFromToken";
import { DataStoredInToken } from "@/lib/props";
import { tokenValue } from "@/lib/token";
import { Order } from "@/models/order.model";
import { NextResponse } from "next/server"

export async function PUT(req:Request){
    try {
        const {id,status} = await req.json()
        const token = await tokenValue()
        const user =  await getUserDataFromToken() as DataStoredInToken
        if(!token || !user || user.role!=="admin") new NextResponse("Unauthorized", { status: 500 });
        const order:any = await Order.findOne({paymentStatus:"paid",_id:id}).select("-payment");
         order.status = status || order.status
        await order.save()
        return NextResponse.json("Status Updated",{status:200})
    } catch (error) {
        console.log("GET_ORDERS_ERROR",error)
        return new NextResponse("Server error",{status:500})
    }
}