"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { 
  Github, Twitter, Linkedin, Mail, Heart, Send, 
  Loader2, Globe, Moon, Sun, ChevronUp, MapPin
} from "lucide-react"
import { toast } from "sonner"
import { useTheme } from "next-themes"

// ... (footerLinks and socialLinks remain the same) ...

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { theme, setTheme } = useTheme()

  // New State for Selectors
  const [country, setCountry] = useState("USA")
  const [language, setLanguage] = useState("English")

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      toast.success("Welcome to the community!")
      setEmail("")
    } catch (error) {
      toast.error("Subscription failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <footer className="w-full border-t bg-background/50 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left lg:col-span-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">RA</span>
              </div>
              <span className="font-bold text-2xl tracking-tight">RunAsh AI</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Global infrastructure for live streaming, AI processing, and real-time commerce.
            </p>
            <div className="mt-6 flex gap-2">
              {socialLinks.map((social) => (
                <Button key={social.label} variant="secondary" size="icon" className="h-9 w-9 rounded-full hover:bg-orange-500 hover:text-white transition-all" asChild>
                  <Link href={social.href} target="_blank"><social.icon className="h-4 w-4" /></Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 gap-8 sm:col-span-2 lg:col-span-4">
            <div className="space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/70">Platform</h3>
              <ul className="space-y-3">
                {footerLinks.categories.map((link) => (
                  <li key={link.href}><Link href={link.href} className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">{link.label}</Link></li>
                ))}
              </ul>
            </div>
            <div className="space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/70">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}><Link href={link.href} className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">{link.label}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left lg:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/70">Stay Updated</h3>
            <form className="mt-6 w-full max-w-sm" onSubmit={handleSubscribe}>
              <div className="relative">
                <Input 
                  placeholder="Enter your email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-full pl-4 pr-12 h-11 bg-background/50 focus-visible:ring-orange-500"
                />
                <Button size="icon" type="submit" disabled={isLoading} className="absolute right-1.5 top-1.5 h-8 w-8 rounded-full bg-orange-500">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
            </form>
          </div>
        </div>

        <Separator className="my-10 opacity-50" />

        {/* Bottom Utility Bar */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <p className="text-sm text-muted-foreground whitespace-nowrap">
              &copy; {currentYear} RunAsh AI
            </p>

            <div className="hidden sm:block h-4 w-[1px] bg-border" />

            {/* Country Selector */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted/30 border border-transparent hover:border-border transition-all">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
              <select 
                value={country} 
                onChange={(e) => setCountry(e.target.value)}
                className="bg-transparent text-xs font-medium text-muted-foreground focus:outline-none cursor-pointer"
              >
                <option value="USA">United States</option>
                <option value="India">India</option>
                <option value="Singapore">Singapore</option>
                <option value="China">China</option>
              </select>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted/30 border border-transparent hover:border-border transition-all">
              <Globe className="h-3.5 w-3.5 text-muted-foreground" />
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-xs font-medium text-muted-foreground focus:outline-none cursor-pointer"
              >
                <option value="English">English</option>
                <option value="Hindi">हिन्दी (Hindi)</option>
                <option value="Chinese">中文 (Chinese)</option>
                <option value="Singapore">English (SG)</option>
              </select>
            </div>
          </div>

          {/* Theme & Social Quick-Links */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-1 text-xs text-muted-foreground mr-4">
              Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> globally
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="h-9 w-9 rounded-full"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
  }
