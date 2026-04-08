"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, Search, Sun } from "lucide-react"
import { BlogLeftRail } from "@/components/blog-left-rail"
import { Button } from "@/components/ui/button"
import { logClientInteraction } from "@/lib/client-logger"
import { BLOG_UI_LAYOUT, BLOG_UI_SURFACES } from "@/lib/ui-conventions"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  const handleTopicChange = (topic: string, source: "rail" | "menu") => {
    logClientInteraction("topic_filter_changed", { topic, source })
    onTopicChange(topic)
  }

  const navLinks = [
    {
      href: "/",
      label: "Home",
      isActive: pathname === "/",
    },
    {
      href: "/search?q=api",
      label: "API",
      isActive: pathname.startsWith("/search"),
    },
    {
      href: "/search?q=codex",
      label: "Codex",
      isActive: false,
    },
    {
      href: "/search?q=chatgpt",
      label: "ChatGPT",
      isActive: false,
    },
  ]

  const railContent = (
    <BlogLeftRail
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      allPostsLink={{
        label: "All posts",
        href: "/",
        active: true,
      }}
      recentLinks={recentLinks}
      topicLinks={topics.map((topic) => ({
        label: topic,
        onClick: () => handleTopicChange(topic, "rail"),
        active: activeTopic === topic,
      }))}
      className="px-3 py-4 sm:px-4"
    />
  )

  return (
    <div className={`min-h-screen ${BLOG_UI_SURFACES.mutedCanvas} text-foreground`}>
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
        <div className={BLOG_UI_LAYOUT.shellHeaderInner}>
          <Link href="/" className="text-base font-semibold leading-tight tracking-tight text-foreground sm:text-[1.05rem]">
            OpenAI Developers
          </Link>

          <nav className="hidden items-center gap-3 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={link.isActive ? "text-foreground" : "text-muted-foreground/85 hover:text-foreground"}
              >
                {link.label}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 gap-1 rounded-full border border-border/60 bg-muted/40 px-2.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground">
                  Learn
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/">All posts</Link>
                </DropdownMenuItem>
                {topics.slice(0, 6).map((topic) => (
                  <DropdownMenuItem key={topic} onClick={() => handleTopicChange(topic, "menu")}>
                    {topic}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-lg md:hidden" aria-label="Open blog filters">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className={`w-[92%] overflow-y-auto ${BLOG_UI_SURFACES.mutedCanvas} p-3 sm:max-w-sm sm:p-4`}>
                <SheetHeader className="sr-only">
                  <SheetTitle>Blog navigation</SheetTitle>
                </SheetHeader>
                {railContent}
              </SheetContent>
            </Sheet>

            <Button asChild size="sm" className={`hidden h-8 rounded-full px-3.5 text-xs font-medium md:inline-flex ${BLOG_UI_SURFACES.emphasisButton}`}>
              <Link href="/search?q=api">API Dashboard ↗</Link>
            </Button>

            <Button asChild variant="ghost" size="icon" className="hidden h-8 w-8 rounded-full border-0 text-muted-foreground hover:bg-transparent hover:text-foreground md:inline-flex" aria-label="Theme settings">
              <Link href="/settings">
                <Sun className="h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="icon" className="rounded-full md:hidden" aria-label="Search posts">
              <Link href="/search">
                <Search className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className={BLOG_UI_LAYOUT.shellFrame}>
        {/* Developer note: sizing targets were inferred from the reference and kept to a simple 320/980 split at xl+ to preserve layout stability. */}
        <aside className={`hidden min-h-[calc(100vh-57px)] w-[292px] border-r border-border/60 ${BLOG_UI_SURFACES.mutedCanvas} lg:block xl:w-[320px]`}>
          {railContent}
        </aside>

        <main className={BLOG_UI_LAYOUT.shellMainPadding}>
          <div className={BLOG_UI_LAYOUT.shellContentWidth}>{children}</div>
        </main>
      </div>
    </div>
  )
}
