import Link from "next/link"
import { BarChart3, Rocket, Search } from "lucide-react"

const highlights = [
  {
    title: "Smarter discovery",
    description: "Search, filter, and category browsing now work together to help readers find the right story faster.",
    icon: Search,
    href: "/search",
    linkLabel: "Try search",
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
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-wide text-orange-600 dark:text-orange-300">Learning & content tracks</p>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Choose where to dive in next</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {highlights.map((item) => {
          const Icon = item.icon

          return (
            <article
              key={item.title}
              className="flex h-full flex-col rounded-3xl border border-orange-100/70 bg-white/90 p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md dark:border-orange-900/40 dark:bg-gray-950/60"
            >
              <div className="mb-5 inline-flex rounded-xl bg-orange-100 p-2 text-orange-600 dark:bg-orange-900/40 dark:text-orange-300">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
              <Link href={item.href} className="mt-6 inline-flex items-center text-sm font-medium text-orange-600 hover:text-orange-700 dark:text-orange-300">
                {item.linkLabel} <Rocket className="ml-1 h-4 w-4" />
              </Link>
            </article>
          )
        })}
      </div>
    </section>
  )
}
