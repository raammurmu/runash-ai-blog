"use client"

import { useMemo, useState } from "react"
import { getCommentsByPostId, addComment } from "@/lib/blog-data"
import type { Comment } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { MessageCircle, Send } from "lucide-react"

export function PostComments({ postId }: { postId: string }) {
  const initial = useMemo(() => getCommentsByPostId(postId), [postId])
  const [comments, setComments] = useState<Comment[]>(initial)
  const [content, setContent] = useState("")
  const submitting = false

  const handleSubmit = async () => {
    const text = content.trim()
    if (!text) return
    const newComment = addComment(
      postId,
      {
        name: "Guest Reader",
        username: "guest",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      text,
    )
    setComments((prev) => [newComment, ...prev])
    setContent("")
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
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
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
              <Button
                onClick={handleSubmit}
                size="sm"
                className="shadow-sm"
                disabled={submitting || content.trim().length === 0}
              >
                <Send className="mr-2 h-4 w-4" />
                Post comment
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

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
        {comments.length === 0 && <div className="text-sm text-muted-foreground">Be the first to comment.</div>}
      </div>
    </section>
  )
}
