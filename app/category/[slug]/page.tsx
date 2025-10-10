import { notFound } from "next/navigation"
import { getPostsByCategory, getAllCategories } from "@/lib/blog-data"
import { Header } from "@/components/header"
import { BlogCard } from "@/components/blog-card"

interface Props {
  params: { slug: string }
}

export default async function CategoryPage({ params }: Props) {
  const cats = getAllCategories()
  const category = cats.find((c) => c.slug === params.slug)
  if (!category) notFound()

  const posts = getPostsByCategory(category.name)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-5xl px-6 py-8">
        <h1 className="mb-4 text-2xl font-bold">{category.name}</h1>
        <p className="mb-6 text-muted-foreground">{category.description}</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.id} post={p} />
          ))}
        </div>
        {posts.length === 0 && <div className="text-sm text-muted-foreground">No posts in this category yet.</div>}
      </main>
    </div>
  )
}
