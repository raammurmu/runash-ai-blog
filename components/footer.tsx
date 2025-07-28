import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Github, Twitter, Linkedin, Mail, Heart, Youtube, Instagram, Rss, ArrowRight, Zap, Users, TrendingUp, Globe } from 'lucide-react'

const footerCategories = [
  {
    title: "Platforms",
    links: [
      { name: "Live Streaming", href: "/category/streaming", badge: "Hot" },
      { name: "AI Platform", href: "/category/ai", badge: "New" },
      { name: "Live Shopping", href: "/category/shopping" },
      { name: "API Platform", href: "/category/api" },
      { name: "Payment Systems", href: "/category/payments" },
      { name: "Chat Platform", href: "/category/chat" },
      { name: "Grocery Store", href: "/category/grocery" },
    ]
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "/docs" },
      { name: "API Reference", href: "/api-docs" },
      { name: "Tutorials", href: "/tutorials" },
      { name: "Examples", href: "/examples" },
      { name: "Changelog", href: "/changelog" },
      { name: "Status", href: "/status" },
    ]
  },
  {
    title: "Community",
    links: [
      { name: "Discord", href: "/discord" },
      { name: "GitHub", href: "/github" },
      { name: "Forum", href: "/forum" },
      { name: "Contributors", href: "/contributors" },
      { name: "Events", href: "/events" },
      { name: "Newsletter", href: "/newsletter" },
    ]
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers", badge: "Hiring" },
      { name: "Press", href: "/press" },
      { name: "Contact", href: "/contact" },
      { name: "Partners", href: "/partners" },
    ]
  }
]

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/runash-ai", color: "hover:text-gray-900 dark:hover:text-gray-100" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/runash_ai", color: "hover:text-blue-500" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/runash-ai", color: "hover:text-blue-600" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com/@runash-ai", color: "hover:text-red-500" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/runash.ai", color: "hover:text-pink-500" },
  { name: "RSS", icon: Rss, href: "/rss.xml", color: "hover:text-orange-500" },
]

const stats = [
  { label: "Active Users", value: "50K+", icon: Users },
  { label: "Blog Posts", value: "1.2K+", icon: TrendingUp },
  { label: "Countries", value: "120+", icon: Globe },
  { label: "API Calls/Month", value: "10M+", icon: Zap },
]

export function Footer() {
  return (
    <footer className="border-t bg-background/50 backdrop-blur-sm">
      {/* Stats Section */}
      <div className="border-b bg-muted/20">
        <div className="container px-4 md:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="h-5 w-5 text-orange-500 mr-2" />
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-orange-400 to-yellow-400 flex items-center justify-center">
                <span className="text-white font-bold">RA</span>
              </div>
              <span className="font-bold text-2xl">RunAsh AI</span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Discover the latest innovations in live streaming, AI platforms, e-commerce solutions, and cutting-edge
              technology. Join our community of developers, creators, and innovators.
            </p>
            
            {/* Social Links */}
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="sm"
                  asChild
                  className={`transition-colors ${social.color}`}
                >
                  <Link href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="h-4 w-4" />
                    <span className="sr-only">{social.name}</span>
                  </Link>
                </Button>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-3 pt-4">
              <h4 className="font-semibold">Stay Updated</h4>
              <p className="text-sm text-muted-foreground">
                Get the latest posts and updates delivered to your inbox.
              </p>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter your email" 
                  type="email" 
                  className="flex-1"
                />
                <Button size="sm" className="bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </div>
          </div>

          {/* Footer Categories */}
          {footerCategories.map((category) => (
            <div key={category.title} className="space-y-4">
              <h3 className="font-semibold text-lg">{category.title}</h3>
              <div className="space-y-3">
                {category.links.map((link) => (
                  <div key={link.name} className="flex items-center space-x-2">
                    <Link 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                    {link.badge && (
                      <Badge 
                        variant={link.badge === "Hot" ? "destructive" : "secondary"} 
                        className="text-xs px-1.5 py-0.5"
                      >
                        {link.badge}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 text-sm text-muted-foreground">
            <div>© 2024 RunAsh AI. All rights reserved.</div>
            <div className="hidden md:block">•</div>
            <div className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>by the RunAsh AI team</span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
            <Link href="/security" className="text-muted-foreground hover:text-foreground transition-colors">
              Security
            </Link>
          </div>
        </div>

        {/* Version Info */}
        <div className="mt-6 pt-6 border-t text-center">
          <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
            <Badge variant="outline" className="text-xs">
              v2.1.0
            </Badge>
            <span>•</span>
            <span>Last updated: December 2024</span>
            <span>•</span>
            <Link href="/status" className="hover:text-foreground transition-colors">
              System Status
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
