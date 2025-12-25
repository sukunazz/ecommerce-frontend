"use client";

import { useState } from "react";
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
      toast.error("All fields required");
      return;
    }

    try {
      setLoading(true);
      // 🔴 Call backend API here
      toast.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch {
      toast.error("Failed to change password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8 max-w-lg">
      <h2 className="text-xl font-semibold">Settings</h2>

      {/* Change Password */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h3 className="font-medium">Change Password</h3>

        <input
          type="password"
          placeholder="Current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />

        <button
          onClick={handleChangePassword}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>

      {/* Logout */}
      <div className="bg-white rounded-xl shadow p-6">
        <button onClick={logout} className="text-red-500 hover:underline">
          Logout
        </button>
      </div>
    </div>
  );
}
