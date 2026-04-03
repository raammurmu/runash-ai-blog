import Image from "next/image"
import Link from "next/link"
import type { BlogPost } from "@/lib/types"
import { formatPublishedDate } from "@/lib/utils"

interface BlogPostCardProps {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const coverImage = post.image || "/placeholder.svg"

  return (
    <article className="w-full space-y-4 rounded-3xl border border-border p-3 sm:space-y-5 sm:p-4">
      <Link href={`/post/${post.slug}`} className="block overflow-hidden rounded-2xl border border-border">
        <Image
          src={coverImage}
          alt={post.title}
          width={1200}
          height={675}
          className="aspect-video w-full object-cover"
        />
      </Link>

      <div className="space-y-3 px-1 pb-1 sm:space-y-4">
        <p className="text-sm text-muted-foreground">{formatPublishedDate(post.publishedAt)}</p>

        <Link href={`/post/${post.slug}`}>
          <h2 className="text-2xl font-semibold leading-snug tracking-tight text-foreground transition-colors hover:text-primary sm:text-3xl">
            {post.title}
          </h2>
        </Link>

        <p className="text-base leading-relaxed text-muted-foreground">{post.excerpt}</p>

        <p className="text-sm uppercase tracking-[0.14em] text-muted-foreground">{post.category}</p>
      </div>
    </article>
  )
}
