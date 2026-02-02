import { redirect } from "next/navigation"

 
export default async function BlogSlugRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  redirect(`/post/${slug}`)

export default function BlogSlugRedirect({ params }: { params: { slug: string } }) {
  redirect(`/post/${params.slug}`)

}
