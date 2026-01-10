"use client"

import * as React from "react"
import Link from "next/link"
import { Github, Twitter, Linkedin, Mail, Heart, Send, Loader2, ArrowUp, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

// --- Configuration ---
const footerLinks = {
  platform: [
    { label: "Live Streaming", href: "https://runash.in" },
    { label: "AI Platform", href: "https://runash.in/ai" },
    { label: "Live Shopping", href: "https://runash.in/live" },
    { label: "API Platform", href: "https://runash.in/api" },
  ],
  resources: [
    { label: "Documentation", href: "https://doc.runash.in/docs" },
    { label: "Tutorials", href: "https://runash.in/tutorials" },
    { label: "Community", href: "https://runash.in/community" },
    { label: "Status", href: "https://runash.in/status", isStatus: true },
  ],
  legal: [
    { label: "Privacy", href: "https://runash.in/privacy" },
    { label: "Terms", href: "https://runash.in/terms" },
    { label: "Cookies", href: "https://runash.in/cookies" },
  ],
}

const socialLinks = [
  { icon: Github, href: "https://github.com/runash-ai", label: "Github" },
  { icon: Twitter, href: "https://x.com/runash_ai", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/runash-ai", label: "LinkedIn" },
  { icon: Mail, href: "mailto:contact@runash.in", label: "Email" },
]

export function Footer() {
  const [email, setEmail] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200))
      toast.success("Welcome aboard!", { description: "You're now subscribed to RunAsh AI updates." })
      setEmail("")
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <footer className="relative border-t bg-background/60 backdrop-blur-md">
      <div className="container px-4 md:px-6 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand & Mission (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="size-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                {/* <span className="text-white font-bold text-sm">R</span> */}
              </div>
              <span className="font-bold text-2xl tracking-tight">RunAsh AI</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Runash Digital Innovation Technologies Private Limited 
            </p>
            <div className="flex gap-1">
              {socialLinks.map((social) => (
                <Button key={social.label} variant="ghost" size="icon" className="size-9 rounded-full hover:text-orange-500 transition-colors" asChild>
                  <Link href={social.href} target="_blank" aria-label={social.label}>
                    <social.icon className="size-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Nav Links (4 Columns) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <FooterColumn title="Platform" links={footerLinks.platform} />
            <FooterColumn title="Resources" links={footerLinks.resources} />
          </div>

          {/* Newsletter (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-muted/40 border border-border/50 space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-widest text-foreground">Stay in the Loop</h3>
              <p className="text-sm text-muted-foreground">Join 5,000+ developers receiving our weekly tech insights.</p>
              
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input 
                  placeholder="Enter email..." 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background border-none ring-1 ring-border/50 focus-visible:ring-orange-500/50"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading} className="shrink-0 bg-orange-500 hover:bg-orange-600">
                  {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                </Button>
              </form>
            </div>
          </div>
        </div>

        <Separator className="my-12 opacity-50" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-muted-foreground">
            <span className="font-medium text-foreground/80">© {currentYear} RunAsh AI Inc.</span>
            <span className="hidden sm:block opacity-30">|</span>
            <span className="flex items-center gap-1.5">
              Built with <Heart className="size-3 text-orange-500 fill-orange-500" /> globally
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex gap-4 text-xs font-medium text-muted-foreground">
              {footerLinks.legal.map((link) => (
                <Link key={link.label} href={link.href} className="hover:text-foreground transition-colors underline-offset-4 hover:underline">
                  {link.label}
                </Link>
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={scrollToTop} className="size-8 rounded-full opacity-60 hover:opacity-100">
              <ArrowUp className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string, links: any[] }) {
  return (
    <div className="space-y-5">
      <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-foreground/70">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link 
              href={link.href} 
              className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-orange-500 transition-all"
            >
              {link.isStatus && <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />}
              <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
      }
