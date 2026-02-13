"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

type NotificationType = "success" | "error" | "info"

interface NotificationProps {
  type: NotificationType
  title: string
  message?: string
  onClose: () => void
  duration?: number // ms (default 3000)
  position?: "top-right" | "top-center"
}

const styles = {
  success: "border-green-200 bg-green-50 text-green-700",
  error: "border-red-200 bg-red-50 text-red-700",
  info: "border-blue-200 bg-blue-50 text-blue-700",
}

const positions = {
  "top-right": "top-6 right-6",
  "top-center": "top-6 left-1/2 -translate-x-1/2",
}

export function Notification({
  type,
  title,
  message,
  onClose,
  duration = 3000,
  position = "top-right",
}: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  return (
    <div
      className={`
        fixed z-[100]
        ${positions[position]}
        w-[90vw] max-w-sm
        rounded-xl border p-4 shadow-lg
        ${styles[type]}
        animate-in fade-in slide-in-from-top-2
      `}
    >
      <div className="pr-8">
        <p className="font-medium">{title}</p>
        {message && (
          <p className="mt-1 text-sm opacity-90">{message}</p>
        )}
      </div>

      <button
        onClick={onClose}
        className="absolute right-3 top-3 opacity-70 hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
