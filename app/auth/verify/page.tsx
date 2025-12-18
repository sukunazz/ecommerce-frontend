"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useVerifyEmail } from "@/hooks/auth/useVerifyEmail";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email") ?? "";

  const { verify, loading, error, success } = useVerifyEmail();

  const [email, setEmail] = useState(emailFromQuery);
  const [code, setCode] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await verify(email, code);
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => router.push("/auth/login"), 1500);
    }
  }, [success, router]);

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h1>Verify Email</h1>

      {success ? (
        <p>Email verified! Redirecting to login…</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            placeholder="6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />

          <button disabled={loading}>
            {loading ? "Verifying..." : "Verify"}
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      )}
    </div>
  );
}
