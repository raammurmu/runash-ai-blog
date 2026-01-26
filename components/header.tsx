"use client"

import * as React from "react"
import Link from "next/link"
import { 
  Search, Bell, Plus, User, Settings, LogOut, 
  Heart, Menu, Loader2, BookOpen, X, ChevronLeft, Command 
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion, AnimatePresence } from "framer-motion"
import { MOCK_POSTS } from "@/lib/data" // Importing our real data

export function Header() {
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<any[]>([])
  const [isPending, setIsPending] = React.useState(false)
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)

  // Keyboard Shortcut Logic (⌘K or Ctrl+K)
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsSearchOpen((prev) => !prev)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Local Search Logic using MOCK_POSTS
  React.useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    setIsPending(true)
    const timeout = setTimeout(() => {
      const filtered = MOCK_POSTS.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
      setResults(filtered)
      setIsPending(false)
    }, 300)
    return () => clearTimeout(timeout)
  }, [query])

  return (
    <header className="sticky top-0 z-[60] w-full border-b border-orange-100/20 bg-background/60 backdrop-blur-2xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-2">
        
        {/* LOGO: RunAsh Gradient Brand */}
        <div className="flex items-center gap-4 shrink-0">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="size-10 rounded-2xl bg-gradient-to-br from-orange-600 via-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-lg tracking-tighter">RA</span>
            </div>
            <span className="hidden font-black text-2xl lg:inline-block tracking-tight bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              RunAsh
            </span>
          </Link>
        </div>

        {/* SEARCH: Desktop with Kbd Shortcut Hint */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground size-4 group-focus-within:text-orange-500 transition-colors" />
          <Input 
            placeholder="Search insights..." 
            className="pl-11 pr-12 bg-muted/30 border-orange-100/50 dark:border-orange-900/30 rounded-2xl focus-visible:ring-orange-500 focus-visible:bg-background"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1 px-2 py-0.5 rounded border bg-background text-[10px] font-medium text-muted-foreground">
            <Command className="size-2" /> K
          </kbd>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden rounded-2xl h-11 w-11 bg-orange-50/50 dark:bg-orange-950/20"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="size-5 text-orange-600" />
          </Button>

          <Button className="hidden sm:flex gap-2 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white border-none shadow-md shadow-orange-500/10" asChild>
            <Link href="/create"><Plus className="size-4" /> New Post</Link>
          </Button>

          <div className="hidden sm:flex items-center gap-2">
            <NotificationCenter />
            <ThemeToggle />
          </div>
          <UserMenu />
          <MobileNav />
        </div>
      </div>

      {/* SEARCH OVERLAY (Universal for Mobile, can be Desktop Modal) */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[70] bg-background/95 backdrop-blur-xl"
          >
            {/* ... Search Overlay Content ... */}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
