"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown, Menu, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { PageTranslateControl } from "@/components/page-translate-control"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { getAllCategories } from "@/lib/blog-data"

const navItems = [
  { label: "Home", href: "https://runash.in" },
  { label: "API", href: "/search?q=api" },
  { label: "eDitX", href: "/search?q=codex" },
  { label: "RunAshChat", href: "/search?q=chatgpt" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [mobileLearnOpen, setMobileLearnOpen] = React.useState(true)
  const categories = React.useMemo(() => getAllCategories(), [])

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "site-header sticky top-0 z-[60] w-full border-b border-transparent transition-all duration-200",
        isScrolled ? "site-header--scrolled" : "site-header--top"
      )}
    >
      <div className="container mx-auto flex h-14 items-center justify-between gap-3 px-4">
        <div className="flex min-w-0 flex-1 items-center">
          <Link href="/" className="site-wordmark inline-flex items-center">
            RunAsh
          </Link>
        </div>

        <nav className="hidden items-center justify-center gap-0.5 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="site-nav-link">
              {item.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="site-nav-link h-8 gap-1 px-2.5">
                Learn
                <ChevronDown className="size-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-64">
              <DropdownMenuLabel>Documentation</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href="https://docs.runash.in">Browse everything</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {categories.map((category) => (
                <DropdownMenuItem key={category.slug} asChild>
                  <Link href={`/category/${category.slug}`}>{category.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
          <PageTranslateControl />
          <Button className="site-utility-button h-8 px-3 text-xs font-medium" asChild>
            <Link href="/create">
              <Plus className="mr-1.5 size-3.5" />
              Create
            </Link>
          </Button>

          <div className="site-theme-toggle-wrap">
            <ThemeToggle />
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8 md:hidden" aria-label="Open navigation menu">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-5 space-y-3">
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    asChild
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                ))}

                <Collapsible open={mobileLearnOpen} onOpenChange={setMobileLearnOpen}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between">
                      Learn
                      <ChevronDown className={cn("size-4 transition-transform", mobileLearnOpen && "rotate-180")} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 pl-2">
                    <Button asChild variant="ghost" className="w-full justify-start" onClick={() => setMobileOpen(false)}>
                      <Link href="https://docs.runash.in">Documentation</Link>
                    </Button>
                    {categories.map((category) => (
                      <Button
                        key={category.slug}
                        asChild
                        variant="ghost"
                        className="w-full justify-start text-muted-foreground"
                        onClick={() => setMobileOpen(false)}
                      >
                        <Link href={`/category/${category.slug}`}>{category.name}</Link>
                      </Button>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
