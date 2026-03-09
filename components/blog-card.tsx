"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Share2, Bookmark, MoreHorizontal, Zap } from "lucide-react"
import type { BlogPost } from "@/lib/types"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { formatPostDate } from "@/lib/blog-data"

interface BlogCardProps {
  post: BlogPost
  viewMode?: "grid" | "list"
}

export function BlogCard({ post, viewMode = "grid" }: BlogCardProps) {
  const [bookmarked, setBookmarked] = useState(false)

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault()
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

  const Thumbnail = () => (
    <div
      className={cn(
        "relative flex items-center justify-center transition-transform duration-500 group-hover:scale-105",
        post.gradient || "bg-gradient-to-br from-orange-400 to-amber-500",
        viewMode === "list" ? "w-full md:w-56 h-40 md:h-auto" : "h-48",
      )}
    >
      <span className="text-6xl transform group-hover:rotate-12 transition-transform duration-300 drop-shadow-xl">{post.emoji}</span>
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
    <Card
      className={cn(
        "group overflow-hidden border-orange-100/50 hover:border-orange-200 transition-all duration-300",
        "hover:shadow-[0_8px_30px_rgb(255,237,213,0.5)] bg-card",
        viewMode === "list" ? "flex flex-col md:flex-row min-h-[220px]" : "flex flex-col",
      )}
    >
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
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 -mr-2 text-muted-foreground hover:text-orange-500 hover:bg-orange-50"
                >
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

          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-xs text-muted-foreground">{formatPostDate(post.publishedAt)}</span>
            <span className="text-muted-foreground/50">•</span>
            <span className="text-xs text-muted-foreground">{post.category}</span>
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {post.tags?.slice(0, 2).map((tag) => (
              <span key={tag} className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/80">
                #{tag}
              </span>
            ))}
          </div>
        </CardContent>

        <CardFooter className="px-5 py-4 bg-orange-50/30 border-t border-orange-100/50">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8 ring-2 ring-white">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback className="bg-orange-100 text-orange-600">{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-semibold text-foreground leading-none">{post.author.name}</span>
            </div>

            <span className="text-xs text-muted-foreground">{post.readTime}</span>
          </div>
        </CardFooter>
      </div>
    </Card>
  )
}
