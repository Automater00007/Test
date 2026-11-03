# Jade River Resort — Blog System Implementation Guide
## (Same system as XOGUL Kashmir — proven, production-tested)

---

## OVERVIEW

This guide will help you add a complete blog system to the Jade River Resort website using Sanity CMS. The blog will have:
- SEO-optimized posts with meta title, description, keywords
- Rich text editor with custom blocks (tables, CTA buttons, callout boxes, raw HTML)
- Author and Category management
- Draft preview before publishing
- Auto-update on website (no redeploy needed)
- Homepage shows latest 3 posts automatically

---

## PREREQUISITES

Your website must be built with **Next.js** (App Router). If using a different framework, the Sanity schemas still work but the Next.js-specific code will need adaptation.

---

## STEP 1: CREATE SANITY PROJECT

1. Go to [sanity.io](https://sanity.io) → Sign up/Login
2. Click **"New Project"**
3. Project name: `jade-river-resort`
4. Dataset: `production`
5. Copy your **Project ID** (looks like: `abc12345`)

---

## STEP 2: INSTALL PACKAGES

Run in your project terminal:
```bash
npm install next-sanity @sanity/client @sanity/image-url @portabletext/react
npm install --save-dev @sanity/cli
```

---

## STEP 3: ENVIRONMENT VARIABLES

Add to your `.env.local` file:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here
```

To get your API token:
1. Sanity dashboard → your project → **API → Tokens**
2. Click **"Add API Token"**
3. Name: `Resort Website`, Permission: **Editor**
4. Copy the token

---

## STEP 4: SANITY CLIENT SETUP

### File: `src/sanity/lib/client.ts`
```typescript
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})
```

### File: `src/sanity/lib/image.ts`
```typescript
import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from './client'

const builder = createImageUrlBuilder(client)

export const urlFor = (source: SanityImageSource) =>
  builder.image(source)
