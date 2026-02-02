export function generateCoverSvg({
  gradient = ["#F97316", "#F59E0B", "#FDBA74"],
}: {
  gradient?: [string, string, string]
}) {
  const [start, mid, end] = gradient

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
      <circle cx="240" cy="180" r="120" fill="rgba(255,255,255,0.18)" />
      <circle cx="960" cy="420" r="160" fill="rgba(0,0,0,0.15)" />
    </svg>
  `.trim()
}

export function getCoverDataUrl(title: string, category: string) {
  const svg = generateCoverSvg({})
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}
