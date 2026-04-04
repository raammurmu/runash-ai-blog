import { BlogPageClient } from "@/components/blog-page-client"
import { getAllPosts } from "@/lib/blog-data"

export default function HomePage() {
  const posts = getAllPosts()

  return <BlogPageClient posts={posts} />
}
