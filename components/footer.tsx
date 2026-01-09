"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Github, Twitter, Linkedin, Mail, Heart, Send, Loader2 } from "lucide-react"
import { toast } from "sonner" // 1. Import toast

// ... (keep footerLinks and socialLinks arrays exactly as they were) ...
const footerLinks = {
  categories: [
    { label: "Live Streaming", href: "/category/streaming" },
    { label: "AI Platform", href: "/category/ai" },
    { label: "Live Shopping", href: "/category/shopping" },
    { label: "API Platform", href: "/category/api" },
    { label: "Payment Systems", href: "/category/payments" },
  ],
  resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Tutorials", href: "/tutorials" },
    { label: "Community", href: "/community" },
    { label: "Changelog", href: "/changelog" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
}

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "Github" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:contact@runash.ai", label: "Email" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false) // Simplified state

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) throw new Error("Subscription failed")

      // 2. Success Toast
      toast.success("Subscribed successfully!", {
        description: "You've been added to our newsletter.",
      })
      
      setEmail("")
    } catch (error) {
      console.error(error)
      // 3. Error Toast
      toast.error("Subscription failed", {
        description: "Please check your email and try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <footer className="border-t bg-background/50 backdrop-blur-sm">
      <div className="container px-4 md:px-6 py-12">
        
        {/* ... (Top sections remain unchanged) ... */}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* 1. Brand Section */}
          <div className="space-y-4">
             {/* ... (Same as before) ... */}
             <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xs">RA</span>
              </div>
              <span className="font-bold text-xl tracking-tight">RunAsh AI</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Empowering developers with next-gen live streaming, AI processing, and e-commerce infrastructure.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <Button key={social.label} variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted" asChild>
                  <Link href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">{social.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* 2. Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm tracking-wider uppercase text-foreground/80">Platform</h3>
            <ul className="space-y-2.5">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm tracking-wider uppercase text-foreground/80">Resources</h3>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm tracking-wider uppercase text-foreground/80">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest AI & streaming updates.
            </p>
            
            <form className="space-y-2" onSubmit={handleSubscribe}>
              <div className="flex space-x-2">
                <Input 
                  placeholder="email@example.com" 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background"
                  disabled={isLoading}
                />
                <Button 
                  size="icon" 
                  type="submit" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  <span className="sr-only">Subscribe</span>
                </Button>
              </div>
            </form>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span>&copy; {currentYear} RunAsh AI.</span>
            <span className="hidden sm:inline text-muted-foreground/50">|</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> by the RunAsh team.
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {footerLinks.legal.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-foreground transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
    }
