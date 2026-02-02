"use client"

import { useState, Suspense } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { HeroSection } from "@/components/hero-section"
import { BlogGrid } from "@/components/blog-grid"
import { Footer } from "@/components/footer"

export default function BlogPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className="flex-1 px-4 py-8 lg:px-8">
          <HeroSection />
          <Suspense fallback={<div>Loading posts...</div>}>
            <BlogGrid />
          </Suspense>
        </main>
      </div>
      <Footer />
    </div>
  )
}
