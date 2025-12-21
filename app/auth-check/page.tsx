// Create this file: src/app/auth-check/page.tsx
"use client";

import { useAuthContext } from "@/context/authContext/AuthContext";
import { useEffect, useState } from "react";

export default function AuthCheckPage() {
  const { isAuthenticated, loading } = useAuthContext();
  const [cookies, setCookies] = useState<string>("");
  const [apiUrl, setApiUrl] = useState<string>("");

  useEffect(() => {
    // Get cookies from document
    setCookies(document.cookie || "No cookies found");
    setApiUrl(process.env.NEXT_PUBLIC_API_URL || "NOT SET");
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          🔍 Authentication Diagnostic
        </h1>

        <div className="space-y-6">
          {/* Auth Context Status */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Auth Context Status</h2>
            <div className="space-y-2">
              <p>
                <strong>Loading:</strong>{" "}
                <span
                  className={loading ? "text-yellow-600" : "text-green-600"}
                >
                  {loading ? "Yes ⏳" : "No ✓"}
                </span>
              </p>
              <p>
                <strong>Is Authenticated:</strong>{" "}
                <span
                  className={
                    isAuthenticated ? "text-green-600" : "text-red-600"
                  }
                >
                  {isAuthenticated ? "Yes ✓" : "No ✗"}
                </span>
              </p>
            </div>
          </div>

          {/* Cookies */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Browser Cookies</h2>
            <div className="bg-gray-100 p-4 rounded font-mono text-sm break-all">
              {cookies}
            </div>
          </div>

          {/* API URL */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">API Configuration</h2>
            <div className="space-y-2">
              <p>
                <strong>NEXT_PUBLIC_API_URL:</strong>{" "}
                <span
                  className={
                    apiUrl === "NOT SET" ? "text-red-600" : "text-green-600"
                  }
                >
                  {apiUrl}
                </span>
              </p>
            </div>
          </div>

          {/* Test Buttons */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Quick Tests</h2>
            <div className="space-y-3">
              <button
                onClick={async () => {
                  try {
                    const res = await fetch(
                      `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
                      {
                        credentials: "include",
                      }
                    );
                    const data = await res.json();
                    alert(`Success! User: ${JSON.stringify(data, null, 2)}`);
                  } catch (err: any) {
                    alert(`Error: ${err.message}`);
                  }
                }}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Test /auth/me API Call
              </button>

              <button
                onClick={() => {
                  console.log("Cookies:", document.cookie);
                  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
                  alert("Check browser console for details");
                }}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Log Details to Console
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Navigation</h2>
            <div className="space-y-2">
              <a href="/" className="block text-blue-600 hover:underline">
                Go to Home
              </a>
              <a
                href="/dashboard"
                className="block text-blue-600 hover:underline"
              >
                Go to Dashboard (should redirect if not authenticated)
              </a>
              <a
                href="/auth/login"
                className="block text-blue-600 hover:underline"
              >
                Go to Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
