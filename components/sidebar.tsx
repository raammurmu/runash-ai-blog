"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Video,
  ShoppingCart,
  Code,
  FileText,
  CreditCard,
  MessageCircle,
  Store,
  Brain,
  Beaker,
  TrendingUp,
  Users,
} from "lucide-react"
import Link from "next/link"

const categories = [
  { name: "Home", icon: Home, href: "/", count: null },
  { name: "Live Streaming", icon: Video, href: "/category/streaming", count: 42 },
  { name: "Live Shopping", icon: ShoppingCart, href: "/category/shopping", count: 28 },
  { name: "API Platform", icon: Code, href: "/category/api", count: 156 },
  { name: "Documentation", icon: FileText, href: "/category/docs", count: 89 },
  { name: "Payment Systems", icon: CreditCard, href: "/category/payments", count: 34 },
  { name: "Chat Platform", icon: MessageCircle, href: "/category/chat", count: 67 },
  { name: "Grocery Store", icon: Store, href: "/category/grocery", count: 23 },
  { name: "AI Platform", icon: Brain, href: "/category/ai", count: 198 },
  { name: "AI Research", icon: Beaker, href: "/category/research", count: 145 },
]

const trending = [
  "Real-time Video Processing",
  "AI-Powered Shopping",
  "Live Stream Analytics",
  "Payment Integration",
  "Voice Commerce",
]

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-background/50 p-6 space-y-6">
      <div>
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">Categories</h3>
        <nav className="space-y-1">
          {categories.map((category) => (
            <Button key={category.name} variant="ghost" className="w-full justify-start h-9" asChild>
              <Link href={category.href}>
                <category.icon className="h-4 w-4 mr-3" />
                <span className="flex-1 text-left">{category.name}</span>
                {category.count && (
                  <Badge variant="secondary" className="ml-auto">
                    {category.count}
                  </Badge>
                )}
              </Link>
            </Button>
          ))}
        </nav>
      </div>

      <div>
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3 flex items-center">
          <TrendingUp className="h-4 w-4 mr-2" />
          Trending Topics
        </h3>
        <div className="space-y-2">
          {trending.map((topic) => (
            <Button key={topic} variant="ghost" size="sm" className="w-full justify-start text-xs h-8">
              #{topic.replace(/\s+/g, "").toLowerCase()}
            </Button>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t">
        <Button className="w-full" size="sm">
          <Users className="h-4 w-4 mr-2" />
          Join Community
        </Button>
      </div>
    </aside>
  )
}
