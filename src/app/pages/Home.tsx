import type { ReactNode } from 'react'
import { Link } from 'react-router'

import { capabilities, site, stats } from '../../data/site'
import { formatDate, sortedPosts } from '../../data/journal'
import { projects } from '../../data/work'
import { WorkCard } from '../components/WorkCard'
import { Lines, Marquee, Reveal } from '../components/anim'
import { ButtonContent, buttonStyles } from '../components/ui/Button'
import { Chip } from '../components/ui/Chip'
import { Icon } from '../components/ui/Icon'
import { usePageMeta } from '../lib/usePageMeta'

function SectionHead({ index, title, aside }: { index: string; title: string; aside?: ReactNode }) {
  return (
    <Reveal>
      <div className="flex flex-wrap items-end justify-between gap-4 border-t border-line pt-5">
        <div className="flex items-baseline gap-4">
          <span className="num text-[12px] tracking-[0.14em] text-primary">{index}</span>
          <h2 className="font-display text-[clamp(26px,3.4vw,42px)]">{title}</h2>
        </div>
        {aside}
      </div>
    </Reveal>
  )
}

export function Home() {
  usePageMeta(
    'Refriansyah Galiztan — Desainer Website & Manajer Marketplace',
    site.tagline,
  )

  return (
    <>
      <section className="relative overflow-hidden pt-[70px]">
        <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="flex items-center justify-between pt-10">
            <Chip variant="primary" className="text-[15px]">
              Portofolio 2026
            </Chip>
            <span className="label hidden text-faint sm:block">{site.role}</span>
          </div>

          <div className="mt-8 sm:mt-10">
            <Lines as="h1" lines={site.display} className="font-display text-[clamp(54px,11.6vw,172px)]" />
          </div>

          <div className="mt-10 grid gap-8 border-t border-line pt-8 lg:mt-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <Reveal delay={0.15}>
              <p className="max-w-[32ch] font-display text-[clamp(22px,2.6vw,30px)] leading-[1.22] tracking-[-0.035em]">
                Desain web yang terlihat profesional.
                <br />
                <span className="text-muted">Katalog yang mendorong pembelian.</span>
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="max-w-[48ch] text-[16px] leading-relaxed text-muted">{site.tagline}</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonStyles()}
                >
                  <ButtonContent icon="arrow_outward">Mulai diskusi</ButtonContent>
                </a>
                <Link to="/work" className="link-draw text-[15px] text-muted transition-colors hover:text-fg">
                  Lihat portofolio
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <dl className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:mt-16">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-[20px] border border-outline-variant bg-surface-container px-5 py-6 sm:py-8">
                  <dt className="num text-[12px] uppercase tracking-[0.14em] text-faint">{stat.label}</dt>
                  <dd className="mt-3 font-display text-[clamp(28px,3.6vw,44px)] leading-none">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <div className="mt-16 border-y border-line py-4">
        <Marquee items={site.marquee} />
      </div>

      <section id="kerja" className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 lg:py-28">
        <SectionHead
          index="01"
          title="Portofolio"
          aside={
            <Link to="/work" className="group inline-flex items-center gap-2 text-[14px] text-muted transition-colors hover:text-primary">
              Semua brand
              <Icon name="arrow_outward" className="text-[16px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          }
        />
        <p className="mt-6 max-w-[52ch] text-[16px] leading-relaxed text-muted">
          Setiap brand memiliki portofolionya sendiri: satu sistem visual, beberapa kanal, dan alasan di balik setiap
          keputusan.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:gap-6">
          {projects.map((project, i) => (
            <WorkCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>

      <section id="layanan" className="border-t border-line">
        <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 lg:py-28">
          <SectionHead index="02" title="Layanan" />
          <div className="mt-10">
            {capabilities.map((item) => (
              <Reveal key={item.index}>
                <div className="group grid gap-3 border-t border-line py-7 transition-colors duration-500 hover:border-line-strong md:grid-cols-[60px_1fr_1.15fr] md:gap-8 md:py-9">
                  <span className="num text-[12px] tracking-[0.14em] text-faint transition-colors group-hover:text-primary">
                    {item.index}
                  </span>
                  <h3 className="font-display-tight text-[24px] leading-none sm:text-[28px]">{item.title}</h3>
                  <div>
                    <p className="max-w-[54ch] text-[15.5px] leading-relaxed text-muted">{item.body}</p>
                    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                      {item.tags.map((tag) => (
                        <li key={tag} className="label text-[12px] text-faint">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:py-28">
          <div>
            <Reveal>
              <span className="label text-faint">03 / Tentang</span>
              <h2 className="mt-6 max-w-[18ch] font-display text-[clamp(30px,4.2vw,52px)]">
                Desain dan penjualan, dalam satu <span className="text-primary">pemikiran.</span>
              </h2>
              <p className="mt-7 max-w-[54ch] text-[16px] leading-relaxed text-muted">{site.intro}</p>
              <Link
                to="/about"
                className="group mt-8 inline-flex items-center gap-2 text-[15px] text-fg/80 transition-colors hover:text-primary"
              >
                Selengkapnya tentang saya
                <Icon name="arrow_outward" className="text-[16px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <p className="label text-faint">Brand yang pernah saya tangani</p>
            <ul className="mt-6">
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link
                    to={`/work/${project.slug}`}
                    className="group flex items-baseline justify-between gap-4 border-t border-line py-4 transition-colors hover:border-line-strong"
                  >
                    <span className="font-display-tight text-[19px] transition-colors group-hover:text-primary">
                      {project.client}
                    </span>
                    <span className="num shrink-0 text-[12px] uppercase tracking-[0.12em] text-faint">
                      {project.category}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 pb-20 sm:px-8 lg:pb-28">
        <SectionHead
          index="04"
          title="Artikel"
          aside={
            <Link to="/journal" className="group inline-flex items-center gap-2 text-[14px] text-muted transition-colors hover:text-primary">
              Semua artikel
              <Icon name="arrow_outward" className="text-[16px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          }
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {sortedPosts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              to={`/journal/${post.slug}`}
              className="group flex flex-col justify-between gap-10 rounded-[24px] border border-outline-variant bg-surface-container p-6 transition-colors duration-300 hover:bg-surface-container-high"
            >
              <div>
                <span className="label text-faint">{post.tag}</span>
                <h3 className="mt-4 font-display-tight text-[22px] leading-[1.1] transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
              </div>
              <div className="flex items-center justify-between">
                <span className="num text-[12px] text-faint">{formatDate(post.date)}</span>
                <span className="num text-[12px] text-faint">{post.readingTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
