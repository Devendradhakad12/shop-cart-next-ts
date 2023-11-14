import { getUserDataFromToken } from "@/lib/getDataFromToken";
import { DataStoredInToken } from "@/lib/props";
import { tokenValue } from "@/lib/token";
import { Product } from "@/models/product.model";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try {
        const token = await tokenValue()
        const user =  await getUserDataFromToken() as DataStoredInToken
        if(!token || !user || user.role !== "admin") new NextResponse("Unauthorized", { status: 500 });
        const {productName, productDesc, productPrice, productStock, productCategory, images} = await req.json();
        if (
            images[0].url ||
            images[0].public_id ||
            images[0].url === undefined ||
            images[0].public_id === undefined
            )  new NextResponse("Images is required", { status: 500 });
            const product = await Product.create({name:productName,  description:productDesc, price:productPrice, stock:productStock,  category:productCategory, images});
            return NextResponse.json("Product Create",{status:200})
    } catch (error) {
        console.log("PRODUCT CREATING ERROR",error)
        return new NextResponse("Server error",{status:500})
    }
}  