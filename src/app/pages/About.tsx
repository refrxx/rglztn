import { Link } from 'react-router'

import { site, tools } from '../../data/site'
import { projects } from '../../data/work'
import { Lines, Reveal } from '../components/anim'
import { ButtonContent, buttonStyles } from '../components/ui/Button'
import { Chip } from '../components/ui/Chip'
import { Icon } from '../components/ui/Icon'
import { usePageMeta } from '../lib/usePageMeta'

const approach = [
  {
    index: '01',
    title: 'Memahami dulu, mendesain kemudian',
    body: 'Saya mulai dari cara orang membeli: apa yang dicari, apa yang membuat ragu, dan di mana mereka berhenti. Desain yang baik tetapi salah arah hanya menambah pekerjaan.',
  },
  {
    index: '02',
    title: 'Satu sistem, semua kanal',
    body: 'Warna, tipografi, dan aturan foto ditetapkan sekali, lalu digunakan di website, marketplace, dan feed. Konsistensi inilah yang membuat brand kecil terlihat lebih besar.',
  },
  {
    index: '03',
    title: 'Rapi, lalu dirawat',
    body: 'Saya menyerahkan file dan template yang dapat Anda gunakan sendiri. Anda tidak perlu kembali kepada saya setiap kali ingin mengganti banner promosi.',
  },
]

export function About() {
  usePageMeta(
    'Tentang — Refriansyah Galiztan',
    'Desainer website dan manajer marketplace asal Indonesia. Desain web, visual produk, dan materi promosi.',
  )

  return (
    <div className="pt-[70px]">
      <section className="mx-auto max-w-[1320px] px-5 pt-14 sm:px-8 lg:pt-20">
        <div className="flex items-center justify-between">
          <span className="label text-faint">Tentang</span>
          <span className="num text-[12px] uppercase tracking-[0.14em] text-faint">{site.location}</span>
        </div>

        <Lines
          as="h1"
          lines={['Desain yang memahami', <>cara <span className="text-primary">berjualan.</span></>]}
          className="mt-8 font-display text-[clamp(38px,7vw,96px)]"
        />
      </section>

      <section className="mx-auto mt-12 grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-[320px_1fr] lg:gap-16">
        <Reveal>
          <div className="relative aspect-4/5 overflow-hidden rounded-[28px] bg-primary-container">
            <div aria-hidden className="absolute inset-0 overflow-hidden">
              <span className="absolute -right-10 -top-10 size-40 rounded-full bg-tertiary-container" />
              <span className="absolute -bottom-16 -left-12 size-48 rounded-full bg-secondary-container" />
              <span className="absolute inset-x-5 top-1/2 h-px bg-on-primary-container/15" />
            </div>

            <div className="relative flex h-full flex-col justify-between p-5">
              <span className="label text-[12px] text-on-primary-container/80">Potret</span>
              <div>
                <span className="block font-display text-[clamp(64px,9vw,112px)] leading-none text-on-primary-container">
                  RG
                </span>
                <span className="mt-3 block text-[14px] text-on-primary-container/90">Refriansyah Galiztan</span>
                <span className="label mt-1 block text-[12px] text-on-primary-container/70">
                  Desain web · Marketplace
                </span>
              </div>
            </div>
          </div>

          <dl className="mt-6 space-y-3">
            {[
              { term: 'Domisili', value: site.location },
              { term: 'Fokus', value: 'Website, marketplace, visual produk' },
              { term: 'Kontak', value: site.email },
            ].map((item) => (
              <div key={item.term} className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                <dt className="label text-faint">{item.term}</dt>
                <dd className="text-right text-[13.5px] text-fg/80">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div>
          <Reveal delay={0.1}>
            <p className="max-w-[66ch] font-display text-[clamp(21px,2.6vw,30px)] leading-[1.3] tracking-[-0.03em]">
              Saya desainer website dan manajer marketplace. Dua pekerjaan yang terlihat berbeda, tetapi masalahnya
              sama: membuat orang percaya cukup lama untuk memutuskan.
            </p>
          </Reveal>

          <div className="mt-7 space-y-5">
            {[
              site.intro,
              'Bagi saya, desain yang baik harus lulus dua ujian: terlihat rapi dari jauh dan mudah digunakan dari dekat. Karena itu, saya selalu mulai dari struktur: urutan informasi, hierarki, dan cara orang berpindah dari satu halaman ke halaman lain. Setelah itu, baru tampilannya dipoles.',
              'Sebagian besar klien saya adalah brand kecil dan menengah yang berjualan di marketplace sekaligus memiliki website sendiri. Masalah yang paling sering muncul bukan kekurangan desain, melainkan dua kanal yang dibangun terpisah sehingga terlihat seperti dua brand berbeda.',
            ].map((paragraph, i) => (
              <Reveal key={i} delay={0.15 + i * 0.05}>
                <p className="max-w-[64ch] text-[16.5px] leading-[1.8] text-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25}>
            <div className="mt-10 border-t border-line pt-6">
              <p className="label text-faint">Peralatan sehari-hari</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <li key={tool}>
                    <Chip>{tool}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-[1320px] px-5 sm:px-8">
        <Reveal>
          <div className="flex items-baseline justify-between border-t border-line pt-5">
            <h2 className="font-display text-[clamp(24px,3.2vw,36px)]">Cara kerja</h2>
            <span className="num text-[12px] uppercase tracking-[0.14em] text-faint">03 langkah</span>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {approach.map((step, i) => (
            <Reveal key={step.index} delay={i * 0.06}>
              <div className="h-full rounded-[24px] border border-outline-variant bg-surface-container p-6">
                <span className="num text-[12px] tracking-[0.14em] text-primary">{step.index}</span>
                <h3 className="mt-4 max-w-[22ch] font-display-tight text-[21px] leading-[1.12]">{step.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-[1320px] px-5 sm:px-8">
        <Reveal>
          <div className="flex items-baseline justify-between border-t border-line pt-5">
            <h2 className="font-display text-[clamp(24px,3.2vw,36px)]">Brand dan peran</h2>
            <Link to="/work" className="group inline-flex items-center gap-2 text-[14px] text-muted transition-colors hover:text-primary">
              Lihat proyek
              <Icon name="arrow_outward" className="text-[16px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        <ul className="mt-8">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.04}>
              <li>
                <Link
                  to={`/work/${project.slug}`}
                  className="group grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 border-t border-line py-5 transition-colors hover:border-line-strong sm:grid-cols-[1.2fr_1fr_auto]"
                >
                  <span className="font-display-tight text-[20px] transition-colors group-hover:text-primary">
                    {project.client}
                  </span>
                  <span className="num col-span-2 text-[12px] uppercase tracking-[0.12em] text-faint sm:col-span-1">
                    {project.role.join(' · ')}
                  </span>
                  <span className="num text-[12px] text-faint">{project.year}</span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-16 max-w-[1320px] px-5 pb-20 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 rounded-[24px] border border-outline-variant bg-surface-container p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="label text-faint">Kolaborasi</p>
              <p className="mt-3 max-w-[34ch] font-display-tight text-[22px] leading-[1.2] sm:text-[26px]">
                Ceritakan brand Anda; saya bantu menyusun peta jalan desainnya.
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
      </section>
    </div>
  )
}
