import { currentUser } from "@clerk/nextjs/server"
import { pool } from "./db"

export async function getOrCreateUser() {
  const user = await currentUser()
  if (!user) throw new Error("Unauthorized")

  const email = user.emailAddresses[0].emailAddress

  const { rows } = await pool.query(
    `
    INSERT INTO users (clerk_id, email)
    VALUES ($1, $2)
    ON CONFLICT (clerk_id)
    DO UPDATE SET email = EXCLUDED.email
    RETURNING *
    `,
    [user.id, email]
  )

  return rows[0]
}
