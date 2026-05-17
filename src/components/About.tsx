import { motion } from 'framer-motion'
import type { Lang } from '../i18n/translations'
import { t, tr } from '../i18n/translations'
import { profile } from '../data/content'

const cards = (lang: Lang) => [
  { icon: '⚙️', label: tr(t.about.cards.erp,        lang), color: 'var(--neon)'   },
  { icon: '🤖', label: tr(t.about.cards.automation,  lang), color: 'var(--neon2)'  },
  { icon: '💻', label: tr(t.about.cards.fullstack,   lang), color: 'var(--accent)' },
  { icon: '🏗️', label: tr(t.about.cards.clean,       lang), color: 'var(--purple)' },
]

export default function About({ lang }: { lang: Lang }) {
  return (
    <section id="about" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:72, alignItems:'start' }}>

          {/* Left */}
          <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.7 }}>
            <p className="section-tag">{tr(t.about.tag, lang)}</p>
            <h2 style={{ marginBottom:32 }}>
              {tr(t.about.title, lang)} <span className="stroke">?</span>
            </h2>
            <p style={{ color:'var(--muted)', fontSize:14, lineHeight:1.9, marginBottom:18 }}>{tr(t.about.p1, lang)}</p>
            <p style={{ color:'var(--muted)', fontSize:14, lineHeight:1.9, marginBottom:18 }}>{tr(t.about.p2, lang)}</p>
            <p style={{ color:'var(--neon)', fontSize:14, lineHeight:1.9, borderLeft:'2px solid var(--neon)', paddingLeft:16 }}>{tr(t.about.p3, lang)}</p>

            {/* Hobbies */}
            <div style={{ marginTop:28, display:'flex', flexWrap:'wrap', gap:10 }}>
              {[
                { icon:'🏸', label: lang === 'en' ? 'Badminton' : 'Cầu lông' },
                { icon:'🎵', label: lang === 'en' ? 'Music' : 'Âm nhạc' },
                { icon:'☕', label: lang === 'en' ? 'Coffee' : 'Cà phê' },
                { icon:'💻', label: lang === 'en' ? 'Coding' : 'Code' },
              ].map(h => (
                <span key={h.label} style={{
                  display:'inline-flex', alignItems:'center', gap:6,
                  padding:'6px 14px',
                  border:'1px solid var(--border)',
                  background:'rgba(255,255,255,.02)',
                  fontSize:11, letterSpacing:1, color:'var(--muted)',
                  backdropFilter:'blur(6px)',
                }}>
                  {h.icon} {h.label}
                </span>
              ))}
            </div>

            {/* Quote */}
            <div style={{ marginTop:24, padding:'14px 18px', borderLeft:'2px solid var(--purple)', background:'rgba(192,132,252,.05)' }}>
              <p style={{ fontSize:11, color:'var(--purple)', letterSpacing:.5, fontStyle:'italic', lineHeight:1.7 }}>
                "If you're not proficient yet, don't be creative."
              </p>
            </div>

            <div style={{ marginTop:28, display:'flex', gap:16, flexWrap:'wrap' }}>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize:10 }}>GitHub →</a>
              <a href={`mailto:${profile.email}`} className="btn-ghost" style={{ fontSize:10 }}>{profile.email}</a>
            </div>
          </motion.div>

          {/* Right: stat cards */}
          <div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:24 }}>
              {cards(lang).map((c, i) => (
                <motion.div key={i}
                  initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                  transition={{ delay: i * .1 }}
                  whileHover={{ y:-4, scale:1.02 }}
                  className="glow-card"
                  style={{ padding:24, borderTop:`2px solid ${c.color}` }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:c.color, boxShadow:`0 0 14px ${c.color}` }} />
                  <div style={{ fontSize:28, marginBottom:10 }}>{c.icon}</div>
                  <div style={{ fontSize:11, letterSpacing:1.5, color:c.color, textTransform:'uppercase' }}>{c.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:.45 }}
              className="glow-card" style={{ padding:28, display:'flex', justifyContent:'space-around' }}>
              {[
                { n:'5+',   label: lang === 'en' ? 'Years Exp'    : 'Năm kinh nghiệm', color:'var(--neon)'   },
                { n:'10+',  label: lang === 'en' ? 'Systems Built' : 'Hệ thống'       , color:'var(--neon2)'  },
                { n:'20+',  label: lang === 'en' ? 'Tech Stack'   : 'Công nghệ'       , color:'var(--purple)' },
              ].map(s => (
                <div key={s.n} style={{ textAlign:'center' }}>
                  <div style={{ fontFamily:'Outfit,sans-serif', fontSize:38, fontWeight:900, color:s.color, lineHeight:1, textShadow:`0 0 24px ${s.color}` }}>{s.n}</div>
                  <div style={{ fontSize:9, letterSpacing:2, color:'var(--muted)', textTransform:'uppercase', marginTop:6 }}>{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Blog post card */}
            <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:.6 }}
              className="glow-card" style={{ padding:24, marginTop:16, borderLeft:'2px solid var(--neon2)' }}>
              <div style={{ fontSize:9, letterSpacing:3, color:'var(--neon2)', textTransform:'uppercase', marginBottom:10 }}>
                {lang === 'en' ? '✦ Latest reflection' : '✦ Cảm nghĩ gần đây'}
              </div>
              <p style={{ fontSize:12, color:'var(--muted)', lineHeight:1.85, fontStyle:'italic' }}>
                {lang === 'en'
                  ? '"Each year we grow a little, and our parents walk a little further into life. Happiness isn\'t something grand — it\'s still having someone to meet, a home to return to, and conversations that feel ordinary but aren\'t."'
                  : '"Mỗi năm mình lớn thêm một chút, ba mẹ cũng đi qua thêm một đoạn của cuộc đời. Hạnh phúc thật ra không phải là những điều quá lớn lao — mà là vẫn còn người để gặp, còn nhà để về, còn những cuộc trò chuyện tưởng chừng rất bình thường."'}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
