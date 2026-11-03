# Jade River Resort — Guest Stories (YouTube) Implementation Guide
## (Same system as XOGUL Kashmir — proven, production-tested)

---

## OVERVIEW

This adds a "Guest Stories" section to the resort website showing videos from a YouTube playlist. When a new video is added to the playlist, it automatically appears on the website within 1 hour — no code changes needed ever.

Features:
- Auto-fetches videos from YouTube playlist
- Click → opens lightbox player (user stays on website)
- "Watch Full Playlist" link to YouTube channel
- Dedicated `/stories` page + homepage section
- Mobile responsive

---

## STEP 1: CREATE YOUTUBE PLAYLIST

1. Go to YouTube → your resort channel → login
2. **Library → Playlists → New Playlist**
3. Name: `Jade River Resort — Guest Stories`
4. Visibility: **Public**
5. Add existing videos to this playlist
6. Copy playlist URL — note the `list=XXXXXXXX` part
   Example: `https://youtube.com/playlist?list=PLxxxxxx`
   Your **Playlist ID** is: `PLxxxxxx`

---

## STEP 2: GET YOUTUBE API KEY

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create new project → name: `Jade River Resort`
3. **APIs & Services → Enable APIs → search "YouTube Data API v3" → Enable**
4. **Credentials → Create Credentials → API Key**
5. **IMPORTANT:** In API key settings:
   - Application restrictions: **None** ← very important, must be None
   - API restrictions: Select "YouTube Data API v3"
6. Copy the API key

---

## STEP 3: ENVIRONMENT VARIABLES

Add to `.env.local`:
```
NEXT_PUBLIC_YOUTUBE_API_KEY=your_api_key_here
NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID=your_playlist_id_here
```

Also add to Vercel dashboard:
- `NEXT_PUBLIC_YOUTUBE_API_KEY` = your key
- `NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID` = your playlist ID

---

## STEP 4: YOUTUBE FETCH LIBRARY

### File: `src/lib/youtube.ts`
```typescript
export interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  publishedAt: string
}

export async function getPlaylistVideos(
  maxResults = 6
): Promise<YouTubeVideo[]> {
  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
  const PLAYLIST_ID = process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID

  if (!API_KEY || !PLAYLIST_ID) {
    console.error('YouTube API key or Playlist ID missing')
    return []
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${PLAYLIST_ID}&key=${API_KEY}`

    const res = await fetch(url, {
      next: { revalidate: 3600 } // cache 1 hour, auto-refresh
    })

    if (!res.ok) {
      console.error('YouTube API failed:', res.status, res.statusText)
      return []
    }

    const data = await res.json()

    if (!data.items || data.items.length === 0) {
      return []
    }

    return data.items.map((item: any) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail:
        item.snippet.thumbnails?.maxres?.url ||
        item.snippet.thumbnails?.high?.url ||
        item.snippet.thumbnails?.medium?.url ||
        `https://img.youtube.com/vi/${item.snippet.resourceId.videoId}/maxresdefault.jpg`,
      publishedAt: item.snippet.publishedAt,
    }))
  } catch (error) {
    console.error('YouTube fetch error:', error)
    return []
  }
}
```

---

## STEP 5: NEXT.CONFIG.TS UPDATE

Add YouTube thumbnail domains:

```typescript
const nextConfig = {
  images: {
    remotePatterns: [
      // ...your existing patterns
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/vi/**',
      },
    ],
  },
}

export default nextConfig
```

---

## STEP 6: YOUTUBE SECTION COMPONENT

### File: `src/components/home/GuestStoriesSection.tsx`
```typescript
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { YouTubeVideo } from '@/lib/youtube'

interface GuestStoriesSectionProps {
  videos: YouTubeVideo[]
  playlistId?: string
}

export default function GuestStoriesSection({
  videos,
  playlistId,
}: GuestStoriesSectionProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  // ESC key closes lightbox
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveVideo(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  // Body scroll lock when lightbox open
  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [activeVideo])

  if (videos.length === 0) {
    return (
      <section style={{ padding: '80px 0', textAlign: 'center' }}>
        <p style={{ opacity: 0.5 }}>Guest stories coming soon...</p>
      </section>
    )
  }

  return (
    <>
      {/* Section */}
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{
              fontSize: '10px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: '16px',
              opacity: 0.5,
              fontFamily: 'sans-serif'
            }}>
              GUEST STORIES
            </p>
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 300,
              lineHeight: 1.1,
              marginBottom: '16px'
            }}>
              Real stays. Real stories.
            </h2>
            <p style={{ opacity: 0.5, fontSize: '15px', maxWidth: '480px', margin: '0 auto' }}>
              Watch our guests experience Jade River Resort firsthand
            </p>
          </div>

          {/* Video Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
          }}>
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={() => setActiveVideo(video.id)}
              />
            ))}
          </div>

          {/* Bottom row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '40px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <p style={{ opacity: 0.4, fontSize: '13px', fontFamily: 'sans-serif' }}>
              New guest stories added regularly
            </p>
            {playlistId && (
              <a
                href={`https://youtube.com/playlist?list=${playlistId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontFamily: 'sans-serif',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.2s ease',
                }}
              >
                <YouTubeIcon />
                Watch Full Playlist →
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {activeVideo && (
        <div
          onClick={() => setActiveVideo(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(8px)',
            zIndex: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setActiveVideo(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              cursor: 'pointer',
              color: 'white',
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>

          {/* Video */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '900px',
              aspectRatio: '16/9',
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </div>
        </div>
      )}
    </>
  )
}

