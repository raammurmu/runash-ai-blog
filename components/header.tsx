"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { Search, Bell, Plus, User, Settings, LogOut, Share2, BookOpen, Heart } from "lucide-react"
import Link from "next/link"

const notifications = [
  {
    id: 1,
    type: "like",
    message: "John liked your post 'AI in Live Streaming'",
    time: "2 minutes ago",
    unread: true,
  },
  {
    id: 2,
    type: "comment",
    message: "Sarah commented on 'Payment Integration Guide'",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    type: "follow",
    message: "Mike started following you",
    time: "3 hours ago",
    unread: false,
  },
]

const searchSuggestions = [
  { type: "post", title: "AI-Powered Live Streaming", category: "AI Platform" },
  { type: "user", title: "John Developer", username: "@johndev" },
  { type: "topic", title: "Real-time Video Processing", posts: 42 },
]

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const unreadCount = notifications.filter((n) => n.unread).length

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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-orange-400 to-yellow-400 flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="font-bold text-xl">RunAsh AI</span>
          </Link>

          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search posts, topics, or users..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setShowSearchResults(e.target.value.length > 0)
              }}
              onFocus={() => setShowSearchResults(searchQuery.length > 0)}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
              className="pl-10"
            />

            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-sm z-50">
                <div className="p-2">
                  <div className="text-xs text-muted-foreground mb-2">Suggestions</div>
                  {searchSuggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 hover:bg-muted rounded cursor-pointer">
                      {suggestion.type === "post" && <BookOpen className="h-4 w-4" />}
                      {suggestion.type === "user" && <User className="h-4 w-4" />}
                      {suggestion.type === "topic" && <Search className="h-4 w-4" />}
                      <div className="flex-1">
                        <div className="text-sm">{suggestion.title}</div>
                        {suggestion.username && (
                          <div className="text-xs text-muted-foreground">{suggestion.username}</div>
                        )}
                        {suggestion.category && (
                          <div className="text-xs text-muted-foreground">{suggestion.category}</div>
                        )}
                        {suggestion.posts && (
                          <div className="text-xs text-muted-foreground">{suggestion.posts} posts</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>

          {/*    <Button variant="outline" size="sm" asChild>
            <Link href="/create">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Link>
          </Button> */}

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
                  <Button variant="ghost" size="sm">
                    Mark all read
                  </Button>
                </div>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-2 rounded border ${notification.unread ? "bg-muted/50" : ""}`}
                    >
                      <div className="flex items-start space-x-2">
                        <div className="flex-1">
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                        {notification.unread && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <ThemeToggle />

          {/*   <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
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
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </div>
    </header>
  )
}
