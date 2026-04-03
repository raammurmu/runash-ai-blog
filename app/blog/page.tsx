"use client"

import { useMemo, useState } from "react"

import { BlogFeed } from "@/components/blog-feed"
import { BlogLeftRail } from "@/components/blog-left-rail"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { getAllPosts } from "@/lib/blog-data"

const RECENT_POSTS_LIMIT = 4

export default function BlogPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeRecentSlug, setActiveRecentSlug] = useState<string | null>(null)
  const [activeTopic, setActiveTopic] = useState<string | null>(null)

  const posts = useMemo(() => getAllPosts(), [])
  const recentPosts = useMemo(() => posts.slice(0, RECENT_POSTS_LIMIT), [posts])

  const topicValues = useMemo(() => {
    const uniqueTopics = new Set<string>()
    posts.forEach((post) => {
      uniqueTopics.add(post.category)
      post.tags.forEach((tag) => uniqueTopics.add(tag))
    })
    return Array.from(uniqueTopics)
  }, [posts])

  const filteredPosts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return posts.filter((post) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.excerpt.toLowerCase().includes(normalizedQuery) ||
        post.category.toLowerCase().includes(normalizedQuery)

      const matchesRecent = !activeRecentSlug || post.slug === activeRecentSlug
      const matchesTopic =
        !activeTopic ||
        post.category.toLowerCase() === activeTopic.toLowerCase() ||
        post.tags.some((tag) => tag.toLowerCase() === activeTopic.toLowerCase())

      return matchesSearch && matchesRecent && matchesTopic
    })
  }, [activeRecentSlug, activeTopic, posts, searchQuery])

  const clearFilters = () => {
    setActiveRecentSlug(null)
    setActiveTopic(null)
  }

  const recentLinks = recentPosts.map((post) => ({
    label: post.title,
    active: post.slug === activeRecentSlug,
    onClick: () => {
      setActiveRecentSlug((current) => (current === post.slug ? null : post.slug))
    },
  }))

  const topicLinks = topicValues.map((topic) => ({
    label: topic,
    active: topic === activeTopic,
    onClick: () => {
      setActiveTopic((current) => (current === topic ? null : topic))
    },
  }))

  return (
    <div className="site-surface flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

        <main className="site-gradient-bg flex-1 px-4 py-8 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <section className="py-6 lg:py-10">
              <div className="mx-auto max-w-3xl text-center">
                <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">RunAsh Blog</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                  Insights, product updates, and practical guides from the RunAsh AI team.
                </p>
              </div>
            </section>

            <section className="pb-10">
              <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:items-start">
                <BlogLeftRail
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  allPostsLink={{
                    label: "Show all posts",
                    active: !activeRecentSlug && !activeTopic,
                    onClick: clearFilters,
                  }}
                  recentLinks={recentLinks}
                  topicLinks={topicLinks}
                  className="lg:sticky lg:top-24"
                />

                {filteredPosts.length === 0 ? (
                  <section aria-live="polite" className="rounded-2xl border border-dashed border-border/80 p-8 text-center">
                    <h2 className="text-lg font-semibold">No posts match your filters</h2>
                    <p className="mt-2 text-sm text-muted-foreground">Try a different search term or clear selected topics.</p>
                  </section>
                ) : (
                  <BlogFeed posts={filteredPosts} />
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
