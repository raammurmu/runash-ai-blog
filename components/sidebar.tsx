"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// UI Components
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area" // Optional: for long lists
import { Separator } from "@/components/ui/separator"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Icons
import {
  Home,
  Video,
  ShoppingCart,
  Code,
  FileText,
  CreditCard,
  MessageCircle,
  Store,
  Brain,
  Beaker,
  TrendingUp,
  Users,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Settings
} from "lucide-react"

// Data Config
const categories = [
  { name: "Home", icon: Home, href: "/", count: null, description: "Dashboard" },
  { name: "Live Streaming", icon: Video, href: "/streaming", count: 42, description: "Real-time video" },
  { name: "Live Shopping", icon: ShoppingCart, href: "/shopping", count: 28, description: "E-commerce streams" },
  { name: "API Platform", icon: Code, href: "/api", count: 156, description: "Dev tools" },
  { name: "AI Platform", icon: Brain, href: "/ai", count: 198, description: "AI solutions" },
  { name: "Research", icon: Beaker, href: "/research", count: 145, description: "Latest findings" },
]

const trending = ["Real-time Video", "AI Shopping", "Stream Analytics"]

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={cn(
        "relative flex flex-col border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ease-in-out h-screen",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* --- Toggle Button --- */}
      <div className="flex h-14 items-center justify-between px-4 py-2 border-b">
        {!isCollapsed && <span className="font-bold text-lg tracking-tight">RunAsh AI</span>}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn("h-8 w-8", isCollapsed && "mx-auto")}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* --- Main Navigation --- */}
      <ScrollArea className="flex-1 py-4">
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {categories.map((category, index) => (
            <SidebarItem 
              key={index} 
              item={category} 
              isCollapsed={isCollapsed} 
            />
          ))}
          
          <Separator className="my-4" />
          
          {/* Trending Section */}
          <div className="px-2">
             {!isCollapsed ? (
                <h3 className="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground">
                  Trending
                </h3>
             ) : (
                <div className="flex justify-center mb-2">
                   <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
             )}
             
             <div className="space-y-1">
                {trending.map((topic) => (
                   isCollapsed ? null : (
                    <Button key={topic} variant="ghost" size="sm" className="w-full justify-start text-xs h-7">
                      <TrendingUp className="mr-2 h-3 w-3 opacity-70" />
                      {topic}
                    </Button>
                   )
                ))}
             </div>
          </div>
        </nav>
      </ScrollArea>

      {/* --- Footer with Dialog --- */}
      <div className="mt-auto p-2 border-t bg-muted/20">
        <CommunityDialog isCollapsed={isCollapsed} />
      </div>
    </aside>
  )
}

// ------------------------------------------------------------------
// Sub-Components for cleanliness
// ------------------------------------------------------------------

function SidebarItem({ item, isCollapsed }: { item: any; isCollapsed: boolean }) {
  // Collapsed View (Icon only + Popover)
  if (isCollapsed) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9 mx-auto">
            <item.icon className="h-4 w-4" />
            <span className="sr-only">{item.name}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent side="right" className="w-56 p-3">
          <div className="space-y-2">
            <h4 className="font-medium leading-none flex items-center gap-2">
              <item.icon className="h-4 w-4" />
              {item.name}
            </h4>
            <p className="text-xs text-muted-foreground">{item.description}</p>
            {item.count && (
              <Badge variant="secondary" className="mt-1">
                {item.count} items
              </Badge>
            )}
          </div>
        </PopoverContent>
      </Popover>
    )
  }

  // Expanded View
  return (
    <Button variant="ghost" className="w-full justify-start" asChild>
      <Link href={item.href}>
        <item.icon className="mr-2 h-4 w-4" />
        <span className="flex-1">{item.name}</span>
        {item.count && (
          <Badge variant="secondary" className="ml-auto h-5 px-1.5 min-w-[2rem] justify-center">
            {item.count}
          </Badge>
        )}
      </Link>
    </Button>
  )
}

function CommunityDialog({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant={isCollapsed ? "ghost" : "default"} 
          size={isCollapsed ? "icon" : "default"} 
          className={cn("w-full", isCollapsed && "h-9 w-9")}
        >
          <Users className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
          {!isCollapsed && "Join Community"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join the Community</DialogTitle>
          <DialogDescription>
            Connect with 10,000+ developers building the future of AI streaming.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
           {/* Placeholder for simple content */}
           <div className="flex items-center gap-4 border p-4 rounded-md">
              <div className="bg-primary/10 p-2 rounded-full">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Discord Server</p>
                <p className="text-xs text-muted-foreground">Chat with the team live</p>
              </div>
              <Button size="sm" variant="outline">Join</Button>
           </div>
           
           <div className="flex items-center gap-4 border p-4 rounded-md">
              <div className="bg-primary/10 p-2 rounded-full">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">GitHub Discussions</p>
                <p className="text-xs text-muted-foreground">Report bugs & request features</p>
              </div>
              <Button size="sm" variant="outline">View</Button>
           </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
