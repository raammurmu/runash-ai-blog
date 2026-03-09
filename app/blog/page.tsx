"use client"

import { Suspense, useMemo, useState } from "react"
import { Header } from "@/components/header"
import { BlogFeed } from "@/components/blog-feed"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { blogPosts } from "@/lib/blog-data"
import { SlidersHorizontal } from "lucide-react"

function BlogFilters({
  searchQuery,
  onSearchChange,
  activeBucket,
  onBucketChange,
  activeTopic,
  onTopicChange,
}: {
  searchQuery: string
  onSearchChange: (value: string) => void
  activeBucket: "all" | "recent"
  onBucketChange: (value: "all" | "recent") => void
  activeTopic: string
  onTopicChange: (value: string) => void
}) {
  const topics = useMemo(() => ["All topics", ...Array.from(new Set(blogPosts.map((post) => post.category)))], [])

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h2 className="text-sm font-medium text-foreground/70">Search</h2>
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search posts"
          className="h-10 rounded-xl border-border/70 bg-background"
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium text-foreground/70">All posts</h2>
        <Button
          type="button"
          variant={activeBucket === "all" ? "default" : "ghost"}
          className="w-full justify-start rounded-xl"
          onClick={() => onBucketChange("all")}
        >
          Browse everything
        </Button>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium text-foreground/70">Recent</h2>
        <Button
          type="button"
          variant={activeBucket === "recent" ? "default" : "ghost"}
          className="w-full justify-start rounded-xl"
          onClick={() => onBucketChange("recent")}
        >
          Latest updates
        </Button>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium text-foreground/70">Topics</h2>
        <div className="space-y-1">
          {topics.map((topic) => (
            <Button
              key={topic}
              type="button"
              variant={activeTopic === topic ? "secondary" : "ghost"}
              className="w-full justify-start rounded-xl text-left"
              onClick={() => onTopicChange(topic)}
            >
              {topic}
            </Button>
          ))}
        </div>
      </section>
    </div>
  )
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeBucket, setActiveBucket] = useState<"all" | "recent">("all")
  const [activeTopic, setActiveTopic] = useState("All topics")

  const orderedPosts = useMemo(
    () => [...blogPosts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()),
    [],
  )

  const recentIds = useMemo(() => new Set(orderedPosts.slice(0, 4).map((post) => post.id)), [orderedPosts])

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return orderedPosts.filter((post) => {
      const matchesQuery =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      const matchesBucket = activeBucket === "all" || recentIds.has(post.id)
      const matchesTopic = activeTopic === "All topics" || post.category === activeTopic

      return matchesQuery && matchesBucket && matchesTopic
    })
  }, [activeBucket, activeTopic, orderedPosts, recentIds, searchQuery])

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950/50">
      <Header />
      <div className="mx-auto flex w-full max-w-[1440px] gap-10 px-4 pb-20 pt-8 lg:px-10 lg:pt-12">
        <aside className="sticky top-20 hidden h-fit w-72 shrink-0 rounded-2xl border border-border/70 bg-background p-6 shadow-sm lg:block">
          <BlogFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeBucket={activeBucket}
            onBucketChange={setActiveBucket}
            activeTopic={activeTopic}
            onTopicChange={setActiveTopic}
          />
        </aside>

        <main className="min-w-0 flex-1">
          <div className="mb-6 flex items-center justify-end lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="rounded-xl bg-background">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="rounded-b-2xl">
                <SheetHeader>
                  <SheetTitle>Filter posts</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <BlogFilters
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    activeBucket={activeBucket}
                    onBucketChange={setActiveBucket}
                    activeTopic={activeTopic}
                    onTopicChange={setActiveTopic}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <Suspense fallback={<div>Loading posts...</div>}>
            <BlogFeed posts={filteredPosts} />
          </Suspense>
        </main>
      </div>
      <Footer />
    </div>
  )
}
