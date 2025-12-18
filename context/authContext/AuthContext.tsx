"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "@/lib/auth";
import { AuthContextType } from "./type";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Check if user is logged in (COOKIE BASED)
  async function checkSession() {
    try {
      await authApi.me();
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);

    try {
      await authApi.login(email, password);
      await checkSession(); // ✅ FIXED
    } catch (err: any) {
      setError(err.message || "Login failed");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);
    try {
      await authApi.logout();
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  // ✅ IMPORTANT: check session on app load
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
