export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  gradient: string
  emoji: string
  image?: string
  featured?: boolean
  status?: "published" | "draft"
  shares?: number
  bookmarks?: number
  author: {
    name: string
    avatar: string
    username: string
  }
  publishedAt: string
  readTime: string
  likes: number
  comments: number
  upvotes: number
  tags: string[]
}

export interface Comment {
  id: string
  postId: string
  author: {
    name: string
    avatar: string
    username: string
  }
  content: string
  createdAt: string
  updatedAt?: string
  likes: number
  parentId?: string
  isEdited?: boolean
}

export interface User {
  id: string
  name: string
  username: string
  email: string
  avatar: string
  bio?: string
  followers: number
  following: number
  createdAt: string
}
