import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
      <h1 className="text-4xl font-bold">Welcome to Oracle</h1>
      <p className="text-gray-600 max-w-md">
        Discover products, manage your cart, and access your dashboard.
      </p>

      <Link
        href="/home"
        className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        Go to Home
      </Link>
    </div>
  );
}
