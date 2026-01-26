export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  gradient: string
  emoji: string
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
// lib/types.ts
export interface BlogPost {
  id: string;
  slug: string; // Used for SEO-friendly URLs
  title: string;
  excerpt: string;
  content: string; // The full body text
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  date: string;
  readTime: string; // e.g., "8 min read"
  category: "Tutorials" | "Product Updates" | "AI Research" | "Community";
  image: string;
  featured?: boolean;
  upvotes: number;
  }
