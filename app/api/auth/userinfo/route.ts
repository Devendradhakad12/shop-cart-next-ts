// get userdata

import { User } from "@/models/user.model";
import jwt from "jsonwebtoken";
import { cookies } from 'next/headers';
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const cookieStore = cookies()
    const token =  cookieStore.get("scat")
    if(!token) return new NextResponse("Unauthorized",{status:401})
    const user =  jwt.verify(token.value,process.env.JWT_SECRETE!)
       if(!user) return  new NextResponse("Unauthorized",{status:401})
   //    const userinfo = await User.findById({_id:user?.id})
    return NextResponse.json(user,{status:200})
    
  } catch (error) {
    console.log("GET_USER_ERROR", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
