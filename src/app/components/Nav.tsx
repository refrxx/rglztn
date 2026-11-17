import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'

import { site } from '../../data/site'
import { useTheme } from '../lib/theme'
import { cx } from '../lib/cx'
import { ThemeToggle } from './ThemeToggle'

const links = [
  { to: '/work', label: 'Portofolio' },
  { to: '/journal', label: 'Artikel' },
  { to: '/about', label: 'Tentang' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-bg/60 backdrop-blur-xl">
        <div className="mx-auto flex h-[70px] max-w-[1320px] items-center justify-between px-5 sm:px-8">
          <Link to="/" className="group flex items-center gap-3" aria-label="Beranda">
            <span className="grid size-9 place-items-center rounded-xl bg-accent font-mono text-[12px] tracking-[0.14em] text-white transition-transform group-hover:-rotate-6">
              RG
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-[14.5px] text-fg">{site.name}</span>
              <span className="label mt-1 block text-[12px] text-faint">Desain web · Marketplace</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cx(
                    'link-draw text-[15px] tracking-[-0.01em] transition-colors',
                    isActive ? 'text-accent' : 'text-muted hover:text-fg',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <ThemeToggle theme={theme} onToggle={toggle} />
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="group btn-pill px-4! py-2! text-[14px]"
            >
              WhatsApp
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle theme={theme} onToggle={toggle} />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid size-9 place-items-center rounded-full border border-line-strong text-fg"
              aria-label={open ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={open}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 top-[70px] z-40 bg-bg/97 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-full flex-col justify-between overflow-y-auto px-5 pb-10 pt-6">
              <nav className="flex flex-col">
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      cx(
                        'flex items-baseline justify-between border-b border-line py-5 font-display text-[36px]',
                        isActive ? 'text-accent' : 'text-fg',
                      )
                    }
                  >
                    {link.label}
                    <span className="num text-[12px] text-faint">0{links.indexOf(link) + 1}</span>
                  </NavLink>
                ))}
              </nav>
              <div className="mt-10 space-y-5">
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-full bg-accent px-6 py-3.5 text-[15px] font-medium text-white"
                >
                  WhatsApp — {site.whatsappDisplay}
                  <ArrowUpRight className="size-4" />
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
                      className="label text-[12px] text-faint transition-colors hover:text-accent"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
