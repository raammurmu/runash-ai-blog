export type SharePlatform = "twitter" | "facebook" | "linkedin"

interface ShareOptions {
  title: string
  url: string
  description?: string
}

interface NativeShareOptions extends ShareOptions {
  text?: string
}

export const SHARE_MESSAGES = {
  copySuccess: "Link copied to clipboard!",
  copyError: "Failed to copy link",
  shareError: "Failed to share this page",
} as const

export function createShareLinks({ title, url, description }: ShareOptions): Record<SharePlatform, string> {
  return {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description || "")}`,
  }
}

export async function copyTextToClipboard(text: string) {
  await navigator.clipboard.writeText(text)
}

export async function shareWithNative({ title, text, url }: NativeShareOptions): Promise<boolean> {
  if (!navigator.share) {
    return false
  }

  try {
    await navigator.share({
      title,
      text,
      url,
    })
    return true
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return true
    }
    throw error
  }
}

export function openSharePopup(shareUrl: string) {
  window.open(shareUrl, "_blank", "width=600,height=400")
}
