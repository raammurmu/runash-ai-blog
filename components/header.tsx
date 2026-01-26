"use client"

import * as React from "react"
import Link from "next/link"
import { 
  Search, Bell, Plus, User, Settings, LogOut, 
  Heart, Menu, Loader2, BookOpen, X, ChevronLeft,
  Moon, Sun, Laptop
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle 
} from "@/components/ui/sheet"
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

// --- Types ---
interface SearchResult {
  id: string
  title: string
  category: string
  type: 'post' | 'author' | 'guide'
}

export default function Header() {
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<SearchResult[]>([])
  const [isPending, setIsPending] = React.useState(false)
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const searchInputRef = React.useRef<HTMLInputElement>(null)

  // 1. Keyboard Shortcut (⌘K)
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        if (window.innerWidth < 768) {
          setIsSearchOpen(true)
        } else {
          searchInputRef.current?.focus()
        }
      }
      if (e.key === "Escape") setIsSearchOpen(false)
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // 2. Debounced Search Logic
  React.useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsPending(true)
      try {
        // Replace with your actual API endpoint
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        if (res.ok) {
          const data = await res.json()
          setResults(data)
        }
      } catch (error) {
        console.error("Search error:", error)
      } finally {
        setIsPending(false)
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [query])

  return (
    <header className="sticky top-0 z-[60] w-full border-b bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-2">
        
        {/* LOGO */}
        <div className="flex items-center gap-4 shrink-0">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="size-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-sm tracking-tighter">RA</span>
            </div>
            <span className="hidden font-black text-xl lg:inline-block tracking-tight text-orange-600 dark:text-orange-500">
              RunAsh
            </span>
          </Link>
        </div>

        {/* SEARCH - DESKTOP */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4 group-focus-within:text-orange-500 transition-colors" />
          <Input 
            ref={searchInputRef}
            type="search"
            placeholder="Search resources... (⌘K)" 
            className="pl-10 bg-muted/50 border-orange-100 dark:border-orange-900/50 rounded-full focus-visible:ring-orange-500 transition-all"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-1 sm:gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden rounded-full h-10 w-10"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Open Search"
          >
            <Search className="size-5" />
          </Button>

          <Button variant="outline" size="sm" className="hidden sm:flex gap-2 rounded-full border-orange-200 hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors" asChild>
            <Link href="/create">
              <Plus className="size-4 text-orange-500" /> 
              <span>New Post</span>
            </Link>
          </Button>

          <NotificationCenter />
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <UserMenu />
          <MobileNav />
        </div>
      </div>

      {/* MOBILE SEARCH OVERLAY */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[70] bg-background animate-in fade-in slide-in-from-bottom-4 duration-200 md:hidden">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 p-4 border-b">
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                <ChevronLeft className="size-6" />
              </Button>
              <div className="flex-1 relative">
                <Input 
                  autoFocus
                  type="search"
                  placeholder="Search RunAsh..."
                  className="w-full pl-10 h-11 bg-muted/50 rounded-xl border-none text-base focus-visible:ring-1 focus-visible:ring-orange-500"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {isPending ? (
                <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                  <Loader2 className="size-8 animate-spin mb-2 text-orange-500" />
                  <p className="text-sm">Searching...</p>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-3">
                  {results.map((item) => (
                    <Link 
                      key={item.id} 
                      href={`/blog/${item.id}`} 
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-4 p-3 rounded-2xl bg-muted/30 active:scale-[0.98] transition-all"
                    >
                      <div className="size-11 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
                        {item.type === 'post' ? <BookOpen className="size-5" /> : <User className="size-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate">{item.title}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.category}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : query.length > 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                  <p>No results for <span className="font-bold text-foreground">"{query}"</span></p>
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="size-16 bg-orange-50 dark:bg-orange-950/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="size-8 text-orange-500/50" />
                  </div>
                  <p className="text-muted-foreground font-medium">Search for tutorials, research, or authors</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden rounded-full h-10 w-10 bg-orange-50 dark:bg-orange-950/20 text-orange-600 ml-1">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[85%] sm:w-[380px] rounded-l-[30px] p-0 overflow-hidden border-none shadow-2xl">
        <SheetHeader className="p-8 text-left bg-gradient-to-br from-orange-600 to-amber-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 size-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <SheetTitle className="text-white text-3xl font-black relative z-10">RunAsh</SheetTitle>
          <p className="text-orange-100 text-sm relative z-10">AI-Powered Streaming Insights</p>
        </SheetHeader>
        <div className="p-6 space-y-2">
           <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4 px-2">Menu</p>
           <MobileNavItem href="/create" icon={Plus} label="Create Post" />
           <MobileNavItem href="/favorites" icon={Heart} label="My Favorites" />
           <MobileNavItem href="/settings" icon={Settings} label="Settings" />
           <div className="pt-6 mt-6 border-t border-orange-100 dark:border-orange-900/30">
             <div className="flex items-center justify-between px-4 py-2 bg-muted/50 rounded-2xl">
               <span className="text-sm font-bold">Theme</span>
               <ThemeToggle />
             </div>
           </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function MobileNavItem({ href, icon: Icon, label }: { href: string, icon: any, label: string }) {
  return (
    <Button variant="ghost" className="w-full justify-start gap-4 rounded-2xl h-14 text-base font-bold hover:bg-orange-50 dark:hover:bg-orange-950/20 active:scale-95 transition-all" asChild>
      <Link href={href}>
        <div className="size-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
          <Icon size={20} />
        </div>
        {label}
      </Link>
    </Button>
  )
}

function NotificationCenter() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 relative">
          <Bell className="size-5" />
          <span className="absolute top-2.5 right-2.5 size-2 bg-orange-500 rounded-full ring-2 ring-background" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 rounded-2xl p-4">
        <DropdownMenuLabel className="font-black text-lg">Notifications</DropdownMenuLabel>
        <div className="py-8 text-center text-muted-foreground text-sm">
          No new notifications
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-10 rounded-full p-0 ring-offset-background transition-all hover:ring-2 hover:ring-orange-500/20 active:scale-90">
          <Avatar className="size-10 border-2 border-transparent group-hover:border-orange-200">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-gradient-to-br from-orange-100 to-amber-100 text-orange-600 font-bold">RA</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 rounded-2xl p-2 shadow-2xl border-orange-100 dark:border-orange-900/50">
        <div className="p-3 mb-2 bg-orange-50 dark:bg-orange-950/20 rounded-xl">
          <p className="text-sm font-bold">Ram Murmu</p>
          <p className="text-xs text-muted-foreground">ram@runash.ai</p>
        </div>
        <DropdownMenuItem className="rounded-xl h-11 font-medium cursor-pointer gap-3">
          <User className="size-4" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="rounded-xl h-11 font-medium cursor-pointer gap-3">
          <Settings className="size-4" /> Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="rounded-xl h-11 font-medium cursor-pointer text-red-500 gap-3 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-950/20">
          <LogOut className="size-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
  }
