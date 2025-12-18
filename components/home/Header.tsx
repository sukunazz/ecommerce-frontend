"use client";
import Image from "next/image";
import { Button } from "../ui/Button";
import homeBg from "../../images/home-bg.jpg";

export default function Header() {
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
          Welcome to Our Website
        </h1>

        <p className="text-lg text-gray-200 drop-shadow">
          This is the home page. Build something amazing with Next.js +
          Tailwind.
        </p>

        <Button onClick={() => alert("the button is clicked")}>
          Get Started
        </Button>
      </div>
    </div>
  );
}
