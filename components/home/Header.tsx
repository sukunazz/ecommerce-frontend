"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/Button";
import homeBg from "../../images/home-bg.jpg";

interface HeaderProps {
  isAuthenticated: boolean;
}

export default function Header({ isAuthenticated }: HeaderProps) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center text-white">
      <Image
        src={homeBg}
        alt="Background"
        fill
        priority
        className="object-cover -z-10"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 -z-10"></div>

      <div className="text-center px-6 space-y-6 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
          {isAuthenticated ? "Welcome Back!" : "Welcome to Booksville"}
        </h1>

        <p className="text-lg md:text-xl text-gray-200 drop-shadow">
          {isAuthenticated
            ? "Access your dashboard and explore all your personalized features."
            : "Discover, buy, rent, and review books while connecting with fellow readers worldwide."}
        </p>

        <div className="flex flex-wrap gap-4 justify-center mt-4">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
              <Link href="/products">
                <Button>Browse Products</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button>Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Sign Up Free</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
