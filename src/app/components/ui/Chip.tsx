import type { ReactNode } from 'react'

import { cx } from '../../lib/cx'

export type ChipVariant = 'assist' | 'selected' | 'primary'

const variants: Record<ChipVariant, string> = {
  assist: 'border border-outline-variant bg-surface-container-high text-on-surface-variant',
  selected: 'bg-secondary-container text-on-secondary-container',
  primary: 'bg-primary-container text-on-primary-container',
}

export function Chip({
  children,
  variant = 'assist',
  className,
}: {
  children: ReactNode
  variant?: ChipVariant
  className?: string
}) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
