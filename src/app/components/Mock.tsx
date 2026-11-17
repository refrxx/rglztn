import type { PieceKind } from '../../data/work'
import { cx } from '../lib/cx'

const frame: Record<PieceKind, string> = {
  website: 'w-[88%] max-w-[640px] aspect-16/10',
  catalog: 'w-[88%] max-w-[640px] aspect-16/10',
  social: 'w-[42%] max-w-[250px] aspect-4/5',
  poster: 'w-[46%] max-w-[270px] aspect-4/5',
}

const domain = (brand: string) => `${brand.toLowerCase().replace(/[^a-z0-9]+/g, '')}.com`

/**
 * Placeholder flat untuk setiap karya: satu "plate" berbingkai di atas
 * panggung tonal Material You. Jika `image` diisi di data, gambar asli yang
 * dipakai.
 */
export function Mock({
  brand,
  kind,
  image,
  className,
  caption,
}: {
  brand: string
  kind: PieceKind
  image?: string
  className?: string
  caption?: string
}) {
  return (
    <div className={cx('relative w-full overflow-hidden bg-surface-container', className)}>
      <div aria-hidden className="absolute inset-0 grid grid-cols-4">
        <span className="border-r border-outline-variant/40" />
        <span className="border-r border-outline-variant/40" />
        <span className="border-r border-outline-variant/40" />
      </div>

      <div className="relative flex size-full items-center justify-center p-3 sm:p-5">
        <div
          className={cx(
            '@container relative overflow-hidden rounded-[16px] border border-outline-variant bg-surface-container-highest',
            frame[kind],
          )}
        >
          {image ? (
            <img src={image} alt={`${brand} — ${caption ?? kind}`} className="absolute inset-0 size-full object-cover" loading="lazy" />
          ) : (
            <>
              {kind === 'website' && <Browser brand={brand} />}
              {kind === 'catalog' && <Catalog />}
              {kind === 'social' && <Social brand={brand} />}
              {kind === 'poster' && <Poster brand={brand} />}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function Browser({ brand }: { brand: string }) {
  return (
    <div className="flex size-full flex-col">
      <div className="flex items-center gap-1 border-b border-outline-variant px-2 py-1.5">
        <span className="size-1 rounded-full bg-on-surface-variant/30" />
        <span className="size-1 rounded-full bg-on-surface-variant/20" />
        <span className="size-1 rounded-full bg-on-surface-variant/20" />
        <span className="ml-1.5 truncate font-mono text-[10px] tracking-[0.06em] text-on-surface-variant">{domain(brand)}</span>
      </div>

      <div className="flex flex-1 flex-col p-3">
        <div className="flex items-center justify-between">
          <span className="h-[3px] w-7 rounded-full bg-primary" />
          <span className="flex gap-1.5">
            <span className="h-[2px] w-3 rounded-full bg-on-surface-variant/30" />
            <span className="h-[2px] w-3 rounded-full bg-on-surface-variant/30" />
            <span className="h-[2px] w-3 rounded-full bg-on-surface-variant/30" />
          </span>
        </div>

        <div className="mt-4">
          <p className="font-display text-[clamp(14px,3.4cqw,28px)] leading-[0.92] text-on-surface">{brand}</p>
          <div className="mt-2 space-y-1">
            <span className="block h-[2px] w-[54%] rounded-full bg-on-surface-variant/30" />
            <span className="block h-[2px] w-[32%] rounded-full bg-on-surface-variant/20" />
          </div>
          <span className="mt-3 block h-[8px] w-16 rounded-full bg-primary" />
        </div>

        <div className="mt-auto grid h-[30%] grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-[6px] border border-outline-variant bg-on-surface-variant/5" />
          ))}
        </div>
      </div>
    </div>
  )
}

function Catalog() {
  return (
    <div className="flex size-full flex-col gap-2 p-2.5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-on-surface-variant">Katalog</span>
        <span className="flex gap-1">
          <span className="h-[4px] w-5 rounded-full bg-primary" />
          <span className="h-[4px] w-3 rounded-full bg-on-surface-variant/20" />
          <span className="h-[4px] w-3 rounded-full bg-on-surface-variant/20" />
        </span>
      </div>

      <div className="grid flex-1 grid-cols-3 grid-rows-2 gap-1.5">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex min-h-0 flex-col gap-1 rounded-[6px] border border-outline-variant bg-on-surface-variant/5 p-1">
            <div className="min-h-0 flex-1 rounded-[3px] bg-on-surface-variant/10" />
            <span className="h-[2px] w-full rounded-full bg-on-surface-variant/25" />
            <span className={i % 3 === 0 ? 'h-[2px] w-1/2 rounded-full bg-primary' : 'h-[2px] w-1/2 rounded-full bg-on-surface-variant/15'} />
          </div>
        ))}
      </div>
    </div>
  )
}

function Social({ brand }: { brand: string }) {
  return (
    <div className="flex size-full flex-col justify-between p-3">
      <div className="flex items-center justify-between">
        <span className="truncate font-mono text-[10px] uppercase tracking-[0.16em] text-on-surface-variant">{brand}</span>
        <span className="size-1.5 shrink-0 rounded-full bg-primary" />
      </div>

      <p className="font-display text-[clamp(14px,7.2cqw,26px)] leading-[0.92] text-on-surface">{brand}</p>

      <div>
        <span className="block h-px w-full bg-outline-variant" />
        <div className="mt-1.5 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-on-surface-variant">Feed</span>
          <span className="font-mono text-[10px] text-primary">01</span>
        </div>
      </div>
    </div>
  )
}

function Poster({ brand }: { brand: string }) {
  return (
    <div className="flex size-full flex-col justify-between p-3">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-on-surface-variant">Promosi</span>
        <span className="size-1.5 rounded-full bg-primary" />
      </div>

      <p className="font-display text-[clamp(14px,6.8cqw,24px)] leading-[0.9] text-on-surface">{brand}</p>

      <div className="flex items-end justify-between">
        <div className="w-1/2 space-y-1">
          <span className="block h-[2px] w-full rounded-full bg-on-surface-variant/30" />
          <span className="block h-[2px] w-2/3 rounded-full bg-on-surface-variant/20" />
        </div>
        <span className="font-mono text-[10px] text-primary">/01</span>
      </div>
    </div>
  )
}
