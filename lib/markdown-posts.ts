import { promises as fs } from "node:fs"
import path from "node:path"
import type { BlogPost } from "@/lib/types"

const POSTS_DIR = path.join(process.cwd(), "content", "posts")

type Frontmatter = {
  title?: string
  excerpt?: string
  category?: string
  authorName?: string
  authorUsername?: string
  authorAvatar?: string
  readTime?: string
  tags?: string
  publishedAt?: string
}

function parseFrontmatter(raw: string): { frontmatter: Frontmatter; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { frontmatter: {}, body: raw }

  const [, fm, body] = match
  const frontmatter: Frontmatter = {}
  for (const line of fm.split("\n")) {
    const idx = line.indexOf(":")
    if (idx === -1) continue
    const key = line.slice(0, idx).trim() as keyof Frontmatter
    const value = line.slice(idx + 1).trim().replace(/^"|"$/g, "")
    frontmatter[key] = value
  }

  return { frontmatter, body }
}

function markdownToHtml(markdown: string) {
  return markdown
    .replace(/^###\s+(.*)$/gm, "<h3>$1</h3>")
    .replace(/^##\s+(.*)$/gm, "<h2>$1</h2>")
    .replace(/^#\s+(.*)$/gm, "<h1>$1</h1>")
    .replace(/^>\s+(.*)$/gm, "<blockquote>$1</blockquote>")
    .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
    .replace(/^-\s+(.*)$/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]*?<\/li>)/g, "<ul>$1</ul>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^/, "<p>")
    .replace(/$/, "</p>")
}

export async function getMarkdownPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const mdPath = path.join(POSTS_DIR, `${slug}.md`)
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`)

  let filePath = ""
  try {
    await fs.access(mdxPath)
    filePath = mdxPath
  } catch {
    try {
      await fs.access(mdPath)
      filePath = mdPath
    } catch {
      return undefined
    }
  }

  const raw = await fs.readFile(filePath, "utf8")
  const { frontmatter, body } = parseFrontmatter(raw)

  return {
    id: `mdx-${slug}`,
    slug,
    title: frontmatter.title || slug,
    excerpt: frontmatter.excerpt || "Markdown post",
    content: markdownToHtml(body),
    category: frontmatter.category || "Docs",
    gradient: "bg-gradient-to-br from-orange-500 to-amber-500",
    emoji: "📝",
    image: undefined,
    author: {
      name: frontmatter.authorName || "RunAsh Team",
      username: frontmatter.authorUsername || "runash",
      avatar: frontmatter.authorAvatar || "/placeholder-user.jpg",
    },
    publishedAt: frontmatter.publishedAt || new Date().toISOString(),
    readTime: frontmatter.readTime || "5 min read",
    likes: 0,
    comments: 0,
    upvotes: 0,
    tags: (frontmatter.tags || "markdown").split(",").map((t) => t.trim()).filter(Boolean),
  }
}

export async function listMarkdownPosts(): Promise<BlogPost[]> {
  try {
    const files = await fs.readdir(POSTS_DIR)
    const slugs = files
      .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx?$/, ""))

    const posts = await Promise.all(slugs.map(getMarkdownPostBySlug))
    return posts.filter(Boolean) as BlogPost[]
  } catch {
    return []
  }
}
