import { Card, CardContent } from "@/components/ui/card"
import type { BlogPost } from "@/lib/types"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface BlogCardProps {
  post: BlogPost
  viewMode?: "grid" | "list"
}

export function BlogCard({ post, viewMode = "grid" }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  const Thumbnail = () => (
    <div
      className={cn(
        "relative flex items-center justify-center bg-muted/40",
        post.gradient,
        viewMode === "list" ? "w-full md:w-60 h-44 md:h-auto" : "h-48"
      )}
    >
      <span className="text-5xl drop-shadow-sm">{post.emoji}</span>
    </div>
  )

  return (
    <Card
      className={cn(
        "group overflow-hidden border-border bg-card shadow-sm transition-colors hover:border-muted-foreground/30",
        viewMode === "list" ? "flex flex-col md:flex-row" : "flex flex-col"
      )}
    >
      <Link href={`/post/${post.slug}`} className={viewMode === "list" ? "contents" : "block"}>
        <Thumbnail />
      </Link>

      <CardContent className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="mb-2 text-xs text-muted-foreground">{formattedDate}</p>
        <Link href={`/post/${post.slug}`} className="group/title mb-2">
          <h3 className="text-lg font-semibold leading-snug text-foreground transition-colors group-hover/title:text-foreground/80 line-clamp-2">
            {post.title}
          </h3>
        </Link>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {post.excerpt}
        </p>
        <p className="mt-auto text-xs font-medium uppercase tracking-wide text-muted-foreground/90">
          {post.category}
          {post.tags?.[0] ? ` · #${post.tags[0]}` : ""}
        </p>
      </CardContent>
    </Card>
  )
}
