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
    <article className="space-y-1.5 sm:space-y-2 lg:space-y-2.5">
      <Link href={`/post/${post.slug}`} className="block overflow-hidden rounded-xl">
        <Image
          src={coverImage}
          alt={post.title}
          width={1200}
          height={720}
          className="h-40 w-full rounded-xl object-cover sm:h-52 lg:h-56"
        />
      </Link>

      <div className="space-y-1.5 px-0.5 sm:space-y-2 sm:px-1">
        <p className="text-[11px] font-medium leading-tight text-muted-foreground/80 sm:text-xs">{formatPublishedDate(post.publishedAt)}</p>

        <Link href={`/post/${post.slug}`}>
          <h2 className="text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors hover:text-primary sm:text-[1.125rem] lg:text-[1.25rem]">
            {post.title}
          </h2>
        </Link>

        <p className="max-w-[62ch] text-sm leading-relaxed text-muted-foreground/95 sm:text-[15px]">
          {post.excerpt}
        </p>

        <p className="pt-0.5 text-[11px] uppercase leading-tight tracking-[0.12em] text-muted-foreground/90 sm:text-xs">
          {post.category}
        </p>
      </div>
    </article>
  )
}
