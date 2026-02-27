import { type NextRequest, NextResponse } from "next/server"
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 })
    }

    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File too large" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const ext = file.name.split(".").pop() || "jpg"
    const baseName = file.name.replace(/\.[^/.]+$/, "")
    const safe = `${Date.now()}-${baseName.replace(/[^a-zA-Z0-9-]/g, "-")}.${ext}`

    const uploadsDir = path.join(process.cwd(), "public", "uploads")
    await mkdir(uploadsDir, { recursive: true })
    await writeFile(path.join(uploadsDir, safe), buffer)

    return NextResponse.json({
      url: `/uploads/${safe}`,
      fileName: safe,
      size: file.size,
      type: file.type,
    })
  } catch {
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
