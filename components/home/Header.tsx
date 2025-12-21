// src/components/home/Header.tsx
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

      {/* Dark overlay for readable text */}
      <div className="absolute inset-0 bg-black/40 -z-10"></div>

      {/* Content */}
      <div className="text-center px-6 space-y-6 max-w-2xl">
        <h1 className="text-4xl font-bold drop-shadow-lg">
          {isAuthenticated ? "Welcome Back!" : "Welcome to Our Website"}
        </h1>

        <p className="text-lg text-gray-200 drop-shadow">
          {isAuthenticated
            ? "Access your dashboard and explore all your personalized features."
            : "This is the home page. Build something amazing with Next.js + Tailwind."}
        </p>

        {/* Show different buttons based on auth status */}
        <div className="flex gap-4 justify-center">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
              <Link href="/products">
                <Button onClick={() => {}}>Browse Products</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button>Get Started</Button>
              </Link>
              <Link href="/auth/register">
                <Button onClick={() => {}}>Sign Up Free</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
