"use client"

import * as React from "react"
import Link from "next/link"
import { Search, Bell, Plus, User, LogOut, Heart, Menu, Sparkles, Command } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { NotificationCenter} from "@/componemts/notification-center"
import { cn } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={cn(
      "sticky top-0 z-[60] w-full transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-2xl border-b py-2" : "bg-transparent py-4"
    )}>
      <div className="container mx-auto flex h-14 items-center justify-between px-4 gap-4">
        
        {/* BRANDING: Nature-Distilled Palette */}
        <div className="flex items-center gap-6 shrink-0">
          <Link href="/" className="group flex items-center gap-3 transition-transform hover:scale-105">
            <div className="relative size-11 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-400 flex items-center justify-center shadow-xl shadow-orange-500/20">
              <span className="text-white font-black text-lg">R</span>
              <Sparkles className="absolute -top-1 -right-1 size-4 text-orange-500 fill-white" />
            </div>
            <span className="hidden font-black text-2xl lg:inline-block tracking-tighter bg-foreground">
              RunAsh
            </span>
          </Link>
        </div>

        {/* SEARCH: Command Palette Style */}
        <div className="hidden md:flex flex-1 max-w-lg relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground pointer-events-none group-focus-within:text-orange-500 transition-colors">
            <Search className="size-4" />
          </div>
          <Input 
            placeholder="Search resources..." 
            className="pl-12 pr-12 h-11 bg-muted/30 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-orange-500/20 transition-all text-base"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 rounded-md border bg-background/50 text-[10px] font-bold text-muted-foreground">
            <Command className="size-3" /> K
          </div>
        </div>

        {/* ACTIONS: Tactile Feedback */}
        <div className="flex items-center gap-3">
          <Button 
            className="hidden sm:flex rounded-2xl bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-600/20 font-bold active:scale-95 transition-all" 
            asChild
          >
            <Link href="/create"><Plus className="size-4 mr-2" /> New Post</Link>
          </Button>

          <div className="flex items-center bg-muted/30 p-1.5 rounded-2xl gap-1">
            <ThemeToggle />
            <NotificationCenter />
  {/* <UserMenu /> */}
          </div>
        </div>
      </div>
    </header>
  )
}

// Sub-components follow with similar tactile enhancements...
