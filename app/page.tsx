"use client"

import { useState, Suspense } from "react"
import { BlogGrid } from "@/components/blog-grid"
import { HeroSection } from "@/components/hero-section"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        {/* <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} /> */}
        <main className="flex-1 p-6">
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
