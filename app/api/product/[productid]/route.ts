import cloudinary from "@/lib/cloudinary";
import { getUserDataFromToken } from "@/lib/getDataFromToken";
import { DataStoredInToken } from "@/lib/props";
import { tokenValue } from "@/lib/token";
import { Product } from "@/models/product.model";
import { NextResponse } from "next/server";

// get single product
export async function GET( 
  req: Request,
  { params }: { params: { productid: string } }
) {
  try {
    const token = await tokenValue();
    const user = (await getUserDataFromToken()) as DataStoredInToken;
    if (!token || !user || user.role !== "admin")
      new NextResponse("Unauthorized", { status: 400 });
    const productId = params.productid;
    const product = await Product.findById({ _id: productId });
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("PRODUCT_DELETE_ERROR", error);
    return new NextResponse("Server error", { status: 400 });
  }
}

//  update product
export async function PATCH(
  req: Request,
  { params }: { params: { productid: string } }
) {
  try {
    const token = await tokenValue();
    const user = (await getUserDataFromToken()) as DataStoredInToken;
    if (!token || !user || user.role !== "admin")
      new NextResponse("Unauthorized", { status: 400 });
    const {
      productName,
      productDesc,
      productPrice,
      productStock,
      productCategory,
      images,
    } = await req.json();
    const productId = params.productid;
    const product = await Product.findById({ _id: productId });
    product.name = productName || product.name;
    product.description = productDesc || product.description;
    product.price = productPrice || product.price;
    product.stock = productStock || product.stock;
    product.category = productCategory || product.category;
    await product.save();
    return NextResponse.json("product updated", { status: 200 });
  } catch (error) {
    console.log("PRODUCT_DELETE_ERROR", error);
    return new NextResponse("Server error", { status: 500 });
  }
}

// delete product
export async function DELETE(
  req: Request,
  { params }: { params: { productid: string } }
) {
  try {
    const token = await tokenValue();
    const user = (await getUserDataFromToken()) as DataStoredInToken;
    if (!token || !user || user.role !== "admin")
      new NextResponse("Unauthorized", { status: 400 });
    const productId = params.productid;
    const product = await Product.findById({ _id: productId });
    product.images.map(async (image: any) => {
      await cloudinary.v2.uploader.destroy(image.public_id);
    });
    await product.deleteOne();
    return NextResponse.json("Product Deleted", { status: 200 });
  } catch (error) {
    console.log("PRODUCT_DELETE_ERROR", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
