// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  // Example: Query your database here
  // const results = await db.post.findMany({ where: { title: { contains: query } } })

  // Mocking the real DB response structure
  const mockDB = [
    { id: '1', title: 'Building with Next.js 15', type: 'post', category: 'Tech', url: '/blog/nextjs' },
    { id: '2', title: 'John Doe', type: 'user', username: '@johndoe', url: '/profile/johndoe' }
  ]

  const filtered = mockDB.filter(item => 
    item.title.toLowerCase().includes(query?.toLowerCase() || '')
  )

  return NextResponse.json({ results: filtered })
}
