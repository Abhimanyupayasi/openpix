import { NextResponse } from "next/server"
import { getOrCreateUser } from "@/lib/auth"
import { pool } from "@/lib/db"

export async function GET() {
  const user = await getOrCreateUser()

  const { rows } = await pool.query(
    `
    SELECT id, url, title, description, created_at
    FROM media
    WHERE user_id = $1
    ORDER BY created_at DESC
    `,
    [user.id]
  )

  return NextResponse.json(rows)
}
