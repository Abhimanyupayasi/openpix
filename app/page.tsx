import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { AppHeader } from "@/components/AppHeader"

export default async function HomePage() {
  const user = await currentUser()

  // ✅ Logged in → dashboard
  if (user) {
    redirect("/dashboard")
  }

  return (
    <>
      
          <main className="min-h-screen bg-[#FFFDF9] flex items-center justify-center px-6">
       
      <div className="max-w-2xl text-center space-y-8">
        {/* Logo / Brand */}
        <h1 className="text-5xl font-bold tracking-tight text-gray-900">
          OpenPix
        </h1>

        {/* Tagline */}
        <p className="text-lg text-gray-600 leading-relaxed">
          Open-source image & video CDN.  
          Upload once. Deliver everywhere. Fast, secure, and developer-friendly.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/sign-up"
            className="px-8 py-4 rounded-xl bg-black text-white font-medium
                       hover:bg-gray-800 transition"
          >
            Get Started Free
          </Link>

          <Link
            href="/sign-in"
            className="px-8 py-4 rounded-xl border border-gray-300
                       text-gray-800 font-medium hover:bg-gray-100 transition"
          >
            Login
          </Link>
        </div>

        {/* Secondary link */}
        <Link
          href="/post"
          className="inline-block text-sm text-gray-500 underline underline-offset-4 hover:text-gray-700 transition"
        >
          Explore public feed →
        </Link>
      </div>
    </main>
    </>
  )
}
