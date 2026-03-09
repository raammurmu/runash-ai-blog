"use client"

import { Suspense, useMemo, useState } from "react"
import { BlogFeed } from "@/components/blog-feed"
import { BlogShell } from "@/components/blog-shell"
import { blogPosts } from "@/lib/blog-data"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeBucket, setActiveBucket] = useState<"all" | "recent">("all")
  const [activeTopic, setActiveTopic] = useState("All topics")

  const topics = useMemo(() => ["All topics", ...Array.from(new Set(blogPosts.map((post) => post.category)))], [])

  const orderedPosts = useMemo(
    () => [...blogPosts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()),
    [],
  )

  const recentIds = useMemo(() => new Set(orderedPosts.slice(0, 4).map((post) => post.id)), [orderedPosts])

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return orderedPosts.filter((post) => {
      const matchesQuery =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      const matchesBucket = activeBucket === "all" || recentIds.has(post.id)
      const matchesTopic = activeTopic === "All topics" || post.category === activeTopic

      return matchesQuery && matchesBucket && matchesTopic
    })
  }, [activeBucket, activeTopic, orderedPosts, recentIds, searchQuery])

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
      <Suspense fallback={<div>Loading posts...</div>}>
        <BlogFeed posts={filteredPosts} />
      </Suspense>
    </BlogShell>
  )
}
