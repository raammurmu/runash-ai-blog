"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Bell, Plus, User, Settings, LogOut, Share2, Heart, Menu, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
        
        {/* LEFT: Logo & Desktop Search */}
        <div className="flex items-center gap-4 flex-1">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="size-8 rounded-lg bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              RA
            </div>
            <span className="hidden font-bold text-lg lg:inline-block tracking-tight">RunAsh AI</span>
          </Link>

          {/* Desktop Search Bar (Hidden on Mobile) */}
          <div className="hidden md:relative md:block w-full max-w-[300px] lg:max-w-[400px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
            <Input placeholder="Search posts..." className="pl-9 h-9 bg-muted/50 focus-visible:bg-background transition-all" />
          </div>
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          
          {/* Mobile Search Toggle */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Search className="size-5" />
          </Button>

          <div className="hidden sm:flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 border-dashed">
              <Plus className="size-4" /> <span className="hidden lg:inline">New Post</span>
            </Button>
          </div>

          <NotificationBell />
          
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          <UserMenu />

          {/* Mobile Menu Drawer */}
          <MobileDrawer />
        </div>
      </div>

      {/* Expandable Mobile Search Input */}
      {isSearchOpen && (
        <div className="p-3 border-b bg-background md:hidden animate-in slide-in-from-top-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
            <Input autoFocus placeholder="Search..." className="pl-9 w-full" />
          </div>
        </div>
      )}
    </header>
  )
}

function MobileDrawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px]">
        <SheetHeader className="text-left pb-6 border-b">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-6">
          <Button variant="outline" className="justify-start gap-3" asChild>
            <Link href="/create"><Plus className="size-4" /> Create New Post</Link>
          </Button>
          <Button variant="outline" className="justify-start gap-3">
            <Share2 className="size-4" /> Share Platform
          </Button>
          <div className="flex items-center justify-between px-2 pt-4 border-t">
            <span className="text-sm font-medium">Appearance</span>
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function NotificationBell() {
  return (
    <Button variant="ghost" size="icon" className="relative">
      <Bell className="size-5" />
      <Badge className="absolute top-1 right-1 size-2 p-0 bg-orange-500 border-2 border-background" />
    </Button>
  )
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-9 rounded-full p-0">
          <Avatar className="size-9 border">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>RA</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 mt-2">
        <DropdownMenuItem className="py-2"><User className="mr-3 size-4" /> Profile</DropdownMenuItem>
        <DropdownMenuItem className="py-2"><Settings className="mr-3 size-4" /> Settings</DropdownMenuItem>
        <DropdownMenuItem className="py-2"><Heart className="mr-3 size-4" /> Favorites</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="py-2 text-destructive"><LogOut className="mr-3 size-4" /> Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
  }
