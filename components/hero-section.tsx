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
    <section className="site-gradient-bg relative mb-8 overflow-hidden rounded-3xl border border-orange-200/70 text-gray-900 shadow-xl dark:border-orange-900/40 dark:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,146,60,0.18),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_5%,rgba(234,179,8,0.14),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-orange-200/20 to-transparent dark:from-orange-800/20" />

      <div className="relative z-10 flex flex-col items-center px-4 py-12 text-center sm:px-8 sm:py-16 md:px-10 lg:px-12 lg:py-20">
        <Badge
          variant="secondary"
          className="mb-5 gap-1 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1 text-orange-700 dark:text-orange-300"
        >
          <Sparkles className="h-3.5 w-3.5" /> {badge}
        </Badge>

        <h1 className="max-w-4xl bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 bg-clip-text text-balance text-4xl font-extrabold tracking-tight text-transparent dark:from-orange-400 dark:via-orange-300 dark:to-yellow-300 sm:text-5xl md:text-6xl">
          {title}
        </h1>

        <p className="mt-4 max-w-2xl text-sm text-gray-700 dark:text-gray-300 sm:text-base md:text-lg">{description}</p>

        <div className="mt-8 w-full max-w-3xl rounded-2xl border border-orange-200 bg-white/60 p-2 backdrop-blur-sm dark:border-orange-900/40 dark:bg-gray-900/50 sm:rounded-full">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full px-3 py-2 sm:px-4">
              <Search className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search topics, guides, or releases"
                className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none dark:text-gray-200 dark:placeholder:text-gray-500"
                aria-label="Search blog topics"
              />
            </div>
            <Button className="rounded-full bg-gradient-to-r from-orange-600 to-yellow-600 text-white hover:from-orange-700 hover:to-yellow-700 dark:from-orange-500 dark:to-yellow-500 dark:hover:from-orange-600 dark:hover:to-yellow-600">Search</Button>
          </div>
        </div>

        <div className="mt-5 flex w-full max-w-4xl flex-wrap items-center justify-center gap-2 sm:gap-3">
          {HERO_CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              className="rounded-full border border-orange-200/80 bg-white/70 px-4 py-2 text-sm text-gray-700 transition hover:bg-orange-100 hover:text-orange-700 active:scale-[0.98] dark:border-orange-900/40 dark:bg-gray-900/60 dark:text-gray-200 dark:hover:bg-orange-900/30 dark:hover:text-orange-300"
            >
              {chip}
            </button>
          ))}
        </div>

        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {primaryCta ? (
              <Button asChild className="rounded-full bg-gradient-to-r from-orange-600 to-yellow-600 text-white hover:from-orange-700 hover:to-yellow-700 dark:from-orange-500 dark:to-yellow-500 dark:hover:from-orange-600 dark:hover:to-yellow-600">
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
            ) : null}
            {secondaryCta ? (
              <Button
                asChild
                variant="outline"
                className="rounded-full border-orange-300 bg-white/70 text-orange-700 hover:bg-orange-100 hover:text-orange-800 dark:border-orange-800/40 dark:bg-gray-900/40 dark:text-orange-300 dark:hover:bg-orange-900/30 dark:hover:text-orange-200"
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
