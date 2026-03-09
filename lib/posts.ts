import { randomUUID } from "crypto"
import { Prisma } from "@prisma/client"
import { db } from "@/lib/db"
import type { BlogPost } from "@/lib/types"

type Row = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  gradient: string
  emoji: string
  image: string | null
  featured: boolean
  publishedAt: Date
  readTime: string
  likes: number
  comments: number
  upvotes: number
  authorName: string
  authorAvatar: string
  authorUsername: string
  tags: string[]
}

function toBlogPost(row: Row): BlogPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    gradient: row.gradient,
    emoji: row.emoji,
    image: row.image ?? undefined,
    featured: row.featured,
    publishedAt: row.publishedAt.toISOString(),
    readTime: row.readTime,
    likes: row.likes,
    comments: row.comments,
    upvotes: row.upvotes,
    author: {
      name: row.authorName,
      avatar: row.authorAvatar,
      username: row.authorUsername,
    },
    tags: row.tags ?? [],
  }
}

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "") || "post"
}

async function getRows(where?: Prisma.Sql) {
  const rows = await db.$queryRaw<Row[]>(Prisma.sql`
    SELECT
      p."id", p."title", p."slug", p."excerpt", p."content", p."category", p."gradient", p."emoji", p."image",
      p."featured", p."publishedAt", p."readTime", p."likes", p."comments", p."upvotes",
      a."name" AS "authorName", a."avatar" AS "authorAvatar", a."username" AS "authorUsername",
      COALESCE(array_remove(array_agg(t."name"), NULL), ARRAY[]::text[]) AS "tags"
    FROM "Post" p
    JOIN "Author" a ON a."id" = p."authorId"
    LEFT JOIN "PostTag" pt ON pt."postId" = p."id"
    LEFT JOIN "Tag" t ON t."id" = pt."tagId"
    ${where ? Prisma.sql`WHERE ${where}` : Prisma.empty}
    GROUP BY p."id", a."id"
    ORDER BY p."publishedAt" DESC
  `)
  return rows
}

export async function getAllPosts() {
  const rows = await getRows()
  return rows.map(toBlogPost)
}

export async function getBlogPost(slug: string) {
  const rows = await getRows(Prisma.sql`p."slug" = ${slug}`)
  return rows[0] ? toBlogPost(rows[0]) : null
}

export async function createBlogPost(input: {
  title: string; excerpt: string; content: string; category: string; author: { name: string; username: string; avatar?: string };
  tags: string[]; gradient: string; emoji: string; image?: string
}) {
  const base = slugify(input.title)
  let slug = base
  let i = 1
  // collision handling
  while ((await db.$queryRaw<Array<{ exists: boolean }>>(Prisma.sql`SELECT EXISTS(SELECT 1 FROM "Post" WHERE "slug" = ${slug}) AS exists`))[0]?.exists) {
    slug = `${base}-${i++}`
  }

  const author = await db.$queryRaw<Array<{ id: string }>>(Prisma.sql`
    INSERT INTO "Author" ("id", "name", "username", "email", "avatar", "followers", "following", "createdAt", "updatedAt")
    VALUES (${randomUUID()}, ${input.author.name}, ${input.author.username}, ${`${input.author.username}@runash.local`}, ${input.author.avatar ?? "/placeholder.svg?height=40&width=40"}, 0, 0, now(), now())
    ON CONFLICT ("username") DO UPDATE SET "name" = EXCLUDED."name", "avatar" = EXCLUDED."avatar", "updatedAt" = now()
    RETURNING "id";
  `)

  const postId = (await db.$queryRaw<Array<{ id: string }>>(Prisma.sql`
    INSERT INTO "Post" ("id", "title", "slug", "excerpt", "content", "category", "gradient", "emoji", "image", "readTime", "likes", "comments", "upvotes", "authorId", "publishedAt", "createdAt", "updatedAt", "featured")
    VALUES (${randomUUID()}, ${input.title}, ${slug}, ${input.excerpt}, ${input.content}, ${input.category}, ${input.gradient}, ${input.emoji}, ${input.image ?? null}, '5 min read', 0, 0, 0, ${author[0].id}, now(), now(), now(), false)
    RETURNING "id";
  `))[0].id

  for (const tagName of input.tags) {
    const tagId = (await db.$queryRaw<Array<{ id: string }>>(Prisma.sql`
      INSERT INTO "Tag" ("id", "name") VALUES (${randomUUID()}, ${tagName})
      ON CONFLICT ("name") DO UPDATE SET "name" = EXCLUDED."name"
      RETURNING "id";
    `))[0].id
    await db.$executeRaw(Prisma.sql`INSERT INTO "PostTag" ("postId", "tagId") VALUES (${postId}, ${tagId}) ON CONFLICT DO NOTHING`)
  }

  const created = await getRows(Prisma.sql`p."id" = ${postId}`)
  return toBlogPost(created[0])
}

export async function updateBlogPost(slug: string, next: Partial<BlogPost>) {
  const updated = await db.$queryRaw<Array<{ id: string }>>(Prisma.sql`
    UPDATE "Post"
    SET "title" = COALESCE(${next.title ?? null}, "title"),
        "excerpt" = COALESCE(${next.excerpt ?? null}, "excerpt"),
        "content" = COALESCE(${next.content ?? null}, "content"),
        "category" = COALESCE(${next.category ?? null}, "category"),
        "gradient" = COALESCE(${next.gradient ?? null}, "gradient"),
        "emoji" = COALESCE(${next.emoji ?? null}, "emoji"),
        "image" = COALESCE(${next.image ?? null}, "image"),
        "readTime" = COALESCE(${next.readTime ?? null}, "readTime"),
        "likes" = COALESCE(${next.likes ?? null}, "likes"),
        "comments" = COALESCE(${next.comments ?? null}, "comments"),
        "upvotes" = COALESCE(${next.upvotes ?? null}, "upvotes"),
        "updatedAt" = now()
    WHERE "slug" = ${slug}
    RETURNING "id";
  `)

  if (!updated[0]) return null
  const rows = await getRows(Prisma.sql`p."id" = ${updated[0].id}`)
  return toBlogPost(rows[0])
}

export async function deleteBlogPost(slug: string) {
  const count = await db.$executeRaw(Prisma.sql`DELETE FROM "Post" WHERE "slug" = ${slug}`)
  return count > 0
}
