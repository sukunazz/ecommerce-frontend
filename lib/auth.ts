import { apiFetch } from "./api";

export const authApi = {
  login: (email: string, password: string) => {
    return apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  register: (email: string, password: string) => {
    return apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  verifyEmail: (email: string, code: string) => {
    return apiFetch("/auth/verify", {
      method: "POST",
      body: JSON.stringify({ email, code }),
    });
  },

  refreshToken: () => {
    return apiFetch("/auth/refresh", {
      method: "POST",
    });
  },

  logout: () => {
    return apiFetch("/auth/logout", {
      method: "POST",
    });
  },
};
