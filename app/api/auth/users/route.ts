import { getUserDataFromToken } from "@/lib/getDataFromToken";
import { DataStoredInToken } from "@/lib/props";
import { tokenValue } from "@/lib/token";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const token = await tokenValue()
        const user =  await getUserDataFromToken() as DataStoredInToken
        if(!token || !user || user.role!=="admin") new NextResponse("Unauthorized", { status: 400 });
        const users = await User.find({}).select("-password").select("-role");
        return NextResponse.json(users,{status:200})
    } catch (error) {
        console.log("GET_USERS_ERROR",error)
        return new NextResponse("Server error",{status:500})
    }
}