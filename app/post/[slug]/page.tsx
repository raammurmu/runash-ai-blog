import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getBlogPost } from "@/lib/blog-data"
import { PostContent } from "@/components/post-content"
import { PostComments } from "@/components/post-comments"
import { Header } from "@/components/header"
import { ReadingProgress } from "@/components/reading-progress"
import { ScrollToTop } from "@/components/scroll-to-top"
import { MobilePostActions } from "@/components/mobile-post-actions" // Suggested below
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

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
      {/* 1. Global Interaction Layer */}
      <ReadingProgress />
      <ScrollToTop />
      
      <Header />

      {/* 2. Brand Hero Section */}
      <section className={cn(
        "relative w-full py-16 md:py-24 flex flex-col items-center justify-center text-center px-6 overflow-hidden",
        post.gradient || "bg-gradient-to-br from-orange-500 to-amber-500"
      )}>
        {/* Floating Background Emoji for depth */}
        <span className="absolute text-[15rem] opacity-10 blur-sm pointer-events-none -bottom-10 -right-10 rotate-12">
          {post.emoji}
        </span>
        
        <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Badge className="mb-6 bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border-none px-4 py-1 text-sm font-medium">
            {post.category}
          </Badge>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight max-w-4xl leading-[1.1]">
            {post.title}
          </h1>
          
          <div className="mt-8 flex items-center justify-center gap-4 text-white/90">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10 ring-2 ring-white/50">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback className="bg-white/20">{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <span className="font-bold">{post.author.name}</span>
            </div>
            <span className="opacity-50">•</span>
            <span className="font-medium">{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* 3. Main Content Area */}
      <main className="container max-w-4xl mx-auto px-6 -mt-12 relative z-20">
        <div className="bg-background rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 shadow-2xl shadow-orange-900/5 border border-orange-50">
          
          <article className="prose prose-orange prose-lg md:prose-xl max-w-none">
            {/* Lead Paragraph */}
            <p className="text-xl md:text-2xl leading-relaxed text-orange-900/70 font-medium mb-12 border-l-4 border-orange-400 pl-6 italic">
              {post.excerpt}
            </p>

            <PostContent post={post} />
          </article>

          {/* 4. Comments Section */}
          <section className="mt-16 pt-16 border-t border-orange-100">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              Discussion
              <span className="text-sm font-normal bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                {post.comments}
              </span>
            </h3>
            <Suspense fallback={
              <div className="flex flex-col gap-4 animate-pulse">
                <div className="h-20 bg-orange-50 rounded-xl w-full" />
                <div className="h-20 bg-orange-50 rounded-xl w-3/4" />
              </div>
            }>
              <PostComments postId={post.id} />
            </Suspense>
          </section>
        </div>
      </main>

      {/* 5. Mobile Sticky Interactions */}
      <MobilePostActions post={post} />

      {/* Footer Spacer for Mobile Actions */}
      <div className="h-24 md:hidden" />
    </div>
  )
}

