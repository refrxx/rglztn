import type { ReactNode } from 'react'

import { cx } from '../../lib/cx'

export type ChipVariant = 'default' | 'accent'

const variants: Record<ChipVariant, string> = {
  default: 'border border-line bg-surface text-muted',
  accent: 'border border-line bg-surface text-fg',
}

export function Chip({
  children,
  variant = 'default',
  className,
}: {
  children: ReactNode
  variant?: ChipVariant
  className?: string
}) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium',
        variants[variant],
        className,
      )}
    >
      {variant === 'accent' ? <span aria-hidden className="size-1.5 rounded-full bg-accent" /> : null}
      {children}
    </span>
  )
}
