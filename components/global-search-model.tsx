"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { 
  Search, Clock, Trash2, ArrowRight, Sparkles 
} from "lucide-react"
import { blogPosts } from "@/lib/blog-data"
import { Button } from "@/components/ui/button"

type RecentItem = {
  id: string
  title: string
  slug: string
  emoji: string
}

export function GlobalSearchModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()
  const [recentSearches, setRecentSearches] = React.useState<RecentItem[]>([])

  // Load history on mount
  React.useEffect(() => {
    const saved = localStorage.getItem("findley_recent_searches")
    if (saved) setRecentSearches(JSON.parse(saved))
  }, [])

  // Save to history helper
  const saveToHistory = (item: RecentItem) => {
    const updated = [
      item,
      ...recentSearches.filter((r) => r.id !== item.id),
    ].slice(0, 5) // Keep last 5 items
    setRecentSearches(updated)
    localStorage.setItem("findley_recent_searches", JSON.stringify(updated))
  }

  const clearHistory = (e: React.MouseEvent) => {
    e.stopPropagation()
    setRecentSearches([])
    localStorage.removeItem("findley_recent_searches")
  }

  const handleSelect = (post: any) => {
    saveToHistory({ 
      id: post.id, 
      title: post.title, 
      slug: post.slug, 
      emoji: post.emoji 
    })
    onOpenChange(false)
    router.push(`/post/${post.slug}`)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <div className="flex items-center border-b px-3 dark:border-orange-900/30">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50 text-orange-500" />
        <CommandInput placeholder="Search..." className="h-12 md:h-14" />
      </div>
      
      <CommandList className="max-h-[80vh] md:max-h-[450px]">
        <CommandEmpty className="py-12 text-center text-sm">No results found.</CommandEmpty>

        {/* RECENT SEARCHES SECTION */}
        {recentSearches.length > 0 && (
          <>
            <CommandGroup 
              heading={
                <div className="flex items-center justify-between w-full pr-2">
                  <span>Recent Searches</span>
                  <button 
                    onClick={clearHistory}
                    className="text-[10px] hover:text-orange-600 transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="h-3 w-3" /> Clear
                  </button>
                </div>
              }
            >
              {recentSearches.map((item) => (
                <CommandItem
                  key={`recent-${item.id}`}
                  onSelect={() => {
                    onOpenChange(false)
                    router.push(`/post/${item.slug}`)
                  }}
                  className="flex items-center gap-3 p-3 rounded-xl opacity-70 hover:opacity-100"
                >
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs">{item.emoji}</span>
                  <span className="text-sm font-medium flex-1 truncate">{item.title}</span>
                  <ArrowRight className="h-3 w-3 opacity-30" />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator className="my-2" />
          </>
        )}

        {/* ALL POSTS / RESULTS SECTION */}
        <CommandGroup heading="Results">
          {blogPosts.map((post) => (
            <CommandItem
              key={post.id}
              value={post.title}
              onSelect={() => handleSelect(post)}
              className="flex items-center gap-3 p-3 rounded-xl cursor-pointer group"
            >
              <div className="size-10 rounded-lg bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center text-xl group-aria-selected:bg-orange-500 group-aria-selected:scale-110 transition-all">
                {post.emoji}
              </div>
              <div className="flex flex-col flex-1 overflow-hidden">
                <span className="font-bold text-sm truncate group-aria-selected:text-orange-600 dark:group-aria-selected:text-orange-400 transition-colors">
                  {post.title}
                </span>
                <span className="text-[10px] text-muted-foreground">{post.category}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
