import Link from "next/link"

const navItems = [
  { label: "Home", href: "/" },
  { label: "API", href: "/search?q=api" },
  { label: "Codex", href: "/search?q=codex" },
  { label: "ChatGPT", href: "/search?q=chatgpt" },
  { label: "Learn", href: "/blog" },
]

export function BlogHeaderMinimal() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center gap-4 px-4 lg:px-10">
        <div className="flex min-w-0 flex-1">
          <Link href="/" className="text-sm font-semibold tracking-tight text-foreground hover:text-foreground/80">
            RunAsh Blog
          </Link>
        </div>

        <nav className="hidden items-center gap-4 md:flex" aria-label="Blog navigation">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 justify-end">
          <Link
            href="/search?q=api"
            className="inline-flex h-9 items-center rounded-full bg-slate-900 px-4 text-sm font-medium text-white transition-colors hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
          >
            API Dashboard
          </Link>
        </div>
      </div>
    </header>
  )
}
