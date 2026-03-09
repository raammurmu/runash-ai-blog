"use client"

import { useState, Suspense } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { BlogFeed } from "@/components/blog-feed"
import { Footer } from "@/components/footer"

export default function BlogPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className="flex-1 px-4 py-8 lg:px-8">
          <Suspense fallback={<div>Loading posts...</div>}>
            <BlogFeed />
          </Suspense>
        </main>
      </div>
      <Footer />
    </div>
  )
}
