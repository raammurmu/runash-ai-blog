"use client"

import { Cpu, Sparkles, Bot, Telescope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const dialogueCards = [
  {
    title: "LLM Product Strategy",
    tag: "Roadmap",
    icon: Bot,
    summary: "Turn a model idea into a launch-ready blog narrative.",
    dialogue: [
      ["Founder", "How do we make this post useful for technical readers and product teams?"],
      ["RunAsh AI", "Start with architecture decisions, then add practical experiments and measurable outcomes."],
      ["Founder", "What keeps it modern and clean?"],
      ["RunAsh AI", "Minimal typography, calm spacing, and concise sections with one key insight each."],
    ],
  },
  {
    title: "Agentic Workflows",
    tag: "Automation",
    icon: Cpu,
    summary: "Show how tools, prompts, and APIs orchestrate together.",
    dialogue: [
      ["Editor", "What should our audience immediately understand?"],
      ["RunAsh AI", "That agent loops need clear boundaries, observability, and fallback actions."],
      ["Editor", "How do we make this easy to scan?"],
      ["RunAsh AI", "Use compact cards, short bullets, and visual status chips for each workflow stage."],
    ],
  },
  {
    title: "Future Stack Signals",
    tag: "Trends",
    icon: Telescope,
    summary: "Track where AI infrastructure is heading next.",
    dialogue: [
      ["Researcher", "What signals matter in 2026?"],
      ["RunAsh AI", "Inference economics, multimodal reliability, and secure data-local orchestration."],
      ["Researcher", "How do we present this confidently?"],
      ["RunAsh AI", "Use opinionated takeaways backed by implementation notes and production examples."],
    ],
  },
]

export function RunashTechShowcase() {
  return (
    <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-b from-background to-muted/40 p-6 md:p-10">
      <div className="absolute -top-24 right-0 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative space-y-6">
        <Badge className="rounded-full bg-primary/10 text-primary hover:bg-primary/15">RunAsh AI Blog</Badge>
        <div className="space-y-3 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Professional, modern, and clean tech storytelling.
          </h1>
          <p className="text-muted-foreground md:text-lg">
            A custom RunAsh experience built for light and dark themes with focused design, crisp readability, and AI-first content discovery.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {dialogueCards.map((card) => {
            const Icon = card.icon
            return (
              <Dialog key={card.title}>
                <DialogTrigger asChild>
                  <button className="group rounded-2xl border bg-card/80 p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-2 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-2">
                      <Badge variant="secondary" className="rounded-full">{card.tag}</Badge>
                      <h3 className="text-lg font-medium">{card.title}</h3>
                      <p className="text-sm text-muted-foreground">{card.summary}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                        Open dialogue <Sparkles className="h-4 w-4" />
                      </span>
                    </div>
                  </button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-2xl rounded-2xl">
                  <DialogHeader>
                    <DialogTitle>{card.title}</DialogTitle>
                    <DialogDescription>
                      AI model dialogue card for editorial and engineering alignment.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3">
                    {card.dialogue.map(([speaker, line], index) => (
                      <div key={`${speaker}-${index}`} className="rounded-xl border bg-muted/40 p-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{speaker}</p>
                        <p className="text-sm text-foreground/90">{line}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline">Continue reading</Button>
                  </div>
                </DialogContent>
              </Dialog>
            )
          })}
        </div>
      </div>
    </section>
  )
}
