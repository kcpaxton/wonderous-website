import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const { docs: characters } = await payload.find({
    collection: 'characters',
    sort: 'order',
    depth: 1,
    limit: 100,
  })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <nav className="flex w-full gap-6 py-4 bg-background p-6">
        <Link href="/" className="hover:opacity-80">
          Home
        </Link>
        <Link href="/blog" className="hover:opacity-80">
          Blog
        </Link>
      </nav>
      <div className="relative flex w-full justify-center overflow-hidden">
        <video
          autoPlay
          className="absolute inset-0 h-full w-full object-cover"
          loop
          muted
          playsInline
          src="/stars.mp4"
        />
        <Image
          alt="The Wonderous Storybook"
          className="relative h-auto max-w-2xl py-16"
          height={768}
          priority
          src="/logo_white.png"
          width={1366}
        />
      </div>
      <div className="flex grow flex-col items-center justify-center">
        
        <h1 className="my-6 text-center text-4xl font-bold md:text-6xl">
          A little goodness goes a long way
        </h1>
        
      </div>
      <section id="characters" className="w-full max-w-6xl px-6 py-16">
        <h2 className="mb-10 text-center text-3xl font-bold md:text-5xl">Meet the characters</h2>
        {characters.length === 0 ? (
          <p className="text-center opacity-70">Characters coming soon.</p>
        ) : (
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {characters.map((c) => {
              const img = typeof c.image === 'object' ? c.image : null
              return (
                <li key={c.id}>
                  <Link
                    href={`/characters/${c.slug}`}
                    className="group relative block aspect-[3/4] overflow-hidden bg-neutral-900 [clip-path:polygon(0_0,100%_0,100%_90%,90%_100%,0_100%)]"
                  >
                    {img?.url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={img.url}
                        alt={img.alt || c.name}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-3 pt-10">
                      <h3 className="text-lg font-extrabold uppercase italic tracking-wide">{c.name}</h3>
                    </div>
                    <div className="absolute inset-0 border-4 border-transparent transition group-hover:border-yellow-400" />
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}
