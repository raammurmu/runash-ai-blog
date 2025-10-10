import type { BlogPost, Comment, User } from "./types"

// Authors
export const authors: User[] = [
  {
    id: "a1",
    name: "Alex Chen",
    username: "alexchen",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=64&width=64",
    bio: "Video systems engineer focused on low-latency streaming and QoS.",
    followers: 1240,
    following: 212,
    createdAt: "2023-02-10",
  },
  {
    id: "a2",
    name: "Sarah Johnson",
    username: "sarahj",
    email: "sarah@example.com",
    avatar: "/placeholder.svg?height=64&width=64",
    bio: "Applied ML engineer building recommendation systems for commerce.",
    followers: 1870,
    following: 156,
    createdAt: "2022-07-24",
  },
  {
    id: "a3",
    name: "Mike Rodriguez",
    username: "mikero",
    email: "mike@example.com",
    avatar: "/placeholder.svg?height=64&width=64",
    bio: "API platform architect. Loves typed contracts and observability.",
    followers: 980,
    following: 91,
    createdAt: "2021-11-03",
  },
  {
    id: "a4",
    name: "Emily Davis",
    username: "emilyd",
    email: "emily@example.com",
    avatar: "/placeholder.svg?height=64&width=64",
    bio: "Fintech and payment security specialist. Fighting fraud since 2016.",
    followers: 2031,
    following: 143,
    createdAt: "2020-04-18",
  },
  {
    id: "a5",
    name: "David Kim",
    username: "davidk",
    email: "david@example.com",
    avatar: "/placeholder.svg?height=64&width=64",
    bio: "Distributed systems engineer. Builds resilient chat at scale.",
    followers: 1545,
    following: 201,
    createdAt: "2019-09-01",
  },
  {
    id: "a6",
    name: "Lisa Wang",
    username: "lisaw",
    email: "lisa@example.com",
    avatar: "/placeholder.svg?height=64&width=64",
    bio: "Data scientist optimizing supply chains and deliveries with ML.",
    followers: 1172,
    following: 88,
    createdAt: "2022-03-22",
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
    title: "Building Real-time Video Streaming with AI Enhancement",
    slug: "real-time-video-streaming-ai",
    excerpt: "Implement low-latency streaming pipelines with AI features like auto quality and moderation.",
    content: `
      <h2>Overview</h2>
      <p>Delivering live video at scale requires managing latency, quality, and reliability. In this guide we design an end-to-end pipeline from ingest to playback, adding AI for automatic bitrate selection and content moderation.</p>
      <h3>Pipeline</h3>
      <p>We use an RTMP/WebRTC ingest, a transcoding stage, an origin, and a global CDN. We measure effective latency (glass-to-glass) and use QoS events to adapt.</p>
      <pre><code>{"{ \\"ingest\\": \\"WebRTC\\", \\"codec\\": \\"H.264\\", \\"profile\\": \\"baseline\\" }"}</code></pre>
      <h3>AI Moderation</h3>
      <p>Frames are sampled for inference. We run a lightweight model to detect sensitive content and apply policy-driven actions without blocking the main stream.</p>
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
    author: authorRef("alexchen"),
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    likes: 124,
    comments: 6,
    upvotes: 89,
    tags: ["streaming", "ai", "video", "real-time"],
  },
  {
    id: "2",
    title: "AI-Powered Live Shopping: The Future of E-commerce",
    slug: "ai-powered-live-shopping",
    excerpt: "How AI elevates live shopping with personalization, dynamic pricing, and engagement loops.",
    content: `
      <h2>Experience Matters</h2>
      <p>Live shopping works when discovery is enjoyable and frictionless. Recommendations and real-time chat create social proof and urgency.</p>
      <h3>Personalization</h3>
      <p>Rank products per viewer using embeddings and session signals. Blend popularity with personal affinity to balance exploration and relevance.</p>
      <h3>Operational Tips</h3>
      <ul>
        <li>Cache product cards at the edge</li>
        <li>Use optimistic UI for cart adds</li>
        <li>Handle inventory in a single source of truth</li>
      </ul>
    `,
    category: "Live Shopping",
    gradient: "bg-gradient-to-br from-yellow-400 to-orange-500",
    emoji: "🛒",
    author: authorRef("sarahj"),
    publishedAt: "2024-01-14",
    readTime: "6 min read",
    likes: 98,
    comments: 5,
    upvotes: 76,
    tags: ["ai", "e-commerce", "shopping", "live-streaming"],
  },
  {
    id: "3",
    title: "Designing Scalable APIs for Live Streaming Platforms",
    slug: "scalable-apis-live-streaming",
    excerpt: "API design patterns that handle millions of concurrent viewers and events.",
    content: `
      <h2>Contracts First</h2>
      <p>Use typed schemas and versioning. Backwards-compatible changes protect clients and enable independent deploys.</p>
      <h3>Observability</h3>
      <p>Emit structured logs and metrics for each endpoint. Sample traces to identify hot paths and regressions.</p>
      <pre><code>{"GET /v2/streams?status=live&limit=50"}</code></pre>
    `,
    category: "API Platform",
    gradient: "bg-gradient-to-br from-blue-400 to-purple-500",
    emoji: "⚡",
    author: authorRef("mikero"),
    publishedAt: "2024-01-13",
    readTime: "12 min read",
    likes: 156,
    comments: 8,
    upvotes: 112,
    tags: ["api", "scalability", "backend", "streaming"],
  },
  {
    id: "4",
    title: "Implementing Secure Payment Systems for Live Commerce",
    slug: "secure-payment-systems-live-commerce",
    excerpt: "Integrate payments with fraud detection, idempotency, and strong customer authentication.",
    content: `
      <h2>Payment Flow</h2>
      <p>Use client tokens, server confirmations, and webhooks for reconciliation. Idempotency keys ensure retries are safe.</p>
      <h3>Fraud Controls</h3>
      <p>Blend rules with ML signals: velocity, device fingerprints, and geolocation anomaly detection.</p>
      <h3>Compliance</h3>
      <p>Meet PCI-DSS and PSD2 SCA requirements where applicable.</p>
    `,
    category: "Payment Systems",
    gradient: "bg-gradient-to-br from-green-400 to-blue-500",
    emoji: "💳",
    author: authorRef("emilyd"),
    publishedAt: "2024-01-12",
    readTime: "10 min read",
    likes: 87,
    comments: 4,
    upvotes: 65,
    tags: ["payments", "security", "fintech", "commerce"],
  },
  {
    id: "5",
    title: "Real-time Chat Systems: Architecture and Implementation",
    slug: "real-time-chat-systems",
    excerpt: "Patterns for WebSocket multiplexing, delivery guarantees, and presence at scale.",
    content: `
      <h2>Backpressure</h2>
      <p>Protect your brokers by applying quotas and buffering strategies. Drop non-essential events under load.</p>
      <h3>Delivery</h3>
      <p>Choose between at-most-once, at-least-once, or exactly-once semantics based on UX and cost.</p>
      <h3>Presence</h3>
      <p>Use heartbeats and expiry to maintain accurate presence across devices.</p>
    `,
    category: "Chat Platform",
    gradient: "bg-gradient-to-br from-purple-400 to-pink-500",
    emoji: "💬",
    author: authorRef("davidk"),
    publishedAt: "2024-01-11",
    readTime: "9 min read",
    likes: 143,
    comments: 7,
    upvotes: 95,
    tags: ["chat", "websocket", "real-time", "messaging"],
  },
  {
    id: "6",
    title: "AI-Driven Grocery Delivery Optimization",
    slug: "ai-grocery-delivery-optimization",
    excerpt: "Optimize routing, slotting, and inventory with data-driven models for on-time delivery.",
    content: `
      <h2>Routing</h2>
      <p>Start with a VRP heuristic and layer dynamic constraints like traffic and cold-chain priorities.</p>
      <h3>Inventory</h3>
      <p>Use demand forecasting to reduce substitutions and spoilage by up to 18%.</p>
      <h3>Ops</h3>
      <p>Measure pick rates and fulfillment cycle times to find bottlenecks.</p>
    `,
    category: "Grocery Store",
    gradient: "bg-gradient-to-br from-green-400 to-yellow-500",
    emoji: "🥬",
    author: authorRef("lisaw"),
    publishedAt: "2024-01-10",
    readTime: "7 min read",
    likes: 72,
    comments: 3,
    upvotes: 54,
    tags: ["ai", "logistics", "grocery", "optimization"],
  },
  {
    id: "7",
    title: "Moderation at the Edge for Live Platforms",
    slug: "edge-moderation-live-platforms",
    excerpt: "Run lightweight models near viewers to flag risky content quickly and reduce latency.",
    content: `
      <h2>Edge Inference</h2>
      <p>Deploy WASM-compiled models to run in edge functions with low cold-starts. Stream frames and aggregate decisions centrally.</p>
    `,
    category: "AI Platform",
    gradient: "bg-gradient-to-br from-fuchsia-400 to-rose-500",
    emoji: "🧠",
    author: authorRef("sarahj"),
    publishedAt: "2024-01-09",
    readTime: "6 min read",
    likes: 64,
    comments: 2,
    upvotes: 49,
    tags: ["ai", "moderation", "edge"],
  },
  {
    id: "8",
    title: "Testing APIs with Contract-Driven Development",
    slug: "contract-driven-api-testing",
    excerpt: "Use schema-first workflows, mocks, and replay to catch regressions before they ship.",
    content: `
      <h2>Schemas</h2>
      <p>Define OpenAPI or JSON Schema and generate clients/servers. Validate every request/response.</p>
      <h3>Replay</h3>
      <p>Record traffic and replay against new builds to detect breaking changes.</p>
    `,
    category: "API Platform",
    gradient: "bg-gradient-to-br from-sky-400 to-indigo-500",
    emoji: "🧪",
    author: authorRef("mikero"),
    publishedAt: "2024-01-08",
    readTime: "8 min read",
    likes: 51,
    comments: 2,
    upvotes: 38,
    tags: ["api", "testing", "quality"],
  },
  {
    id: "9",
    title: "Subscriptions and Invoicing for SaaS",
    slug: "subscriptions-and-invoicing-saas",
    excerpt: "Implement recurring billing with proration, dunning, and tax compliance.",
    content: `
      <h2>Billing Graph</h2>
      <p>Model subscriptions, invoices, and adjustments. Keep finance reports accurate with idempotent events.</p>
    `,
    category: "Payment Systems",
    gradient: "bg-gradient-to-br from-teal-400 to-emerald-500",
    emoji: "🧾",
    author: authorRef("emilyd"),
    publishedAt: "2024-01-07",
    readTime: "7 min read",
    likes: 77,
    comments: 1,
    upvotes: 58,
    tags: ["payments", "billing", "saas"],
  },
  {
    id: "10",
    title: "Operating Chat at Planet Scale",
    slug: "operating-chat-planet-scale",
    excerpt: "Shard intelligently, compress payloads, and plan capacity to keep latency low worldwide.",
    content: `
      <h2>Sharding</h2>
      <p>Choose consistent hashing to balance room keys. Compress messages with shared dictionaries.</p>
    `,
    category: "Chat Platform",
    gradient: "bg-gradient-to-br from-violet-400 to-purple-600",
    emoji: "🌍",
    author: authorRef("davidk"),
    publishedAt: "2024-01-06",
    readTime: "9 min read",
    likes: 84,
    comments: 3,
    upvotes: 61,
    tags: ["chat", "scaling", "latency"],
  },
]

// Comments (demo; in-memory)
let commentsStore: Comment[] = [
  {
    id: "c1",
    postId: "1",
    author: authorRef("sarahj"),
    content: "Loved the breakdown of QoS signals and ABR tuning.",
    createdAt: "2024-01-16T09:40:00Z",
    likes: 3,
  },
  {
    id: "c2",
    postId: "1",
    author: authorRef("mikero"),
    content: "Any guidance on tuning for high-motion content?",
    createdAt: "2024-01-16T10:02:00Z",
    likes: 1,
  },
  {
    id: "c3",
    postId: "2",
    author: authorRef("alexchen"),
    content: "Edge-caching product cards is a great tip.",
    createdAt: "2024-01-15T18:25:00Z",
    likes: 2,
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
