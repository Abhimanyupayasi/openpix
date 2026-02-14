"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"

/* ---------------- Notification ---------------- */

type NoticeType = "success" | "error" | "info"

function Notification({
  type,
  title,
  message,
  onClose,
  duration = 2500,
}: {
  type: NoticeType
  title: string
  message?: string
  duration?: number
  onClose: () => void
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  const styles = {
    success: "border-green-200 bg-green-50 text-green-700",
    error: "border-red-200 bg-red-50 text-red-700",
    info: "border-blue-200 bg-blue-50 text-blue-700",
  }

  return (
    <div
      className={`
        fixed top-6 right-6 z-[100]
        w-[90vw] max-w-sm
        rounded-xl border p-4 shadow-lg
        ${styles[type]}
      `}
    >
      <div className="pr-8">
        <p className="font-medium">{title}</p>
        {message && <p className="mt-1 text-sm opacity-90">{message}</p>}
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

/* ---------------- Upload Component ---------------- */

export default function UploadAndWatch() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [alt, setAlt] = useState("")
  const [loading, setLoading] = useState(false)

  const [mediaUrl, setMediaUrl] = useState<string | null>(null)
  const [mediaType, setMediaType] = useState<"IMAGE" | "VIDEO" | null>(null)

  const [notice, setNotice] = useState<{
    type: NoticeType
    title: string
    message?: string
  } | null>(null)

  async function handleUpload() {
    if (!file) {
      setNotice({
        type: "error",
        title: "No file selected",
        message: "Please choose an image or video to upload.",
      })
      return
    }

    setLoading(true)
    setNotice({
      type: "info",
      title: "Uploading…",
      message: "Your media is being processed.",
    })

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("title", title)
      formData.append("description", description)
      formData.append("alt", alt)

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Upload failed")

      const data = await res.json()

      setMediaUrl(data.url)
      setMediaType(data.type)

      setNotice({
        type: "success",
        title: "Upload successful",
        message: "Your media is now available via CDN.",
      })

      /* ✅ FULL RESET */
      setFile(null)
      setTitle("")
      setDescription("")
      setAlt("")
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch {
      setNotice({
        type: "error",
        title: "Upload failed",
        message: "Something went wrong. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  function handleCopy() {
    if (!mediaUrl) return
    navigator.clipboard.writeText(mediaUrl)

    setNotice({
      type: "success",
      title: "Copied!",
      message: "CDN URL copied to clipboard.",
    })
  }

  return (
    <div className="max-w-xl  w-full space-y-4">
      {/* Notification */}
      {notice && (
        <Notification
          type={notice.type}
          title={notice.title}
          message={notice.message}
          onClose={() => setNotice(null)}
        />
      )}

      {/* Upload Card */}
      <div className="rounded-2xl border bg-[#FFFDF9] text-black p-6 space-y-5 shadow-[0_10px_40px_rgba(31,82,218,0.12)]">
        <div>
          <h2 className="text-xl font-semibold">Upload Media</h2>
          <p className="text-sm text-gray-500">
            Images & videos delivered instantly via CDN
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm
            file:mr-4 file:rounded-lg file:border-0
            file:bg-[#1F52DA]/10 file:px-4 file:py-2
            file:text-[#1F52DA]"
        />

        <input
          className="w-full rounded-lg border p-2.5 text-sm"
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full rounded-lg border p-2.5 text-sm"
          placeholder="Alt text (optional)"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
        />

        <textarea
          rows={3}
          className="w-full rounded-lg border p-2.5 text-sm"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className="w-full rounded-xl bg-[#1F52DA] py-3 text-white font-medium disabled:opacity-50"
        >
          {loading ? "Uploading…" : "Upload"}
        </button>

        {mediaUrl && (
          <div className="space-y-4 pt-5 border-t">
            <div className="flex gap-2">
              <input
                value={mediaUrl}
                readOnly
                className="flex-1 rounded-lg border p-2 text-xs"
              />
              <button
                onClick={handleCopy}
                className="rounded-lg px-3 bg-[#1F52DA]/10 text-[#1F52DA]"
              >
                Copy
              </button>
            </div>

            {mediaType === "IMAGE" && (
              <img src={mediaUrl} className="rounded-xl max-h-80 w-full object-cover" />
            )}

            {mediaType === "VIDEO" && (
              <video src={mediaUrl} controls className="rounded-xl max-h-80 w-full" />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
