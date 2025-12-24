"use client";

import { Skeleton } from "@/components/ui/skeleton/Skeleton";
import { useToast } from "@/context/toast/ToastContext";
import { useEffect } from "react";

export default function SuccessPage() {
  const toast = useToast();

  useEffect(() => {
    toast.success("Payment successful!");
  }, [toast]);

  return (
    <div className="p-10 text-center space-y-4">
      <Skeleton variant="circle" width="50px" height="50px" />
      <h1 className="text-2xl font-bold">Payment Successful 🎉</h1>
      <p>Your order has been placed.</p>
    </div>
  );
}
