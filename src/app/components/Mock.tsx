import type { PieceKind } from '../../data/work'
import { cx } from '../lib/cx'

const corners = [
  'left-2 top-2 border-l border-t',
  'right-2 top-2 border-r border-t',
  'left-2 bottom-2 border-l border-b',
  'right-2 bottom-2 border-r border-b',
]

const frame: Record<PieceKind, string> = {
  website: 'w-[88%] max-w-[640px] aspect-16/10',
  catalog: 'w-[88%] max-w-[640px] aspect-16/10',
  social: 'w-[42%] max-w-[250px] aspect-4/5',
  poster: 'w-[46%] max-w-[270px] aspect-4/5',
}

const domain = (brand: string) => `${brand.toLowerCase().replace(/[^a-z0-9]+/g, '')}.com`

/**
 * Placeholder bergaya untuk setiap karya: satu "plate" berbingkai di atas
 * panggung. Warna mengikuti tema; jika `image` diisi di data, gambar asli
 * yang dipakai.
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
    <div className={cx('bg-stage relative w-full overflow-hidden', className)}>
      <div aria-hidden className="absolute inset-0">
        <div className="stage-gradient absolute inset-0" />
        <div className="stage-accent-glow absolute inset-0" />
        <div className="absolute inset-0 grid grid-cols-4">
          <span className="border-r border-fg/[0.06]" />
          <span className="border-r border-fg/[0.06]" />
          <span className="border-r border-fg/[0.06]" />
        </div>
      </div>

      <div className="relative flex size-full items-center justify-center p-3 sm:p-5">
        <div
          className={cx(
            '@container bg-stage-plate stage-shadow relative overflow-hidden rounded-[12px] border border-fg/15',
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

      <span className="grain absolute inset-0" />
      {corners.map((c) => (
        <span key={c} className={cx('pointer-events-none absolute z-10 size-2.5 border-fg/25', c)} />
      ))}
    </div>
  )
}

function Browser({ brand }: { brand: string }) {
  return (
    <div className="flex size-full flex-col">
      <div className="flex items-center gap-1 border-b border-fg/[0.1] px-2 py-1.5">
        <span className="size-1 rounded-full bg-fg/25" />
        <span className="size-1 rounded-full bg-fg/15" />
        <span className="size-1 rounded-full bg-fg/15" />
        <span className="ml-1.5 truncate font-mono text-[10px] tracking-[0.06em] text-faint">{domain(brand)}</span>
      </div>

      <div className="flex flex-1 flex-col p-3">
        <div className="flex items-center justify-between">
          <span className="h-[3px] w-7 bg-accent/80" />
          <span className="flex gap-1.5">
            <span className="h-[2px] w-3 bg-fg/20" />
            <span className="h-[2px] w-3 bg-fg/20" />
            <span className="h-[2px] w-3 bg-fg/20" />
          </span>
        </div>

        <div className="mt-4">
          <p className="font-display text-[clamp(14px,3.4cqw,28px)] leading-[0.92] text-fg/90">{brand}</p>
          <div className="mt-2 space-y-1">
            <span className="block h-[2px] w-[54%] bg-fg/20" />
            <span className="block h-[2px] w-[32%] bg-fg/12" />
          </div>
          <span className="mt-3 block h-[8px] w-16 bg-accent/80" />
        </div>

        <div className="mt-auto grid h-[30%] grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="border border-fg/[0.09] bg-gradient-to-br from-fg/[0.09] to-transparent" />
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
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Katalog</span>
        <span className="flex gap-1">
          <span className="h-[4px] w-5 rounded-full bg-accent/70" />
          <span className="h-[4px] w-3 rounded-full bg-fg/12" />
          <span className="h-[4px] w-3 rounded-full bg-fg/12" />
        </span>
      </div>

      <div className="grid flex-1 grid-cols-3 grid-rows-2 gap-1.5">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex min-h-0 flex-col gap-1 border border-fg/[0.08] bg-fg/[0.03] p-1">
            <div className="min-h-0 flex-1 bg-gradient-to-br from-fg/[0.09] to-fg/[0.015]" />
            <span className="h-[2px] w-full bg-fg/20" />
            <span className={i % 3 === 0 ? 'h-[2px] w-1/2 bg-accent/70' : 'h-[2px] w-1/2 bg-fg/12'} />
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
        <span className="truncate font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{brand}</span>
        <span className="size-1 shrink-0 rounded-full bg-accent" />
      </div>

      <p className="font-display text-[clamp(14px,7.2cqw,26px)] leading-[0.92] text-fg/90">{brand}</p>

      <div>
        <span className="block h-px w-full bg-fg/20" />
        <div className="mt-1.5 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Feed</span>
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
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Promosi</span>
        <span className="size-1 rounded-full bg-accent" />
      </div>

      <p className="font-display text-[clamp(14px,6.8cqw,24px)] leading-[0.9] text-fg/90">{brand}</p>

      <div className="flex items-end justify-between">
        <div className="w-1/2 space-y-1">
          <span className="block h-[2px] w-full bg-fg/20" />
          <span className="block h-[2px] w-2/3 bg-fg/12" />
        </div>
        <span className="font-mono text-[10px] text-accent">/01</span>
      </div>
    </div>
  )
}
