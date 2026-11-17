import Link from 'next/link'
import React from 'react'

import type { Post } from '@/payload-types'

export function PostCard({ post }: { post: Post }) {
  return (
    <article>
      <h2>
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>
      {post.publishedAt && (
        <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString()}</time>
      )}
      {post.excerpt && <p>{post.excerpt}</p>}
    </article>
  )
}
