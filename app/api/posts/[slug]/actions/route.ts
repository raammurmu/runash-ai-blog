import { type NextRequest, NextResponse } from "next/server"
import { getBlogPost, updateBlogPost, updateAuthorFollowers } from "@/lib/blog-data"

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const body = await request.json()
    const { action, delta = 1, username } = body
    const post = getBlogPost(params.slug)

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    if (action === "follow" && username) {
      const updatedAuthor = updateAuthorFollowers(username, delta)
      if (!updatedAuthor) {
        return NextResponse.json({ error: "Author not found" }, { status: 404 })
      }
      return NextResponse.json({ followers: updatedAuthor.followers })
    }

    const updates = {
      likes: post.likes,
      upvotes: post.upvotes,
      shares: post.shares ?? 0,
      bookmarks: post.bookmarks ?? 0,
    }

    switch (action) {
      case "like":
        updates.likes = Math.max(0, updates.likes + delta)
        break
      case "upvote":
        updates.upvotes = Math.max(0, updates.upvotes + delta)
        break
      case "share":
        updates.shares = Math.max(0, updates.shares + delta)
        break
      case "bookmark":
        updates.bookmarks = Math.max(0, updates.bookmarks + delta)
        break
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    const updatedPost = updateBlogPost(params.slug, updates)
    return NextResponse.json(updatedPost)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update post action" }, { status: 500 })
  }
}

