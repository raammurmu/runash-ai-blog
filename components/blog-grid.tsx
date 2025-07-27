import { BlogCard } from "@/components/blog-card"
import { getBlogPosts } from "@/lib/blog-data"

export async function BlogGrid() {
  const posts = await getBlogPosts()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  )
}
