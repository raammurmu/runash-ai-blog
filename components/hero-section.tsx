"use client"

import Link from "next/link"
import { Search, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type HeroSectionProps = {
  badge?: string
  title?: string
  description?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

const HERO_CHIPS = [
  "Agents",
  "Voice",
  "Fine-tuning",
  "Reasoning",
  "Embeddings",
  "Safety",
]

export function HeroSection({
  badge = "RunAsh Blog",
  title = "Get inspired and build",
  description = "Discover practical guides, product updates, and implementation ideas for building with modern AI.",
  primaryCta,
  secondaryCta,
}: HeroSectionProps) {
  return (
    <section className="relative mb-8 overflow-hidden rounded-3xl border border-white/10 bg-black text-white shadow-2xl dark:bg-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,146,60,0.14),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_5%,rgba(59,130,246,0.16),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/[0.03] to-transparent" />

      <div className="relative z-10 flex flex-col items-center px-4 py-12 text-center sm:px-8 sm:py-16 md:px-10 lg:px-12 lg:py-20">
        <Badge
          variant="secondary"
          className="mb-5 gap-1 rounded-full border border-white/15 bg-white/10 px-4 py-1 text-white"
        >
          <Sparkles className="h-3.5 w-3.5" /> {badge}
        </Badge>

        <h1 className="max-w-4xl text-balance text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          {title}
        </h1>

        <p className="mt-4 max-w-2xl text-sm text-white/70 sm:text-base md:text-lg">{description}</p>

        <div className="mt-8 w-full max-w-3xl rounded-2xl border border-white/15 bg-white/[0.04] p-2 backdrop-blur-sm sm:rounded-full">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full px-3 py-2 sm:px-4">
              <Search className="h-4 w-4 shrink-0 text-white/50" />
              <input
                type="text"
                placeholder="Search topics, guides, or releases"
                className="w-full bg-transparent text-sm text-white placeholder:text-white/45 focus:outline-none"
                aria-label="Search blog topics"
              />
            </div>
            <Button className="rounded-full border border-white/15 bg-white text-black hover:bg-white/90">Search</Button>
          </div>
        </div>

        <div className="mt-5 flex w-full max-w-4xl flex-wrap items-center justify-center gap-2 sm:gap-3">
          {HERO_CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white/80 transition hover:bg-white/[0.08] hover:text-white active:scale-[0.98]"
            >
              {chip}
            </button>
          ))}
        </div>

        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {primaryCta ? (
              <Button asChild className="rounded-full bg-white text-black hover:bg-white/90">
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
            ) : null}
            {secondaryCta ? (
              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            ) : null}
          </div>
        )}
      </div>
    </section>
  )
}