```

---

## STEP 5: SANITY SCHEMAS

### File: `src/sanity/schemas/author.ts`
```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string',
      validation: Rule => Rule.required() }),
    defineField({ name: 'role', title: 'Role', type: 'string' }),
    defineField({ name: 'image', title: 'Photo', type: 'image',
      options: { hotspot: true } }),
    defineField({ name: 'bio', title: 'Bio', type: 'text' }),
  ]
})
```

### File: `src/sanity/schemas/category.ts`
```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string',
      validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug',
      options: { source: 'title' } }),
  ]
})
```

### File: `src/sanity/schemas/blocks/customTable.ts`
```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'customTable',
  title: 'Table',
  type: 'object',
  icon: () => '📊',
  fields: [
    defineField({ name: 'caption', title: 'Caption (optional)', type: 'string' }),
    defineField({
      name: 'headers', title: 'Column Headers',
      type: 'array', of: [{ type: 'string' }],
      validation: Rule => Rule.required().min(2)
    }),
    defineField({
      name: 'rows', title: 'Table Rows',
      type: 'array',
      of: [{
        type: 'object', name: 'row', title: 'Row',
        fields: [
          defineField({ name: 'cells', title: 'Cells',
            type: 'array', of: [{ type: 'string' }] })
        ],
        preview: {
          select: { cells: 'cells' },
          prepare({ cells }) {
            return { title: cells?.join(' | ') || 'Empty row' }
          }
        }
      }]
    }),
  ],
  preview: {
    select: { caption: 'caption', headers: 'headers' },
    prepare({ caption, headers }) {
      return { title: caption || 'Table', subtitle: headers?.join(', ') }
    }
  }
})
```

### File: `src/sanity/schemas/blocks/ctaButton.ts`
```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ctaButton',
  title: 'CTA Button',
  type: 'object',
  icon: () => '🔘',
  fields: [
    defineField({ name: 'text', title: 'Button Text', type: 'string',
      validation: Rule => Rule.required() }),
    defineField({
      name: 'style', title: 'Button Style', type: 'string',
      options: {
        list: [
          { title: 'Primary (Dark)', value: 'primary' },
          { title: 'Outlined', value: 'secondary' },
          { title: 'WhatsApp Green', value: 'whatsapp' },
        ],
        layout: 'radio'
      },
      initialValue: 'primary'
    }),
    defineField({
      name: 'linkType', title: 'Link Type', type: 'string',
      options: {
        list: [
          { title: 'Internal Page', value: 'internal' },
          { title: 'WhatsApp', value: 'whatsapp' },
          { title: 'External URL', value: 'external' },
        ],
        layout: 'radio'
      },
      initialValue: 'internal'
    }),
    defineField({ name: 'internalPath', title: 'Internal Path',
      type: 'string', placeholder: 'e.g. /rooms',
      hidden: ({ parent }) => parent?.linkType !== 'internal' }),
    defineField({ name: 'externalUrl', title: 'External URL',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'external' }),
    defineField({ name: 'whatsappMessage', title: 'WhatsApp Message',
      type: 'text', rows: 2,
      hidden: ({ parent }) => parent?.linkType !== 'whatsapp' }),
    defineField({
      name: 'align', title: 'Alignment', type: 'string',
      options: { list: ['left', 'center', 'right'], layout: 'radio' },
      initialValue: 'left'
    }),
  ],
  preview: {
    select: { text: 'text', style: 'style' },
    prepare({ text, style }) {
      return { title: `${style === 'whatsapp' ? '🟢' : '🔘'} ${text || 'Button'}` }
    }
  }
})
```

### File: `src/sanity/schemas/blocks/calloutBox.ts`
```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'calloutBox',
  title: 'Callout Box',
  type: 'object',
  icon: () => '📌',
  fields: [
    defineField({
      name: 'type', title: 'Box Type', type: 'string',
      options: {
        list: [
          { title: '💡 Pro Tip', value: 'tip' },
          { title: '⚠️ Warning', value: 'warning' },
          { title: 'ℹ️ Info', value: 'info' },
          { title: '✅ Did You Know', value: 'fact' },
          { title: '🔴 Important', value: 'important' },
        ],
        layout: 'radio'
      },
      initialValue: 'tip',
      validation: Rule => Rule.required()
    }),
    defineField({ name: 'title', title: 'Box Title (optional)', type: 'string' }),
    defineField({ name: 'content', title: 'Content', type: 'text', rows: 3,
      validation: Rule => Rule.required() }),
  ],
  preview: {
    select: { type: 'type', content: 'content' },
    prepare({ type, content }) {
      const emoji: Record<string, string> = { tip: '💡', warning: '⚠️', info: 'ℹ️', fact: '✅', important: '🔴' }
      return { title: `${emoji[type] || '📌'} ${type?.toUpperCase()}`, subtitle: content?.slice(0, 60) }
    }
  }
})
```

### File: `src/sanity/schemas/blocks/htmlBlock.ts`
```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'htmlBlock',
  title: 'Custom HTML',
  type: 'object',
  icon: () => '🖥️',
  fields: [
    defineField({ name: 'label', title: 'Label (for reference only)',
      type: 'string', placeholder: 'e.g. Booking Table' }),
    defineField({ name: 'html', title: 'HTML Code (inline styles only)',
      type: 'text', rows: 10,
      description: 'Use inline styles only. No <style> tags.',
      validation: Rule => Rule.required() }),
  ],
  preview: {
    select: { label: 'label', html: 'html' },
    prepare({ label, html }) {
      return { title: `🖥️ ${label || 'HTML Block'}`, subtitle: html?.slice(0, 60) }
    }
  }
})
```

### File: `src/sanity/schemas/post.ts` (MAIN BLOG POST SCHEMA)
```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    // === CONTENT ===
    defineField({
      name: 'title', title: 'Title', type: 'string',
      validation: Rule => Rule.required().max(70)
        .warning('Keep under 70 characters for SEO')
    }),
    defineField({
      name: 'slug', title: 'Slug (URL)', type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'author', title: 'Author', type: 'reference',
      to: [{ type: 'author' }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category', title: 'Category', type: 'reference',
      to: [{ type: 'category' }]
    }),
    defineField({
      name: 'mainImage', title: 'Cover Image', type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text (SEO)', type: 'string' })
      ]
    }),
    defineField({
      name: 'publishedAt', title: 'Published Date', type: 'datetime',
      validation: Rule => Rule.required()
    }),
    defineField({ name: 'readTime', title: 'Read Time', type: 'string',
      placeholder: 'e.g. 5 min' }),
    defineField({
      name: 'featured', title: 'Featured Post?', type: 'boolean',
      initialValue: false,
      description: 'Featured posts appear prominently on homepage'
    }),
    defineField({
      name: 'excerpt', title: 'Excerpt / Short Description', type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(160)
        .warning('Keep under 160 characters — used as meta description')
    }),
    defineField({
      name: 'body', title: 'Body Content', type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image', options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
            { name: 'caption', type: 'string', title: 'Caption' }
          ]
        },
        { type: 'customTable' },
        { type: 'ctaButton' },
        { type: 'calloutBox' },
        { type: 'htmlBlock' },
      ]
    }),

    // === SEO FIELDS ===
    defineField({
      name: 'seo', title: 'SEO Settings', type: 'object',
      fields: [
        defineField({ name: 'metaTitle', title: 'Meta Title',
          type: 'string', description: 'Leave empty to use post title. Max 60 chars.',
          validation: Rule => Rule.max(60) }),
        defineField({ name: 'metaDescription', title: 'Meta Description',
          type: 'text', rows: 3,
          description: 'Max 160 characters for Google search results.',
          validation: Rule => Rule.max(160) }),
        defineField({ name: 'focusKeyword', title: 'Focus Keyword',
          type: 'string',
          description: 'Primary keyword this post targets' }),
        defineField({ name: 'secondaryKeywords', title: 'Secondary Keywords',
          type: 'array', of: [{ type: 'string' }],
          description: 'Add up to 5 additional keywords' }),
        defineField({ name: 'canonicalUrl', title: 'Canonical URL',
          type: 'url',
          description: 'Leave empty unless this is a syndicated post' }),
        defineField({ name: 'noIndex', title: 'Hide from search engines',
          type: 'boolean', initialValue: false }),
        defineField({ name: 'ogImage', title: 'Social Share Image',
          type: 'image',
          description: 'Image for WhatsApp/Facebook sharing. 1200x630px ideal.' }),
      ]
    }),

    // === INTERNAL LINKING ===
    defineField({
      name: 'relatedPosts', title: 'Related Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      validation: Rule => Rule.max(3),
      description: 'Select 2-3 related posts for internal linking'
    }),

    // === SCHEMA TYPE ===
    defineField({
      name: 'articleType', title: 'Article Type (Schema.org)',
      type: 'string',
      options: {
        list: [
          { title: 'Article', value: 'Article' },
          { title: 'Travel Guide', value: 'TravelGuide' },
          { title: 'FAQ Article', value: 'FAQArticle' },
          { title: 'How-to Guide', value: 'HowTo' },
        ]
      },
      initialValue: 'Article'
    }),
  ],

  preview: {
    select: { title: 'title', author: 'author.name', media: 'mainImage' },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author ? `by ${author}` : 'No author' }
    }
  }
})
```

### File: `src/sanity/schemas/index.ts`
```typescript
import post from './post'
import author from './author'
import category from './category'
import customTable from './blocks/customTable'
import ctaButton from './blocks/ctaButton'
import calloutBox from './blocks/calloutBox'
import htmlBlock from './blocks/htmlBlock'

