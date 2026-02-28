import type { BlogPost } from "@/lib/types"
import { addBlogPost, deleteBlogPost, getAllPosts, getBlogPost, updateBlogPost } from "@/lib/blog-data"

const canUseDb = Boolean(process.env.DATABASE_URL)

type PostInput = Omit<BlogPost, "id" | "slug" | "publishedAt" | "readTime" | "likes" | "comments" | "upvotes"> & {
  title: string
  excerpt: string
  content: string
  category: string
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}

async function dbClient() {
  const pkg = await import("@prisma/client")
  const g = globalThis as typeof globalThis & { __runashPrisma?: InstanceType<typeof pkg.PrismaClient> }
  if (!g.__runashPrisma) {
    g.__runashPrisma = new pkg.PrismaClient()
  }
  return g.__runashPrisma
}

function toPrismaData(input: PostInput, slug: string) {
  return {
    title: input.title,
    slug,
    excerpt: input.excerpt,
    content: input.content,
    category: input.category,
    gradient: input.gradient,
    emoji: input.emoji,
    image: input.image ?? null,
    authorName: input.author.name,
    authorAvatar: input.author.avatar,
    authorUsername: input.author.username,
    readTime: "5 min read",
    likes: 0,
    comments: 0,
    upvotes: 0,
    tags: input.tags,
  }
}

function fromPrisma(post: any): BlogPost {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    gradient: post.gradient,
    emoji: post.emoji,
    image: post.image ?? undefined,
    author: {
      name: post.authorName,
      avatar: post.authorAvatar,
      username: post.authorUsername,
    },
    publishedAt: post.publishedAt.toISOString(),
    readTime: post.readTime,
    likes: post.likes,
    comments: post.comments,
    upvotes: post.upvotes,
    tags: post.tags,
  }
}

export async function listPosts(): Promise<BlogPost[]> {
  if (!canUseDb) return getAllPosts()
  try {
    const prisma = await dbClient()
    const posts = await prisma.post.findMany({ orderBy: { publishedAt: "desc" } })
    return posts.map(fromPrisma)
  } catch {
    return getAllPosts()
  }
}

export async function findPost(slug: string): Promise<BlogPost | undefined> {
  if (!canUseDb) return getBlogPost(slug)
  try {
    const prisma = await dbClient()
    const post = await prisma.post.findUnique({ where: { slug } })
    return post ? fromPrisma(post) : undefined
  } catch {
    return getBlogPost(slug)
  }
}

export async function createPost(input: PostInput): Promise<BlogPost> {
  const slug = slugify(input.title)
  if (!canUseDb) {
    const post: BlogPost = {
      id: Date.now().toString(),
      slug,
      title: input.title,
      content: input.content,
      category: input.category,
      excerpt: input.excerpt,
      author: input.author,
      tags: input.tags,
      gradient: input.gradient ?? "bg-gradient-to-br from-orange-500 to-amber-500",
      emoji: input.emoji ?? "🚀",
      image: input.image,
      publishedAt: new Date().toISOString(),
      readTime: "5 min read",
      likes: 0,
      comments: 0,
      upvotes: 0,
    }
    addBlogPost(post)
    return post
  }

  try {
    const prisma = await dbClient()
    const created = await prisma.post.create({ data: toPrismaData(input, slug) })
    return fromPrisma(created)
  } catch {
    const post: BlogPost = {
      id: Date.now().toString(),
      slug,
      title: input.title,
      content: input.content,
      category: input.category,
      excerpt: input.excerpt,
      author: input.author,
      tags: input.tags,
      gradient: input.gradient ?? "bg-gradient-to-br from-orange-500 to-amber-500",
      emoji: input.emoji ?? "🚀",
      image: input.image,
      publishedAt: new Date().toISOString(),
      readTime: "5 min read",
      likes: 0,
      comments: 0,
      upvotes: 0,
    }
    addBlogPost(post)
    return post
  }
}

export async function patchPost(slug: string, data: Partial<BlogPost>) {
  if (!canUseDb) return updateBlogPost(slug, data)
  try {
    const prisma = await dbClient()
    const updated = await prisma.post.update({
      where: { slug },
      data: {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        gradient: data.gradient,
        emoji: data.emoji,
        image: data.image,
        tags: data.tags,
      },
    })
    return fromPrisma(updated)
  } catch {
    return updateBlogPost(slug, data)
  }
}

export async function removePost(slug: string) {
  if (!canUseDb) return deleteBlogPost(slug)
  try {
    const prisma = await dbClient()
    await prisma.post.delete({ where: { slug } })
    return true
  } catch {
    return deleteBlogPost(slug)
  }
}
