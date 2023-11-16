import { getUserDataFromToken } from "@/lib/getDataFromToken";
import { DataStoredInToken } from "@/lib/props";
import { tokenValue } from "@/lib/token";
import { Order } from "@/models/order.model";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { orderid: string } }
) {
  try {
    const token = await tokenValue();
    const user = (await getUserDataFromToken()) as DataStoredInToken;
    if (!token || !user) new NextResponse("Unauthorized", { status: 400 });
    const order = await Order.find({
      user: user.id,
      paymentStatus: "paid",
      _id: params.orderid,
    })
      .select("-shippingAddress")
      .select("-payment")
      .populate("products.product");
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.log("GET_ORDER_ERROR", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
