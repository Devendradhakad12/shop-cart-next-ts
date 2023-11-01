// get userdata

import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
import jwt from "jsonwebtoken";
import { User } from "@/models/user.model";

export async function GET(req: Request) {
  try {
    const cookieStore = cookies()
    const token =  cookieStore.get("scat")
    if(!token) return new NextResponse("Unauthorized",{status:401})
    const user =   jwt.verify(token.value,process.env.JWT_SECRETE!)
 
    return NextResponse.json(user,{status:200})
    
  } catch (error) {
    console.log("GET_USER_ERROR", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
