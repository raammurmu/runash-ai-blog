"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Command, Plus, Search, Sparkles, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { blogPosts, getAllCategories } from "@/lib/blog-data"

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [logoError, setLogoError] = React.useState(false)
  const router = useRouter()
  const categories = React.useMemo(() => getAllCategories().slice(0, 4), [])
  const latestPost = React.useMemo(
    () =>
      [...blogPosts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())[0],
    [],
  )

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    if (!query.trim()) return
    router.push(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-[60] w-full border-b transition-all duration-300",
        isScrolled
          ? "border-orange-200/60 bg-background/90 py-2 shadow-sm backdrop-blur-2xl dark:border-orange-900/40"
          : "border-transparent bg-background/60 py-3 backdrop-blur",
      )}
    >
      <div className="container mx-auto flex items-center gap-3 px-4 lg:gap-5">
        <Link href="/" className="group flex items-center gap-3 shrink-0">
          <div className="relative size-10 overflow-hidden rounded-2xl bg-gradient-to-br from-orange-600 to-amber-400 shadow-lg shadow-orange-500/30">
            {!logoError ? (
              <img src="/placeholder-logo.svg" alt="RunAsh logo" className="h-full w-full object-cover" onError={() => setLogoError(true)} />
            ) : (
              <span className="absolute inset-0 grid place-items-center text-base font-black text-white">R</span>
            )}
            <Sparkles className="absolute -right-1 -top-1 size-4 text-amber-200" />
          </div>
          <div className="hidden md:block leading-none">
            <p className="text-lg font-black tracking-tight">RunAsh Blog</p>
            <p className="text-[11px] text-muted-foreground">AI commerce newsroom</p>
          </div>
        </Link>

        <form onSubmit={handleSearch} className="relative hidden flex-1 md:flex">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search posts, topics, or authors"
            className="h-11 rounded-2xl border-orange-100 bg-muted/20 pl-11 pr-12 focus-visible:ring-orange-500/30 dark:border-orange-900/40"
          />
          <div className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-orange-100 bg-background px-2 py-1 text-[10px] font-bold text-muted-foreground dark:border-orange-900/40 lg:flex">
            <Command className="size-3" /> K
          </div>
        </form>

        <nav className="hidden items-center gap-2 lg:flex">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="rounded-full px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-950/50"
            >
              {category.name}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {latestPost && (
            <Link
              href={`/post/${latestPost.slug}`}
              className="hidden items-center gap-1 rounded-full border border-orange-200/70 bg-orange-50/70 px-3 py-1.5 text-xs font-semibold text-orange-700 transition hover:bg-orange-100 lg:flex dark:border-orange-800/50 dark:bg-orange-950/40 dark:text-orange-300"
            >
              <TrendingUp className="size-3.5" /> Trending
            </Link>
          )}
          <Button asChild size="sm" className="rounded-xl bg-orange-600 hover:bg-orange-700">
            <Link href="/create">
              <Plus className="mr-1.5 size-4" /> New
            </Link>
          </Button>
          <div className="rounded-xl border border-orange-100 bg-muted/20 p-1 dark:border-orange-900/40">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