export const schemaTypes = [
  post, author, category,
  customTable, ctaButton, calloutBox, htmlBlock,
]
```

---

## STEP 6: SANITY CONFIG

### File: `sanity.config.ts` (in project root)
```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
  name: 'jade-river-resort',
  title: 'Jade River Resort CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})
```

---

## STEP 7: SANITY STUDIO ROUTE

### File: `src/app/studio/[[...tool]]/page.tsx`
```typescript
'use client'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export const dynamic = 'force-dynamic'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

Now your team can access the blog editor at: `yoursite.com/studio`

---

## STEP 8: GROQ QUERIES

### File: `src/sanity/lib/queries.ts`
```typescript
import { groq } from 'next-sanity'

// Latest N posts for homepage
export const latestPostsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**"))]
  | order(publishedAt desc)
  [0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    readTime,
    featured,
    mainImage { asset, alt },
    author-> { name, role },
    category-> { title, "slug": slug.current },
  }
`

// All posts for blog listing
export const allPostsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**"))]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    readTime,
    featured,
    mainImage { asset, alt },
    author-> { name, role },
    category-> { title, "slug": slug.current },
    seo { metaTitle, metaDescription, focusKeyword }
  }
`

// Single post by slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    readTime,
    featured,
    mainImage { asset, alt },
    body,
    author-> { name, role, image, bio },
    category-> { title, "slug": slug.current },
    seo,
    articleType,
    relatedPosts[]-> {
      title,
      "slug": slug.current,
      excerpt,
      mainImage { asset, alt },
      category-> { title }
    }
  }
`

