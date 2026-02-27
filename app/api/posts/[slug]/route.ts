import { type NextRequest, NextResponse } from "next/server"
import { findPost, patchPost, removePost } from "@/lib/posts-repository"

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const post = await findPost(slug)

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch {
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const body = await request.json()
    const updatedPost = await patchPost(slug, body)

    if (!updatedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(updatedPost)
  } catch {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const removed = await removePost(slug)
    if (!removed) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }
    return NextResponse.json({ message: "Post deleted successfully" })
  } catch {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}
