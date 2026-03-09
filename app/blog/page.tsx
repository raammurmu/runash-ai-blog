"use client"

import { Suspense, useMemo, useState } from "react"
import { BlogFeed } from "@/components/blog-feed"
import { Footer } from "@/components/footer"
import { BlogHeaderMinimal } from "@/components/blog-header-minimal"
import { BlogLeftRail } from "@/components/blog-left-rail"
import { blogPosts } from "@/lib/blog-data"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeBucket, setActiveBucket] = useState<"all" | "recent">("all")
  const [activeTopic, setActiveTopic] = useState("All topics")

  const orderedPosts = useMemo(
    () => [...blogPosts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()),
    [],
  )

  const topics = useMemo(() => ["All topics", ...Array.from(new Set(orderedPosts.map((post) => post.category)))], [orderedPosts])
  const recentPosts = useMemo(() => orderedPosts.slice(0, 4), [orderedPosts])
  const recentIds = useMemo(() => new Set(recentPosts.map((post) => post.id)), [recentPosts])

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
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950/50">
      <BlogHeaderMinimal />
      <div className="mx-auto flex w-full max-w-[1440px] gap-8 px-4 pb-20 pt-8 lg:px-10 lg:pt-10">
        <BlogLeftRail
          className="sticky top-20 hidden w-72 shrink-0 lg:block"
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          allPostsLink={{
            label: "Browse everything",
            active: activeBucket === "all",
            onClick: () => setActiveBucket("all"),
          }}
          recentLinks={[
            {
              label: "Latest updates",
              active: activeBucket === "recent",
              onClick: () => setActiveBucket("recent"),
            },
            ...recentPosts.map((post) => ({
              label: post.title,
              href: `/post/${post.slug}`,
            })),
          ]}
          topicLinks={topics.map((topic) => ({
            label: topic,
            active: activeTopic === topic,
            onClick: () => setActiveTopic(topic),
          }))}
        />

        <main className="min-w-0 flex-1">
          <Suspense fallback={<div>Loading posts...</div>}>
            <BlogFeed posts={filteredPosts} />
          </Suspense>
        </main>
      </div>
      <Footer />
    </div>
  )
}
