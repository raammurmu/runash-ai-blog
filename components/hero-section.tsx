"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function HeroSection() {
  return (
    <section className="mb-8 rounded-2xl bg-gradient-to-br from-orange-400 to-yellow-500 p-8 text-white">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <Badge className="bg-white/20 text-white">Blog</Badge>
          <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
            RunAsh AI Blogs
          </h1>
          <p className="mt-3 text-white/90">
            Learn latest updates, article and insights about RunAsh AI
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild size="sm" className="shadow-sm bg-white text-orange-600 hover:bg-white/90">
              <Link href="#latest">Read latest posts</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="shadow-sm bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <Link href="/category/ai">Explore RunAsh AI</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="shadow-sm bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <Link href="/category/ai">Documentation</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="shadow-sm bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <Link href="/category/ai">GitHub</Link>
            </Button>
          </div>
        </div>

        <div className="w-full md:w-80 rounded-xl bg-white/10 p-4">
          <div className="rounded-lg bg-white p-4 text-black shadow-sm">
            <h3 className="font-semibold">What you’ll learn</h3>
            <Separator className="my-3" />
            <ul className="space-y-2 text-sm">
              <li>{"• Article"}</li>
              <li>{"• Research"}</li>
              <li>{"• Features"}</li>
              <li>{"• Updats"}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
