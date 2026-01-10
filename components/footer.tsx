"use client"

import * as React from "react"
import Link from "next/link"
import { Github, Twitter, Linkedin, Mail, Heart, Send, Loader2, ArrowUp, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

import { toast } from "sonner"

// --- Configuration ---

import { 
  Github, Twitter, Linkedin, Mail, Heart, Send, 
  Loader2, Globe, Moon, Sun 
} from "lucide-react"
import { toast } from "sonner"
import { useTheme } from "next-themes" // Assuming you use next-themes


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

  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { theme, setTheme } = useTheme()


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

      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulation
      toast.success("Subscribed successfully!")
      setEmail("")
    } catch (error) {
      toast.error("Subscription failed")

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
              Runash Digital Innovation Technologies Pvt Ltd.
            </p>
            <div className="flex gap-1">
              {socialLinks.map((social) => (
                <Button key={social.label} variant="ghost" size="icon" className="size-9 rounded-full hover:text-orange-500 transition-colors" asChild>
                  <Link href={social.href} target="_blank" aria-label={social.label}>
                    <social.icon className="size-4" />

    <footer className="w-full border-t bg-background/50 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          
          {/* Brand & Social */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left lg:col-span-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">RA</span>
              </div>
              <span className="font-bold text-2xl tracking-tight">RunAsh AI</span>
            </Link>
            <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed max-w-xs">
              Infrastructure for the future of streaming and AI. Seamlessly integrated, globally scaled.
            </p>
            <div className="mt-6 flex gap-2">
              {socialLinks.map((social) => (
                <Button key={social.label} variant="secondary" size="icon" className="h-9 w-9 rounded-full bg-muted/50 hover:bg-orange-500 hover:text-white transition-all" asChild>
                  <Link href={social.href} target="_blank">
                    <social.icon className="h-4 w-4" />
                    <span className="sr-only">{social.label}</span>

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
              <p className="text-sm text-muted-foreground">Join our weekly tech insights.</p>
              
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input 
                  placeholder="Enter email..." 

          {/* Links Sections */}
          <div className="grid grid-cols-2 gap-8 sm:col-span-2 lg:col-span-4">
            <div className="space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/70">Platform</h3>
              <ul className="space-y-3">
                {footerLinks.categories.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-orange-500 transition-colors inline-block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/70">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-orange-500 transition-colors inline-block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left lg:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/70">Newsletter</h3>
            <p className="mt-4 text-sm text-muted-foreground">Get technical updates and product news.</p>
            <form className="mt-6 w-full max-w-sm" onSubmit={handleSubscribe}>
              <div className="relative group">
                <Input 
                  placeholder="email@work.com" 

                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}

                  className="bg-background border-none ring-1 ring-border/50 focus-visible:ring-orange-500/50"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading} className="shrink-0 bg-orange-500 hover:bg-orange-600">
                  {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}

                  className="rounded-full pl-4 pr-12 h-11 border-muted-foreground/20 bg-background/50 focus-visible:ring-orange-500"
                  disabled={isLoading}
                />
                <Button 
                  size="icon" 
                  type="submit" 
                  disabled={isLoading || !email}
                  className="absolute right-1.5 top-1.5 h-8 w-8 rounded-full bg-orange-500 hover:bg-orange-600 shadow-sm"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}

                </Button>
              </form>
            </div>
          </div>
        </div>


        <Separator className="my-12 opacity-50" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-muted-foreground">
            <span className="font-medium text-foreground/80">© {currentYear} RunAsh AI.</span>
            <span className="hidden sm:block opacity-30">|</span>
            <span className="flex items-center gap-1.5">
              Built with <Heart className="size-3 text-orange-500 fill-orange-500" /> RunAsh
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

        <Separator className="my-10 opacity-50" />

        {/* Bottom Bar: Utilities & Legal */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          
          {/* Copyright & Utilities */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} RunAsh AI
            </p>
            
            <div className="hidden sm:block h-4 w-[1px] bg-border" />

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs text-muted-foreground hover:text-foreground">
                <Globe className="h-3.5 w-3.5" />
                English
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {footerLinks.legal.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs font-medium text-muted-foreground hover:text-orange-500 transition-colors">
                {link.label}
              </Link>
            ))}

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

     }

