import { notFound } from "next/navigation"
import { getAuthorByUsername, getPostsByAuthor } from "@/lib/blog-data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogCard } from "@/components/blog-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, FileText, Users } from "lucide-react"

interface Props {
  params: Promise<{ username: string }>
}

export default async function AuthorPage({ params }: Props) {
  const { username } = await params
  const author = getAuthorByUsername(username)
  if (!author) notFound()

  const posts = getPostsByAuthor(username)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 rounded-3xl border border-orange-100/70 bg-gradient-to-r from-white via-orange-50/30 to-amber-50/30 p-6 dark:border-orange-900/40 dark:from-gray-950 dark:via-orange-950/10 dark:to-amber-950/10">
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <Avatar className="h-20 w-20 ring-2 ring-orange-200/80 dark:ring-orange-900/40">
              <AvatarImage src={author.avatar || "/placeholder.svg"} />
              <AvatarFallback>{author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Badge className="mb-2 bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">Author profile</Badge>
              <h1 className="text-3xl font-black tracking-tight">{author.name}</h1>
              <p className="mt-1 text-sm text-muted-foreground">@{author.username} · {author.email}</p>
              {author.bio && <p className="mt-3 max-w-2xl text-muted-foreground">{author.bio}</p>}
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border bg-background/70 p-3 text-sm">
              <p className="inline-flex items-center gap-1 font-semibold"><FileText className="h-4 w-4 text-orange-500" /> Posts</p>
              <p className="mt-1 text-muted-foreground">{posts.length} published</p>
            </div>
            <div className="rounded-xl border bg-background/70 p-3 text-sm">
              <p className="inline-flex items-center gap-1 font-semibold"><Users className="h-4 w-4 text-orange-500" /> Followers</p>
              <p className="mt-1 text-muted-foreground">{author.followers}</p>
            </div>
            <div className="rounded-xl border bg-background/70 p-3 text-sm">
              <p className="inline-flex items-center gap-1 font-semibold"><CalendarDays className="h-4 w-4 text-orange-500" /> Joined</p>
              <p className="mt-1 text-muted-foreground">{new Date(author.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold tracking-tight">Posts by {author.name}</h2>
          {posts.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed p-8 text-center text-muted-foreground">No posts yet.</div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
