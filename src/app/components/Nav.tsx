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
        gsap
          .timeline()
          .fromTo(el, { autoAlpha: 0, y: -8 }, { autoAlpha: 1, y: 0, duration: 0.25, ease: 'power2.out' })
          .fromTo(
            items,
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.04, ease: 'power3.out' },
            0.05,
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
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-[calc(env(safe-area-inset-top,0px)+12px)]">
        <div className="glass pointer-events-auto flex items-center gap-1 rounded-full p-1.5">
          <Link
            to="/"
            aria-label="Beranda"
            className="grid size-9 place-items-center rounded-full bg-ink font-display text-[12px] tracking-[0.02em] text-on-ink"
          >
            RG
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cx(
                    'state rounded-full px-3.5 py-2 text-[13px] transition-colors',
                    isActive ? 'bg-fg/10 text-fg' : 'text-muted hover:text-fg',
                  )
                }
              >
                <span className="relative z-10">{link.label}</span>
              </NavLink>
            ))}
          </nav>

          <ThemeToggle mode={mode} onChange={setMode} compact className="ml-1" />

          <a
            href={site.whatsapp}
            target="_blank"
            rel="noreferrer"
            className={cx(buttonStyles({ size: 'sm' }), 'ml-1 hidden md:inline-flex')}
          >
            <ButtonContent icon="arrow_outward">WhatsApp</ButtonContent>
          </a>

          <IconButton
            icon={open ? 'close' : 'menu'}
            label={open ? 'Tutup menu' : 'Buka menu'}
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            className="md:hidden"
          />
        </div>
      </header>

      <div
        ref={drawerRef}
        aria-hidden={!open}
        inert={!open}
        className="glass pointer-events-none invisible fixed inset-x-4 top-[calc(env(safe-area-inset-top,0px)+72px)] z-40 max-h-[calc(100dvh-100px)] overflow-y-auto rounded-[24px] p-4 opacity-0 md:hidden"
      >
        <nav className="flex flex-col gap-0.5">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              data-drawer-item
              className={({ isActive }) =>
                cx(
                  'state flex items-center justify-between rounded-[16px] px-4 py-3 text-[15px] font-medium transition-colors',
                  isActive ? 'bg-fg/10 text-fg' : 'text-muted',
                )
              }
            >
              <span className="relative z-10">{link.label}</span>
              <Icon name="arrow_outward" size={16} className="relative z-10 text-muted" />
            </NavLink>
          ))}
        </nav>

        <div data-drawer-item className="mt-5 space-y-4 border-t border-line pt-5">
          <a href={site.whatsapp} target="_blank" rel="noreferrer" className={cx(buttonStyles(), 'w-full')}>
            <ButtonContent icon="arrow_outward">WhatsApp {site.whatsappDisplay}</ButtonContent>
          </a>
          <a href={`mailto:${site.email}`} className="block text-[13px] text-muted">
            {site.email}
          </a>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {site.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-[12.5px] text-muted transition-colors hover:text-fg"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
