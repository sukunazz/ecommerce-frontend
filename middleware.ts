import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token");
  const { pathname } = req.nextUrl;

  if (token && pathname.startsWith("/auth/login")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    pathname.startsWith("/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // Protect home route and others
  if (!token && pathname === "/") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!api|_next|favicon.ico).*)"],
};
