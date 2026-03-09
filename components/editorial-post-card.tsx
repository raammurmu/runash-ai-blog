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
    <article className="space-y-6">
      <Link href={`/post/${post.slug}`} className="block overflow-hidden rounded-3xl">
        <Image
          src={coverImage}
          alt={post.title}
          width={1200}
          height={720}
          className="h-72 w-full rounded-3xl object-cover"
        />
      </Link>

      <div className="space-y-4 px-1">
        <p className="text-sm font-medium text-muted-foreground/80">{formatPublishedDate(post.publishedAt)}</p>

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
