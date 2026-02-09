import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export async function uploadToCloudinary(buffer: Buffer) {
  return new Promise<{ url: string; publicId: string }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (err, res) => {
        if (err || !res) return reject(err)
        resolve({ url: res.secure_url, publicId: res.public_id })
      })
      .end(buffer)
  })
}

export async function deleteFromCloudinary(publicId: string) {
  await cloudinary.uploader.destroy(publicId)
}