// All slugs for generateStaticParams
export const allSlugsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**"))]
  { "slug": slug.current }
`
```

---

## STEP 9: BLOG LISTING PAGE

### File: `src/app/blog/page.tsx` (or `/post/page.tsx`)
```typescript
import { client } from '@/sanity/lib/client'
import { allPostsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 60

export const metadata = {
  title: 'Blog | Jade River Resort',
  description: 'Stories, guides and inspiration from Jade River Resort.',
}

export default async function BlogPage() {
  const posts = await client.fetch(allPostsQuery).catch(() => [])

  if (posts.length === 0) {
    return (
      <main>
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <h2>Stories coming soon...</h2>
          <p>Our journal is being curated. Check back soon.</p>
        </div>
      </main>
    )
  }

  return (
    <main>
      {/* Hero */}
      <section>
        <h1>From the Journal</h1>
        <p>Stories and guides from Jade River Resort</p>
      </section>

      {/* Posts Grid */}
      <section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {posts.map((post: any) => (
            <Link key={post._id} href={`/blog/${post.slug}`}>
              <article>
                {post.mainImage?.asset && (
                  <Image
                    src={urlFor(post.mainImage).width(600).height(400).url()}
                    alt={post.mainImage.alt || post.title}
                    width={600}
                    height={400}
                    style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
                  />
                )}
                <div>
                  {post.category?.title && <span>{post.category.title}</span>}
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  {post.readTime && <span>{post.readTime} read</span>}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
```

---

## STEP 10: BLOG DETAIL PAGE

