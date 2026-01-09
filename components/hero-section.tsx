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

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-amber-500 p-8 text-white shadow-xl md:p-12">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_320px] lg:items-center">
        
        {/* Left Content */}
        <div className="space-y-6">
          <Badge className="bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-md">
            Editorial
          </Badge>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              Build real-time, <br />
              <span className="text-orange-100">AI-powered products</span>
            </h1>
            <p className="max-w-xl text-lg text-orange-50/90 leading-relaxed">
              Master live streaming, AI inference, and scalable payments through 
              practical, developer-focused guides.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-50 shadow-lg">
              <Link href="#latest">Read latest posts</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 hover:bg-white/20">
              <Link href="/category/ai">Explore AI</Link>
            </Button>
          </div>
        </div>

        {/* Right Card */}
        <div className="group relative">
          <div className="absolute -inset-1 rounded-2xl bg-white/20 blur transition duration-300 group-hover:bg-white/30" />
          <div className="relative rounded-2xl bg-white p-6 text-slate-900 shadow-2xl">
            <h3 className="text-lg font-bold">What you’ll learn</h3>
            <Separator className="my-4 bg-slate-100" />
            <ul className="space-y-3">
              {learningPoints.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm font-medium text-slate-600">
                  <span className="text-orange-500">→</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
      </div>
    </section>
  )
}
