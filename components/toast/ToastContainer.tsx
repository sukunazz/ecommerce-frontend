"use client";

type Toast = {
  id: number;
  message: string;
  type: "success" | "error" | "info" | "warning";
};

export default function ToastContainer({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="fixed top-6 right-6 z-50 space-y-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-5 py-3 rounded-xl shadow-xl text-sm font-medium
            transition-all duration-300 animate-toast
            ${toast.type === "success" && "bg-green-600 text-white"}
            ${toast.type === "error" && "bg-red-600 text-white"}
            ${toast.type === "info" && "bg-blue-600 text-white"}
            ${toast.type === "warning" && "bg-yellow-400 text-black"}
          `}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
