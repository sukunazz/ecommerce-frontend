// frontend/src/components/Skeleton.tsx
"use client";

import React from "react";
import "./Skeleton.css";

type SkeletonProps = {
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  variant?: "rect" | "circle"; // new prop
};

export function Skeleton({
  width = "100%",
  height = "14px",
  style,
  variant = "rect",
}: SkeletonProps) {
  if (variant === "circle") {
    return (
      <div
        style={{
          width,
          height,
          borderRadius: "50%",
          backgroundColor: "#e0e0e0",
          animation: "pulse 1.5s infinite",
          ...style,
        }}
      />
    );
  }

  // rectangle with shimmer
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 6,
        background: "var(--skeleton-bg, #e0e0e0)",
        overflow: "hidden",
        position: "relative",
        ...style,
      }}
    >
      {/* Shimmer effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "40%",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
          animation: "shimmer 1.2s infinite",
        }}
      />
    </div>
  );
}
