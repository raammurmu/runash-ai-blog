"use client"

import * as React from "react"
import Link from "next/link"
import { 
  Search, Bell, Plus, User, Settings, LogOut, 
  Heart, Menu, Loader2, BookOpen, X, ChevronLeft, Sparkles, Command 
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
import { cn } from "@/lib/utils"
//import { MOCK_POSTS } from "@/lib/data" // Import the data we created

export function Header() {
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<any[]>([])
  const [isPending, setIsPending] = React.useState(false)
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)

  // Keyboard Shortcut (⌘K) Logic
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Local Search Algorithm
  React.useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    setIsPending(true)
    const debounce = setTimeout(() => {
      const filtered = MOCK_POSTS.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5) // Limit to top 5 results
      setResults(filtered)
      setIsPending(false)
    }, 300)
    return () => clearTimeout(debounce)
  }, [query])

  return (
    <header className="sticky top-0 z-[60] w-full border-b border-orange-100/20 bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-2">
        
        {/* LOGO */}
        <div className="flex items-center gap-4 shrink-0">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="relative size-10 rounded-xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-base tracking-tighter">RA</span>
              <div className="absolute -top-1 -right-1 size-3 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center">
                <Sparkles className="size-2 text-orange-500 fill-orange-500" />
              </div>
            </div>
            <span className="hidden font-black text-2xl lg:inline-block tracking-tight bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              RunAsh
            </span>
          </Link>
        </div>

        {/* DESKTOP SEARCH */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground size-4 group-focus-within:text-orange-500 transition-colors" />
          <Input 
            placeholder="Search insights..." 
            className="pl-11 pr-12 h-10 bg-orange-50/30 dark:bg-orange-950/10 border-transparent rounded-full focus-visible:ring-2 focus-visible:ring-orange-500/50 transition-all"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 lg:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden rounded-full h-10 w-10 text-muted-foreground"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="size-5" />
          </Button>

          <Button 
            className="hidden sm:flex gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 border-none shadow-md shadow-orange-500/20 text-white font-bold" 
            size="sm"
          >
            <Plus className="size-4" /> New Post
          </Button>

          <div className="hidden sm:flex items-center gap-1">
            <NotificationCenter />
            <ThemeToggle />
          </div>
          <UserMenu />
          <MobileNav />
        </div>
      </div>

      {/* SEARCH MODAL / OVERLAY */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[70] bg-background/95 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="container mx-auto max-w-2xl pt-16 px-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-orange-500" />
                <Input 
                  autoFocus
                  placeholder="What are you looking for?"
                  className="w-full pl-12 h-14 bg-muted/50 rounded-2xl border-none text-xl focus-visible:ring-2 focus-visible:ring-orange-500"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <Button variant="ghost" className="rounded-xl" onClick={() => {setIsSearchOpen(false); setQuery("")}}>
                <X className="size-6" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {isPending ? (
                <div className="flex justify-center py-20"><Loader2 className="animate-spin text-orange-500 size-10" /></div>
              ) : results.length > 0 ? (
                results.map((post) => (
                  <Link 
                    key={post.id} 
                    href={`/blog/${post.slug}`} 
                    onClick={() => setIsSearchOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-orange-100/50 hover:border-orange-500 transition-all group"
                  >
                    <div className="size-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                      <BookOpen className="size-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg leading-tight">{post.title}</h4>
                      <p className="text-xs text-orange-500 font-bold uppercase tracking-widest mt-1">{post.category}</p>
                    </div>
                  </Link>
                ))
              ) : query && <p className="text-center text-muted-foreground py-20">No matching articles found.</p>}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

// Helper Components
function NotificationCenter() {
  return (
    <Button variant="ghost" size="icon" className="rounded-full relative">
      <Bell className="size-5 text-muted-foreground" />
      <span className="absolute top-2 right-2 size-2 bg-orange-500 rounded-full border border-background" />
    </Button>
  )
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-10 rounded-full p-0 ring-offset-background hover:ring-2 hover:ring-orange-500/30 overflow-hidden border">
          <Avatar className="size-full">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-orange-100 text-orange-600 font-bold">RA</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 shadow-2xl">
        <DropdownMenuItem className="rounded-xl cursor-pointer font-medium">Profile</DropdownMenuItem>
        <DropdownMenuItem className="rounded-xl cursor-pointer font-medium">Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="rounded-xl cursor-pointer font-bold text-red-500">Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden rounded-full bg-orange-50/50 text-orange-600">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="rounded-l-[32px] p-0 border-none">
        <SheetHeader className="p-8 text-left bg-gradient-to-br from-orange-600 via-orange-500 to-amber-400">
          <SheetTitle className="text-white text-3xl font-black italic tracking-tighter">RunAsh</SheetTitle>
        </SheetHeader>
        <div className="p-6 space-y-4">
          <MobileNavItem href="/create" icon={<Plus />} label="New Post" gradient />
          <MobileNavItem href="/favorites" icon={<Heart />} label="My Favorites" />
          <MobileNavItem href="/settings" icon={<Settings />} label="Preferences" />
        </div>
      </SheetContent>
    </Sheet>
  )
}

function MobileNavItem({ href, icon, label, gradient }: any) {
  return (
    <Link href={href} className={cn(
      "flex items-center gap-4 p-4 rounded-2xl font-bold transition-all",
      gradient ? "bg-orange-50 text-orange-600" : "hover:bg-muted"
    )}>
      {icon} {label}
    </Link>
  )
  }
