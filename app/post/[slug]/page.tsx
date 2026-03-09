import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getBlogPost } from "@/lib/blog-data"
import { PostContent } from "@/components/post-content"
import { PostComments } from "@/components/post-comments"
import { Header } from "@/components/header"
import { ReadingProgress } from "@/components/reading-progress"
import { ScrollToTop } from "@/components/scroll-to-top"
import { MobilePostActions } from "@/components/mobile-post-actions"
import { RelatedPosts } from "@/components/related-posts"
import { Badge } from "@/components/ui/badge"
import { Calendar, ChevronLeft } from "lucide-react"
import Link from "next/link"

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-orange-500/30">
      <ReadingProgress />
      <ScrollToTop />
      <Header />

      <main className="mx-auto w-full max-w-5xl px-4 pb-20 pt-10 md:px-6 md:pt-14">
        <div className="mx-auto w-full max-w-4xl">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Resources
          </Link>

          <header className="mb-10 rounded-2xl border border-border/70 bg-card px-6 py-8 text-center md:px-10 md:py-10">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-3 text-xs font-medium uppercase tracking-wide text-muted-foreground md:text-sm">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {post.publishedAt}
              </span>
              <span className="text-border">•</span>
              <Badge variant="outline" className="px-2.5 py-0.5 text-[11px] md:text-xs">
                {post.category}
              </Badge>
            </div>

            <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">{post.title}</h1>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-8 text-muted-foreground md:text-lg">
              {post.excerpt}
            </p>
            <p className="mt-5 text-sm font-medium text-muted-foreground">By {post.author.name}</p>
          </header>

          <div className="mx-auto mb-12 w-full max-w-3xl overflow-hidden rounded-2xl border border-border/70 bg-muted/20">
            <img
              src={post.image ?? "/images/blog-cover-gradient.svg"}
              alt={post.title}
              className="h-64 w-full object-cover md:h-80"
            />
          </div>

          <article className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl text-[17px] leading-[1.9] md:text-lg">
            <PostContent post={post} />
          </article>

          <div className="mx-auto mt-16 max-w-3xl border-t border-border/80 pt-10">
            <RelatedPosts currentPostId={post.id} category={post.category} />
          </div>

          <section id="comments" className="mx-auto mt-14 max-w-3xl border-t border-border/80 pt-10">
            <h3 className="mb-8 text-2xl font-semibold tracking-tight text-foreground/90 md:text-3xl">Discussion</h3>
            <Suspense fallback={<div className="h-40 w-full animate-pulse rounded-xl bg-muted" />}>
              <PostComments postId={post.id} />
            </Suspense>
          </section>
        </div>
      </main>

      <MobilePostActions post={post} />
      <div className="h-24 md:hidden" />
    </div>
  )
}
