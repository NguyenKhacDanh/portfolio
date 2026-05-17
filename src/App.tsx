import { useEffect, useRef, useState } from 'react'
import './index.css'
import type { Lang } from './i18n/translations'
import Navbar      from './components/Navbar'
import Hero        from './components/Hero'
import About       from './components/About'
import Experience  from './components/Experience'
import Skills      from './components/Skills'
import Projects    from './components/Projects'
import LiveFeed    from './components/LiveFeed'
import Contact     from './components/Contact'
import Footer      from './components/Footer'
import MusicPlayer  from './components/MusicPlayer'
import Butterflies  from './components/Butterflies'

export default function App() {
  const [lang, setLang] = useState<Lang>('vi')
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) { cursorRef.current.style.left = e.clientX + 'px'; cursorRef.current.style.top = e.clientY + 'px' }
      if (ringRef.current)   { ringRef.current.style.left   = e.clientX + 'px'; ringRef.current.style.top   = e.clientY + 'px' }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />
      <Navbar lang={lang} setLang={setLang} />
      <main>
        <Hero       lang={lang} />
        <About      lang={lang} />
        <Experience lang={lang} />
        <Skills     lang={lang} />
        <Projects   lang={lang} />
        <LiveFeed   lang={lang} />
        <Contact    lang={lang} />
      </main>
      <Footer     lang={lang} />
      <MusicPlayer />
      <Butterflies />
    </>
  )
}
