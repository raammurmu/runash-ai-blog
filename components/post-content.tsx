"use client"

import { useEffect, useMemo, useState } from "react"
import type { BlogPost } from "@/lib/types"
import { Languages, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface PostContentProps {
  post: BlogPost
}

type ContentLanguage = "en" | "hi"

const normalizeArticleText = (html: string) =>
  html
    .replace(/<\/(p|h1|h2|h3|h4|h5|h6|li|blockquote|pre|figcaption|div|section|article)>/gi, "$&\n\n")
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()

export function PostContent({ post }: PostContentProps) {
  const [contentLanguage, setContentLanguage] = useState<ContentLanguage>("en")
  const [translatedContent, setTranslatedContent] = useState("")
  const [isTranslating, setIsTranslating] = useState(false)

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

  const plainArticleText = useMemo(() => normalizeArticleText(post.content), [post.content])

  useEffect(() => {
    if (contentLanguage !== "hi" || translatedContent || isTranslating) return

    const run = async () => {
      setIsTranslating(true)
      try {
        const response = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: plainArticleText, source: "en", target: "hi" }),
        })

        if (!response.ok) {
          throw new Error("translation failed")
        }

        const payload = (await response.json()) as { translatedText?: string }
        if (!payload.translatedText) {
          throw new Error("translation empty")
        }

        setTranslatedContent(payload.translatedText)
      } catch {
        toast.error("Could not translate article content")
        setContentLanguage("en")
      } finally {
        setIsTranslating(false)
      }
    }

    void run()
  }, [contentLanguage, isTranslating, plainArticleText, translatedContent])

  return (
    <article className="space-y-6">
      <div className="not-prose flex items-center justify-end gap-2">
        <label className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <Languages className="h-3.5 w-3.5" />
          Content language
        </label>
        <select
          value={contentLanguage}
          onChange={(event) => setContentLanguage(event.target.value as ContentLanguage)}
          aria-label="Select content language"
          className="h-8 rounded-md border border-border bg-background px-2 text-xs"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        {contentLanguage === "en" ? (
          <div dangerouslySetInnerHTML={{ __html: renderedContent }} />
        ) : isTranslating ? (
          <div className="not-prose inline-flex items-center gap-2 rounded-md border border-border/70 px-3 py-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Translating to Hindi...
          </div>
        ) : (
          <div className="whitespace-pre-wrap leading-8">{translatedContent}</div>
        )}
      </div>
    </article>
  )
}
