import { NextResponse } from "next/server"
import { getOrCreateUser } from "@/lib/auth"
import { uploadToCloudinary } from "@/lib/cloudinary"
import { pool } from "@/lib/db"

// 🔴 IMPORTANT: Force Node.js runtime (Cloudinary + Buffer need this)
export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    // ✅ Auth
    const user = await getOrCreateUser()

    // ✅ Read form data
    const formData = await req.formData()
    const file = formData.get("file")

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "File not provided" },
        { status: 400 }
      )
    }

    // ✅ Convert to buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // ✅ Upload to Cloudinary
    const { url, publicId } = await uploadToCloudinary(buffer)

    // ✅ Save to DB
    const { rows } = await pool.query(
      `
      INSERT INTO media (user_id, type, url, public_id, provider)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        user.id,
        file.type.startsWith("video") ? "VIDEO" : "IMAGE",
        url,
        publicId,
        "CLOUDINARY",
      ]
    )

    // ✅ Success
    return NextResponse.json(rows[0])
  } catch (error) {
    console.error("Upload error:", error)

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    )
  }
}
