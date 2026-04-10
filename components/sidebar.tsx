"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { getAllCategories, getAllTags, getRecentPosts } from "@/lib/blog-data"

import { Button } from "@/components/ui/button"
import { SiteSearchForm } from "@/components/site-search-form"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

import { ChevronLeft, ChevronRight } from "lucide-react"

const RECENT_POSTS_LIMIT = 5

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
  isMobileOpen?: boolean
  setMobileOpen?: (open: boolean) => void
}

export function Sidebar({ isCollapsed, onToggle, isMobileOpen, setMobileOpen }: SidebarProps) {
  const pathname = usePathname()
  const isMobileSheet = typeof isMobileOpen === "boolean"

  const recentPosts = React.useMemo(() => getRecentPosts(RECENT_POSTS_LIMIT), [])

  const topicItems = React.useMemo(() => {
    const categories = getAllCategories().map((category) => ({
      label: category.name,
      href: `/category/${category.slug}`,
    }))

    const tags = getAllTags().map((tag) => ({
      label: `#${tag.name}`,
      href: `/tag/${tag.slug}`,
    }))

    return [...categories, ...tags]
  }, [])

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <div className="mb-2 hidden h-16 items-center px-4 md:flex">
        <div className="flex-1" />
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn("ml-auto h-8 w-8", isCollapsed && "mx-auto")}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        </Button>
      </div>

      <div className={cn("mb-3 px-4", isCollapsed && "md:hidden")}>
        <SiteSearchForm
          placeholder={isMobileSheet ? "Start searching" : "Search posts"}
          inputClassName={cn(
            isMobileSheet
              ? "h-11 rounded-full border-white/10 bg-white/5 px-4 text-sm placeholder:text-muted-foreground/80"
              : "h-8 rounded-md"
          )}
          buttonClassName={cn(isMobileSheet ? "h-11 w-11 rounded-full border-white/15 bg-white/10" : "h-8 w-8 rounded-md")}
          onSubmitDone={() => setMobileOpen?.(false)}
        />
      </div>

      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-1 px-3 pb-4">
          <SidebarTextLink
            href="/"
            label="All posts"
            isCollapsed={isCollapsed}
            isMobileSheet={isMobileSheet}
            isActive={pathname === "/"}
            onSelect={() => setMobileOpen?.(false)}
          />

          <Separator className={cn("my-3", isCollapsed && "md:hidden")} />

          <div className={cn("space-y-1", isCollapsed && "md:hidden")}>
            <h3 className="px-2 text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground/85">Recent</h3>
            {recentPosts.map((post) => (
              <SidebarTextLink
                key={post.slug}
                href={`/post/${post.slug}`}
                label={post.title}
                isCollapsed={isCollapsed}
                isMobileSheet={isMobileSheet}
                isActive={pathname === `/post/${post.slug}`}
                onSelect={() => setMobileOpen?.(false)}
              />
            ))}
          </div>

          <Separator className={cn("my-3", isCollapsed && "md:hidden")} />

          <div className={cn("space-y-1", isCollapsed && "md:hidden")}>
            <h3 className="px-2 text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground/85">Topics</h3>
            {topicItems.map((item) => (
              <SidebarTextLink
                key={item.href}
                href={item.href}
                label={item.label}
                isCollapsed={isCollapsed}
                isMobileSheet={isMobileSheet}
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
        <SheetContent
          side="left"
          className="w-[92%] overflow-hidden rounded-r-[30px] border-r border-border/60 bg-[#17181d] p-0 text-foreground md:hidden sm:max-w-sm"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
          </SheetHeader>
          {SidebarContent}
        </SheetContent>
      </Sheet>

      <aside
        className={cn(
          "sticky top-0 z-40 hidden h-screen flex-col overflow-hidden border-r border-border/70 bg-muted/35 backdrop-blur-sm transition-[width] duration-200 md:flex",
          isCollapsed ? "w-16" : "w-[280px]",
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
  isMobileSheet,
  isActive,
  onSelect,
}: {
  href: string
  label: string
  isCollapsed: boolean
  isMobileSheet?: boolean
  isActive: boolean
  onSelect?: () => void
}) {
  const content = (
    <Button
      variant="ghost"
      onClick={onSelect}
      className={cn(
        "h-9 w-full rounded-md text-xs font-normal transition-colors",
        isCollapsed ? "mx-auto w-10 justify-center p-0" : "justify-start px-3",
        isMobileSheet && !isCollapsed && "h-10 rounded-xl border border-white/10 bg-white/5 px-3.5 text-sm",
        isActive
          ? isMobileSheet
            ? "border-white/20 bg-white/15 text-foreground"
            : "bg-muted/55 text-foreground"
          : isMobileSheet
            ? "text-muted-foreground hover:bg-white/10 hover:text-foreground"
            : "text-muted-foreground hover:bg-muted/45 hover:text-foreground",
      )}
      asChild
    >
      <Link href={href}>
        <span className={cn("truncate", isCollapsed ? "sr-only" : "max-w-[220px]")}>{label}</span>
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
