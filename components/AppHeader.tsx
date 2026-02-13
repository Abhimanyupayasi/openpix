import Link from "next/link"
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs"
import { ImagePlus } from "lucide-react"

export function AppHeader() {
  return (
    <header
      className="
        sticky top-0 z-50 h-16
        border-b border-white/40
        bg-white/60
        backdrop-blur-xl backdrop-saturate-150
        supports-[backdrop-filter]:bg-white/60
      "
    >
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <ImagePlus className="w-6 h-6 text-gray-900" />
          <span className="font-semibold text-lg tracking-tight text-gray-900">
            OpenPix
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          
          {/* Logged in */}
          <SignedIn>
            <Link
              href="/dashboard"
              className="
                text-sm font-medium px-4 py-2 rounded-lg
                bg-black text-white
                hover:bg-gray-800
                transition
              "
            >
              Upload
            </Link>

            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 ring-1 ring-black/10"
                }
              }}
            />
          </SignedIn>

          {/* Logged out */}
          <SignedOut>
            <Link
              href="/sign-in"
              className="text-sm font-medium text-gray-700 hover:text-black transition"
            >
              Sign in
            </Link>

            <Link
              href="/sign-up"
              className="
                text-sm font-medium px-5 py-2 rounded-lg
                bg-black text-white
                hover:bg-gray-800
                transition
              "
            >
              Get Started
            </Link>
          </SignedOut>

        </div>
      </div>
    </header>
  )
}
