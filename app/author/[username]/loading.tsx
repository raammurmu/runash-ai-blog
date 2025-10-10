export default function LoadingAuthor() {
  return (
    <div className="container mx-auto max-w-5xl px-6 py-8">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-muted animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-6 w-1/3 bg-muted rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
        </div>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-56 rounded-md bg-muted animate-pulse" />
        ))}
      </div>
    </div>
  )
}
