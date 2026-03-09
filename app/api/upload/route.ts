import { createHash } from "node:crypto"
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { type NextRequest, NextResponse } from "next/server"

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/gif", "video/mp4", "video/webm"])
const MAX_SIZE_BYTES = 10 * 1024 * 1024

function sanitizeFileName(fileName: string) {
  const extension = path.extname(fileName).slice(0, 10).replace(/[^a-zA-Z0-9.]/g, "")
  const baseName = path
    .basename(fileName, path.extname(fileName))
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
    .replace(/^-|-$/g, "")

  return `${baseName || "upload"}-${Date.now()}${extension}`
}

function validateFile(file: File) {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Invalid file type")
  }

  if (file.size > MAX_SIZE_BYTES) {
    throw new Error("File too large")
  }
}

async function uploadToCloudinary(file: File, safeFileName: string) {
  validateFile(file)

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary storage is not configured")
  }

  const timestamp = Math.floor(Date.now() / 1000)
  const publicId = `runash-uploads/${safeFileName.replace(path.extname(safeFileName), "")}`

  const signaturePayload = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`
  const signature = createHash("sha1").update(signaturePayload).digest("hex")

  const formData = new FormData()
  formData.set("file", file)
  formData.set("api_key", apiKey)
  formData.set("timestamp", String(timestamp))
  formData.set("signature", signature)
  formData.set("public_id", publicId)
  formData.set("resource_type", file.type.startsWith("video/") ? "video" : "image")

  const uploadEndpoint = `https://api.cloudinary.com/v1_1/${cloudName}/${file.type.startsWith("video/") ? "video" : "image"}/upload`
  const response = await fetch(uploadEndpoint, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Failed to upload file to Cloudinary")
  }

  const payload = (await response.json()) as { secure_url?: string }
  if (!payload.secure_url) {
    throw new Error("Cloudinary did not return a public URL")
  }

  return payload.secure_url
}

async function uploadToLocal(file: File, safeFileName: string) {
  validateFile(file)

  const uploadDir = path.join(process.cwd(), "public", "uploads")
  await mkdir(uploadDir, { recursive: true })
  const filePath = path.join(uploadDir, safeFileName)
  const bytes = Buffer.from(await file.arrayBuffer())
  await writeFile(filePath, bytes)

  return `/uploads/${safeFileName}`
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file")

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const fileName = sanitizeFileName(file.name)
    const hasCloudinaryConfig =
      !!process.env.CLOUDINARY_CLOUD_NAME && !!process.env.CLOUDINARY_API_KEY && !!process.env.CLOUDINARY_API_SECRET

    const url = hasCloudinaryConfig
      ? await uploadToCloudinary(file, fileName)
      : process.env.NODE_ENV !== "production"
        ? await uploadToLocal(file, fileName)
        : (() => {
            throw new Error("Storage provider is not configured")
          })()

    return NextResponse.json({
      url,
      fileName,
      size: file.size,
      type: file.type,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to upload file"
    const status = message === "Invalid file type" || message === "File too large" ? 400 : 500

    return NextResponse.json({ error: message }, { status })
  }
}
