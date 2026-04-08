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
    "block rounded-md px-2 py-1 text-[0.92rem] leading-snug text-foreground/75 transition-colors hover:text-foreground",
    active && "rounded-lg bg-muted text-foreground",
  )

  if (href) {
    return (
      <Link href={href} className={baseClass}>
        <span className="line-clamp-2">{label}</span>
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={cn(baseClass, "w-full text-left")}>
      <span className="line-clamp-2">{label}</span>
    </button>
  )
}

function TopicRailItem({ label, href, onClick, active }: RailLink) {
  const baseClass = cn(
    "block rounded-md px-1.5 py-0.5 text-[0.86rem] leading-snug text-foreground/70 transition-colors hover:text-foreground",
    active && "text-foreground",
  )

  if (href) {
    return (
      <Link href={href} className={baseClass}>
        <span className="line-clamp-2">{label}</span>
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={cn(baseClass, "w-full text-left")}>
      <span className="line-clamp-2">{label}</span>
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
      <div className="space-y-4.5">
        <section className="space-y-1.5">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" />
            <Input
              value={onSearchChange ? searchQuery ?? "" : undefined}
              defaultValue={onSearchChange ? undefined : ""}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search"
              className="h-8 rounded-md border-border/40 bg-muted/20 pl-8 pr-12 text-xs"
            />
            <div className="pointer-events-none absolute right-2 top-1/2 flex h-4 -translate-y-1/2 items-center gap-1">
              <Badge
                variant="outline"
                className="h-4 rounded-sm border-border/40 bg-background/80 px-1 text-[9px] text-muted-foreground"
              >
                ⌘
              </Badge>
              <Badge
                variant="outline"
                className="h-4 rounded-sm border-border/40 bg-background/80 px-1 text-[9px] text-muted-foreground"
              >
                K
              </Badge>
            </div>
          </div>
        </section>

        {allPostsLink && (
          <section className="space-y-1">
            <RailItem {...allPostsLink} />
          </section>
        )}

        <section className="space-y-1.5">
          <h2 className="text-[0.72rem] font-semibold uppercase tracking-wide text-foreground/70">Recent</h2>
          <div className="space-y-0">
            {recentLinks.map((link) => (
              <RailItem key={link.label} {...link} />
            ))}
          </div>
        </section>

        <section className="space-y-1.5">
          <h2 className="text-[0.72rem] font-semibold uppercase tracking-wide text-foreground/70">Topics</h2>
          <div className="space-y-0">
            {topicLinks.map((link) => (
              <TopicRailItem key={link.label} {...link} />
            ))}
          </div>
        </section>
      </div>
    </aside>
  )
}
