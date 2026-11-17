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
 * Placeholder netral untuk setiap karya: satu "plate" berbingkai di atas
 * panggung abu. Jika `image` diisi di data, gambar asli yang dipakai.
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
    <div className={cx('relative w-full overflow-hidden bg-surface', className)}>
      <div aria-hidden className="absolute inset-0 grid grid-cols-4">
        <span className="border-r border-line/60" />
        <span className="border-r border-line/60" />
        <span className="border-r border-line/60" />
      </div>

      <div className="relative flex size-full items-center justify-center p-3 sm:p-5">
        <div
          className={cx(
            '@container relative overflow-hidden rounded-[16px] border border-line bg-raised',
            frame[kind],
          )}
        >
          {image ? (
            <img
              src={image}
              alt={`${brand} — ${caption ?? kind}`}
              className="absolute inset-0 size-full object-cover"
              loading="lazy"
            />
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
      <div className="flex items-center gap-1 border-b border-line px-2 py-1.5">
        <span className="size-1 rounded-full bg-muted/40" />
        <span className="size-1 rounded-full bg-muted/25" />
        <span className="size-1 rounded-full bg-muted/25" />
        <span className="ml-1.5 truncate font-mono text-[10px] tracking-[0.06em] text-muted">{domain(brand)}</span>
      </div>

      <div className="flex flex-1 flex-col p-3">
        <div className="flex items-center justify-between">
          <span className="h-[3px] w-7 rounded-full bg-accent" />
          <span className="flex gap-1.5">
            <span className="h-[2px] w-3 rounded-full bg-muted/30" />
            <span className="h-[2px] w-3 rounded-full bg-muted/30" />
            <span className="h-[2px] w-3 rounded-full bg-muted/30" />
          </span>
        </div>

        <div className="mt-4">
          <p className="font-display text-[clamp(14px,3.4cqw,28px)] leading-[0.92]">{brand}</p>
          <div className="mt-2 space-y-1">
            <span className="block h-[2px] w-[54%] rounded-full bg-muted/30" />
            <span className="block h-[2px] w-[32%] rounded-full bg-muted/20" />
          </div>
          <span className="mt-3 block h-[8px] w-16 rounded-full bg-ink" />
        </div>

        <div className="mt-auto grid h-[30%] grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-[6px] border border-line bg-muted/5" />
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
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Katalog</span>
        <span className="flex gap-1">
          <span className="h-[4px] w-5 rounded-full bg-accent" />
          <span className="h-[4px] w-3 rounded-full bg-muted/25" />
          <span className="h-[4px] w-3 rounded-full bg-muted/25" />
        </span>
      </div>

      <div className="grid flex-1 grid-cols-3 grid-rows-2 gap-1.5">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex min-h-0 flex-col gap-1 rounded-[6px] border border-line bg-muted/5 p-1">
            <div className="min-h-0 flex-1 rounded-[3px] bg-muted/10" />
            <span className="h-[2px] w-full rounded-full bg-muted/25" />
            <span
              className={cx(
                'h-[2px] w-1/2 rounded-full',
                i % 3 === 0 ? 'bg-accent' : 'bg-muted/20',
              )}
            />
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
        <span className="truncate font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{brand}</span>
        <span className="size-1.5 shrink-0 rounded-full bg-accent" />
      </div>

      <p className="font-display text-[clamp(14px,7.2cqw,26px)] leading-[0.92]">{brand}</p>

      <div>
        <span className="block h-px w-full bg-line" />
        <div className="mt-1.5 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Feed</span>
          <span className="font-mono text-[10px] text-accent">01</span>
        </div>
      </div>
    </div>
  )
}

function Poster({ brand }: { brand: string }) {
  return (
    <div className="flex size-full flex-col justify-between p-3">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Promosi</span>
        <span className="size-1.5 rounded-full bg-accent" />
      </div>

      <p className="font-display text-[clamp(14px,6.8cqw,24px)] leading-[0.9]">{brand}</p>

      <div className="flex items-end justify-between">
        <div className="w-1/2 space-y-1">
          <span className="block h-[2px] w-full rounded-full bg-muted/30" />
          <span className="block h-[2px] w-2/3 rounded-full bg-muted/20" />
        </div>
        <span className="font-mono text-[10px] text-accent">/01</span>
      </div>
    </div>
  )
}
