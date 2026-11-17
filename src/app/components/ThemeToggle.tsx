import type { ThemeMode } from '../lib/theme'
import { SegmentedButton, type SegmentOption } from './ui/SegmentedButton'

const options: SegmentOption<ThemeMode>[] = [
  { value: 'light', label: 'Mode terang', icon: 'light_mode' },
  { value: 'dark', label: 'Mode gelap', icon: 'dark_mode' },
  { value: 'system', label: 'Ikuti sistem', icon: 'brightness_auto' },
]

export function ThemeToggle({
  mode,
  onChange,
  compact = false,
  className,
}: {
  mode: ThemeMode
  onChange: (mode: ThemeMode) => void
  compact?: boolean
  className?: string
}) {
  return (
    <SegmentedButton
      options={options}
      value={mode}
      onChange={onChange}
      showLabels={!compact}
      className={className}
    />
  )
}
