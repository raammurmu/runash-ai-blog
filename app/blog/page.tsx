"use client"

import { useMemo, useState } from "react"

import { BlogShell } from "@/components/blog-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatPostDate, getAllPosts } from "@/lib/blog-data"
import type { BlogPost } from "@/lib/types"

const RECENT_POSTS_LIMIT = 4

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeBucket, setActiveBucket] = useState<"all" | "recent">("all")
  const [activeTopic, setActiveTopic] = useState("All topics")
  const posts = useMemo(() => getAllPosts(), [])
  const topics = useMemo(
    () => ["All topics", ...Array.from(new Set(posts.map((post) => post.category)))],
    [posts],
  )
  const filteredPosts = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase()

    return posts.filter((post, index) => {
      const matchesBucket = activeBucket === "all" || index < 3
      const matchesTopic = activeTopic === "All topics" || post.category === activeTopic
      const matchesSearch =
        normalizedSearch.length === 0 ||
        post.title.toLowerCase().includes(normalizedSearch) ||
        post.excerpt.toLowerCase().includes(normalizedSearch) ||
        post.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch))

      return matchesBucket && matchesTopic && matchesSearch
    })
  }, [activeBucket, activeTopic, posts, searchQuery])

  return (
    <BlogShell
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      activeBucket={activeBucket}
      onBucketChange={setActiveBucket}
      activeTopic={activeTopic}
      topics={topics}
      onTopicChange={setActiveTopic}
    >
      <main className="site-gradient-bg px-1 py-2 sm:px-0">
          <div className="mx-auto w-full max-w-5xl">
            <section className="py-6 lg:py-10">
              <div className="mx-auto max-w-3xl text-center">
                <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">RunAsh Blog</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                  Insights, product updates, and practical guides from the RunAsh AI team.
                </p>
              </div>
            </section>

            <section className="pb-10">
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          </div>
      </main>
    </BlogShell>
  )
}
