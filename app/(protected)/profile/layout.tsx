"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { User, Settings } from "lucide-react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen pt-24 bg-linear-to-br from-black via-neutral-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-6 flex gap-10">
        {/* Sidebar */}
        <aside className="w-64 shrink-0">
          <div
            className="
              bg-white/5 backdrop-blur-xl
              border border-white/10
              rounded-2xl p-6
              space-y-4
            "
          >
            <h2 className="text-lg font-semibold mb-4">Profile</h2>

            <Link
              href="/profile"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition"
            >
              <User size={18} />
              Info
            </Link>

            <Link
              href="/profile/settings"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition"
            >
              <Settings size={18} />
              Settings
            </Link>
          </div>
        </aside>

        {/* Page Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
