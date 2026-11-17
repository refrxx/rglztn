import { motion, useInView, useMotionValue, useSpring } from 'motion/react'
import { useRef, type ReactNode } from 'react'

import { cx } from '../lib/cx'

const ease = [0.22, 1, 0.36, 1] as const

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
  const inView = useInView(ref, { once: true, margin: '0px 0px -5% 0px' })
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.09em] -mb-[0.09em]">
          <motion.span
            className="headline-fade block"
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : { y: '110%' }}
            transition={{ duration: 1.05, delay: delay + i * 0.08, ease }}
          >
            {line}
          </motion.span>
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
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.85, delay, ease }}
    >
      {children}
    </motion.div>
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
  const x = useSpring(useMotionValue(0), { stiffness: 240, damping: 20, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 240, damping: 20, mass: 0.4 })
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={cx('inline-block', className)}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        x.set((e.clientX - rect.left - rect.width / 2) * strength)
        y.set((e.clientY - rect.top - rect.height / 2) * strength)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}
