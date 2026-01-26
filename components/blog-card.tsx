"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  Heart, MessageCircle, Share2, Bookmark, 
  MoreHorizontal, ArrowUp, Zap, Clock 
} from "lucide-react"
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
    e.preventDefault()
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: `/post/${post.slug}`,
        })
      } catch (err) { console.error("Share failed:", err) }
    }
  }

  const Thumbnail = () => (
    <div className={cn(
      "relative flex items-center justify-center overflow-hidden transition-all duration-500",
      post.gradient || "bg-gradient-to-br from-orange-400 via-orange-500 to-amber-400",
      viewMode === "list" ? "w-full md:w-64 h-48 md:h-full" : "h-52"
    )}>
      {/* Abstract Background Decoration */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent scale-150" />
      
      <span className="text-7xl drop-shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
        {post.emoji}
      </span>
      
      <div className="absolute top-4 left-4 flex gap-2">
        <Badge className="bg-white/20 backdrop-blur-md border-white/30 text-white font-bold px-3 py-1 rounded-lg">
          {post.category}
        </Badge>
      </div>

      {post.featured && (
        <div className="absolute top-4 right-4">
          <div className="bg-amber-400 text-amber-950 p-1.5 rounded-xl shadow-lg animate-pulse">
            <Zap className="size-4 fill-current" />
          </div>
        </div>
      )}
    </div>
  )

  return (
    <Card className={cn(
      "group relative overflow-hidden border-none transition-all duration-500",
      "bg-card/50 backdrop-blur-sm hover:bg-card shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(249,115,22,0.12)]",
      "rounded-[2rem] border border-orange-100/20",
      viewMode === "list" ? "flex flex-col md:flex-row min-h-[240px]" : "flex flex-col"
    )}>
      <Link href={`/post/${post.slug}`} className={viewMode === "list" ? "contents" : "block shrink-0"}>
        <Thumbnail />
      </Link>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex justify-between items-start gap-4 mb-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-orange-500/80">
              <Clock className="size-3" />
              {post.readTime}
            </div>
            <Link href={`/post/${post.slug}`}>
              <h3 className="text-xl font-black leading-tight tracking-tight group-hover:text-orange-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
            </Link>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-muted-foreground hover:text-orange-600 hover:bg-orange-50 transition-colors">
                <MoreHorizontal className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 border-orange-100 shadow-xl">
              <DropdownMenuItem onClick={handleShare} className="rounded-xl h-10 font-bold">
                <Share2 className="mr-2 size-4 text-orange-500" /> Share Insight
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setBookmarked(!bookmarked)} className="rounded-xl h-10 font-bold">
                <Bookmark className={cn("mr-2 size-4", bookmarked ? "fill-orange-500 text-orange-500" : "text-orange-500")} />
                {bookmarked ? "Removed from Library" : "Save to Library"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-6 font-medium">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4">
          {/* Author Section */}
          <div className="flex items-center gap-3">
            <div className="relative group/avatar">
              <Avatar className="h-9 w-9 ring-2 ring-orange-100 dark:ring-orange-950 transition-all group-hover/avatar:ring-orange-500">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback className="bg-orange-100 text-orange-600 font-bold">{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 h-3 w-3 rounded-full border-2 border-background" />
            </div>
            <span className="text-sm font-bold text-foreground/90">{post.author.name}</span>
          </div>

          {/* Glass Action Pill */}
          <div className="flex items-center bg-orange-50/50 dark:bg-orange-950/20 backdrop-blur-md rounded-2xl p-1 border border-orange-100/50 dark:border-orange-900/30">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => { e.preventDefault(); setUpvoted(!upvoted); }}
              className={cn(
                "h-8 px-3 rounded-xl transition-all font-black",
                upvoted ? "text-orange-600 bg-white dark:bg-orange-900 shadow-sm" : "text-muted-foreground hover:text-orange-600"
              )}
            >
              <ArrowUp className={cn("h-4 w-4 mr-1.5 transition-transform", upvoted && "-translate-y-0.5")} />
              <span className="text-xs tracking-tighter">{post.upvotes + (upvoted ? 1 : 0)}</span>
            </Button>

            <div className="w-px h-4 bg-orange-200/50 mx-1" />

            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
              className={cn(
                "h-8 w-10 rounded-xl transition-all",
                liked ? "text-red-500 bg-white dark:bg-red-950/30 shadow-sm" : "text-muted-foreground hover:text-red-500"
              )}
            >
              <Heart className={cn("h-4 w-4", liked && "fill-current animate-pulse")} />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
