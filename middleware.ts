// frontend/src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Get the token from cookies
  const accessToken = req.cookies.get("access_token");
  const refreshToken = req.cookies.get("refresh_token");

  console.log("🔍 MIDDLEWARE CHECK:");
  console.log("  📍 Path:", pathname);
  console.log("  🍪 access_token exists:", !!accessToken);
  console.log("  🍪 refresh_token exists:", !!refreshToken);
  console.log(
    "  🍪 access_token value:",
    accessToken?.value?.substring(0, 20) + "..."
  );

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    console.log("  ✅ Static/API - skipping");
    return NextResponse.next();
  }

  // Auth routes: /auth/login, /auth/register, /auth/verify
  if (pathname.startsWith("/auth")) {
    if (accessToken) {
      console.log("  🔄 Already logged in, redirecting to home");
      return NextResponse.redirect(new URL("/", req.url));
    }
    console.log("  ✅ Auth page - allowing access");
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
    if (!accessToken) {
      console.log("  ❌ No token - redirecting to login");
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    console.log("  ✅ Token exists - allowing protected route");
    return NextResponse.next();
  }

  // All other routes (/, /about, /products, /contact, etc.) are public
  console.log("  ✅ Public route - allowing");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
