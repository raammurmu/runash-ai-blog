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
  const isFallback = Boolean(resolvedParams?.slug && !post);

  const title = post?.title ?? (isFallback ? 'Post not found' : 'RunAsh AI Blog');
  const category = post?.category ?? (isFallback ? 'Unavailable slug' : 'Editorial');
  const date = post?.date ?? 'runash.ai/blog';

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
          backgroundColor: '#091022',
          backgroundImage:
            'radial-gradient(circle at 14% 18%, rgba(139,92,246,0.38), transparent 45%), radial-gradient(circle at 88% 22%, rgba(56,189,248,0.32), transparent 42%), radial-gradient(circle at 72% 90%, rgba(45,212,191,0.2), transparent 40%), linear-gradient(130deg, #0a1024 0%, #141e3a 48%, #1f2a4a 100%)',
          padding: '60px 68px',
          fontFamily: 'Inter, ui-sans-serif, system-ui',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(130deg, rgba(255,255,255,0.08), rgba(255,255,255,0) 38%), repeating-linear-gradient(-45deg, rgba(226,232,240,0.05) 0px, rgba(226,232,240,0.05) 1px, transparent 1px, transparent 28px)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: -110,
            right: -80,
            width: 300,
            height: 300,
            borderRadius: 9999,
            border: '1px solid rgba(226,232,240,0.14)',
            background:
              'radial-gradient(circle at 30% 30%, rgba(226,232,240,0.24), rgba(226,232,240,0.02) 62%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: -140,
            left: -60,
            width: 340,
            height: 340,
            borderRadius: 9999,
            border: '1px solid rgba(148,163,184,0.12)',
            opacity: 0.7,
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 44,
            right: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(226,232,240,0.32)',
            borderRadius: 999,
            padding: '8px 16px',
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: 0.3,
            color: 'rgba(226,232,240,0.95)',
            background: 'rgba(15,23,42,0.22)',
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
              fontSize: 24,
              color: 'rgba(226,232,240,0.82)',
              fontWeight: 500,
              marginBottom: 20,
            }}
          >
            <span style={{ textTransform: 'uppercase', letterSpacing: 1.8 }}>
              {category}
            </span>
            <span style={{ margin: '0 12px', opacity: 0.65 }}>•</span>
            <span>{date}</span>
          </div>

          <h1
            style={{
              margin: 0,
              maxWidth: 1000,
              fontSize: 74,
              lineHeight: 1.06,
              fontWeight: 800,
              letterSpacing: -1.3,
              color: '#f8fafc',
            }}
          >
            {title}
          </h1>

          {isFallback ? (
            <p
              style={{
                marginTop: 18,
                fontSize: 26,
                color: 'rgba(226,232,240,0.88)',
              }}
            >
              We couldn&apos;t find this article. Explore the latest posts on
              the RunAsh AI blog.
            </p>
          ) : null}

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
