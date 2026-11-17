import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'

import type { Project } from '../../data/work'
import { Mock } from './Mock'
import { Reveal } from './motion'

export function WorkCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <Reveal delay={(index % 2) * 0.08} className="h-full">
      <Link
        to={`/work/${project.slug}`}
        className="card-light group relative flex h-full flex-col overflow-hidden transition-transform duration-500 hover:-translate-y-1"
      >
        <div className="stage-scope relative m-3 aspect-16/11 overflow-hidden rounded-[20px]">
          <div className="absolute inset-0 transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]">
            <Mock brand={project.client} kind={project.pieces[0].kind} caption={project.pieces[0].title} className="h-full" />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display-tight text-[26px] sm:text-[30px]">{project.client}</h3>
              <p className="label mt-2.5 text-[12px] text-faint">{project.category}</p>
            </div>
            <span className="num pt-1 text-[12px] text-faint">{String(index + 1).padStart(2, '0')}</span>
          </div>

          <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-muted">{project.summary}</p>

          <div className="mt-auto pt-7">
            <div className="flex items-center justify-between">
              <span className="num text-[12px] uppercase tracking-[0.14em] text-faint">
                {project.pieces.length} karya
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[14px] font-medium text-white transition-colors group-hover:bg-accent-deep">
                Lihat proyek
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </Reveal>
  )
}
