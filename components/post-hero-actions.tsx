"use client"

import { useState } from "react"
import { ArrowUp, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/types"

interface PostHeroActionsProps {
  post: BlogPost
}

export function PostHeroActions({ post }: PostHeroActionsProps) {
  const [isUpvoted, setIsUpvoted] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <div className="not-prose mt-6 flex flex-wrap items-center gap-3">
      <Button
        variant={isUpvoted ? "default" : "outline"}
        size="sm"
        onClick={() => setIsUpvoted(!isUpvoted)}
        className="gap-2"
      >
        <ArrowUp className={`h-4 w-4 ${isUpvoted ? "animate-bounce" : ""}`} />
        {post.upvotes + (isUpvoted ? 1 : 0)}
      </Button>

      <Button
        variant={isFollowing ? "default" : "outline"}
        size="sm"
        onClick={() => setIsFollowing(!isFollowing)}
        className="gap-2"
      >
        <UserPlus className="h-4 w-4" />
        {isFollowing ? "Following" : "Follow"}
      </Button>
    </div>
  )
}
