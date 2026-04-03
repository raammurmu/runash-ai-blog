"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

import { BlogShell } from "@/components/blog-shell"
import { Separator } from "@/components/ui/separator"
import { formatPostDate, getAllPosts } from "@/lib/blog-data"
import type { BlogPost } from "@/lib/types"

const BlogPostCard = ({ post }: { post: BlogPost }) => {
  return (
    <article className="space-y-3 sm:space-y-4">
      <Link href={`/post/${post.slug}`} className="block overflow-hidden rounded-lg">
        <div className="aspect-[16/6.2] overflow-hidden rounded-lg sm:aspect-[16/5.9]">
          <img
            src={post.image || "/placeholder.svg?height=300&width=400"}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
          />
        </div>
      </Link>

      <div className="space-y-2.5">
        <span className="block text-sm text-muted-foreground">{formatPostDate(post.publishedAt, false)}</span>

        <h2 className="text-[1.85rem] font-medium leading-tight tracking-tight sm:text-[2.05rem]">
          <Link href={`/post/${post.slug}`} className="hover:text-orange-600 dark:hover:text-orange-400">
            {post.title}
          </Link>
        </h2>

        {post.excerpt && <p className="max-w-3xl text-base text-muted-foreground">{post.excerpt}</p>}

        <p className="pt-1 text-sm text-muted-foreground">{post.category}</p>
      </div>
    </article>
  )
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTopic, setActiveTopic] = useState("All posts")
  const posts = useMemo(() => getAllPosts(), [])
  const recentLinks = useMemo(
    () =>
      posts.slice(0, 5).map((post) => ({
        label: post.title,
        href: `/post/${post.slug}`,
      })),
    [posts],
  )
  const topics = useMemo(
    () => ["General", ...Array.from(new Set(posts.map((post) => post.category)))],
    [posts],
  )
  const filteredPosts = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase()

    return posts.filter((post) => {
      const matchesTopic = activeTopic === "All posts" || activeTopic === "General" || post.category === activeTopic
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
      <main className="bg-transparent px-1 py-1 sm:px-0">
        <div className="mx-auto w-full max-w-5xl">
          <section className="py-8 sm:py-10 lg:py-12">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">OpenAI Developer Blog</h1>
              <p className="mt-4 text-base text-muted-foreground sm:text-xl">Insights for developers building with OpenAI</p>
            </div>
          </section>

          <section className="pb-12">
            <div className="space-y-14">
              {filteredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>

          <Separator className="mb-6" />
          <footer className="pb-10 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} OpenAI Developers</p>
          </footer>
        </div>
      </main>
    </BlogShell>
  )
}
