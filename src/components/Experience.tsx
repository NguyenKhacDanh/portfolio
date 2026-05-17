import { motion } from 'framer-motion'
import type { Lang } from '../i18n/translations'
import { t, tr } from '../i18n/translations'
import { experience } from '../data/content'

export default function Experience({ lang }: { lang: Lang }) {
  return (
    <section id="experience" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <p className="section-tag">{tr(t.experience.tag, lang)}</p>
          <h2 style={{ marginBottom: 14 }}>
            {tr(t.experience.title, lang)}{' '}
            <span className="stroke">{tr(t.experience.title2, lang)}</span>
          </h2>
          <p style={{ color:'var(--muted)', fontSize:14, marginBottom:64, maxWidth:480 }}>{tr(t.experience.desc, lang)}</p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position:'relative', paddingLeft:8 }}>
          <div className="timeline-line" />

          {experience.map((exp, i) => (
            <motion.div key={i}
              initial={{ opacity:0, x:-24 }}
              whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              style={{ paddingLeft:52, marginBottom: i < experience.length - 1 ? 40 : 0, position:'relative' }}
            >
              {/* Timeline dot */}
              <div
                className="timeline-dot"
                style={{ color: exp.color, top: 14, background: exp.color }}
              />

              {/* Card */}
              <div className="glow-card" style={{
                padding: 32,
                borderTop: `2px solid ${exp.color}`,
                borderRadius: 2,
              }}>
                {/* Top bar glow */}
                <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background: exp.color, boxShadow:`0 0 20px ${exp.color}` }} />

                {/* Header */}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16, flexWrap:'wrap', gap:12 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                    <span style={{
                      fontSize:28, width:48, height:48, display:'flex',
                      alignItems:'center', justifyContent:'center',
                      background:`${exp.color}14`,
                      border:`1px solid ${exp.color}33`,
                      flexShrink:0,
                    }}>{exp.icon}</span>
                    <h3 style={{
                      fontFamily:'Outfit, sans-serif', fontSize:16, fontWeight:700,
                      color:'var(--text)', lineHeight:1.35,
                    }}>
                      {lang === 'en' ? exp.role.en : exp.role.vi}
                    </h3>
                  </div>
                  <span style={{
                    fontSize:10, letterSpacing:2, color: exp.color,
                    textTransform:'uppercase', whiteSpace:'nowrap',
                    padding:'5px 14px',
                    border:`1px solid ${exp.color}33`,
                    background:`${exp.color}0d`,
                    flexShrink:0,
                  }}>
                    {exp.period}
                  </span>
                </div>

                {/* Description */}
                <p style={{ color:'var(--muted)', fontSize:13.5, lineHeight:1.85, marginBottom:22 }}>
                  {lang === 'en' ? exp.desc.en : exp.desc.vi}
                </p>

                {/* Tags */}
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {exp.tags.map(tag => (
                    <motion.span key={tag}
                      whileHover={{ y:-2, scale:1.03 }}
                      className="tag-chip"
                      style={{
                        border:`1px solid ${exp.color}3a`,
                        background:`${exp.color}0a`,
                        color: exp.color,
                      }}
                    >{tag}</motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
