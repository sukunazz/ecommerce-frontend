import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token");
  const { pathname } = req.nextUrl;

  console.log("🔍 Middleware Debug:");
  console.log("  📍 Path:", pathname);
  console.log("  🔑 Token exists:", !!token);
  console.log("  🍪 Token value:", token?.value?.substring(0, 20) + "...");

  // 1️⃣ Allow static files and API routes (no auth check)
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon")
  ) {
    console.log("  ✅ Static file/API - allowing");
    return NextResponse.next();
  }

  // 2️⃣ Define route types
  const publicRoutes = [
    "/", // 🏠 HOME PAGE IS PUBLIC!
    "/about",
    "/contact",
    "/products",
  ];

  const authRoutes = ["/auth/login", "/auth/register", "/auth/verify"];

  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/orders",
    "/admin",
    "/settings",
  ];

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  console.log("  🔍 Route type:");
  console.log("    - Public:", isPublicRoute);
  console.log("    - Auth:", isAuthRoute);
  console.log("    - Protected:", isProtectedRoute);

  // 3️⃣ If logged in and trying to access login/register, redirect to home
  if (token && isAuthRoute) {
    console.log("  🔄 Logged in user accessing auth page → redirect to home");
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 4️⃣ If NOT logged in and trying to access protected route, redirect to login
  if (!token && isProtectedRoute) {
    console.log("  🔄 Guest accessing protected route → redirect to login");
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // 5️⃣ Allow everything else (including public routes for both guests and logged-in users)
  console.log("  ✅ Access allowed - continuing");
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg).*)",
  ],
};
