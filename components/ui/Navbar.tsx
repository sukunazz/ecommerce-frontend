"use client";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-20 backdrop-blur-lg bg-white/10 border-b border-white/20">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3 text-white">
        <div className="text-xl font-semibold tracking-wide">
          <Link href="/">Oracle</Link>
        </div>

        <div className="flex items-center space-x-8 text-lg">
          <Link href="/" className="hover:text-blue-300 transition-colors">
            Home
          </Link>

          <Link href="/about" className="hover:text-blue-300 transition-colors">
            About
          </Link>

          <Link
            href="/contact"
            className="hover:text-blue-300 transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
