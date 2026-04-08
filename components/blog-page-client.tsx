"use client"

import { useState } from "react"
import { PanelLeft } from "lucide-react"

import { BlogFeed } from "@/components/blog-feed"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/types"

interface BlogPageClientProps {
  posts: BlogPost[]
}

export function BlogPageClient({ posts }: BlogPageClientProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileRailOpen, setMobileRailOpen] = useState(false)

  return (
    <div className="site-surface flex min-h-screen flex-col">
      <Header />
      <div className="sticky top-11 z-50 border-b border-border/60 bg-background/95 px-4 py-2 backdrop-blur md:hidden">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 rounded-md px-2.5 text-xs"
            onClick={() => setMobileRailOpen(true)}
          >
            <PanelLeft className="size-3.5" />
            Browse
          </Button>
          <span className="text-xs font-medium tracking-wide text-muted-foreground">Latest posts</span>
        </div>
      </div>
      <div className="flex flex-1">
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          isMobileOpen={mobileRailOpen}
          setMobileOpen={setMobileRailOpen}
        />

        <main className="site-gradient-bg flex-1 px-4 py-6 sm:py-8 lg:px-8">
          <div className="mx-auto w-full max-w-5xl">
            <section className="py-4 sm:py-6 lg:py-10">
              <div className="mx-auto max-w-3xl text-center">
                <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">RunAsh Blog</h1>
                <p className="mt-3 text-base text-gray-600 dark:text-gray-400 sm:mt-4 sm:text-lg">
                  Insights, product updates, and practical guides from the RunAsh AI team.
                </p>
              </div>
            </section>

            <section className="pb-8 sm:pb-10">
              <BlogFeed posts={posts} />
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
