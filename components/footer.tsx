"use client"

import * as React from "react"
import Link from "next/link"
import { Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "next-themes"

const footerSections = [
  {
    title: "Website",
    links: ["AI", "Livestream", "API", "Changelog", "LiveShop", "RunAshChat"],
  },
  {
    title: "Company",
    links: ["About", "Brand assets", "Terms of service", "Privacy", "Careers", "Press"],
  },
  {
    title: "Resources",
    links: ["Learn", "Documentation", "Blog", "Forum", "Service Status"],
  },
  {
    title: "Social",
    links: ["GitHub", "Twitter", "LinkedIn", "Discord"],
  },
]

export function Footer() {
  const { theme, setTheme } = useTheme()

  return (
    <footer className="w-full bg-white dark:bg-zinc-950 pt-20 pb-12 overflow-hidden">
      {/* 1. Emoji Decorative Section */}
      <div className="relative h-40 md:h-64 flex justify-center items-end select-none pointer-events-none">
        <div className="flex flex-wrap justify-center max-w-4xl px-4 gap-[-20px]">
           {/* Replicating the "Pile" effect with staggered emojis */}
           {Array.from({ length: 18 }).map((_, i) => (
             <span 
                key={i} 
                className="text-6xl md:text-8xl transform hover:scale-110 transition-transform duration-300"
                style={{ 
                    marginBottom: `${Math.sin(i) * 20}px`,
                    zIndex: Math.floor(Math.random() * 10)
                }}
             >
               🤗
             </span>
           ))}
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
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

          {/* Navigation Columns */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                {section.title}
              </h4>
              <nav className="flex flex-col space-y-3">
                {section.links.map((link) => (
                  <Link 
                    key={link} 
                    href="#" 
                    className="text-[15px] text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    {link}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
            }
