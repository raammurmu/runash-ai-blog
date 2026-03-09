import Link from "next/link"
import { blogPosts } from "@/lib/blog-data"

export function BlogFeed() {
  const posts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )

  return (
    <section className="w-full max-w-[760px] space-y-8">
      <header className="space-y-3 border-b border-border/60 pb-6">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">RunAsh Journal</p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Insights and product notes</h1>
        <p className="max-w-[68ch] text-sm leading-relaxed text-muted-foreground">
          Practical updates on AI workflows, product design, and shipping with modern LLM tools.
        </p>
      </header>

      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="space-y-3 border-b border-border/60 pb-6 last:border-b-0">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{post.category}</span>
              <span aria-hidden="true">•</span>
              <span>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <Link href={`/post/${post.slug}`} className="group block">
              <h2 className="text-2xl font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
                {post.title}
              </h2>
            </Link>

            <p className="text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
