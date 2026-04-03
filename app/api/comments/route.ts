import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import type { ApiComment, CommentCreateRequest, CommentsResponse } from "@/lib/types"

function mapRowToComment(row: Record<string, any>): ApiComment {
  return {
    id: row.id,
    postId: row.post_id,
    author: {
      name: row.author_name ?? "Guest Reader",
      avatar: row.author_avatar ?? "/placeholder.svg?height=32&width=32",
      username: row.author_username ?? "guest",
    },
    content: row.content,
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : undefined,
    likes: row.likes ?? 0,
    parentId: row.parent_id ?? undefined,
    isEdited: row.is_edited ?? false,
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const postId = searchParams.get("postId")

  if (!postId) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 })
  }

  try {
    const { rows } = await db.query(
      `
      SELECT c.id, c.post_id, c.parent_id, c.content, c.likes, c.is_edited, c.created_at, c.updated_at,
             u.name AS author_name, u.avatar AS author_avatar, u.username AS author_username
      FROM comments c
      LEFT JOIN users u ON u.id = c.author_id
      WHERE c.post_id = $1
      ORDER BY c.created_at DESC
      `,
      [postId],
    )

    const comments: CommentsResponse = rows.map(mapRowToComment)
    return NextResponse.json(comments)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CommentCreateRequest = await request.json()
    const { postId, content, author, parentId } = body

    if (!postId || !content || !author?.name || !author?.username) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const syntheticEmail = `${author.username.replace(/[^a-zA-Z0-9_.-]/g, "").toLowerCase() || "guest"}@guest.runash.local`

    const userResult = await db.query(
      `
      INSERT INTO users (username, email, name, avatar)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (username)
      DO UPDATE SET name = EXCLUDED.name, avatar = EXCLUDED.avatar
      RETURNING id, username, name, avatar
      `,
      [author.username, syntheticEmail, author.name, author.avatar ?? "/placeholder.svg?height=32&width=32"],
    )

    const dbAuthor = userResult.rows[0]

    const created = await db.query(
      `
      INSERT INTO comments (post_id, author_id, parent_id, content, likes)
      VALUES ($1, $2, $3, $4, 0)
      RETURNING id, post_id, parent_id, content, likes, is_edited, created_at, updated_at
      `,
      [postId, dbAuthor.id, parentId ?? null, content.trim()],
    )

    const createdComment = mapRowToComment({
      ...created.rows[0],
      author_name: dbAuthor.name,
      author_avatar: dbAuthor.avatar,
      author_username: dbAuthor.username,
    })

    return NextResponse.json(createdComment, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 })
  }
}
