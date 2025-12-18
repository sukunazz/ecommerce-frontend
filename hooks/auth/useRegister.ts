import { authApi } from "@/lib/auth";
import { useState } from "react";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function register(email: string, password: string) {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await authApi.register(email, password);
      setSuccess(true);
      setLoading(false);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Registration failed");
      setLoading(false);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  }
  return { loading, error, success, register };
}
