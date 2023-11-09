import { NextRequest, NextResponse } from "next/server";
import { tokenValue } from "./lib/token";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublic = path === "/signup" || path === "/login";
  const token = tokenValue();
  if (isPublic && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/profile", "/login", "/signup", "/admin/dashboard","/cart"],
};
