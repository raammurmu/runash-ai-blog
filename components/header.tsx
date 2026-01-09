"use client"

import * as React from "react"
import Link from "next/link"
import { 
  Search, Bell, Plus, User, Settings, LogOut, 
  Share2, Heart, Menu, Loader2, Command, BookOpen 
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState([])
  const [isPending, setIsPending] = React.useState(false)
  const [isSearchFocused, setIsSearchFocused] = React.useState(false)

  // 1. REAL-TIME DEBOUNCED SEARCH
  React.useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsPending(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data)
      } catch (error) {
        console.error("Search Error:", error)
      } finally {
        setIsPending(false)
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [query])

  // 2. KEYBOARD SHORTCUT (CMD+K)
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        document.getElementById("main-search")?.focus()
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
        
        {/* LOGO SECTION */}
        <div className="flex items-center gap-8 flex-1">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="size-8 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xs">RA</span>
            </div>
            <span className="hidden font-bold text-xl lg:inline-block tracking-tighter">RunAsh AI</span>
          </Link>

          {/* DYNAMIC SEARCH BAR */}
          <div className="relative hidden md:block w-full max-w-sm lg:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
            <Input 
              id="main-search"
              placeholder="Search (Ctrl + K)" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="pl-9 pr-12 bg-muted/40 border-none focus-visible:ring-2 focus-visible:ring-orange-500/50 transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {isPending ? (
                <Loader2 className="size-3 animate-spin text-muted-foreground" />
              ) : (
                <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              )}
            </div>

            {/* SEARCH RESULTS DROPDOWN */}
            {isSearchFocused && query.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-popover border rounded-xl shadow-2xl overflow-hidden p-1 z-50 animate-in fade-in slide-in-from-top-1">
                {results.length > 0 ? (
                  results.map((item: any) => (
                    <Link key={item.id} href={`/search/${item.id}`} className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg transition-colors group">
                      <div className="size-8 rounded bg-muted flex items-center justify-center group-hover:bg-background">
                        {item.type === 'post' ? <BookOpen className="size-4" /> : <User className="size-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.title}</p>
                        <p className="text-[10px] text-muted-foreground uppercase">{item.category || item.username}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-center text-sm text-muted-foreground italic">
                    {isPending ? "Searching..." : "No results found."}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="outline" size="sm" className="hidden md:flex gap-2 rounded-full px-4 border-orange-200 hover:bg-orange-50 hover:text-orange-600 transition-colors" asChild>
            <Link href="/create"><Plus className="size-4" /> New Post</Link>
          </Button>

          <NotificationCenter />
          <ThemeToggle />
          <UserMenu />

          {/* MOBILE NAV */}
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

/* --- HELPER SUB-COMPONENTS --- */

function NotificationCenter() {
  // Using real Date objects
  const [notifications] = React.useState([
    { id: 1, text: "New comment on your post", date: new Date(), unread: true },
    { id: 2, text: "System update scheduled", date: new Date(Date.now() - 3600000), unread: false }
  ])

  return (
    <Button variant="ghost" size="icon" className="relative hover:bg-muted rounded-full">
      <Bell className="size-5 text-foreground/80" />
      <Badge className="absolute top-1.5 right-1.5 size-2 p-0 bg-orange-600 border-2 border-background" />
    </Button>
  )
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative size-9 rounded-full ring-offset-2 hover:ring-2 ring-orange-500/20 transition-all p-0">
          <Avatar className="size-9">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>RA</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-xl p-2">
        <DropdownMenuItem className="rounded-lg py-2 cursor-pointer"><User className="mr-3 size-4" /> Profile</DropdownMenuItem>
        <DropdownMenuItem className="rounded-lg py-2 cursor-pointer"><Settings className="mr-3 size-4" /> Settings</DropdownMenuItem>
        <DropdownMenuItem className="rounded-lg py-2 cursor-pointer"><Heart className="mr-3 size-4" /> Favorites</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="rounded-lg py-2 cursor-pointer text-destructive focus:bg-destructive/10"><LogOut className="mr-3 size-4" /> Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden rounded-full">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] border-l-0 bg-background">
        <div className="flex flex-col gap-6 py-8">
          <div className="space-y-1 px-2">
             <p className="text-xs font-semibold text-muted-foreground uppercase px-2 mb-2">Navigation</p>
             <Button variant="ghost" className="w-full justify-start gap-4 rounded-xl text-lg h-12" asChild>
               <Link href="/create"><Plus className="size-5" /> Create Post</Link>
             </Button>
             <Button variant="ghost" className="w-full justify-start gap-4 rounded-xl text-lg h-12">
               <Share2 className="size-5" /> Share App
             </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
  }
