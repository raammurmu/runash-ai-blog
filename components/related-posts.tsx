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
    <section className="mt-20 pt-10 border-t border-orange-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-orange-950">More in {category}</h3>
        <Link href="/blog" className="text-orange-600 font-semibold text-sm flex items-center hover:underline">
          View all <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Horizontal Snap Scroller for Mobile, Grid for Desktop */}
      <div className="flex overflow-x-auto gap-6 pb-6 no-scrollbar snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3">
        {related.map((post) => (
          <div key={post.id} className="min-w-[280px] sm:min-w-[320px] snap-start">
            <BlogCard post={post} viewMode="grid" />
          </div>
        ))}
      </div>
    </section>
  )
      }
