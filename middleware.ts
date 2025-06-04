// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { protectedRoutes } from "@/utils/protectedRoutes";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const path = request.nextUrl.pathname;

  const isProtected = protectedRoutes.some(route =>
    path.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/settings/:path*",
    "/admin/:path*",
  ],
};
