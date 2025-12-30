"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Mail, ShieldCheck, Plus } from "lucide-react";
import { useAuthContext } from "@/context/authContext/AuthContext";
import { useProfile } from "@/hooks/profile/useProfile";

export default function ProfilePage() {
  const { user } = useAuthContext();
  const { uploadImage, loading } = useProfile();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  if (!user) return null;

  /* ================= HANDLE IMAGE UPLOAD ================= */
  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setError(null);
      await uploadImage(file);
    } catch (err: any) {
      setError(err.message || "Failed to upload image");
    }
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 space-y-8">
      {/* HEADER */}
      <div className="flex items-center gap-6">
        {/* PROFILE IMAGE */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border border-white/20 bg-black/30">
            {user.profileImage ? (
              <Image
                src={user.profileImage}
                alt="Profile Image"
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-white">
                <ShieldCheck size={40} />
              </div>
            )}
          </div>

          {/* PLUS BUTTON */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            className="
              absolute -bottom-1 -right-1
              w-8 h-8 rounded-full
              bg-indigo-600 hover:bg-indigo-700
              flex items-center justify-center
              text-white shadow
              disabled:opacity-50
            "
          >
            <Plus size={16} />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </div>

        {/* TITLE */}
        <div>
          <h1 className="text-2xl font-semibold">My Profile</h1>
          <p className="text-sm opacity-70">Manage your personal information</p>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <p className="text-sm text-red-500 bg-red-500/10 p-3 rounded">
          {error}
        </p>
      )}

      {/* INFO */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-black/40 border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2 text-sm opacity-70">
            <Mail size={16} />
            Email
          </div>
          <p className="font-medium">{user.email}</p>
        </div>

        <div className="bg-black/40 border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2 text-sm opacity-70">
            <ShieldCheck size={16} />
            Role
          </div>
          <p className="font-medium capitalize">{user.role}</p>
        </div>
      </div>

      <p className="text-xs opacity-50">
        Some information may be managed by administrators.
      </p>
    </div>
  );
}
