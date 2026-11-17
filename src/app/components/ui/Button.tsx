import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { cx } from '../../lib/cx'
import { Icon, type IconName } from './Icon'

export type ButtonVariant = 'filled' | 'tonal' | 'outlined' | 'text'
export type ButtonSize = 'sm' | 'md'

const variants: Record<ButtonVariant, string> = {
  filled: 'bg-primary text-on-primary',
  tonal: 'bg-secondary-container text-on-secondary-container',
  outlined: 'border border-outline text-primary',
  text: 'text-primary',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 gap-1.5 px-3.5 text-[13px]',
  md: 'h-11 gap-2 px-5 text-[14px]',
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
    'state-layer inline-flex items-center justify-center rounded-full font-medium transition-colors',
    variants[variant],
    sizes[size],
    className,
  )
}

export function ButtonContent({
  children,
  icon,
  iconFilled,
}: {
  children: ReactNode
  icon?: IconName
  iconFilled?: boolean
}) {
  return (
    <span className="relative z-10 inline-flex items-center gap-2">
      {children}
      {icon ? <Icon name={icon} filled={iconFilled} className="text-[18px]" /> : null}
    </span>
  )
}

export function Button({
  variant = 'filled',
  size = 'md',
  icon,
  iconFilled,
  className,
  children,
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: IconName
  iconFilled?: boolean
}) {
  return (
    <button type={type} className={buttonStyles({ variant, size, className })} {...props}>
      <ButtonContent icon={icon} iconFilled={iconFilled}>
        {children}
      </ButtonContent>
    </button>
  )
}
