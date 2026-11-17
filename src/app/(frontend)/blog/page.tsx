import config from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { PostCard } from '@/components/PostCard'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Blog' }

export default async function BlogPage() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 50,
    depth: 0,
  })

  return (
    <div>
      <h1>Blog</h1>
      {docs.length === 0 ? <p>No posts yet.</p> : docs.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  )
}
