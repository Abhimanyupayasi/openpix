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
      .then(res => res.json())
      .then(setMedia)
  }, [])

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {media.map(item => (
          <div
            key={item.id}
            onClick={() => setSelected(item)}
            className="cursor-pointer rounded-lg border p-2 hover:shadow"
          >
            <img
              src={item.url}
              alt={item.title || ""}
              className="h-40 w-full object-cover rounded"
            />

            {item.title && (
              <p className="mt-2 text-sm font-medium">{item.title}</p>
            )}

            {item.description && (
              <p className="text-xs text-gray-500 line-clamp-2">
                {item.description}
              </p>
            )}
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
