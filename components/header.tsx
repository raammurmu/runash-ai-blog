"use client"

import * as React from "react"
import Link from "next/link"
import { 
  Search, Bell, Plus, User, Settings, 
  Heart, Menu, Loader2, BookOpen, ChevronLeft, Command
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState([])
  const [isPending, setIsPending] = React.useState(false)
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)

  // 1. Keyboard Shortcut (⌘K)
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsSearchOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // 2. Search Logic (Debounced)
  React.useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    const delayDebounceFn = setTimeout(async () => {
      setIsPending(true)
      try {
        // Mocking API call - replace with your actual endpoint
        const mockResults = [
          { id: '1', title: 'Future of AI', category: 'AI RESEARCH', type: 'post' },
          { id: '2', title: 'Ram Murmu', category: 'AUTHOR', type: 'user' },
        ].filter(i => i.title.toLowerCase().includes(query.toLowerCase()))
        setResults(mockResults)
      } catch (error) { console.error(error) } finally { setIsPending(false) }
    }, 300)
    return () => clearTimeout(delayDebounceFn)
  }, [query])

  return (
    <header className="sticky top-0 z-[60] w-full border-b bg-background/80 backdrop-blur-xl transition-all">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group transition-transform active:scale-95">
          <div className="size-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:rotate-3 transition-transform">
            <span className="text-white font-black text-sm">RA</span>
          </div>
          <span className="hidden font-black text-xl lg:inline-block tracking-tighter text-orange-600 dark:text-orange-500">RunAsh</span>
        </Link>

        {/* SEARCH - DESKTOP */}
        <div className="hidden md:flex flex-1 max-w-md relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4 group-focus-within:text-orange-500 transition-colors" />
          <Input 
            placeholder="Search insights..." 
            className="pl-10 bg-muted/50 border-orange-100/50 dark:border-orange-900/50 rounded-full focus-visible:ring-orange-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1 bg-background border rounded px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            <Command className="size-2.5" /> K
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-1 sm:gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden rounded-full active:scale-90"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="size-5" />
          </Button>

          <Button variant="default" size="sm" className="hidden sm:flex gap-2 rounded-full bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-500/20" asChild>
            <Link href="/create"><Plus className="size-4" /> Create</Link>
          </Button>

          <NotificationCenter />
          <div className="hidden sm:block"><ThemeToggle /></div>
          <UserMenu />
          <MobileNav />
        </div>
      </div>

      {/* MOBILE SEARCH OVERLAY (Same as your logic but with smoother transitions) */}
      {/* ... (Search Overlay JSX) ... */}
    </header>
  )
}
