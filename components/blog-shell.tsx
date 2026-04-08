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
import { BLOG_HEADER_NAV_LINKS, NAV_CONTRACT } from "@/components/nav-config"

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

  const navLinks = BLOG_HEADER_NAV_LINKS.map((link) => ({
    ...link,
    isActive:
      (link.href === "/" && pathname === "/") ||
      (link.href === "/search?q=api" && pathname.startsWith("/search")),
  }))

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
      className="px-3 py-3 sm:px-4"
    />
  )

  return (
    <div className={`min-h-screen text-foreground ${BLOG_UI_SURFACES.mutedCanvas}`}>
      <header className={NAV_CONTRACT.headerShell}>
        <div className={`${NAV_CONTRACT.headerInner} max-w-[1420px] py-2.5 sm:px-5 lg:px-6`}>
          <Link href="/" className={`${NAV_CONTRACT.brandText} sm:text-[1.05rem]`}>
            RunAsh AI 
          </Link>

          <nav className={`${NAV_CONTRACT.desktopNav} text-xs font-medium`}>
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
                <Button variant="outline" size="icon" className={`${NAV_CONTRACT.mobileIconButton} md:hidden`} aria-label="Open blog filters">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[92%] overflow-y-auto bg-background p-3 sm:max-w-sm sm:p-4">
                <SheetHeader className="sr-only">
                  <SheetTitle>Blog navigation</SheetTitle>
                </SheetHeader>
                {railContent}
              </SheetContent>
            </Sheet>

            <Button asChild size="sm" className={`site-utility-button hidden md:inline-flex ${NAV_CONTRACT.actionButton}`}>
              <Link href="/search?q=api">Dashboard ↗</Link>
            </Button>

            <Button asChild variant="ghost" size="icon" className={`hidden border-0 md:inline-flex ${NAV_CONTRACT.utilityIconButton}`} aria-label="Theme settings">
              <Link href="/settings">
                <Sun className="h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="icon" className={`${NAV_CONTRACT.mobileIconButton} md:hidden`} aria-label="Search posts">
              <Link href="/search">
                <Search className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className={BLOG_UI_LAYOUT.shellFrame}>
        <aside className={`hidden min-h-[calc(100vh-57px)] border-r border-border/50 ${BLOG_UI_SURFACES.mutedCanvas} lg:block`}>
          {railContent}
        </aside>

        <main className={BLOG_UI_LAYOUT.shellMainPadding}>
          <div className={BLOG_UI_LAYOUT.shellContentWidth}>{children}</div>
        </main>
      </div>
    </div>
  )
}
