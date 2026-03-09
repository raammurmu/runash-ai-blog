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


export interface CommentCreateRequest {
  postId: string
  content: string
  author: {
    name: string
    avatar?: string
    username: string
  }
  parentId?: string | null
}

export type ApiComment = Comment
export type CommentsResponse = ApiComment[]

export type SearchResultType = "post" | "author" | "tag"

export interface SearchResultItem {
  id: string
  type: SearchResultType
  title: string
  subtitle?: string
  url: string
}

export interface ApiSearchResponse {
  query: string
  results: SearchResultItem[]
}
