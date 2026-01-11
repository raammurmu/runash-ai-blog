"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const TOPICS = [
  "Documentation",
  "Changelog",
  "Tutorials",
  "Community",
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-yellow-500 p-8 text-white md:p-12">
      <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        
        {/* Left Content */}
        <div className="max-w-2xl space-y-6">
          <Badge variant="outline" className="border-white/40 bg-white/10 text-white backdrop-blur-sm">
            RunAsh
          </Badge>
          
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            Blog<br className="hidden md:block" />
            
          </h1>
          
          <p className="max-w-lg text-lg text-orange-50/90 leading-relaxed">
            Latest updates, articles, insights and tutorials about RunAsh
          </p>

          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
              <Link href="#latest">Read latest posts</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10">
              <Link href="https://runash.in/ai">Explore AI</Link>
            </Button>
          </div>
        </div>

        {/* Right Feature Card */}
        {/* <div className="w-full lg:w-96">
          <div className="rounded-2xl bg-white/10 p-1 backdrop-blur-md">
            <div className="rounded-[14px] bg-white p-6 text-slate-900 shadow-xl">
              <h3 className="text-sm font-bold uppercase tracking-wider text-orange-600">
                Learn more 
              </h3>
              <div className="mt-4 h-px bg-slate-100" />
              <ul className="mt-4 space-y-3">
                {TOPICS.map((topic) => (
                  <li key={topic} className="flex items-start gap-3 text-sm font-medium text-slate-600">
                    <span className="text-orange-500">→</span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div> 
        </div>
      </div> */}
    </section>
  )
  }
