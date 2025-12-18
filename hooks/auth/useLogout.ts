import { useNavigate } from "react-router-dom";
import { authApi } from "@/lib/auth";

export function useLogout() {
  const navigate = useNavigate();

  async function logout() {
    await authApi.logout();
    navigate("auth/login");
  }
  return { logout };
}
