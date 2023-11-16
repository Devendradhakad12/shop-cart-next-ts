import { getUserDataFromToken } from "@/lib/getDataFromToken";
import { DataStoredInToken } from "@/lib/props";
import { tokenValue } from "@/lib/token";
import { Product } from "@/models/product.model";
import { NextResponse } from "next/server";
import {ObjectId} from "mongoose"

export async function PUT(
  req: Request,
  { params }: { params: { productid: string } }
) {
    try {
        const token = await tokenValue()
        const user =  await getUserDataFromToken() as DataStoredInToken
        if(!token || !user ) new NextResponse("Unauthorized", { status: 400 });
        const { rating, comment,productId} = await req.json()
        const product =   await Product.findById({_id:productId})
        if(!product) new NextResponse("Product not found", { status: 400 });
        const review = {
          user:  user.id ,
          name: user.name, 
          rating: Number(rating),
          comment,
        };
        const isReviewed = product.reviews.find(
          (rev:any) => rev.user.toString() === user.id.toString()
        );
        if (isReviewed) {
          product.reviews.forEach((rev:any) => {
            if (rev.user.toString() === user.id.toString()) {
              (rev.rating = rating), (rev.comment = comment);
            }
          });
        } else {
          product.reviews.push(review);
          product.numOfReviews = product.reviews.length;
        }
        let avg = 0;
        product.reviews.forEach((rev:any) => {
          avg += rev.rating;
        });
        product.ratings = avg / product.reviews.length;
        await product.save({ validateBeforeSave: false });
        return NextResponse.json("Review Created", { status: 200 });
    } catch (error) {
      console.log("REVIEW_ERROR", error);
      return new NextResponse("Server error" ); 
    }
}
