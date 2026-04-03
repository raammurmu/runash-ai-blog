"use client"

import { useMemo } from "react"
import type { BlogPost } from "@/lib/types"

interface PostContentProps {
  post: BlogPost
}

export function PostContent({ post }: PostContentProps) {
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
    <article className="space-y-8">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: renderedContent }} />
      </div>
    </article>
  )
}
