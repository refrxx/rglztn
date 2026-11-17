import { useEffect, useRef } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router'

import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { Journal } from './pages/Journal'
import { Post } from './pages/Post'
import { Project } from './pages/Project'
import { Work } from './pages/Work'
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from './lib/gsap'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      return
    }

    // Halaman baru dipasang setelah transisi, jadi posisi target dicek dua kali.
    let cancelled = false
    const align = () => {
      if (cancelled) return
      const target = document.querySelector(hash)
      if (!target) return
      const top = target.getBoundingClientRect().top + window.scrollY - 70
      window.scrollTo({ top, behavior: 'smooth' })
    }
    const timers = [window.setTimeout(align, 350), window.setTimeout(align, 900)]

    return () => {
      cancelled = true
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [pathname, hash])

  return null
}

function Pages() {
  const location = useLocation()
  const mainRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const main = mainRef.current
      if (!main) return

      ScrollTrigger.refresh()

      if (prefersReducedMotion()) {
        gsap.set(main, { autoAlpha: 1, y: 0 })
        return
      }

      gsap.fromTo(
        main,
        { autoAlpha: 0, y: 10 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.38,
          ease: 'power3.out',
          onComplete: () => gsap.set(main, { clearProps: 'opacity,visibility,transform' }),
        },
      )
    },
    { dependencies: [location.pathname] },
  )

  return (
    <main ref={mainRef}>
      <Routes location={location}>
        <Route index element={<Home />} />
        <Route path="work" element={<Work />} />
        <Route path="work/:slug" element={<Project />} />
        <Route path="journal" element={<Journal />} />
        <Route path="journal/:slug" element={<Post />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Nav />
      <Pages />
      <Footer />
    </BrowserRouter>
  )
}
