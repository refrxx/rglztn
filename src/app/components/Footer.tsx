import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'

import { site } from '../../data/site'
import { useLocalTime } from '../lib/useLocalTime'

export function Footer() {
  const time = useLocalTime(site.timezone)

  return (
    <footer className="relative mt-10 rounded-t-[40px] border-t border-line bg-bg-soft">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:gap-10 lg:py-24">
          <div>
            <span className="label flex items-center gap-2.5 text-faint">
              <span className="size-1.5 rounded-full bg-accent animate-pulse-soft" />
              {site.available}
            </span>
            <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(32px,4.6vw,52px)]">
              Apakah brand Anda perlu <span className="text-accent">ditata?</span>
            </h2>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="group btn-pill text-[15px]"
              >
                Hubungi via WhatsApp
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href={`mailto:${site.email}`}
                className="link-draw text-[15px] text-muted transition-colors hover:text-fg"
              >
                {site.email}
              </a>
            </div>
          </div>

          <nav className="space-y-4">
            <p className="label text-faint">Navigasi</p>
            <ul className="space-y-2.5 text-[15px] text-muted">
              {[
                { to: '/work', label: 'Portofolio' },
                { to: '/journal', label: 'Artikel' },
                { to: '/about', label: 'Tentang' },
                { to: '/#layanan', label: 'Layanan' },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="link-draw transition-colors hover:text-fg">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-4">
            <p className="label text-faint">Kontak</p>
            <ul className="space-y-2.5 text-[15px] text-muted">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noreferrer"
                    className="link-draw transition-colors hover:text-fg"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={site.whatsapp} target="_blank" rel="noreferrer" className="link-draw transition-colors hover:text-fg">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-6 text-[13px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span className="num text-[12px] uppercase tracking-[0.14em]">
            {site.location} · {time} WIB
          </span>
          <span className="hidden sm:inline">Dirancang dan dibangun sendiri.</span>
        </div>
      </div>
    </footer>
  )
}
