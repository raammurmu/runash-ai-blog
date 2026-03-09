"use client"

import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react"
import { useMemo, useState } from "react"
import type { BlogPost } from "@/lib/types"

interface PostContentProps {
  post: BlogPost
}

export function PostContent({ post }: PostContentProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const renderedContent = useMemo(() => {
    return post.content
      .replace(/<h2(?![^>]*class=)([^>]*)>/g, '<h2 class="post-h2"$1>')
      .replace(/<h3(?![^>]*class=)([^>]*)>/g, '<h3 class="post-h3"$1>')
      .replace(/<p(?![^>]*class=)([^>]*)>/g, '<p class="post-p"$1>')
      .replace(/<ul(?![^>]*class=)([^>]*)>/g, '<ul class="post-list"$1>')
      .replace(/<pre(?![^>]*class=)([^>]*)>/g, '<pre class="post-pre"$1>')
      .replace(/<blockquote(?![^>]*class=)([^>]*)>/g, '<blockquote class="post-callout"$1>')
      .replace(/<figure(?![^>]*class=)([^>]*)>/g, '<figure class="post-media"$1>')
      .replace(/<figcaption(?![^>]*class=)([^>]*)>/g, '<figcaption class="post-caption"$1>')
      .replace(/<img(?![^>]*class=)([^>]*)>/g, '<img class="post-media-image"$1>')
      .replace(/<(video|iframe)(?![^>]*class=)([^>]*)>/g, '<$1 class="post-embed"$2>')
      .replace(/<div class="post-video">/g, '<div class="post-media post-video">')
  }, [post.content])

  return (
    <article className="space-y-10">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: renderedContent }} />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between border-y border-border/80 py-6">
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
