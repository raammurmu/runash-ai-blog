"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Search, Tags } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "All posts", href: "/", icon: BookOpen },
  { label: "Search", href: "/search", icon: Search },
  { label: "Topics", href: "/category/product", icon: Tags },
]

const BLOG_ROUTE_PREFIXES = ["/post", "/category", "/tag", "/search", "/author"]

export function MobileBottomNav() {
  const pathname = usePathname()

  const isBlogContext = BLOG_ROUTE_PREFIXES.some((route) => pathname.startsWith(route)) || pathname === "/"
  if (!isBlogContext) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[50] block md:hidden" aria-label="Blog mobile navigation">
      <div className="absolute inset-0 border-t border-orange-100 bg-background/80 backdrop-blur-xl dark:border-orange-900/30" />

      <div className="relative flex h-16 items-center justify-around px-2 pb-safe">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === "/" && pathname === "/")
          const Icon = item.icon

          return (
            <Link key={item.href} href={item.href} className="relative flex h-full w-full flex-col items-center justify-center group">
              <div className="flex flex-col items-center gap-1 transition-transform active:scale-90">
                <div className="relative">
                  <Icon className={cn("size-5 transition-colors duration-300", isActive ? "text-orange-600" : "text-muted-foreground")} />
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-orange-600"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>
                <span className={cn("text-[10px] font-bold uppercase tracking-tighter", isActive ? "text-orange-600" : "text-muted-foreground")}>
                  {item.label}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
