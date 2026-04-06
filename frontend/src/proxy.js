// src/middleware.js
import { NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login"];

export function proxy(req) {
  
}

export const config = {
  matcher: [
    "/login",
    "/dashboard/:path*",
    "/protected/:path*",
    "/(protected)/:path*",
  ],
};