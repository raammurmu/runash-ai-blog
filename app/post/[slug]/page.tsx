import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getBlogPost } from "@/lib/blog-data"
import { PostContent } from "@/components/post-content"
import { PostComments } from "@/components/post-comments"
import { Header } from "@/components/header"

interface PostPageProps {
  params: {
    slug: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-4xl mx-auto px-6 py-8">
        <PostContent post={post} />
        <Suspense fallback={<div>Loading comments...</div>}>
          <PostComments postId={post.id} />
        </Suspense>
      </main>
    </div>
  )
}
