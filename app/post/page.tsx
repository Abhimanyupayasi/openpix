// app/post/page.tsx
import { pool } from "@/lib/db"
import ImageGrid from "./ImageGrid"

export default async function PostFeed() {
  const { rows } = await pool.query(
    `SELECT * FROM media ORDER BY created_at DESC LIMIT 50`
  )

  return <ImageGrid images={rows} />
}
