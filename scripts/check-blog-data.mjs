import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const blogDataPath = path.join(__dirname, "..", "lib", "blog-data.ts")
const file = await fs.readFile(blogDataPath, "utf8")

const blogPostsMatch = file.match(/export const blogPosts:[\s\S]*?\n\]/)
if (!blogPostsMatch) {
  throw new Error("Unable to locate blogPosts array in lib/blog-data.ts")
}

const blogPostsSection = blogPostsMatch[0]
const ids = [...blogPostsSection.matchAll(/id:\s*"(.*?)"/g)].map((match) => match[1])
const slugs = [...blogPostsSection.matchAll(/slug:\s*"(.*?)"/g)].map((match) => match[1])
const publishedDates = [...blogPostsSection.matchAll(/publishedAt:\s*"(.*?)"/g)].map((match) => match[1])

const seenIds = new Set()
const seenSlugs = new Set()

for (const id of ids) {
  if (seenIds.has(id)) {
    throw new Error(`Duplicate blog post id detected: ${id}`)
  }
  seenIds.add(id)
}

for (const slug of slugs) {
  if (seenSlugs.has(slug)) {
    throw new Error(`Duplicate blog post slug detected: ${slug}`)
  }
  seenSlugs.add(slug)
}

for (const publishedAt of publishedDates) {
  if (Number.isNaN(Date.parse(publishedAt))) {
    throw new Error(`Invalid publishedAt date detected: ${publishedAt}`)
  }
}

console.log(`Checked ${ids.length} blog posts.`)
