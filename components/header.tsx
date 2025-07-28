"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { Search, Bell, Plus, User, Settings, LogOut, Share2, BookOpen, Heart, Menu, Home, TrendingUp, Users, MessageSquare, Bookmark, Video, ShoppingCart, Code, CreditCard, Bot, Zap } from 'lucide-react'
import Link from "next/link"
import { cn } from "@/lib/utils"

const notifications = [
  {
    id: 1,
    type: "like",
    message: "John liked your post 'AI in Live Streaming'",
    time: "2 minutes ago",
    unread: true,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    type: "comment",
    message: "Sarah commented on 'Payment Integration Guide'",
    time: "1 hour ago",
    unread: true,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    type: "follow",
    message: "Mike started following you",
    time: "3 hours ago",
    unread: false,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    type: "upvote",
    message: "Your post received 50+ upvotes",
    time: "5 hours ago",
    unread: false,
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const searchSuggestions = [
  { type: "post", title: "AI-Powered Live Streaming Solutions", category: "AI Platform", views: "2.3k" },
  { type: "post", title: "Real-time Video Processing with WebRTC", category: "Live Streaming", views: "1.8k" },
  { type: "user", title: "John Developer", username: "@johndev", followers: "1.2k" },
  { type: "user", title: "Sarah AI", username: "@sarahai", followers: "890" },
  { type: "topic", title: "Live Shopping Integration", posts: 42, trending: true },
  { type: "topic", title: "Payment Gateway APIs", posts: 28, trending: false },
]

const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Trending", href: "/trending", icon: TrendingUp },
  { name: "Community", href: "/community", icon: Users },
  { name: "Live Streaming", href: "/category/streaming", icon: Video },
  { name: "AI Platform", href: "/category/ai", icon: Bot },
  { name: "Live Shopping", href: "/category/shopping", icon: ShoppingCart },
  { name: "API Platform", href: "/category/api", icon: Code },
  { name: "Payments", href: "/category/payments", icon: CreditCard },
]

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const unreadCount = notifications.filter((n) => n.unread).length

  const filteredSuggestions = searchSuggestions.filter(
    (suggestion) =>
      suggestion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (suggestion.username && suggestion.username.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "RunAsh AI Blog",
        text: "Check out this amazing AI and live streaming blog!",
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const markAllAsRead = () => {
    notifications.forEach(n => n.unread = false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <div className="flex flex-col space-y-4 mt-6">
                <div className="flex items-center space-x-2 px-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-orange-400 to-yellow-400 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">RA</span>
                  </div>
                  <span className="font-bold text-xl">RunAsh AI</span>
                </div>
                
                <nav className="space-y-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </nav>

                <div className="border-t pt-4 space-y-2">
                  <Link
                    href="/profile"
                    className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                  <Link
                    href="/favorites"
                    className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Bookmark className="h-5 w-5" />
                    <span>Favorites</span>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-orange-400 to-yellow-400 flex items-center justify-center">
              <span className="text-white font-bold text-sm">RA</span>
            </div>
            <span className="font-bold text-xl hidden sm:block">RunAsh AI</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navigationItems.slice(0, 4).map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md mx-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search posts, topics, or users..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setShowSearchResults(e.target.value.length > 0)
            }}
            onFocus={() => {
              setIsSearchFocused(true)
              setShowSearchResults(searchQuery.length > 0)
            }}
            onBlur={() => {
              setIsSearchFocused(false)
              setTimeout(() => setShowSearchResults(false), 200)
            }}
            className="pl-10 pr-4"
          />

          {showSearchResults && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
              <div className="p-2">
                <div className="text-xs text-muted-foreground mb-2 px-2">
                  {filteredSuggestions.length > 0 ? "Search Results" : "Popular Suggestions"}
                </div>
                {(filteredSuggestions.length > 0 ? filteredSuggestions : searchSuggestions.slice(0, 6)).map((suggestion, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 hover:bg-muted rounded cursor-pointer group">
                    <div className="flex-shrink-0">
                      {suggestion.type === "post" && <BookOpen className="h-4 w-4 text-blue-500" />}
                      {suggestion.type === "user" && <User className="h-4 w-4 text-green-500" />}
                      {suggestion.type === "topic" && (
                        <div className="flex items-center">
                          <Search className="h-4 w-4 text-orange-500" />
                          {suggestion.trending && <Zap className="h-3 w-3 text-yellow-500 ml-1" />}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate group-hover:text-orange-500 transition-colors">
                        {suggestion.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {suggestion.username && suggestion.username}
                        {suggestion.category && suggestion.category}
                        {suggestion.posts && `${suggestion.posts} posts`}
                        {suggestion.views && `${suggestion.views} views`}
                        {suggestion.followers && `${suggestion.followers} followers`}
                      </div>
                    </div>
                    {suggestion.trending && (
                      <Badge variant="secondary" className="text-xs">
                        Trending
                      </Badge>
                    )}
                  </div>
                ))}
                {searchQuery && (
                  <div className="border-t mt-2 pt-2">
                    <div className="p-2 text-center">
                      <Button variant="ghost" size="sm" className="text-xs">
                        See all results for "{searchQuery}"
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Share Button - Hidden on mobile */}
          <Button variant="outline" size="sm" onClick={handleShare} className="hidden md:flex">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>

          {/* New Post Button */}
          <Button variant="outline" size="sm" asChild>
            <Link href="/create">
              <Plus className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">New Post</span>
            </Link>
          </Button>

          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Notifications</h4>
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    Mark all read
                  </Button>
                </div>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "p-3 rounded-lg border transition-colors hover:bg-muted/50",
                        notification.unread ? "bg-muted/30" : ""
                      )}
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {notification.type === "like" && <Heart className="h-4 w-4" />}
                            {notification.type === "comment" && <MessageSquare className="h-4 w-4" />}
                            {notification.type === "follow" && <User className="h-4 w-4" />}
                            {notification.type === "upvote" && <TrendingUp className="h-4 w-4" />}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                        {notification.unread && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1" />}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-2">
                  <Button variant="ghost" size="sm" className="w-full">
                    View all notifications
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">John Doe</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">john@example.com</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/favorites">
                  <Heart className="mr-2 h-4 w-4" />
                  Favorites
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/bookmarks">
                  <Bookmark className="mr-2 h-4 w-4" />
                  Bookmarks
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
