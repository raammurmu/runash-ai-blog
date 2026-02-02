"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-[60svh] px-6 flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold mb-3">Something went wrong</h1>
      <p className="text-muted-foreground mb-6">
        We hit an unexpected error while loading this page. Please try again or return home.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Button onClick={reset}>Try again</Button>
        <Button variant="outline" asChild>
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    </div>
  )
}
