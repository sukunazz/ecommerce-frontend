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

  async register(
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  ) {
    return apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, firstName, lastName }),
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
  async requestChangePassword(currentPassword: string) {
    return apiFetch("/auth/change-password/request", {
      method: "POST",
      body: JSON.stringify({ currentPassword }),
    });
  },

  async confirmChangePassword(code: string, newPassword: string) {
    return apiFetch("/auth/change-password/confirm", {
      method: "POST",
      body: JSON.stringify({ code, newPassword }),
    });
  },

  async forgotPassword(email: string) {
    return apiFetch("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  async resetPassword(email: string, code: string, newPassword: string) {
    return apiFetch("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ email, code, newPassword }),
    });
  },
};
