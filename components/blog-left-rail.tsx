"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
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
    "block rounded-lg px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground",
    active && "bg-muted/75 text-foreground",
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
    "block rounded-md px-1.5 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground",
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
    <aside className={cn("h-fit rounded-2xl border border-border/70 bg-background p-5", className)}>
      <div className="space-y-7">
        <section className="space-y-2.5">
          <h2 className="text-xs font-medium text-muted-foreground/85">Search</h2>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
            <Input
              value={onSearchChange ? searchQuery ?? "" : undefined}
              defaultValue={onSearchChange ? undefined : ""}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search posts"
              className="h-9 rounded-lg pl-9"
            />
          </div>
        </section>

        {allPostsLink && (
          <section className="space-y-2">
            <h2 className="text-xs font-medium text-muted-foreground/85">All posts</h2>
            <RailItem {...allPostsLink} />
          </section>
        )}

        <section className="space-y-2">
          <h2 className="text-xs font-medium text-muted-foreground/85">Recent</h2>
          <div className="space-y-0.5">
            {recentLinks.map((link) => (
              <RailItem key={link.label} {...link} />
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-xs font-medium text-muted-foreground/85">Topics</h2>
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
