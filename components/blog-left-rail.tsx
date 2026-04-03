"use client"

import Link from "next/link"
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
    "block rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground",
    active && "bg-muted text-foreground",
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
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Search</h2>
          <Input
            value={onSearchChange ? searchQuery ?? "" : undefined}
            defaultValue={onSearchChange ? undefined : ""}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search posts"
            className="h-9 rounded-lg"
          />
        </section>

        {allPostsLink && (
          <section className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">All posts</h2>
            <RailItem {...allPostsLink} />
          </section>
        )}

        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Recent</h2>
          <div className="space-y-0.5">
            {recentLinks.map((link) => (
              <RailItem key={link.label} {...link} />
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Topics</h2>
          <div className="space-y-0.5">
            {topicLinks.map((link) => (
              <RailItem key={link.label} {...link} />
            ))}
          </div>
        </section>
      </div>
    </aside>
  )
}
