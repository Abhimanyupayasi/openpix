import { NextResponse } from "next/server"
import { getOrCreateUser } from "@/lib/auth"
import { pool } from "@/lib/db"
import { v2 as cloudinary } from "cloudinary"

export const runtime = "nodejs"

// ✅ Configure Cloudinary here (FIXES api_key error)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getOrCreateUser()

    // ✅ Next.js 15 fix
    const { id } = await context.params

    // 1️⃣ Check media belongs to user
    const { rows } = await pool.query(
      `SELECT * FROM media WHERE id = $1 AND user_id = $2`,
      [id, user.id]
    )

    if (rows.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const media = rows[0]

    // 2️⃣ Delete from Cloudinary
    if (media.provider === "CLOUDINARY" && media.public_id) {
      await cloudinary.uploader.destroy(media.public_id)
    }

    // 3️⃣ Delete from DB
    await pool.query(`DELETE FROM media WHERE id = $1`, [id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    )
  }
}
