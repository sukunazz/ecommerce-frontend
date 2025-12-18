import React, { ReactNode } from "react";

export function ProductCard({ children }: { children: ReactNode }) {
  return (
    <div
      className="
        bg-white
        dark:bg-neutral-900
        text-neutral-800
        dark:text-neutral-100
        border border-neutral-200
        dark:border-neutral-800
        rounded-xl
        p-5
        mb-5
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-xl
        cursor-pointer
      "
    >
      {children}
    </div>
  );
}
