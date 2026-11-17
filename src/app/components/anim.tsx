import { useRef, type ReactNode } from 'react'

import { cx } from '../lib/cx'
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap'

/**
 * Baris teks yang naik dari balik mask. Wrapper-nya yang diobservasi, bukan
 * barisnya — baris yang tergeser keluar mask tidak punya area terlihat.
 */
export function Lines({
  lines,
  className,
  delay = 0,
  as: Tag = 'h1',
}: {
  lines: ReactNode[]
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'p' | 'div'
}) {
  const ref = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const targets = root.querySelectorAll<HTMLElement>('[data-line]')
      if (!targets.length) return

      if (prefersReducedMotion()) {
        gsap.set(targets, { yPercent: 0, autoAlpha: 1 })
        return
      }

      gsap.fromTo(
        targets,
        { yPercent: 110, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.9,
          delay,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 88%', once: true },
        },
      )
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.09em] -mb-[0.09em]">
          <span data-line className="block will-change-transform">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}

export function Reveal({
  children,
  delay = 0,
  className,
  y = 20,
}: {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      if (prefersReducedMotion()) {
        gsap.set(el, { autoAlpha: 1, y: 0 })
        return
      }

      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          delay,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        },
      )
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

/** Tombol yang sedikit condong ke arah kursor. */
export function Magnetic({
  children,
  className,
  strength = 0.22,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const xTo = useRef<((value: number) => void) | null>(null)
  const yTo = useRef<((value: number) => void) | null>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      if (prefersReducedMotion() || window.matchMedia('(hover: none)').matches) return

      xTo.current = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' })
      yTo.current = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' })
    },
    { scope: ref },
  )

  return (
    <div
      ref={ref}
      className={cx('inline-block', className)}
      onPointerMove={(event) => {
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        xTo.current?.((event.clientX - rect.left - rect.width / 2) * strength)
        yTo.current?.((event.clientY - rect.top - rect.height / 2) * strength)
      }}
      onPointerLeave={() => {
        xTo.current?.(0)
        yTo.current?.(0)
      }}
    >
      {children}
    </div>
  )
}

/** Marquee horizontal dengan GSAP; berhenti saat kursor di atasnya. */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<ReturnType<typeof gsap.to> | null>(null)

  useGSAP(
    () => {
      const track = trackRef.current
      if (!track || prefersReducedMotion()) return
      tweenRef.current = gsap.to(track, {
        xPercent: -50,
        duration: 38,
        ease: 'none',
        repeat: -1,
      })
    },
    { scope: trackRef },
  )

  return (
    <div
      className={cx('overflow-hidden', className)}
      onMouseEnter={() => tweenRef.current?.pause()}
      onMouseLeave={() => tweenRef.current?.play()}
    >
      <div ref={trackRef} className="flex w-max items-center">
        {[...items, ...items].map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center whitespace-nowrap">
            <span className="label px-6 text-[12px] text-muted">{item}</span>
            <span aria-hidden className="size-1.5 rounded-full bg-primary" />
          </span>
        ))}
      </div>
    </div>
  )
}
