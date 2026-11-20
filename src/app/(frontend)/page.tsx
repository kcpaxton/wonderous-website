import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { CharacterGrid } from '@/components/CharacterGrid'

const fallingStars = [
  { left: '4%', size: 26, duration: '7s', delay: '-1s' },
  { left: '12%', size: 40, duration: '9s', delay: '-5s' },
  { left: '20%', size: 30, duration: '6s', delay: '-3s' },
  { left: '29%', size: 44, duration: '8s', delay: '-0.5s' },
  { left: '37%', size: 24, duration: '7s', delay: '-5.5s' },
  { left: '45%', size: 36, duration: '9s', delay: '-2.5s' },
  { left: '54%', size: 28, duration: '6s', delay: '-1.5s' },
  { left: '62%', size: 42, duration: '8s', delay: '-4.5s' },
  { left: '71%', size: 32, duration: '7s', delay: '-3.5s' },
  { left: '79%', size: 26, duration: '9s', delay: '-7s' },
  { left: '88%', size: 38, duration: '6s', delay: '-2s' },
  { left: '96%', size: 30, duration: '8s', delay: '-6s' },
]

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const [{ docs: characters }, home] = await Promise.all([
    payload.find({
      collection: 'characters',
      sort: 'order',
      depth: 1,
      limit: 100,
    }),
    payload.findGlobal({
      slug: 'home',
      depth: 1,
    }),
  ])

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="relative isolate flex w-full justify-center overflow-hidden">
        <div
          aria-hidden="true"
          className="falling-stars pointer-events-none absolute inset-0 motion-reduce:hidden"
        >
          {fallingStars.map(({ left, size, duration, delay }) => (
            <span
              key={left}
              className="falling-star"
              style={{ left, width: size, animationDuration: duration, animationDelay: delay }}
            />
          ))}
        </div>
        <Image
          alt="The Wonderous Storybook"
          className="relative z-10 h-auto max-w-4xl py-16"
          height={768}
          priority
          src="/logo_white.png"
          width={1566}
        />
      </div>
      <div className="flex grow flex-col items-center justify-center max-w-4xl my-16">
        
        <h1 className="my-6 text-center text-4xl font-bold md:text-5xl">
          There is a story waiting to be told
        </h1>
        <p className="text-center opacity-70">The Wonderous Storybook is an high-paced top-down bullet hell roguelike. Discover a new world as you get transported into the action of a storybook. Fight through waves of enemies, gain unique powerups from all types of fairytale characters and break through the grips of the evil Shadow King. </p>
        
      </div>
      <section id="characters" className="w-full max-w-6xl px-6 py-16">
        <h2 className="mb-10 text-center text-3xl font-bold md:text-5xl">Meet the characters</h2>
        {characters.length === 0 ? (
          <p className="text-center opacity-70">Characters coming soon.</p>
        ) : (
          <CharacterGrid characters={characters} />
        )}
      </section>
      {home.featureSections && home.featureSections.length > 0 && (
        <div className="feature-sections w-full">
          {home.featureSections.map((section, index) => {
            const media = typeof section.media === 'object' ? section.media : null
            const isVideo = media?.mimeType?.startsWith('video/')

            return (
              <section
                key={section.id ?? index}
                className={`feature-section ${
                  section.mediaPosition === 'right'
                    ? 'feature-section-media-right'
                    : section.mediaPosition === 'center'
                      ? 'feature-section-media-center'
                      : section.mediaPosition === 'center-text-top'
                        ? 'feature-section-media-center-text-top'
                        : ''
                }`}
              >
                <div className="feature-section-content">
                  <h2>{section.title}</h2>
                  <div className="feature-section-text">
                    <RichText data={section.text} />
                  </div>
                </div>
                <div className="feature-section-media">
                  {media?.url &&
                    (isVideo ? (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        aria-label={media.alt}
                      >
                        <source src={media.url} type={media.mimeType || undefined} />
                        Your browser does not support embedded video.
                      </video>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={media.url} alt={media.alt || section.title} />
                    ))}
                </div>
              </section>
            )
          })}
        </div>
      )}
      {home.blogCallout?.enabled && (
        <section id="blog-callout" className="blog-callout w-full">
          <div className="blog-callout-content">
            <h2>{home.blogCallout.title}</h2>
            <div className="blog-callout-text">
              <RichText data={home.blogCallout.description} />
            </div>
            <Link href="/blog" className="blog-callout-cta">
              {home.blogCallout.ctaText}
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
