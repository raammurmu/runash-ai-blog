"use client"

import { useMemo, useState, useEffect } from "react"
import { blogPosts, getAllCategories } from "@/lib/blog-data"
import { BlogCard } from "@/components/blog-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { List, LayoutGrid, Filter, Flame, Clock, Search } from "lucide-react"
import { cn } from "@/lib/utils"

type SortKey = "newest" | "popular"

export function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [sort, setSort] = useState<SortKey>("newest")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)

  // Fix hydration mismatch errors by ensuring component is mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  const categories = useMemo(() => {
    return ["All", ...getAllCategories().map((category) => category.name)]
  }, [])

  const filteredPosts = useMemo(() => {
    if (!blogPosts) return []

    return blogPosts
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
  }, [activeCategory, sort, searchQuery])

  if (!mounted) return null // Prevent hydration flash

  return (
    <section className="space-y-6 px-2 md:px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 dark:from-orange-400 dark:via-orange-300 dark:to-yellow-300 text-transparent bg-clip-text">
            Explore
          </h2>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto sm:justify-end">
          {/* Tablet/Desktop Controls */}
          <div className="hidden sm:flex items-center gap-2 w-full flex-wrap justify-end">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-500" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-orange-200 focus-visible:ring-orange-500"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                    activeCategory === cat
                      ? "bg-orange-100 text-orange-700 ring-1 ring-orange-300"
                      : "text-muted-foreground hover:text-orange-600"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex rounded-lg border border-orange-100 p-1 bg-orange-50/30">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSort("newest")}
                className={cn("h-8 px-3", sort === "newest" && "bg-white shadow-sm text-orange-600")}
              >
                <Clock className="h-4 w-4 mr-1" /> Newest
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSort("popular")}
                className={cn("h-8 px-3", sort === "popular" && "bg-white shadow-sm text-orange-600")}
              >
                <Flame className="h-4 w-4 mr-1" /> Popular
              </Button>
            </div>
          </div>

          {/* Desktop View Switcher */}
          <div className="hidden lg:flex rounded-lg border border-orange-100 p-1 bg-orange-50/30">
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
              <Button variant="outline" size="sm" className="sm:hidden border-orange-200 hover:bg-orange-50">
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
                  <h4 className="text-sm font-semibold text-orange-900/70 uppercase tracking-widest">Search</h4>
                  <Input
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-orange-200 focus-visible:ring-orange-500"
                  />
                </div>

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
          <div className="col-span-full text-center py-12 sm:py-16 px-4 bg-orange-50/50 rounded-3xl border-2 border-dashed border-orange-200">
            <p className="text-orange-900/70 font-medium text-sm sm:text-base max-w-xs sm:max-w-md mx-auto">
              No results match your current filters. Try another keyword or reset your category and sorting options.
            </p>
            <Button variant="link" className="text-orange-600" onClick={() => {setSearchQuery(""); setActiveCategory("All")}}>
              Reset filters
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
