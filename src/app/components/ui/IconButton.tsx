import type { ButtonHTMLAttributes } from 'react'

import { cx } from '../../lib/cx'
import { Icon, type IconName } from './Icon'

export type IconButtonVariant = 'standard' | 'filled' | 'outlined'

const variants: Record<IconButtonVariant, string> = {
  standard: 'text-muted hover:text-fg',
  filled: 'bg-ink text-on-ink',
  outlined: 'border border-line text-muted',
}

export function IconButton({
  icon,
  label,
  variant = 'standard',
  className,
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: IconName
  label: string
  variant?: IconButtonVariant
}) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cx(
        'state grid size-9 place-items-center rounded-full transition-colors',
        variants[variant],
        className,
      )}
      {...props}
    >
      <Icon name={icon} size={18} className="relative z-10" />
    </button>
  )
}
