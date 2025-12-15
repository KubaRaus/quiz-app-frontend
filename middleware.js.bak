import { NextResponse } from "next/server";

export function middleware(request) {
  // Middleware do ochrony tras - można rozszerzyć o weryfikację tokena
  return NextResponse.next();
}

export const config = {
  matcher: ["/(protected)/:path*"],
};
