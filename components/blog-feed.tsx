import { blogPosts } from "@/lib/blog-data"
import { EditorialPostCard } from "@/components/editorial-post-card"
import type { BlogPost } from "@/lib/types"

interface BlogFeedProps {
  posts?: BlogPost[]
}

export function BlogFeed({ posts }: BlogFeedProps) {
  const orderedPosts =
    posts ?? [...blogPosts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  return (
    <section className="w-full space-y-8 sm:space-y-10 lg:space-y-14">
      {orderedPosts.map((post) => (
        <EditorialPostCard key={post.id} post={post} />
      ))}
    </section>
  )
}
