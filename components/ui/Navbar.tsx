"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, User } from "lucide-react";
import { useAuthContext } from "@/context/authContext/AuthContext";
import { useCart } from "@/context/cart/CartContext";
import { useEffect, useRef, useState } from "react";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuthContext();
  const { items } = useCart();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  async function handleLogout() {
    await logout();
    router.replace("/home");
  }

  // 🔴 Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🟢 Avatar letter (first letter of email)
  const avatarLetter = user?.email?.charAt(0).toUpperCase() ?? "U";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 text-white">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold tracking-wide">
          Oracle
        </Link>

        {/* Right side */}
        <div className="flex items-center space-x-6">
          <Link href="/home" className="hover:text-gray-300">
            Home
          </Link>

          <Link href="/products" className="hover:text-gray-300">
            Products
          </Link>

          {isAuthenticated ? (
            <>
              {/* 🛒 Cart */}
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 hover:text-gray-300 transition" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] text-[11px] bg-red-500 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* 👤 Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpen((p) => !p)}
                  className="
                    w-9 h-9 rounded-full
                    bg-white/10 hover:bg-white/20
                    flex items-center justify-center
                    font-semibold
                  "
                >
                  {avatarLetter}
                </button>

                {open && (
                  <div
                    className="
                      absolute right-0 mt-3 w-44
                      bg-zinc-900 border border-white/10
                      rounded-xl shadow-xl
                      overflow-hidden
                    "
                  >
                    <div className="px-4 py-3 text-sm text-gray-400 border-b border-white/10">
                      {user?.email}
                    </div>

                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-white/10"
                      onClick={() => setOpen(false)}
                    >
                      Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-white/10"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-1.5 rounded-md bg-white/10 hover:bg-white/20"
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
