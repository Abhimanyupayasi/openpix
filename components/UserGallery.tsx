"use client"

import { useEffect, useState } from "react"
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

  useEffect(() => {
    fetch("/api/media")
      .then((res) => res.json())
      .then(setMedia)
  }, [])

  return (
    <>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {media.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelected(item)}
            className="
              group cursor-pointer
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
                  group-hover:scale-105
                "
              />
            </div>

            <div className="p-4 space-y-1">
              <p className="text-sm font-semibold text-gray-900 truncate">
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

      {selected && (
        <MediaModal
          media={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  )
}
