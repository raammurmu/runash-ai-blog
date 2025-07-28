import { Suspense } from "react"
import { BlogGrid } from "@/components/blog-grid"
import { HeroSection } from "@/components/hero-section"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <HeroSection />
          <Suspense fallback={<div>Loading posts...</div>}>
            <BlogGrid />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
