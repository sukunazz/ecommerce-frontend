// frontend/src/context/authContext/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "@/lib/auth";
import { AuthContextType } from "./type";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function checkSession() {
    try {
      await authApi.me();
      setIsAuthenticated(true);
      console.log("✅ User is authenticated");
    } catch {
      setIsAuthenticated(false);
      console.log("❌ User is not authenticated");
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    setError(null);

    try {
      await authApi.login(email, password);
      await checkSession();
      return true;
    } catch (err: any) {
      setError(err.message || "Login failed");
      setIsAuthenticated(false);
      return false;
    }
  }

  async function logout() {
    try {
      await authApi.logout();
      setIsAuthenticated(false);
      window.location.href = "/";
    } catch (err) {
      console.error("Logout error:", err);
      setIsAuthenticated(false);
      window.location.href = "/";
    }
  }

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        error,
        login,
        logout,
        checkSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }
  return ctx;
}
