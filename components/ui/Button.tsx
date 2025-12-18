import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) {
  const base =
    "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border";

  const primary = "bg-white text-black border-white hover:bg-gray-100";
  const secondary = "bg-black text-white border-black hover:bg-neutral-800";

  return (
    <button
      {...props}
      className={`${base} ${variant === "primary" ? primary : secondary} ${
        className ?? ""
      }`}
    >
      {children}
    </button>
  );
}
