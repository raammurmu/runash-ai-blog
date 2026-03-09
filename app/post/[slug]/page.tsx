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
import { PostHeroActions } from "@/components/post-hero-actions"
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
        <div className="mx-auto w-full max-w-3xl">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Resources
          </Link>

          <div className="mb-5 flex flex-wrap items-center justify-center gap-3 text-xs font-medium uppercase tracking-wide text-muted-foreground md:text-sm">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {post.publishedAt}
            </span>
            <span className="text-border">•</span>
            <Badge variant="outline" className="px-2.5 py-0.5 text-[11px] md:text-xs">
              {post.category}
            </Badge>
          </div>

          <header className="mb-10 text-center">
            <h1 className="text-balance text-3xl font-bold tracking-tight md:text-5xl">{post.title}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              {post.excerpt}
            </p>
          </header>

          <div className="mb-10 overflow-hidden rounded-2xl border border-border/70 bg-muted/20">
            <img
              src={post.image ?? "/images/blog-cover-gradient.svg"}
              alt={post.title}
              className="h-64 w-full object-cover md:h-80"
            />
          </div>

          <div className="mb-10 border-b border-border pb-6">
            <p className="mb-3 text-sm font-medium text-muted-foreground">Support this post</p>
            <PostHeroActions post={post} />
          </div>

          <article className="prose prose-neutral dark:prose-invert max-w-none text-[17px] leading-8 md:text-lg">
            <PostContent post={post} />
          </article>

          <div className="mt-16 border-t border-border pt-10">
            <RelatedPosts currentPostId={post.id} category={post.category} />
          </div>

          <section id="comments" className="mt-14 border-t border-border pt-10">
            <h3 className="mb-8 text-2xl font-semibold tracking-tight md:text-3xl">Discussion</h3>
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
