"use client"

import type React from "react"
import { useMemo, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { BlogCard } from "@/components/blog-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search } from "lucide-react"
import { blogPosts } from "@/lib/blog-data"
import type { BlogPost } from "@/lib/types"

export default function SearchPage() {
  const params = useSearchParams()
  const router = useRouter()
  const [q, setQ] = useState(params.get("q") ?? "")
  const [activeCategory, setActiveCategory] = useState("All")
  const [activePost, setActivePost] = useState<BlogPost | null>(null)

  const categories = useMemo(() => ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))], [])

  const results = useMemo(() => {
    const query = q.trim().toLowerCase()
    return blogPosts.filter((post) => {
      const categoryMatch = activeCategory === "All" || post.category === activeCategory
      if (!query) return categoryMatch
      return (
        categoryMatch &&
        (post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          post.author.name.toLowerCase().includes(query))
      )
    })
  }, [q, activeCategory])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-6xl px-6 py-8">
        <h1 className="mb-4 text-2xl font-bold">Search</h1>

        <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search posts, tags, authors..."
              className="pl-9"
            />
          </div>
          <Button type="submit" className="shadow-sm">Search</Button>
        </form>

        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${activeCategory === cat ? "bg-orange-600 text-white" : "bg-orange-50 text-orange-700 hover:bg-orange-100 dark:bg-orange-950/30 dark:text-orange-300"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-10 text-center text-sm text-muted-foreground">No results found.</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <div key={p.id} className="space-y-2">
                <BlogCard post={p} />
                <Button variant="outline" size="sm" className="w-full" onClick={() => setActivePost(p)}>
                  Quick view
                </Button>
              </div>
            ))}
          </div>
        )}
      </main>

      <Dialog open={!!activePost} onOpenChange={(open) => !open && setActivePost(null)}>
        <DialogContent className="max-w-xl">
          {activePost && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{activePost.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Badge variant="secondary">{activePost.category}</Badge>
                <p className="text-sm text-muted-foreground">{activePost.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>By {activePost.author.name}</span>
                  <span>{activePost.readTime}</span>
                </div>
                <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
                  <a href={`/post/${activePost.slug}`}>Read full article</a>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
