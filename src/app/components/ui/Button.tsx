import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { cx } from '../../lib/cx'
import { Icon, type IconName } from './Icon'

export type ButtonVariant = 'filled' | 'outlined' | 'text'
export type ButtonSize = 'sm' | 'md'

const variants: Record<ButtonVariant, string> = {
  filled: 'bg-ink text-on-ink hover:bg-ink/90',
  outlined: 'border border-line-strong text-fg hover:bg-raised',
  text: 'text-fg hover:bg-raised',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 gap-1.5 px-4 text-[13px]',
  md: 'h-10 gap-2 px-5 text-[14px]',
}

export function buttonStyles({
  variant = 'filled',
  size = 'md',
  className,
}: {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
} = {}) {
  return cx(
    'state inline-flex items-center justify-center rounded-full font-medium transition-colors',
    variants[variant],
    sizes[size],
    className,
  )
}

export function ButtonContent({
  children,
  icon,
}: {
  children: ReactNode
  icon?: IconName
}) {
  return (
    <span className="relative z-10 inline-flex items-center gap-2">
      {children}
      {icon ? <Icon name={icon} size={16} /> : null}
    </span>
  )
}

export function Button({
  variant = 'filled',
  size = 'md',
  icon,
  className,
  children,
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: IconName
}) {
  return (
    <button type={type} className={buttonStyles({ variant, size, className })} {...props}>
      <ButtonContent icon={icon}>{children}</ButtonContent>
    </button>
  )
}
