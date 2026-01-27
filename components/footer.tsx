"use client"

import * as React from "react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Github, Twitter, Linkedin, Mail, Globe, Moon, Sun, MapPin, Check, Send, Loader2, ChevronRight
} from "lucide-react"
import { toast } from "sonner"
import { useTheme } from "next-themes"

const footerLinks = [
  {
    title: "Platform",
    links: [
      { name: "AI Tools", href: "https://runash.in" },
      { name: "LiveStream", href: "https://runash.in" },
      { name: "Studio", href: "https://runash.in" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "https://api.runash.in" },
      { name: "API Ref", href: "https://api.runash.in" },
      { name: "Changelog", href: "https://runash.in" },
    ],
  },
]

export function Footer() {
  const { theme, setTheme } = useTheme()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  React.useEffect(() => setMounted(true), [])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    toast.success("Welcome to the community!")
    setEmail("")
    setIsLoading(false)
  }

  return (
    <footer className="w-full border-t bg-card/50 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 mb-16">
          
          {/* BRAND */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="size-10 rounded-xl bg-orange-600 flex items-center justify-center text-white font-black group-hover:scale-110 transition-transform">R</div>
              <span className="text-xl font-black">RunAsh AI</span>
            </Link>
            <p className="mt-4 text-muted-foreground text-sm text-center lg:text-left max-w-xs">
              Innovating digital experiences through advanced AI solutions and resource hubs.
            </p>
            <div className="mt-6 flex gap-3">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <Button key={i} variant="outline" size="icon" className="rounded-full hover:border-orange-500 hover:text-orange-500 transition-colors" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer"><Icon className="size-4" /></a>
                </Button>
              ))}
            </div>
          </div>

          {/* LINKS */}
          <div className="lg:col-span-4">
            <div className="hidden md:grid grid-cols-2 gap-8">
              {footerLinks.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/70">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link href={link.href} className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">{link.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="md:hidden">
              <Accordion type="single" collapsible className="w-full">
                {footerLinks.map((section, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-sm font-bold uppercase">{section.title}</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-3">
                      {section.links.map((link) => (
                        <Link key={link.name} href={link.href} className="text-muted-foreground flex justify-between">{link.name} <ChevronRight className="size-4" /></Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/70 mb-4 text-center lg:text-left">Subscribe</h4>
            <form onSubmit={handleSubscribe} className="relative group">
              <Input 
                placeholder="email@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl h-12 pr-12 focus-visible:ring-orange-500"
              />
              <Button size="icon" type="submit" disabled={isLoading} className="absolute right-1 top-1 h-10 w-10 rounded-lg bg-orange-600">
                {isLoading ? <Loader2 className="animate-spin size-4" /> : <Send className="size-4" />}
              </Button>
            </form>
          </div>
        </div>

        <Separator className="mb-8 opacity-20" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} RunAsh AI. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <nav className="flex gap-4 text-xs font-medium text-muted-foreground">
              <Link href="/privacy" className="hover:text-orange-500">Privacy</Link>
              <Link href="/terms" className="hover:text-orange-500">Terms</Link>
            </nav>
            {mounted && (
              <Button 
                variant="outline" size="icon" className="rounded-xl"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </Button>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
  }
