"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string | null;
  onDismiss: () => void;
};

export default function Toast({ message, onDismiss }: ToastProps) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  if (!message) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div
        role="alert"
        className="rounded-full bg-red-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg"
      >
        {message}
      </div>
    </div>
  );
}
