"use client"

import { Button } from "@/components/ui/button"
import { ArrowUp, MessageCircle, Share2, Heart } from "lucide-react"
import { useState } from "react"

export function MobilePostActions({ post }: { post: any }) {
  const [upvoted, setUpvoted] = useState(false)

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-orange-100 md:hidden flex justify-around items-center z-40 pb-safe">
      <Button 
        variant="ghost" 
        onClick={() => setUpvoted(!upvoted)}
        className={`flex flex-col gap-1 h-auto py-2 ${upvoted ? 'text-orange-600' : 'text-muted-foreground'}`}
      >
        <ArrowUp className={`h-6 w-6 ${upvoted ? 'animate-bounce' : ''}`} />
        <span className="text-[10px] font-bold">{post.upvotes + (upvoted ? 1 : 0)}</span>
      </Button>
      
      <Button variant="ghost" className="flex flex-col gap-1 h-auto py-2 text-muted-foreground">
        <MessageCircle className="h-6 w-6" />
        <span className="text-[10px] font-bold">{post.comments}</span>
      </Button>

      <Button variant="ghost" className="flex flex-col gap-1 h-auto py-2 text-muted-foreground">
        <Share2 className="h-6 w-6" />
        <span className="text-[10px] font-bold">Share</span>
      </Button>
    </div>
  )
}
