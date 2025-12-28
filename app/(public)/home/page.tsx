"use client";

import { useAuthContext } from "@/context/authContext/AuthContext";
import Header from "@/components/home/Header";
import Body from "@/components/home/body";
import { Skeleton } from "@/components/ui/skeleton/Skeleton";

export default function Home() {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6 px-6">
        <Skeleton variant="circle" width="80px" height="80px" />
        <Skeleton height="30px" width="60%" />
        <Skeleton height="20px" width="80%" />
        <Skeleton height="20px" width="70%" />
        <Skeleton height="300px" width="100%" />
      </div>
    );
  }

  return (
    <div>
      <Header isAuthenticated={isAuthenticated} />
      <Body isAuthenticated={isAuthenticated} />
      <ProductsGrid title="Latest Products" initialLimit={6} />
    </div>
  );
}
