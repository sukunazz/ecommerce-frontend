"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/context/authContext/AuthContext";

export default function DashboardPage() {
  const { user, loading, logout, isAuthenticated } = useAuthContext();
  const router = useRouter();

  // 🔐 Protect route
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* USER INFO */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Welcome back 👋</h2>

          <div className="grid sm:grid-cols-3 gap-4 text-gray-700">
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>User ID:</strong> {user.id}
            </p>
            <p>
              <strong>Role:</strong>{" "}
              <span className="capitalize font-medium text-blue-600">
                {user.role}
              </span>
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid sm:grid-cols-3 gap-6">
          <StatCard title="Orders" value="0" />
          <StatCard title="Account Status" value="Active" />
          <StatCard title="Role" value={user.role} />
        </div>

        {/* NAVIGATION */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Navigation</h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <NavLink href="/home" label="🏠 Home" />
            <NavLink href="/profile" label="👤 Profile" />

            {(user.role === "admin" || user.role === "superadmin") && (
              <NavLink href="/admin" label="🛠 Admin Panel" />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

/* -------------------- */
/* SMALL COMPONENTS */
/* -------------------- */

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 text-center">
      <p className="text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-blue-600 mt-2">{value}</p>
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block p-4 border rounded hover:bg-gray-50 transition font-medium"
    >
      {label}
    </Link>
  );
}
