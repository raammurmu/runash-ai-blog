import { type NextRequest, NextResponse } from "next/server"
import { getBlogPost } from "@/lib/blog-data"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const post = await getBlogPost(params.slug)

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const body = await request.json()

    // In production, update in database
    const updatedPost = {
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(updatedPost)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    // In production, delete from database
    return NextResponse.json({ message: "Post deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}
