import type { BlogPost, Comment, User } from "./types"

// Authors
export let authors: User[] = [
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

let authorsStore: User[] = [...authors]

// Helper to find author info
function authorRef(username: string) {
  const a = authorsStore.find((x) => x.username === username)
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
    title: "The Wait is Almost Over: RunAsh Pre-Release",
    slug: "runash-pre-release-announcement",
    excerpt: "We are opening the doors to a limited group of early adopters. See how RunAsh is turning live streams into interactive storefronts.",
    content: `
      <h2>The New Era of Social Selling</h2>
      <p>For too long, online shopping has been a static, 2D experience. You look at a photo, you read a review, and you hope for the best. We're building RunAsh to change that—bringing the human touch back to digital commerce through AI-enhanced live video.</p>
      
      <h3>What to Expect in the Beta</h3>
      <p>Our pre-release version focuses on stability and the core seller experience. We've integrated low-latency streaming with our proprietary AI layer to ensure that your product demonstrations are as smooth as they are smart.</p>
      
      <pre><code>// Current Beta Build: v0.8.4-alpha
{
  "status": "Pre-Release",
  "features": ["Ultra-Low Latency", "AI Chat Moderation", "Dynamic Product Cards"],
  "access": "Invite-Only"
}</code></pre>

      <h3>Why We Are Building This</h3>
      <p>Small businesses and independent sellers need better ways to compete. By providing a platform where the product is the star and the interaction is real-time, we are leveling the playing field for entrepreneurs everywhere.</p>
      
      <h3>Join the Inner Circle</h3>
      <ul>
        <li><strong>Early Access:</strong> Be among the first to set up your shop and start streaming.</li>
        <li><strong>Founding Member Status:</strong> Special badges and lower transaction fees for early adopters.</li>
        <li><strong>Direct Feedback Loop:</strong> Talk directly to our dev team to request the features you need most.</li>
      </ul>
    `,
    category: "Announcement",
    gradient: "bg-gradient-to-br from-purple-500 to-indigo-600",
    emoji: "🚀",
    image: "/images/blog-cover-gradient.svg",
    featured: true,
    status: "published",
    shares: 0,
    bookmarks: 0,
    author: authorRef("rammurmu"),
    publishedAt: "2021-04-06",
    readTime: "3 min read",
    likes: 0,
    comments: 0,
    upvotes: 0,
    tags: ["PreRelease", "Beta", "Startups", "Waitlist"],
  },
  {
    id: "2",
    title: "RunAsh is Live: Start Your Live Commerce Journey",
    slug: "runash-official-launch-live",
    excerpt: "The wait is over. RunAsh is officially open to all sellers and buyers. Experience the power of AI-driven live product demonstrations today.",
    content: `
      <h2>We Are Officially Open for Business</h2>
      <p>After months of development and a successful private beta, we are thrilled to announce that RunAsh is now live for everyone. Our mission to transform e-commerce into a real-time, interactive experience has reached its biggest milestone yet.</p>
      
      <h3>The Demo-to-Sale Pipeline</h3>
      <p>RunAsh isn't just another streaming app; it's a dedicated sales engine. From the moment you hit 'Go Live,' our AI begins analyzing engagement and managing your product queue, allowing you to focus entirely on what you do best: showcasing your products.</p>
      
      <pre><code>// System Status: PRODUCTION
{
  "version": "1.0.0",
  "nodes": "Global-Distribution",
  "streaming_status": "ONLINE",
  "payment_gateway": "ACTIVE"
}</code></pre>

      <h3>What's New in the Public Release?</h3>
      <p>We’ve used the feedback from our early testers to refine the platform. This release includes several major upgrades to help you scale your sales immediately.</p>

      <h3>Ready to Scale Your Business?</h3>
      <ul>
        <li><strong>Enhanced AI Chat:</strong> Our AI now automatically answers common shipping and pricing questions so you don't have to.</li>
        <li><strong>Global CDN:</strong> High-definition streaming with near-zero latency, no matter where your buyers are located.</li>
        <li><strong>Seller Dashboard:</strong> Comprehensive analytics to track your live sales performance and viewer conversion rates.</li>
      </ul>
      <p>Don't just list your products. Bring them to life. Create your account today and host your first live auction or demonstration.</p>
    `,
    category: "Product",
    gradient: "bg-gradient-to-br from-green-400 to-cyan-500",
    emoji: "🏁",
    image: "/images/blog-cover-gradient.svg",
    featured: false,
    status: "published",
    shares: 0,
    bookmarks: 0,
    author: authorRef("rammurmu"),
    publishedAt: "2022-04-06",
    readTime: "5 min read",
    likes: 0,
    comments: 0,
    upvotes: 0,
    tags: ["Launch", "LiveStreaming", "Ecommerce", "FinTech"],
  },

  {
    id: "3",
    title: "Introducing RunAsh: The Future of AI-Powered Live Commerce",
    slug: "introducing-runash-platform",
    excerpt: "Discover how RunAsh is revolutionizing the shopping experience by combining real-time AI insights with live video demonstrations.",
    content: `
      <h2>Overview</h2>
      <p>RunAsh is an AI-driven live streaming platform designed to bridge the gap between digital browsing and physical shopping. We provide a space where sellers can demonstrate products in real-time, answering buyer questions through an AI-enhanced interface that streamlines the path from discovery to checkout.</p>
      
      <h3>The Live Shopping Revolution</h3>
      <p>Traditional e-commerce is often static and lonely. RunAsh changes that by bringing the energy of a physical storefront to the digital world. Sellers can showcase the nuances of their products—the texture of a fabric, the sound of a device, or the fit of a garment—while AI helps moderate chats and highlight key product features automatically.</p>
      
      <pre><code>// Example: AI-Powered Product Tagging
{
  "event": "product_mention",
  "timestamp": "00:45",
  "product_id": "ash_789",
  "action": "overlay_buy_button"
}</code></pre>

      <h3>Why Choose RunAsh?</h3>
      <p>Whether you are a solo creator or a global brand, RunAsh provides the tools to turn viewers into loyal customers through interactive storytelling.</p>

      <h3>Key Features</h3>
      <ul>
        <li><strong>AI Real-Time Insights:</strong> Get instant data on viewer engagement and sentiment during your live stream.</li>
        <li><strong>Interactive Product Overlays:</strong> Buyers can click directly on items being shown to see specs or add to cart without leaving the stream.</li>
        <li><strong>Seamless Low-Latency Video:</strong> Experience high-definition streaming with minimal delay, ensuring that the interaction between buyer and seller feels natural and immediate.</li>
      </ul>
      <h3>The Road Ahead</h3>
      <p>This is just the beginning for RunAsh. We are committed to building the most intuitive live-commerce engine on the market, helping entrepreneurs in India and beyond scale their reach through the power of AI and video.</p>
    `,
    category: "Company",
    gradient: "bg-gradient-to-br from-orange-400 to-red-500",
    emoji: "🎥",
    image: "/images/blog-cover-gradient.svg",
    featured: false,
    status: "published",
    shares: 0,
    bookmarks: 0,
    author: authorRef("rammurmu"),
    publishedAt: "2026-01-09",
    readTime: "8 min read",
    likes: 0,
    comments: 0,
    upvotes: 0,
    tags: ["streaming", "ai", "video", "real-time"],
  },
  {
    id: "4",
    title: "RunAsh is Live: The Future of Live Shopping Starts Today",
    slug: "runash-official-launch-is-here",
    excerpt: "The wait is over. RunAsh is officially open to all sellers and buyers. Experience the power of AI-driven live product demonstrations today.",
    content: `
      <h2>We Are Officially Open for Business</h2>
      <p>After months of development and a successful private beta, we are thrilled to announce that RunAsh is now live for everyone. Our mission to transform e-commerce into a real-time, interactive experience has reached its biggest milestone yet.</p>
      
      <h3>The Demo-to-Sale Pipeline</h3>
      <p>RunAsh isn't just another streaming app; it's a dedicated sales engine. From the moment you hit 'Go Live,' our AI begins analyzing engagement and managing your product queue, allowing you to focus entirely on what you do best: showcasing your products.</p>
      
      <pre><code>// System Status: PRODUCTION
{
  "version": "1.0.0",
  "nodes": "Global-Distribution",
  "streaming_status": "ONLINE",
  "payment_gateway": "ACTIVE"
}</code></pre>

      <h3>What's New in the Public Release?</h3>
      <p>We’ve used feedback from our early testers to refine the platform. This release includes several major upgrades to help you scale your sales immediately.</p>

      <h3>Ready to Scale Your Business?</h3>
      <ul>
        <li><strong>Enhanced AI Chat:</strong> Our AI now automatically answers common shipping and pricing questions so you don't have to break your flow.</li>
        <li><strong>Global CDN:</strong> High-definition streaming with near-zero latency, no matter where your buyers are located.</li>
        <li><strong>Seller Dashboard:</strong> Comprehensive analytics to track your live sales performance and viewer conversion rates in real-time.</li>
      </ul>
      <p>Don't just list your products. Bring them to life. Create your account today and host your first live auction or demonstration.</p>
    `,
    category: "Product",
    gradient: "bg-gradient-to-br from-green-400 to-cyan-500",
    emoji: "🏁",
    image: "/images/blog-cover-gradient.svg",
    featured: false,
    status: "published",
    shares: 0,
    bookmarks: 0,
    author: authorRef("rammurmu"),
    publishedAt: "2026-01-26",
    readTime: "5 min read",
    likes: 0,
    comments: 0,
    upvotes: 0,
    tags: ["Launch", "LiveStreaming", "Ecommerce", "FinTech"],
  },

]

