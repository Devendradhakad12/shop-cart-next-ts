import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookieStore = cookies();
  cookieStore.delete("scat");
  return NextResponse.json("Loggedout", { status: 200 });
}
