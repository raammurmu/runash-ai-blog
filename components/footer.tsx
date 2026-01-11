"use client"

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
  Github, Twitter, Linkedin, Mail, Heart, Send,
  Loader2, Globe, Moon, Sun, MapPin, Check
} from "lucide-react"
import { toast } from "sonner"
import { useTheme } from "next-themes"

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
    <footer className="w-full border-t bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Sections */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 mb-12">
          
          {/* Brand & Mission */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left lg:col-span-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-orange-600 to-yellow-400 flex items-center justify-center shadow-lg">
                <span className="text-white font-extrabold text-sm">RA</span>
              </div>
              <span className="text-2xl font-bold tracking-tight">RunAsh AI</span>
            </Link>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-xs">
              Runash Digital Innovation Technologies Private Limited.
            </p>
            <div className="mt-6 flex gap-3">
              {/* Replace with actual social links */}
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <Button key={i} variant="ghost" size="icon" className="h-9 w-9 rounded-full border hover:border-orange-500/50 hover:bg-orange-500/10">
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8 sm:col-span-2 lg:col-span-4">
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground">Platform</h4>
              <nav className="flex flex-col space-y-2">
                {["AI Engine", "Streaming", "Payments"].map((item) => (
                  <Link key={item} href="https://runash.in" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">{item}</Link>
                ))}
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground">Support</h4>
              <nav className="flex flex-col space-y-2">
                {["Documentation", "API Ref", "Status"].map((item) => (
                  <Link key={item} href="https://api.runash.in" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">{item}</Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground mb-4 text-center sm:text-left">Subscribe to Updates</h4>
            <form onSubmit={handleSubscribe} className="relative max-w-sm mx-auto sm:ml-0">
              <Input 
                placeholder="Enter work email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-full h-11 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-orange-500" 
              />
              <Button size="icon" className="absolute right-1 top-1 h-9 w-9 rounded-full bg-orange-500 hover:bg-orange-600 transition-all">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
          </div>
        </div>

        <Separator className="mb-8 opacity-60" />

        {/* Bottom Utility Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>&copy; {currentYear} RunAsh AI</span>
            
            <Separator orientation="vertical" className="hidden sm:block h-4" />

            {/* Country Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs font-normal hover:bg-muted">
                  <MapPin className="h-3.5 w-3.5" />
                  {selectedCountry.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-40">
                {countries.map((c) => (
                  <DropdownMenuItem key={c.code} onClick={() => setSelectedCountry(c)} className="flex justify-between items-center">
                    {c.name} {selectedCountry.code === c.code && <Check className="h-3 w-3 text-orange-500" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs font-normal hover:bg-muted">
                  <Globe className="h-3.5 w-3.5" />
                  {selectedLang.label}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-40">
                {languages.map((l) => (
                  <DropdownMenuItem key={l.name} onClick={() => setSelectedLang(l)} className="flex justify-between items-center">
                    {l.label} {selectedLang.name === l.name && <Check className="h-3 w-3 text-orange-500" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Theme & Socials */}
          <div className="flex items-center gap-6">
             <div className="flex gap-4">
              {["Privacy", "Terms"].map((l) => (
                <Link key={l} href="https://runash.in/privacy" className="text-xs text-muted-foreground hover:text-foreground">{l}</Link>
              ))}
            </div>

            <Button 
              variant="outline" 
              size="icon" 
              className="h-9 w-9 rounded-full border-muted-foreground/20"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-4 w-4 scale-100 transition-all dark:scale-0" />
              <Moon className="absolute h-4 w-4 scale-0 transition-all dark:scale-100" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
   }
