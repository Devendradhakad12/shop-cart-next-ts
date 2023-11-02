// get userdata

import { connectToDB } from "@/lib/database";
import { DataStoredInToken } from "@/lib/props";
import { User } from "@/models/user.model";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    //get token from cookie
    const cookieStore = cookies();
    const token = cookieStore.get("scat");
    if (!token) return new NextResponse("Unauthorized", { status: 401 });

    // verify token
    const user = jwt.verify(
      token.value,
      process.env.JWT_SECRETE!
    ) as DataStoredInToken;
    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    //find user from database
    const userinfo = await User.findById({ _id: user?.id }).select("-password");
    return NextResponse.json(userinfo, { status: 200 });
  } catch (error: any) {
    console.log("GET_USER_ERROR", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
