import { type NextRequest, NextResponse } from "next/server"
import { addBlogPost, getAllPosts } from "@/lib/blog-data"
import type { BlogPost } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const posts = getAllPosts()
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { title, content, category, author, excerpt, tags, gradient, emoji, image } = body 
    if (!title || !content || !category || !author || !excerpt) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newPost: BlogPost = {
      id: Date.now().toString(),
      slug: title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, ""),
      title,
      content,
      category,
      excerpt,
      author,
      tags: Array.isArray(tags) ? tags : [],
      gradient: gradient ?? "bg-gradient-to-br from-orange-500 to-amber-500",
      emoji: emoji ?? "🚀",
      image,
      publishedAt: new Date().toISOString(),
      readTime: "5 min read",
      likes: 0,
      comments: 0,
      upvotes: 0,
    }

    addBlogPost(newPost)

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
