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

/** Ikon garis 1.6px. Semua memakai kotak 24 dan currentColor. */
const paths: Record<IconName, string> = {
  arrow_back: 'M19 12H5m0 0 6-6m-6 6 6 6',
  arrow_outward: 'M7 17 17 7m0 0H8m9 0v9',
  brightness_auto: 'M12 3v2m0 14v2M5.6 5.6 7 7m10 10 1.4 1.4M3 12h2m14 0h2M5.6 18.4 7 17m10-10 1.4-1.4',
  check: 'm5 13 4 4L19 7',
  close: 'M6 6l12 12M18 6 6 18',
  dark_mode: 'M20 13.5A8 8 0 0 1 10.5 4a8.5 8.5 0 1 0 9.5 9.5Z',
  light_mode: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-14v2m0 14v2M5.6 5.6 7 7m10 10 1.4 1.4M3 12h2m14 0h2M5.6 18.4 7 17m10-10 1.4-1.4',
  menu: 'M4 7h16M4 12h16M4 17h16',
}

const dots: IconName[] = ['brightness_auto']

export function Icon({
  name,
  className,
  size,
}: {
  name: IconName
  className?: string
  size?: number
}) {
  const dimension = size ?? 20

  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={dimension}
      height={dimension}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx('shrink-0', className)}
    >
      <path d={paths[name]} />
      {dots.includes(name) ? <circle cx="12" cy="12" r="3" /> : null}
    </svg>
  )
}
