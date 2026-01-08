"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Bell, Plus, User, Settings, LogOut, Share2, BookOpen, Heart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"

// --- Mock Data ---
const notifications = [
  { id: 1, message: "John liked your post 'AI in Live Streaming'", time: "2m ago", unread: true },
  { id: 2, message: "Sarah commented on 'Payment Integration'", time: "1h ago", unread: true },
]

export function Header() {
  const [copied, setCopied] = useState(false)
  const unreadCount = notifications.filter((n) => n.unread).length

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: "RunAsh AI", url: window.location.href }) } catch {}
    } else {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4 px-4">
        
        {/* Logo & Search */}
        <div className="flex items-center gap-6 flex-1">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="size-8 rounded-lg bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-xs">RA</span>
            </div>
            <span className="hidden font-bold text-lg md:inline-block">RunAsh AI</span>
          </Link>
          <SearchBar />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleShare} className="hidden sm:flex">
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Share2 className="h-4 w-4" />}
          </Button>

          <Button size="sm" asChild className="hidden md:flex gap-2">
            <Link href="/create"> <Plus className="h-4 w-4" /> New Post </Link>
          </Button>

          <NotificationBell count={unreadCount} />
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  )
}

/* --- Sub-Components for Clarity --- */

function SearchBar() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative w-full max-w-sm hidden sm:block">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input 
        placeholder="Search..." 
        className="pl-9 bg-muted/50 focus-visible:bg-background transition-colors"
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
      />
      {open && (
        <div className="absolute top-full mt-2 w-full bg-popover border rounded-xl shadow-xl p-2 z-50">
          <p className="text-[10px] font-medium text-muted-foreground px-2 py-1 uppercase">Recent Topics</p>
          <div className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg cursor-pointer text-sm">
            <BookOpen className="h-4 w-4 opacity-70" /> AI-Powered Streaming
          </div>
        </div>
      )}
    </div>
  )
}

function NotificationBell({ count }: { count: number }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {count > 0 && (
            <Badge className="absolute -top-0.5 -right-0.5 px-1 min-w-[18px] h-[18px] flex items-center justify-center text-[10px]">
              {count}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b flex justify-between items-center">
          <h4 className="font-semibold">Notifications</h4>
          <Button variant="link" size="sm" className="h-auto p-0 text-xs">Mark all read</Button>
        </div>
        <div className="max-h-64 overflow-auto p-2">
          {notifications.map(n => (
            <div key={n.id} className="p-3 hover:bg-muted rounded-md text-sm transition-colors mb-1">
              <p className={n.unread ? "font-medium" : "text-muted-foreground"}>{n.message}</p>
              <span className="text-xs opacity-60">{n.time}</span>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 rounded-full p-0">
          <Avatar className="size-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>RA</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild><Link href="/profile"><User className="mr-2 h-4 w-4" /> Profile</Link></DropdownMenuItem>
        <DropdownMenuItem asChild><Link href="/settings"><Settings className="mr-2 h-4 w-4" /> Settings</Link></DropdownMenuItem>
        <DropdownMenuItem asChild><Link href="/favorites"><Heart className="mr-2 h-4 w-4" /> Favorites</Link></DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive"><LogOut className="mr-2 h-4 w-4" /> Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
  }
