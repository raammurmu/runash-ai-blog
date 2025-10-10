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
          <Badge className="bg-white/20 text-white">Editorial</Badge>
          <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
            Practical guides for building real-time, AI-powered products
          </h1>
          <p className="mt-3 text-white/90">
            Learn how to ship live streaming, AI inference, payments, and chat features with scalable APIs and a great
            developer experience.
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
              <Link href="/category/ai">Explore AI</Link>
            </Button>
          </div>
        </div>

        <div className="w-full md:w-80 rounded-xl bg-white/10 p-4">
          <div className="rounded-lg bg-white p-4 text-black shadow-sm">
            <h3 className="font-semibold">What you’ll learn</h3>
            <Separator className="my-3" />
            <ul className="space-y-2 text-sm">
              <li>{"• Real-time video pipelines and QoS best practices"}</li>
              <li>{"• AI-driven recommendations and moderation"}</li>
              <li>{"• Payments, subscriptions, and webhooks"}</li>
              <li>{"• Production-grade API design and testing"}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
