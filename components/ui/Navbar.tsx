"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useAuthContext } from "@/context/authContext/AuthContext";
import { useCart } from "@/context/cart/CartContext";
import { useEffect, useRef, useState } from "react";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuthContext();
  const { items } = useCart();
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  async function handleLogout() {
    await logout();
    router.replace("/home");
  }

  // Close dropdown on outside click
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

  // 🔍 Submit search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;

    router.push(`/products?search=${encodeURIComponent(search)}`);
  };

  const avatarLetter = user?.email?.charAt(0).toUpperCase() ?? "U";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 text-white gap-6">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold tracking-wide">
          Oracle
        </Link>

        {/* 🔍 Search (hidden on auth pages) */}
        {!pathname.startsWith("/auth") && (
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-md hidden md:block"
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
            />
          </form>
        )}

        {/* Right */}
        <div className="flex items-center space-x-6">
          <Link href="/products">Products</Link>

          {isAuthenticated ? (
            <>
              {/* Cart */}
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] text-[11px] bg-red-500 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Profile */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpen((p) => !p)}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center"
                >
                  {avatarLetter}
                </button>

                {open && (
                  <div className="absolute right-0 mt-3 w-44 bg-zinc-900 rounded-xl border border-white/10">
                    <div className="px-4 py-3 text-sm text-gray-400 border-b border-white/10">
                      {user?.email}
                    </div>

                    <Link
                      href="/profile"
                      className="block px-4 py-3 hover:bg-white/10"
                      onClick={() => setOpen(false)}
                    >
                      Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-400 hover:bg-white/10"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link
                href="/register"
                className="px-4 py-1.5 rounded-md bg-white/10"
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
