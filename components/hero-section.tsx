"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-zinc-950 pt-10 pb-16 md:pt-20 md:pb-24">
      {/* 1. Decorative Emoji Pile (Matching your screenshot style) */}
      <div className="relative h-48 md:h-64 flex justify-center items-end select-none pointer-events-none mb-8 md:mb-12">
        <div className="flex flex-wrap justify-center max-w-4xl px-4 gap-[-15px] md:gap-[-25px]">
          {/* Staggered emojis with varying sizes for an organic "pile" look */}
          {Array.from({ length: 14 }).map((_, i) => (
            <span 
              key={i} 
              className={cn(
                "transform transition-transform duration-500 hover:scale-110 drop-shadow-xl",
                i % 2 === 0 ? "text-6xl md:text-8xl" : "text-5xl md:text-7xl"
              )}
              style={{ 
                marginBottom: `${Math.sin(i) * 15}px`,
                zIndex: Math.floor(Math.random() * 10),
                transform: `rotate(${Math.sin(i) * 10}deg)`
              }}
            >
              🤗
            </span>
          ))}
        </div>
      </div>

      {/* 2. Content Container */}
      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="flex flex-col items-center max-w-3xl mx-auto space-y-6 md:space-y-8">
          
          {/* Badge with pulse effect */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
              RunAsh AI Platform
            </span>
          </div>

          <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 md:text-6xl lg:text-7xl">
            Insights for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Future of AI</span>
          </h1>
          
          <p className="max-w-xl text-lg md:text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Latest updates, deep-dives, and tutorials from the team building RunAsh. 
            Stay ahead in the evolving landscape of AI Research.
          </p>

          {/* Large, touch-friendly CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
            <Button 
              asChild 
              size="lg" 
              className="h-14 px-8 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-500/20 text-lg font-bold transition-all active:scale-95"
            >
              <Link href="#latest">
                Read Latest Posts <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="h-14 px-8 rounded-2xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-lg font-bold active:scale-95"
            >
              <Link href="https://runash.in/ai">
                Explore Platform
              </Link>
            </Button>
          </div>

          {/* Quick social proof / stats */}
          <div className="pt-8 flex items-center gap-4 text-sm text-zinc-400">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-8 w-8 rounded-full border-2 border-white dark:border-zinc-950 bg-zinc-100 dark:bg-zinc-800" />
              ))}
            </div>
            <p>Join <span className="font-bold text-zinc-900 dark:text-zinc-100">5,000+</span> readers</p>
          </div>

        </div>
      </div>
    </section>
  )
                                          }
