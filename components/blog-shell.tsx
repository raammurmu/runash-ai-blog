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
        onClick: () => onTopicChange(topic),
        active: activeTopic === topic,
      }))}
      className="px-3 py-4 sm:px-4"
    />
  )

  return (
    <div className="min-h-screen bg-[#efefef] text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
        <div className="mx-auto flex w-full max-w-[1560px] items-center justify-between px-3 py-2.5 sm:px-5 lg:px-7 xl:px-9">
          <Link href="/" className="text-[1.95rem] font-semibold leading-none tracking-tight text-foreground">
            OpenAI Developers
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 gap-1 rounded-lg px-2 text-muted-foreground hover:text-foreground">
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
                <Button variant="outline" size="icon" className="rounded-lg md:hidden" aria-label="Open blog filters">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[92%] overflow-y-auto bg-[#efefef] p-3 sm:p-4 sm:max-w-sm">
                <SheetHeader className="sr-only">
                  <SheetTitle>Blog navigation</SheetTitle>
                </SheetHeader>
                {railContent}
              </SheetContent>
            </Sheet>

            <Button asChild size="sm" className="hidden h-9 rounded-full bg-[#171717] px-5 text-white hover:bg-black md:inline-flex">
              <Link href="/search?q=api">API Dashboard ↗</Link>
            </Button>

            <Button asChild variant="ghost" size="icon" className="hidden rounded-full md:inline-flex" aria-label="Theme settings">
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

      <div className="mx-auto flex w-full max-w-[1560px]">
        {/* Developer note: sizing targets were inferred from the reference and kept to a simple 320/980 split at xl+ to preserve layout stability. */}
        <aside className="hidden min-h-[calc(100vh-57px)] w-[292px] border-r border-border/60 bg-[#efefef] lg:block xl:w-[320px]">
          {railContent}
        </aside>

        <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-8 xl:px-10">
          <div className="mx-auto w-full max-w-[900px] xl:max-w-[980px]">{children}</div>
        </main>
      </div>
    </div>
  )
}
