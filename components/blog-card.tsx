"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, Bookmark, ArrowUp } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import type { BlogPost } from "@/lib/types"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [upvotes, setUpvotes] = useState(post.upvotes)
  const [isUpvoted, setIsUpvoted] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleUpvote = () => {
    if (isUpvoted) {
      setUpvotes(upvotes - 1)
    } else {
      setUpvotes(upvotes + 1)
    }
    setIsUpvoted(!isUpvoted)
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
      <div className={`h-32 ${post.gradient} flex items-center justify-center relative`}>
        <div className="text-4xl">{post.emoji}</div>
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleUpvote}
            className={`h-8 w-8 p-0 ${isUpvoted ? "text-orange-500" : "text-white/70"} hover:text-white`}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            {post.category}
          </Badge>
          <span className="text-xs text-muted-foreground">{post.readTime}</span>
        </div>

        <Link href={`/post/${post.slug}`}>
          <h3 className="font-semibold text-lg mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{post.excerpt}</p>

        <div className="flex items-center gap-2 mb-3">
          <Avatar className="h-6 w-6">
            <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{post.author.name}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{post.publishedAt}</span>
        </div>
      </CardContent>

      <CardFooter className="px-4 py-3 border-t bg-muted/20">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleUpvote}
              className={`h-8 px-2 ${isUpvoted ? "text-orange-500" : ""}`}
            >
              <ArrowUp className="h-4 w-4 mr-1" />
              {upvotes}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`h-8 px-2 ${isLiked ? "text-red-500" : ""}`}
            >
              <Heart className={`h-4 w-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
              {post.likes}
            </Button>

            <Button variant="ghost" size="sm" className="h-8 px-2">
              <MessageCircle className="h-4 w-4 mr-1" />
              {post.comments}
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Share2 className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmark}
              className={`h-8 w-8 p-0 ${isBookmarked ? "text-orange-500" : ""}`}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