let postsStore: BlogPost[] = [...blogPosts]


// Comments (demo; in-memory)
let commentsStore: Comment[] = [
  {
    id: "c1",
    postId: "1",
    author: authorRef("rammurmu"),
    content: "Great initiative.",
    createdAt: "2026-01-09T09:46:00Z",
    likes: 0,
  },

]

export function getAllPosts(): BlogPost[] {
  return [...postsStore]
}

export function getPublishedPosts(): BlogPost[] {
  return postsStore.filter((post) => post.status !== "draft")
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return postsStore.find((p) => p.slug === slug)
}

export function getAllCategories() {
  const unique = new Map<string, { name: string; slug: string; description: string }>()
  const descriptions: Record<string, string> = {
    "All Posts": "Protocols, QoS, encoding, and global delivery.",
    "Tutorials": "Inference, embeddings, moderation, and personalization.",
    "Product Updates": "Commerce meets livestreaming with real-time UX.",
    "AI Research": "Contracts, gateways, testing, and observability.",
    "Community": "Billing, fraud prevention, and compliance.",
   // "Company": "Messaging, presence, and scale.",
   // "Release": "Logistics, routing, and forecasting for delivery.",
  }
  for (const p of postsStore) {
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
  for (const p of postsStore) p.tags.forEach((t) => tagSet.add(t))
  return Array.from(tagSet).map((t) => ({
    name: t,
    slug: t.toLowerCase().replace(/\s+/g, "-"),
    description: `Posts tagged with #${t}.`,
  }))
}

export function getPostsByCategory(categoryName: string): BlogPost[] {
  return postsStore.filter((p) => p.category === categoryName)
}

export function getPostsByTag(tag: string): BlogPost[] {
  return postsStore.filter((p) => p.tags.includes(tag))
}

export function getAuthorByUsername(username: string): User | undefined {
  return authorsStore.find((a) => a.username === username)
}

export function getPostsByAuthor(username: string): BlogPost[] {
  return postsStore.filter((p) => p.author.username === username)
}

export function getAuthors(): User[] {
  return [...authorsStore]
}

export function updateAuthorFollowers(username: string, delta: number): User | undefined {
  const next = authorsStore.map((author) => {
    if (author.username !== username) return author
    return { ...author, followers: Math.max(0, author.followers + delta) }
  })
  const updated = next.find((author) => author.username === username)
  if (!updated) return undefined
  authorsStore = next
  authors = [...authorsStore]
  return updated
}

export function searchPosts(query: string): BlogPost[] {
  const q = query.toLowerCase()
  return postsStore.filter((p) => {
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

export function getBlogPosts(): BlogPost[] {
  return getAllPosts()
}

export function addBlogPost(post: BlogPost) {
  const normalized = {
    ...post,
    status: post.status ?? "published",
    shares: post.shares ?? 0,
    bookmarks: post.bookmarks ?? 0,
  }
  postsStore = [normalized, ...postsStore]
}

export function updateBlogPost(slug: string, next: Partial<BlogPost>): BlogPost | undefined {
  const index = postsStore.findIndex((post) => post.slug === slug)
  if (index === -1) return undefined
  const updated = {
    ...postsStore[index],
    ...next,
    status: next.status ?? postsStore[index].status ?? "published",
  }
  postsStore = postsStore.map((post, idx) => (idx === index ? updated : post))
  return updated
}

export function deleteBlogPost(slug: string): boolean {
  const next = postsStore.filter((post) => post.slug !== slug)
  if (next.length === postsStore.length) return false
  postsStore = next
  return true
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
