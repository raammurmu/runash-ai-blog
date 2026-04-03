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
      <Link href={`/post/${post.slug}`} className="block overflow-hidden rounded-2xl sm:rounded-3xl">
        <Image
          src={coverImage}
          alt={post.title}
          width={1200}
          height={720}
          className="h-48 w-full rounded-2xl object-cover sm:h-64 sm:rounded-3xl lg:h-72"
        />
      </Link>

      <div className="space-y-3 px-0.5 sm:space-y-4 sm:px-1">
        <p className="text-sm font-medium text-muted-foreground/80">{formatPublishedDate(post.publishedAt)}</p>

        <Link href={`/post/${post.slug}`}>
          <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground transition-colors hover:text-primary sm:text-3xl lg:text-4xl">
            {post.title}
          </h2>
        </Link>

        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">{post.excerpt}</p>

        <p className="pt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground/90">{post.category}</p>
      </div>
    </article>
  )
}
