"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden mb-12 rounded-[2.5rem] bg-slate-950 p-1 md:p-1.5 shadow-2xl">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-amber-400" />
      
      {/* Decorative Glows & Patterns */}
      <div className="absolute -top-24 -left-24 size-96 bg-yellow-400/30 blur-[100px] rounded-full" />
      <div className="absolute top-1/2 right-0 size-64 bg-orange-400/20 blur-[80px] rounded-full translate-x-1/2" />
      <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between bg-white/5 backdrop-blur-sm rounded-[2.2rem] p-8 md:p-16 border border-white/10">
        
        {/* Left Content */}
        <div className="max-w-2xl space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
            <Sparkles className="size-4 text-yellow-300 fill-yellow-300" />
            <span className="text-xs font-black uppercase tracking-[0.15em] text-white">
              RunAsh Ecosystem
            </span>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl font-black tracking-tight text-white md:text-6xl lg:text-7xl leading-[0.95]">
              Insights that <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-100">
                fuel your build.
              </span>
            </h1>
            
            <p className="max-w-md text-lg md:text-xl text-orange-50/80 leading-relaxed font-medium">
              Dive into the latest updates, deep-dive articles, and engineering tutorials curated by the RunAsh team.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button 
              asChild 
              size="lg" 
              className="group h-14 px-8 rounded-2xl bg-white text-orange-600 hover:bg-orange-50 font-bold text-base shadow-xl shadow-orange-950/20 transition-all hover:scale-105"
            >
              <Link href="#latest">
                Start Reading
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 rounded-2xl border-white/30 bg-white/5 text-white hover:bg-white/10 font-bold text-base backdrop-blur-md"
            >
              <Link href="https://runash.in/ai" className="flex items-center gap-2">
                <Zap className="size-4 text-yellow-300 fill-yellow-300" />
                Explore AI
              </Link>
            </Button>
          </div>
        </div>

        {/* Decorative Right Side (Optional: Visual Element) */}
        <div className="hidden lg:block relative group">
          <div className="relative size-72 rounded-[3rem] bg-gradient-to-br from-white/20 to-white/5 border border-white/20 flex items-center justify-center rotate-3 group-hover:rotate-6 transition-transform duration-500">
             <div className="size-48 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center transform -rotate-12 group-hover:-rotate-6 transition-transform duration-500">
                <span className="text-orange-500 font-black text-6xl">RA</span>
             </div>
             {/* Floating Badges */}
             <div className="absolute -top-4 -right-4 bg-yellow-400 text-slate-900 px-4 py-2 rounded-xl font-black text-xs shadow-lg animate-bounce">
               NEW POST
             </div>
          </div>
        </div>
      </div>
    </section>
  )
        }
