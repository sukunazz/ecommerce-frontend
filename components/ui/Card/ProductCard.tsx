import React, { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        background: "var(--card-bg)",
        color: "var(--text)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        padding: "20px",
        borderRadius: "14px",
        marginBottom: "20px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
        transition: "all 0.3s ease",
        transform: "translateY(0px)",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform =
          "translateY(-4px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 8px 20px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 4px 12px rgba(0,0,0,0.06)";
      }}
    >
      {children}
    </div>
  );
}
