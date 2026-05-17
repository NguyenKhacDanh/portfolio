import { motion } from 'framer-motion'
import type { Lang } from '../i18n/translations'
import { t, tr } from '../i18n/translations'
import { profile } from '../data/content'

const cards = (lang: Lang) => [
  { icon: '🏢', label: tr(t.about.cards.enterprise, lang), color: 'var(--neon)' },
  { icon: '🌍', label: tr(t.about.cards.opensource, lang),  color: 'var(--neon2)' },
  { icon: '💻', label: tr(t.about.cards.fullstack,  lang),  color: 'var(--accent)' },
  { icon: '🧬', label: tr(t.about.cards.clean,      lang),  color: 'var(--purple)' },
]

export default function About({ lang }: { lang: Lang }) {
  return (
    <section id="about" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>

          {/* Left: text */}
          <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.7 }}>
            <p className="section-tag">{tr(t.about.tag, lang)}</p>
            <h2 style={{ marginBottom: 32 }}>{tr(t.about.title, lang)} <span className="stroke">?</span></h2>
            <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.9, marginBottom: 18 }}>{tr(t.about.p1, lang)}</p>
            <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.9, marginBottom: 18 }}>{tr(t.about.p2, lang)}</p>
            <p style={{ color: 'var(--neon)', fontSize: 14, lineHeight: 1.9, borderLeft: '2px solid var(--neon)', paddingLeft: 16 }}>{tr(t.about.p3, lang)}</p>

            <div style={{ marginTop: 36, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 10 }}>GitHub →</a>
              <a href={`mailto:${profile.email}`} className="btn-ghost" style={{ fontSize: 10 }}>{profile.email}</a>
            </div>
          </motion.div>

          {/* Right: stat cards */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              {cards(lang).map((c, i) => (
                <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i * .1 }}
                  className="card"
                  style={{ padding: 24, borderTop: `2px solid ${c.color}` }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
                  <div style={{ fontSize: 12, letterSpacing: 1, color: c.color, textTransform: 'uppercase' }}>{c.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Stats row */}
            <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:.45 }}
              className="card"
              style={{ padding: 24, display: 'flex', justifyContent: 'space-between' }}>
              {[
                { n: '3+',  label: lang === 'en' ? 'Years Exp' : 'Năm kinh nghiệm' },
                { n: '5',   label: lang === 'en' ? 'OSS Repos' : 'Repo mã nguồn mở' },
                { n: '20+', label: lang === 'en' ? 'Tech Stack' : 'Công nghệ' },
              ].map(s => (
                <div key={s.n} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 36, fontWeight: 800, color: 'var(--neon)', lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: 10, letterSpacing: 2, color: 'var(--muted)', textTransform: 'uppercase', marginTop: 6 }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
