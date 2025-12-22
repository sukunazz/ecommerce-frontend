"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function LoginSuccessPage() {
  const [countdown, setCountdown] = useState(3);
  const [canAccess, setCanAccess] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("✅ Auth check passed:", data);
          setCanAccess(true);
        } else {
          setCanAccess(false);
        }
      } catch {
        setCanAccess(false);
      }
    };

    checkAuth();

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = "/dashboard"; // full reload is OK
          return 0;
        }
        return prev - 1;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [API_URL]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Login Successful!
        </h1>

        <p className="text-gray-600 mb-6">
          {canAccess
            ? "✅ Authentication verified. Redirecting you to dashboard..."
            : "⏳ Verifying your session..."}
        </p>

        <div className="mb-6">
          <div className="text-4xl font-bold text-blue-600">{countdown}</div>
          <p className="text-sm text-gray-500">seconds</p>
        </div>

        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="block w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go to Dashboard Now
          </Link>

          <Link
            href="/"
            className="block w-full px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
