import { ImageResponse } from 'next/og';
import { blogPosts } from '@/lib/blog-data';

export const runtime = 'edge';
export const alt = 'RunAsh Blog Post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

type ImageParams = { slug?: string };

export default async function Image({
  params,
}: {
  params: ImageParams | Promise<ImageParams>;
}) {
  const resolvedParams = await params;
  const post = resolvedParams?.slug
    ? blogPosts.find((p) => p.slug === resolvedParams.slug)
    : undefined;

  const title = post?.title ?? 'RunAsh AI Blog';
  const category = post?.category ?? 'Editorial';
  const date = post?.date ?? 'Latest insights';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          color: '#f8fafc',
          backgroundColor: '#0f172a',
          backgroundImage:
            'radial-gradient(circle at 12% 18%, rgba(99,102,241,0.52), transparent 38%), radial-gradient(circle at 86% 16%, rgba(14,165,233,0.35), transparent 40%), radial-gradient(circle at 72% 88%, rgba(249,115,22,0.24), transparent 34%), linear-gradient(135deg, #020617 0%, #0f172a 36%, #1e293b 100%)',
          padding: '64px 72px',
          fontFamily: 'Inter, ui-sans-serif, system-ui',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(120deg, rgba(248,250,252,0.06) 0%, rgba(248,250,252,0) 35%), repeating-linear-gradient(0deg, rgba(148,163,184,0.07) 0px, rgba(148,163,184,0.07) 1px, transparent 1px, transparent 42px)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 56,
            right: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(226,232,240,0.32)',
            borderRadius: 999,
            padding: '8px 18px',
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 0.5,
            color: 'rgba(226,232,240,0.95)',
            background: 'rgba(15,23,42,0.34)',
          }}
        >
          RunAsh AI
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 28,
              color: 'rgba(226,232,240,0.86)',
              fontWeight: 500,
              marginBottom: 26,
            }}
          >
            <span style={{ textTransform: 'uppercase', letterSpacing: 1.8 }}>
              {category}
            </span>
            <span style={{ margin: '0 14px', opacity: 0.7 }}>•</span>
            <span>{date}</span>
          </div>

          <h1
            style={{
              margin: 0,
              maxWidth: 980,
              fontSize: 76,
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: -1.6,
              color: '#f8fafc',
            }}
          >
            {title}
          </h1>

          <div
            style={{
              marginTop: 'auto',
              width: '100%',
              height: 1,
              background:
                'linear-gradient(90deg, rgba(226,232,240,0.46) 0%, rgba(226,232,240,0.08) 70%, rgba(226,232,240,0) 100%)',
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
