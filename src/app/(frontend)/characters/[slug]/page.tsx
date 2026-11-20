import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import { CharacterGrid } from '@/components/CharacterGrid'

export const dynamic = 'force-dynamic'

export default async function CharacterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: await config })

  const { docs } = await payload.find({
    collection: 'characters',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  const c = docs[0]
  if (!c) notFound()

  const { docs: all } = await payload.find({
    collection: 'characters',
    sort: 'order',
    depth: 1,
    limit: 100,
  })

  const art = typeof c.artwork === 'object' && c.artwork ? c.artwork : typeof c.image === 'object' ? c.image : null

  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl px-6 py-10">
      <Link href="/#characters" className="text-sm uppercase tracking-wide opacity-70 hover:opacity-100">
        ← All characters
      </Link>

      <div className="mt-6 grid items-center gap-10 md:grid-cols-2">
        {art?.url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={art.url} alt={art.alt || c.name} className="w-full object-contain" />
        )}
        <div>
          {c.title && <p className="uppercase tracking-widest text-yellow-400">{c.title}</p>}
          <h1 className="text-5xl font-extrabold uppercase italic md:text-7xl">{c.name}</h1>
          <p className="mt-6 whitespace-pre-line text-lg opacity-90">{c.description}</p>
        </div>
      </div>

      {c.powerUps && c.powerUps.length > 0 && (
        <section className="mx-auto mt-24 w-full max-w-3xl">
          <h2 className="mb-10 text-center text-3xl font-bold md:text-5xl">Power-ups</h2>
          <div className="power-ups-grid">
            {c.powerUps.map((powerUp, index) => {
              const icon = typeof powerUp.icon === 'object' ? powerUp.icon : null
              return (
                <div key={index} className="power-up-item">
                  {icon?.url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={icon.url} alt={powerUp.title} className="power-up-icon" />
                  )}
                  <div>
                    <h3 className="power-up-title">{powerUp.title}</h3>
                    <p className="power-up-description">{powerUp.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      <div className="mt-36">
        <h2 className="mb-10 text-center text-3xl font-bold md:text-5xl">Meet the Characters</h2>
        <CharacterGrid characters={all} currentId={c.id} />
      </div>
    </div>
  )
}
