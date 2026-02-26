"use client"

import Link from "next/link"
import { AlertTriangle, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-[70svh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 rounded-full bg-red-100 p-3 text-red-600 dark:bg-red-950/40 dark:text-red-300">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h1 className="text-3xl font-black tracking-tight">Something went wrong</h1>
      <p className="mt-3 text-muted-foreground">
        We couldn't render this page due to an unexpected issue. Try reloading, or go back to the blog home.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button onClick={reset} className="bg-orange-600 hover:bg-orange-700">
          <RefreshCcw className="mr-2 h-4 w-4" /> Try again
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </main>
  )
}
