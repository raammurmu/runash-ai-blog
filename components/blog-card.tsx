"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Share2, MoreHorizontal, ArrowUp, Heart, MessageCircle } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function BlogCard({ post, viewMode = "grid" }: { post: any, viewMode?: "grid" | "list" }) {
  const [liked, setLiked] = useState(false)
  const [upvoted, setUpvoted] = useState(false)

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (window.navigator.vibrate) window.navigator.vibrate(10);
    const url = `${window.location.origin}/post/${post.slug}`;
    if (navigator.share) {
      try { await navigator.share({ title: post.title, url }); } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      alert("Copied to clipboard!");
    }
  }

  return (
    <Card className={cn(
      "group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300",
      "bg-card hover:shadow-2xl hover:shadow-orange-500/10",
      viewMode === "list" ? "flex flex-col md:flex-row" : "flex flex-col"
    )}>
      <Link href={`/post/${post.slug}`} className={cn("relative overflow-hidden", 
        viewMode === "list" ? "w-full md:w-56 h-48 md:h-auto" : "h-52",
        post.gradient || "bg-gradient-to-br from-orange-400 to-amber-500"
      )}>
        <div className="absolute inset-0 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
          {post.emoji}
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary dark:bg-primary/20">{post.category}</Badge>
          <Button variant="ghost" size="icon" onClick={handleShare} className="h-8 w-8">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        <Link href={`/post/${post.slug}`}>
          <h3 className="text-xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
        </Link>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{post.excerpt}</p>
        
        <CardFooter className="p-0 mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="text-muted-foreground">{post.readTime}</span>
          </div>
          <div className="flex items-center gap-1 bg-muted/50 rounded-full px-1">
            <Button variant="ghost" size="sm" onClick={(e) => {e.preventDefault(); setUpvoted(!upvoted)}} className={cn("h-8 rounded-full", upvoted && "text-primary")}>
              <ArrowUp className={cn("h-4 w-4 mr-1", upvoted && "animate-bounce")} /> {post.upvotes + (upvoted ? 1 : 0)}
            </Button>
            <Button variant="ghost" size="sm" onClick={(e) => {e.preventDefault(); setLiked(!liked)}} className={cn("h-8 rounded-full", liked && "text-red-500")}>
              <Heart className={cn("h-4 w-4", liked && "fill-current")} />
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  )
        }
