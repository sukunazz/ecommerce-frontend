"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { authApi } from "@/lib/auth";
import { AuthContextType, User } from "./type";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function checkSession() {
    try {
      const me = await authApi.me();
      setUser(me);
      console.log("✅ Authenticated user:", me);
    } catch {
      setUser(null);
      console.log("❌ No active session");
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
      setUser(null);
      return false;
    }
  }

  async function logout() {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
      window.location.href = "/";
    }
  }

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        error,
        login,
        setUser,
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
