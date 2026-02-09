import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function HomePage() {
  const user = await currentUser()

  // ✅ If logged in → dashboard
  if (user) {
    redirect("/dashboard")
  }

  // ❌ Not logged in → landing page
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">OpenPix</h1>
      <p className="text-gray-600 max-w-md text-center">
        Open-source image & video CDN. Upload once. Use everywhere.
      </p>

      <div className="flex gap-4">
        <Link
          href="/sign-up"
          className="px-6 py-3 bg-black text-white rounded-lg"
        >
          Get Started
        </Link>

        <Link
          href="/sign-in"
          className="px-6 py-3 border rounded-lg"
        >
          Login
        </Link>
      </div>

      <Link href="/post" className="text-sm text-gray-500 underline">
        Explore public feed
      </Link>
    </main>
  )
}
