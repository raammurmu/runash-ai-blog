import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const postId = searchParams.get("postId")

  if (!postId) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 })
  }

  try {
    // In production, fetch from database
    const comments = [
      {
        id: "1",
        postId,
        author: {
          name: "Alex Chen",
          avatar: "/placeholder.svg?height=40&width=40",
          username: "alexchen",
        },
        content: "Great insights on live streaming technology!",
        createdAt: new Date().toISOString(),
        likes: 12,
        parentId: null,
      },
    ]

    return NextResponse.json(comments)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { postId, content, author, parentId } = body
    if (!postId || !content || !author) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In production, save to database
    const newComment = {
      id: Date.now().toString(),
      postId,
      content,
      author,
      parentId: parentId || null,
      createdAt: new Date().toISOString(),
      likes: 0,
    }

    return NextResponse.json(newComment, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 })
  }
}
