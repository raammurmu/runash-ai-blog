import { type NextRequest, NextResponse } from "next/server"
import { getBlogPosts } from "@/lib/blog-data"

export async function GET(request: NextRequest) {
  try {
    const posts = await getBlogPosts()
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { title, content, category, author } = body
    if (!title || !content || !category || !author) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In production, save to database
    const newPost = {
      id: Date.now().toString(),
      slug: title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, ""),
      ...body,
      publishedAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      upvotes: 0,
    }

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
