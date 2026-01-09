"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function HeroSection() {
  const learningPoints = [
    "Real-time video pipelines & QoS",
    "AI-driven recommendations",
    "Payments and webhooks",
    "Production-grade API design",
  ]

  const stats = [
    { label: "Guides", value: "150+" },
    { label: "Readers", value: "12k" },
    { label: "Uptime", value: "99.9%" },
  ]

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-amber-500 p-8 text-white shadow-xl md:p-12">
      {/* Background Pattern - Subtle SVG Overlay */}
      <div className="absolute inset-0 opacity-10 [mask-image:linear-gradient(to_bottom,white,transparent)]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_340px] lg:items-center">
        
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <Badge className="bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-md border-white/10">
              Editorial v2.0
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-7xl">
              Build the future <br />
              <span className="text-orange-200">in real-time.</span>
            </h1>
            <p className="max-w-xl text-lg text-orange-50/90 leading-relaxed">
              Master live streaming, AI inference, and scalable payments through 
              practical, developer-focused guides written by engineers.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-50 shadow-lg px-8">
              <Link href="#latest">Read latest posts</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 hover:bg-white/20 backdrop-blur-sm">
              <Link href="/category/ai">Explore AI</Link>
            </Button>
          </div>

          {/* New Stats Row */}
          <div className="flex gap-8 pt-4 border-t border-white/10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs uppercase tracking-wider text-orange-100/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card */}
        <div className="group relative hidden md:block">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-white/30 to-transparent blur transition duration-300 group-hover:opacity-100" />
          <div className="relative rounded-2xl bg-white p-6 text-slate-900 shadow-2xl">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <h3 className="text-sm font-bold uppercase tracking-tight text-slate-500">Curriculum</h3>
            </div>
            <h4 className="text-xl font-bold">What you’ll learn</h4>
            <Separator className="my-4 bg-slate-100" />
            <ul className="space-y-4">
              {learningPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm font-medium text-slate-600 leading-tight">
                  <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[10px] text-orange-600">
                    ✓
                  </div>
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-xl bg-slate-50 p-3 text-center text-xs font-semibold text-slate-400">
              Updated Weekly
            </div>
          </div>
        </div>
        
      </div>
    </section>
  )
        }
