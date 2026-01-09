import type { BlogPost, Comment, User } from "./types"

// Authors
export const authors: User[] = [
  {
    id: "a1",
    name: "Ram Murmu",
    username: "rammurmu",
    email: "rammurmu@runash.in",
    avatar: "/rammurmu.png?height=64&width=64",
    bio: "Full-stack developer.",
    followers: 0,
    following: 0,
    createdAt: "2026-01-09",
  },
  
]

// Helper to find author info
function authorRef(username: string) {
  const a = authors.find((x) => x.username === username)
  return {
    name: a?.name ?? "Unknown",
    avatar: a?.avatar ?? "/placeholder.svg?height=40&width=40",
    username: a?.username ?? "unknown",
  }
}

// Posts
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Introducing",
    slug: "RunAsh",
    excerpt: "RunAsh is an AI live streaming platform, where the sellers can demonstrate their product for buyer.",
    content: `
      <h2>Overview</h2>
      <p>RunAsh is an AI live streaming platform.</p>
      <h3>Pipeline</h3>
      <p>We enable retailer to physical sales experience.</p>
      <pre><code></code></pre>
      <h3>AI-Powered</h3>
      <p>The future of live streaming.</p>
      <h3>Takeaways</h3>
      <ul>
        <li>Use ABR for adaptive quality</li>
        <li>Emit client QoS beacons every 2s</li>
        <li>Moderate asynchronously with backpressure</li>
      </ul>
    `,
    category: "Live Streaming",
    gradient: "bg-gradient-to-br from-orange-400 to-red-500",
    emoji: "🎥",
    author: authorRef("rammurmu"),
    publishedAt: "2026-01-09",
    readTime: "8 min read",
    likes: 0,
    comments: 0,
    upvotes: 0,
    tags: ["streaming", "ai", "video", "real-time"],
  },
]

// Comments (demo; in-memory)
let commentsStore: Comment[] = [
  {
    id: "c1",
    postId: "1",
    author: authorRef("rammurmu"),
    content: "Introducing.",
    createdAt: "2026-01-09PT09:46:00Z",
    likes: 0,
  },
  
]

export function getAllPosts(): BlogPost[] {
  return [...blogPosts]
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getAllCategories() {
  const unique = new Map<string, { name: string; slug: string; description: string }>()
  const descriptions: Record<string, string> = {
    "Live Streaming": "Protocols, QoS, encoding, and global delivery.",
    "AI Platform": "Inference, embeddings, moderation, and personalization.",
    "Live Shopping": "Commerce meets livestreaming with real-time UX.",
    "API Platform": "Contracts, gateways, testing, and observability.",
    "Payment Systems": "Billing, fraud prevention, and compliance.",
    "Chat Platform": "Messaging, presence, and scale.",
    "Grocery Store": "Logistics, routing, and forecasting for delivery.",
  }
  for (const p of blogPosts) {
    if (!unique.has(p.category)) {
      unique.set(p.category, {
        name: p.category,
        slug: p.category.toLowerCase().replace(/\s+/g, "-"),
        description: descriptions[p.category] ?? "Posts in this category.",
      })
    }
  }
  return Array.from(unique.values())
}

export function getAllTags() {
  const tagSet = new Set<string>()
  for (const p of blogPosts) p.tags.forEach((t) => tagSet.add(t))
  return Array.from(tagSet).map((t) => ({
    name: t,
    slug: t.toLowerCase().replace(/\s+/g, "-"),
    description: `Posts tagged with #${t}.`,
  }))
}

export function getPostsByCategory(categoryName: string): BlogPost[] {
  return blogPosts.filter((p) => p.category === categoryName)
}

export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((p) => p.tags.includes(tag))
}

export function getAuthorByUsername(username: string): User | undefined {
  return authors.find((a) => a.username === username)
}

export function getPostsByAuthor(username: string): BlogPost[] {
  return blogPosts.filter((p) => p.author.username === username)
}

export function searchPosts(query: string): BlogPost[] {
  const q = query.toLowerCase()
  return blogPosts.filter((p) => {
    return (
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q) ||
      p.author.name.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q)
    )
  })
}

export function getCommentsByPostId(postId: string): Comment[] {
  return commentsStore
    .filter((c) => c.postId === postId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function addComment(
  postId: string,
  author: { name: string; username: string; avatar: string },
  content: string,
): Comment {
  const comment: Comment = {
    id: `c_${Math.random().toString(36).slice(2, 9)}`,
    postId,
    author,
    content,
    createdAt: new Date().toISOString(),
    likes: 0,
  }
  commentsStore = [comment, ...commentsStore]
  return comment
}
