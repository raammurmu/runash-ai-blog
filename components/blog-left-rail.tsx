"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
    "block min-h-7 rounded-md px-2 py-0.5 text-[0.79rem] leading-snug text-foreground/70 transition-colors hover:text-foreground",
    active && "text-foreground",
    active && "rounded-lg bg-muted text-foreground",
    active && "ring-1 ring-inset ring-border/45",
  )

  if (href) {
    return (
      <Button variant="ghost" asChild className={baseClass}>
        <Link href={href}>
          <span className="line-clamp-2 text-left">{label}</span>
        </Link>
      </Button>
    )
  }

  return (
    <Button type="button" variant="ghost" onClick={onClick} className={cn(baseClass, "w-full")}>
      <span className="line-clamp-2">{label}</span>
    </Button>
  )
}

function TopicRailItem({ label, href, onClick, active }: RailLink) {
  const baseClass = cn(
    "block min-h-7 rounded-md px-1.5 py-0.5 text-[0.76rem] leading-snug text-foreground/65 transition-colors hover:text-foreground",
    active && "text-foreground",
    active && "rounded-lg bg-muted text-foreground",
    active && "ring-1 ring-inset ring-border/35",
  )

  if (href) {
    return (
      <Button variant="ghost" asChild className={baseClass}>
        <Link href={href}>
          <span className="line-clamp-2 text-left">{label}</span>
        </Link>
      </Button>
    )
  }

  return (
    <Button type="button" variant="ghost" onClick={onClick} className={cn(baseClass, "w-full")}>
      <span className="line-clamp-2">{label}</span>
    </Button>
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
      <div className="space-y-3.5">
        <section className="space-y-1">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground/60" />
            <Input
              value={onSearchChange ? searchQuery ?? "" : undefined}
              defaultValue={onSearchChange ? undefined : ""}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search"
              className="h-7 rounded-md border-border/35 bg-muted/20 pl-8 pr-11 text-[10.5px] text-foreground/85 placeholder:text-muted-foreground/60"
            />
            <div className="pointer-events-none absolute right-2 top-1/2 flex h-4 -translate-y-1/2 items-center gap-1">
              <Badge
                variant="outline"
                className="h-4 rounded-sm border-border/20 bg-muted/15 px-1 text-[9px] font-normal text-muted-foreground/60"
              >
                ⌘
              </Badge>
              <Badge
                variant="outline"
                className="h-4 rounded-sm border-border/20 bg-muted/15 px-1 text-[9px] font-normal text-muted-foreground/60"
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

        <section className="space-y-1">
          <h2 className="px-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-foreground/58">Recent</h2>
          <div className="space-y-px">
            {recentLinks.map((link) => (
              <RailItem key={link.label} {...link} />
            ))}
          </div>
        </section>

        <section className="space-y-1">
          <h2 className="px-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-foreground/58">Topics</h2>
          <div className="space-y-px">
            {topicLinks.map((link) => (
              <TopicRailItem key={link.label} {...link} />
            ))}
          </div>
        </section>
      </div>
    </aside>
  )
}
