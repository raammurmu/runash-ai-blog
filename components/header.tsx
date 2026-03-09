"use client"

import * as React from "react"
import Link from "next/link"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Home", href: "/" },
  { label: "API", href: "/search?q=api" },
  { label: "Codex", href: "/search?q=codex" },
  { label: "ChatGPT", href: "/search?q=chatgpt" },
  { label: "Learn", href: "/blog" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "site-header sticky top-0 z-[60] w-full border-b border-transparent transition-all duration-200",
        isScrolled ? "site-header--scrolled" : "site-header--top",
      )}
    >
      <div className="mx-auto flex h-11 w-full max-w-[1180px] items-center justify-between gap-3 px-4 md:px-6">
        <div className="flex min-w-0 flex-1 items-center">
          <Link href="/" className="site-wordmark inline-flex items-center">
            RunAsh
          </Link>
        </div>

        <nav className="hidden items-center justify-center gap-0.5 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="site-nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-1.5">
          <Button variant="outline" className="h-8 px-2.5 text-xs text-muted-foreground" asChild>
            <Link href="/search">
              <Search className="mr-1.5 size-3.5" />
              Search
            </Link>
          </Button>

          <Button className="site-utility-button h-8 px-2.5 text-xs font-medium" asChild>
            <Link href="/create">
              <Plus className="mr-1.5 size-3.5" />
              New Post
            </Link>
          </Button>

          <div className="site-theme-toggle-wrap">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
