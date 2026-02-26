"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUp, Bookmark, Clock, MessageCircle, MoreHorizontal, Share2, Zap } from "lucide-react"
import type { BlogPost } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface BlogCardProps {
  post: BlogPost
  viewMode?: "grid" | "list"
}

export function BlogCard({ post, viewMode = "grid" }: BlogCardProps) {
  const [upvoted, setUpvoted] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  const handleShare = async (event: React.MouseEvent) => {
    event.preventDefault()
    const url = typeof window !== "undefined" ? `${window.location.origin}/post/${post.slug}` : `/post/${post.slug}`

    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, text: post.excerpt, url })
        return
      } catch {
        // no-op fallback below
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(url)
    }
  }

  return (
    <Card
      className={cn(
        "group overflow-hidden border-orange-100/70 bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-100/40 dark:border-orange-900/40 dark:hover:border-orange-800/50",
        viewMode === "list" ? "flex flex-col md:flex-row" : "flex flex-col",
      )}
    >
      <Link href={`/post/${post.slug}`} className={cn("relative block overflow-hidden", viewMode === "list" ? "md:w-64" : "w-full")}>
        <div className={cn("relative flex h-48 items-center justify-center", post.gradient || "bg-gradient-to-br from-orange-400 to-amber-500", viewMode === "list" && "md:h-full")}>
          <span className="text-6xl drop-shadow-xl transition-transform duration-500 group-hover:scale-110">{post.emoji}</span>
          <Badge className="absolute left-3 top-3 border-none bg-white/90 text-orange-700">{post.category}</Badge>
          {post.featured && (
            <Badge className="absolute right-3 top-3 border-none bg-amber-300 text-amber-900">
              <Zap className="mr-1 h-3 w-3 fill-current" /> Featured
            </Badge>
          )}
        </div>
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <CardContent className="p-5 pb-3">
          <div className="mb-3 flex items-start justify-between gap-3">
            <Link href={`/post/${post.slug}`}>
              <h3 className="line-clamp-2 text-xl font-bold tracking-tight transition-colors hover:text-orange-600 dark:hover:text-orange-300">
                {post.title}
              </h3>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setBookmarked((v) => !v)}>
                  <Bookmark className={cn("mr-2 h-4 w-4", bookmarked && "fill-orange-500 text-orange-500")} />
                  {bookmarked ? "Saved" : "Save"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-orange-700 dark:bg-orange-950/40 dark:text-orange-300">
                #{tag}
              </span>
            ))}
          </div>
        </CardContent>

        <CardFooter className="mt-auto border-t border-orange-100/70 bg-orange-50/30 px-5 py-3 dark:border-orange-900/40 dark:bg-orange-950/10">
          <div className="flex w-full items-center justify-between gap-2">
            <Link href={`/author/${post.author.username}`} className="flex min-w-0 items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold">{post.author.name}</p>
                <p className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Clock className="h-3 w-3" /> {post.readTime}
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={(event) => {
                  event.preventDefault()
                  setUpvoted((v) => !v)
                }}
                className={cn("h-8 gap-1 rounded-full px-2 text-xs", upvoted && "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300")}
              >
                <ArrowUp className={cn("h-3.5 w-3.5", upvoted && "fill-current")} /> {post.upvotes + (upvoted ? 1 : 0)}
              </Button>
              <Button variant="ghost" size="sm" asChild className="h-8 gap-1 rounded-full px-2 text-xs">
                <Link href={`/post/${post.slug}#comments`}>
                  <MessageCircle className="h-3.5 w-3.5" /> {post.comments}
                </Link>
              </Button>
            </div>
          </div>
        </CardFooter>
      </div>
    </Card>
  )
}
