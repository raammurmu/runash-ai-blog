"use client"

import * as React from "react"
import Link from "next/link"
import { Github, Twitter, Linkedin, Send, MapPin, Globe, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background pt-20 pb-12 overflow-hidden relative">
      {/* Visual Depth: Abstract Shapes */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 size-96 bg-orange-500/5 blur-[120px] rounded-full" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="https://runash.in" className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-orange-600" />
              <span className="text-1xl font-black">RunAsh AI</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Runash Digital Innovation Technologies Private Limited.
            </p>
            <div className="flex gap-4">
              {[Github, Twitter, Linkedin].map((Icon, idx) => (
                <Button key={idx} variant="secondary" size="icon" className="rounded-xl hover:bg-orange-500/10 hover:text-orange-500 transition-colors">
                  <Icon className="size-5" />
                </Button>
              ))}
            </div>
          </div>

          {/* Detailed Navigation */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-sm font uppercase tracking-widest text-orange-500">Ecosystem</h4>
              <nav className="flex flex-col gap-4 text-muted-foreground font-medium">
                {["AI Tools", "Studio", "Cloud", "API"].map((l) => (
                  <Link key={l} href="https://runash.in" className="hover:text-foreground transition-colors inline-flex items-center gap-1 group">
                    {l} <ChevronRight className="size-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                ))}
              </nav>
            </div>
            <div className="space-y-6">
              <h4 className="text-sm font uppercase tracking-widest text-orange-500">Legal</h4>
              <nav className="flex flex-col gap-4 text-muted-foreground font-medium">
                {["Privacy", "Terms", "Cookies", "Ethics"].map((l) => (
                  <Link key={l} href="https://runash.in/policy" className="hover:text-foreground transition-colors">{l}</Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Newsletter: Personalized CTA */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Stay Informed</h4>
            <div className="relative">
              <Input 
                placeholder="Join the newsletter..." 
                className="h-14 rounded-2xl bg-muted/50 border-none pl-5 pr-16 focus-visible:ring-orange-500/30 transition-all"
              />
              <Button size="icon" className="absolute right-2 top-2 h-10 w-10 rounded-xl bg-orange-600 shadow-lg shadow-orange-600/30">
                <Send className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="mb-10 opacity-30" />
        
        {/* Utility Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm font text-muted-foreground">
          <p>&copy; 2026 RunAsh AI.</p>
          <div className="flex items-center gap-8">
            <span className="inline-flex items-center gap-2"><MapPin className="size-4" /> Silicon Valley, CA</span>
            <span className="inline-flex items-center gap-2"><Globe className="size-4" /> English (Global)</span>
          </div>
        </div>
      </div>
    </footer>
  )
    }
