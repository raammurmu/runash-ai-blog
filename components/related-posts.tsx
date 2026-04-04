"use client"

import { blogPosts } from "@/lib/blog-data"
import { BlogCard } from "@/components/blog-card"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export function RelatedPosts({ currentPostId, category }: { currentPostId: string; category: string }) {
  // Find up to 3 posts in the same category, excluding the current one
  const related = blogPosts
    .filter((p) => p.category === category && p.id !== currentPostId)
    .slice(0, 3)

  if (related.length === 0) return null

  return (
    <section className="mt-8 border-t border-border/80 pt-10">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-2xl font-semibold tracking-tight text-foreground/90">More in {category}</h3>
        <Link
          href="/"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          View all <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Horizontal Snap Scroller for Mobile, Grid for Desktop */}
      <div className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 md:mx-0 md:grid md:grid-cols-3 md:px-0">
        {related.map((post) => (
          <div key={post.id} className="min-w-[280px] snap-start sm:min-w-[320px]">
            <BlogCard post={post} viewMode="grid" />
          </div>
        ))}
      </div>
    </section>
  )
}
