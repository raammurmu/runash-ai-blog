import { type NextRequest, NextResponse } from "next/server"
import { createBlogPost, getAllPosts } from "@/lib/posts"

export async function GET() {
  try {
    const posts = await getAllPosts()
    return NextResponse.json(posts)
  } catch {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { title, content, category, author, excerpt, tags, gradient, emoji, image } = body
    if (!title || !content || !category || !author || !excerpt) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newPost = await createBlogPost({
      title,
      content,
      category,
      excerpt,
      author,
      tags: Array.isArray(tags) ? tags : [],
      gradient: gradient ?? "bg-gradient-to-br from-orange-500 to-amber-500",
      emoji: emoji ?? "🚀",
      image,
    })

    return NextResponse.json(newPost, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
