"use client"

import { useMemo, useState, useEffect } from "react"
import { blogPosts, BlogPost } from "@/lib/blog-data"
import { BlogCard } from "@/components/blog-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { List, LayoutGrid, Filter, Flame, Clock, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

type SortKey = "newest" | "popular"

const categories = ["All", "Tutorials", "Product Updates", "AI Research", "Community"]

export function BlogGrid({ onPostSelect }: { onPostSelect: (post: BlogPost) => void }) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [sort, setSort] = useState<SortKey>("newest")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredPosts = useMemo(() => {
    if (!blogPosts) return []

    return blogPosts
      .filter((post) => {
        const matchesCategory = activeCategory === "All" || post.category === activeCategory
        const matchesSearch = 
          !searchQuery || 
          post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
        
        return matchesCategory && matchesSearch
      })
      .sort((a, b) => {
        if (sort === "newest") {
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        }
        const scoreA = (a.likes || 0) + (a.upvotes || 0)
        const scoreB = (b.likes || 0) + (b.upvotes || 0)
        return scoreB - scoreA
      })
  }, [activeCategory, sort, searchQuery])

  if (!mounted) return null

  return (
    <section className="space-y-8 py-12">
      {/* Search & Layout Controls */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-orange-100 pb-8">
        <div>
          <h2 className="text-3xl font-black tracking-tight bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
            Explore Insights
          </h2>
          <p className="text-muted-foreground text-sm mt-1">Discover the latest in AI-powered streaming.</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Animated Search */}
          <div className={cn(
            "relative flex items-center transition-all duration-500 h-11",
            isSearchExpanded ? "w-full sm:w-72" : "w-11 sm:w-72"
          )}>
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "pl-11 pr-10 rounded-2xl border-orange-100 bg-orange-50/30 focus-visible:ring-orange-500 transition-all",
                !isSearchExpanded && "sm:opacity-100 opacity-0"
              )}
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute left-0.5 rounded-2xl hover:bg-transparent"
              onClick={() => setIsSearchExpanded(true)}
            >
              <Search className="h-5 w-5 text-orange-500" />
            </Button>
            {isSearchExpanded && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-0.5 rounded-2xl"
                onClick={() => { setIsSearchExpanded(false); setSearchQuery(""); }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Grid/List Toggle */}
          <div className="hidden md:flex bg-orange-50/50 p-1 rounded-2xl border border-orange-100">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setView("grid")}
              className={cn("rounded-xl h-9 w-9", view === "grid" && "bg-white shadow-sm text-orange-600")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setView("list")}
              className={cn("rounded-xl h-9 w-9", view === "list" && "bg-white shadow-sm text-orange-600")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Filter Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="rounded-2xl border-orange-200 gap-2 font-bold h-11">
                <Filter className="h-4 w-4 text-orange-500" />
                Sort
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-[40px] border-orange-100 h-[60vh]">
              <div className="max-w-md mx-auto pt-4 space-y-10">
                <SheetHeader>
                  <SheetTitle className="text-2xl font-black">Refine Results</SheetTitle>
                </SheetHeader>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-orange-900/40 uppercase tracking-[0.2em]">Rank By</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        variant={sort === "newest" ? "default" : "outline"}
                        onClick={() => setSort("newest")}
                        className={cn("h-14 rounded-2xl", sort === "newest" && "bg-orange-600 hover:bg-orange-700")}
                      >
                        <Clock className="mr-2 h-4 w-4" /> Newest
                      </Button>
                      <Button 
                        variant={sort === "popular" ? "default" : "outline"}
                        onClick={() => setSort("popular")}
                        className={cn("h-14 rounded-2xl", sort === "popular" && "bg-orange-600 hover:bg-orange-700")}
                      >
                        <Flame className="mr-2 h-4 w-4" /> Popular
                      </Button>
                    </div>
                  </div>
                </div>

                <SheetClose asChild>
                  <Button className="w-full bg-orange-600 h-14 rounded-2xl text-lg font-bold">
                    Show {filteredPosts.length} Articles
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Category Scroller */}
      <div className="flex items-center overflow-x-auto gap-3 pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-6 py-2 rounded-2xl text-sm font-bold whitespace-nowrap transition-all border",
              activeCategory === cat
                ? "bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-500/20 scale-105"
                : "bg-white border-orange-100 text-muted-foreground hover:border-orange-300"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Display */}
      <div className={cn(
        "grid gap-8 transition-all duration-700",
        view === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
      )}>
        <AnimatePresence mode="popLayout">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <BlogCard 
                key={post.id} 
                post={post} 
                viewMode={view} 
                onClick={() => onPostSelect(post)}
              />
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-24 text-center bg-orange-50/30 rounded-[3rem] border-2 border-dashed border-orange-200"
            >
              <div className="size-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="size-8 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-orange-900">No matching articles</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your search or category filters.</p>
              <Button 
                variant="link" 
                className="mt-4 text-orange-600 font-bold" 
                onClick={() => {setSearchQuery(""); setActiveCategory("All")}}
              >
                Reset all filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
        }
