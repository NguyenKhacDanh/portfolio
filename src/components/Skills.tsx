import { motion } from 'framer-motion'
import type { Lang } from '../i18n/translations'
import { t, tr } from '../i18n/translations'
import { skillGroups } from '../data/content'

export default function Skills({ lang }: { lang: Lang }) {
  return (
    <section id="skills">
      <div className="container">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <p className="section-tag">{tr(t.skills.tag, lang)}</p>
          <h2 style={{ marginBottom:14 }}>{tr(t.skills.title, lang)}</h2>
          <p style={{ color:'var(--muted)', fontSize:14, marginBottom:56, maxWidth:440 }}>{tr(t.skills.desc, lang)}</p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:24 }}>
          {skillGroups.map((g, gi) => (
            <motion.div key={gi}
              initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ delay: gi * .1 }}
              className="glow-card"
              style={{ padding:28, position:'relative', overflow:'hidden' }}
            >
              <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:g.color, boxShadow:`0 0 16px ${g.color}` }} />

              {/* Watermark */}
              <span style={{ position:'absolute', bottom:-8, right:12, fontFamily:'Outfit,sans-serif', fontSize:80, fontWeight:900, color:`${g.color}09`, lineHeight:1, userSelect:'none', pointerEvents:'none' }}>
                {(gi + 1).toString().padStart(2, '0')}
              </span>

              <h3 style={{ fontFamily:'Outfit,sans-serif', fontSize:16, fontWeight:800, color:g.color, marginBottom:20 }}>
                {lang==='en'?g.title.en:g.title.vi}
              </h3>

              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {g.tags.map((tag, ti) => (
                  <motion.span key={ti}
                    initial={{ opacity:0, scale:.9 }}
                    whileInView={{ opacity:1, scale:1 }}
                    viewport={{ once:true }}
                    transition={{ delay: gi * .06 + ti * .04 }}
                    whileHover={{ y:-2, scale:1.05 }}
                    style={{
                      padding:'5px 13px',
                      border:`1px solid ${g.color}30`,
                      background:`${g.color}0a`,
                      color: g.color,
                      fontSize:10, letterSpacing:1, textTransform:'uppercase',
                      fontFamily:'var(--mono)',
                      cursor:'default',
                      transition:'border-color .2s, box-shadow .2s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = g.color
                      ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 10px ${g.color}44`
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = `${g.color}30`
                      ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                    }}
                  >{tag}</motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
