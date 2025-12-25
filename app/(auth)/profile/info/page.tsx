"use client";

import { useAuthContext } from "@/context/authContext/AuthContext";

export default function ProfileInfoPage() {
  const { user } = useAuthContext();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Personal Information</h2>

      <div className="bg-white rounded-xl shadow p-6 space-y-4 max-w-lg">
        <div>
          <label className="text-sm text-gray-500">Email</label>
          <p className="font-medium">{user?.email}</p>
        </div>

        <div>
          <label className="text-sm text-gray-500">First Name</label>
          <p className="font-medium">{user?.role || "—"}</p>
        </div>

        <div>
          <label className="text-sm text-gray-500">Last Name</label>
          <p className="font-medium">{user?.id || "—"}</p>
        </div>
      </div>
    </div>
  );
}
