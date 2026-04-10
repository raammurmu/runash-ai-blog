"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SiteSearchFormProps {
  placeholder?: string
  inputClassName?: string
  buttonClassName?: string
  className?: string
  onSubmitDone?: () => void
}

export function SiteSearchForm({
  placeholder = "Search posts",
  inputClassName,
  buttonClassName,
  className,
  onSubmitDone,
}: SiteSearchFormProps) {
  const router = useRouter()
  const [query, setQuery] = React.useState("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const sanitizedQuery = query.trim()
    if (!sanitizedQuery) return
    router.push(`/search?q=${encodeURIComponent(sanitizedQuery)}`)
    onSubmitDone?.()
  }

  return (
    <form className={cn("flex items-center gap-1.5", className)} role="search" aria-label="Site search" onSubmit={handleSubmit}>
      <Input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        className={cn("text-xs", inputClassName)}
        aria-label={placeholder}
      />
      <Button type="submit" size="icon" variant="outline" className={cn("h-8 w-8 rounded-md", buttonClassName)} aria-label="Search">
        <Search className="size-3.5" />
      </Button>
    </form>
  )
}
