"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden mb-12 rounded-[2.5rem] bg-gradient-to-br from-orange-600 via-orange-500 to-amber-400 p-8 text-white md:p-16 shadow-2xl shadow-orange-500/20">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 size-[500px] bg-white/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 size-[400px] bg-amber-300/20 rounded-full blur-[100px]" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
        
        {/* Left Content */}
        <div className="max-w-2xl space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md shadow-inner">
            <Sparkles className="size-4 text-amber-200 fill-amber-200" />
            <span className="text-xs font-bold uppercase tracking-widest text-orange-50">Insights Hub</span>
          </div>
          
          <h1 className="text-5xl font-black tracking-tighter md:text-7xl lg:text-8xl leading-[0.9]">
            The Future <br /> 
            <span className="text-amber-200">of Stream.</span>
          </h1>
          
          <p className="max-w-md text-xl text-orange-50/80 font-medium leading-snug">
            Deep dives into real-time AI processing, multi-platform growth, and creator tutorials.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Button asChild size="lg" className="h-14 px-8 rounded-2xl bg-white text-orange-600 hover:bg-orange-50 font-bold text-lg shadow-xl hover:scale-105 transition-all">
              <Link href="#latest">Start Reading</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 px-8 rounded-2xl border-white/30 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm font-bold text-lg group">
              <Link href="https://runash.in/ai" className="flex items-center gap-2">
                Explore AI <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Side Visual (Optional: Could be an Image or Abstract Shape) */}
        <div className="hidden lg:block relative group">
           <div className="relative size-64 bg-white/10 backdrop-blur-2xl rounded-[3rem] border border-white/20 flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-500">
              <div className="size-40 rounded-3xl bg-gradient-to-tr from-orange-400 to-amber-200 flex items-center justify-center shadow-2xl">
                 <span className="text-6xl font-black text-orange-600">RA</span>
              </div>
              {/* Floating Accents */}
              <div className="absolute -top-4 -right-4 size-16 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/30 animate-bounce" />
           </div>
        </div>
      </div>
    </section>
  )
      }
