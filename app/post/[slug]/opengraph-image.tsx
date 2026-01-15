import { ImageResponse } from 'next/og';
import { blogPosts } from "@/lib/blog-data";

export const runtime = 'edge';
export const alt = 'Findley Blog Post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  return new ImageResponse(
    (
      // The "Findley Card" Design
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          backgroundImage: 'radial-gradient(circle at top left, #fff7ed 0%, #ffffff 100%)',
          padding: '80px',
        }}
      >
        {/* Decorative Orange Blobs */}
        <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: 200, background: 'linear-gradient(to bottom right, #f97316, #f59e0b)', opacity: 0.1 }} />
        
        {/* Main Content Card */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          border: '1px solid #ffedd5',
          borderRadius: '40px',
          padding: '60px',
          boxShadow: '0 20px 50px rgba(251, 146, 60, 0.1)',
          width: '100%',
          height: '100%',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '40px', marginRight: '20px' }}>{post?.emoji || '🚀'}</span>
            <div style={{ background: 'linear-gradient(to right, #f97316, #f59e0b)', padding: '8px 20px', borderRadius: '100px', color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
              {post?.category}
            </div>
          </div>

          <h1 style={{ fontSize: '72px', fontWeight: '900', color: '#1a1a1a', lineHeight: 1.1, marginBottom: '30px', fontFamily: 'Inter' }}>
            {post?.title}
          </h1>

          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '30px', backgroundColor: '#fed7aa', display: 'flex', alignItems: 'center', justifyItems: 'center', color: '#9a3412', fontSize: '24px', fontWeight: 'bold', marginRight: '20px' }}>
                {post?.author.name[0]}
              </div>
              <span style={{ fontSize: '28px', color: '#4b5563', fontWeight: '500' }}>{post?.author.name}</span>
            </div>
            <div style={{ fontSize: '28px', color: '#f97316', fontWeight: '800' }}>Findley.io</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
