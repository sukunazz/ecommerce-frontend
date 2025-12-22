// frontend/src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        credentials: "include",
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("✅ User data:", userData);
        setUser(userData);
      } else {
        console.log("❌ Not authenticated, redirecting to login");
        router.push("/auth/login");
      }
    } catch (err) {
      console.error("Error checking auth:", err);
      router.push("/auth/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      console.log("✅ Logged out");
      window.location.href = "/";
    } catch (err) {
      console.error("Logout error:", err);
      window.location.href = "/";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome, {user.email}! 🎉
          </h2>
          <div className="space-y-2 text-gray-600">
            <p>
              <strong>User ID:</strong> {user.id}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
            <p className="text-3xl font-bold text-blue-600">0</p>
            <p className="text-gray-600">Orders</p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Account Status</h3>
            <p className="text-3xl font-bold text-green-600">Active</p>
            <p className="text-gray-600">All systems operational</p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Navigation</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-blue-600 hover:underline">
                Go to Home
              </Link>
              <a
                href="/profile"
                className="block text-blue-600 hover:underline"
              >
                View Profile
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
