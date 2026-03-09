"use client"

import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/types"
import { Copy } from "lucide-react"
import { toast } from "sonner"

interface PostHeroActionsProps {
  post: BlogPost
}

export function PostHeroActions({ post }: PostHeroActionsProps) {
  void post
  const handleCopyPage = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success("Page link copied")
    } catch {
      toast.error("Could not copy page link")
    }
  }

  return (
    <div className="not-prose">
      <Button variant="ghost" size="sm" onClick={handleCopyPage} className="h-8 gap-1.5 px-2.5 text-xs text-muted-foreground">
        <Copy className="h-3.5 w-3.5" />
        Copy page
      </Button>
    </div>
  )
}
