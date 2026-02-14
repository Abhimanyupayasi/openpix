export default function MediaModal({
  media,
  onClose,
  children,
}: {
  media: any
  onClose: () => void
  children?: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500"
        >
          ✕
        </button>

        <img
          src={media.url}
          alt={media.title}
          className="w-full rounded-xl mb-4"
        />

        <h3 className="font-semibold text-black">
          {media.title || "Untitled"}
        </h3>

        {media.description && (
          <p className="text-sm text-gray-500">
            {media.description}
          </p>
        )}

        {children}
      </div>
    </div>
  )
}
