export function generateCoverSvg({
  title,
  category,
  gradient = ["#F97316", "#F59E0B", "#FDBA74"],
}: {
  title: string
  category: string
  gradient?: [string, string, string]
}) {
  const [start, mid, end] = gradient
  const safeTitle = title || "RunAsh Blog"
  const safeCategory = category || "Article"

  return `
    <svg width="1200" height="600" viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="1200" y2="600">
          <stop offset="0%" stop-color="${start}" />
          <stop offset="50%" stop-color="${mid}" />
          <stop offset="100%" stop-color="${end}" />
        </linearGradient>
      </defs>
      <rect width="1200" height="600" rx="48" fill="url(#grad)" />
      <rect x="120" y="120" width="960" height="360" rx="36" fill="rgba(0,0,0,0.35)" />
      <text x="600" y="260" text-anchor="middle" font-family="Inter, Arial" font-size="36" fill="white" opacity="0.9">${safeCategory}</text>
      <text x="600" y="340" text-anchor="middle" font-family="Inter, Arial" font-size="52" font-weight="700" fill="white">${safeTitle}</text>
    </svg>
  `.trim()
}

export function getCoverDataUrl(title: string, category: string) {
  const svg = generateCoverSvg({ title, category })
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}
