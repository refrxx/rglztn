import { Link } from 'react-router'

import { site } from '../../data/site'
import { projects } from '../../data/work'
import { WorkCard } from '../components/WorkCard'
import { Lines, Reveal } from '../components/anim'
import { ButtonContent, buttonStyles } from '../components/ui/Button'
import { usePageMeta } from '../lib/usePageMeta'

export function Work() {
  usePageMeta(
    'Portofolio — Refriansyah Galiztan',
    'Portofolio per brand: website, marketplace, visual produk, dan materi promosi.',
  )

  return (
    <div className="pt-[70px]">
      <section className="mx-auto max-w-[1320px] px-5 pt-14 sm:px-8 lg:pt-20">
        <div className="flex items-center justify-between">
          <span className="label text-faint">Portofolio</span>
          <span className="num text-[12px] uppercase tracking-[0.14em] text-faint">
            {String(projects.length).padStart(2, '0')} brand
          </span>
        </div>

        <Lines
          as="h1"
          lines={['Empat brand,', <>satu <span className="text-muted">standar.</span></>]}
          className="mt-8 font-display text-[clamp(40px,7.6vw,104px)]"
        />

        <Reveal delay={0.2}>
          <div className="mt-10 grid gap-8 border-t border-line pt-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <p className="max-w-[46ch] text-[16px] leading-relaxed text-muted">
              Saya tidak memisahkan pekerjaan desain dan pekerjaan penjualan. Setiap proyek di bawah ini memiliki satu
              sistem visual yang digunakan di semua kanal: website, marketplace, feed, dan materi promosi.
            </p>
            <p className="max-w-[46ch] text-[16px] leading-relaxed text-muted">
              Setiap proyek berisi ringkasan masalah, keputusan desain yang saya ambil, dan hasil yang dapat diukur.
              Klik salah satunya untuk melihat detailnya.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 py-14 sm:px-8 lg:py-20">
        <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
          {projects.map((project, i) => (
            <WorkCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 pb-20 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 rounded-[24px] border border-outline-variant bg-surface-container p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="label text-faint">Kolaborasi</p>
              <p className="mt-3 font-display-tight text-[22px] sm:text-[26px]">
                Apakah brand Anda memerlukan pendekatan yang sama?
              </p>
            </div>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className={buttonStyles({ className: 'shrink-0' })}
            >
              <ButtonContent icon="arrow_outward">Hubungi via WhatsApp</ButtonContent>
            </a>
          </div>
        </Reveal>

        <div className="mt-10">
          <Link to="/journal" className="link-draw text-[15px] text-muted transition-colors hover:text-fg">
            Atau baca artikel tentang desain dan marketplace
          </Link>
        </div>
      </section>
    </div>
  )
}
