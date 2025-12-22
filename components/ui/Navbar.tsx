"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/authContext/AuthContext";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuthContext();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.replace("/home");
  }

  return (
    <nav
      className="
        fixed top-0 left-0 w-full z-50
        bg-black/70 backdrop-blur-md
        border-b border-white/10
        shadow-lg
      "
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 text-white">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold tracking-wide">
          Oracle
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-8 text-sm md:text-base">
          <Link href="/home" className="hover:text-gray-300 transition">
            Home
          </Link>

          <Link href="/products" className="hover:text-gray-300 transition">
            Products
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="hover:text-gray-300 transition"
              >
                Dashboard
              </Link>

              <span className="text-xs opacity-70 hidden sm:block">
                {user?.email}
              </span>

              <button
                onClick={handleLogout}
                className="px-4 py-1.5 rounded-md bg-white/10 hover:bg-white/20 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-300 transition">
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-1.5 rounded-md bg-white/10 hover:bg-white/20 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
