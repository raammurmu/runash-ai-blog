"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { BlogLeftRail } from "@/components/blog-left-rail"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface BlogShellProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  recentLinks: { label: string; href: string }[]
  activeTopic: string
  topics: string[]
  onTopicChange: (value: string) => void
  children: ReactNode
}

export function BlogShell({
  searchQuery,
  onSearchChange,
  recentLinks,
  activeTopic,
  topics,
  onTopicChange,
  children,
}: BlogShellProps) {
  const railContent = (
    <BlogLeftRail
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      allPostsLink={{
        label: "All posts",
        href: "/blog",
        active: true,
      }}
      recentLinks={recentLinks}
      topicLinks={topics.map((topic) => ({
        label: topic,
        onClick: () => onTopicChange(topic),
        active: activeTopic === topic,
      }))}
      className="rounded-xl border-border/60 bg-gray-100 p-4 lg:p-5"
    />
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

          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-lg md:hidden" aria-label="Open blog filters">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[86%] overflow-y-auto p-4 sm:max-w-sm">
                <SheetHeader className="sr-only">
                  <SheetTitle>Blog navigation</SheetTitle>
                </SheetHeader>
                {railContent}
              </SheetContent>
            </Sheet>

            <Button asChild size="sm" className="rounded-lg">
              <Link href="/create">Write</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:gap-10 lg:px-8 lg:py-10">
        <main className="order-1 min-w-0 flex-1 lg:order-2">
          <div className="mx-auto w-full max-w-[760px]">{children}</div>
        </main>

        <aside className="order-2 hidden w-full lg:order-1 lg:sticky lg:top-24 lg:block lg:h-fit lg:w-[260px] lg:shrink-0">
          {railContent}
        </aside>
      </div>
    </div>
  )
}
