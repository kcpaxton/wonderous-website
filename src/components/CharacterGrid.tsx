import Link from 'next/link'

import type { Character } from '@/payload-types'

export function CharacterGrid({
  characters,
  currentId,
}: {
  characters: Character[]
  currentId?: Character['id']
}) {
  return (
    <ul className="character-grid">
      {characters.map((c) => {
        const img = typeof c.image === 'object' ? c.image : null
        const isCurrent = c.id === currentId
        return (
          <li key={c.id}>
            <Link
              href={`/characters/${c.slug}`}
              className={`character-card${isCurrent ? ' character-card-current' : ''}`}
              aria-current={isCurrent ? 'page' : undefined}
            >
              {img?.url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={img.url} alt={img.alt || c.name} className="character-card-image" />
              )}
              <div className="character-card-label">
                <h3 className="text-xl uppercase tracking-wide md:text-2xl">{c.name}</h3>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
