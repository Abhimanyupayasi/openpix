// app/post/page.tsx
import { pool } from "@/lib/db"

export default async function PostFeed() {
  const { rows } = await pool.query(
    `SELECT * FROM media ORDER BY created_at DESC LIMIT 50`
  )

  return (
    <div className="columns-4 gap-4 p-6">
      {rows.map((m: any) => (
        <img
          key={m.id}
          src={m.url}
          alt=""
          className="mb-4 rounded-xl"
        />
      ))}
    </div>
  )
}
