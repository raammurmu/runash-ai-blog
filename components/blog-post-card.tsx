import Link from "next/link"
import type { BlogPost } from "@/lib/types"

interface BlogPostCardProps {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="space-y-6">
      <Link href={`/post/${post.slug}`} className="block overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">
        <div
          className={`relative flex h-72 w-full items-center justify-center rounded-3xl ${post.gradient || "bg-gradient-to-br from-orange-400 to-amber-500"}`}
        >
          <span className="text-8xl drop-shadow-2xl" aria-hidden="true">
            {post.emoji}
          </span>
        </div>
      </Link>

      <div className="space-y-4 px-1">
        <p className="text-sm font-medium text-muted-foreground/80">
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <Link href={`/post/${post.slug}`}>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground transition-colors hover:text-primary sm:text-4xl">
            {post.title}
          </h2>
        </Link>

        <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>

        <p className="text-sm uppercase tracking-[0.14em] text-muted-foreground/90">{post.category}</p>
      </div>
    </article>
  )
}
