import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60svh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-muted-foreground">The page you’re looking for doesn’t exist or has been moved.</p>
      <Button asChild className="mt-6 shadow-sm">
        <Link href="/">Go back home</Link>
      </Button>
    </main>
  )
}
