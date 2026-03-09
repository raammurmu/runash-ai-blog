import Link from "next/link"
import { getAllPosts, formatPostDate } from "@/lib/blog-data"

export function BlogFeed() {
  const posts = getAllPosts()

  return (
    <section className="mx-auto w-full max-w-3xl space-y-10 lg:ml-8 lg:mr-auto xl:ml-12">
      {posts.map((post) => (
        <article key={post.id} className="space-y-5 border-b border-border/60 pb-10 last:border-b-0 last:pb-0">
          <Link href={`/post/${post.slug}`} className="block overflow-hidden rounded-2xl">
            <div
              className={`relative flex h-64 items-center justify-center rounded-2xl ${post.gradient || "bg-gradient-to-br from-orange-400 to-amber-500"}`}
            >
              <span className="text-7xl drop-shadow-xl" aria-hidden="true">
                {post.emoji}
              </span>
            </div>
          </Link>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">{formatPostDate(post.publishedAt)}</p>

            <Link href={`/post/${post.slug}`}>
              <h2 className="text-2xl font-semibold leading-tight text-foreground transition-colors hover:text-primary sm:text-3xl">
                {post.title}
              </h2>
            </Link>

            <p className="text-base leading-relaxed text-muted-foreground">{post.excerpt}</p>

            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground/90">{post.category}</p>
          </div>
        </article>
      ))}
    </section>
  )
}
