"use client";

import RequireAuth from "@/components/auth/RequireAuth";
import { Navbar } from "@/components/ui/Navbar";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
      <Navbar />
      <main className="pt-20 max-w-7xl mx-auto px-6">{children}</main>
    </RequireAuth>
  );
}
