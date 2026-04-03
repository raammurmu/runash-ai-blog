"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface BlogShellProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  activeBucket: "all" | "recent"
  onBucketChange: (value: "all" | "recent") => void
  activeTopic: string
  topics: string[]
  onTopicChange: (value: string) => void
  children: ReactNode
}

export function BlogShell({
  searchQuery,
  onSearchChange,
  activeBucket,
  onBucketChange,
  activeTopic,
  topics,
  onTopicChange,
  children,
}: BlogShellProps) {
  const railContent = (
    <div className="space-y-8">
      <section className="space-y-3">
        <div className="flex items-center justify-between text-sm font-medium text-foreground/70">
          <h2>Search</h2>
          <span className="rounded-md border border-border/70 bg-background px-2 py-0.5 text-xs text-muted-foreground">⌘K</span>
        </div>
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search posts"
          className="h-10 rounded-lg border-border/70 bg-white"
        />
      </section>

      <section className="space-y-2">
        <Button
          type="button"
          variant={activeBucket === "all" ? "secondary" : "ghost"}
          className="w-full justify-start rounded-lg"
          onClick={() => onBucketChange("all")}
        >
          All posts
        </Button>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-medium text-foreground/70">Recent</h2>
        <Button
          type="button"
          variant={activeBucket === "recent" ? "secondary" : "ghost"}
          className="w-full justify-start rounded-lg"
          onClick={() => onBucketChange("recent")}
        >
          Latest updates
        </Button>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-medium text-foreground/70">Topics</h2>
        <div className="space-y-1">
          {topics.map((topic) => (
            <Button
              key={topic}
              type="button"
              variant={activeTopic === topic ? "secondary" : "ghost"}
              className="w-full justify-start rounded-lg text-left"
              onClick={() => onTopicChange(topic)}
            >
              {topic}
            </Button>
          ))}
        </div>
      </section>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-border/60 bg-gray-50/95 backdrop-blur supports-[backdrop-filter]:bg-gray-50/80">
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-base font-semibold tracking-tight text-foreground">
            Runash AI
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <Link href="/blog" className="text-foreground">Blog</Link>
            <Link href="/category/ai" className="hover:text-foreground">Categories</Link>
            <Link href="/search" className="hover:text-foreground">Search</Link>
          </nav>

          <Button asChild size="sm" className="rounded-lg">
            <Link href="/create">Write</Link>
          </Button>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-4 px-4 py-4 sm:px-6 sm:py-5 lg:flex-row lg:gap-10 lg:px-8 lg:py-10">
        <div className="flex items-center justify-between rounded-xl border border-border/60 bg-gray-100 px-4 py-3 lg:hidden">
          <p className="text-sm font-medium text-foreground/80">Filters</p>
          <Sheet>
            <SheetTrigger asChild>
              <Button type="button" size="sm" variant="secondary" className="rounded-lg">
                Open
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-[85vh] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filter posts</SheetTitle>
                <SheetDescription>Search, sort, and narrow the feed by topic.</SheetDescription>
              </SheetHeader>
              <div className="mt-6">{railContent}</div>
            </SheetContent>
          </Sheet>
        </div>

        <aside className="hidden h-fit w-[280px] shrink-0 rounded-xl border border-border/60 bg-gray-100 p-5 lg:sticky lg:top-24 lg:block">
          {railContent}
        </aside>

        <main className="min-w-0 flex-1">
          <div className="w-full max-w-[840px]">{children}</div>
        </main>
      </div>
    </div>
  )
}
