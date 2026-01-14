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
import { List, LayoutGrid, Filter, Flame, Clock, Check } from "lucide-react"
import { cn } from "@/lib/utils"

type SortKey = "newest" | "popular"

const categories = ["All", "Company", "Research", "Community", "Open Source", "Guide", "Partnerships", "Release"]

export function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [sort, setSort] = useState<SortKey>("newest")
  const [view, setView] = useState<"grid" | "list">("grid")

  const posts = useMemo(() => {
    let p = [...blogPosts]
    if (activeCategory !== "All") {
      p = p.filter((post) => post.category === activeCategory)
    }
    sort === "newest" 
      ? p.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      : p.sort((a, b) => b.likes - a.likes) // Simplified for example
    return p
  }, [activeCategory, sort])

  return (
    <section className="space-y-6 px-1">
      {/* Header Area */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Resources</h2>
          <p className="text-sm text-muted-foreground">Insights from the Findley team.</p>
        </div>

        <div className="flex items-center gap-2">
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
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-[20px] px-6 pb-10">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-left">Filter Posts</SheetTitle>
              </SheetHeader>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Sort By</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant={sort === "newest" ? "default" : "outline"} 
                      onClick={() => setSort("newest")}
                      className="justify-start"
                    >
                      <Clock className="mr-2 h-4 w-4" /> Newest
                    </Button>
                    <Button 
                      variant={sort === "popular" ? "default" : "outline"} 
                      onClick={() => setSort("popular")}
                      className="justify-start"
                    >
                      <Flame className="mr-2 h-4 w-4" /> Popular
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((c) => (
                      <Badge
                        key={c}
                        variant={activeCategory === c ? "default" : "outline"}
                        className="py-2 px-4 cursor-pointer text-sm"
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
                  <Button className="w-full h-12 text-lg">Show {posts.length} Results</Button>
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
            variant={activeCategory === c ? "default" : "outline"}
            className="cursor-pointer whitespace-nowrap transition-all hover:bg-primary hover:text-primary-foreground"
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
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} viewMode={view} />
        ))}
      </div>
    </section>
  )
}
