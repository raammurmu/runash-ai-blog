"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Loader2, BookOpen, User, Hash } from "lucide-react"
import { Input } from "@/components/ui/input"

export function DynamicSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // 1. Don't search if query is too short
    if (query.length < 2) {
      setResults([])
      setIsOpen(false)
      return
    }

    // 2. Setup Debounce timer
    const timer = setTimeout(async () => {
      setIsLoading(true)
      setIsOpen(true)
      try {
        // Replace with your actual API endpoint
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data.results || [])
      } catch (error) {
        console.error("Search failed:", error)
      } finally {
        setIsLoading(false)
      }
    }, 300) // 300ms delay

    return () => clearTimeout(timer)
  }, [query])

  return (
    <div className="relative w-full max-w-sm hidden md:block">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
        <Input 
          placeholder="Search articles..." 
          className="pl-9 bg-muted/50 focus-visible:bg-background transition-all"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && setIsOpen(true)}
          // Close dropdown when clicking outside (simple version)
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 size-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-popover border rounded-xl shadow-xl p-2 z-50 overflow-hidden animate-in fade-in zoom-in-95">
          {results.length > 0 ? (
            results.map((item) => (
              <Link 
                key={item.id} 
                href={item.url}
                className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg transition-colors group"
              >
                <div className="size-8 rounded bg-muted flex items-center justify-center group-hover:bg-background">
                  {item.type === 'post' ? <BookOpen className="size-4" /> : <User className="size-4" />}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <p className="text-[10px] text-muted-foreground uppercase">{item.category || item.username}</p>
                </div>
              </Link>
            ))
          ) : !isLoading && (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  )
}
