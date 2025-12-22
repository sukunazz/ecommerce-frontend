import { useAuthContext } from "@/context/authContext/AuthContext";
import { Role } from "@/context/authContext/type";

export function RequireRole({
  allowed,
  children,
}: {
  allowed: Role[];
  children: React.ReactNode;
}) {
  const { user } = useAuthContext();

  if (!user || !allowed.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
