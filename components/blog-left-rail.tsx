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
    "block rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
    active && "bg-muted font-medium text-foreground",
  )

  if (href) {
    return (
      <Link href={href} className={baseClass} aria-current={active ? "page" : undefined}>
        {label}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={cn(baseClass, "w-full text-left")}>
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
        <section className="space-y-2.5" aria-labelledby="blog-rail-search-heading">
          <h2 id="blog-rail-search-heading" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Search
          </h2>
          <Input
            value={onSearchChange ? searchQuery ?? "" : undefined}
            defaultValue={onSearchChange ? undefined : ""}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search posts"
            className="h-9 rounded-lg"
          />
        </section>

        {allPostsLink && (
          <section className="space-y-2" aria-labelledby="blog-rail-all-posts-heading">
            <h2 id="blog-rail-all-posts-heading" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              All posts
            </h2>
            <RailItem {...allPostsLink} />
          </section>
        )}

        <section className="space-y-2" aria-labelledby="blog-rail-recent-heading">
          <h2 id="blog-rail-recent-heading" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Recent
          </h2>
          <div className="space-y-0.5">
            {recentLinks.map((link) => (
              <RailItem key={link.label} {...link} />
            ))}
          </div>
        </section>

        <section className="space-y-2" aria-labelledby="blog-rail-topics-heading">
          <h2 id="blog-rail-topics-heading" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Topics
          </h2>
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
