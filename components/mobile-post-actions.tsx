"use client"

import { Button } from "@/components/ui/button"
import { ArrowUp, MessageCircle, Share2, Heart, Bookmark } from "lucide-react"
import { useState } from "react"
import type { BlogPost } from "@/lib/types"

export function MobilePostActions({ post }: { post: BlogPost }) {
  const [upvoted, setUpvoted] = useState(false)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  const sendAction = async (action: string, delta = 1) => {
    await fetch(`/api/posts/${post.slug}/actions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, delta, username: post.author.username }),
    })
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-orange-100 md:hidden flex justify-around items-center z-40 pb-safe">
      <Button 
        variant="ghost" 
        onClick={async () => {
          setUpvoted(!upvoted)
          await sendAction("upvote")
        }}
        className={`flex flex-col gap-1 h-auto py-2 ${upvoted ? 'text-orange-600' : 'text-muted-foreground'}`}
      >
        <ArrowUp className={`h-6 w-6 ${upvoted ? 'animate-bounce' : ''}`} />
        <span className="text-[10px] font-bold">{post.upvotes + (upvoted ? 1 : 0)}</span>
      </Button>
      
      <Button 
        variant="ghost" 
        onClick={async () => {
          setLiked(!liked)
          await sendAction("like")
        }}
        className={`flex flex-col gap-1 h-auto py-2 ${liked ? 'text-red-500' : 'text-muted-foreground'}`}
      >
        <Heart className={`h-6 w-6 ${liked ? 'fill-current' : ''}`} />
        <span className="text-[10px] font-bold">{post.likes + (liked ? 1 : 0)}</span>
      </Button>

      <Button variant="ghost" className="flex flex-col gap-1 h-auto py-2 text-muted-foreground">
        <MessageCircle className="h-6 w-6" />
        <span className="text-[10px] font-bold">{post.comments}</span>
      </Button>

      <Button 
        variant="ghost" 
        onClick={async () => {
          setBookmarked(!bookmarked)
          await sendAction("bookmark")
        }}
        className={`flex flex-col gap-1 h-auto py-2 ${bookmarked ? 'text-orange-600' : 'text-muted-foreground'}`}
      >
        <Bookmark className="h-6 w-6" />
        <span className="text-[10px] font-bold">{post.bookmarks ?? 0}</span>
      </Button>

      <Button 
        variant="ghost" 
        onClick={async () => {
          await sendAction("share")
          if (navigator.share) {
            await navigator.share({ title: post.title, url: `/post/${post.slug}` })
          }
        }}
        className="flex flex-col gap-1 h-auto py-2 text-muted-foreground"
      >
        <Share2 className="h-6 w-6" />
        <span className="text-[10px] font-bold">Share</span>
      </Button>
    </div>
  )
}
