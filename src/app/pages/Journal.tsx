import { Link } from 'react-router'

import { formatDate, sortedPosts } from '../../data/journal'
import { Lines, Reveal } from '../components/anim'
import { Icon } from '../components/ui/Icon'
import { usePageMeta } from '../lib/usePageMeta'

export function Journal() {
  usePageMeta(
    'Artikel — Refriansyah Galiztan',
    'Catatan tentang desain web, visual penjualan, dan pengelolaan marketplace.',
  )

  return (
    <div className="pt-[70px]">
      <section className="mx-auto max-w-[1320px] px-5 pt-14 sm:px-8 lg:pt-20">
        <div className="flex items-center justify-between">
          <span className="label text-faint">Artikel</span>
          <span className="num text-[12px] uppercase tracking-[0.14em] text-faint">
            {String(sortedPosts.length).padStart(2, '0')} artikel
          </span>
        </div>

        <Lines
          as="h1"
          lines={['Catatan tentang desain', <>dan <span className="text-muted">cara berjualan.</span></>]}
          className="mt-8 font-display text-[clamp(38px,7vw,96px)]"
        />

        <Reveal delay={0.2}>
          <p className="mt-10 max-w-[56ch] border-t border-line pt-8 text-[16px] leading-relaxed text-muted">
            Hal-hal yang saya pelajari selama bekerja: tentang tipografi, thumbnail, katalog, dan mengapa desain yang
            terlihat profesional biasanya justru paling sederhana.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 py-14 sm:px-8 lg:py-20">
        <div>
          {sortedPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05}>
              <Link
                to={`/journal/${post.slug}`}
                className="group grid gap-4 border-t border-line py-7 transition-colors duration-500 hover:border-line-strong md:grid-cols-[140px_1fr_120px] md:items-baseline md:gap-8 lg:py-9"
              >
                <div className="flex items-center gap-3 md:block">
                  <span className="num block text-[12px] uppercase tracking-[0.14em] text-faint">
                    {formatDate(post.date)}
                  </span>
                  <span className="label mt-0 text-[12px] text-accent md:mt-2 md:block">{post.tag}</span>
                </div>

                <div>
                  <h2 className="max-w-[30ch] font-display-tight text-[clamp(23px,3vw,34px)] leading-[1.06]">
                    {post.title}
                  </h2>
                  <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-muted">{post.excerpt}</p>
                </div>

                <div className="flex items-center justify-between md:justify-end md:gap-4">
                  <span className="num text-[12px] text-faint">{post.readingTime}</span>
                  <Icon
                    name="arrow_outward"
                    className="text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
          <div className="border-t border-line" />
        </div>
      </section>
    </div>
  )
}
