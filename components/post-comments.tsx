"use client"

import { useEffect, useState } from "react"
import type { ApiComment, CommentCreateRequest, CommentsResponse } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { MessageCircle, Send } from "lucide-react"

const currentAuthor = {
  name: "Guest Reader",
  username: "guest",
  avatar: "/placeholder.svg?height=32&width=32",
}

export function PostComments({ postId }: { postId: string }) {
  const [comments, setComments] = useState<ApiComment[]>([])
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/comments?postId=${encodeURIComponent(postId)}`, { cache: "no-store" })
        if (!res.ok) {
          throw new Error("Failed to fetch comments")
        }
        const data: CommentsResponse = await res.json()
        if (!cancelled) setComments(data)
      } catch {
        if (!cancelled) setComments([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [postId])

  const handleSubmit = async () => {
    const text = content.trim()
    if (!text || submitting) return

    setSubmitting(true)
    try {
      const payload: CommentCreateRequest = {
        postId,
        content: text,
        author: currentAuthor,
      }

      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error("Failed to post comment")
      }

      const newComment: ApiComment = await res.json()
      setComments((prev) => [newComment, ...prev])
      setContent("")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center gap-2">
        <MessageCircle className="h-4 w-4" />
        <h3 className="text-lg font-semibold">Comments</h3>
      </div>

      <div className="rounded-md border p-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={currentAuthor.avatar} />
            <AvatarFallback>G</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts..."
              className="min-h-[80px]"
            />
            <div className="mt-2 flex justify-end">
              <Button onClick={handleSubmit} size="sm" className="shadow-sm" disabled={submitting || content.trim().length === 0}>
                <Send className="mr-2 h-4 w-4" />
                {submitting ? "Posting..." : "Post comment"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {loading ? <div className="text-sm text-muted-foreground">Loading comments…</div> : null}

      <div className="space-y-4">
        {comments.map((c) => (
          <div key={c.id} className="rounded-md border p-3">
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={c.author.avatar || "/placeholder.svg"} />
                <AvatarFallback>{c.author.name?.[0] ?? "U"}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{c.author.name}</span>
                  <span className="text-xs text-muted-foreground">@{c.author.username}</span>
                  <span className="text-xs text-muted-foreground">• {new Date(c.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="mt-2 text-sm leading-6">{c.content}</p>
              </div>
            </div>
          </div>
        ))}
        {!loading && comments.length === 0 && <div className="text-sm text-muted-foreground">Be the first to comment.</div>}
      </div>
    </section>
  )
}
