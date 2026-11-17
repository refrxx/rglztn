import { cx } from '../../lib/cx'
import { Icon, type IconName } from './Icon'

export type SegmentOption<T extends string> = {
  value: T
  label: string
  icon?: IconName
}

export function SegmentedButton<T extends string>({
  options,
  value,
  onChange,
  showLabels = true,
  className,
}: {
  options: SegmentOption<T>[]
  value: T
  onChange: (value: T) => void
  showLabels?: boolean
  className?: string
}) {
  return (
    <div
      role="group"
      className={cx('inline-flex items-center overflow-hidden rounded-full border border-line', className)}
    >
      {options.map((option, index) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            aria-label={option.label}
            title={option.label}
            onClick={() => onChange(option.value)}
            className={cx(
              'state relative inline-flex h-9 items-center gap-1.5 text-[12.5px] font-medium transition-colors',
              showLabels ? 'px-3.5' : 'w-9 justify-center px-0',
              index > 0 && 'border-l border-line',
              selected ? 'bg-fg/10 text-fg' : 'text-muted hover:text-fg',
            )}
          >
            <span className="relative z-10 inline-flex items-center gap-1.5">
              {option.icon ? <Icon name={option.icon} size={16} /> : null}
              {showLabels ? option.label : <span className="sr-only">{option.label}</span>}
            </span>
          </button>
        )
      })}
    </div>
  )
}
