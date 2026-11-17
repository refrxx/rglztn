import type { ButtonHTMLAttributes } from 'react'

import { cx } from '../../lib/cx'
import { Icon, type IconName } from './Icon'

export type IconButtonVariant = 'standard' | 'filled' | 'tonal' | 'outlined'

const variants: Record<IconButtonVariant, string> = {
  standard: 'text-on-surface-variant hover:text-on-surface',
  filled: 'bg-primary text-on-primary',
  tonal: 'bg-secondary-container text-on-secondary-container',
  outlined: 'border border-outline text-on-surface-variant',
}

export function IconButton({
  icon,
  label,
  variant = 'standard',
  filled,
  className,
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: IconName
  label: string
  variant?: IconButtonVariant
  filled?: boolean
}) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cx(
        'state-layer grid size-10 place-items-center rounded-full transition-colors',
        variants[variant],
        className,
      )}
      {...props}
    >
      <Icon name={icon} filled={filled} className="relative z-10 text-[20px]" />
    </button>
  )
}
