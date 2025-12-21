// frontend/src/lib/auth.ts
import { apiFetch } from "./api";

export const authApi = {
  async login(email: string, password: string) {
    console.log("🔵 Calling login API...");
    const response = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    console.log("✅ Login response:", response);
    return response;
  },

  async register(email: string, password: string) {
    return apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  async verifyEmail(email: string, code: string) {
    return apiFetch("/auth/verify", {
      method: "POST",
      body: JSON.stringify({ email, code }),
    });
  },

  async refreshToken() {
    return apiFetch("/auth/refresh", {
      method: "POST",
    });
  },

  async logout() {
    return apiFetch("/auth/logout", {
      method: "POST",
    });
  },

  async me() {
    console.log("🔵 Calling /auth/me...");
    // credentials is already set in apiFetch, no need to pass again
    const response = await apiFetch("/auth/me", {
      method: "GET",
    });
    console.log("✅ Me response:", response);
    return response;
  },
};
