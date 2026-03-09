"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import type { ApiSearchResponse, SearchResultItem } from "@/lib/types"
import { Header } from "@/components/header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import Link from "next/link"

export default function SearchPage() {
  const params = useSearchParams()
  const router = useRouter()
  const [q, setQ] = useState(params.get("q") ?? "")
  const [results, setResults] = useState<SearchResultItem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const currentQ = params.get("q") ?? ""
    setQ(currentQ)

    if (!currentQ.trim()) {
      setResults([])
      return
    }

    let cancelled = false
    const load = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(currentQ)}`, { cache: "no-store" })
        if (!res.ok) {
          throw new Error("Search failed")
        }
        const data: ApiSearchResponse = await res.json()
        if (!cancelled) setResults(data.results)
      } catch {
        if (!cancelled) setResults([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [params])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(q.trim())}`)
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
        ) : loading ? (
          <div className="text-sm text-muted-foreground">Searching…</div>
        ) : results.length === 0 ? (
          <div className="text-sm text-muted-foreground">No results found for "{q}".</div>
        ) : (
          <div className="space-y-3">
            {results.map((item) => (
              <Link key={`${item.type}-${item.id}`} href={item.url} className="block rounded-lg border p-4 hover:bg-muted/40">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{item.type}</div>
                <div className="font-medium">{item.title}</div>
                {item.subtitle ? <div className="text-sm text-muted-foreground">{item.subtitle}</div> : null}
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
