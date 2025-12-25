"use client";

import { useAuthContext } from "@/context/authContext/AuthContext";
import { Mail, ShieldCheck, UserCircle } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuthContext();

  return (
    <div
      className="
        bg-white/5 backdrop-blur-xl
        border border-white/10
        rounded-2xl p-8
        space-y-8
      "
    >
      {/* Header */}
      <div className="flex items-center gap-6">
        <div
          className="
            w-20 h-20 rounded-full
            bg-gradient-to-br from-indigo-500 to-purple-600
            flex items-center justify-center
            text-white
          "
        >
          <UserCircle size={42} />
        </div>

        <div>
          <h1 className="text-2xl font-semibold">My Profile</h1>
          <p className="text-sm opacity-70">Manage your personal information</p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-black/40 border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2 text-sm opacity-70">
            <Mail size={16} />
            Email
          </div>
          <p className="font-medium">{user?.email}</p>
        </div>

        <div className="bg-black/40 border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2 text-sm opacity-70">
            <ShieldCheck size={16} />
            Role
          </div>
          <p className="font-medium capitalize">{user?.role}</p>
        </div>
      </div>

      {/* Footer note */}
      <p className="text-xs opacity-50">
        Some information may be managed by administrators.
      </p>
    </div>
  );
}
