export const BLOG_HEADER_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/search?q=api", label: "API" },
  { href: "/search?q=codex", label: "Codex" },
  { href: "/search?q=chatgpt", label: "ChatGPT" },
] as const

export const SITE_HEADER_NAV_ITEMS = [
  { label: "API", href: "/search?q=api" },
  { label: "RunAsh Chat", href: "/search?q=chatgpt" },
  { label: "EditX", href: "/search?q=codex" },
] as const

export const NAV_CONTRACT = {
  headerShell:
    "sticky top-0 z-40 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90",
  headerInner: "mx-auto flex w-full items-center justify-between gap-3 px-4",
  brandText: "site-wordmark text-base font-semibold leading-tight tracking-tight",
  desktopNav: "hidden items-center gap-1 md:flex",
  navLink: "site-nav-link",
  learnTrigger: "site-nav-link h-8 gap-1 px-2",
  actionButton: "h-8 rounded-md px-3 text-xs font-medium",
  utilityIconButton: "h-8 w-8 rounded-md",
  mobileIconButton: "h-8 w-8 rounded-md",
} as const
