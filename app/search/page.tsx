"use client"

import type React from "react"

import { useMemo, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { searchPosts } from "@/lib/blog-data"
import { Header } from "@/components/header"
import { BlogCard } from "@/components/blog-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function SearchPage() {
  const params = useSearchParams()
  const router = useRouter()
  const [q, setQ] = useState(params.get("q") ?? "")

  const results = useMemo(() => (q.trim() ? searchPosts(q) : []), [q])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-5xl px-6 py-8">
        <h1 className="mb-4 text-2xl font-bold">Search</h1>
        <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search posts, tags, or authors..."
              className="pl-9"
            />
          </div>
          <Button type="submit" className="shadow-sm">
            Search
          </Button>
        </form>

        {q.trim().length === 0 ? (
          <div className="text-sm text-muted-foreground">Type to search the blog.</div>
        ) : results.length === 0 ? (
          <div className="text-sm text-muted-foreground">No results found for "{q}".</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
