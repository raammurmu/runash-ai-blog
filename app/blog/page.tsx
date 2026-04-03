"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Calendar } from "lucide-react"

import { BlogShell } from "@/components/blog-shell"
import { formatPostDate, getAllPosts } from "@/lib/blog-data"
import type { BlogPost } from "@/lib/types"

const BlogPostCard = ({ post }: { post: BlogPost }) => {
  return (
    <article className="space-y-4 sm:space-y-5">
      <Link href={`/post/${post.slug}`} className="block overflow-hidden rounded-xl">
        <div className="aspect-video overflow-hidden rounded-xl">
          <img
            src={post.image || "/placeholder.svg?height=300&width=400"}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="h-4 w-4" />
          <span>{formatPostDate(post.publishedAt)}</span>
        </div>

        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          <Link href={`/post/${post.slug}`} className="hover:text-orange-600 dark:hover:text-orange-400">
            {post.title}
          </Link>
        </h2>

        {post.excerpt && <p className="text-base text-gray-600 dark:text-gray-400">{post.excerpt}</p>}

        <p className="text-sm font-medium text-orange-600 dark:text-orange-400">{post.category}</p>
      </div>
    </article>
  )
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTopic, setActiveTopic] = useState("All topics")
  const posts = useMemo(() => getAllPosts(), [])
  const recentLinks = useMemo(
    () =>
      posts.slice(0, 4).map((post) => ({
        label: post.title,
        href: `/post/${post.slug}`,
      })),
    [posts],
  )
  const topics = useMemo(
    () => ["All topics", ...Array.from(new Set(posts.map((post) => post.category)))],
    [posts],
  )
  const filteredPosts = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase()

    return posts.filter((post) => {
      const matchesTopic = activeTopic === "All topics" || post.category === activeTopic
      const matchesSearch =
        normalizedSearch.length === 0 ||
        post.title.toLowerCase().includes(normalizedSearch) ||
        post.excerpt.toLowerCase().includes(normalizedSearch) ||
        post.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch))

      return matchesTopic && matchesSearch
    })
  }, [activeTopic, posts, searchQuery])

  return (
    <BlogShell
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      recentLinks={recentLinks}
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
              <div className="space-y-10">
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
