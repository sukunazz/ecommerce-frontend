"use client";

import { useState } from "react";
import { Lock, LogOut } from "lucide-react";
import { authApi } from "@/lib/auth";
import { useAuthContext } from "@/context/authContext/AuthContext";
import { useToast } from "@/context/toast/ToastContext";

type Step = "PASSWORD" | "CODE";

export default function ProfileSettingsPage() {
  const { logout } = useAuthContext();
  const toast = useToast();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<Step>("PASSWORD");
  const [loading, setLoading] = useState(false);

  async function handleChangePassword() {
    if (loading) return;

    setLoading(true);

    try {
      if (step === "PASSWORD") {
        if (!currentPassword) {
          toast.error("Enter your current password");
          return;
        }

        await authApi.requestChangePassword(currentPassword);

        toast.success("OTP sent to your email");
        setStep("CODE"); // ✅ FIX
      } else {
        if (!code || !newPassword) {
          toast.error("Enter OTP and new password");
          return;
        }

        await authApi.confirmChangePassword(code, newPassword);

        toast.success("Password updated successfully");

        // reset form
        setCurrentPassword("");
        setNewPassword("");
        setCode("");
        setStep("PASSWORD");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-10 max-w-xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm opacity-70">Manage security</p>
      </div>

      {/* Change Password Card */}
      <div className="bg-white/5 border rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Lock size={18} />
          <h2 className="font-medium">Change Password</h2>
        </div>

        {step === "PASSWORD" && (
          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full bg-black/40 border rounded-lg px-4 py-2"
          />
        )}

        {step === "CODE" && (
          <>
            <input
              placeholder="Verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-black/40 border rounded-lg px-4 py-2"
            />

            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-black/40 border rounded-lg px-4 py-2"
            />
          </>
        )}

        <button
          onClick={handleChangePassword}
          disabled={
            loading ||
            (step === "PASSWORD" && !currentPassword) ||
            (step === "CODE" && (!code || !newPassword))
          }
          className="w-full bg-white/10 hover:bg-white/20 rounded-lg py-2 disabled:opacity-50"
        >
          {loading
            ? "Processing..."
            : step === "PASSWORD"
            ? "Send Code"
            : "Update Password"}
        </button>
      </div>

      {/* Logout */}
      <div className="border border-red-500/20 rounded-2xl p-6">
        <button
          onClick={logout}
          className="flex items-center gap-3 text-red-400"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
