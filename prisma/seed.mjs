import { randomUUID } from "crypto"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const author = {
  username: "rammurmu",
  name: "Ram Murmu",
  email: "rammurmu@runash.in",
  avatar: "/rammurmu.png?height=64&width=64",
  bio: "Full-stack developer.",
}

const posts = [
  {
    title: "The Wait is Almost Over: RunAsh Pre-Release",
    slug: "runash-pre-release-announcement",
    excerpt:
      "We are opening the doors to a limited group of early adopters. See how RunAsh is turning live streams into interactive storefronts.",
    content: "<h2>The New Era of Social Selling</h2><p>For too long, online shopping has been a static, 2D experience.</p>",
    category: "Announcement",
    gradient: "bg-gradient-to-br from-purple-500 to-indigo-600",
    emoji: "🚀",
    readTime: "3 min read",
    publishedAt: new Date("2021-04-06"),
    tags: ["PreRelease", "Beta", "Startups", "Waitlist"],
  },
  {
    title: "RunAsh is Live: Start Your Live Commerce Journey",
    slug: "runash-official-launch-live",
    excerpt:
      "The wait is over. RunAsh is officially open to all sellers and buyers. Experience the power of AI-driven live product demonstrations today.",
    content: "<h2>We Are Officially Open for Business</h2><p>After months of development and a successful private beta.</p>",
    category: "Product",
    gradient: "bg-gradient-to-br from-green-400 to-cyan-500",
    emoji: "🏁",
    readTime: "5 min read",
    publishedAt: new Date("2022-04-06"),
    tags: ["Launch", "LiveStreaming", "Ecommerce", "FinTech"],
  },
]

async function main() {
  await prisma.$executeRawUnsafe(`
    INSERT INTO "Author" ("id", "name", "username", "email", "avatar", "bio", "followers", "following", "createdAt", "updatedAt")
    VALUES ('${randomUUID()}', '${author.name}', '${author.username}', '${author.email}', '${author.avatar}', '${author.bio}', 0, 0, now(), now())
    ON CONFLICT ("username") DO UPDATE SET "name" = EXCLUDED."name", "avatar" = EXCLUDED."avatar", "bio" = EXCLUDED."bio", "updatedAt" = now();
  `)

  const dbAuthor = await prisma.$queryRawUnsafe(`SELECT "id" FROM "Author" WHERE "username" = '${author.username}' LIMIT 1;`)
  const authorId = dbAuthor[0].id

  for (const post of posts) {
    await prisma.$executeRawUnsafe(`
      INSERT INTO "Post" ("id", "title", "slug", "excerpt", "content", "category", "gradient", "emoji", "readTime", "authorId", "publishedAt", "createdAt", "updatedAt", "featured", "likes", "comments", "upvotes")
      VALUES ('${randomUUID()}', '${post.title.replaceAll("'", "''")}', '${post.slug}', '${post.excerpt.replaceAll("'", "''")}', '${post.content.replaceAll("'", "''")}', '${post.category}', '${post.gradient}', '${post.emoji}', '${post.readTime}', '${authorId}', '${post.publishedAt.toISOString()}', now(), now(), false, 0, 0, 0)
      ON CONFLICT ("slug") DO UPDATE SET "title" = EXCLUDED."title", "excerpt" = EXCLUDED."excerpt", "content" = EXCLUDED."content", "updatedAt" = now();
    `)

    const dbPost = await prisma.$queryRawUnsafe(`SELECT "id" FROM "Post" WHERE "slug" = '${post.slug}' LIMIT 1;`)
    const postId = dbPost[0].id

    for (const tag of post.tags) {
      await prisma.$executeRawUnsafe(`INSERT INTO "Tag" ("id", "name") VALUES ('${randomUUID()}', '${tag}') ON CONFLICT ("name") DO NOTHING;`)
      const dbTag = await prisma.$queryRawUnsafe(`SELECT "id" FROM "Tag" WHERE "name" = '${tag}' LIMIT 1;`)
      await prisma.$executeRawUnsafe(`INSERT INTO "PostTag" ("postId", "tagId") VALUES ('${postId}', '${dbTag[0].id}') ON CONFLICT DO NOTHING;`)
    }
  }
}

main().finally(async () => {
  await prisma.$disconnect()
})
