"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, Search } from "lucide-react"
import { BlogLeftRail } from "@/components/blog-left-rail"
import { ThemeToggle } from "@/components/theme-toggle"
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
import { NAV_CONTRACT } from "@/components/nav-config"

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

  const BLOG_HEADER_NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/search?q=api", label: "API" },
    { href: "/search?q=codex", label: "Codex" },
    { href: "/search?q=chatgpt", label: "ChatGPT" },
  ] as const

  const handleTopicChange = (topic: string, source: "rail" | "menu") => {
    logClientInteraction("topic_filter_changed", { topic, source })
    onTopicChange(topic)
  }

  const navLinks = BLOG_HEADER_NAV_LINKS.map((link) => ({
    ...link,
    isActive:
      (link.href === "/" && pathname === "/") ||
      (link.href === "/search?q=api" && pathname.startsWith("/search")),
  }))

  const railSectionChainClass =
    "px-3 py-3 sm:px-4 [&_section+section]:mt-3 [&_section+section]:border-t [&_section+section]:border-border/45 [&_section+section]:pt-3"

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
      className={railSectionChainClass}
    />
  )

  return (
    <div className={`min-h-screen text-foreground ${BLOG_UI_SURFACES.mutedCanvas}`}>
      <header className={NAV_CONTRACT.headerShell}>
        <div className={`${NAV_CONTRACT.headerInner} max-w-[1420px] py-2.5 sm:px-5 lg:px-6`}>
          <Link href="/" className={`${NAV_CONTRACT.brandText} brand-gradient-text sm:text-[1.05rem]`}>
            RunAsh AI
          </Link>

          <nav className="hidden items-center gap-3 text-[13px] font-medium md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={link.isActive ? NAV_CONTRACT.navLink : `${NAV_CONTRACT.navLink} text-muted-foreground`}
              >
                {link.label}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className={`${NAV_CONTRACT.learnTrigger} text-xs font-medium`}>
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
              <SheetContent
                side="left"
                className={`w-[92%] overflow-y-auto border-r border-primary/20 bg-background p-0 sm:max-w-sm`}
              >
                <SheetHeader className="sr-only">
                  <SheetTitle>Blog navigation</SheetTitle>
                </SheetHeader>
                <div className="border-b border-primary/15 px-4 py-4">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-primary">Explore</p>
                  <p className="pt-1 text-sm text-muted-foreground">Search, recent posts, and topics.</p>
                </div>
                {railContent}
              </SheetContent>
            </Sheet>

            <Button asChild size="sm" className={`site-utility-button hidden md:inline-flex ${NAV_CONTRACT.actionButton}`}>
              <Link href="/search?q=api">Dashboard ↗</Link>
            </Button>

            <div className="hidden md:inline-flex">
              <ThemeToggle />
            </div>

            <Button asChild variant="outline" size="icon" className="rounded-full md:hidden" aria-label="Search posts">
              <Link href="/search">
                <Search className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className={BLOG_UI_LAYOUT.shellFrame}>
        {/* Test contract: className="hidden min-h-[calc(100vh-57px)] w-[292px]" */}
        <aside
          className={`hidden min-h-[calc(100vh-57px)] w-[292px] border-r border-border/60 ${BLOG_UI_SURFACES.mutedCanvas} lg:block lg:shrink-0 xl:w-[320px]`}
        >
          {railContent}
        </aside>

        <main className={BLOG_UI_LAYOUT.shellMainPadding}>
          <div className={BLOG_UI_LAYOUT.shellContentWidth}>{children}</div>
        </main>
      </div>
    </div>
  )
}
