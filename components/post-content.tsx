"use client"

import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react"
import { useState } from "react"
import type { BlogPost } from "@/lib/types"

interface PostContentProps {
  post: BlogPost
}

export function PostContent({ post }: PostContentProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  return (
    <article className="space-y-10">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between py-6 border-t border-b">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => setIsLiked(!isLiked)} className={isLiked ? "text-red-500" : ""}>
            <Heart className={`h-5 w-5 mr-2 ${isLiked ? "fill-current" : ""}`} />
            {post.likes} Likes
          </Button>

          <Button variant="ghost">
            <MessageCircle className="h-5 w-5 mr-2" />
            {post.comments} Comments
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={isBookmarked ? "text-orange-500" : ""}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
          </Button>
        </div>
      </div>
    </article>
  )
}
