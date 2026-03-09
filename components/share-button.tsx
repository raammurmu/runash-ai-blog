"use client"

import { useEffect, useState, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Share2, Twitter, Facebook, Linkedin, Copy } from "lucide-react"
import { toast } from "sonner"
import { SHARE_MESSAGES, copyTextToClipboard, createShareLinks, openSharePopup, shareWithNative } from "@/lib/share"

interface ShareButtonProps {
  url: string
  title: string
  description?: string
  trigger?: ReactNode
}

export function ShareButton({ url, title, description, trigger }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [canNativeShare, setCanNativeShare] = useState(false)

  useEffect(() => {
    setCanNativeShare(Boolean(navigator.share))
  }, [])

  const shareLinks = createShareLinks({ title, url, description })

  const handleCopyLink = async () => {
    try {
      await copyTextToClipboard(url)
      toast.success(SHARE_MESSAGES.copySuccess)
      setIsOpen(false)
    } catch {
      toast.error(SHARE_MESSAGES.copyError)
    }
  }

  const handleNativeShare = async () => {
    try {
      const shared = await shareWithNative({ title, text: description, url })
      if (!shared) {
        openSharePopup(shareLinks.twitter)
      }
      setIsOpen(false)
    } catch {
      toast.error(SHARE_MESSAGES.shareError)
    }
  }

  const handleShare = (platform: keyof typeof shareLinks) => {
    openSharePopup(shareLinks[platform])
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        {trigger ?? (
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {canNativeShare && (
          <DropdownMenuItem onClick={handleNativeShare} className="cursor-pointer">
            <Share2 className="h-4 w-4 mr-2" />
            Share...
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => handleShare("twitter")} className="cursor-pointer">
          <Twitter className="h-4 w-4 mr-2 text-blue-400" />
          Share on Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("facebook")} className="cursor-pointer">
          <Facebook className="h-4 w-4 mr-2 text-blue-600" />
          Share on Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("linkedin")} className="cursor-pointer">
          <Linkedin className="h-4 w-4 mr-2 text-blue-700" />
          Share on LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
          <Copy className="h-4 w-4 mr-2" />
          Copy Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
