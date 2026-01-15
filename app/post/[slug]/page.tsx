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
import { Clock, Calendar, ChevronLeft } from "lucide-react"
import Link from "next/link"

interface PostPageProps {
  params: {
    slug: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background selection:bg-orange-100 selection:text-orange-900">
      {/* 1. Interactive Overlays */}
      <ReadingProgress />
      <ScrollToTop />
      
      <Header />

      {/* 2. Visual Hero Section */}
      <section className={cn(
        "relative w-full py-20 md:py-32 flex flex-col items-center justify-center text-center px-6 overflow-hidden",
        post.gradient || "bg-gradient-to-br from-orange-500 via-orange-600 to-amber-500"
      )}>
        {/* Decorative Background Element */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-amber-300 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 text-sm font-medium transition-colors"
          >
            <ChevronLeft className="h-4 w-4" /> Back to Blog
          </Link>

          <div className="flex flex-col items-center">
            <span className="text-7xl md:text-9xl mb-8 drop-shadow-2xl animate-float">
              {post.emoji}
            </span>
            
            <Badge className="mb-6 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border-white/20 px-6 py-1.5 text-xs font-bold uppercase tracking-widest">
              {post.category}
            </Badge>
            
            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-[1.05] mb-8">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/90">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 ring-4 ring-white/10">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback className="bg-orange-400 text-white">
                    {post.author.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-bold leading-none">{post.author.name}</p>
                  <p className="text-[11px] opacity-70 mt-1 uppercase tracking-tighter">Author</p>
                </div>
              </div>
              
              <div className="h-8 w-[1px] bg-white/20 hidden md:block" />
              
              <div className="flex items-center gap-4 text-sm font-medium">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 opacity-70" /> {post.publishedAt}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 opacity-70" /> {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Article Content Area */}
      <main className="container max-w-4xl mx-auto px-4 md:px-6 -mt-16 relative z-20">
        <div className="bg-background rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-16 shadow-[0_32px_64px_-12px_rgba(249,115,22,0.1)] border border-orange-50/50">
          
          <article className="prose prose-orange prose-lg md:prose-xl max-w-none">
            {/* Lead Excerpt */}
            <div className="not-prose mb-12">
              <p className="text-xl md:text-2xl leading-relaxed text-orange-950/80 font-medium italic border-l-4 border-orange-500 pl-6 py-2">
                {post.excerpt}
              </p>
            </div>

            <PostContent post={post} />
          </article>

          {/* 4. Related Posts Section */}
          <RelatedPosts currentPostId={post.id} category={post.category} />

          {/* 5. Discussion Section */}
          <section id="comments" className="mt-20 pt-16 border-t border-orange-100">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-3xl font-black text-orange-950 tracking-tight">Discussion</h3>
              <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                {post.comments} Comments
              </Badge>
            </div>
            
            <Suspense fallback={
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-orange-50/50 rounded-3xl animate-pulse" />
                ))}
              </div>
            }>
              <PostComments postId={post.id} />
            </Suspense>
          </section>
        </div>
      </main>

      {/* 6. Sticky Mobile Actions */}
      <MobilePostActions post={post} />

      {/* Bottom Spacer for Mobile Navigation */}
      <div className="h-28 md:hidden" />
      
      {/* Footer / Credits */}
      <footer className="py-12 text-center text-sm text-muted-foreground">
        <p>© 2026 RunAsh AI. All rights reserved.</p>
      </footer>
    </div>
  )
  }
