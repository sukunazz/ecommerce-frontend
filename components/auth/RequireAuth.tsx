"use client";

import { useAuthContext } from "@/context/authContext/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("auth/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <p className="p-6">Checking authentication...</p>;
  }

  if (!isAuthenticated) {
    return null; // redirect is happening
  }

  return <>{children}</>;
}
