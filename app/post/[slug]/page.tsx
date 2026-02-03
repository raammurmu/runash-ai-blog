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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Clock, Calendar, ChevronLeft, ImageIcon } from "lucide-react"
import Link from "next/link"

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-orange-500/30">
      <ReadingProgress />
      <ScrollToTop />
      <Header />

      {/* Hero Section */}
      <section className={cn(
        "relative w-full py-20 md:py-32 flex flex-col items-center justify-center text-center px-6 overflow-hidden",
        post.gradient || "bg-gradient-to-br from-orange-500 via-orange-600 to-amber-500"
      )}>
        <div className="absolute inset-0 opacity-20">
          <img
            src={post.image ?? "/images/blog-cover-gradient.svg"}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 text-sm font-medium transition-colors">
            <ChevronLeft className="h-4 w-4" /> Back to Resources
          </Link>
          <span className="text-7xl md:text-9xl mb-8 block drop-shadow-2xl">{post.emoji}</span>
          <Badge className="mb-6 bg-white/20 text-white border-white/20 px-6 py-1.5 text-xs font-bold uppercase tracking-widest">
            {post.category}
          </Badge>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-tight mb-8">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-white">
            <Avatar className="h-10 w-10 ring-2 ring-white/20">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback className="bg-orange-400">{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <span className="font-bold">{post.author.name}</span>
            <span className="opacity-50">•</span>
            <span className="text-sm font-medium">{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Article Content Area */}
      <main className="container max-w-4xl mx-auto px-4 md:px-6 -mt-16 relative z-20">
        <div className="bg-card rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-16 shadow-2xl border border-border/50">
          <article className="prose prose-orange dark:prose-invert prose-lg md:prose-xl max-w-none">
            <div className="not-prose mb-10">
              <p className="text-xl md:text-2xl leading-relaxed text-orange-600 dark:text-orange-400 font-medium italic border-l-4 border-primary pl-6 py-2">
                {post.excerpt}
              </p>
            </div>
            <div className="not-prose mb-10 overflow-hidden rounded-3xl border border-orange-100/60 bg-orange-50/30">
              <div className="flex items-center gap-2 px-6 py-4 text-sm font-semibold text-orange-700">
                <ImageIcon className="h-4 w-4" />
                Cover image
              </div>
              <img
                src={post.image ?? "/images/blog-cover-gradient.svg"}
                alt={post.title}
                className="h-64 w-full object-cover"
              />
            </div>
            <PostContent post={post} />
          </article>

          <RelatedPosts currentPostId={post.id} category={post.category} />

          <section id="comments" className="mt-20 pt-16 border-t border-border">
            <h3 className="text-3xl font-black mb-10 tracking-tight">Discussion</h3>
            <Suspense fallback={<div className="h-40 w-full bg-muted animate-pulse rounded-3xl" />}>
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
