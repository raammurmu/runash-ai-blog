"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { ArrowRight, Calendar, Clock, User } from "lucide-react"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const posts = useMemo(() => getAllPosts(), [])

  return (
    <div className="site-surface flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

        <main className="site-gradient-bg flex-1 px-4 py-8 lg:px-8">
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
              <div className="space-y-6">
                {posts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
