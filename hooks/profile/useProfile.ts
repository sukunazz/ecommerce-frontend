import { useState } from "react";
import { uploadProfileImage } from "@/lib/profile/profile";
import { useAuthContext } from "@/context/authContext/AuthContext";
import { User } from "@/context/authContext/type";

export const useProfile = () => {
  const { setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File) => {
    try {
      setLoading(true);
      setError(null);

      const updatedUser: User = await uploadProfileImage(file);

      // ✅ Replace user completely (BEST PRACTICE)
      setUser(updatedUser);
    } catch (err: any) {
      setError(err.message || "Failed to upload profile image");
    } finally {
      setLoading(false);
    }
  };

  return { uploadImage, loading, error };
};
