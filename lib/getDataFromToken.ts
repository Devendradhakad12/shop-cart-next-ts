// get user

import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
import jwt from "jsonwebtoken";
import { DataStoredInToken } from "./props";
 
 // get user name , email or id using token
export async function getUserDataFromToken() {
  try {
    const cookieStore = cookies()
    const token =  cookieStore.get("scat")
    if(!token) return  null
    const user =   jwt.verify(token.value,process.env.JWT_SECRETE!) as DataStoredInToken
 
    return user
    
  } catch (error) {
    console.log("GET_USER_ERROR", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
