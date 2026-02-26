"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { toast } from "sonner"
import { ArrowRight, Github, Linkedin, Loader2, Mail, Moon, Send, Sun, Twitter } from "lucide-react"
import { useTheme } from "next-themes"
import { blogPosts } from "@/lib/blog-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const footerLinks = [
  {
    title: "Explore",
    links: [
      { name: "Home", href: "/" },
      { name: "All posts", href: "/blog" },
      { name: "Create", href: "/create" },
      { name: "Search", href: "/search" },
    ],
  },
  {
    title: "Platform",
    links: [
      { name: "Docs", href: "https://api.runash.in" },
      { name: "API", href: "https://api.runash.in" },
      { name: "Status", href: "https://api.runash.in" },
      { name: "RunAsh", href: "https://runash.in" },
    ],
  },
]

const socialLinks = [
  { icon: Github, href: "https://github.com/runash", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com/runashai", label: "X" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/runash-ai/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@runash.in", label: "Mail" },
]

export function Footer() {
  const { theme, setTheme } = useTheme()
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const latestPosts = useMemo(
    () => [...blogPosts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, 3),
    [],
  )

  const handleSubscribe = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Subscribed successfully")
      setEmail("")
    } catch {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <footer className="border-t border-orange-100/70 bg-gradient-to-b from-background to-orange-50/20 dark:border-orange-900/40 dark:to-orange-950/10">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-8 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-orange-600 to-amber-400 text-sm font-black text-white">
                R
              </div>
              <div>
                <p className="text-lg font-black tracking-tight">RunAsh AI</p>
                <p className="text-xs text-muted-foreground">Live commerce intelligence</p>
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Product updates, launch notes, and engineering stories from the team building AI-powered live commerce.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {socialLinks.map((item) => (
                <Button key={item.label} asChild size="icon" variant="outline" className="rounded-xl border-orange-200/70 hover:bg-orange-50 dark:border-orange-900/40 dark:hover:bg-orange-950/50">
                  <Link href={item.href} aria-label={item.label}>
                    <item.icon className="size-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{section.title}</h4>
              <div className="space-y-2.5">
                {section.links.map((link) => (
                  <Link key={link.name} href={link.href} className="block text-sm text-foreground/85 transition hover:text-orange-600 dark:hover:text-orange-300">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Weekly digest</h4>
            <form onSubmit={handleSubscribe} className="relative">
              <Input
                placeholder="Work email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-11 rounded-xl border-orange-200 bg-background pr-11 focus-visible:ring-orange-500/30 dark:border-orange-900/40"
              />
              <Button type="submit" size="icon" className="absolute right-1.5 top-1.5 h-8 w-8 rounded-lg bg-orange-600 hover:bg-orange-700">
                {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
              </Button>
            </form>
            <div className="mt-4 space-y-2">
              {latestPosts.map((post) => (
                <Link key={post.id} href={`/post/${post.slug}`} className="group block rounded-lg border border-transparent px-2 py-1.5 transition hover:border-orange-100 hover:bg-orange-50/70 dark:hover:border-orange-900/40 dark:hover:bg-orange-950/40">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{post.category}</p>
                  <p className="text-sm font-medium group-hover:text-orange-600 dark:group-hover:text-orange-300">{post.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Separator className="bg-orange-100/70 dark:bg-orange-900/40" />

        <div className="mt-5 flex flex-col gap-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} RunAsh AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="https://runash.in/privacy" className="hover:text-orange-600 dark:hover:text-orange-300">Privacy</Link>
            <Link href="https://runash.in/privacy" className="hover:text-orange-600 dark:hover:text-orange-300">Terms</Link>
            <Button
              variant="outline"
              size="icon"
              className="relative h-9 w-9 rounded-lg border-orange-200 dark:border-orange-900/40"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <Link href="/blog" className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-950/50 dark:text-orange-300">
              Browse stories <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
