"use client"

import * as React from "react"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
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
import type { BlogPost } from "@/lib/types"

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
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts)
  const latestPosts = useMemo(() => {
    return [...posts]
      .filter((post) => post.status !== "draft")
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 3)
  }, [posts])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts")
        if (!response.ok) return
        const data = await response.json()
        setPosts(Array.isArray(data) ? data : blogPosts)
      } catch {
        setPosts(blogPosts)
      }
    }
    fetchPosts()
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
    <footer className="w-full border-t bg-background/95 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 mb-16">
          
          {/* Brand Identity */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:col-span-4">
            <Link href="/" className="group flex items-center space-x-2">
              <img src="/images/runash-logo.svg" alt="RunAsh logo" className="h-10 w-10" />
              <span className="text-2xl font-black tracking-tighter">RunAsh AI</span>
            </Link>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-xs px-4 lg:px-0">
              Runash Digital Innovation Technologies Private Limited.
            </p>
            <div className="mt-6 flex gap-2">
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
                  className="h-10 w-10 rounded-full border-orange-500/10 hover:border-orange-500/50 hover:bg-orange-500/5 transition-all active:scale-90"
                >
                  <Link href={item.href} aria-label="RunAsh social link">
                    <item.icon className="h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8 sm:col-span-2">
            {footerLinks.map((section) => (
              <div key={section.title} className="space-y-5">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/70">
                  {section.title}
                </h4>
                <nav className="flex flex-col space-y-3">
                  {section.links.map((link) => (
                    <Link 
                      key={link.name} 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-orange-500 transition-colors w-fit"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>

          {/* Latest Posts */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-start">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/70 mb-5">
              Latest Posts
            </h4>
            <div className="space-y-4 w-full">
              {latestPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="block text-sm font-medium text-foreground/80 hover:text-orange-500 transition-colors"
                >
                  <div className="text-xs text-muted-foreground mb-1">{post.category}</div>
                  {post.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/70 mb-5">
              Stay in the Loop
            </h4>
            <form onSubmit={handleSubscribe} className="relative w-full max-w-sm">
              <Input 
                placeholder="Enter work email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-2xl h-12 bg-muted/40 border-orange-500/10 focus-visible:ring-orange-500 pl-4 pr-12" 
              />
              <Button 
                size="icon" 
                type="submit"
                className="absolute right-1.5 top-1.5 h-9 w-9 rounded-xl bg-orange-600 hover:bg-orange-700 shadow-orange-500/20 shadow-md active:scale-95 transition-all"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
            <p className="mt-3 text-[10px] text-muted-foreground/60">
              By subscribing, you agree to our Privacy Policy.
            </p>
          </div>
        </div>

        <Separator className="mb-10 opacity-30 bg-orange-500/20" />

        {/* Bottom Utility Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="flex flex-col md:flex-row items-center gap-6">
            <span className="text-sm font-medium text-muted-foreground/80">&copy; {currentYear} RunAsh AI</span>
          </div>

          {/* Legal & Theme */}
          <div className="flex items-center gap-8">
            <nav className="flex gap-6">
              {["Privacy", "Terms", "Cookies"].map((l) => (
                <Link key={l} href="https://runash.in/privacy" className="text-xs font-semibold text-muted-foreground hover:text-orange-500 transition-colors">
                  {l}
                </Link>
              ))}
            </nav>

            <Button 
              variant="outline" 
              size="icon" 
              className="h-10 w-10 rounded-2xl border-orange-500/10 bg-muted/30 hover:bg-orange-500/5 transition-all group"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 group-hover:text-orange-500" />
              <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 group-hover:text-orange-400" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
  }
