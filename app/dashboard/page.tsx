import UploadAndWatch from "@/components/UploadAndWatch"
import UserGallery from "@/components/UserGallery"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const user = await currentUser()
  if (!user) redirect("/sign-in")

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <UploadAndWatch />
      <UserGallery/>
    </div>
  )
}
