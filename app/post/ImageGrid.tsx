"use client"

import { useState } from "react"

type Media = {
  id: string
  url: string
}

export default function ImageGrid({ images }: { images: Media[] }) {
  const [selected, setSelected] = useState<Media | null>(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = async (url: string) => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      {/* Masonry Layout */}
      <div className="p-4 sm:p-6 columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="break-inside-avoid cursor-pointer"
            onClick={() => setSelected(img)}
          >
            <img
              src={img.url}
              alt=""
              className="w-full rounded-xl hover:opacity-90 transition"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-4 sm:p-6 relative">
            
            {/* Close Button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-lg"
            >
              ✕
            </button>

            {/* Image */}
            <img
              src={selected.url}
              alt=""
              className="w-full rounded-xl mb-4"
            />

            {/* Input + Copy */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                value={selected.url}
                readOnly
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-black bg-white"
              />
              <button
                onClick={() => handleCopy(selected.url)}
                className="bg-black text-white px-4 py-2 rounded-lg w-full sm:w-auto"
              >
                Copy
              </button>
            </div>

            {/* Notification */}
            {copied && (
              <div className="mt-3 text-green-600 text-sm text-center sm:text-left">
                ✅ Link copied to clipboard!
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
