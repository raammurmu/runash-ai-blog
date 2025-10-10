import { notFound } from "next/navigation"
import { getAuthorByUsername, getPostsByAuthor } from "@/lib/blog-data"
import { Header } from "@/components/header"
import { BlogCard } from "@/components/blog-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Props {
  params: { username: string }
}

export default async function AuthorPage({ params }: Props) {
  const author = getAuthorByUsername(params.username)
  if (!author) notFound()

  const posts = getPostsByAuthor(params.username)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-5xl px-6 py-8">
        <section className="mb-8 rounded-2xl border p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src={author.avatar || "/placeholder.svg"} />
              <AvatarFallback>{author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{author.name}</h1>
              {author.bio && <p className="mt-1 text-muted-foreground">{author.bio}</p>}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="secondary">@{author.username}</Badge>
                <span>{"•"}</span>
                <span>Joined {new Date(author.createdAt).toLocaleDateString()}</span>
                <span>{"•"}</span>
                <span>{author.followers} followers</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">Posts by {author.name}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
          {posts.length === 0 && <div className="text-sm text-muted-foreground">No posts yet.</div>}
        </section>
      </main>
    </div>
  )
}
