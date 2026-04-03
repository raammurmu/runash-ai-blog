"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search } from "lucide-react"
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
  const pathname = usePathname()

  const navLinks = [
    {
      href: "/",
      label: "Home",
      isActive: pathname === "/",
    },
    {
      href: "/blog",
      label: "Blog",
      isActive: pathname.startsWith("/blog"),
    },
    {
      href: "/category/ai",
      label: "Categories",
      isActive: pathname.startsWith("/category"),
    },
  ]

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
      className="rounded-xl border-border/70 bg-muted/50 p-4 lg:p-5"
    />
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-base font-semibold tracking-tight text-foreground">
            RunAsh AI Blog
          </Link>

          <nav className="hidden items-center gap-6 text-sm md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={link.isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}
              >
                {link.label}
              </Link>
            ))}
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

            <Button asChild size="sm" className="hidden rounded-full px-4 md:inline-flex">
              <Link href="/blog">Read blog</Link>
            </Button>

            <Button asChild variant="outline" size="icon" className="rounded-full" aria-label="Search posts">
              <Link href="/search">
                <Search className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:gap-12 lg:px-10 lg:py-12 xl:gap-16">
        <main className="order-1 min-w-0 flex-1 lg:order-2">
          <div className="mx-auto w-full max-w-[820px]">{children}</div>
        </main>

        <aside className="order-2 hidden w-full lg:order-1 lg:sticky lg:top-24 lg:block lg:h-fit lg:w-[280px] lg:shrink-0">
          {railContent}
        </aside>
      </div>
    </div>
  )
}
