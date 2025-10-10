"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, ArrowUp } from "lucide-react"
import type { BlogPost } from "@/lib/types"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface BlogCardProps {
  post: BlogPost
  viewMode?: "grid" | "list"
}

export function BlogCard({ post, viewMode = "grid" }: BlogCardProps) {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [upvoted, setUpvoted] = useState(false)

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: post.title,
        text: post.excerpt,
        url: `/post/${post.slug}`,
      })
    } else {
      await navigator.clipboard.writeText(`${window.location.origin}/post/${post.slug}`)
    }
  }

  if (viewMode === "list") {
    return (
      <Card className="flex flex-col md:flex-row overflow-hidden hover:shadow-sm transition-shadow">
        <div className={cn("w-full md:w-48 h-32 md:h-auto", post.gradient)}>
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl">{post.emoji}</span>
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-2">
            <Badge variant="secondary">{post.category}</Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setBookmarked(!bookmarked)}>
                  <Bookmark className="mr-2 h-4 w-4" />
                  {bookmarked ? "Remove Bookmark" : "Bookmark"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link href={`/post/${post.slug}`}>
            <h3 className="text-xl font-semibold mb-2 hover:text-orange-500 transition-colors">{post.title}</h3>
          </Link>

          <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">{post.author.name}</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{post.readTime}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setUpvoted(!upvoted)}
                className={upvoted ? "text-orange-500" : ""}
              >
                <ArrowUp className="h-4 w-4 mr-1" />
                {post.upvotes + (upvoted ? 1 : 0)}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLiked(!liked)}
                className={liked ? "text-red-500" : ""}
              >
                <Heart className="h-4 w-4 mr-1" />
                {post.likes + (liked ? 1 : 0)}
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/post/${post.slug}`}>
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {post.comments}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden hover:shadow-sm transition-shadow group">
      <CardHeader className="p-0">
        <div className={cn("h-48 relative", post.gradient)}>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">{post.emoji}</span>
          </div>
          <div className="absolute top-4 left-4">
            <Badge variant="secondary">{post.category}</Badge>
          </div>
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setBookmarked(!bookmarked)}>
                  <Bookmark className="mr-2 h-4 w-4" />
                  {bookmarked ? "Remove Bookmark" : "Bookmark"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <Link href={`/post/${post.slug}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-orange-500 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>

        <div className="flex flex-wrap gap-1 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 border-t">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="font-medium">{post.author.name}</div>
              <div className="text-muted-foreground">{post.readTime}</div>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setUpvoted(!upvoted)}
              className={upvoted ? "text-orange-500" : ""}
            >
              <ArrowUp className="h-4 w-4" />
              <span className="ml-1 text-xs">{post.upvotes + (upvoted ? 1 : 0)}</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setLiked(!liked)} className={liked ? "text-red-500" : ""}>
              <Heart className="h-4 w-4" />
              <span className="ml-1 text-xs">{post.likes + (liked ? 1 : 0)}</span>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/post/${post.slug}`}>
                <MessageCircle className="h-4 w-4" />
                <span className="ml-1 text-xs">{post.comments}</span>
              </Link>
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
