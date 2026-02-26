import { BlogCardSkeleton } from "@/components/blog-card-skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-[60] w-full border-b bg-background/80 backdrop-blur-2xl py-2">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="h-10 w-40 rounded-2xl bg-muted animate-pulse" />
          <div className="h-10 w-28 rounded-2xl bg-muted animate-pulse" />
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="hidden md:block w-72 border-r bg-background/50 px-4 py-6">
          <div className="space-y-3 animate-pulse">
            <div className="h-8 w-32 rounded-lg bg-muted" />
            <div className="h-6 w-full rounded-lg bg-muted" />
            <div className="h-6 w-5/6 rounded-lg bg-muted" />
            <div className="h-6 w-4/6 rounded-lg bg-muted" />
          </div>
        </aside>

        <main className="flex-1 px-4 py-8 lg:px-8">
          <section className="space-y-6 px-2 md:px-4 max-w-7xl mx-auto">
            <div className="space-y-4 animate-pulse">
              <div className="h-10 w-2/3 max-w-xl rounded-2xl bg-muted" />
              <div className="h-5 w-1/2 max-w-md rounded-lg bg-muted/70" />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="h-8 w-28 rounded-lg bg-muted animate-pulse" />
              <div className="flex items-center gap-2 w-full sm:w-auto sm:justify-end animate-pulse">
                <div className="h-10 w-full sm:w-64 rounded-xl bg-muted" />
                <div className="h-10 w-24 rounded-xl bg-muted" />
                <div className="h-10 w-10 rounded-xl bg-muted hidden lg:block" />
              </div>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <BlogCardSkeleton key={index} viewMode="grid" />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
