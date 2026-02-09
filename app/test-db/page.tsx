import { pool } from "@/lib/db"

export default async function TestDB() {
  const result = await pool.query("SELECT NOW()")

  return (
    <div style={{ padding: 40 }}>
      <h1>DB Connected ✅</h1>
      <pre>{JSON.stringify(result.rows, null, 2)}</pre>
    </div>
  )
}
