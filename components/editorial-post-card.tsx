import Image from "next/image"
import Link from "next/link"
import type { BlogPost } from "@/lib/types"
import { formatPublishedDate } from "@/lib/utils"

interface EditorialPostCardProps {
  post: BlogPost
}

export function EditorialPostCard({ post }: EditorialPostCardProps) {
  const coverImage = post.image || "/images/blog-cover-gradient.svg"

  return (
    <article className="space-y-2 sm:space-y-2.5 lg:space-y-3">
      <Link href={`/post/${post.slug}`} className="block overflow-hidden rounded-lg sm:rounded-xl">
        <Image
          src={coverImage}
          alt={post.title}
          width={1200}
          height={720}
          className="h-40 w-full rounded-lg object-cover sm:h-52 sm:rounded-xl lg:h-56"
        />
      </Link>

      <div className="space-y-1 px-0.5 sm:space-y-1.5 sm:px-1">
        <p className="text-xs font-medium text-muted-foreground/80">{formatPublishedDate(post.publishedAt)}</p>

        <Link href={`/post/${post.slug}`}>
          <h2 className="text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors hover:text-primary sm:text-xl lg:text-2xl">
            {post.title}
          </h2>
        </Link>

        <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        <p className="pt-1 text-xs uppercase tracking-wide text-muted-foreground/90">
          {post.category}
        </p>
      </div>
    </article>
  )
}
