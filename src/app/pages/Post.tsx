import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router'

import { site } from '../../data/site'
import { bySlug, formatDate, nextPost, type Block, type Post as PostType } from '../../data/journal'
import { Reveal } from '../components/motion'
import { usePageMeta } from '../lib/usePageMeta'

export function Post() {
  const { slug } = useParams()
  const post = slug ? bySlug(slug) : undefined
  if (!post) return <Navigate to="/journal" replace />
  return <PostView post={post} />
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === 'h2') return <h2 key={i}>{block.text}</h2>
        if (block.type === 'quote') return <blockquote key={i}>{block.text}</blockquote>
        if (block.type === 'list')
          return (
            <ul key={i}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )
        return <p key={i}>{block.text}</p>
      })}
    </>
  )
}

function PostView({ post }: { post: PostType }) {
  usePageMeta(`${post.title} — Refriansyah Galiztan`, post.excerpt)
  const next = nextPost(post.slug)

  return (
    <div className="pt-[70px]">
      <article className="mx-auto max-w-[820px] px-5 pt-8 sm:px-8">
        <Link
          to="/journal"
          className="group inline-flex items-center gap-2 text-[14px] text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          Semua artikel
        </Link>

        <header className="mt-10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="label text-accent">{post.tag}</span>
            <span className="size-1 rounded-full bg-line-strong" />
            <span className="num text-[12px] uppercase tracking-[0.14em] text-faint">{formatDate(post.date)}</span>
            <span className="size-1 rounded-full bg-line-strong" />
            <span className="num text-[12px] uppercase tracking-[0.14em] text-faint">{post.readingTime}</span>
          </div>

          <h1 className="headline-fade mt-6 font-display text-[clamp(34px,5.6vw,64px)]">{post.title}</h1>
          <p className="mt-6 max-w-[58ch] border-t border-line pt-6 text-[16.5px] leading-relaxed text-muted">
            {post.excerpt}
          </p>
        </header>

        <div className="prose-site mt-10 max-w-[66ch] pb-4">
          <Blocks blocks={post.body} />
        </div>

        <div className="mt-14 border-t border-line pt-6">
          <p className="label text-faint">Ditulis oleh</p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-display-tight text-[20px]">{site.name}</p>
              <p className="mt-1 text-[14px] text-muted">{site.role}</p>
            </div>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-[14px] text-fg/80 transition-colors hover:text-accent"
            >
              Diskusikan via WhatsApp
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </article>

      <Reveal>
        <div className="mx-auto mt-16 max-w-[1320px] px-5 pb-20 sm:px-8">
          <Link
            to={`/journal/${next.slug}`}
            className="group flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <span className="label text-faint">Artikel berikutnya</span>
              <p className="mt-3 max-w-[24ch] font-display text-[clamp(26px,4vw,48px)] transition-colors group-hover:text-accent">
                {next.title}
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-[14px] text-muted transition-colors group-hover:text-accent">
              {next.tag}
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </Reveal>
    </div>
  )
}