// Individual video card
function VideoCard({
  video,
  onClick,
}: {
  video: YouTubeVideo
  onClick: () => void
}) {
  const [imgError, setImgError] = useState(false)

  return (
    <div
      onClick={onClick}
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#1a1a1a',
        transition: 'transform 0.3s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
        {!imgError && video.thumbnail ? (
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, #1a1a2e, #16213e)'
          }} />
        )}

        {/* Play button */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.2)',
          transition: 'background 0.2s ease',
        }}>
          <div style={{
            width: '52px', height: '52px',
            background: 'rgba(207,0,0,0.85)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: 'white', fontSize: '18px', marginLeft: '3px' }}>▶</span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '16px' }}>
        <p style={{
          fontSize: '14px',
          fontWeight: 500,
          lineHeight: 1.4,
          marginBottom: '6px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical' as any,
          overflow: 'hidden',
        }}>
          {video.title}
        </p>
        <p style={{ fontSize: '12px', opacity: 0.4, fontFamily: 'sans-serif' }}>
          {new Date(video.publishedAt).toLocaleDateString('en-IN', {
            month: 'long', year: 'numeric'
          })}
        </p>
      </div>
    </div>
  )
}

// YouTube SVG icon
function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="#FF0000">
      <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
    </svg>
  )
}
```

---

## STEP 7: DEDICATED STORIES PAGE

### File: `src/app/stories/page.tsx`
```typescript
import { getPlaylistVideos } from '@/lib/youtube'
import GuestStoriesSection from '@/components/home/GuestStoriesSection'

export const revalidate = 3600 // refresh every hour

export const metadata = {
  title: 'Guest Stories | Jade River Resort',
  description: 'Watch real guest experiences at Jade River Resort. See what our visitors say about their stay.',
}

const PLAYLIST_ID = process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID || ''

