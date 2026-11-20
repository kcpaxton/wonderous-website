import Link from 'next/link'

import type { Post } from '@/payload-types'

export function PostCard({ post }: { post: Post }) {
  const hero = typeof post.heroImage === 'object' ? post.heroImage : null
  const publishedDate = post.publishedAt ? new Date(post.publishedAt) : null

  return (
    <article className="post-card">
      <Link href={`/blog/${post.slug}`} className="post-card-link" aria-label={`Read ${post.title}`}>
        <div className="post-card-media">
          {hero?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={hero.url} alt={hero.alt || post.title} />
          ) : (
            <div className="post-card-placeholder" aria-hidden="true">
              <span>✦</span>
            </div>
          )}
        </div>
        <div className="post-card-content">
          {publishedDate && (
            <time dateTime={post.publishedAt!}>
              {publishedDate.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          )}
          <h2>{post.title}</h2>
          {post.excerpt && <p>{post.excerpt}</p>}
          <span className="post-card-cta">
            Read the story <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  )
}
