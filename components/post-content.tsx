"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, Bookmark, ArrowUp } from "lucide-react"
import { useState } from "react"
import type { BlogPost } from "@/lib/types"

interface PostContentProps {
  post: BlogPost
}

export function PostContent({ post }: PostContentProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [upvotes, setUpvotes] = useState(post.upvotes)
  const [isUpvoted, setIsUpvoted] = useState(false)

  const handleUpvote = () => {
    if (isUpvoted) {
      setUpvotes(upvotes - 1)
    } else {
      setUpvotes(upvotes + 1)
    }
    setIsUpvoted(!isUpvoted)
  }

  return (
    <article className="space-y-8">
      {/* Hero Section */}
      <div className={`${post.gradient} rounded-2xl p-8 text-white`}>
        <div className="flex items-center justify-between mb-6">
          <Badge variant="secondary" className="bg-white/20 text-white">
            {post.category}
          </Badge>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleUpvote}
              className={`${isUpvoted ? "text-white" : "text-white/70"} hover:text-white`}
            >
              <ArrowUp className="h-4 w-4 mr-1" />
              {upvotes}
            </Button>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-lg opacity-90 mb-6">{post.excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{post.author.name}</div>
              <div className="text-sm opacity-75">
                {post.publishedAt} • {post.readTime}
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFollowing(!isFollowing)}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between py-6 border-t border-b">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => setIsLiked(!isLiked)} className={isLiked ? "text-red-500" : ""}>
            <Heart className={`h-5 w-5 mr-2 ${isLiked ? "fill-current" : ""}`} />
            {post.likes} Likes
          </Button>

          <Button variant="ghost">
            <MessageCircle className="h-5 w-5 mr-2" />
            {post.comments} Comments
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={isBookmarked ? "text-orange-500" : ""}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
          </Button>
        </div>
      </div>
    </article>
  )
}
