import { motion } from 'framer-motion'
import { ArrowDown, GitFork, Mail, ExternalLink } from 'lucide-react'
import type { Lang } from '../i18n/translations'
import { t, tr } from '../i18n/translations'
import { profile } from '../data/content'

const css = `
@keyframes blink     { 0%,100%{opacity:1}50%{opacity:0} }
@keyframes glitch1   { 0%,100%{clip-path:inset(0 0 96% 0)}25%{clip-path:inset(40% 0 30% 0)}50%{clip-path:inset(80% 0 5% 0)}75%{clip-path:inset(20% 0 65% 0)} }
@keyframes glitch2   { 0%,100%{clip-path:inset(90% 0 3% 0)}25%{clip-path:inset(10% 0 75% 0)}50%{clip-path:inset(55% 0 25% 0)}75%{clip-path:inset(5% 0 88% 0)} }
@keyframes grid-pan  { 0%{transform:translateY(0)} 100%{transform:translateY(64px)} }
@keyframes float-orb { 0%,100%{transform:scale(1) translateY(0)}50%{transform:scale(1.08) translateY(-16px)} }
@keyframes ticker    { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
`

const ticker_items = [
  '.NET Developer', 'C# Expert', 'ASP.NET Core', 'Clean Architecture',
  'Open Source Contributor', 'SQL Server', 'WPF / MVVM', 'SignalR',
  'Docker', 'CQRS', 'ReactJS', 'Full-Stack',
]

export default function Hero({ lang }: { lang: Lang }) {
  const doubled = [...ticker_items, ...ticker_items]

  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', paddingTop: 90 }}>
      <style>{css}</style>

      {/* Grid bg */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(0,255,163,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,163,.035) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        animation: 'grid-pan 10s linear infinite',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
      }} />

      {/* Glow orbs */}
      <div style={{ position: 'absolute', top: '15%', right: '8%', width: 440, height: 440, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,163,.07) 0%, transparent 68%)', animation: 'float-orb 8s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '12%', left: '4%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,.055) 0%, transparent 68%)', animation: 'float-orb 11s ease-in-out infinite reverse', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

        {/* Available badge */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:.2, duration:.7 }} style={{ marginBottom: 28 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '7px 18px', border: '1px solid rgba(0,255,163,.25)', background: 'rgba(0,255,163,.06)', fontSize: 11, letterSpacing: 2, color: 'var(--neon)', textTransform: 'uppercase' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--neon)', boxShadow: '0 0 8px var(--neon)', animation: 'blink 1.4s step-end infinite', display: 'inline-block' }} />
            {tr(t.hero.available, lang)}
          </span>
        </motion.div>

        {/* Name / glitch */}
        <motion.div initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ delay:.35, duration:.8 }}>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(50px,10vw,128px)', fontWeight: 800, lineHeight: .88, letterSpacing: '-4px', marginBottom: 24, position: 'relative', userSelect: 'none' }}>
            <span style={{ display: 'block' }}>NGUYEN</span>
            <span style={{ display: 'block', position: 'relative' }}>
              <span style={{ color: 'transparent', WebkitTextStroke: '1.5px var(--neon)' }}>KHAC</span>
              {' '}
              <span style={{ position: 'relative', display: 'inline-block' }}>
                DANH
                <span aria-hidden style={{ position: 'absolute', inset: 0, color: 'var(--neon2)', animation: 'glitch1 5s infinite', opacity: .55 }}>DANH</span>
                <span aria-hidden style={{ position: 'absolute', inset: 0, color: 'var(--accent)', animation: 'glitch2 5s infinite', opacity: .38, transform: 'translateX(4px)' }}>DANH</span>
              </span>
            </span>
          </h1>
        </motion.div>

        {/* Role */}
        <motion.p initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:.5, duration:.7 }}
          style={{ fontSize: 13, color: 'var(--neon2)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>
          {tr(t.hero.role, lang)}
        </motion.p>

        {/* Desc */}
        <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:.6, duration:.7 }}
          style={{ maxWidth: 520, color: 'var(--muted)', lineHeight: 1.85, fontSize: 14, marginBottom: 44 }}>
          {tr(t.hero.desc, lang)}
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:.72, duration:.7 }}
          style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
          <a href="#projects" className="btn-primary">{tr(t.hero.viewProjects, lang)}</a>
          <a href="#contact"  className="btn-ghost">{tr(t.hero.contact, lang)}</a>
          <div style={{ display: 'flex', gap: 16, marginLeft: 6 }}>
            {[
              { icon: GitFork, href: profile.github,   tip: 'GitHub' },
              { icon: Mail,    href: `mailto:${profile.email}`, tip: 'Email' },
              { icon: ExternalLink, href: profile.facebook, tip: 'Facebook' },
            ].map(({ icon: Icon, href, tip }) => (
              <a key={tip} href={href} target="_blank" rel="noopener noreferrer"
                title={tip}
                style={{ color: 'var(--muted)', transition: 'color .2s, transform .2s', display: 'flex' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--neon)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.transform = 'translateY(0)' }}
              ><Icon size={18} /></a>
            ))}
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1, duration:1 }}
          style={{ marginTop: 56, padding: '18px 24px', borderLeft: '2px solid var(--neon)', background: 'rgba(0,255,163,.04)', maxWidth: 600 }}>
          <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7, fontStyle: 'italic' }}>{tr(t.hero.quote, lang)}</p>
        </motion.div>
      </div>

      {/* Ticker */}
      <div style={{ overflow: 'hidden', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '14px 0', marginTop: 40, background: 'rgba(0,255,163,.025)' }}>
        <div style={{ display: 'flex', gap: 48, animation: 'ticker 28s linear infinite', width: 'max-content' }}>
          {doubled.map((item, i) => (
            <span key={i} style={{ fontSize: 11, letterSpacing: 3, color: 'var(--dim)', textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0 }}>
              <span style={{ color: 'var(--neon)', marginRight: 12 }}>◆</span>{item}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.2 }}
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 9, letterSpacing: 3, color: 'var(--dim)', textTransform: 'uppercase' }}>scroll</span>
        <ArrowDown size={13} color="var(--neon)" />
      </motion.div>
    </section>
  )
}
