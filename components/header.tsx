"use client"

import * as React from "react"
import Link from "next/link"
import { 
  Search, Bell, Plus, User, Settings, LogOut, 
  Share2, Heart, Menu, Loader2, BookOpen, X, ChevronLeft 
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
import { cn } from "@/lib/utils"

export function Header() {
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState([])
  const [isPending, setIsPending] = React.useState(false)
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)

  // Debounced Search Logic
  React.useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    const delayDebounceFn = setTimeout(async () => {
      setIsPending(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data)
      } catch (error) { console.error(error) } finally { setIsPending(false) }
    }, 300)
    return () => clearTimeout(delayDebounceFn)
  }, [query])

  return (
    <header className="sticky top-0 z-[60] w-full border-b bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-2">
        
        {/* LOGO */}
        <div className="flex items-center gap-4 shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <div className="size-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <span className="text-white font-black text-sm tracking-tighter">RA</span>
            </div>
            <span className="hidden font-black text-xl lg:inline-block tracking-tight text-orange-600 dark:text-orange-500">RunAsh</span>
          </Link>
        </div>

        {/* SEARCH - DESKTOP */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
          <Input 
            placeholder="Search resources... (⌘K)" 
            className="pl-10 bg-muted/50 border-orange-100 dark:border-orange-900/50 rounded-full focus-visible:ring-orange-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* Mobile Search Trigger */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden rounded-full h-10 w-10"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="size-5" />
          </Button>

          <Button variant="outline" size="sm" className="hidden sm:flex gap-2 rounded-full border-orange-200" asChild>
            <Link href="/create"><Plus className="size-4 text-orange-500" /> New</Link>
          </Button>

          <NotificationCenter />
          <div className="hidden sm:block"><ThemeToggle /></div>
          <UserMenu />
          <MobileNav />
        </div>
      </div>

      {/* FULLSCREEN MOBILE SEARCH OVERLAY */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[70] bg-background animate-in fade-in zoom-in-95 duration-200 md:hidden">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 p-4 border-b">
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                <ChevronLeft className="size-6" />
              </Button>
              <div className="flex-1 relative">
                <Input 
                  autoFocus
                  placeholder="Search Findley..."
                  className="w-full pl-10 h-11 bg-muted/50 rounded-xl border-none text-base"
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
                  <p className="text-sm">Fetching results...</p>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-4">
                  {results.map((item: any) => (
                    <Link 
                      key={item.id} 
                      href={`/search/${item.id}`} 
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-4 p-3 rounded-2xl bg-muted/30 active:scale-95 transition-transform"
                    >
                      <div className="size-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                        {item.type === 'post' ? <BookOpen className="size-6" /> : <User className="size-6" />}
                      </div>
                      <div>
                        <p className="font-bold text-base">{item.title}</p>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest">{item.category}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : query.length > 0 ? (
                <p className="text-center text-muted-foreground py-10 italic">No results found for "{query}"</p>
              ) : (
                <div className="text-center py-20">
                  <Search className="size-12 mx-auto text-muted/50 mb-4" />
                  <p className="text-muted-foreground">Search for posts, authors, or guides</p>
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
        <Button variant="ghost" size="icon" className="md:hidden rounded-full h-10 w-10 bg-orange-50 dark:bg-orange-950/20 text-orange-600">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[85%] rounded-l-[30px] p-0 overflow-hidden border-none">
        <SheetHeader className="p-6 text-left bg-gradient-to-br from-orange-500 to-amber-500">
          <SheetTitle className="text-white text-2xl font-black">Findley Menu</SheetTitle>
        </SheetHeader>
        <div className="p-6 space-y-2">
           <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">Account & Tools</p>
           <MobileNavItem href="/create" icon={<Plus />} label="Create Post" />
           <MobileNavItem href="/favorites" icon={<Heart />} label="My Favorites" />
           <MobileNavItem href="/settings" icon={<Settings />} label="App Settings" />
           <div className="pt-4 mt-4 border-t border-orange-100">
             <ThemeToggle />
             <span className="ml-3 text-sm font-medium">Switch Appearance</span>
           </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function MobileNavItem({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <Button variant="ghost" className="w-full justify-start gap-4 rounded-2xl h-14 text-lg font-bold hover:bg-orange-50 active:scale-95 transition-all" asChild>
      <Link href={href}>
        <span className="text-orange-500">{React.cloneElement(icon as React.ReactElement, { size: 24 })}</span>
        {label}
      </Link>
    </Button>
  )
}

function NotificationCenter() {
  return (
    <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
      <div className="relative">
        <Bell className="size-5" />
        <span className="absolute -top-1 -right-1 size-3 bg-red-500 rounded-full border-2 border-background" />
      </div>
    </Button>
  )
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-10 rounded-full p-0 ring-offset-background transition-all hover:ring-2 hover:ring-orange-500/20">
          <Avatar className="size-10 border border-orange-100">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-orange-100 text-orange-600 font-bold">RA</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 rounded-2xl p-2 shadow-2xl">
        <DropdownMenuItem className="rounded-xl h-11 font-bold cursor-pointer">Profile</DropdownMenuItem>
        <DropdownMenuItem className="rounded-xl h-11 font-bold cursor-pointer">Favorites</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="rounded-xl h-11 font-bold cursor-pointer text-red-500">Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
