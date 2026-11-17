import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'

import { site } from '../../data/site'
import { cx } from '../lib/cx'
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap'
import { useTheme } from '../lib/theme'
import { ThemeToggle } from './ThemeToggle'
import { ButtonContent, buttonStyles } from './ui/Button'
import { Icon } from './ui/Icon'
import { IconButton } from './ui/IconButton'

const links = [
  { to: '/work', label: 'Portofolio' },
  { to: '/journal', label: 'Artikel' },
  { to: '/about', label: 'Tentang' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const { mode, setMode } = useTheme()
  const { pathname } = useLocation()
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useGSAP(
    () => {
      const el = drawerRef.current
      if (!el) return
      const items = el.querySelectorAll<HTMLElement>('[data-drawer-item]')

      if (prefersReducedMotion()) {
        gsap.set(el, { autoAlpha: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' })
        gsap.set(items, { autoAlpha: open ? 1 : 0, y: 0 })
        return
      }

      if (open) {
        gsap.set(el, { pointerEvents: 'auto' })
        const timeline = gsap.timeline()
        timeline
          .fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: 'power2.out' })
          .fromTo(
            items,
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'power3.out' },
            0.04,
          )
      } else {
        gsap.to(el, {
          autoAlpha: 0,
          duration: 0.18,
          ease: 'power2.in',
          onComplete: () => gsap.set(el, { pointerEvents: 'none' }),
        })
      }
    },
    { dependencies: [open] },
  )

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg">
        <div className="mx-auto flex h-[70px] max-w-[1320px] items-center justify-between px-5 sm:px-8">
          <Link to="/" className="group flex items-center gap-3" aria-label="Beranda">
            <span className="grid size-10 place-items-center rounded-[14px] bg-primary-container font-mono text-[12px] tracking-[0.14em] text-on-primary-container transition-transform group-hover:-rotate-6">
              RG
            </span>
            <span className="hidden leading-tight lg:block">
              <span className="block text-[14.5px] text-on-surface">{site.name}</span>
              <span className="label mt-1 block text-[12px] text-faint">Desain web · Marketplace</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cx(
                    'state-layer rounded-full px-3.5 py-2 text-[15px] tracking-[-0.01em] transition-colors',
                    isActive
                      ? 'bg-secondary-container text-on-secondary-container'
                      : 'text-on-surface-variant hover:text-on-surface',
                  )
                }
              >
                <span className="relative z-10">{link.label}</span>
              </NavLink>
            ))}

            <ThemeToggle mode={mode} onChange={setMode} compact className="ml-2" />

            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className={cx(buttonStyles({ size: 'sm' }), 'ml-2')}
            >
              <ButtonContent icon="arrow_outward">WhatsApp</ButtonContent>
            </a>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle mode={mode} onChange={setMode} compact />
            <IconButton
              icon={open ? 'close' : 'menu'}
              label={open ? 'Tutup menu' : 'Buka menu'}
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
            />
          </div>
        </div>
      </header>

      <div
        ref={drawerRef}
        aria-hidden={!open}
        inert={!open}
        className="pointer-events-none invisible fixed inset-x-0 bottom-0 top-[70px] z-40 overflow-y-auto bg-surface-container-low px-5 pb-10 pt-6 opacity-0 md:hidden"
      >
        <div className="flex min-h-full flex-col justify-between">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                data-drawer-item
                className={({ isActive }) =>
                  cx(
                    'state-layer flex items-center justify-between rounded-full px-4 py-3.5 font-display-tight text-[22px] transition-colors',
                    isActive
                      ? 'bg-secondary-container text-on-secondary-container'
                      : 'text-on-surface',
                  )
                }
              >
                <span className="relative z-10">{link.label}</span>
                <Icon name="arrow_outward" className="relative z-10 text-[20px] text-on-surface-variant" />
              </NavLink>
            ))}
          </nav>

          <div data-drawer-item className="mt-10 space-y-5">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className={cx(buttonStyles(), 'w-full')}
            >
              <ButtonContent icon="arrow_outward">WhatsApp — {site.whatsappDisplay}</ButtonContent>
            </a>

            <a href={`mailto:${site.email}`} className="block text-[14.5px] text-muted">
              {site.email}
            </a>

            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="label text-[12px] text-faint transition-colors hover:text-primary"
                >
                  {social.label}
                </a>
              ))}
            </div>

            <div className="border-t border-line pt-5">
              <p className="label text-faint">Tema</p>
              <ThemeToggle mode={mode} onChange={setMode} className="mt-3" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
