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
    <article className="space-y-4 sm:space-y-5 lg:space-y-6">
      {/* Developer note: card corner treatment was kept at 24px on mobile/tablet to match the reference feel without adding custom tokens. */}
      <Link href={`/post/${post.slug}`} className="block overflow-hidden rounded-[24px] sm:rounded-[24px] lg:rounded-3xl">
        <Image
          src={coverImage}
          alt={post.title}
          width={1200}
          height={720}
          className="h-48 w-full rounded-[24px] object-cover sm:h-60 sm:rounded-[24px] lg:h-72 lg:rounded-3xl"
        />
      </Link>

      <div className="space-y-3 px-0.5 sm:space-y-3.5 sm:px-1">
        <p className="text-xs font-medium text-muted-foreground/80 sm:text-sm">{formatPublishedDate(post.publishedAt)}</p>

        <Link href={`/post/${post.slug}`}>
          <h2 className="text-xl font-semibold leading-tight tracking-tight text-foreground transition-colors hover:text-primary sm:text-3xl lg:text-4xl">
            {post.title}
          </h2>
        </Link>

        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg">{post.excerpt}</p>

        <p className="pt-0.5 text-xs uppercase tracking-[0.16em] text-muted-foreground/90">{post.category}</p>
      </div>
    </article>
  )
}
