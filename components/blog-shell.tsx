"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, Search, Sun } from "lucide-react"
import { BlogLeftRail } from "@/components/blog-left-rail"
import { Button } from "@/components/ui/button"
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
        onClick: () => onTopicChange(topic),
        active: activeTopic === topic,
      }))}
      className="px-3 py-4 sm:px-4"
    />
  )

  return (
    <div className="min-h-screen bg-muted/35 text-foreground">
      <header className={NAV_CONTRACT.headerShell}>
        <div className={`${NAV_CONTRACT.headerInner} max-w-[1420px] py-2.5 sm:px-5 lg:px-7`}>
          <Link href="/" className={`${NAV_CONTRACT.brandText} sm:text-[1.05rem]`}>
            OpenAI Developers
          </Link>

          <nav className={`${NAV_CONTRACT.desktopNav} text-[13px] font-medium`}>
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
                <Button variant="ghost" size="sm" className={`${NAV_CONTRACT.learnTrigger} text-[13px] font-medium`}>
                  Learn
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/">All posts</Link>
                </DropdownMenuItem>
                {topics.slice(0, 6).map((topic) => (
                  <DropdownMenuItem key={topic} onClick={() => onTopicChange(topic)}>
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
              <Link href="/search?q=api">API Dashboard ↗</Link>
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

      <div className="mx-auto flex w-full max-w-[1560px]">
        {/* Developer note: sizing targets were inferred from the reference and kept to a simple 320/980 split at xl+ to preserve layout stability. */}
        <aside className="hidden min-h-[calc(100vh-57px)] w-[292px] border-r border-border/60 bg-muted/35 lg:block xl:w-[320px]">
          {railContent}
        </aside>

        <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-8 xl:px-10">
          <div className="mx-auto w-full max-w-[900px] xl:max-w-[980px]">{children}</div>
        </main>
      </div>
    </div>
  )
}
