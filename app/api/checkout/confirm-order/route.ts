import { connectToDB } from "@/lib/database";
import { getUserDataFromToken } from "@/lib/getDataFromToken";
import { DataStoredInToken } from "@/lib/props";
import { tokenValue } from "@/lib/token";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import { Order } from "@/models/order.model";
import { redirect } from "next/navigation";
//import shortid from "shortid"



export async function POST(req: Request) {
 
  try {
    await connectToDB();
    const token = await tokenValue();
    const user = (await getUserDataFromToken()) as DataStoredInToken;
    if (!token || !user) new NextResponse("Unauthorized", { status: 500 });

    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      orderId,
    } = await req.json();
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.PAZORPAY_API_SECRET!)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      const order: any = await Order.findOne({ orderId });
      order.paymentStatus = "paid";
      order.payment = {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      };
      await order.save();
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log("CREATE_ORDER_ERROR", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
