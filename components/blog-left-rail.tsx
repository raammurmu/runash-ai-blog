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
    "block min-h-8 rounded-md px-2 py-0.5 text-[0.84rem] leading-snug text-foreground/70 transition-colors hover:text-foreground",
    active && "bg-accent/55 text-accent-foreground ring-1 ring-inset ring-border/45",
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
    "block min-h-8 rounded-md px-1.5 py-0.5 text-[0.8rem] leading-snug text-foreground/65 transition-colors hover:text-foreground",
    active && "bg-accent/45 text-accent-foreground ring-1 ring-inset ring-border/35",
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
      <div className="space-y-4">
        <section className="space-y-1">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground/60" />
            <Input
              value={onSearchChange ? searchQuery ?? "" : undefined}
              defaultValue={onSearchChange ? undefined : ""}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search"
              className="h-7 rounded-md border-border/35 bg-muted/20 pl-8 pr-11 text-[11px]"
            />
            <div className="pointer-events-none absolute right-2 top-1/2 flex h-4 -translate-y-1/2 items-center gap-1">
              <Badge
                variant="outline"
                className="h-4 rounded-sm border-border/25 bg-muted/25 px-1 text-[9px] text-muted-foreground/70"
              >
                ⌘
              </Badge>
              <Badge
                variant="outline"
                className="h-4 rounded-sm border-border/25 bg-muted/25 px-1 text-[9px] text-muted-foreground/70"
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
          <h2 className="text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-foreground/60">Recent</h2>
          <div className="space-y-0.5">
            {recentLinks.map((link) => (
              <RailItem key={link.label} {...link} />
            ))}
          </div>
        </section>

        <section className="space-y-1">
          <h2 className="text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-foreground/60">Topics</h2>
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
