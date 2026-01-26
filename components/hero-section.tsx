"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden mb-8 rounded-3xl bg-white dark:bg-gray-950 text-gray-900 dark:text-white md:p-12">
      <div className="relative z-10 flex flex-col mb-4 gap-10 lg:flex-row lg:items-center lg:justify-between">   
        <div className="max-w-3xl mx-auto text-center">
        <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-6 px-6 py-2 border border-orange-500/30 rounded-full bg-orange-500/10 backdrop-blur-sm">
              <span className="text-orange-600 dark:text-orange-400">RunAsh Blog</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 dark:from-orange-400 dark:via-orange-300 dark:to-yellow-300 text-transparent bg-clip-text">
              Insights & Updates
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">
              Stay up to date with the latest news, tutorials, and insights from the RunAsh AI team.
            </p>
        </div>
        </div>
      </div>
    </section>
  )
}
