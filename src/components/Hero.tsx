import { motion } from 'framer-motion'
import { ArrowDown, GitFork, Mail, ExternalLink } from 'lucide-react'
import type { Lang } from '../i18n/translations'
import { t, tr } from '../i18n/translations'
import { profile } from '../data/content'
import { useIsMobile } from '../hooks/useIsMobile'
import heroImg from '../assets/Images/108634966_971090706663652_5291454640204277277_n.jpg'

const ticker_items = [
  'Microsoft Dynamics AX', 'D365 F&O', 'ERP Developer', 'Automation',
  'Windows Service', 'Hangfire', 'Chatwoot API', '.NET 8',
  'ASP.NET Core', 'ReactJS', 'SQL Server', 'Clean Architecture',
]

export default function Hero({ lang }: { lang: Lang }) {
  const isMobile = useIsMobile()
  const doubled = [...ticker_items, ...ticker_items]

  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', paddingTop: 90 }}>

      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(0,255,163,.014) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,163,.014) 1px,transparent 1px)',
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 90% 90% at 50% 40%, black 0%, transparent 100%)',
      }} />

      {/* Ambient glow blobs */}
      <div style={{ position: 'absolute', top: '10%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,163,.055) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '5%', left: '-8%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,.045) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 380px',
          gap: isMobile ? 48 : 80,
          alignItems: 'center',
        }}>

          {/* ── Left: Text ── */}
          <div>
            {/* Available badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2, duration: .7 }} style={{ marginBottom: 28 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '7px 18px', border: '1px solid rgba(0,255,163,.25)', background: 'rgba(0,255,163,.06)', fontSize: 11, letterSpacing: 2, color: 'var(--neon)', textTransform: 'uppercase', backdropFilter: 'blur(8px)' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--neon)', boxShadow: '0 0 8px var(--neon)', animation: 'blink 1.4s step-end infinite', display: 'inline-block' }} />
                {tr(t.hero.available, lang)}
              </span>
            </motion.div>

            {/* Name */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35, duration: .8 }}>
              <h1 style={{ fontFamily: 'Outfit,sans-serif', fontSize: `clamp(${isMobile ? '44px' : '48px'},7.5vw,105px)`, fontWeight: 900, lineHeight: .88, letterSpacing: isMobile ? '-2px' : '-4px', marginBottom: 24, position: 'relative', userSelect: 'none' }}>
                <span style={{ display: 'block' }}>NGUYEN</span>
                <span style={{ display: 'block', position: 'relative' }}>
                  <span style={{ color: 'transparent', WebkitTextStroke: '1.5px var(--neon)' }}>KHAC</span>
                  {' '}
                  <span style={{ position: 'relative', display: 'inline-block' }}>
                    DANH
                    <span aria-hidden style={{ position: 'absolute', inset: 0, color: 'var(--neon2)', animation: 'glitch1 5s infinite', opacity: .5 }}>DANH</span>
                    <span aria-hidden style={{ position: 'absolute', inset: 0, color: 'var(--accent)', animation: 'glitch2 5s infinite', opacity: .35, transform: 'translateX(4px)' }}>DANH</span>
                  </span>
                </span>
              </h1>
            </motion.div>

            {/* Role */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5, duration: .7 }}
              style={{ fontSize: isMobile ? 11 : 12, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>
              <span className="gradient-text" style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 600 }}>
                {tr(t.hero.role, lang)}
              </span>
            </motion.p>

            {/* Desc */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .6, duration: .7 }}
              style={{ maxWidth: 500, color: 'var(--muted)', lineHeight: 1.9, fontSize: 13, marginBottom: 32 }}>
              {tr(t.hero.desc, lang)}
            </motion.p>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .65, duration: .7 }}
              style={{ display: 'flex', gap: isMobile ? 20 : 36, marginBottom: 36, flexWrap: 'wrap' }}>
              {[
                { n: '5+',   label: lang === 'en' ? 'Years ERP'   : 'Năm ERP',      color: 'var(--neon)'   },
                { n: '60%+', label: lang === 'en' ? 'Automation'  : 'Tự động hóa',  color: 'var(--neon2)'  },
                { n: '20+',  label: lang === 'en' ? 'Tech Stack'  : 'Công nghệ',    color: 'var(--purple)' },
              ].map(s => (
                <div key={s.n} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: isMobile ? 22 : 30, fontWeight: 900, color: s.color, lineHeight: 1, textShadow: `0 0 20px ${s.color}` }}>{s.n}</div>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: 'var(--muted)', textTransform: 'uppercase', marginTop: 5 }}>{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .75, duration: .7 }}
              style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="#projects" className="btn-primary" style={{ fontSize: isMobile ? 10 : 11 }}>{tr(t.hero.viewProjects, lang)}</a>
              <a href="#contact"  className="btn-ghost"   style={{ fontSize: isMobile ? 10 : 11 }}>{tr(t.hero.contact, lang)}</a>
              <div style={{ display: 'flex', gap: 16, marginLeft: 6 }}>
                {[
                  { icon: GitFork,      href: profile.github,           tip: 'GitHub' },
                  { icon: Mail,         href: `mailto:${profile.email}`, tip: 'Email' },
                  { icon: ExternalLink, href: profile.facebook,          tip: 'Facebook' },
                ].map(({ icon: Icon, href, tip }) => (
                  <a key={tip} href={href} target="_blank" rel="noopener noreferrer" title={tip}
                    style={{ color: 'var(--muted)', transition: 'color .2s,transform .2s', display: 'flex' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--neon)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.transform = 'translateY(0)' }}
                  ><Icon size={18} /></a>
                ))}
              </div>
            </motion.div>

            {/* Quote */}
            {!isMobile && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 1 }}
                style={{ marginTop: 44, padding: '16px 22px', borderLeft: '2px solid var(--neon)', background: 'rgba(0,255,163,.04)', maxWidth: 500, backdropFilter: 'blur(6px)' }}>
                <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.75, fontStyle: 'italic' }}>{tr(t.hero.quote, lang)}</p>
              </motion.div>
            )}
          </div>

          {/* ── Right: Avatar ── */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, x: 40, scale: .97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: .5, duration: .9, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              {/* Outer glow ring */}
              <div style={{
                position: 'absolute', inset: -20,
                borderRadius: 8,
                background: 'radial-gradient(ellipse at center, rgba(0,255,163,.08) 0%, transparent 65%)',
                pointerEvents: 'none',
              }} />

              {/* Photo frame */}
              <div style={{ position: 'relative', width: 340, height: 400 }}>
                {/* Gradient border */}
                <div style={{
                  position: 'absolute', inset: -1.5,
                  background: 'linear-gradient(145deg, rgba(0,255,163,.5), rgba(56,189,248,.2) 50%, rgba(192,132,252,.4))',
                  borderRadius: 4,
                }} />

                {/* Photo */}
                <img
                  src={heroImg}
                  alt="Nguyễn Khắc Danh"
                  style={{
                    position: 'relative', zIndex: 1,
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'top center',
                    display: 'block',
                    borderRadius: 3,
                  }}
                />

                {/* Dark overlay gradient at bottom */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
                  background: 'linear-gradient(to top, rgba(5,8,13,.85) 0%, transparent 100%)',
                  borderRadius: '0 0 3px 3px',
                  zIndex: 2,
                }} />

                {/* Name badge inside photo */}
                <div style={{
                  position: 'absolute', bottom: 20, left: 20, right: 20, zIndex: 3,
                }}>
                  <div style={{ fontSize: 10, letterSpacing: 3, color: 'var(--neon)', textTransform: 'uppercase', marginBottom: 4 }}>
                    .NET Developer
                  </div>
                  <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: 15, color: 'var(--text)', letterSpacing: .5 }}>
                    Nguyễn Khắc Danh
                  </div>
                </div>

                {/* Corner marks */}
                {[
                  { top: 10, left: 10, borderTop: '2px solid', borderLeft: '2px solid' },
                  { top: 10, right: 10, borderTop: '2px solid', borderRight: '2px solid' },
                  { bottom: 10, left: 10, borderBottom: '2px solid', borderLeft: '2px solid' },
                  { bottom: 10, right: 10, borderBottom: '2px solid', borderRight: '2px solid' },
                ].map((s, i) => (
                  <div key={i} style={{
                    position: 'absolute', width: 18, height: 18,
                    borderColor: 'rgba(0,255,163,.7)',
                    zIndex: 4,
                    ...s,
                  }} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Ticker */}
      <div style={{ overflow: 'hidden', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '12px 0', marginTop: 48, background: 'rgba(0,255,163,.012)', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', gap: 44, animation: 'ticker 32s linear infinite', width: 'max-content' }}>
          {doubled.map((item, i) => (
            <span key={i} style={{ fontSize: 10, letterSpacing: 3, color: 'var(--dim)', textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0 }}>
              <span style={{ color: 'var(--neon)', marginRight: 10 }}>◆</span>{item}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.2 }}
        style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, zIndex: 1 }}>
        <span style={{ fontSize: 9, letterSpacing: 3, color: 'var(--dim)', textTransform: 'uppercase' }}>scroll</span>
        <ArrowDown size={12} color="var(--neon)" />
      </motion.div>
    </section>
  )
}
