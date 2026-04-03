"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface RailLink {
  label: string
  href?: string
  onClick?: () => void
  active?: boolean
}

interface BlogLeftRailProps {
  searchQuery?: string
  onSearchChange?: (value: string) => void
  allPostsLink?: RailLink
  recentLinks: RailLink[]
  topicLinks: RailLink[]
  className?: string
}

function RailItem({ label, href, onClick, active }: RailLink) {
  const baseClass = cn(
    "block rounded-md px-2 py-1.5 text-sm text-foreground/80 transition-colors hover:text-foreground",
    active && "bg-black/10 text-foreground",
  )

  if (href) {
    return (
      <Link href={href} className={baseClass}>
        {label}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={cn(baseClass, "w-full text-left")}>
      {label}
    </button>
  )
}

function TopicRailItem({ label, href, onClick, active }: RailLink) {
  const baseClass = cn(
    "block rounded-md px-1.5 py-1 text-sm text-foreground/75 transition-colors hover:text-foreground",
    active && "text-foreground",
  )

  if (href) {
    return (
      <Link href={href} className={baseClass}>
        {label}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={cn(baseClass, "w-full text-left")}>
      {label}
    </button>
  )
}

export function BlogLeftRail({
  searchQuery,
  onSearchChange,
  allPostsLink,
  recentLinks,
  topicLinks,
  className,
}: BlogLeftRailProps) {
  return (
    <aside className={cn("h-fit", className)}>
      <div className="space-y-6">
        <section className="space-y-2.5">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
            <Input
              value={onSearchChange ? searchQuery ?? "" : undefined}
              defaultValue={onSearchChange ? undefined : ""}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search"
              className="h-9 rounded-lg border-border/60 bg-background pl-9 pr-14"
            />
            <Badge
              variant="outline"
              className="pointer-events-none absolute right-2 top-1/2 h-5 -translate-y-1/2 rounded-md px-1.5 text-[10px] text-muted-foreground"
            >
              K
            </Badge>
          </div>
        </section>

        {allPostsLink && (
          <section className="space-y-2">
            <RailItem {...allPostsLink} />
          </section>
        )}

        <section className="space-y-2">
          <h2 className="text-xs font-medium text-foreground">Recent</h2>
          <div className="space-y-0.5">
            {recentLinks.map((link) => (
              <RailItem key={link.label} {...link} />
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-xs font-medium text-foreground">Topics</h2>
          <div className="space-y-0.5">
            {topicLinks.map((link) => (
              <TopicRailItem key={link.label} {...link} />
            ))}
          </div>
        </section>
      </div>
    </aside>
  )
}
