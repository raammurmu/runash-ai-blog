"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface PostCoverProps {
  title: string
  category: string
  image?: string
  gradient?: string
  emoji?: string
  className?: string
}

export function PostCover({ title, category, image, gradient, emoji, className }: PostCoverProps) {
  return (
    <div
      className={cn(
        "relative flex h-56 w-full items-center justify-center overflow-hidden rounded-3xl text-white shadow-lg",
        gradient ?? "bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400",
        className,
      )}
    >
      {image && (
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
      )}
      <div className="absolute inset-0 bg-black/25" />
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
        {emoji && <span className="mb-4 text-4xl drop-shadow-md">{emoji}</span>}
        <Badge className="mb-3 border-none bg-white/20 text-white">{category}</Badge>
        <h3 className="text-xl font-semibold leading-snug drop-shadow-md line-clamp-2">
          {title}
        </h3>
      </div>
    </div>
  )
}
