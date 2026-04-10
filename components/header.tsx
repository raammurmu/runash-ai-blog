"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { PageTranslateControl } from "@/components/page-translate-control"
import { SiteSearchForm } from "@/components/site-search-form"
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
import { NAV_CONTRACT, SITE_HEADER_NAV_ITEMS } from "@/components/nav-config"

export function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [mobileLearnOpen, setMobileLearnOpen] = React.useState(true)
  const categories = React.useMemo(() => getAllCategories(), [])
  const showSearch = !pathname.startsWith("/search")

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        `${NAV_CONTRACT.headerShell} site-header transition-all duration-200`,
        isScrolled ? "site-header--scrolled" : "site-header--top"
      )}
    >
      <div className={`${NAV_CONTRACT.headerInner} container h-11 max-w-screen-2xl`}>
        <div className="flex min-w-0 flex-1 items-center">
          <Link href="/" className="site-wordmark inline-flex items-center gap-2">
            <Image
              src="/runash-logo.svg"
              alt="RunAsh logo"
              width={22}
              height={22}
              className="rounded-sm"
              priority
            />
            <span className={`${NAV_CONTRACT.brandText} brand-gradient-text`}>RunAsh</span>
          </Link>
        </div>

        <nav className={`${NAV_CONTRACT.desktopNav} justify-center`} aria-label="Primary">
          {SITE_HEADER_NAV_ITEMS.map((item) => (
            <Link key={item.label} href={item.href} className={NAV_CONTRACT.navLink}>
              {item.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={NAV_CONTRACT.learnTrigger}>
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

        <div className="flex flex-1 items-center justify-end gap-1.5">
          <div className="hidden md:block">
            <SiteSearchForm
              placeholder="Search RunAsh"
              className="min-w-[220px]"
              inputClassName="h-8 rounded-full border-primary/20 bg-background pl-3 text-xs"
              buttonClassName="h-8 w-8 rounded-full border-primary/20"
            />
          </div>
          <PageTranslateControl />
          <div className="site-theme-toggle-wrap">
            <ThemeToggle />
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={`${NAV_CONTRACT.mobileIconButton} md:hidden`}
                aria-label="Open navigation menu"
              >
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[92%] border-l border-primary/20 bg-background p-0 text-foreground sm:max-w-sm">
              <SheetHeader>
                <SheetTitle className="border-b border-border/50 px-5 py-4 text-left text-lg">Menu</SheetTitle>
              </SheetHeader>
              <div className="space-y-5 p-5">
                <div className="rounded-[1.75rem] border border-primary/20 bg-primary/5 p-2">
                  <SiteSearchForm
                    placeholder="Search products, posts, APIs"
                    className="rounded-2xl bg-background px-3 py-2.5 ring-1 ring-primary/15"
                    inputClassName="h-auto border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
                    buttonClassName="h-8 w-8 rounded-full border-primary/20"
                    onSubmitDone={() => setMobileOpen(false)}
                  />
                </div>

                <div className="space-y-2">
                  {SITE_HEADER_NAV_ITEMS.map((item) => (
                    <Button
                      key={item.label}
                      asChild
                      variant="ghost"
                      className="h-11 w-full justify-start rounded-2xl border border-primary/20 bg-background px-4 text-sm hover:border-primary/35 hover:bg-primary/10"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </Button>
                  ))}
                </div>

                <Collapsible open={mobileLearnOpen} onOpenChange={setMobileLearnOpen}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-11 w-full justify-between rounded-2xl border border-primary/20 bg-background px-4 text-sm hover:border-primary/35 hover:bg-primary/10"
                    >
                      Learn
                      <ChevronDown className={cn("size-4 transition-transform", mobileLearnOpen && "rotate-180")} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 pt-2">
                    <Button
                      asChild
                      variant="ghost"
                      className="h-10 w-full justify-start rounded-xl border border-primary/20 bg-background px-3.5 text-sm hover:border-primary/35 hover:bg-primary/10"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Link href="https://docs.runash.in">Documentation</Link>
                    </Button>
                    {categories.map((category) => (
                      <Button
                        key={category.slug}
                        asChild
                        variant="ghost"
                        className="h-10 w-full justify-start rounded-xl border border-primary/20 bg-background px-3.5 text-sm text-muted-foreground hover:border-primary/35 hover:bg-primary/10"
                        onClick={() => setMobileOpen(false)}
                      >
                        <Link href={`/category/${category.slug}`}>{category.name}</Link>
                      </Button>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                <div className="border-t border-border/50 pt-5">
                  <Button asChild className="h-11 w-full rounded-full bg-white text-black hover:bg-white/90">
                    <Link href="/search?q=api" onClick={() => setMobileOpen(false)}>
                      API Dashboard ↗
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
