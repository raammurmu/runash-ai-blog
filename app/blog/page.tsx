import { Header } from "@/components/header"
import { BlogFeed } from "@/components/blog-feed"
import { Footer } from "@/components/footer"
import { blogPosts } from "@/lib/blog-data"

export default function BlogPage() {
  const orderedPosts = [...blogPosts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950/50">
      <Header />
      <main className="mx-auto w-full max-w-4xl px-4 pb-20 pt-8 lg:px-10 lg:pt-12">
        <BlogFeed posts={orderedPosts} />
      </main>
      <Footer />
    </div>
  )
}
