import config from '@payload-config'
import { getPayload } from 'payload'

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
    depth: 1,
  })

  return (
    <div className="blog-page">
      <header className="blog-hero">
        <span className="blog-eyebrow">News from the storybook</span>
        <h1>Behind the magic</h1>
        <p>
          Development updates, character stories, and a closer look at the world beyond the
          page.
        </p>
      </header>

      <main className="blog-listing">
        {docs.length === 0 ? (
          <div className="blog-empty">
            <span aria-hidden="true">✦</span>
            <h2>The next chapter is still being written</h2>
            <p>Check back soon for news from the Wonderous Storybook.</p>
          </div>
        ) : (
          <div className="post-grid">
            {docs.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
