import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getBlogPost, getRelatedPosts } from "@/lib/blog-data"
import { PostContent } from "@/components/post-content"
import { PostComments } from "@/components/post-comments"
import { BlogHeaderMinimal } from "@/components/blog-header-minimal"
import { ReadingProgress } from "@/components/reading-progress"
import { ScrollToTop } from "@/components/scroll-to-top"
import { PostHeroActions } from "@/components/post-hero-actions"
import { ReadAloud } from "@/components/read-aloud"
import { RelatedPosts } from "@/components/related-posts"
import { Calendar, ChevronLeft } from "lucide-react"
import Link from "next/link"

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) notFound()

  const hasRelatedPosts = getRelatedPosts(post.id, post.category).length > 0

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-orange-500/30">
      <ReadingProgress />
      <BlogHeaderMinimal />

      <main className="mx-auto w-full max-w-4xl px-4 pb-20 pt-10 md:px-6 md:pt-14">
        <div className="mx-auto w-full max-w-[820px]">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Resources
          </Link>

          <header className="mb-10 border-b border-border/70 pb-8">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-wide text-muted-foreground md:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {post.publishedAt}
                </span>
                <span className="text-border">•</span>
                <span>{post.category}</span>
              </div>

              <PostHeroActions post={post} />
            </div>

            <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">{post.title}</h1>
            <p className="mt-4 max-w-3xl text-pretty text-base leading-8 text-muted-foreground md:text-lg">
              {post.excerpt}
            </p>
            <p className="mt-5 text-sm text-muted-foreground">By {post.author.name}</p>

            <ReadAloud text={`${post.title}. ${post.excerpt}. ${post.content}`} />
          </header>

          <div className="mb-12 w-full overflow-hidden rounded-2xl border border-border/70 bg-muted/20">
            <img src={post.image ?? "/images/blog-cover-gradient.svg"} alt={post.title} className="h-64 w-full object-cover md:h-80" />
          </div>

          <article className="prose prose-neutral dark:prose-invert mx-auto max-w-none text-[17px] leading-[1.9] md:text-lg">
            <PostContent post={post} />
          </article>

          {hasRelatedPosts ? (
            <div className="mt-16 border-t border-border/80 pt-10">
              <RelatedPosts currentPostId={post.id} category={post.category} />
            </div>
          ) : null}

          <section id="comments" className="mt-14 border-t border-border/80 pt-10">
            <h3 className="mb-8 text-2xl font-semibold tracking-tight text-foreground/90 md:text-3xl">Discussion</h3>
            <Suspense fallback={<div className="h-40 w-full animate-pulse rounded-xl bg-muted" />}>
              <PostComments postId={post.id} />
            </Suspense>
          </section>
        </div>
      </main>

      <ScrollToTop />
      <div className="h-12 md:hidden" />
    </div>
  )
}

