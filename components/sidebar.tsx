"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { blogPosts, getAllCategories } from "@/lib/blog-data"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

import { ChevronLeft, ChevronRight, Search } from "lucide-react"

const RECENT_POSTS_LIMIT = 5

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
  isMobileOpen?: boolean
  setMobileOpen?: (open: boolean) => void
}

export function Sidebar({ isCollapsed, onToggle, isMobileOpen, setMobileOpen }: SidebarProps) {
  const pathname = usePathname()

  const recentPosts = React.useMemo(
    () =>
      [...blogPosts]
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, RECENT_POSTS_LIMIT),
    [],
  )

  const categoryItems = React.useMemo(() => {
    const categories = getAllCategories()
    return categories.map((category) => ({
      name: category.name,
      href: `/category/${category.slug}`,
    }))
  }, [])

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <div className="mb-3 hidden h-14 items-center px-4 md:flex">
        <p className={cn("text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground", isCollapsed && "sr-only")}>
          Explore
        </p>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn("ml-auto h-7 w-7 rounded-md text-muted-foreground", isCollapsed && "mx-auto")}
        >
          {isCollapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        </Button>
      </div>

      <div className={cn("mb-4 px-4", isCollapsed && "md:hidden")}>
        <Button
          variant="outline"
          className="h-9 w-full justify-start rounded-md border-border/70 bg-background px-3 text-xs font-normal text-muted-foreground"
        >
          <Search className="mr-2 size-3.5" />
          <span>Search</span>
          <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border border-border/70 bg-muted px-1.5 font-mono text-[10px] md:inline-flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-1 px-3 pb-6">
          <SidebarTextLink
            href="/blog"
            label="All posts"
            isCollapsed={isCollapsed}
            isActive={pathname === "/blog"}
            onSelect={() => setMobileOpen?.(false)}
          />

          <Separator className={cn("my-3", isCollapsed && "md:hidden")} />

          <div className={cn("space-y-1", isCollapsed && "md:hidden")}>
            <h3 className="px-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">Recent</h3>
            {recentPosts.map((post) => (
              <SidebarTextLink
                key={post.slug}
                href={`/blog/${post.slug}`}
                label={post.title}
                isCollapsed={isCollapsed}
                isActive={pathname === `/blog/${post.slug}`}
                onSelect={() => setMobileOpen?.(false)}
              />
            ))}
          </div>

          <Separator className={cn("my-3", isCollapsed && "md:hidden")} />

          <div className={cn("space-y-1", isCollapsed && "md:hidden")}>
            <h3 className="px-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">Topics</h3>
            {categoryItems.map((item) => (
              <SidebarTextLink
                key={item.href}
                href={item.href}
                label={item.name}
                isCollapsed={isCollapsed}
                isActive={pathname === item.href}
                onSelect={() => setMobileOpen?.(false)}
              />
            ))}
          </div>
        </nav>
      </ScrollArea>
    </div>
  )

  return (
    <TooltipProvider delayDuration={0}>
      <Sheet open={isMobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[85%] overflow-hidden rounded-r-2xl border-r p-0 md:hidden">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
          </SheetHeader>
          {SidebarContent}
        </SheetContent>
      </Sheet>

      <aside
        className={cn(
          "sticky top-12 hidden h-[calc(100vh-3rem)] flex-col overflow-hidden border-r border-border/60 bg-background md:flex",
          isCollapsed ? "w-16" : "w-[260px]",
        )}
      >
        {SidebarContent}
      </aside>
    </TooltipProvider>
  )
}

function SidebarTextLink({
  href,
  label,
  isCollapsed,
  isActive,
  onSelect,
}: {
  href: string
  label: string
  isCollapsed: boolean
  isActive: boolean
  onSelect?: () => void
}) {
  const content = (
    <Button
      variant="ghost"
      onClick={onSelect}
      className={cn(
        "h-8 w-full rounded-md text-xs transition-colors",
        isCollapsed ? "mx-auto w-8 justify-center p-0" : "justify-start px-2.5",
        isActive
          ? "bg-muted/80 font-medium text-foreground"
          : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
      )}
      asChild
    >
      <Link href={href}>
        <span className={cn("truncate", isCollapsed && "sr-only")}>{label}</span>
      </Link>
    </Button>
  )

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right" sideOffset={10}>
          {label}
        </TooltipContent>
      </Tooltip>
    )
  }

  return content
}
