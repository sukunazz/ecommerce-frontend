"use client";

import { ReactNode, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      {...props}
      className={`
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        rounded-2xl
        p-6
        shadow-md
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
        flex flex-col
        ${className}
      `}
    >
      {children}
    </div>
  );
}
