"use client";

import React from "react";
import Image from "next/image";

type AlertType = "success" | "error";

interface AlertProps {
  type?: AlertType;
  message: string;
  onClose: () => void;
}

export default function Alert({ type = "success", message, onClose }: AlertProps) {
  const styles = {
    success: {
      bg: "bg-green-50",
      border: "border-green-300",
      text: "text-green-700",
      icon: "✔",
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-300",
      text: "text-red-700",
      icon: "✖",
    },
  };

  const s = styles[type];

  return (
    <div
      className={`w-full flex items-center gap-3 p-4 rounded-xl border ${s.bg} ${s.border} ${s.text}`}
    >
      {/* ICON */}
      <span className="text-xl font-bold">{s.icon}</span>

      {/* TEXT */}
      <span className="flex-1 text-sm">{message}</span>

      {/* CLOSE BUTTON */}
      <button
        onClick={onClose}
        className="text-xl font-bold hover:opacity-70"
      >
        ×
      </button>
    </div>
  );
}
