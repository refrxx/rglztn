import { useCallback, useLayoutEffect, useState } from 'react'

export type ThemeMode = 'light' | 'dark' | 'system'
export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

function isMode(value: string | null): value is ThemeMode {
  return value === 'light' || value === 'dark' || value === 'system'
}

export function readStoredMode(): ThemeMode | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return isMode(value) ? value : null
  } catch {
    return null
  }
}

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
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
  if (meta) meta.setAttribute('content', theme === 'light' ? '#fff8f6' : '#1e100d')
}

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(() => readStoredMode() ?? 'system')
  const [theme, setTheme] = useState<Theme>(() => currentTheme())

  useLayoutEffect(() => {
    const next = mode === 'system' ? systemTheme() : mode
    setTheme(next)
    applyTheme(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      // Mode privat atau storage penuh: tema tetap berlaku untuk sesi ini.
    }
  }, [mode])

  // Ikuti perubahan preferensi sistem selama mode "system" aktif.
  useLayoutEffect(() => {
    if (mode !== 'system') return
    const media = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => {
      const next = media.matches ? 'light' : 'dark'
      setTheme(next)
      applyTheme(next)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [mode])

  const changeMode = useCallback((next: ThemeMode) => setMode(next), [])

  return { mode, theme, setMode: changeMode }
}
