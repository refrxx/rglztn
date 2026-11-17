import { Link } from 'react-router'

import { site } from '../../data/site'
import { useLocalTime } from '../lib/useLocalTime'
import { ButtonContent, buttonStyles } from './ui/Button'

const nav = [
  { to: '/work', label: 'Portofolio' },
  { to: '/journal', label: 'Artikel' },
  { to: '/about', label: 'Tentang' },
  { to: '/#layanan', label: 'Layanan' },
]

export function Footer() {
  const time = useLocalTime(site.timezone)

  return (
    <footer className="mx-auto max-w-[1320px] px-5 pb-[calc(env(safe-area-inset-bottom,0px)+32px)] sm:px-8">
      <div className="glass rounded-[28px] px-6 py-10 sm:px-10 sm:py-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 text-[12px] text-muted">
              <span className="size-1.5 rounded-full bg-accent animate-pulse-soft" />
              {site.available}
            </span>
            <h2 className="mt-5 max-w-[20ch] font-display text-[clamp(26px,3.6vw,38px)]">
              Apakah brand Anda perlu ditata?
            </h2>
            <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a href={site.whatsapp} target="_blank" rel="noreferrer" className={buttonStyles()}>
                <ButtonContent icon="arrow_outward">Hubungi via WhatsApp</ButtonContent>
              </a>
              <a href={`mailto:${site.email}`} className="link-draw text-[13.5px] text-muted hover:text-fg">
                {site.email}
              </a>
            </div>
          </div>

          <nav>
            <p className="label text-muted">Navigasi</p>
            <ul className="mt-4 space-y-2.5 text-[14px] text-muted">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="link-draw hover:text-fg">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label text-muted">Kontak</p>
            <ul className="mt-4 space-y-2.5 text-[14px] text-muted">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noreferrer"
                    className="link-draw hover:text-fg"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={site.whatsapp} target="_blank" rel="noreferrer" className="link-draw hover:text-fg">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-5 text-[12px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span className="num uppercase tracking-[0.1em]">
            {site.location} · {time} WIB
          </span>
          <span className="hidden sm:inline">Dirancang dan dibangun sendiri.</span>
        </div>
      </div>
    </footer>
  )
}
