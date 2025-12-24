"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton/Skeleton";

export default function AboutPage() {
  const [loading, setLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // 1.5s loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Skeleton height="40px" width="50%" />
        <Skeleton height="20px" width="100%" />
        <Skeleton height="20px" width="90%" />
        <Skeleton height="20px" width="95%" />
        <Skeleton height="200px" />
      </div>
    );
  }

  return (
    <div className="bg-amber-50 min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-10 space-y-6">
        <h1 className="text-4xl font-bold text-amber-900">About Us</h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          Welcome to Booksville! We are a community-driven platform for book
          lovers, where you can discover, buy, rent, and review books while
          connecting with fellow readers around the globe.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-amber-100 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-amber-900 mb-2">
              Our Mission
            </h2>
            <p className="text-gray-700">
              To inspire and empower readers by making books accessible,
              affordable, and engaging for everyone.
            </p>
          </div>

          <div className="bg-amber-100 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-amber-900 mb-2">
              Our Vision
            </h2>
            <p className="text-gray-700">
              To build the largest online community where book lovers can share
              their passion, discover new titles, and create meaningful
              connections.
            </p>
          </div>
        </div>

        <div className="mt-6 bg-amber-200 p-6 rounded-lg shadow text-center">
          <h2 className="text-2xl font-bold text-amber-900 mb-2">
            Join Our Community
          </h2>
          <p className="text-gray-700">
            Sign up today and start exploring thousands of books, reviews, and
            recommendations from fellow readers!
          </p>
        </div>
      </div>
    </div>
  );
}
