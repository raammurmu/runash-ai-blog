import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

const homePage = read('app/page.tsx')
const blogShell = read('components/blog-shell.tsx')
const leftRail = read('components/blog-left-rail.tsx')
const editorialCard = read('components/editorial-post-card.tsx')
const navConfig = read('components/nav-config.ts')

const expectMatch = (source, pattern, message) => {
  assert.match(source, pattern, message)
}

test('BlogShell renders expected nav labels and responsive desktop/mobile affordances', () => {
  for (const label of ['Home', 'API', 'Codex', 'ChatGPT']) {
    expectMatch(navConfig, new RegExp(`label:\\s*"${label}"`), `missing nav label: ${label}`)
  }

  expectMatch(blogShell, /aria-label="Open blog filters"/, 'missing mobile filter button accessibility label')
  expectMatch(blogShell, /aria-label="Search posts"/, 'missing search accessibility label')
  expectMatch(blogShell, /<aside[\s\S]*lg:block/, 'expected desktop sidebar layout affordance')
})

test('BlogLeftRail keeps Recent/Topics sections and supports active topic semantics', () => {
  expectMatch(leftRail, />Recent</, 'missing recent heading')
  expectMatch(leftRail, />Topics</, 'missing topics heading')
  expectMatch(leftRail, /\{allPostsLink && \(/, 'missing all-posts conditional link')
  expectMatch(leftRail, /active\s*&&\s*"text-foreground"/, 'missing active topic text styling state')
  expectMatch(leftRail, /active\s*&&\s*"rounded-lg bg-muted text-foreground"/, 'missing active topic container styling state')
})

test('HomePage filtering combines topic + search query matching', () => {
  expectMatch(homePage, /const\s+matchesTopic\s*=\s*activeTopic\s*===\s*"All"\s*\|\|\s*\(post\.tags\s*\|\|\s*\[\]\)\.includes\(activeTopic\)/, 'missing topic matching logic')
  expectMatch(homePage, /const\s+normalizedSearch\s*=\s*searchQuery\.trim\(\)\.toLowerCase\(\)/, 'missing search normalization logic')
  expectMatch(homePage, /return\s+matchesTopic\s*&&\s*searchIndex\.includes\(normalizedSearch\)/, 'missing combined filter return logic')
  expectMatch(blogShell, /active:\s*activeTopic\s*===\s*topic/, 'missing topic active-state mapping')
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
