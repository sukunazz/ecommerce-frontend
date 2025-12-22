export type Role =
  | "user"
  | "admin"
  | "superadmin"
  | "subadmin"
  | "contributor"
  | "manager";

export type User = {
  id: number;
  email: string;
  role: Role;
};

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
};
