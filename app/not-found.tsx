import Link from "next/link"
import { Compass } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70svh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 rounded-full bg-orange-100 p-3 text-orange-600 dark:bg-orange-950/40 dark:text-orange-300">
        <Compass className="h-8 w-8" />
      </div>
      <h1 className="text-3xl font-black">404 — Page not found</h1>
      <p className="mt-2 text-muted-foreground">The page may have moved, been deleted, or the URL is incorrect.</p>
      <div className="mt-6 flex gap-3">
        <Button asChild className="bg-orange-600 hover:bg-orange-700">
          <Link href="/">Go home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/blog">Browse posts</Link>
        </Button>
      </div>
    </main>
  )
}
