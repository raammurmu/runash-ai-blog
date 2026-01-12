"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// UI Components
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Icons
import {
  Home, Video, ShoppingCart, Code, Brain, Beaker,
  TrendingUp, Users, ChevronLeft, ChevronRight,
  MessageCircle, Settings, LogOut, Search
} from "lucide-react"

const categories = [
  { name: "Home", icon: Home, href: "/", description: "Dashboard" },
  { name: "Live Streaming", icon: Video, href: "/streaming", count: 01, description: "Real-time video" },
  { name: "Live Shopping", icon: ShoppingCart, href: "/shopping", count: 0, description: "E-commerce" },
  { name: "API Platform", icon: Code, href: "/api", count: 0, description: "Dev tools" },
  { name: "AI Platform", icon: Brain, href: "/ai", count: 0, description: "AI solutions" },
  { name: "Research", icon: Beaker, href: "/research", count: 0, description: "Findings" },
]

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        animate={{ width: isCollapsed ? 64 : 256 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative flex flex-col border-r bg-card h-screen shadow-sm z-40 overflow-hidden"
      >
        {/* Header */}
        <div className="flex h-16 items-center px-4 mb-2">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 flex-1"
              >
                <div className="h-8 w-8 rounded-lg bg-orange flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">R</span>
                </div> 
                <span className="font-bold tracking-tight text-xl">Blog</span>
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className={cn("h-8 w-8", isCollapsed && "mx-auto")}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Search Mockup (Better UX) */}
        {!isCollapsed && (
          <div className="px-4 mb-4">
             <Button variant="outline" className="w-full h-9 justify-start text-muted-foreground px-3 font-normal bg-muted/50">
                <Search className="mr-2 h-4 w-4" />
                <span className="text-xs">Quick search...</span>
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
             </Button>
          </div>
        )}

        <ScrollArea className="flex-1">
          <nav className="flex flex-col gap-1 px-3">
            {categories.map((item) => {
              const isActive = pathname === item.href
              return (
                <SidebarNavItem 
                  key={item.href} 
                  item={item} 
                  isCollapsed={isCollapsed} 
                  isActive={isActive}
                />
              )
            })}
            
            <Separator className="my-4 opacity-50" />
            
            <div className="flex flex-col gap-1">
               {!isCollapsed && (
                  <h3 className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
                    Community
                  </h3>
               )}
               <CommunityDialog isCollapsed={isCollapsed} />
            </div>
          </nav>
        </ScrollArea>

        {/* Footer User Section */}
          <div className="p-3 border-t bg-muted/10">
          <div className={cn("flex items-center gap-3 rounded-lg", !isCollapsed && "p-2 hover:bg-muted/50 transition-colors")}>
             <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-orange-400 to-rose-400 shrink-0" />
             {!isCollapsed && (
                <div className="flex-1 overflow-hidden">
                   <p className="text-xs font-semibold truncate">Ashish Kumar</p>
                   <p className="text-[10px] text-muted-foreground truncate">ash@runash.ai</p>
                </div>
             )}
             {!isCollapsed && <Settings className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" />}
          </div>
        </div> 
      </motion.aside>
    </TooltipProvider>
  )
}

function SidebarNavItem({ item, isCollapsed, isActive }: { item: any; isCollapsed: boolean; isActive: boolean }) {
  const content = (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={cn(
        "w-full transition-all group relative",
        isCollapsed ? "justify-center p-0 h-10 w-10 mx-auto" : "justify-start h-10 px-3",
        isActive && "bg-secondary font-medium text-primary shadow-sm"
      )}
      asChild
    >
      <Link href={item.href}>
        <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
        {!isCollapsed && (
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="ml-3 text-sm flex-1 truncate"
          >
            {item.name}
          </motion.span>
        )}
        {!isCollapsed && item.count && (
          <Badge variant="outline" className="ml-auto text-[10px] py-0 h-5 bg-background shadow-none border-muted-foreground/20 text-muted-foreground">
            {item.count}
          </Badge>
        )}
      </Link>
    </Button>
  )

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right" sideOffset={10} className="flex items-center gap-2">
          {item.name}
          {item.count && <Badge variant="secondary" className="h-4 text-[9px] px-1">{item.count}</Badge>}
        </TooltipContent>
      </Tooltip>
    )
  }

  return content
}

function CommunityDialog({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size={isCollapsed ? "icon" : "sm"} 
          className={cn("w-full h-10", isCollapsed ? "justify-center" : "justify-start px-3 text-muted-foreground hover:text-foreground")}
        >
          <Users className="h-4 w-4 shrink-0" />
          {!isCollapsed && <span className="ml-3 text-sm">Join Community</span>}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join our Global Developer ecosystem</DialogTitle>
          <DialogDescription>Participate in shaping the future of AI streaming.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 pt-4">
           {[
             { label: "Discord", desc: "Real-time support", icon: MessageCircle, color: "bg-indigo-500" },
             { label: "GitHub", desc: "Open source contributions", icon: Code, color: "bg-slate-800" }
           ].map((platform) => (
             <div key={platform.label} className="flex items-center justify-between p-3 rounded-xl border border-border/50 hover:border-primary/50 transition-colors group cursor-pointer">
               <div className="flex items-center gap-3">
                 <div className={cn("p-2 rounded-lg text-white", platform.color)}>
                   <platform.icon className="h-5 w-5" />
                 </div>
                 <div>
                   <p className="text-sm font-medium">{platform.label}</p>
                   <p className="text-xs text-muted-foreground">{platform.desc}</p>
                 </div>
               </div>
               <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
             </div>
           ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
