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
    <div className="site-surface flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className="site-gradient-bg flex-1 px-4 py-8 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <section className="py-6 lg:py-10">
              <HeroSection
                badge="Blog"
                title="RunAsh AI Blog"
                description="Discover launch updates, founder notes, tutorials, and experiments shaping the future of live commerce."
                primaryCta={{ label: "Browse All posts", href: "/blog" }}
              />
            </section>

            <section className="pb-8 lg:pb-10">
              <PageHighlights />
            </section>

            <Suspense fallback={<div>Loading posts...</div>}>
              <BlogGrid />
            </Suspense>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
