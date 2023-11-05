import ApiFeatures from "@/lib/apiFeatures";
import { getUserDataFromToken } from "@/lib/getDataFromToken";
import { DataStoredInToken } from "@/lib/props";
import { tokenValue } from "@/lib/token";
import { Product } from "@/models/product.model";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
  try {
    const token = await tokenValue();
    const user = (await getUserDataFromToken()) as DataStoredInToken;
    if (!token || !user) new NextResponse("Unauthorized", { status: 500 });
 
    // get search params from url
    const url = new URL(req.url)
    const keyword = url.searchParams.get("keyword")
    const page = url.searchParams.get("page")
    const priceGte = url.searchParams.get("price[gte]") || 0
    const priceLte = url.searchParams.get("price[lte]")  || 10000000000
    const price = {gte:priceGte,lte:priceLte}
    const category = url.searchParams.get("category")
    const query  = {keyword,page,price,category}

    // search , filter and pagination product using apiFeature
    const apiFeature = new ApiFeatures(Product.find(),query).search().pagination(5).filter()
    const products = await apiFeature.query;  
 
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.log("PRODUCTS FETCHING ERROR", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
