"use client"

import { useEffect, useState } from "react"
import { Trash2 } from "lucide-react"
import MediaModal from "./MediaModal"

type Media = {
  id: string
  url: string
  title?: string
  description?: string
}

export default function UserGallery() {
  const [media, setMedia] = useState<Media[]>([])
  const [selected, setSelected] = useState<Media | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetch("/api/media")
      .then((res) => res.json())
      .then(setMedia)
  }, [])

  const handleDelete = async () => {
    if (!selected) return

    const confirmDelete = confirm("Are you sure you want to delete this media?")
    if (!confirmDelete) return

    try {
      setDeleting(true)

      const res = await fetch(`/api/media/${selected.id}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Delete failed")

      // Remove from UI
      setMedia((prev) => prev.filter((item) => item.id !== selected.id))

      // Close modal
      setSelected(null)
    } catch (err) {
      alert("Delete failed")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Gallery</h2>
        {media.length === 0 && (
          <p className="text-gray-500">
            You haven't uploaded any media yet.
          </p>
        )}
      </div>

      {/* Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {media.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelected(item)}
            className="
              cursor-pointer
              rounded-2xl bg-white
              shadow-sm hover:shadow-lg
              transition overflow-hidden
            "
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={item.url}
                alt={item.title || "Uploaded media"}
                className="
                  h-full w-full object-cover
                  transition-transform duration-500
                  hover:scale-105
                "
              />
            </div>

            <div className="p-4 space-y-1 text-black">
              <p className="text-sm font-semibold truncate">
                {item.title || "Untitled"}
              </p>

              {item.description && (
                <p className="text-xs text-gray-500 line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <MediaModal
          media={selected}
          onClose={() => setSelected(null)}
        >
          {/* 🔴 Delete Button inside Modal */}
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="
              mt-4 flex items-center gap-2
              bg-red-500 hover:bg-red-600
              text-white px-4 py-2 rounded-lg
              transition
            "
          >
            <Trash2 size={18} />
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </MediaModal>
      )}
    </>
  )
}
