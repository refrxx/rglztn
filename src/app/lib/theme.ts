import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

/** Pilihan manual pengguna, atau null jika belum pernah memilih. */
function readStoredTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

/** Tema yang sudah dipasang oleh skrip anti-flash di index.html. */
export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.dataset.theme = theme
  root.style.colorScheme = theme

  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', theme === 'light' ? '#f7f5ef' : '#08090a')
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => currentTheme())

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  // Ikuti perubahan preferensi sistem hanya selama pengguna belum memilih manual.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => {
      if (readStoredTheme()) return
      setTheme(media.matches ? 'light' : 'dark')
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    setTheme((previous) => {
      const next: Theme = previous === 'dark' ? 'light' : 'dark'
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Mode privat atau storage penuh: tema tetap berlaku untuk sesi ini.
      }
      return next
    })
  }, [])

  return { theme, toggle }
}
