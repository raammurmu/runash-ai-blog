"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, ArrowUp, Zap } from "lucide-react"
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

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation if nested in Link
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: `/post/${post.slug}`,
        })
      } catch (err) {
        console.error("Share failed:", err)
      }
    }
  }

  // Common Header/Thumbnail Component
  const Thumbnail = () => (
    <div className={cn(
      "relative flex items-center justify-center transition-transform duration-500 group-hover:scale-105",
      post.gradient || "border-orange-500/50 bg-orange-50/50 dark:bg-orange-950/20" : "border-orange-200/50 dark:border-orange-900/30",
      viewMode === "list" ? "w-full md:w-56 h-40 md:h-auto" : "h-48"
    )}>
      <span className="text-6xl transform group-hover:rotate-12 transition-transform duration-300 drop-shadow-xl">
        {post.emoji}
      </span>
      <div className="absolute top-3 left-3">
        <Badge className="bg-white/90 text-orange-600 border-none backdrop-blur-md shadow-sm">
          {post.category}
        </Badge>
      </div>
      {post.featured && (
        <div className="absolute top-3 right-3">
          <Badge className="bg-amber-400 text-amber-900 border-none">
            <Zap className="h-3 w-3 mr-1 fill-current" /> Featured
          </Badge>
        </div>
      )}
    </div>
  )

  return (
    <Card className={cn(
      "group overflow-hidden border-orange-100/50 hover:border-orange-200 transition-all duration-300",
      "hover:shadow-[0_8px_30px_rgb(255,237,213,0.5)] bg-card",
      viewMode === "list" ? "flex flex-col md:flex-row min-h-[220px]" : "flex flex-col"
    )}>
      <Link href={`/post/${post.slug}`} className={viewMode === "list" ? "contents" : "block"}>
        <Thumbnail />
      </Link>

      <div className="flex flex-col flex-1">
        <CardContent className="p-5 flex-1">
          <div className="flex justify-between items-start gap-4 mb-2">
            <Link href={`/post/${post.slug}`} className="group/title">
              <h3 className="text-xl font-bold leading-tight group-hover/title:text-orange-500 transition-colors line-clamp-2">
                {post.title}
              </h3>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-muted-foreground hover:text-orange-500 hover:bg-orange-50">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setBookmarked(!bookmarked)}>
                  <Bookmark className={cn("mr-2 h-4 w-4", bookmarked && "fill-orange-500 text-orange-500")} />
                  {bookmarked ? "Saved" : "Save for later"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-2">
            {post.tags?.slice(0, 2).map((tag) => (
              <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-orange-400/80">
                #{tag}
              </span>
            ))}
          </div>
        </CardContent>

        <CardFooter className="px-5 py-4 bg-orange-50/30 border-t border-orange-100/50">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="h-8 w-8 ring-2 ring-white">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback className="bg-orange-100 text-orange-600">{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-green-500 h-2.5 w-2.5 rounded-full border-2 border-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground leading-none">{post.author.name}</span>
                <span className="text-[11px] text-muted-foreground mt-1">{post.readTime}</span>
              </div>
            </div>

            <div className="flex items-center bg-white/50 rounded-full px-1 border border-orange-100 shadow-sm">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => { e.preventDefault(); setUpvoted(!upvoted); }}
                className={cn(
                  "h-8 px-2 rounded-full transition-all",
                  upvoted ? "text-orange-600 bg-orange-100/50" : "text-muted-foreground hover:text-orange-500"
                )}
              >
                <ArrowUp className={cn("h-4 w-4", upvoted && "animate-bounce")} />
                <span className="ml-1 text-xs font-bold">{post.upvotes + (upvoted ? 1 : 0)}</span>
              </Button>

              <div className="w-[1px] h-4 bg-orange-200 mx-0.5" />

              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
                className={cn(
                  "h-8 px-2 rounded-full transition-all",
                  liked ? "text-red-500 bg-red-50" : "text-muted-foreground hover:text-red-500"
                )}
              >
                <Heart className={cn("h-4 w-4", liked && "fill-current animate-pulse")} />
              </Button>

              <div className="w-[1px] h-4 bg-orange-200 mx-0.5" />

              <Button variant="ghost" size="sm" className="h-8 px-2 rounded-full text-muted-foreground hover:text-orange-500" asChild>
                <Link href={`/post/${post.slug}`}>
                  <MessageCircle className="h-4 w-4" />
                  <span className="ml-1 text-xs font-bold">{post.comments}</span>
                </Link>
              </Button>
            </div>
          </div>
        </CardFooter>
      </div>
    </Card>
  )
  }
