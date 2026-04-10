import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

const homePage = read('app/page.tsx')
const blogShell = read('components/blog-shell.tsx')
const leftRail = read('components/blog-left-rail.tsx')
const editorialCard = read('components/editorial-post-card.tsx')
const navConfig = read('components/nav-config.ts')

test('BlogShell renders expected nav labels and responsive desktop/mobile affordances', () => {
  for (const label of ['Home', 'API', 'Codex', 'ChatGPT']) {
    assert.ok(navConfig.includes(`label: "${label}"`), `missing nav label: ${label}`)
  }

  assert.ok(blogShell.includes('className={`${NAV_CONTRACT.desktopNav} text-xs font-medium`}'))
  assert.ok(blogShell.includes('aria-label="Open blog filters"'))
  assert.ok(blogShell.includes('className={`${NAV_CONTRACT.mobileIconButton} md:hidden`}'))
  assert.ok(blogShell.includes('aria-label="Search posts"'))
  assert.ok(blogShell.includes('className={`hidden min-h-[calc(100vh-57px)] border-r border-border/50'))
})

test('BlogLeftRail keeps Recent/Topics sections and supports active topic semantics', () => {
  assert.ok(leftRail.includes('import { Separator } from "@/components/ui/separator"'))
  assert.ok(leftRail.includes('<section key="search"'))
  assert.ok(leftRail.includes('<section key="recent"'))
  assert.ok(leftRail.includes('<section key="topics"'))
  assert.ok(leftRail.includes('<Separator className="bg-border/45" />'))
  assert.ok(leftRail.includes('{allPostsLink ? ('))

  const searchSectionIndex = leftRail.indexOf('<section key="search"')
  const recentSectionIndex = leftRail.indexOf('<section key="recent"')
  const topicsSectionIndex = leftRail.indexOf('<section key="topics"')
  assert.ok(searchSectionIndex >= 0)
  assert.ok(recentSectionIndex > searchSectionIndex)
  assert.ok(topicsSectionIndex > recentSectionIndex)

  assert.ok(leftRail.includes('active && "text-foreground"'))
  assert.ok(leftRail.includes('active && "rounded-lg bg-muted text-foreground"'))
  assert.equal(leftRail.includes('rounded-lg bg-muted text-foreground",\n    !active'), false)
  assert.ok(leftRail.includes('<Button variant="ghost" asChild className={baseClass}>'))
  assert.ok(leftRail.includes('<Button type="button" variant="ghost" onClick={onClick} className={cn(baseClass, "w-full")}>'))
})

test('BlogShell reuses one rail definition for both mobile sheet and desktop aside to keep section order consistent', () => {
  const railContentIndex = blogShell.indexOf('const railContent = (')
  const mobileUseIndex = blogShell.indexOf('{railContent}')
  const desktopUseIndex = blogShell.lastIndexOf('{railContent}')

  assert.ok(railContentIndex >= 0)
  assert.ok(mobileUseIndex > railContentIndex)
  assert.ok(desktopUseIndex > mobileUseIndex)
  assert.ok(blogShell.includes('<SheetContent side="left"'))
  assert.ok(blogShell.includes('className={`hidden min-h-[calc(100vh-57px)] border-r border-border/50'))
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
