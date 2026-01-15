"use client"

import { useMemo, useState } from "react"
import { blogPosts } from "@/lib/blog-data"
import { BlogCard } from "@/components/blog-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input" // Assuming you have an Input component
import { List, LayoutGrid, Filter, Flame, Clock, Check, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

type SortKey = "newest" | "popular"

const categories = ["All", "Company", "Research", "Community", "Open Source", "Guide", "Partnerships", "Release"]

export function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [sort, setSort] = useState<SortKey>("newest")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchExpanded, setIsSearchExpanded] = useState(false) // For mobile search expansion

  const posts = useMemo(() => {
    let p = [...blogPosts]

    // Apply category filter
    if (activeCategory !== "All") {
      p = p.filter((post) => post.category === activeCategory)
    }

    // Apply search filter
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase()
      p = p.filter(
        (post) =>
          post.title.toLowerCase().includes(lowerCaseQuery) ||
          post.description.toLowerCase().includes(lowerCaseQuery) ||
          post.category.toLowerCase().includes(lowerCaseQuery)
      )
    }

    // Apply sorting
    sort === "newest"
      ? p.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      : p.sort((a, b) => b.likes - a.likes) // Simplified for example
    return p
  }, [activeCategory, sort, searchQuery])

  return (
    <section className="space-y-6 px-1">
      {/* Header Area */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <h2 className="text-2xl font-bold tracking-tight">Resources</h2>
          <p className="text-sm text-muted-foreground">Insights from the Findley team.</p>
        </div>

        {/* Search Bar - Mobile (Expanded) */}
        <div className={cn(
          "flex items-center gap-2 w-full transition-all duration-300 ease-in-out sm:hidden",
          isSearchExpanded ? "opacity-100 max-h-screen mb-4" : "opacity-0 max-h-0 overflow-hidden"
        )}>
          <Input
            placeholder="Search posts..."
            className="flex-1 border-primary-foreground/20 focus-visible:ring-primary h-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="ghost" size="icon" onClick={() => {
            setIsSearchExpanded(false);
            setSearchQuery(""); // Clear search when collapsing
          }}>
            <X className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>


        {/* Controls: Search (Mobile Icon), View Switcher, Filter Drawer */}
        <div className="flex items-center gap-2 justify-end sm:justify-start">
          {/* Mobile Search Icon */}
          <Button
            variant="ghost"
            size="icon"
            className={cn("sm:hidden", isSearchExpanded && "hidden")} // Hide when expanded
            onClick={() => setIsSearchExpanded(true)}
          >
            <Search className="h-5 w-5 text-muted-foreground" />
          </Button>

          {/* Desktop Search Input */}
          <div className="hidden sm:block">
            <Input
              placeholder="Search posts..."
              className="w-[200px] lg:w-[250px] border-primary-foreground/20 focus-visible:ring-primary h-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Desktop/Tablet View Switcher */}
          <div className="hidden sm:flex rounded-md border p-1 bg-muted/50">
            <Button
              variant={view === "grid" ? "background" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setView("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "list" ? "background" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setView("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Filter Drawer */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="sm:w-auto w-full sm:flex-none">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-[20px] px-6 pb-10 max-h-[90vh]">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-left text-xl font-bold">Filter Posts</SheetTitle>
              </SheetHeader>

              <div className="space-y-8">
                {/* Sort By */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Sort By</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant={sort === "newest" ? "gradient-orange" : "outline"}
                      onClick={() => setSort("newest")}
                      className="justify-start group"
                    >
                      <Clock className={cn("mr-2 h-4 w-4", sort === "newest" && "text-white group-hover:text-white")} /> Newest
                    </Button>
                    <Button
                      variant={sort === "popular" ? "gradient-orange" : "outline"}
                      onClick={() => setSort("popular")}
                      className="justify-start group"
                    >
                      <Flame className={cn("mr-2 h-4 w-4", sort === "popular" && "text-white group-hover:text-white")} /> Popular
                    </Button>
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((c) => (
                      <Badge
                        key={c}
                        variant={activeCategory === c ? "gradient-orange" : "outline"}
                        className="py-2 px-4 cursor-pointer text-sm transition-all duration-200"
                        onClick={() => setActiveCategory(c)}
                      >
                        {c}
                        {activeCategory === c && <Check className="ml-1 h-3 w-3" />}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <SheetFooter className="mt-8">
                <SheetClose asChild>
                  <Button className="w-full h-12 text-lg bg-gradient-to-r from-orange-400 to-amber-500 text-white shadow-lg hover:from-orange-500 hover:to-amber-600">
                    Show {posts.length} Results
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Category Bar (Scrollable) */}
      <div className="flex items-center overflow-x-auto no-scrollbar gap-2 pb-2">
        {categories.map((c) => (
          <Badge
            key={c}
            variant={activeCategory === c ? "gradient-orange" : "outline"}
            className="cursor-pointer whitespace-nowrap transition-all duration-200 px-3 py-1.5 text-sm"
            onClick={() => setActiveCategory(c)}
          >
            {c}
          </Badge>
        ))}
      </div>

      {/* Responsive Grid */}
      <div className={cn(
        "grid gap-6",
        view === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
      )}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <BlogCard key={post.id} post={post} viewMode={view} />
          ))
        ) : (
          <div className="col-span-full text-center py-16 border-2 border-dashed rounded-xl text-muted-foreground">
            <p className="text-lg">No posts found matching your criteria.</p>
            <Button variant="link" onClick={() => { setActiveCategory("All"); setSearchQuery(""); setSort("newest"); }}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </section>
  )
  }
