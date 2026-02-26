"use client"

import Link from "next/link"
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react"
import { blogPosts } from "@/lib/blog-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type HeroSectionProps = {
  badge?: string
  title?: string
  description?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

export function HeroSection({
  badge = "RunAsh Blog",
  title = "Insights & Updates",
  description = "Stay up to date with the latest news, tutorials, and insights from the RunAsh AI team.",
  primaryCta = { label: "Explore latest posts", href: "/blog" },
  secondaryCta = { label: "Create a post", href: "/create" },
}: HeroSectionProps) {
  const featuredPost = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )[0]

  const totalPosts = blogPosts.length
  const totalCategories = new Set(blogPosts.map((post) => post.category)).size

  return (
    <section className="relative overflow-hidden rounded-3xl border border-orange-100/60 bg-gradient-to-br from-white via-orange-50/40 to-amber-50/30 text-gray-900 shadow-sm dark:border-orange-900/30 dark:from-gray-950 dark:via-gray-950 dark:to-orange-950/30 dark:text-white mb-8">
      <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-orange-400/15 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="relative z-10 grid gap-10 px-6 py-14 md:px-10 lg:grid-cols-[1.2fr_0.9fr] lg:items-center">
        <div>
          <Badge variant="secondary" className="mb-5 gap-1 rounded-full border border-orange-300/40 bg-orange-100/70 px-4 py-1 text-orange-700 dark:border-orange-700/40 dark:bg-orange-900/30 dark:text-orange-200">
            <Sparkles className="h-3.5 w-3.5" /> {badge}
          </Badge>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">{description}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-2xl bg-orange-600 hover:bg-orange-700">
              <Link href={primaryCta.href}>
                {primaryCta.label} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-2xl border-orange-200 hover:bg-orange-50 dark:hover:bg-orange-950/40">
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>{totalPosts} posts</span>
            <span>•</span>
            <span>{totalCategories} categories</span>
            <span>•</span>
            <span>Weekly updates</span>
          </div>
        </div>

        {featuredPost && (
          <div className="w-full rounded-3xl border border-orange-200/50 bg-white/90 p-6 shadow-lg shadow-orange-100/60 dark:border-orange-900/40 dark:bg-gray-900/80 dark:shadow-none">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
              <TrendingUp className="h-3.5 w-3.5" /> Trending now
            </p>
            <h2 className="mb-3 text-2xl font-bold">{featuredPost.title}</h2>
            <p className="mb-5 line-clamp-3 text-sm text-muted-foreground">{featuredPost.excerpt}</p>
            <div className="mb-5 flex items-center justify-between text-xs text-muted-foreground">
              <span>{featuredPost.category}</span>
              <span>{new Date(featuredPost.publishedAt).toLocaleDateString()}</span>
            </div>
            <Button asChild className="w-full rounded-2xl bg-orange-600 hover:bg-orange-700">
              <Link href={`/blog/${featuredPost.slug}`}>Read featured story</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
