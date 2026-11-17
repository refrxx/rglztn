import { Link } from 'react-router'

import type { Project } from '../../data/work'
import { Mock } from './Mock'
import { Reveal } from './anim'
import { Icon } from './ui/Icon'

export function WorkCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <Reveal delay={(index % 2) * 0.08} className="h-full">
      <Link
        to={`/work/${project.slug}`}
        className="group glass relative flex h-full flex-col overflow-hidden rounded-[24px]"
      >
        <div className="relative m-3 aspect-16/11 overflow-hidden rounded-[16px] border border-line">
          <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]">
            <Mock
              brand={project.client}
              kind={project.pieces[0].kind}
              caption={project.pieces[0].title}
              className="h-full"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display-tight text-[26px] sm:text-[30px]">{project.client}</h3>
              <p className="label mt-2.5 text-[12px] text-muted">{project.category}</p>
            </div>
            <span className="num pt-1 text-[12px] text-faint">{String(index + 1).padStart(2, '0')}</span>
          </div>

          <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-muted">{project.summary}</p>

          <div className="mt-auto pt-7">
            <div className="flex items-center justify-between">
              <span className="num text-[12px] uppercase tracking-[0.14em] text-faint">
                {project.pieces.length} karya
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[14px] font-medium text-on-ink transition-colors group-hover:bg-fg/90">
                Lihat proyek
                <Icon name="arrow_outward" size={16} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </Reveal>
  )
}
