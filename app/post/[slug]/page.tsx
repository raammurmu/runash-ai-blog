import { Suspense } from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { getBlogPost } from "@/lib/blog-data"
import { getMarkdownPostBySlug } from "@/lib/markdown-posts"
import { PostContent } from "@/components/post-content"
import { PostComments } from "@/components/post-comments"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ReadingProgress } from "@/components/reading-progress"
import { ScrollToTop } from "@/components/scroll-to-top"
import { MobilePostActions } from "@/components/mobile-post-actions"
import { RelatedPosts } from "@/components/related-posts"
import { ReadAloud } from "@/components/read-aloud"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronLeft, Clock, Headphones, MessageSquareText } from "lucide-react"

function stripHtml(input: string) {
  return input.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
}

async function loadPost(slug: string) {
  const dataPost = await getBlogPost(slug)
  if (dataPost) return dataPost
  return getMarkdownPostBySlug(slug)
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await loadPost(slug)
  if (!post) return { title: "Post not found | RunAsh Blog" }

  return {
    title: `${post.title} | RunAsh Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: post.image ? [post.image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await loadPost(slug)
  if (!post) notFound()

  const speakText = `${post.title}. ${post.excerpt}. ${stripHtml(post.content)}`

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-orange-500/20">
      <ReadingProgress />
      <ScrollToTop />
      <Header />

      <section className="relative overflow-hidden border-b border-orange-100/70 dark:border-orange-900/40">
        <div className={`absolute inset-0 ${post.gradient ?? "bg-gradient-to-br from-orange-500 via-orange-600 to-amber-500"}`} />
        <div className="absolute inset-0 bg-black/30" />
        {post.image && <img src={post.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />}

        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm transition hover:bg-white/20">
            <ChevronLeft className="h-4 w-4" /> Back to blog
          </Link>

          <div className="max-w-3xl">
            <Badge className="mb-4 rounded-full border border-white/30 bg-white/15 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              {post.category}
            </Badge>
            <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">{post.title}</h1>
            <p className="mt-5 text-base text-white/90 sm:text-lg">{post.excerpt}</p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-white/90">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-3 py-2 backdrop-blur-sm">
              <Avatar className="h-9 w-9">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold leading-none">{post.author.name}</p>
                <p className="text-xs text-white/70">@{post.author.username}</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-sm"><Calendar className="h-4 w-4" /> {new Date(post.publishedAt).toLocaleDateString()}</span>
            <span className="inline-flex items-center gap-1 text-sm"><Clock className="h-4 w-4" /> {post.readTime}</span>
            <span className="inline-flex items-center gap-1 text-sm"><MessageSquareText className="h-4 w-4" /> {post.comments} comments</span>
          </div>
        </div>
      </section>

      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_280px] lg:px-8">
        <article className="rounded-3xl border border-orange-100/70 bg-card p-6 shadow-sm dark:border-orange-900/40 md:p-10">
          <div className="mb-6 flex items-center justify-between gap-3 rounded-2xl border border-orange-100/70 bg-orange-50/50 p-3 dark:border-orange-900/40 dark:bg-orange-950/20">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-orange-700 dark:text-orange-300">
              <Headphones className="h-4 w-4" /> Listen to this article
            </p>
            <ReadAloud text={speakText} />
          </div>

          <div className="prose prose-orange max-w-none dark:prose-invert">
            <PostContent post={post} />
          </div>

          <RelatedPosts currentPostId={post.id} category={post.category} />

          <section id="comments" className="mt-14 border-t border-border pt-10">
            <h3 className="mb-6 text-2xl font-bold tracking-tight">Discussion</h3>
            <Suspense fallback={<div className="h-40 w-full animate-pulse rounded-2xl bg-muted" />}>
              <PostComments postId={post.id} />
            </Suspense>
          </section>
        </article>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-2xl border border-orange-100/70 bg-orange-50/60 p-4 dark:border-orange-900/40 dark:bg-orange-950/20">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700 dark:text-orange-300">On this post</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• Category: {post.category}</li>
              <li>• Tags: {post.tags.slice(0, 3).join(", ") || "General"}</li>
              <li>• Reactions: {post.likes + post.upvotes}</li>
            </ul>
          </div>
          <div className="rounded-2xl border p-4">
            <p className="text-sm font-semibold">Want more posts like this?</p>
            <p className="mt-1 text-sm text-muted-foreground">Explore the full feed or publish your own article.</p>
            <div className="mt-4 flex gap-2">
              <Button asChild size="sm" className="bg-orange-600 hover:bg-orange-700"><Link href="/blog">Explore</Link></Button>
              <Button asChild size="sm" variant="outline"><Link href="/create">Write</Link></Button>
            </div>
          </div>
        </aside>
      </main>

      <MobilePostActions post={post} />
      <Footer />
      <div className="h-20 md:hidden" />
    </div>
  )
}
