import { cx } from '../../lib/cx'

export type IconName =
  | 'arrow_back'
  | 'arrow_outward'
  | 'brightness_auto'
  | 'check'
  | 'close'
  | 'dark_mode'
  | 'light_mode'
  | 'menu'

export function Icon({
  name,
  className,
  size,
  filled = false,
}: {
  name: IconName
  className?: string
  size?: number
  filled?: boolean
}) {
  return (
    <span
      aria-hidden
      className={cx('material-symbols-rounded', className)}
      style={{
        ...(size ? { fontSize: size } : null),
        ...(filled ? { fontVariationSettings: "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24" } : null),
      }}
    >
      {name}
    </span>
  )
}
