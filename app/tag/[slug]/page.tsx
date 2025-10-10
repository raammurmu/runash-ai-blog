import { notFound } from "next/navigation"
import { getPostsByTag, getAllTags } from "@/lib/blog-data"
import { Header } from "@/components/header"
import { BlogCard } from "@/components/blog-card"
import { Badge } from "@/components/ui/badge"

interface Props {
  params: { slug: string }
}

export default async function TagPage({ params }: Props) {
  const tags = getAllTags()
  const tag = tags.find((t) => t.slug === params.slug)
  if (!tag) notFound()

  const posts = getPostsByTag(tag.name)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-5xl px-6 py-8">
        <div className="mb-4 flex items-center gap-2">
          <h1 className="text-2xl font-bold">Tag</h1>
          <Badge variant="secondary">#{tag.name}</Badge>
        </div>
        <p className="mb-6 text-muted-foreground">{tag.description}</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.id} post={p} />
          ))}
        </div>
        {posts.length === 0 && <div className="text-sm text-muted-foreground">No posts with this tag yet.</div>}
      </main>
    </div>
  )
}
