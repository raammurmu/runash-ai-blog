"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { ArrowRight, Bot, Cpu, MessageSquareQuote, Sparkles, TrendingUp } from "lucide-react"
import { blogPosts } from "@/lib/blog-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type HeroSectionProps = {
  badge?: string
  title?: string
  description?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

const modelDialogues = [
  {
    role: "RunAsh Editor AI",
    line: "Draft a clean launch update with key metrics, product screenshots, and one sharp takeaway.",
  },
  {
    role: "Growth Copilot",
    line: "Highlight user impact first, then show the technical depth in a short architecture section.",
  },
  {
    role: "RunAsh Editor AI",
    line: "Done — I created a polished post structure optimized for readability in both light and dark themes.",
  },
]

export function HeroSection({
  badge = "RunAsh AI Blog",
  title = "Modern stories for builders in AI",
  description =
    "A professional, clean and tech-focused publication for product launches, engineering playbooks, and practical AI insights.",
  primaryCta = { label: "Explore latest posts", href: "/blog" },
  secondaryCta = { label: "Create a post", href: "/create" },
}: HeroSectionProps) {
  const [open, setOpen] = useState(false)

  const featuredPost = useMemo(
    () =>
      [...blogPosts].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      )[0],
    [],
  )

  const totalPosts = blogPosts.length
  const totalCategories = new Set(blogPosts.map((post) => post.category)).size

  return (
    <section className="relative mb-8 overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-background via-background to-muted/40 text-foreground shadow-sm">
      <div className="absolute -left-20 top-8 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="relative z-10 grid gap-10 px-6 py-14 md:px-10 lg:grid-cols-[1.2fr_0.9fr] lg:items-center">
        <div>
          <Badge variant="secondary" className="mb-5 gap-1 rounded-full border border-cyan-400/40 bg-cyan-100/70 px-4 py-1 text-cyan-700 dark:border-cyan-700/40 dark:bg-cyan-900/20 dark:text-cyan-200">
            <Sparkles className="h-3.5 w-3.5" /> {badge}
          </Badge>
          <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">{description}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-2xl bg-cyan-600 hover:bg-cyan-700">
              <Link href={primaryCta.href}>
                {primaryCta.label} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-2xl">
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary" className="rounded-2xl">
                  <Bot className="mr-2 h-4 w-4" /> Open model dialogue card
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <MessageSquareQuote className="h-4 w-4 text-cyan-500" /> Model dialogue card
                  </DialogTitle>
                  <DialogDescription>
                    A preview of how RunAsh AI assistants can shape polished, technical blog stories.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                  {modelDialogues.map((item, idx) => (
                    <div
                      key={`${item.role}-${idx}`}
                      className="rounded-2xl border border-border bg-muted/40 p-4"
                    >
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-cyan-600 dark:text-cyan-300">
                        {item.role}
                      </p>
                      <p className="text-sm text-foreground/90">{item.line}</p>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>{totalPosts} posts</span>
            <span>•</span>
            <span>{totalCategories} categories</span>
            <span>•</span>
            <span>Light / dark ready</span>
          </div>
        </div>

        {featuredPost && (
          <div className="w-full rounded-3xl border border-border/70 bg-card/90 p-6 shadow-lg shadow-cyan-500/10">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-500">
              <TrendingUp className="h-3.5 w-3.5" /> Trending now
            </p>
            <h2 className="mb-3 text-2xl font-bold">{featuredPost.title}</h2>
            <p className="mb-5 line-clamp-3 text-sm text-muted-foreground">{featuredPost.excerpt}</p>
            <div className="mb-5 flex items-center justify-between text-xs text-muted-foreground">
              <span>{featuredPost.category}</span>
              <span>{new Date(featuredPost.publishedAt).toLocaleDateString()}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pb-5 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 rounded-xl border border-border/70 px-2 py-1"><Cpu className="h-3 w-3" /> AI-first</span>
              <span className="inline-flex items-center gap-1 rounded-xl border border-border/70 px-2 py-1"><Sparkles className="h-3 w-3" /> Clean UI</span>
            </div>
            <Button asChild className="w-full rounded-2xl bg-cyan-600 hover:bg-cyan-700">
              <Link href={`/blog/${featuredPost.slug}`}>Read featured story</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
