"use client";

import { Skeleton } from "@/components/ui/skeleton/Skeleton";

export default function CancelPage() {
  return (
    <div className="p-10 text-center space-y-4">
      <Skeleton variant="circle" width="50px" height="50px" />
      <h1 className="text-2xl font-bold">Payment Cancelled</h1>
      <p>You can try again.</p>
    </div>
  );
}
