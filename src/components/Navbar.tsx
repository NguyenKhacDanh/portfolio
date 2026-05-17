import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { Lang } from '../i18n/translations'
import { t, tr } from '../i18n/translations'

interface Props { lang: Lang; setLang: (l: Lang) => void }

export default function Navbar({ lang, setLang }: Props) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const links = [
    { label: tr(t.nav.about,      lang), href: '#about'      },
    { label: tr(t.nav.experience, lang), href: '#experience' },
    { label: tr(t.nav.skills,     lang), href: '#skills'     },
    { label: tr(t.nav.projects,   lang), href: '#projects'   },
    { label: tr(t.nav.contact,    lang), href: '#contact'    },
  ]

  return (
    <motion.nav
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: .6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        padding: '18px 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(6,10,15,.93)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,255,163,.08)' : 'none',
        transition: 'all .3s',
      }}
    >
      {/* Logo */}
      <a href="#" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 18, color: 'var(--neon)', letterSpacing: '-0.5px' }}>
        NKD<span style={{ color: 'var(--neon2)' }}>.dev</span>
      </a>

      {/* Desktop links */}
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        {links.map(l => (
          <a key={l.href} href={l.href}
            style={{ fontSize: 11, letterSpacing: 2, color: 'var(--muted)', textTransform: 'uppercase', transition: 'color .2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--neon)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >{l.label}</a>
        ))}

        {/* Language toggle */}
        <button
          onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
          style={{
            padding: '6px 14px', border: '1px solid var(--border)',
            background: 'transparent', color: 'var(--neon)',
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: 2,
            cursor: 'pointer', transition: 'all .2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--neon)'; e.currentTarget.style.color = 'var(--bg)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--neon)' }}
        >{lang === 'en' ? '🇻🇳 VI' : '🇺🇸 EN'}</button>

        <a href="#contact" className="btn-primary" style={{ padding: '8px 20px', fontSize: 10 }}>
          {tr(t.nav.hire, lang)}
        </a>
      </div>
    </motion.nav>
  )
}
