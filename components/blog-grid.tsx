"use client"

import { useMemo, useState, useEffect } from "react"
 
import { blogPosts } from "@/lib/blog-data"
import type { BlogPost } from "@/lib/types"

import { blogPosts, getAllCategories } from "@/lib/blog-data"

import { BlogCard } from "@/components/blog-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { List, LayoutGrid, Filter, Flame, Clock, Check, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

type SortKey = "newest" | "popular"

export function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts)
  const [sort, setSort] = useState<SortKey>("newest")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Fix hydration mismatch errors by ensuring component is mounted
  useEffect(() => {
    setMounted(true)
  }, [])

 
  useEffect(() => {
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

  const categories = useMemo(() => {
    const categorySet = new Set(posts.filter((post) => post.status !== "draft").map((post) => post.category))
    return ["All", ...Array.from(categorySet)]
  }, [posts])

  const categories = useMemo(() => {
    return ["All", ...getAllCategories().map((category) => category.name)]
  }, [])


  const filteredPosts = useMemo(() => {
    if (!posts) return []

    return posts
      .filter((post) => post.status !== "draft")
      .filter((post) => {
        const matchesCategory = activeCategory === "All" || post.category === activeCategory
        const matchesSearch = 
          !searchQuery || 
          post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content?.toLowerCase().includes(searchQuery.toLowerCase())
        
        return matchesCategory && matchesSearch
      })
      .sort((a, b) => {
        if (sort === "newest") {
          return new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
        }
        // Popularity: Likes + Upvotes (with safety check)
        const scoreA = (a.likes || 0) + (a.upvotes || 0)
        const scoreB = (b.likes || 0) + (b.upvotes || 0)
        return scoreB - scoreA
      })
  }, [activeCategory, sort, searchQuery, posts])

  if (!mounted) return null // Prevent hydration flash

  return (
    <section className="space-y-6 px-2 md:px-4 max-w-7xl mx-auto">
      {/* Header & Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className={cn("transition-all duration-300", isSearchExpanded ? "hidden sm:block" : "block")}>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 dark:from-orange-400 dark:via-orange-300 dark:to-yellow-300 text-transparent bg-clip-text">
            Explore
          </h2>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Animated Search Bar */}
          <div className={cn(
            "relative flex items-center transition-all duration-500 ease-in-out h-10 overflow-hidden",
            isSearchExpanded ? "w-full sm:w-64" : "w-10 sm:w-64"
          )}>
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "pl-10 pr-10 border-orange-200 focus-visible:ring-orange-500 transition-all duration-300",
                !isSearchExpanded && "sm:opacity-100 opacity-0 pointer-events-none sm:pointer-events-auto"
              )}
            />
            <Search 
              className="absolute left-3 h-4 w-4 text-orange-500 cursor-pointer" 
              onClick={() => setIsSearchExpanded(true)}
            />
            {isSearchExpanded && (
              <X 
                className="absolute right-3 h-4 w-4 text-muted-foreground cursor-pointer hover:text-orange-500" 
                onClick={() => { setIsSearchExpanded(false); setSearchQuery(""); }}
              />
            )}
          </div>

          {/* Desktop View Switcher */}
          <div className="hidden md:flex rounded-lg border border-orange-100 p-1 bg-orange-50/30">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setView("grid")}
              className={cn("h-8 w-8 p-0", view === "grid" && "bg-white shadow-sm text-orange-600")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setView("list")}
              className={cn("h-8 w-8 p-0", view === "list" && "bg-white shadow-sm text-orange-600")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Filter Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="border-orange-200 hover:bg-orange-50">
                <Filter className="h-4 w-4 mr-2 text-orange-500" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-[30px] border-orange-100">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-xl">Customize Feed</SheetTitle>
              </SheetHeader>
              
              <div className="space-y-8 pb-8">
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-orange-900/70 uppercase tracking-widest">Sort By</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant={sort === "newest" ? "default" : "outline"}
                      onClick={() => setSort("newest")}
                      className={cn(sort === "newest" && "bg-gradient-to-r from-orange-500 to-amber-500 border-none")}
                    >
                      <Clock className="mr-2 h-4 w-4" /> Newest
                    </Button>
                    <Button 
                      variant={sort === "popular" ? "default" : "outline"}
                      onClick={() => setSort("popular")}
                      className={cn(sort === "popular" && "bg-gradient-to-r from-orange-500 to-amber-500 border-none")}
                    >
                      <Flame className="mr-2 h-4 w-4" /> Popular
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-orange-900/70 uppercase tracking-widest">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((c) => (
                      <Badge
                        key={c}
                        onClick={() => setActiveCategory(c)}
                        className={cn(
                          "px-4 py-2 cursor-pointer transition-all border-orange-100",
                          activeCategory === c 
                            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white" 
                            : "bg-white text-orange-900 hover:bg-orange-50"
                        )}
                      >
                        {c}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <SheetClose asChild>
                <Button className="w-full bg-gradient-to-r from-orange-600 to-amber-500 h-12 rounded-xl text-lg shadow-lg shadow-orange-200">
                  View {filteredPosts.length} Results
                </Button>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Horizontal Category Scroller */}
      <div className="flex items-center overflow-x-auto gap-2 pb-4 no-scrollbar -mx-2 px-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all",
              activeCategory === cat
                ? "bg-orange-100 text-orange-700 ring-1 ring-orange-300"
                : "text-muted-foreground hover:text-orange-600"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results Grid */}
      <div className={cn(
        "grid gap-6 transition-all duration-500",
        view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
      )}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} viewMode={view} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-orange-50/50 rounded-3xl border-2 border-dashed border-orange-200">
            <p className="text-orange-900/60 font-medium">No matches found for your search.</p>
            <Button variant="link" className="text-orange-600" onClick={() => {setSearchQuery(""); setActiveCategory("All")}}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
