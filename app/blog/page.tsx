"use client"

import { useMemo, useState } from "react"

import { EditorialPostCard } from "@/components/editorial-post-card"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { getAllPosts } from "@/lib/blog-data"

export default function BlogPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const posts = useMemo(() => getAllPosts(), [])

  return (
    <div className="site-surface flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

        <main className="site-gradient-bg flex-1 px-4 py-8 lg:px-8">
          <div className="mx-auto w-full max-w-5xl">
            <section className="py-6 lg:py-10">
              <div className="mx-auto max-w-3xl text-center">
                <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">RunAsh Blog</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                  Insights, product updates, and practical guides from the RunAsh AI team.
                </p>
              </div>
            </section>

            <section className="pb-10">
              <div className="mx-auto w-full max-w-4xl space-y-14">
                {posts.map((post) => (
                  <EditorialPostCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
