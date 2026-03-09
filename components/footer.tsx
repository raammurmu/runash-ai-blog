"use client"

import * as React from "react"
import Link from "next/link"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Github, Twitter, Linkedin, Mail, Send,
  Loader2, Moon, Sun
} from "lucide-react"
import { toast } from "sonner"
import { useTheme } from "next-themes"
import { blogPosts } from "@/lib/blog-data"

const footerLinks = [
  {
    title: "Platform",
    links: [
      { name: "AI", href: "https://runash.in" },
      { name: "LiveStream", href: "https://runash.in" },
      { name: "LiveShop", href: "https://runash.in" },
      { name: "RunAshChat", href: "https://runash.in" },
      { name: "Studio", href: "https://runash.in" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Documentation", href: "https://api.runash.in" },
      { name: "API Ref", href: "https://api.runash.in" },
      { name: "Changelog", href: "https://runash.in" },
      { name: "Status", href: "https://api.runash.in" },
    ],
  },
]

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { theme, setTheme } = useTheme()
  const latestPosts = useMemo(() => {
    return [...blogPosts]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 3)
  }, [])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success("Subscription successful!")
      setEmail("")
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <footer className="w-full border-t border-white/5 bg-background py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-zinc-950/90 px-6 py-8 shadow-2xl shadow-black/20 md:px-8 md:py-10">
          <div className="mb-10 flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <Link href="/" className="group flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-orange-600 to-amber-400 shadow-lg shadow-orange-500/30 transition-transform group-hover:scale-105">
                  <span className="text-sm font-black text-white">R</span>
                </div>
                <span className="text-xl font-black tracking-tight text-white">RunAsh AI</span>
              </Link>
              <p className="max-w-md text-sm leading-relaxed text-zinc-400">
                Runash Digital Innovation Technologies Private Limited builds AI-first products for teams that want to move faster.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {[
                { icon: Github, href: "https://github.com/runash" },
                { icon: Twitter, href: "https://twitter.com/runashai" },
                { icon: Linkedin, href: "https://www.linkedin.com/company/runash-ai/" },
                { icon: Mail, href: "mailto:hello@runash.in" },
              ].map((item, i) => (
                <Button
                  key={i}
                  asChild
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-full border-white/15 bg-white/5 text-zinc-300 hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-300"
                >
                  <Link href={item.href} aria-label="RunAsh social link">
                    <item.icon className="h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-8">
              {footerLinks.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                    {section.title}
                  </h4>
                  <nav className="flex flex-col gap-2.5">
                    {section.links.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="w-fit text-sm text-zinc-400 transition-colors hover:text-zinc-100"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              ))}

              <div className="space-y-4">
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                  Latest Posts
                </h4>
                <div className="space-y-3">
                  {latestPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="block text-sm text-zinc-400 transition-colors hover:text-zinc-100"
                    >
                      <div className="mb-1 text-[11px] uppercase tracking-wide text-zinc-500">{post.category}</div>
                      <span className="leading-snug">{post.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-5 md:p-6">
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Stay in the Loop</h4>
                <p className="mt-3 text-sm text-zinc-400">Get product updates and practical AI insights in your inbox.</p>
                <form onSubmit={handleSubscribe} className="relative mt-5">
                  <Input
                    placeholder="Enter work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 rounded-xl border-white/10 bg-zinc-950/80 pr-12 text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-orange-500"
                  />
                  <Button
                    size="icon"
                    type="submit"
                    className="absolute right-1.5 top-1.5 h-8 w-8 rounded-lg bg-orange-600 hover:bg-orange-700"
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </form>
                <p className="mt-3 text-[11px] text-zinc-500">By subscribing, you agree to our Privacy Policy.</p>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-white/10" />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-zinc-500">&copy; {currentYear} RunAsh AI</span>

            <div className="flex items-center gap-5">
              <nav className="flex items-center gap-4">
                {["Privacy", "Terms", "Cookies"].map((l) => (
                  <Link
                    key={l}
                    href="https://runash.in/privacy"
                    className="text-xs uppercase tracking-wide text-zinc-500 transition-colors hover:text-zinc-100"
                  >
                    {l}
                  </Link>
                ))}
              </nav>

              <Button
                variant="outline"
                size="icon"
                className="group h-9 w-9 rounded-xl border-white/15 bg-white/5 text-zinc-300 hover:bg-orange-500/10"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 group-hover:text-orange-300" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 group-hover:text-orange-300" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
