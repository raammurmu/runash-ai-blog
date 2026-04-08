import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

const homePage = read('app/page.tsx')
const blogShell = read('components/blog-shell.tsx')
const leftRail = read('components/blog-left-rail.tsx')
const editorialCard = read('components/editorial-post-card.tsx')

test('BlogShell renders expected nav labels and responsive desktop/mobile affordances', () => {
  for (const label of ['Home', 'API', 'Codex', 'ChatGPT']) {
    assert.ok(blogShell.includes(`label: "${label}"`), `missing nav label: ${label}`)
  }

  assert.ok(blogShell.includes('className="hidden items-center gap-3 text-[13px] font-medium md:flex"'))
  assert.ok(blogShell.includes('aria-label="Open blog filters"'))
  assert.ok(blogShell.includes('className="rounded-lg md:hidden"'))
  assert.ok(blogShell.includes('aria-label="Search posts"'))
  assert.ok(blogShell.includes('className="rounded-full md:hidden"'))
  assert.ok(blogShell.includes('className="hidden min-h-[calc(100vh-57px)] w-[292px]'))
})

test('BlogLeftRail keeps Recent/Topics sections and supports active topic semantics', () => {
  assert.ok(leftRail.includes('>Recent<'))
  assert.ok(leftRail.includes('>Topics<'))
  assert.ok(leftRail.includes('{allPostsLink && ('))
  assert.ok(leftRail.includes('active && "text-foreground"'))
  assert.ok(leftRail.includes('active && "rounded-lg bg-muted text-foreground"'))
})

test('HomePage filtering combines topic + search query matching', () => {
  assert.ok(homePage.includes('const matchesTopic = activeTopic === "All" || (post.tags || []).includes(activeTopic)'))
  assert.ok(homePage.includes('const normalizedSearch = searchQuery.trim().toLowerCase()'))
  assert.ok(homePage.includes('return matchesTopic && searchIndex.includes(normalizedSearch)'))
  assert.ok(blogShell.includes('active: activeTopic === topic'))
})

test('Editorial card keeps critical article hierarchy in stable order', () => {
  // Visual assumption: image-first editorial card hierarchy is intentionally stable for above-the-fold scanning.
  const articleIndex = editorialCard.indexOf('<article')
  const heroLinkIndex = editorialCard.indexOf('<Link href={`/post/${post.slug}`} className="block overflow-hidden')
  const imageIndex = editorialCard.indexOf('<Image')
  const metaBlockIndex = editorialCard.indexOf('<div className="space-y-1.5 px-0.5')
  const dateIndex = editorialCard.indexOf('formatPublishedDate(post.publishedAt)')
  const titleIndex = editorialCard.indexOf('<h2 className="text-lg font-semibold')
  const excerptIndex = editorialCard.indexOf('{post.excerpt}')
  const categoryIndex = editorialCard.indexOf('{post.category}')

  assert.ok(articleIndex >= 0)
  assert.ok(heroLinkIndex > articleIndex)
  assert.ok(imageIndex > heroLinkIndex)
  assert.ok(metaBlockIndex > imageIndex)
  assert.ok(dateIndex > metaBlockIndex)
  assert.ok(titleIndex > dateIndex)
  assert.ok(excerptIndex > titleIndex)
  assert.ok(categoryIndex > excerptIndex)
})
