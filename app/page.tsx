"use client"

import { useState, Suspense } from "react"
import { BlogGrid } from "@/components/blog-grid"
import { HeroSection } from "@/components/hero-section"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHighlights } from "@/components/page-highlights"

export default function HomePage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className="flex-1 px-4 py-8 lg:px-8">
          <HeroSection
            badge="RunAsh Magazine"
            title="Built for AI commerce stories"
            description="Discover launch updates, founder notes, tutorials, and experiments shaping the future of live commerce."
            primaryCta={{ label: "Browse all posts", href: "/blog" }}
            secondaryCta={{ label: "Publish article", href: "/create" }}
          />
          <PageHighlights />
          <Suspense fallback={<div>Loading posts...</div>}>
            <BlogGrid />
          </Suspense>
        </main>
      </div>
      <Footer />
    </div>
  )
}
