import { connectToDB } from "@/lib/database";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { username, email, password: pass } = await req.json();
    const userExist = await User.findOne({ email });
    if (userExist)
      return new NextResponse("User Already Exist", { status: 400 });
    if (!username || !email || !pass)
      return new NextResponse("Missing Data", { status: 400 });
    const hashPassword = await bcrypt.hash(pass, 10);
    const user = await User.create({
      username,
      email,
      password: hashPassword,
      name: username,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETE!);

    cookies().set({
      name: "scat",
      value: token,
      httpOnly: true,
      path: "/",
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("SIGNUP_ERROR", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}

//   const compare = await bcrypt.compare(password,hashPassword)
