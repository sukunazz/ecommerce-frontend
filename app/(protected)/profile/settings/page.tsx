"use client";

import { useState } from "react";
import { Lock, LogOut } from "lucide-react";
import { authApi } from "@/lib/auth";
import { useAuthContext } from "@/context/authContext/AuthContext";
import { useToast } from "@/context/toast/ToastContext";

export default function ProfileSettingsPage() {
  const { logout } = useAuthContext();
  const toast = useToast();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"PASSWORD" | "CODE">("PASSWORD");
  const [loading, setLoading] = useState(false);

  async function handleChangePassword() {
    try {
      setLoading(true);

      if (step === "PASSWORD") {
        try {
          setLoading(true);
          await authApi.requestChangePassword(currentPassword);
          toast.success("OTP sent to email");
        } catch (err: any) {
          console.error(err);
          toast.error(err.message || "Failed");
        } finally {
          setLoading(false);
        }
      } else {
        await authApi.confirmChangePassword(code, newPassword);
        toast.success("Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
        setCode("");
        setStep("PASSWORD");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-10 max-w-xl">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm opacity-70">Manage security</p>
      </div>

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
          disabled={loading}
          className="w-full bg-white/10 hover:bg-white/20 rounded-lg py-2"
        >
          {loading
            ? "Processing..."
            : step === "PASSWORD"
            ? "Send Code"
            : "Update Password"}
        </button>
      </div>

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
