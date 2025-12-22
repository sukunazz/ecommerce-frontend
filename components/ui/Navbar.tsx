"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/authContext/AuthContext";
import { RequireRole } from "@/components/auth/RequireRole";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuthContext();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-20 backdrop-blur-lg bg-white/10 border-b border-white/20">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3 text-white">
        {/* Logo */}
        <div className="text-xl font-semibold tracking-wide">
          <Link href="/">Oracle</Link>
        </div>

        {/* Links */}
        <div className="flex items-center space-x-8 text-lg">
          <Link href="/" className="hover:text-blue-300">
            Home
          </Link>

          <Link href="/about" className="hover:text-blue-300">
            About
          </Link>

          <Link href="/contact" className="hover:text-blue-300">
            Contact
          </Link>

          {/* 🔐 Auth-based UI */}
          {!isAuthenticated ? (
            <>
              <Link href="auth/login">Login</Link>
              <Link href="auth/register">Register</Link>
            </>
          ) : (
            <>
              <span className="text-sm opacity-80">{user?.email}</span>

              <button
                onClick={handleLogout}
                className="px-3 py-1 border rounded hover:bg-white/20"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
