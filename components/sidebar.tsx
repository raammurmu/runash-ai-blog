"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const categories = [
  { name: "Home", icon: Home, href: "/", count: null, description: "Main dashboard and overview" },
  {
    name: "Live Streaming",
    icon: Video,
    href: "/category/streaming",
    count: 42,
    description: "Real-time video streaming solutions",
  },
  {
    name: "Live Shopping",
    icon: ShoppingCart,
    href: "/category/shopping",
    count: 28,
    description: "E-commerce live streaming platforms",
  },
  {
    name: "API Platform",
    icon: Code,
    href: "/category/api",
    count: 156,
    description: "Developer tools and integrations",
  },
  {
    name: "Documentation",
    icon: FileText,
    href: "/category/docs",
    count: 89,
    description: "Technical guides and tutorials",
  },
  {
    name: "Payment Systems",
    icon: CreditCard,
    href: "/category/payments",
    count: 34,
    description: "Payment processing solutions",
  },
  {
    name: "Chat Platform",
    icon: MessageCircle,
    href: "/category/chat",
    count: 67,
    description: "Real-time messaging systems",
  },
  { name: "Grocery Store", icon: Store, href: "/category/grocery", count: 23, description: "Online grocery platforms" },
  {
    name: "AI Platform",
    icon: Brain,
    href: "/category/ai",
    count: 198,
    description: "Artificial intelligence solutions",
  },
  {
    name: "AI Research",
    icon: Beaker,
    href: "/category/research",
    count: 145,
    description: "Latest AI research and developments",
  },
]

const trending = [
  "Real-time Video Processing",
  "AI-Powered Shopping",
  "Live Stream Analytics",
  "Payment Integration",
  "Voice Commerce",
]

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={cn("border-r bg-background/50 transition-all duration-300 ease-in-out", isCollapsed ? "w-16" : "w-64")}
    >
      <div className="p-4">
        <Button variant="ghost" size="sm" onClick={onToggle} className="mb-4 w-full justify-center">
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>

        <div className="space-y-6">
          <div>
            {!isCollapsed && (
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">Categories</h3>
            )}
            <nav className="space-y-1">
              {categories.map((category) => (
                <div key={category.name}>
                  {isCollapsed ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" className="w-full justify-center h-9 p-2">
                          <category.icon className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent side="right" className="w-80">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <category.icon className="h-4 w-4" />
                            <span className="font-medium">{category.name}</span>
                            {category.count && <Badge variant="secondary">{category.count}</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                          <Button asChild size="sm" className="w-full">
                            <Link href={category.href}>View Category</Link>
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <Button variant="ghost" className="w-full justify-start h-9" asChild>
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
                  )}
                </div>
              ))}
            </nav>
          </div>

          {!isCollapsed && (
            <>
              <Separator />
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

              <Separator />
              <div>
                <Button className="w-full" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Join Community
                </Button>
              </div>
            </>
          )}

          {isCollapsed && (
            <div className="space-y-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-full justify-center">
                    <TrendingUp className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="right" className="w-60">
                  <div className="space-y-2">
                    <h4 className="font-medium">Trending Topics</h4>
                    {trending.map((topic) => (
                      <Button key={topic} variant="ghost" size="sm" className="w-full justify-start text-xs">
                        #{topic.replace(/\s+/g, "").toLowerCase()}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-full justify-center">
                    <Users className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="right" className="w-60">
                  <div className="space-y-2">
                    <h4 className="font-medium">Community</h4>
                    <p className="text-sm text-muted-foreground">
                      Join our growing community of developers and creators.
                    </p>
                    <Button className="w-full" size="sm">
                      Join Community
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
