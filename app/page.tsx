"use client"

import { useState, Suspense } from "react"
import { BlogGrid } from "@/components/blog-grid"
import { HeroSection } from "@/components/hero-section"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHighlights } from "@/components/page-highlights"
import { TechDialogueCards } from "@/components/tech-dialogue-cards"

export default function HomePage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className="flex-1 px-4 py-8 lg:px-8">
          <HeroSection
            badge="RunAsh AI Blog"
            title="A modern, clean home for AI and tech stories"
            description="Explore the latest product insights, engineering notes, and practical playbooks in a professional reading experience designed for light and dark themes."
            primaryCta={{ label: "Read latest posts", href: "/blog" }}
            secondaryCta={{ label: "Start writing", href: "/create" }}
          />
          <PageHighlights />
          <TechDialogueCards />
          <Suspense fallback={<div>Loading posts...</div>}>
            <BlogGrid />
          </Suspense>
        </main>
      </div>
      <Footer />
    </div>
  )
}
