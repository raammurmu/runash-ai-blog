import Link from "next/link"
import Image from "next/image"
import { PageTranslateControl } from "@/components/page-translate-control"

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
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground hover:text-foreground/80">
            <Image src="/placeholder-logo.svg" alt="RunAsh logo" width={24} height={24} className="rounded-sm" priority />
            <span>RunAsh Blog</span>
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

        <div className="flex flex-1 items-center justify-end gap-2">
          <PageTranslateControl />
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
