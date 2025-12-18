"use client";

import { useAuthContext } from "@/context/authContext/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const {
    login,
    isAuthenticated,
    loading: authLoading,
    error,
  } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect if already logged in

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const success = await login(email, password);

    if (success) {
      router.push("/");
    }
  }

  if (authLoading) {
    return <p>Checking session...</p>;
  }

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button disabled={authLoading}>
          {authLoading ? "Logging in..." : "Login"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
