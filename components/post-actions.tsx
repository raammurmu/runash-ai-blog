"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ArrowUp, Bookmark, Heart, Share2, UserPlus, PencilLine } from "lucide-react"
import type { BlogPost } from "@/lib/types"

interface PostActionsProps {
  post: BlogPost
}

export function PostActions({ post }: PostActionsProps) {
  const [likes, setLikes] = useState(post.likes)
  const [upvotes, setUpvotes] = useState(post.upvotes)
  const [bookmarks, setBookmarks] = useState(post.bookmarks ?? 0)
  const [shares, setShares] = useState(post.shares ?? 0)
  const [shareUrl, setShareUrl] = useState("")

  useEffect(() => {
    setShareUrl(`${window.location.origin}/post/${post.slug}`)
  }, [post.slug])

  const updateAction = async (action: string, delta = 1) => {
    const response = await fetch(`/api/posts/${post.slug}/actions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, delta, username: post.author.username }),
    })
    if (!response.ok) return null
    return response.json()
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        variant="outline"
        onClick={async () => {
          setLikes((value) => value + 1)
          await updateAction("like")
        }}
      >
        <Heart className="mr-2 h-4 w-4" /> {likes}
      </Button>
      <Button
        variant="outline"
        onClick={async () => {
          setUpvotes((value) => value + 1)
          await updateAction("upvote")
        }}
      >
        <ArrowUp className="mr-2 h-4 w-4" /> {upvotes}
      </Button>
      <Button
        variant="outline"
        onClick={async () => {
          setBookmarks((value) => value + 1)
          await updateAction("bookmark")
        }}
      >
        <Bookmark className="mr-2 h-4 w-4" /> {bookmarks}
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share this post</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input readOnly value={shareUrl} />
            <Button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(shareUrl)
                  setShares((value) => value + 1)
                  await updateAction("share")
                } catch {
                  setShares((value) => value + 1)
                  await updateAction("share")
                }
              }}
            >
              Copy link
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <PencilLine className="mr-2 h-4 w-4" /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit this post</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Use the editor to update content. Editing is only available to authenticated authors.
          </p>
          <Button asChild className="mt-4">
            <Link href="/create">Open editor</Link>
          </Button>
        </DialogContent>
      </Dialog>

      <Button
        variant="outline"
        onClick={async () => {
          await updateAction("follow")
        }}
      >
        <UserPlus className="mr-2 h-4 w-4" /> Follow
      </Button>
    </div>
  )
}