export default async function StoriesPage() {
  const videos = await getPlaylistVideos(12) // show more on dedicated page

  return (
    <main>
      {/* Hero */}
      <section style={{
        padding: '120px 24px 60px',
        textAlign: 'center',
        background: 'linear-gradient(to bottom, #0a0a0a, #111)',
      }}>
        <p style={{
          fontSize: '10px', letterSpacing: '0.3em',
          textTransform: 'uppercase', opacity: 0.5,
          marginBottom: '16px', fontFamily: 'sans-serif', color: 'white'
        }}>
          GUEST EXPERIENCES
        </p>
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: 300, color: 'white', lineHeight: 1.1
        }}>
          Kashmir through their eyes
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '16px', fontSize: '15px' }}>
          Real journeys. Real emotions. Real Jade River.
        </p>
      </section>

      {/* Featured first video */}
      {videos[0] && (
        <section style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px 0' }}>
          <p style={{
            fontSize: '10px', letterSpacing: '0.25em',
            textTransform: 'uppercase', opacity: 0.5,
            marginBottom: '16px', fontFamily: 'sans-serif'
          }}>
            LATEST STORY
          </p>
          <div style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '16/9' }}>
            <iframe
              src={`https://www.youtube.com/embed/${videos[0].id}?rel=0&modestbranding=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </div>
          <h2 style={{ marginTop: '16px', fontSize: '22px', fontWeight: 400 }}>
            {videos[0].title}
          </h2>
        </section>
      )}

      {/* All videos */}
      <GuestStoriesSection
        videos={videos.slice(1)} // skip first (already shown above)
        playlistId={PLAYLIST_ID}
      />

      {/* Subscribe strip */}
      <section style={{
        maxWidth: '700px', margin: '0 auto',
        padding: '0 24px 80px', textAlign: 'center'
      }}>
        <div style={{
          background: '#1a1a1a', borderRadius: '20px', padding: '40px',
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
          <h3 style={{ fontSize: '28px', fontWeight: 300, marginBottom: '8px' }}>
            Subscribe for more stories
          </h3>
          <p style={{ opacity: 0.5, fontSize: '14px', marginBottom: '24px' }}>
            New guest videos added regularly to our channel
          </p>
          <a
            href={`https://youtube.com/playlist?list=${PLAYLIST_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#FF0000', color: 'white',
              padding: '12px 28px', borderRadius: '999px',
              fontSize: '14px', fontFamily: 'sans-serif',
              textDecoration: 'none', fontWeight: 500
            }}
          >
            ▶ Watch on YouTube
          </a>
        </div>
      </section>
    </main>
  )
}
```

---

## STEP 8: ADD TO HOMEPAGE

In your `src/app/page.tsx`:

```typescript
import { getPlaylistVideos } from '@/lib/youtube'
import GuestStoriesSection from '@/components/home/GuestStoriesSection'

export default async function HomePage() {
  // Fetch alongside other data
  const videos = await getPlaylistVideos(6)

  const PLAYLIST_ID = process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID || ''

  return (
    <main>
      {/* ...other sections... */}

      {/* Guest Stories Section */}
      <GuestStoriesSection
        videos={videos}
        playlistId={PLAYLIST_ID}
      />

      {/* ...more sections... */}
    </main>
  )
}
```

---

## STEP 9: ADD TO NAVIGATION

In your Navbar, add a link:
```typescript
<a href="/stories">Guest Stories</a>
```

In your Footer:
```typescript
<a href="/stories">Guest Stories</a>
```

---

## HOW IT WORKS — ZERO MAINTENANCE

```
1. Record a guest video
2. Upload to YouTube
3. Add to playlist "Jade River Resort — Guest Stories"
4. Wait 1 hour (or less)
5. Video automatically appears on website!

NO code changes needed. EVER.
```

---

## TROUBLESHOOTING

**Videos not showing?**
- Check API key is correct in `.env.local`
- Check Application restrictions is set to "None" in Google Cloud
- Check playlist is Public (not Private/Unlisted)
- Check `NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID` is correct

**403 Forbidden error in console?**
- API key Application restrictions must be **None**
- This is the most common issue

**Images not loading?**
- Verify `img.youtube.com` and `i.ytimg.com` are in `next.config.ts` remotePatterns

---

## PROMPT TO GIVE YOUR AI ASSISTANT

Copy this entire document and give to ChatGPT/Claude with:

> "I need to add a Guest Stories section to my Next.js resort website using YouTube playlist. Please implement all files exactly as shown. Style everything to match our existing design system. Make it mobile responsive."

---

*Guide version: August 2026 | Based on XOGUL Kashmir production implementation*
