"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/types"
import { Copy, Share2 } from "lucide-react"
import { toast } from "sonner"
import { ShareButton } from "@/components/share-button"
import { SHARE_MESSAGES, copyTextToClipboard } from "@/lib/share"

interface PostHeroActionsProps {
  post: BlogPost
}

export function PostHeroActions({ post }: PostHeroActionsProps) {
  const [pageUrl, setPageUrl] = useState("")

  useEffect(() => {
    setPageUrl(window.location.href)
  }, [])

  const handleCopyPage = async () => {
    try {
      await copyTextToClipboard(pageUrl)
      toast.success(SHARE_MESSAGES.copySuccess)
    } catch {
      toast.error(SHARE_MESSAGES.copyError)
    }
  }

  return (
    <div className="not-prose flex items-center gap-1">
      <Button variant="ghost" size="sm" onClick={handleCopyPage} className="h-8 gap-1.5 px-2.5 text-xs text-muted-foreground">
        <Copy className="h-3.5 w-3.5" />
        Copy page
      </Button>
      <ShareButton
        url={pageUrl}
        title={post.title}
        description={post.excerpt}
        trigger={
          <Button variant="ghost" size="sm" className="h-8 gap-1.5 px-2.5 text-xs text-muted-foreground">
            <Share2 className="h-3.5 w-3.5" />
            Share
          </Button>
        }
      />
    </div>
  )
}
