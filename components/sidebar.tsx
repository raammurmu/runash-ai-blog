"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { blogPosts, authors, getAllCategories } from "@/lib/blog-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  Home,
  LayoutGrid,
  Search,
  Settings,
  Sparkles,
  Tag,
} from "lucide-react"

const primaryNav = [
  { name: "Home", icon: Home, href: "/" },
  { name: "All Posts", icon: LayoutGrid, href: "/blog" },
  { name: "Search", icon: Search, href: "/search" },
]

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
  isMobileOpen?: boolean
  setMobileOpen?: (open: boolean) => void
}

export function Sidebar({ isCollapsed, onToggle, isMobileOpen, setMobileOpen }: SidebarProps) {
  const pathname = usePathname()
  const categoryItems = React.useMemo(() => {
    return getAllCategories().map((category) => ({
      name: category.name,
      href: `/category/${category.slug}`,
      count: blogPosts.filter((post) => post.category === category.name).length,
    }))
  }, [])
  const primaryAuthor = authors[0]
  const featuredCategory = categoryItems[0]

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="hidden h-16 items-center px-3 md:flex">
        <Button variant="ghost" size="icon" onClick={onToggle} className={cn("ml-auto", isCollapsed && "mx-auto")}>
          {isCollapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        </Button>
      </div>

      {!isCollapsed && featuredCategory && (
        <div className="mx-3 mb-4 rounded-2xl border border-orange-200/70 bg-gradient-to-br from-orange-50 to-amber-50 p-3 dark:border-orange-900/50 dark:from-orange-950/30 dark:to-amber-950/20">
          <p className="mb-2 inline-flex items-center gap-1 text-[11px] font-semibold text-orange-700 dark:text-orange-300">
            <Sparkles className="size-3.5" /> Featured category
          </p>
          <Link href={featuredCategory.href} className="text-sm font-semibold hover:text-orange-600 dark:hover:text-orange-300">
            {featuredCategory.name}
          </Link>
          <p className="mt-1 text-xs text-muted-foreground">{featuredCategory.count} posts available</p>
        </div>
      )}

      <ScrollArea className="flex-1 px-3">
        <nav className="space-y-1">
          {primaryNav.map((item) => (
            <SidebarNavItem
              key={item.href}
              item={item}
              isCollapsed={isCollapsed}
              isActive={pathname === item.href}
              onSelect={() => setMobileOpen?.(false)}
            />
          ))}
        </nav>

        <Separator className="my-4" />

        <div className="space-y-1 pb-4">
          {!isCollapsed && (
            <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Topics</p>
          )}
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
      </ScrollArea>

      <div className="border-t border-orange-100/70 p-3 dark:border-orange-900/40">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-2 rounded-2xl border border-transparent p-2 transition hover:border-orange-200 hover:bg-orange-50/60 dark:hover:border-orange-900/50 dark:hover:bg-orange-950/30",
            isCollapsed && "justify-center",
          )}
        >
          <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 text-white">
            {primaryAuthor?.name?.[0] ?? "R"}
          </div>
          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{primaryAuthor?.name ?? "RunAsh Team"}</p>
              <p className="truncate text-xs text-muted-foreground">@{primaryAuthor?.username ?? "runash"}</p>
            </div>
          )}
          {!isCollapsed && <Settings className="size-4 text-muted-foreground" />}
        </Link>
      </div>
    </div>
  )

  return (
    <TooltipProvider delayDuration={0}>
      <Sheet open={isMobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[86%] border-none p-0 md:hidden">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
          </SheetHeader>
          {sidebarContent}
        </SheetContent>
      </Sheet>

      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 74 : 290 }}
        transition={{ type: "spring", stiffness: 280, damping: 30 }}
        className="relative hidden h-screen flex-col border-r border-orange-100/70 bg-card md:flex dark:border-orange-900/40"
      >
        {sidebarContent}
      </motion.aside>
    </TooltipProvider>
  )
}

function SidebarNavItem({
  item,
  isCollapsed,
  isActive,
  onSelect,
}: {
  item: {
    name: string
    href: string
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
        "group relative w-full overflow-hidden rounded-xl",
        isCollapsed ? "mx-auto h-10 w-10 justify-center p-0" : "h-10 justify-start px-3",
        isActive
          ? "bg-orange-50 text-orange-700 ring-1 ring-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:ring-orange-900/50"
          : "hover:bg-muted/70",
      )}
      asChild
    >
      <Link href={item.href}>
        {isActive && <motion.div layoutId="active-pill" className="absolute left-0 h-5 w-1 rounded-r-full bg-orange-500" />}
        <item.icon className={cn("size-4 shrink-0", isActive ? "text-orange-600 dark:text-orange-300" : "text-muted-foreground")} />
        {!isCollapsed && <span className="ml-2 truncate text-sm font-medium">{item.name}</span>}
        {!isCollapsed && !!item.count && (
          <Badge className="ml-auto rounded-md bg-orange-500 px-1.5 py-0 text-[10px] text-white">{item.count}</Badge>
        )}
      </Link>
    </Button>
  )

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          <span className="inline-flex items-center gap-1">
            <Compass className="size-3" /> {item.name}
          </span>
        </TooltipContent>
      </Tooltip>
    )
  }

  return content
}
