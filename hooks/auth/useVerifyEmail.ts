"use client";

import { useState } from "react";
import { authApi } from "@/lib/auth";

export function useVerifyEmail() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function verify(email: string, code: string) {
    try {
      setLoading(true);
      setError(null);

      await authApi.verifyEmail(email, code);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  }

  return { verify, loading, error, success };
}
