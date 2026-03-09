import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import type { ApiSearchResponse, SearchResultItem } from "@/lib/types"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")?.trim() ?? ""

  if (!query) {
    return NextResponse.json({ query, results: [] satisfies SearchResultItem[] } as ApiSearchResponse)
  }

  const like = `%${query}%`

  try {
    const [postsResult, authorsResult, tagsResult] = await Promise.all([
      db.query(
        `
        SELECT DISTINCT p.id, p.title, p.slug, p.category, u.name AS author_name
        FROM posts p
        LEFT JOIN users u ON u.id = p.author_id
        LEFT JOIN post_tags pt ON pt.post_id = p.id
        WHERE p.is_published = true
          AND (
            p.title ILIKE $1 OR
            p.excerpt ILIKE $1 OR
            p.content ILIKE $1 OR
            p.category ILIKE $1 OR
            u.name ILIKE $1 OR
            u.username ILIKE $1 OR
            pt.tag ILIKE $1
          )
        ORDER BY p.published_at DESC
        LIMIT 20
        `,
        [like],
      ),
      db.query(
        `
        SELECT id, name, username
        FROM users
        WHERE name ILIKE $1 OR username ILIKE $1
        ORDER BY followers DESC, created_at DESC
        LIMIT 10
        `,
        [like],
      ),
      db.query(
        `
        SELECT tag, COUNT(*)::int AS uses
        FROM post_tags
        WHERE tag ILIKE $1
        GROUP BY tag
        ORDER BY uses DESC, tag ASC
        LIMIT 10
        `,
        [like],
      ),
    ])

    const postItems: SearchResultItem[] = postsResult.rows.map((row) => ({
      id: row.id,
      type: "post",
      title: row.title,
      subtitle: row.author_name ? `By ${row.author_name} • ${row.category}` : row.category,
      url: `/post/${row.slug}`,
    }))

    const authorItems: SearchResultItem[] = authorsResult.rows.map((row) => ({
      id: row.id,
      type: "author",
      title: row.name,
      subtitle: `@${row.username}`,
      url: `/author/${row.username}`,
    }))

    const tagItems: SearchResultItem[] = tagsResult.rows.map((row) => ({
      id: row.tag,
      type: "tag",
      title: `#${row.tag}`,
      subtitle: `${row.uses} post${row.uses === 1 ? "" : "s"}`,
      url: `/tag/${encodeURIComponent(row.tag)}`,
    }))

    return NextResponse.json({ query, results: [...postItems, ...authorItems, ...tagItems] } as ApiSearchResponse)
  } catch (error) {
    return NextResponse.json({ error: "Failed to search content" }, { status: 500 })
  }
}
