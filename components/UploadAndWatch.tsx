"use client"

import { useState } from "react"

export default function UploadAndWatch() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [alt, setAlt] = useState("")
  const [loading, setLoading] = useState(false)

  const [mediaUrl, setMediaUrl] = useState<string | null>(null)
  const [mediaType, setMediaType] = useState<"IMAGE" | "VIDEO" | null>(null)

  async function handleUpload() {
    if (!file) return

    setLoading(true)

    const formData = new FormData()
    formData.append("file", file)
    formData.append("title", title)
    formData.append("description", description)
    formData.append("alt", alt)

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()

    setMediaUrl(data.url)
    setMediaType(data.type)

    setLoading(false)

    // reset optional fields
    setTitle("")
    setDescription("")
    setAlt("")
  }

  return (
    <div className="max-w-lg space-y-4 rounded-xl border p-5">
      <h2 className="text-lg font-semibold">Upload Media</h2>

      {/* File */}
      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      {/* Optional metadata */}
      <input
        className="w-full rounded border p-2"
        placeholder="Title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full rounded border p-2"
        placeholder="Alt text (optional)"
        value={alt}
        onChange={(e) => setAlt(e.target.value)}
      />

      <textarea
        className="w-full rounded border p-2"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Upload button */}
      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className="w-full rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {/* Success state */}
      {mediaUrl && (
        <div className="space-y-3 pt-4 border-t">
          <p className="text-green-600 font-medium">
            ✅ Upload successful
          </p>

          {/* CDN Link */}
          <div className="flex gap-2">
            <input
              value={mediaUrl}
              readOnly
              className="flex-1 rounded border p-2 text-sm"
            />
            <button
              onClick={() => navigator.clipboard.writeText(mediaUrl)}
              className="rounded bg-gray-200 px-3"
            >
              Copy
            </button>
          </div>

          {/* Preview */}
          {mediaType === "IMAGE" && (
            <img
              src={mediaUrl}
              alt={alt || "Uploaded image"}
              className="rounded-lg max-h-80 object-cover"
            />
          )}

          {mediaType === "VIDEO" && (
            <video
              src={mediaUrl}
              controls
              className="rounded-lg max-h-80 w-full"
            />
          )}
        </div>
      )}
    </div>
  )
}
