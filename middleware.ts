// frontend/src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token");
  const { pathname } = req.nextUrl;

  console.log("🔍 MIDDLEWARE:", pathname, "| Token:", !!token);

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Auth routes: /auth/login, /auth/register, /auth/verify
  if (pathname.startsWith("/auth")) {
    if (token) {
      console.log("🔄 Already logged in, redirecting to home");
      return NextResponse.redirect(new URL("/", req.url));
    }
    console.log("✅ Allowing auth page access");
    return NextResponse.next();
  }

  // Protected routes: /dashboard, /profile, /orders, /admin, /settings
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/orders") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/settings")
  ) {
    if (!token) {
      console.log("🔄 No token, redirecting to login");
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    console.log("✅ Token exists, allowing protected route");
    return NextResponse.next();
  }

  // All other routes (/, /about, /products, /contact, etc.) are public
  console.log("✅ Public route, allowing access");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
