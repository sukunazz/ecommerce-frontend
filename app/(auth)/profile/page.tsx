"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfilePage() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-gray-100 pt-24">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r px-6 py-8">
        <h2 className="text-lg font-semibold mb-6">Profile</h2>

        <nav className="space-y-2">
          <Link
            href="/profile/info"
            className={`block px-3 py-2 rounded ${
              pathname.includes("info")
                ? "bg-black text-white"
                : "hover:bg-gray-100"
            }`}
          >
            Info
          </Link>

          <Link
            href="/profile/settings"
            className={`block px-3 py-2 rounded ${
              pathname.includes("settings")
                ? "bg-black text-white"
                : "hover:bg-gray-100"
            }`}
          >
            Settings
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-gray-500 mt-1">Manage your account information</p>
      </main>
    </div>
  );
}
