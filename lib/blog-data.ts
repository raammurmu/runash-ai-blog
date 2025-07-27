import type { BlogPost } from "./types"

// Mock data - in production, this would come from a database
const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Real-time Live Streaming with WebRTC",
    slug: "building-realtime-live-streaming-webrtc",
    excerpt: "Learn how to implement low-latency live streaming using WebRTC technology for modern web applications.",
    content: `
      <h2>Introduction to WebRTC Live Streaming</h2>
      <p>WebRTC (Web Real-Time Communication) has revolutionized how we approach live streaming on the web. Unlike traditional streaming protocols, WebRTC offers peer-to-peer communication with ultra-low latency.</p>
      
      <h3>Key Benefits</h3>
      <ul>
        <li>Sub-second latency</li>
        <li>No plugins required</li>
        <li>Built-in security</li>
        <li>Adaptive bitrate</li>
      </ul>
      
      <h3>Implementation Overview</h3>
      <p>Setting up WebRTC streaming involves several components:</p>
      <ol>
        <li>Media capture</li>
        <li>Peer connection establishment</li>
        <li>Signaling server</li>
        <li>STUN/TURN servers</li>
      </ol>
      
      <p>This comprehensive guide will walk you through each step of building a production-ready live streaming solution.</p>
    `,
    category: "Live Streaming",
    gradient: "bg-gradient-to-r from-orange-400 to-yellow-400",
    emoji: "📹",
    author: {
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "alexchen",
    },
    publishedAt: "2 days ago",
    readTime: "8 min read",
    likes: 124,
    comments: 23,
    upvotes: 89,
    tags: ["webrtc", "streaming", "javascript"],
  },
  {
    id: "2",
    title: "AI-Powered Live Shopping: The Future of E-commerce",
    slug: "ai-powered-live-shopping-future-ecommerce",
    excerpt:
      "Discover how artificial intelligence is transforming live shopping experiences with personalized recommendations and real-time analytics.",
    content: `
      <h2>The Rise of Live Shopping</h2>
      <p>Live shopping has emerged as a powerful combination of entertainment and commerce, with AI playing a crucial role in enhancing the experience.</p>
      
      <h3>AI Integration Points</h3>
      <ul>
        <li>Real-time product recommendations</li>
        <li>Sentiment analysis of viewer comments</li>
        <li>Dynamic pricing optimization</li>
        <li>Automated inventory management</li>
      </ul>
    `,
    category: "Live Shopping",
    gradient: "bg-gradient-to-r from-blue-400 to-purple-400",
    emoji: "🛒",
    author: {
      name: "Sarah Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "sarahkim",
    },
    publishedAt: "1 day ago",
    readTime: "6 min read",
    likes: 98,
    comments: 17,
    upvotes: 67,
    tags: ["ai", "ecommerce", "shopping"],
  },
  {
    id: "3",
    title: "Building Scalable API Platforms with GraphQL",
    slug: "building-scalable-api-platforms-graphql",
    excerpt: "Learn how to design and implement scalable API platforms using GraphQL for modern applications.",
    content: `
      <h2>Why GraphQL for API Platforms?</h2>
      <p>GraphQL provides a more efficient, powerful and flexible alternative to REST APIs, especially for complex applications.</p>
    `,
    category: "API Platform",
    gradient: "bg-gradient-to-r from-green-400 to-blue-400",
    emoji: "🔗",
    author: {
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "mikej",
    },
    publishedAt: "3 days ago",
    readTime: "12 min read",
    likes: 156,
    comments: 34,
    upvotes: 112,
    tags: ["graphql", "api", "backend"],
  },
  {
    id: "4",
    title: "Implementing Secure Payment Systems",
    slug: "implementing-secure-payment-systems",
    excerpt: "A comprehensive guide to building secure, PCI-compliant payment systems for modern applications.",
    content: `
      <h2>Payment Security Fundamentals</h2>
      <p>Building secure payment systems requires understanding of encryption, tokenization, and compliance requirements.</p>
    `,
    category: "Payment Systems",
    gradient: "bg-gradient-to-r from-pink-400 to-red-400",
    emoji: "💳",
    author: {
      name: "Emma Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "emmad",
    },
    publishedAt: "4 days ago",
    readTime: "10 min read",
    likes: 87,
    comments: 19,
    upvotes: 73,
    tags: ["payments", "security", "fintech"],
  },
  {
    id: "5",
    title: "Real-time Chat Platforms: Architecture & Implementation",
    slug: "realtime-chat-platforms-architecture-implementation",
    excerpt: "Design patterns and technologies for building scalable real-time chat platforms.",
    content: `
      <h2>Chat Platform Architecture</h2>
      <p>Building scalable chat platforms requires careful consideration of real-time communication, message persistence, and user presence.</p>
    `,
    category: "Chat Platform",
    gradient: "bg-gradient-to-r from-purple-400 to-pink-400",
    emoji: "💬",
    author: {
      name: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "davidw",
    },
    publishedAt: "5 days ago",
    readTime: "9 min read",
    likes: 143,
    comments: 28,
    upvotes: 95,
    tags: ["chat", "websockets", "realtime"],
  },
  {
    id: "6",
    title: "AI-Driven Grocery Store Management",
    slug: "ai-driven-grocery-store-management",
    excerpt:
      "How artificial intelligence is revolutionizing inventory management and customer experience in grocery stores.",
    content: `
      <h2>AI in Grocery Operations</h2>
      <p>Modern grocery stores are leveraging AI for demand forecasting, inventory optimization, and personalized shopping experiences.</p>
    `,
    category: "Grocery Store",
    gradient: "bg-gradient-to-r from-green-400 to-yellow-400",
    emoji: "🥬",
    author: {
      name: "Lisa Zhang",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "lisaz",
    },
    publishedAt: "6 days ago",
    readTime: "7 min read",
    likes: 76,
    comments: 15,
    upvotes: 58,
    tags: ["ai", "retail", "grocery"],
  },
]

export async function getBlogPosts(): Promise<BlogPost[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockPosts
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockPosts.find((post) => post.slug === slug) || null
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockPosts.filter((post) => post.category === category)
}
