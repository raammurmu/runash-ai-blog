import type { BlogPost, Comment, User, Category, Tag } from "./types"

// --- Real Professional Authors ---
export const authors: User[] = [
  {
    id: "u_1",
    name: "Ram Murmu",
    username: "rammurmu",
    email: "rammurmu@runash.in",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    bio: "Core contributor to RunAsh.",
    followers: 0,
    following: 0,
    createdAt: "2026-01-09",
  },
  {
    id: "u_2",
    name: "Vaibhav Murmu",
    username: "vaibhavmurmu",
    email: "vaibhavmurmu@runash.in",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    bio: "Community Contributor.",
    followers: 0,
    following: 0,
    createdAt: "2026-01-09",
  },
  
]

// Internal helper for mapping author snapshots to posts
const getAuthor = (username: string) => {
  const user = authors.find(a => a.username === username) || authors[0]
  return { name: user.name, username: user.username, avatar: user.avatar }
}

// --- Enhanced Blog Posts ---
export const blogPosts: BlogPost[] = [
  {
    id: "p_1",
    title: "Introducing",
    slug: "RunAsh",
    excerpt: "RunAsh is an AI live streaming platform.",
    category: "Live Streaming",
    gradient: "from-orange-500 to-rose-500",
    emoji: "⚡",
    author: getAuthor("rammurmu"),
    publishedAt: "2026-01-09",
    readTime: "8 min",
    likes: 0,
    comments: 0,
    upvotes: 0,
    tags: ["webrtc", "tensorflow", "real-time"],
    content: `
      <h2>Introducing the RunAsh</h2>
      <p>RunAsh is an AI libe streaming platform,where the sellers can demonstrate their product with buyer.</p>
      <pre><code>const stream = await navigator.mediaDevices.getUserMedia({ video: true });
       const trackProcessor = new MediaStreamTrackProcessor({ track: stream.getVideoTracks()[0] });</code></pre>
      <h3>Key Strategies</h3>
      <ul>
        <li>Use <strong>Insertable Streams</strong> for frame manipulation.</li>
        <li>Quantize models to INT8 to run on edge mobile devices.</li>
      </ul>
    `
  },
  {
    id: "p_2",
    title: "Introducing",
    slug: "Agentic live commer",
    excerpt: "The future of live shopping.",
    category: "Agentic",
    gradient: "from-blue-500 to-indigo-600",
    emoji: "🔍",
    author: getAuthor("vaibhavmurmu"),
    publishedAt: "2026-01-09",
    readTime: "10 min",
    likes: 0,
    comments: 0,
    upvotes: 0,
    tags: ["community", "sales", "support"],
    content: `
      <h2>Semantic Discovery</h2>
      <p>Introducing the RunAsh Agentic live commerce the future of live shopping.</p>
    `
  }
]

// --- Simplified Data Fetchers ---

export const getAllPosts = () => blogPosts

export const getPostBySlug = (slug: string) => blogPosts.find(p => p.slug === slug)

export const getCategories = (): Category[] => {
  const cats = Array.from(new Set(blogPosts.map(p => p.category)))
  return cats.map(name => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    count: blogPosts.filter(p => p.category === name).length
  }))
}

export const getTags = (): Tag[] => {
  const allTags = blogPosts.flatMap(p => p.tags)
  return Array.from(new Set(allTags)).map(name => ({
    name,
    slug: name.toLowerCase()
  }))
}

/**
 * Enhanced Search: Filters by title, tags, or author name
 */
export const searchPosts = (query: string): BlogPost[] => {
  const term = query.toLowerCase()
  return blogPosts.filter(p => 
    p.title.toLowerCase().includes(term) ||
    p.tags.some(t => t.toLowerCase().includes(term)) ||
    p.author.name.toLowerCase().includes(term)
  )
}

// --- Comments Logic (In-memory) ---
let commentsStore: Comment[] = [
  {
    id: "c_1",
    postId: "p_1",
    author: getAuthor("sarah_ai"),
    content: "The WebRTC Worker approach cut our latency by 40%! Great share.",
    createdAt: new Date().toISOString(),
    likes: 12
  }
]

export const getComments = (postId: string) => 
  commentsStore.filter(c => c.postId === postId).sort((a, b) => b.likes - a.likes)

export const addComment = (postId: string, username: string, content: string) => {
  const newComment: Comment = {
    id: Math.random().toString(36).substring(7),
    postId,
    author: getAuthor(username),
    content,
    createdAt: new Date().toISOString(),
    likes: 0
  }
  commentsStore = [newComment, ...commentsStore]
  return newComment
    }
