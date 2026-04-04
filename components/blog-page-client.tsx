"use client"

import { useMemo, useState } from "react"

import { BlogFeed } from "@/components/blog-feed"
import { BlogShell } from "@/components/blog-shell"
import type { BlogPost } from "@/lib/types"

interface BlogPageClientProps {
  posts: BlogPost[]
}

export function BlogPageClient({ posts }: BlogPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTopic, setActiveTopic] = useState("All")

  const topics = useMemo(() => {
    const categories = Array.from(new Set(posts.map((post) => post.category).filter(Boolean))).sort((a, b) =>
      a.localeCompare(b),
    )

    return ["All", ...categories]
  }, [posts])

  const filteredPosts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return posts.filter((post) => {
      const matchesTopic = activeTopic === "All" || post.category === activeTopic

      if (!normalizedQuery) {
        return matchesTopic
      }

      const haystack = [post.title, post.excerpt, post.category, post.tags.join(" ")].join(" ").toLowerCase()

      return matchesTopic && haystack.includes(normalizedQuery)
    })
  }, [activeTopic, posts, searchQuery])

  const recentLinks = useMemo(
    () =>
      posts.slice(0, 6).map((post) => ({
        label: post.title,
        href: `/post/${post.slug}`,
      })),
    [posts],
  )

  return (
    <BlogShell
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      recentLinks={recentLinks}
      activeTopic={activeTopic}
      topics={topics}
      onTopicChange={setActiveTopic}
    >
      <section className="space-y-3 pb-7">
        <h1 className="text-pretty text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">RunAsh Blog</h1>
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
          Product updates, engineering notes, and live-commerce insights from the RunAsh AI team.
        </p>
      </section>

      <BlogFeed posts={filteredPosts} />
    </BlogShell>
  )
}
