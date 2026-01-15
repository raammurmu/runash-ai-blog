"use client"

import * as React from "react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Github, Twitter, Linkedin, Mail, Heart, Send,
  Loader2, Globe, Moon, Sun, MapPin, Check, Monitor, ChevronRight
} from "lucide-react"
import { toast } from "sonner"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const countries = [
  { name: "USA", code: "US" },
  { name: "India", code: "IN" },
  { name: "Singapore", code: "SG" },
  { name: "China", code: "CN" },
]

const languages = [
  { name: "English", label: "English" },
  { name: "Hindi", label: "हिन्दी" },
  { name: "Chinese", label: "中文" },
  { name: "Singapore", label: "English (SG)" },
]

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

  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [selectedLang, setSelectedLang] = useState(languages[0])

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
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <span className="text-white font-black text-sm">R</span>
              </div>
              <span className="text-2xl font-black tracking-tighter">RunAsh AI</span>
            </Link>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-xs px-4 lg:px-0">
              Runash Digital Innovation Technologies Private Limited.
            </p>
            <div className="mt-6 flex gap-2">
              {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                <Button key={i} variant="outline" size="icon" className="h-10 w-10 rounded-full border-orange-500/10 hover:border-orange-500/50 hover:bg-orange-500/5 transition-all active:scale-90">
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Navigation Links: Accordion on Mobile, Grid on Desktop */}
          <div className="sm:col-span-2">
            <div className="hidden md:grid grid-cols-2 gap-8">
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
            
            {/* Mobile Accordion */}
            <div className="md:hidden w-full max-w-sm mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {footerLinks.map((section, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-orange-500/10">
                    <AccordionTrigger className="text-sm font-bold uppercase tracking-widest hover:no-underline py-4">
                      {section.title}
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col space-y-4 pb-6">
                      {section.links.map((link) => (
                        <Link key={link.name} href={link.href} className="text-muted-foreground active:text-orange-500 flex justify-between items-center">
                          {link.name}
                          <ChevronRight className="h-4 w-4 opacity-50" />
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
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
            
            <div className="flex items-center gap-3">
              {/* Country Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 px-4 gap-2 text-xs rounded-full border bg-muted/20 hover:bg-muted transition-colors">
                    <MapPin className="h-3.5 w-3.5 text-orange-500" />
                    {selectedCountry.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-2xl">
                  {countries.map((c) => (
                    <DropdownMenuItem key={c.code} onClick={() => setSelectedCountry(c)} className="rounded-xl h-10">
                      {c.name} {selectedCountry.code === c.code && <Check className="ml-auto h-3 w-3 text-orange-500" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 px-4 gap-2 text-xs rounded-full border bg-muted/20 hover:bg-muted transition-colors">
                    <Globe className="h-3.5 w-3.5 text-orange-500" />
                    {selectedLang.label}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-2xl">
                  {languages.map((l) => (
                    <DropdownMenuItem key={l.name} onClick={() => setSelectedLang(l)} className="rounded-xl h-10">
                      {l.label} {selectedLang.name === l.name && <Check className="ml-auto h-3 w-3 text-orange-500" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
          {/* Theme Selector Column */}
          <div className="lg:col-span-1">
            <Button 
                variant="outline" 
                size="sm" 
                className="h-10 px-4 gap-3 rounded-full border-zinc-200 dark:border-zinc-800 font-medium text-zinc-600 dark:text-zinc-400"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Monitor className="size-4" />
              System theme
            </Button>
          </div>
          </div>
        </div>
      </div>
    </footer>
  )
  }
