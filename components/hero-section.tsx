"use client"

import Link from "next/link"
 
import { useEffect, useState } from "react"
import { blogPosts } from "@/lib/blog-data"
import type { BlogPost } from "@/lib/types"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts")
        if (!response.ok) return
        const data = await response.json()
        setPosts(Array.isArray(data) ? data : blogPosts)
      } catch {
        setPosts(blogPosts)
      }
    }
    fetchPosts()
  }, [])

  const publishedPosts = posts.filter((post) => post.status !== "draft")
  const featuredPost = [...publishedPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )[0]

  const totalPosts = publishedPosts.length
  const totalCategories = new Set(publishedPosts.map((post) => post.category)).size

  return (
    <section className="relative overflow-hidden rounded-3xl bg-background text-foreground mb-8">

import { blogPosts } from "@/lib/blog-data"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const featuredPost = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )[0]

  const totalPosts = blogPosts.length
  const totalCategories = new Set(blogPosts.map((post) => post.category)).size

  return (
    <section className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-950 text-gray-900 dark:text-white mb-8">

      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-yellow-400/10" />
      <div className="relative z-10 flex flex-col gap-10 px-6 py-20 md:px-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-orange-500/30 rounded-full bg-orange-500/10 backdrop-blur-sm text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-300">
            RunAsh Blog
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 dark:from-orange-400 dark:via-orange-300 dark:to-yellow-300 text-transparent bg-clip-text">
            Insights & Updates
          </h1>
 
          <p className="text-lg md:text-xl text-muted-foreground mb-6">

          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6">

            Stay up to date with the latest news, tutorials, and insights from the RunAsh AI team.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>{totalPosts} posts</span>
            <span>•</span>
            <span>{totalCategories} categories</span>
            <span>•</span>
            <span>Updated weekly</span>
          </div>
        </div>

        {featuredPost && (
 
          <div className="w-full max-w-lg rounded-3xl border border-orange-200/60 bg-background/80 p-6 shadow-lg shadow-orange-200/40 dark:border-orange-900/40">

          <div className="w-full max-w-lg rounded-3xl border border-orange-200/60 bg-white/70 p-6 shadow-lg shadow-orange-200/40 dark:border-orange-900/40 dark:bg-gray-900/70">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500 mb-3">
              Featured
            </p>
            <h2 className="text-2xl font-bold mb-3">{featuredPost.title}</h2>
            <p className="text-sm text-muted-foreground mb-6">
              {featuredPost.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-6">
              <span>{featuredPost.category}</span>
              <span>{new Date(featuredPost.publishedAt).toLocaleDateString()}</span>
            </div>
            <Button asChild className="rounded-2xl bg-orange-600 hover:bg-orange-700">
              <Link href={`/blog/${featuredPost.slug}`}>Read the featured post</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
