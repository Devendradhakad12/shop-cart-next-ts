import { connectToDB } from "@/lib/database";
import { DataStoredInToken } from "@/lib/props";
import { User } from "@/models/user.model";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(req: Request, {params}:{params:{userid:string}} ) {
  try {
    await connectToDB();
    // get update info
    const { username, email,AddressInfo } = await req.json();

    //get token from cookie
    const cookieStore = cookies();
    const token = cookieStore.get("scat");
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 500 });

    // verify token
    const user = jwt.verify(
      token.value,
      process.env.JWT_SECRETE!
    ) as DataStoredInToken;
    if (!user || user.id !== params.userid)
      return NextResponse.json({ error: "Unauthorized" }, { status: 500 });

    //find user from database
    const userinfo = await User.findById({ _id: user?.id });
    userinfo.username = username || userinfo.username;
    userinfo.name = username ||  userinfo.name;
    userinfo.email = email ||  userinfo.email;
    userinfo.address = AddressInfo || userinfo.address
    userinfo.save();
    return NextResponse.json("Ingormation Updated", { status: 200 });
  } catch (error: any) {
    console.log("USER_APDATE_ERROR", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