### File: `src/app/blog/[slug]/page.tsx`
```typescript
import { client } from '@/sanity/lib/client'
import { postBySlugQuery, allSlugsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await client.fetch(allSlugsQuery).catch(() => [])
  return slugs
    .filter((item: any) => item?.slug)
    .map((item: any) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await client.fetch(postBySlugQuery, { slug }).catch(() => null)
  if (!post) return {}
  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    robots: post.seo?.noIndex ? 'noindex' : 'index,follow',
  }
}

// PortableText custom renderers
const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p style={{ fontSize: '16px', lineHeight: '1.85', marginBottom: '24px' }}>
        {children}
      </p>
    ),
    h2: ({ children }: any) => (
      <h2 style={{ fontSize: '28px', fontWeight: 400, margin: '40px 0 16px' }}>
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 style={{ fontSize: '20px', fontWeight: 500, margin: '32px 0 12px' }}>
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote style={{ borderLeft: '3px solid #C9A96E', paddingLeft: '20px', margin: '24px 0', fontStyle: 'italic' }}>
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a href={value.href} style={{ textDecoration: 'underline' }}
         target={value.href?.startsWith('http') ? '_blank' : '_self'}>
        {children}
      </a>
    ),
    strong: ({ children }: any) => <strong style={{ fontWeight: 600 }}>{children}</strong>,
  },
  types: {
    image: ({ value }: any) => (
      <div style={{ margin: '32px 0', borderRadius: '12px', overflow: 'hidden' }}>
        <img
          src={urlFor(value).width(800).url()}
          alt={value.alt || ''}
          style={{ width: '100%', height: 'auto' }}
        />
        {value.caption && (
          <p style={{ textAlign: 'center', fontSize: '12px', marginTop: '8px', opacity: 0.5 }}>
            {value.caption}
          </p>
        )}
      </div>
    ),
    customTable: ({ value }: any) => (
      <div style={{ overflowX: 'auto', margin: '24px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {value.headers?.map((h: string, i: number) => (
                <th key={i} style={{ padding: '12px 16px', textAlign: 'left', background: '#1C1C1C', color: '#fff', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {value.rows?.map((row: any, i: number) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                {row.cells?.map((cell: string, j: number) => (
                  <td key={j} style={{ padding: '12px 16px', borderBottom: '1px solid rgba(0,0,0,0.06)', fontSize: '14px' }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
    ctaButton: ({ value }: any) => {
      const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '91XXXXXXXXXX'
      let href = '#'
      let isExternal = false
      if (value.linkType === 'internal') href = value.internalPath || '#'
      else if (value.linkType === 'external') { href = value.externalUrl || '#'; isExternal = true }
      else if (value.linkType === 'whatsapp') {
        href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(value.whatsappMessage || '')}`
        isExternal = true
      }
      const alignStyle = value.align === 'center' ? 'center' : value.align === 'right' ? 'right' : 'left'
      const btnStyle = value.style === 'whatsapp'
        ? { background: '#25D366', color: '#fff' }
        : value.style === 'secondary'
        ? { border: '1px solid rgba(0,0,0,0.2)', color: '#1C1C1C', background: 'transparent' }
        : { background: '#1C1C1C', color: '#fff' }
      return (
        <div style={{ textAlign: alignStyle, margin: '24px 0' }}>
          <a href={href} target={isExternal ? '_blank' : '_self'} rel={isExternal ? 'noopener noreferrer' : ''}
             style={{ display: 'inline-block', padding: '12px 28px', borderRadius: '999px', fontSize: '14px', textDecoration: 'none', ...btnStyle }}>
            {value.text}
          </a>
        </div>
      )
    },
    calloutBox: ({ value }: any) => {
      const styles: Record<string, any> = {
        tip: { bg: '#eff6ff', border: '#3b82f6', icon: '💡', color: '#1d4ed8' },
        warning: { bg: '#fffbeb', border: '#f59e0b', icon: '⚠️', color: '#92400e' },
        info: { bg: '#f8fafc', border: '#64748b', icon: 'ℹ️', color: '#334155' },
        fact: { bg: '#f0fdf4', border: '#22c55e', icon: '✅', color: '#166534' },
        important: { bg: '#fef2f2', border: '#ef4444', icon: '🔴', color: '#991b1b' },
      }
      const s = styles[value.type] || styles.tip
      return (
        <div style={{ background: s.bg, border: `1px solid ${s.border}20`, borderLeft: `3px solid ${s.border}`, borderRadius: '8px', padding: '16px 20px', margin: '24px 0', display: 'flex', gap: '12px' }}>
          <span style={{ fontSize: '18px' }}>{s.icon}</span>
          <div>
            {value.title && <p style={{ fontWeight: 600, color: s.color, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{value.title}</p>}
            <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{value.content}</p>
          </div>
        </div>
      )
    },
    htmlBlock: ({ value }: any) => {
      const clean = (value.html || '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<script[\s\S]*?<\/script>/gi, '').trim()
      return <div dangerouslySetInnerHTML={{ __html: clean }} style={{ margin: '24px 0' }} />
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await client.fetch(postBySlugQuery, { slug }).catch(() => null)

  if (!post) notFound()

  return (
    <main>
      {/* Hero */}
      <section>
        {post.mainImage?.asset && (
          <Image
            src={urlFor(post.mainImage).width(1400).height(700).url()}
            alt={post.mainImage.alt || post.title}
            width={1400} height={700} priority
            style={{ width: '100%', height: 'auto' }}
          />
        )}
        <div>
          {post.category?.title && <span>{post.category.title}</span>}
          <h1>{post.title}</h1>
          <div>
            <span>By {post.author?.name}</span>
            <span>{post.readTime} read</span>
            <span>{new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <article style={{ maxWidth: '720px', margin: '0 auto', padding: '60px 24px' }}>
        <PortableText value={post.body} components={portableTextComponents} />
      </article>

      {/* Related Posts */}
      {post.relatedPosts?.length > 0 && (
        <section>
          <h2>Related Posts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {post.relatedPosts.map((related: any) => (
              <a key={related.slug} href={`/blog/${related.slug}`}>
                <h3>{related.title}</h3>
                <p>{related.excerpt}</p>
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
```

---

## STEP 11: DRAFT PREVIEW

### File: `src/app/api/draft/route.ts`
```typescript
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  if (!slug) return new Response('Missing slug', { status: 400 })
  const draft = await draftMode()
  draft.enable()
  redirect(`/blog/${slug}`)
}
```

### File: `src/app/api/disable-draft/route.ts`
```typescript
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET() {
  const draft = await draftMode()
  draft.disable()
  redirect('/')
}
```

**How to preview a draft:**
1. Write blog in Sanity Studio (keep as Draft)
2. Copy the slug
3. Visit: `yoursite.com/api/draft?slug=your-slug`
4. Blog preview opens with "Draft Mode" indicator
5. When happy → click Publish in Studio

---

## STEP 12: HOMEPAGE LATEST POSTS

In your homepage (`src/app/page.tsx`), fetch and display latest 3 posts:

```typescript
import { client } from '@/sanity/lib/client'
import { latestPostsQuery } from '@/sanity/lib/queries'

export default async function HomePage() {
  const latestPosts = await client.fetch(latestPostsQuery).catch(() => [])

  return (
    <main>
      {/* ...other sections... */}

      {/* Blog Teaser Section */}
      <section>
        <h2>From the Journal</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {latestPosts.map((post: any) => (
            <a key={post._id} href={`/blog/${post.slug}`}>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </a>
          ))}
        </div>
        <a href="/blog">View All Posts →</a>
      </section>
    </main>
  )
}
```

---

## STEP 13: AUTO-UPDATE SETUP (Webhook)

So blog publishes instantly without waiting 60 seconds:

**In Vercel:**
1. Dashboard → Project → Settings → Git → **Deploy Hooks**
2. Create Hook → Name: `Sanity Blog Publish` → Branch: `main`
3. Copy the webhook URL

**In Sanity:**
1. Dashboard → Project → API → **Webhooks → Create**
2. Name: `Vercel Deploy`
3. URL: paste Vercel webhook URL
4. Dataset: `production`
5. Trigger on: Create ✅ Update ✅ Delete ✅
6. Filter: `_type == "post"`
7. Save

**Result:** Publish in Studio → 2 minutes → live on website!

---

## STEP 14: NEXT.CONFIG.TS

Add Sanity CDN to allowed image domains:

```typescript
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
      // ...your other domains
    ],
  },
}

export default nextConfig
```

---

## IMPORTANT NOTES FOR SEO DEVELOPER

### How to write a blog post:
1. Go to `yoursite.com/studio`
2. Click **"Blog Post"** → **"+ Create new"**
3. Fill: Title, Slug (auto-generate), Author, Category, Cover Image
4. Write body content using the rich text editor
5. In body editor, click **"+"** to add:
   - 📊 **Table** — data tables
   - 🔘 **CTA Button** — link buttons
   - 📌 **Callout Box** — tip/warning/info boxes
   - 🖥️ **Custom HTML** — paste HTML with inline styles
6. Fill SEO section: Meta Title, Meta Description, Focus Keyword
7. Click **"Publish"** → site updates in 1-2 minutes

### HTML Block tip:
Use Claude/ChatGPT to generate HTML. Always say:
> "Create HTML with **inline styles only** (no `<style>` tag, no external CSS). Return only the HTML code."

---

## PROMPT TO GIVE YOUR AI ASSISTANT

Copy this entire document and give it to ChatGPT/Claude with this instruction:

> "I need to implement this blog system in my Next.js project for Jade River Resort. Please implement all the files exactly as shown, adapting the styling to match our existing design system. The URL structure should be `/blog/[slug]`. Start with the Sanity schemas and work through each step."

---

*Guide version: August 2026 | Based on XOGUL Kashmir production implementation*
