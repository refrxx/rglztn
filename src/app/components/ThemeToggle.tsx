import { Moon, Sun } from 'lucide-react'

import type { Theme } from '../lib/theme'
import { cx } from '../lib/cx'

export function ThemeToggle({
  theme,
  onToggle,
  className,
}: {
  theme: Theme
  onToggle: () => void
  className?: string
}) {
  const label = theme === 'dark' ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      title={label}
      className={cx(
        'grid size-9 place-items-center rounded-full border border-line-strong text-fg transition-colors hover:border-accent hover:text-accent',
        className,
      )}
    >
      {theme === 'dark' ? <Sun className="size-4" aria-hidden /> : <Moon className="size-4" aria-hidden />}
    </button>
  )
}
