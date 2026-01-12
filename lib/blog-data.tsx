import type { BlogPost, Comment, User } from "./types"

// Authors - Expanded to include more details for the "Author Card" UI
export const authors: User[] = [
  {
    id: "a1",
    name: "Ram Murmu",
    username: "rammurmu",
    email: "rammurmu@runash.in",
    avatar: "/rammurmu.png?height=64&width=64",
    bio: "Full-stack developer and AI Streaming Architect.",
    followers: 124,
    following: 45,
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

// Posts - Improved with structured content similar to the NVIDIA technical blog
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Scaling Real-Time Video Commerce with AI-Driven Live Streams",
    slug: "introducing-runash-platform",
    excerpt: "Breaking the trade-off between stream latency and interactive buyer engagement.",
    content: `
      <p>In the world of digital commerce, we have long been trapped by a familiar trade-off: <strong>reach versus engagement</strong>. Traditional live streaming relies on high-latency HLS buffers, making real-time interaction between sellers and buyers nearly impossible at scale.</p>
      
      <h2>The Challenge: Why Legacy Streaming Fails Commerce</h2>
      <p>Most platforms labeled as "Live" actually operate on a 10-30 second delay. For a seller demonstrating a product, this lag creates a "communication cliff" where buyer questions go unanswered for nearly half a minute.</p>
      
      <h3>The RunAsh Solution</h3>
      <p>RunAsh introduces a proprietary <strong>Low-Latency Inference Pipeline</strong> that allows sellers to demonstrate products while an AI agent monitors the chat and visual feed to highlight features in real-time.</p>
      
      <h3>Key Architectural Advantages</h3>
      <ul>
        <li><strong>Sub-Second Latency:</strong> Built on WebRTC optimized for high-concurrency commercial events.</li>
        <li><strong>AI Contextual Awareness:</strong> The platform "sees" what the seller is holding and automatically overlays product specs.</li>
        <li><strong>Interactive Deltas:</strong> Only processing changes in the stream to maintain 3x higher efficiency in compute.</li>
      </ul>
      
      <blockquote>"RunAsh isn't just a video player; it's a real-time bridge between product demonstration and instant purchase."</blockquote>
    `,
    category: "Community", // Matches the "Community Article" badge in the screenshot
    gradient: "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500",
    emoji: "🚀",
    author: authorRef("rammurmu"),
    publishedAt: "2026-01-12",
    readTime: "5 min read",
    likes: 84,
    comments: 12,
    upvotes: 59, // Matches the upvote count in the image
    tags: ["streaming", "ai", "commerce", "real-time", "latency"],
  },
]

// Comments
let commentsStore: Comment[] = [
  {
    id: "c1",
    postId: "1",
    author: authorRef("rammurmu"),
    content: "We are officially open for early-access developers. Check the documentation for the API keys!",
    createdAt: "2026-01-12T09:46:00Z",
    likes: 5,
  },
]

// ... (Rest of the functions remain the same as they are logic-based)

export function getAllPosts(): BlogPost[] {
  return [...blogPosts]
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

// Updated Categories to include the "Community" category shown in the screenshot
export function getAllCategories() {
  const unique = new Map<string, { name: string; slug: string; description: string }>()
  const descriptions: Record<string, string> = {
    "Company": "Official announcements and corporate updates.",
    "Research": "Deep dives into low-latency algorithms and AI models.",
    "Community": "User-contributed insights and ecosystem spotlights.",
    "Release": "New features, SDK updates, and patch notes.",
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

// ... (Rest of the search and filter functions)
