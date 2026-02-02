"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { authors, blogPosts } from "@/lib/blog-data"
import type { BlogPost } from "@/lib/types"

// UI Components
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

// Icons
import {
  Home, ChevronLeft, ChevronRight,
  Settings, Search, LayoutGrid, Tag
} from "lucide-react"

const primaryNav = [
  { name: "Home", icon: Home, href: "/", description: "Dashboard" },
  { name: "All Posts", icon: LayoutGrid, href: "/blog", description: "Latest articles" },
]

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
  isMobileOpen?: boolean
  setMobileOpen?: (open: boolean) => void
}

export function Sidebar({ isCollapsed, onToggle, isMobileOpen, setMobileOpen }: SidebarProps) {
  const pathname = usePathname()
  const [posts, setPosts] = React.useState<BlogPost[]>(blogPosts)
  const categoryItems = React.useMemo(() => {
    const categories = posts
      .filter((post) => post.status !== "draft")
      .reduce<Record<string, number>>((acc, post) => {
        acc[post.category] = (acc[post.category] ?? 0) + 1
        return acc
      }, {})

    return Object.keys(categories).map((name) => ({
      name,
      href: `/category/${name.toLowerCase().replace(/\s+/g, "-")}`,
      description: "",
      count: categories[name],
    }))
  }, [posts])
  const primaryAuthor = authors[0]

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts")
        if (!response.ok) return
        const data = await response.json()
        setPosts(Array.isArray(data) ? data : blogPosts)
      } catch {
        setPosts(blogPosts)
      }
    }
    fetchPosts()
  }, [])

  // Sidebar Inner Content (Shared between Mobile and Desktop)
  const SidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header - Hidden on Mobile because it's in the Header.tsx */}
      <div className="hidden md:flex h-16 items-center px-4 mb-2">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 flex-1"
            >
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn("h-8 w-8 ml-auto", isCollapsed && "mx-auto")}
        >
          {isCollapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        </Button>
      </div>

      {/* Search - Replaced with a more touch-friendly version for mobile */}
      <div className={cn("px-4 mb-4", isCollapsed && "md:hidden")}>
         <Button variant="outline" className="w-full h-10 md:h-9 justify-start text-muted-foreground px-3 font-normal bg-muted/30 border-orange-100/50 dark:border-orange-900/50 rounded-xl md:rounded-lg">
            <Search className="mr-2 size-4" />
            <span className="text-sm md:text-xs">Search...</span>
            <kbd className="ml-auto pointer-events-none hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
         </Button>
      </div>

      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-1.5 px-3">
          {primaryNav.map((item) => (
            <SidebarNavItem
              key={item.href}
              item={item}
              isCollapsed={isCollapsed}
              isActive={pathname === item.href}
              onSelect={() => setMobileOpen?.(false)}
            />
          ))}
          
          <Separator className="my-4 opacity-50" />
          
          <div className="flex flex-col gap-1">
             <h3 className={cn(
               "mb-2 px-2 text-[10px] font-black uppercase tracking-[0.2em] text-orange-600/60 dark:text-orange-400/60",
               isCollapsed && "md:hidden"
             )}>
               Categories
             </h3>
             {categoryItems.map((item) => (
               <SidebarNavItem
                 key={item.href}
                 item={{ ...item, icon: Tag }}
                 isCollapsed={isCollapsed}
                 isActive={pathname === item.href}
                 onSelect={() => setMobileOpen?.(false)}
               />
             ))}
          </div>
        </nav>
      </ScrollArea>

      {/* User Section - Enhanced for Mobile Reachability */}
      <div className="p-4 border-t bg-orange-50/30 dark:bg-orange-950/10">
        <div className={cn(
          "flex items-center gap-3 rounded-2xl", 
          !isCollapsed && "p-2 hover:bg-orange-100/50 dark:hover:bg-orange-900/20 transition-colors"
        )}>
           <div
             className="size-10 md:size-8 rounded-xl bg-gradient-to-tr from-orange-400 to-rose-400 shrink-0 shadow-sm border-2 border-white dark:border-zinc-800"
             aria-hidden
           />
           {!isCollapsed && (
            <div className="flex-1 overflow-hidden">
                 <p className="text-sm md:text-xs font-bold truncate">{primaryAuthor?.name ?? "RunAsh Team"}</p>
                 <p className="text-xs md:text-[10px] text-muted-foreground truncate opacity-70">{primaryAuthor?.email ?? "team@runash.in"}</p>
              </div>
              
           )}
           {!isCollapsed && (
             <Button variant="ghost" size="icon" className="size-8">
               <Settings className="size-4 text-muted-foreground hover:text-orange-500 transition-colors" />
             </Button>
           )}
        </div>
      </div>
    </div>
  )

  return (
    <TooltipProvider delayDuration={0}>
      {/* MOBILE DRAWER */}
      <Sheet open={isMobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-[85%] border-none md:hidden rounded-r-[30px] overflow-hidden">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
          </SheetHeader>
          {SidebarContent}
        </SheetContent>
      </Sheet>

      {/* DESKTOP ASIDE */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 64 : 280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden md:flex relative flex-col border-r bg-card h-screen z-40 overflow-hidden"
      >
        {SidebarContent}
      </motion.aside>
    </TooltipProvider>
  )
}

function SidebarNavItem({ item, isCollapsed, isActive, onSelect }: { 
  item: {
    name: string
    href: string
    description?: string
    count?: number
    icon: React.ComponentType<{ className?: string }>
  }
  isCollapsed: boolean
  isActive: boolean
  onSelect?: () => void 
}) {
  const content = (
    <Button
      variant="ghost"
      onClick={onSelect}
      className={cn(
        "w-full transition-all group relative rounded-xl md:rounded-lg overflow-hidden",
        isCollapsed ? "justify-center p-0 h-10 w-10 mx-auto" : "justify-start h-12 md:h-10 px-3",
        isActive ? "bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-500 shadow-sm" : "hover:bg-muted"
      )}
      asChild
    >
      <Link href={item.href}>
        {isActive && (
          <motion.div 
            layoutId="active-indicator"
            className="absolute left-0 w-1 h-6 bg-orange-500 rounded-r-full"
          />
        )}
        <item.icon className={cn(
          "size-5 md:size-4 shrink-0 transition-transform duration-300 group-hover:scale-110", 
          isActive ? "text-orange-500" : "text-muted-foreground group-hover:text-orange-600"
        )} />
        {!isCollapsed && (
          <span className="ml-3 text-base md:text-sm font-bold md:font-medium flex-1 truncate">
            {item.name}
          </span>
        )}
        {!isCollapsed && item.count && item.count > 0 && (
          <Badge className="ml-auto text-[10px] px-1.5 py-0.5 bg-orange-500 text-white border-none shadow-orange-500/20 shadow-md">
            {item.count}
          </Badge>
        )}
      </Link>
    </Button>
  )

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right" sideOffset={10} className="font-bold border-orange-100 bg-white dark:bg-zinc-950 dark:border-orange-900">
          {item.name}
        </TooltipContent>
      </Tooltip>
    )
  }

  return content
}
