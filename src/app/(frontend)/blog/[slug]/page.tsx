import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

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
    <article>
      <h1>{post.title}</h1>
      {post.publishedAt && (
        <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString()}</time>
      )}
      {hero?.url && <img src={hero.url} alt={hero.alt} style={{ maxWidth: '100%' }} />}
      <RichText data={post.content} />
    </article>
  )
}
