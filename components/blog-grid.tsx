"use client"

import { useMemo, useState } from "react"
import { blogPosts } from "@/lib/blog-data"
import { BlogCard } from "@/components/blog-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { List, LayoutGrid, Filter, Flame, Clock } from "lucide-react"

type SortKey = "newest" | "popular"

const categories = [
  "All",
  "Live Streaming",
  "AI Platform",
  "Live Shopping",
  "API Platform",
  "Payment Systems",
  "Chat Platform",
  "Grocery Store",
]

export function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [sort, setSort] = useState<SortKey>("newest")
  const [view, setView] = useState<"grid" | "list">("grid")

  const posts = useMemo(() => {
    let p = [...blogPosts]
    if (activeCategory !== "All") {
      p = p.filter((post) => post.category === activeCategory)
    }
    if (sort === "newest") {
      p.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    } else {
      // simple popularity heuristic
      p.sort((a, b) => b.upvotes + b.likes * 0.6 + b.comments * 0.4 - (a.upvotes + a.likes * 0.6 + a.comments * 0.4))
    }
    return p
  }, [activeCategory, sort])

  return (
    <section id="latest" className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Latest</Badge>
          <h2 className="text-xl font-semibold">Explore posts</h2>
        </div>

        <div className="flex items-center gap-2">
          <Tabs value={sort} onValueChange={(v) => setSort(v as SortKey)} className="hidden md:block">
            <TabsList>
              <TabsTrigger value="newest">
                <Clock className="mr-2 h-4 w-4" />
                Newest
              </TabsTrigger>
              <TabsTrigger value="popular">
                <Flame className="mr-2 h-4 w-4" />
                Popular
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex rounded-md border p-1">
            <Button
              variant={view === "grid" ? "secondary" : "ghost"}
              size="sm"
              className="shadow-sm"
              onClick={() => setView("grid")}
            >
              <LayoutGrid className="mr-2 h-4 w-4" />
              Grid
            </Button>
            <Button
              variant={view === "list" ? "secondary" : "ghost"}
              size="sm"
              className="shadow-sm"
              onClick={() => setView("list")}
            >
              <List className="mr-2 h-4 w-4" />
              List
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge
          variant={activeCategory === "All" ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setActiveCategory("All")}
        >
          All
        </Badge>
        {categories
          .filter((c) => c !== "All")
          .map((c) => (
            <Badge
              key={c}
              variant={activeCategory === c ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setActiveCategory(c)}
            >
              {c}
            </Badge>
          ))}
        <Button variant="ghost" size="sm" className="ml-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} viewMode="grid" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} viewMode="list" />
          ))}
        </div>
      )}
    </section>
  )
}
