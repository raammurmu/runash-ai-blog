import Link from "next/link"
import { BarChart3, PenSquare, Rocket, Search } from "lucide-react"

const highlights = [
  {
    title: "Smarter discovery",
    description: "Search, filter, and category browsing now work together to help readers find the right story faster.",
    icon: Search,
    href: "/search",
    linkLabel: "Try search",
  },
  {
    title: "Creator-first writing",
    description: "Draft, preview, and publish with a focused author workflow designed for quick editorial turnaround.",
    icon: PenSquare,
    href: "/create",
    linkLabel: "Start writing",
  },
  {
    title: "Performance insights",
    description: "Track engagement trends and optimize what you publish with post-level interaction metrics.",
    icon: BarChart3,
    href: "/settings",
    linkLabel: "Open settings",
  },
]

export function PageHighlights() {
  return (
    <section className="mb-10 grid gap-4 md:grid-cols-3">
      {highlights.map((item) => {
        const Icon = item.icon

        return (
          <article
            key={item.title}
            className="rounded-2xl border border-orange-100/70 bg-white/80 p-5 shadow-sm transition-transform hover:-translate-y-1 dark:border-orange-900/40 dark:bg-gray-950/60"
          >
            <div className="mb-4 inline-flex rounded-xl bg-orange-100 p-2 text-orange-600 dark:bg-orange-900/40 dark:text-orange-300">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            <Link href={item.href} className="mt-4 inline-flex items-center text-sm font-medium text-orange-600 hover:text-orange-700 dark:text-orange-300">
              {item.linkLabel} <Rocket className="ml-1 h-4 w-4" />
            </Link>
          </article>
        )
      })}
    </section>
  )
}
