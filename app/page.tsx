"use client"

import { useState, Suspense } from "react"
import { Sidebar } from "@/components/sidebar"

export default function HomePage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="site-surface flex min-h-screen flex-col">
    
      <div className="flex flex-1">
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className="site-gradient-bg flex-1 px-4 py-8 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">
            
            <section className="pb-8 lg:pb-10">
            
            </section>

            <Suspense fallback={<div>Loading posts...</div>}>
              
            </Suspense>
          </div>
        </main>
      </div>
      
    </div>
  )
}
