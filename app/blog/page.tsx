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
      <div className="mx-auto flex w-full max-w-[1180px] flex-1">
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className="flex flex-1 justify-center px-4 py-8 md:px-6 lg:px-10">
          <Suspense fallback={<div>Loading posts...</div>}>
            <BlogFeed />
          </Suspense>
        </main>
      </div>
      <Footer />
    </div>
  )
}
