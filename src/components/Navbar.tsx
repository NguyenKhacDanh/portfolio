import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import type { Lang } from '../i18n/translations'
import { t, tr } from '../i18n/translations'
import { useIsMobile } from '../hooks/useIsMobile'

interface Props { lang: Lang; setLang: (l: Lang) => void }

export default function Navbar({ lang, setLang }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const links = [
    { label: tr(t.nav.skills,   lang), href: '#skills'   },
    { label: tr(t.nav.projects, lang), href: '#projects' },
    { label: tr(t.nav.contact,  lang), href: '#contact'  },
  ]

  const Logo = () => (
    <a href="#" style={{ fontFamily:'Outfit,sans-serif', fontWeight:900, fontSize:22, color:'var(--neon)', letterSpacing:'-1px' }}>
      NKD
    </a>
  )

  return (
    <>
      <motion.nav
        initial={{ y:-64, opacity:0 }}
        animate={{ y:0, opacity:1 }}
        transition={{ duration:.6, ease:'easeOut' }}
        style={{
          position:'fixed', top:0, left:0, right:0, zIndex:200,
          padding: isMobile ? '16px 20px' : '18px 28px',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          background: scrolled ? 'rgba(5,8,13,.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,255,163,.08)' : 'none',
          transition:'all .3s',
        }}
      >
        <Logo />

        {/* Desktop nav */}
        {!isMobile && (
          <div style={{ display:'flex', gap:28, alignItems:'center' }}>
            {links.map(l => (
              <a key={l.href} href={l.href}
                style={{ fontSize:11, letterSpacing:2, color:'var(--muted)', textTransform:'uppercase', transition:'color .2s' }}
                onMouseEnter={e=>(e.currentTarget.style.color='var(--neon)')}
                onMouseLeave={e=>(e.currentTarget.style.color='var(--muted)')}
              >{l.label}</a>
            ))}
            <button
              onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
              style={{ padding:'6px 14px', border:'1px solid var(--border)', background:'transparent', color:'var(--neon)', fontFamily:'JetBrains Mono,monospace', fontSize:11, letterSpacing:2, cursor:'pointer', transition:'all .2s' }}
              onMouseEnter={e=>{ e.currentTarget.style.background='var(--neon)'; e.currentTarget.style.color='var(--bg)' }}
              onMouseLeave={e=>{ e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--neon)' }}
            >{lang === 'en' ? '🇻🇳 VI' : '🇺🇸 EN'}</button>
            <a href="#contact" className="btn-primary" style={{ padding:'8px 20px', fontSize:10 }}>
              {tr(t.nav.hire, lang)}
            </a>
          </div>
        )}

        {/* Mobile controls */}
        {isMobile && (
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <button
              onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
              style={{ padding:'5px 10px', border:'1px solid var(--border)', background:'transparent', color:'var(--neon)', fontFamily:'JetBrains Mono,monospace', fontSize:10, cursor:'pointer' }}
            >{lang === 'en' ? '🇻🇳' : '🇺🇸'}</button>
            <button onClick={() => setMenuOpen(v => !v)}
              style={{ background:'none', border:'none', cursor:'pointer', color:'var(--neon)', display:'flex', padding:4 }}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        )}
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity:0, y:-20 }}
            animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-20 }}
            transition={{ duration:.25 }}
            style={{
              position:'fixed', inset:0, zIndex:199,
              background:'rgba(5,8,13,.97)',
              backdropFilter:'blur(20px)',
              display:'flex', flexDirection:'column',
              alignItems:'center', justifyContent:'center',
              gap:8,
            }}
          >
            {links.map((l, i) => (
              <motion.a key={l.href} href={l.href}
                initial={{ opacity:0, x:-20 }}
                animate={{ opacity:1, x:0 }}
                transition={{ delay: i * .06 }}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize:28, fontFamily:'Outfit,sans-serif', fontWeight:800,
                  color:'var(--muted)', textTransform:'uppercase', letterSpacing:1,
                  padding:'12px 32px', transition:'color .2s',
                }}
                onMouseEnter={e=>(e.currentTarget.style.color='var(--neon)')}
                onMouseLeave={e=>(e.currentTarget.style.color='var(--muted)')}
              >{l.label}</motion.a>
            ))}
            <motion.a href="#contact"
              initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:.35 }}
              onClick={() => setMenuOpen(false)}
              className="btn-primary" style={{ marginTop:24, fontSize:12 }}>
              {tr(t.nav.hire, lang)}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
