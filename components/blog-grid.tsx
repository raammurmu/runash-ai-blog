"use client"

import { useState, useEffect } from "react"
import { BlogCard } from "./blog-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { blogPosts } from "@/lib/blog-data"
import type { BlogPost } from "@/lib/types"
import { Filter, Grid, List } from "lucide-react"

export function BlogGrid() {
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("latest")
  const [filterCategory, setFilterCategory] = useState("all")
  const [loading, setLoading] = useState(false)

  const categories = Array.from(new Set(blogPosts.map((post) => post.category)))

  useEffect(() => {
    setLoading(true)
    let filteredPosts = [...blogPosts]

    // Filter by category
    if (filterCategory !== "all") {
      filteredPosts = filteredPosts.filter((post) => post.category === filterCategory)
    }

    // Sort posts
    switch (sortBy) {
      case "latest":
        filteredPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        break
      case "popular":
        filteredPosts.sort((a, b) => b.likes - a.likes)
        break
      case "trending":
        filteredPosts.sort((a, b) => b.upvotes - a.upvotes)
        break
    }

    setPosts(filteredPosts)
    setLoading(false)
  }, [sortBy, filterCategory])

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Latest Posts</h2>
          <p className="text-muted-foreground">
            {posts.length} posts {filterCategory !== "all" && `in ${filterCategory}`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="trending">Trending</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      ) : (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} viewMode={viewMode} />
          ))}
        </div>
      )}

      {posts.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found for the selected filters.</p>
          <Button
            variant="outline"
            onClick={() => {
              setFilterCategory("all")
              setSortBy("latest")
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </section>
  )
}
