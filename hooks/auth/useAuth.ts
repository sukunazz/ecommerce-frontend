import { useAuthContext } from "@/context/authContext/AuthContext";

export function useAuth() {
  return useAuthContext();
}
