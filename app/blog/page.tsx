"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { ArrowRight, Calendar, Clock, Search, User } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatPostDate, getAllPosts, getPostsByCategory } from "@/lib/blog-data"
import type { BlogPost } from "@/lib/types"

type CategoryTab = {
  key: string
  label: string
}

const BlogPostCard = ({ post }: { post: BlogPost }) => {
  return (
    <Card className="overflow-hidden border-orange-200/50 transition-shadow hover:shadow-md dark:border-orange-900/30">
      <div className="aspect-video overflow-hidden">
        <img
          src={post.image || "/placeholder.svg?height=300&width=400"}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
          {post.category}
        </span>
        <h3 className="mt-3 line-clamp-2 text-xl font-bold">{post.title}</h3>
        <p className="mb-4 mt-2 line-clamp-3 text-gray-600 dark:text-gray-400">{post.excerpt}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatPostDate(post.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </div>
          <Button asChild variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700 dark:text-orange-400">
            <Link href={`/post/${post.slug}`}>
              Read <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const allPosts = useMemo(() => getAllPosts(), [])
  const featuredPost = allPosts[0]
  const categoryTabs = useMemo<CategoryTab[]>(() => {
    const categories = Array.from(new Set(allPosts.map((post) => post.category)))
    return [{ key: "all", label: "All Posts" }, ...categories.map((c) => ({ key: c, label: c }))]
  }, [allPosts])

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return allPosts
    return allPosts.filter((post) => {
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.author.name.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    })
  }, [allPosts, searchQuery])

  const postsByTab = (tabKey: string) => {
    if (tabKey === "all") return filteredPosts
    const byCategory = getPostsByCategory(tabKey)
    return byCategory.filter((post) => filteredPosts.some((filtered) => filtered.slug === post.slug))
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50/30 to-white dark:from-gray-950 dark:via-orange-950/30 dark:to-gray-950" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5 dark:opacity-10" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="mb-4 flex justify-end">
            <ThemeToggle />
          </div>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-6 py-2 backdrop-blur-sm">
              <span className="text-orange-600 dark:text-orange-400">RunAsh Blog</span>
            </div>
            <h1 className="mb-6 bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 bg-clip-text text-4xl font-bold text-transparent dark:from-orange-400 dark:via-orange-300 dark:to-yellow-300 md:text-6xl">
              Insights & Updates
            </h1>
            <p className="mb-8 text-xl text-gray-700 dark:text-gray-300">
              Explore new product updates, launch stories, and practical live-commerce tips from the RunAsh team.
            </p>

            <div className="relative mx-auto max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Search by title, category, author, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-orange-200 bg-white/50 pl-10 focus:border-orange-500/70 dark:border-orange-800/30 dark:bg-gray-900/50"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            {featuredPost ? (
              <div className="mb-12 rounded-2xl border border-orange-200/60 bg-gradient-to-br from-orange-50 to-yellow-50 p-6 dark:border-orange-900/40 dark:from-orange-950/30 dark:to-yellow-950/20 md:p-8">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-orange-700 dark:text-orange-400">Featured Post</p>
                <h2 className="text-2xl font-bold md:text-3xl">{featuredPost.title}</h2>
                <p className="mt-3 text-gray-700 dark:text-gray-300">{featuredPost.excerpt}</p>
                <Button asChild className="mt-6 bg-gradient-to-r from-orange-600 to-yellow-600 text-white hover:from-orange-700 hover:to-yellow-700">
                  <Link href={`/post/${featuredPost.slug}`}>
                    Read Featured Story <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ) : null}

            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="h-auto flex-wrap bg-orange-100/50 p-1 dark:bg-orange-900/20">
                {categoryTabs.map((tab) => (
                  <TabsTrigger key={tab.key} value={tab.key} className="capitalize">
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categoryTabs.map((tab) => {
                const posts = postsByTab(tab.key)
                return (
                  <TabsContent key={tab.key} value={tab.key} className="mt-8">
                    {posts.length === 0 ? (
                      <p className="text-center text-gray-500 dark:text-gray-400">No posts found for this filter.</p>
                    ) : (
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                          <BlogPostCard key={post.id} post={post} />
                        ))}
                      </div>
                    )}
                  </TabsContent>
                )
              })}
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  )
}
