import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router'

import { site } from '../../data/site'
import { bySlug, nextProject, type PieceKind, type Project as ProjectType } from '../../data/work'
import { Mock } from '../components/Mock'
import { Reveal } from '../components/motion'
import { usePageMeta } from '../lib/usePageMeta'

const isWide = (kind: PieceKind) => kind === 'website' || kind === 'catalog'

const aspectFor = (kind: PieceKind, rowLength: number) => {
  if (isWide(kind)) return 'aspect-3/2 sm:aspect-2/1'
  return rowLength === 1 ? 'aspect-4/3 sm:aspect-16/9' : 'aspect-4/3'
}

/** Susun karya per baris: karya lebar selalu mendapat barisnya sendiri. */
function toRows<T extends { kind: PieceKind }>(pieces: T[]): T[][] {
  const rows: T[][] = []
  for (const piece of pieces) {
    const last = rows[rows.length - 1]
    if (!isWide(piece.kind) && last?.length === 1 && !isWide(last[0].kind)) last.push(piece)
    else rows.push([piece])
  }
  return rows
}

export function Project() {
  const { slug } = useParams()
  const project = slug ? bySlug(slug) : undefined
  if (!project) return <Navigate to="/work" replace />
  return <ProjectView project={project} />
}

function ProjectView({ project }: { project: ProjectType }) {
  usePageMeta(`${project.client} — Refriansyah Galiztan`, project.summary)
  const next = nextProject(project.slug)

  return (
    <div className="pt-[70px]">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="flex items-center justify-between pt-8">
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 text-[14px] text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            Semua proyek
          </Link>
          <span className="num text-[12px] uppercase tracking-[0.14em] text-faint">{project.year}</span>
        </div>

        <header className="mt-10 lg:mt-14">
          <span className="label text-accent">{project.category}</span>
          <h1 className="headline-fade mt-5 font-display text-[clamp(42px,8vw,110px)]">{project.client}</h1>
          <p className="mt-7 max-w-[62ch] text-[16.5px] leading-relaxed text-muted">{project.summary}</p>

          <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="card-light px-5 py-5">
              <dt className="label text-faint">Sektor</dt>
              <dd className="mt-2.5 text-[14.5px] text-fg">{project.sector}</dd>
            </div>
            <div className="card-light px-5 py-5">
              <dt className="label text-faint">Kanal</dt>
              <dd className="mt-2.5 text-[14.5px] text-fg">{project.channels.join(', ')}</dd>
            </div>
            <div className="card-light px-5 py-5">
              <dt className="label text-faint">Peran</dt>
              <dd className="mt-2.5 text-[14.5px] text-fg">{project.role[0]}</dd>
            </div>
            <div className="card-light px-5 py-5">
              <dt className="label text-faint">Jumlah karya</dt>
              <dd className="mt-2.5 text-[14.5px] text-fg">{project.pieces.length} karya</dd>
            </div>
          </dl>
        </header>

        <section className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div className="space-y-5">
            {project.body.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="max-w-[62ch] text-[16.5px] leading-[1.8] text-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card-light p-6">
              <p className="label text-faint">Peran saya</p>
              <ul className="mt-4 space-y-2.5">
                {project.role.map((role) => (
                  <li key={role} className="flex items-center gap-2.5 text-[14.5px] text-fg/90">
                    <span className="size-1 bg-accent" />
                    {role}
                  </li>
                ))}
              </ul>
              <p className="label mt-7 border-t border-line pt-5 text-faint">Kanal</p>
              <ul className="mt-3 space-y-2">
                {project.channels.map((channel) => (
                  <li key={channel} className="num text-[13.5px] text-muted">
                    {channel}
                  </li>
                ))}
              </ul>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="group mt-7 flex items-center justify-between border-t border-line pt-5 text-[14px] text-fg/80 transition-colors hover:text-accent"
              >
                Diskusikan proyek serupa
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </aside>
        </section>
      </div>

      <section className="mx-auto mt-16 max-w-[1320px] px-5 sm:px-8 lg:mt-24">
        <div className="flex items-baseline justify-between border-t border-line pt-5">
          <h2 className="font-display text-[clamp(24px,3.2vw,36px)]">Karya dalam proyek</h2>
          <span className="num text-[12px] uppercase tracking-[0.14em] text-faint">
            {String(project.pieces.length).padStart(2, '0')} karya
          </span>
        </div>

        <div className="mt-8 space-y-10 lg:space-y-14">
          {toRows(project.pieces).map((row, rowIndex) => (
            <div key={rowIndex} className="grid gap-10 sm:grid-cols-2 lg:gap-12">
              {row.map((piece) => (
                <figure key={piece.title} className={row.length === 1 ? 'sm:col-span-2' : ''}>
                  <Mock
                    brand={project.client}
                    kind={piece.kind}
                    image={piece.image}
                    caption={piece.title}
                    className={`rounded-[28px] border border-line ${aspectFor(piece.kind, row.length)}`}
                  />
                  <figcaption
                    className={
                      row.length === 1
                        ? 'mt-4 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between'
                        : 'mt-4'
                    }
                  >
                    <span className="font-display-tight text-[18px]">{piece.title}</span>
                    <span className="block max-w-[54ch] text-[14.5px] leading-relaxed text-muted">{piece.note}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-[1320px] px-5 sm:px-8 lg:mt-24">
        <div className="border-t border-line pt-5">
          <h2 className="label text-faint">Hasil</h2>
        </div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          {project.results.map((result) => (
            <div key={result.label} className="rounded-[28px] bg-surface px-5 py-7 sm:px-6">
              <dd className="font-display text-[clamp(32px,4.4vw,52px)] leading-none text-fg">{result.value}</dd>
              <dt className="mt-4 flex max-w-[26ch] items-start gap-2.5 text-[14px] leading-relaxed text-muted">
                <span className="mt-[7px] size-1 shrink-0 bg-accent" />
                {result.label}
              </dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto mt-16 max-w-[1320px] px-5 pb-20 sm:px-8 lg:mt-24">
        <Link
          to={`/work/${next.slug}`}
          className="group flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span className="label text-faint">Proyek berikutnya</span>
            <p className="mt-3 font-display text-[clamp(30px,5vw,64px)] transition-colors group-hover:text-accent">
              {next.client}
            </p>
          </div>
          <span className="inline-flex items-center gap-2 text-[14px] text-muted transition-colors group-hover:text-accent">
            {next.category}
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </Link>
      </section>
    </div>
  )
}
