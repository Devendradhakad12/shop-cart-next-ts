import { connectToDB } from "@/lib/database";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// login

export async function POST(req: Request) {
  try {
    await connectToDB();

    const { email, password } = await req.json();
    if (!email || !password)
      return new NextResponse("Missing Data", { status: 400 });

    const user = await User.findOne({ email });
    if (!user)
      return new NextResponse("wrong email or password", { status: 400 });

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword)
      return new NextResponse("wrong email or password", { status: 401 });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETE!);

    cookies().set({
      name: "scat",
      value: token,
      httpOnly: true,
      path: "/"
    });

    return NextResponse.json("login successfuly", { status: 200 });
  } catch (error) {
    console.log("LOGIN_ERROR", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}

//   const compare = await bcrypt.compare(password,hashPassword)
