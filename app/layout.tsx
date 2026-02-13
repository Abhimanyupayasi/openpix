import { ClerkProvider } from "@clerk/nextjs"
import { Providers } from "@/components/providers"
import "./globals.css"
import { AppHeader } from "@/components/AppHeader"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-[#FFFDF9] text-gray-900">
         <AppHeader />
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
