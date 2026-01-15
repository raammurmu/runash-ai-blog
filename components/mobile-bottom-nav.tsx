"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Plus, Bell, User } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Search", href: "/search", icon: Search },
  { label: "Create", href: "/create", icon: Plus, isAction: true },
  { label: "Inbox", href: "/notifications", icon: Bell },
  { label: "Profile", href: "/profile", icon: User },
]

export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[50] block md:hidden">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border-t border-orange-100 dark:border-orange-900/30" />
      
      <div className="relative flex items-center justify-around h-16 pb-safe px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center w-full h-full group"
            >
              {item.isAction ? (
                /* Central Action Button (Create) */
                <div className="relative -top-4">
                  <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-3 rounded-2xl shadow-lg shadow-orange-500/40 active:scale-90 transition-transform">
                    <Icon className="size-6 text-white stroke-[3px]" />
                  </div>
                </div>
              ) : (
                /* Regular Nav Item */
                <div className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
                  <div className="relative">
                    <Icon 
                      className={cn(
                        "size-5 transition-colors duration-300",
                        isActive ? "text-orange-600" : "text-muted-foreground"
                      )} 
                    />
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-600"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-tighter",
                    isActive ? "text-orange-600" : "text-muted-foreground"
                  )}>
                    {item.label}
                  </span>
                </div>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
