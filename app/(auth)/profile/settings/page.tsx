"use client";

import { useState } from "react";
import { Lock, LogOut } from "lucide-react";
import { useAuthContext } from "@/context/authContext/AuthContext";
import { useToast } from "@/context/toast/ToastContext";

export default function ProfileSettingsPage() {
  const { logout } = useAuthContext();
  const toast = useToast();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleChangePassword() {
    if (!currentPassword || !newPassword) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      // 🔴 Backend API call here
      toast.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch {
      toast.error("Failed to update password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-10 max-w-xl">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm opacity-70">
          Manage security and account preferences
        </p>
      </div>

      {/* Change Password */}
      <div
        className="
          bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-2xl p-6
          space-y-5
        "
      >
        <div className="flex items-center gap-3">
          <Lock size={18} />
          <h2 className="font-medium">Change Password</h2>
        </div>

        <input
          type="password"
          placeholder="Current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="
            w-full bg-black/40
            border border-white/10
            rounded-lg px-4 py-2
            outline-none focus:border-white/30
          "
        />

        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="
            w-full bg-black/40
            border border-white/10
            rounded-lg px-4 py-2
            outline-none focus:border-white/30
          "
        />

        <button
          onClick={handleChangePassword}
          disabled={loading}
          className="
            w-full mt-2
            bg-white/10 hover:bg-white/20
            rounded-lg py-2
            transition
          "
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>

      {/* Logout */}
      <div
        className="
          bg-white/5 backdrop-blur-xl
          border border-red-500/20
          rounded-2xl p-6
        "
      >
        <button
          onClick={logout}
          className="
            flex items-center gap-3
            text-red-400 hover:text-red-300
            transition
          "
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
