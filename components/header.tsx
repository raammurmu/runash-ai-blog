"use client"

import * as React from "react"
import Link from "next/link"
import { 
  Search, Bell, Plus, User, Settings, LogOut, 
  Share2, Heart, Menu, Loader2, BookOpen, X, ChevronLeft, Sparkles 
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
    <header className="sticky top-0 z-[60] w-full border-b border-orange-100/20 bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-2">
        
        {/* LOGO - RunAsh Branding */}
        <div className="flex items-center gap-4 shrink-0">
          <Link href="/" className="group flex items-center gap-2.5 transition-opacity hover:opacity-90">
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

        {/* SEARCH - DESKTOP */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground size-4 group-focus-within:text-orange-500 transition-colors" />
          <Input 
            placeholder="Explore RunAsh..." 
            className="pl-11 h-10 bg-orange-50/50 dark:bg-orange-950/10 border-transparent rounded-full focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:border-orange-200 transition-all"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-1 sm:gap-2">
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
            asChild
          >
            <Link href="/create"><Plus className="size-4" /> New Post</Link>
          </Button>

          <NotificationCenter />
          <div className="hidden sm:block"><ThemeToggle /></div>
          <UserMenu />
          <MobileNav />
        </div>
      </div>

      {/* MOBILE SEARCH OVERLAY */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[70] bg-background/95 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300 md:hidden">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 p-4 pt-6">
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsSearchOpen(false)}>
                <ChevronLeft className="size-6" />
              </Button>
              <div className="flex-1 relative">
                <Input 
                  autoFocus
                  placeholder="What are you looking for?"
                  className="w-full pl-10 h-12 bg-muted/50 rounded-2xl border-none text-lg ring-offset-0 focus-visible:ring-2 focus-visible:ring-orange-500"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-orange-500" />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto px-4">
              {isPending ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="relative">
                    <Loader2 className="size-10 animate-spin text-orange-500" />
                    <div className="absolute inset-0 blur-lg bg-orange-500/20 animate-pulse" />
                  </div>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-3 pt-4">
                  {results.map((item: any) => (
                    <Link 
                      key={item.id} 
                      href={`/search/${item.id}`} 
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-4 p-4 rounded-3xl bg-card border border-orange-100/50 dark:border-orange-900/20 shadow-sm active:scale-[0.98] transition-all"
                    >
                      <div className="size-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-50 dark:from-orange-900/40 dark:to-amber-900/20 flex items-center justify-center text-orange-600">
                        {item.type === 'post' ? <BookOpen className="size-6" /> : <User className="size-6" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-base leading-tight">{item.title}</p>
                        <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mt-1">{item.category}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : query.length > 0 ? (
                <div className="text-center py-20 bg-muted/20 rounded-[40px] mt-10">
                  <p className="text-muted-foreground font-medium">No results for <span className="text-foreground">"{query}"</span></p>
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="size-20 bg-orange-50 dark:bg-orange-950/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="size-8 text-orange-300" />
                  </div>
                  <p className="text-muted-foreground font-medium">Search for RunAsh guides, posts, or users</p>
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
        <Button variant="ghost" size="icon" className="md:hidden rounded-full h-10 w-10 bg-orange-50 dark:bg-orange-900/20 text-orange-600 transition-transform active:scale-90">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[85%] sm:w-[400px] rounded-l-[32px] p-0 border-none shadow-2xl">
        <SheetHeader className="p-8 text-left bg-gradient-to-br from-orange-600 via-orange-500 to-amber-400">
          <div className="size-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4">
            <span className="text-white font-black text-xl">RA</span>
          </div>
          <SheetTitle className="text-white text-3xl font-black tracking-tight">RunAsh</SheetTitle>
          <p className="text-orange-100 text-sm font-medium opacity-90">The ultimate resource hub.</p>
        </SheetHeader>
        <div className="p-6 space-y-2">
           <p className="px-4 text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">Navigation</p>
           <MobileNavItem href="/create" icon={<Plus />} label="Create New" gradient />
           <MobileNavItem href="/favorites" icon={<Heart />} label="My Favorites" />
           <MobileNavItem href="/settings" icon={<Settings />} label="Preferences" />
           
           <div className="mx-4 pt-6 mt-6 border-t border-orange-100 dark:border-orange-900/30 flex items-center justify-between">
             <div className="flex items-center gap-3">
               <div className="p-2 bg-muted rounded-xl"><ThemeToggle /></div>
               <span className="text-sm font-bold">Theme</span>
             </div>
           </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function MobileNavItem({ href, icon, label, gradient }: { href: string, icon: React.ReactNode, label: string, gradient?: boolean }) {
  return (
    <Button 
      variant="ghost" 
      className={cn(
        "w-full justify-start gap-4 rounded-[20px] h-14 text-base font-bold transition-all active:scale-[0.97]",
        gradient ? "bg-orange-50 text-orange-600 hover:bg-orange-100 dark:bg-orange-950/30" : "hover:bg-muted"
      )} 
      asChild
    >
      <Link href={href}>
        <span className={cn(gradient ? "text-orange-600" : "text-muted-foreground")}>
          {React.cloneElement(icon as React.ReactElement, { size: 22 })}
        </span>
        {label}
      </Link>
    </Button>
  )
}

function NotificationCenter() {
  return (
    <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-muted-foreground hover:bg-orange-50 dark:hover:bg-orange-900/10 hover:text-orange-500">
      <div className="relative">
        <Bell className="size-5" />
        <span className="absolute -top-0.5 -right-0.5 size-2.5 bg-orange-500 rounded-full border-2 border-background" />
      </div>
    </Button>
  )
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-10 rounded-full p-0 ring-offset-background transition-all hover:ring-2 hover:ring-orange-500/30 overflow-hidden">
          <Avatar className="size-10 border-2 border-orange-100 dark:border-orange-900/50">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-gradient-to-br from-orange-400 to-amber-300 text-white font-black">RA</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 rounded-[24px] p-2 shadow-2xl border-orange-100/50 dark:border-orange-900/20">
        <div className="px-4 py-3 mb-1">
          <p className="text-sm font-black leading-none">Alex RunAsh</p>
          <p className="text-xs text-muted-foreground mt-1">alex@runash.com</p>
        </div>
        <DropdownMenuSeparator className="bg-orange-50 dark:bg-orange-900/20" />
        <DropdownMenuItem className="rounded-xl h-11 font-bold cursor-pointer gap-3 mt-1">
          <User className="size-4 text-orange-500" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="rounded-xl h-11 font-bold cursor-pointer gap-3">
          <Heart className="size-4 text-orange-500" /> Favorites
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-orange-50 dark:bg-orange-900/20" />
        <DropdownMenuItem className="rounded-xl h-11 font-bold cursor-pointer text-red-500 gap-3">
          <LogOut className="size-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
  }
