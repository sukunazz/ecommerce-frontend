import Link from "next/link";

interface BodyProps {
  isAuthenticated: boolean;
}

export default function Body({ isAuthenticated }: BodyProps) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-amber-50 to-amber-200 flex flex-col md:flex-row items-center px-10 py-20 text-gray-800 gap-10">
      {/* Left Section */}
      <div className="flex-1 space-y-6">
        <h2 className="text-5xl md:text-6xl font-bold drop-shadow-lg text-gray-900">
          Explore More Features
        </h2>

        <p className="max-w-xl text-lg md:text-xl text-gray-700 leading-relaxed">
          {isAuthenticated
            ? "You're logged in! Explore your dashboard and manage your account."
            : "Join us today to unlock exclusive features and personalized experiences."}
        </p>

        {isAuthenticated && (
          <p className="text-sm text-gray-600">
            ✅ You have access to all premium features
          </p>
        )}
      </div>

      {/* Right Section */}
      <div className="flex-1 flex justify-center md:justify-end">
        {isAuthenticated ? (
          <Link href="/dashboard">
            <button className="px-8 py-4 bg-amber-600 text-white font-semibold rounded-lg shadow-md hover:bg-amber-700 transition">
              View Dashboard
            </button>
          </Link>
        ) : (
          <Link href="/auth/register">
            <button className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
              Learn More
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
