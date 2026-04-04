"use client"

import { useMemo, useState } from "react"

import { BlogFeed } from "@/components/blog-feed"
import { BlogShell } from "@/components/blog-shell"
import { getAllPosts, getRecentPosts } from "@/lib/blog-data"

export default function HomePage() {
  const allPosts = useMemo(() => getAllPosts(), [])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTopic, setActiveTopic] = useState("All")

  const topics = useMemo(() => {
    const uniqueTopics = Array.from(new Set(allPosts.flatMap((post) => post.tags || [])))
    return ["All", ...uniqueTopics]
  }, [allPosts])

  const recentLinks = useMemo(
    () =>
      getRecentPosts(6).map((post) => ({
        label: post.title,
        href: `/post/${post.slug}`,
      })),
    [],
  )

  const filteredPosts = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase()

    return allPosts.filter((post) => {
      const matchesTopic = activeTopic === "All" || (post.tags || []).includes(activeTopic)

      if (!normalizedSearch) {
        return matchesTopic
      }

      const searchIndex = [post.title, post.excerpt, post.category, ...(post.tags || [])].join(" ").toLowerCase()
      return matchesTopic && searchIndex.includes(normalizedSearch)
    })
  }, [activeTopic, allPosts, searchQuery])

  return (
    <BlogShell
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      recentLinks={recentLinks}
      activeTopic={activeTopic}
      topics={topics}
      onTopicChange={setActiveTopic}
    >
      <section className="space-y-9 sm:space-y-10">
        <header className="space-y-3 sm:space-y-4">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.35rem]">
            RunAsh AI Blog
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Product updates, launch notes, and practical guides for building live commerce with AI hosts, realtime
            streaming, and conversion-ready storefronts.
          </p>
        </header>

        <BlogFeed posts={filteredPosts} />
      </section>
    </BlogShell>
  )
}
