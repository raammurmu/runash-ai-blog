"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
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

  const featuredPosts = useMemo(() => filteredPosts.slice(0, 4), [filteredPosts])

  const featuredTopics = useMemo(
    () => topics.filter((topic) => topic !== "All").slice(0, 8),
    [topics],
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
      <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_300px]">
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

        <aside className="hidden space-y-7 border-l border-border/60 pl-6 xl:block">
          <section className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Featured posts</h2>
            <ul className="space-y-2.5 text-sm">
              {featuredPosts.map((post) => (
                <li key={post.id}>
                  <Link href={`/post/${post.slug}`} className="line-clamp-2 text-foreground/90 transition-colors hover:text-foreground">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Trending topics</h2>
            <div className="flex flex-wrap gap-2">
              {featuredTopics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setActiveTopic(topic)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                    activeTopic === topic
                      ? "border-foreground/70 bg-foreground/10 text-foreground"
                      : "border-border text-muted-foreground hover:border-foreground/35 hover:text-foreground"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </BlogShell>
  )
}
