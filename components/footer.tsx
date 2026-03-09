"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Github, Twitter, Linkedin, Mail, Send, Loader2, Moon, Sun } from "lucide-react"
import { toast } from "sonner"
import { useTheme } from "next-themes"
import { blogPosts } from "@/lib/blog-data"

const socialLinks = [
  { icon: Github, href: "https://github.com/runash", label: "RunAsh on GitHub" },
  { icon: Twitter, href: "https://twitter.com/runashai", label: "RunAsh on X/Twitter" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/runash-ai/", label: "RunAsh on LinkedIn" },
  { icon: Mail, href: "mailto:hello@runash.in", label: "Email RunAsh" },
]

const legalLinks = [
  { name: "Privacy", href: "https://runash.in/privacy" },
  { name: "Terms", href: "https://runash.in/terms" },
  { name: "Cookies", href: "https://runash.in/cookies" },
]

const footerLinks = [
  {
    title: "Platform",
    links: [
      { name: "AI", href: "https://runash.in" },
      { name: "LiveX", href: "https://runash.in/live" },
      { name: "eDitX", href: "https://runash.in/editor" },
      { name: "RunAshChat", href: "https://runash.in,runashchat" },
      { name: "ShopX", href: "https://runash.in/shopx" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Documentation", href: "https://docs.runash.in" },
      { name: "API Ref", href: "https://runash.in/api/documentation" },
      { name: "Changelog", href: "https://runash.in/changelog" },
      { name: "Status", href: "https://runash.in/status" },
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
    const trimmedEmail = email.trim()
    if (!trimmedEmail) return

    const isEmailFormatValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
    if (!isEmailFormatValid) {
      toast.error("Please enter a valid email address.")
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Subscription successful!")
      setEmail("")
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <footer className="w-full border-t border-orange-200/60 bg-white py-10 dark:border-orange-900/30 dark:bg-gray-950 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-orange-200/70 bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-8 shadow-xl shadow-orange-500/10 dark:border-orange-900/40 dark:from-gray-950 dark:via-orange-950/20 dark:to-yellow-950/10 md:px-8 md:py-10">
          <div className="mb-10 flex flex-col gap-6 border-b border-orange-200/70 pb-8 dark:border-orange-900/40 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <Link href="/" className="group flex items-center gap-3">
                <div className="relative h-9 w-9 overflow-hidden rounded-md border border-orange-200/70 bg-white shadow-sm dark:border-orange-900/40 dark:bg-gray-900">
                <Image
                  src="/logo.png"
                  alt="RunAsh logo"
                  fill
                  sizes="36px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
                <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 bg-clip-text text-xl font-black tracking-tight text-transparent dark:from-orange-400 dark:via-orange-300 dark:to-yellow-300">
                  RunAsh AI
                </span>
              </Link>
              <p className="max-w-md text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                Runash Digital Innovation Technologies Private Limited.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {socialLinks.map((item) => (
                <Button
                  key={item.href}
                  asChild
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-full border-orange-200 bg-white/80 text-gray-600 hover:border-orange-500/50 hover:bg-orange-100 hover:text-orange-700 dark:border-orange-900/40 dark:bg-gray-900/70 dark:text-gray-300 dark:hover:bg-orange-900/30 dark:hover:text-orange-300"
                >
                  <a
                    href={item.href}
                    aria-label={item.label}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    <item.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-8">
              {footerLinks.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-600/80 dark:text-orange-300/80">
                    {section.title}
                  </h4>
                  <nav className="flex flex-col gap-2.5">
                    {section.links.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="w-fit text-sm text-gray-600 transition-colors hover:text-orange-700 dark:text-gray-300 dark:hover:text-orange-300"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              ))}

              <div className="space-y-4">
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-600/80 dark:text-orange-300/80">
                  Latest Posts
                </h4>
                <div className="space-y-3">
                  {latestPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="block text-sm text-gray-600 transition-colors hover:text-orange-700 dark:text-gray-300 dark:hover:text-orange-300"
                    >
                      <div className="mb-1 text-[11px] uppercase tracking-wide text-orange-600/80 dark:text-orange-300/80">
                        {post.category}
                      </div>
                      <span className="leading-snug">{post.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-orange-200 bg-white/80 p-5 dark:border-orange-900/40 dark:bg-gray-900/60 md:p-6">
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-600/80 dark:text-orange-300/80">
                  Stay in the Loop
                </h4>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">Get product updates and practical AI insights in your inbox.</p>
                <form onSubmit={handleSubscribe} className="relative mt-5">
                  <Input
                    placeholder="Enter work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 rounded-xl border-orange-200 bg-white pr-12 text-gray-800 placeholder:text-gray-400 focus-visible:ring-orange-500 dark:border-orange-900/40 dark:bg-gray-950/70 dark:text-gray-200 dark:placeholder:text-gray-500"
                  />
                  <Button
                    size="icon"
                    type="submit"
                    className="absolute right-1.5 top-1.5 h-8 w-8 rounded-lg bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 dark:from-orange-500 dark:to-yellow-500 dark:hover:from-orange-600 dark:hover:to-yellow-600"
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </form>
                <p className="mt-3 text-[11px] text-gray-500 dark:text-gray-400">By subscribing, you agree to our Privacy Policy.</p>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-orange-200/70 dark:bg-orange-900/40" />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">&copy; {currentYear} RunAsh AI</span>

            <div className="flex items-center gap-5">
              <nav className="flex items-center gap-4">
                {legalLinks.map((l) => (
                  <Link
                    key={l.name}
                    href={l.href}
                    className="text-xs uppercase tracking-wide text-gray-500 transition-colors hover:text-orange-700 dark:text-gray-400 dark:hover:text-orange-300"
                  >
                    {l.name}
                  </Link>
                ))}
              </nav>

              <Button
                variant="outline"
                size="icon"
                className="group h-9 w-9 rounded-xl border-orange-200 bg-white/80 text-gray-600 hover:bg-orange-100 dark:border-orange-900/40 dark:bg-gray-900/70 dark:text-gray-300 dark:hover:bg-orange-900/30"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 group-hover:text-orange-600 dark:group-hover:text-orange-300" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 group-hover:text-orange-600 dark:group-hover:text-orange-300" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
