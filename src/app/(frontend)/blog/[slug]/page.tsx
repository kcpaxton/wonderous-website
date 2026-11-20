import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

type Args = { params: Promise<{ slug: string }> }

async function getPost(slug: string) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug }, _status: { equals: 'published' } },
    limit: 1,
    depth: 1,
  })
  return docs[0]
}

export async function generateMetadata({ params }: Args) {
  const post = await getPost((await params).slug)
  return { title: post?.title, description: post?.excerpt ?? undefined }
}

export default async function PostPage({ params }: Args) {
  const post = await getPost((await params).slug)
  if (!post) notFound()

  const hero = typeof post.heroImage === 'object' ? post.heroImage : null

  return (
    <div className="blog-page">
      <article className="blog-article">
        <header className="blog-article-header">
          <Link href="/blog" className="blog-back-link">
            <span aria-hidden="true">←</span> Back to all stories
          </Link>
          {post.publishedAt && (
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          )}
          <h1>{post.title}</h1>
          {post.excerpt && <p className="blog-article-excerpt">{post.excerpt}</p>}
        </header>

        {hero?.url && (
          <div className="blog-article-hero">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero.url} alt={hero.alt || post.title} />
          </div>
        )}

        <div className="blog-article-content">
          <RichText data={post.content} />
        </div>

        <footer className="blog-article-footer">
          <span>Keep exploring the storybook</span>
          <Link href="/blog">Read more stories</Link>
        </footer>
      </article>
    </div>
  )
}
