"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { ArrowRight, Calendar, Clock, User } from "lucide-react"

import { BlogShell } from "@/components/blog-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatPostDate, getAllPosts } from "@/lib/blog-data"
import type { BlogPost } from "@/lib/types"

const BlogPostCard = ({ post }: { post: BlogPost }) => {
  return (
    <Card className="overflow-hidden border-orange-200/50 dark:border-orange-900/30">
      <div className="aspect-video overflow-hidden">
        <img
          src={post.image || "/placeholder.svg?height=300&width=400"}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <div className="mb-3">
          <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
            {post.category}
          </span>
        </div>

        <h2 className="mb-3 text-2xl font-bold">{post.title}</h2>
        <p className="mb-5 text-gray-600 dark:text-gray-400">{post.excerpt}</p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatPostDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <Button
            asChild
            variant="ghost"
            size="sm"
            className="w-fit text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
          >
            <Link href={`/post/${post.slug}`}>
              Read More <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

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
      <main className="bg-transparent px-1 py-2 sm:px-0">
        <div className="mx-auto w-full max-w-5xl">
          <section className="py-10 sm:py-12 lg:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">RunAsh AI Blog</h1>
              <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                Insights, product updates, and practical guides from the RunAsh AI team.
              </p>
            </div>
          </section>

          <section className="pb-10 lg:pb-12">
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
