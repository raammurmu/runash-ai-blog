"use client"

import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/types"
import { Copy, FileText } from "lucide-react"
import { toast } from "sonner"

interface PostHeroActionsProps {
  post: BlogPost
}

export function PostHeroActions({ post }: PostHeroActionsProps) {
  const handleCopyPage = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success("Page link copied")
    } catch {
      toast.error("Could not copy page link")
    }
  }

  const handleCopyMarkdown = async () => {
    const markdown = `# ${post.title}\n\n${post.excerpt}\n\nRead more: ${window.location.href}`

    try {
      await navigator.clipboard.writeText(markdown)
      toast.success("Markdown copied")
    } catch {
      toast.error("Could not copy markdown")
    }
  }

  return (
    <div className="not-prose flex flex-wrap items-center justify-end gap-2">
      <Button variant="ghost" size="sm" onClick={handleCopyPage} className="h-8 gap-1.5 px-2.5 text-xs text-muted-foreground">
        <Copy className="h-3.5 w-3.5" />
        Copy page
      </Button>
      <Button variant="ghost" size="sm" onClick={handleCopyMarkdown} className="h-8 gap-1.5 px-2.5 text-xs text-muted-foreground">
        <FileText className="h-3.5 w-3.5" />
        Copy markdown
      </Button>
    </div>
  )
}
