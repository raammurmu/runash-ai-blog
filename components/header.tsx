"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Plus, Sparkles, Command } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { blogPosts } from "@/lib/blog-data"
import type { BlogPost } from "@/lib/types"

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const router = useRouter()
  const [posts, setPosts] = React.useState<BlogPost[]>(blogPosts)
  const categories = React.useMemo(() => {
    const categorySet = new Set(posts.filter((post) => post.status !== "draft").map((post) => post.category))
    return Array.from(categorySet).slice(0, 4).map((name) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
    }))
  }, [posts])

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts")
        if (!response.ok) return
        const data = await response.json()
        setPosts(Array.isArray(data) ? data : blogPosts)
      } catch {
        setPosts(blogPosts)
      }
    }
    fetchPosts()
  }, [])

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    if (!query.trim()) return
    router.push(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <header className={cn(
      "sticky top-0 z-[60] w-full transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-2xl border-b py-2" : "bg-transparent py-4"
    )}>
      <div className="container mx-auto flex h-14 items-center justify-between px-4 gap-4">
        
        <div className="flex items-center gap-6 shrink-0">
          <Link href="/" className="group flex items-center gap-3 transition-transform hover:scale-105">
            <div className="relative size-11 flex items-center justify-center">
              <img src="/images/runash-logo.svg" alt="RunAsh logo" className="h-11 w-11" />
              <Sparkles className="absolute -top-1 -right-1 size-4 text-orange-500 fill-white" />
            </div>
            <span className="hidden font-black text-2xl lg:inline-block tracking-tighter bg-foreground">
              RunAsh
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-4 text-sm font-semibold text-muted-foreground">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="transition-colors hover:text-orange-600"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>

        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground pointer-events-none group-focus-within:text-orange-500 transition-colors">
            <Search className="size-4" />
          </div>
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search posts, tags, or authors..."
            className="pl-12 pr-12 h-11 bg-muted/30 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-orange-500/20 transition-all text-base"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 rounded-md border bg-background/50 text-[10px] font-bold text-muted-foreground">
            <Command className="size-3" /> K
          </div>
        </form>

        <div className="flex items-center gap-3">
          <Button 
            className="hidden sm:flex rounded-2xl bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-600/20 font-bold active:scale-95 transition-all" 
            asChild
          >
            <Link href="/create"><Plus className="size-4 mr-2" /> New Post</Link>
          </Button>

          <div className="flex items-center bg-muted/30 p-1.5 rounded-2xl gap-1">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
