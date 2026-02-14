"use client"

import { useState } from "react"

type Props = {
  media: {
    url: string
    title?: string
    description?: string
  }
  onClose: () => void
}

export default function MediaModal({ media, onClose }: Props) {
  const [copied, setCopied] = useState(false)

  function copyLink() {
    navigator.clipboard.writeText(media.url)
    setCopied(true)

    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-xl max-w-lg w-full p-4 space-y-4 relative">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500"
        >
          ✕
        </button>

        {/* Image */}
        <img
          src={media.url}
          alt={media.title || ""}
          className="rounded-lg max-h-96 w-full object-contain"
        />

        {/* Meta */}
        {media.title && (
          <h3 className="font-semibold">{media.title}</h3>
        )}

        {media.description && (
          <p className="text-sm text-gray-600">
            {media.description}
          </p>
        )}

        {/* Link + Copy */}
        <div className="flex gap-2">
          <input
            readOnly
            value={media.url}
            className="flex-1 text-black rounded border px-2 py-1 text-sm"
          />
          <button
            onClick={copyLink}
            className="rounded bg-black px-3 py-1 text-white text-sm"
          >
            Copy
          </button>
        </div>

        {/* Success message */}
        {copied && (
          <p className="text-green-600 text-sm">
            ✅ Copied successfully
          </p>
        )}
      </div>
    </div>
  )
}
