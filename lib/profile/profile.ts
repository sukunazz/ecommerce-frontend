import { apiFetch } from "../api";
import { User } from "@/context/authContext/type";

export const uploadProfileImage = (file: File): Promise<User> => {
  const formData = new FormData();
  formData.append("image", file);

  return apiFetch<User>("/users/profile-image", {
    method: "POST",
    body: formData,
    headers: {}, // ✅ do NOT set Content-Type
  });
};
