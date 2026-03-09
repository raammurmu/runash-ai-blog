"use client"

import type { ComponentType } from "react"
import { BrainCircuit, Cpu, Sparkles, Workflow } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type ModelCard = {
  name: string
  role: string
  summary: string
  traits: string[]
  sampleDialogue: { speaker: "User" | "Model"; text: string }[]
  icon: ComponentType<{ className?: string }>
}

const modelCards: ModelCard[] = [
  {
    name: "RunAsh Nova",
    role: "Content Strategy Model",
    summary: "Plans article angles, outlines, and audience-first hooks for AI product narratives.",
    traits: ["Intent-aware", "SEO-ready", "Editorial tone"],
    icon: Sparkles,
    sampleDialogue: [
      { speaker: "User", text: "Draft a post angle about AI copilots for e-commerce founders." },
      {
        speaker: "Model",
        text: "Lead with measurable wins: faster merchandising decisions, lower support load, and repeat purchase lift. Then include one founder playbook section.",
      },
    ],
  },
  {
    name: "RunAsh Flux",
    role: "Technical Insight Model",
    summary: "Turns product updates into clean technical explainers for builders and growth teams.",
    traits: ["Architecture maps", "Release summaries", "Clean examples"],
    icon: Cpu,
    sampleDialogue: [
      { speaker: "User", text: "Explain why retrieval + memory improved our AI shopping assistant." },
      {
        speaker: "Model",
        text: "Retrieval keeps answers grounded in catalog truth, while memory preserves user context like preferences and price sensitivity for continuity.",
      },
    ],
  },
  {
    name: "RunAsh Orbit",
    role: "Workflow Automation Model",
    summary: "Designs lightweight automations from idea to publish, including review checkpoints.",
    traits: ["Ops-focused", "Fast iteration", "Cross-team alignment"],
    icon: Workflow,
    sampleDialogue: [
      { speaker: "User", text: "Build a weekly publishing routine for product and marketing teams." },
      {
        speaker: "Model",
        text: "Set a Monday insight capture, Wednesday draft review, and Friday release window with analytics feedback loop for the next sprint.",
      },
    ],
  },
]

export function TechDialogueCards() {
  return (
    <section className="mb-10 rounded-3xl border bg-card/50 p-6 backdrop-blur md:p-8">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-orange-500">Model Dialogues</p>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Explore RunAsh AI voices</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
            Click any model card to open a focused dialogue panel with example prompts and responses.
          </p>
        </div>
        <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
          Light / Dark optimized
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {modelCards.map((card) => {
          const Icon = card.icon
          return (
            <Dialog key={card.name}>
              <DialogTrigger asChild>
                <button className="group rounded-2xl border bg-background/80 p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-orange-400/60 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400/40">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                      <Icon className="size-5" />
                    </span>
                    <BrainCircuit className="size-4 text-muted-foreground transition group-hover:text-orange-500" />
                  </div>
                  <h3 className="text-lg font-semibold">{card.name}</h3>
                  <p className="text-sm text-orange-500">{card.role}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{card.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {card.traits.map((trait) => (
                      <span key={trait} className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                        {trait}
                      </span>
                    ))}
                  </div>
                </button>
              </DialogTrigger>

              <DialogContent className="max-w-2xl rounded-2xl border-orange-200/70 p-0 dark:border-orange-900/70">
                <DialogHeader className="border-b bg-gradient-to-r from-orange-500/10 to-transparent px-6 py-5 text-left">
                  <DialogTitle className="text-2xl">{card.name}</DialogTitle>
                  <DialogDescription>{card.role}</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 px-6 py-5">
                  {card.sampleDialogue.map((entry, index) => (
                    <div key={`${card.name}-${index}`} className="rounded-xl border bg-muted/40 p-4">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-orange-500">{entry.speaker}</p>
                      <p className="text-sm leading-relaxed text-foreground">{entry.text}</p>
                    </div>
                  ))}
                  <Button className="w-full rounded-xl bg-orange-600 hover:bg-orange-700">Use this model style</Button>
                </div>
              </DialogContent>
            </Dialog>
          )
        })}
      </div>
    </section>
  )
}
