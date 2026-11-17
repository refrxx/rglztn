import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router'

import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { Journal } from './pages/Journal'
import { Post } from './pages/Post'
import { Project } from './pages/Project'
import { Work } from './pages/Work'

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
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route index element={<Home />} />
          <Route path="work" element={<Work />} />
          <Route path="work/:slug" element={<Project />} />
          <Route path="journal" element={<Journal />} />
          <Route path="journal/:slug" element={<Post />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Nav />
      <Pages />
      <Footer />
      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[60]" />
    </BrowserRouter>
  )
}
