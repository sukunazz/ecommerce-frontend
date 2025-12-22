import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <div
      className="
      bg-white/5 
      backdrop-blur-xl
      border border-white/10
      rounded-2xl
      p-5
      shadow-md
      transition-all duration-300
      hover:-translate-y-1
      hover:shadow-xl
    "
    >
      {children}
    </div>
  );
}
