import { motion } from 'framer-motion'
import type { Lang } from '../i18n/translations'
import { t, tr } from '../i18n/translations'
import { experience } from '../data/content'
import { useIsMobile } from '../hooks/useIsMobile'

export default function Experience({ lang }: { lang: Lang }) {
  const isMobile = useIsMobile()

  return (
    <section id="experience" style={{ background:'var(--bg)' }}>
      <div className="container">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <p className="section-tag">{tr(t.experience.tag, lang)}</p>
          <h2 style={{ marginBottom:14 }}>
            {tr(t.experience.title, lang)}{' '}
            <span className="stroke">{tr(t.experience.title2, lang)}</span>
          </h2>
          <p style={{ color:'var(--muted)', fontSize:14, marginBottom:56, maxWidth:480 }}>
            {tr(t.experience.desc, lang)}
          </p>
        </motion.div>

        <div style={{ position:'relative', paddingLeft: isMobile ? 0 : 8 }}>
          {!isMobile && <div className="timeline-line" />}

          {experience.map((exp, i) => (
            <motion.div key={i}
              initial={{ opacity:0, x:-24 }}
              whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }}
              transition={{ delay: i * .15, duration:.6 }}
              style={{
                paddingLeft: isMobile ? 0 : 52,
                marginBottom: i < experience.length - 1 ? (isMobile ? 24 : 36) : 0,
                position:'relative',
              }}
            >
              {!isMobile && (
                <div className="timeline-dot" style={{ color:exp.color, top:14, background:exp.color }} />
              )}

              <div className="glow-card" style={{ padding: isMobile ? 22 : 30, borderTop:`2px solid ${exp.color}` }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:exp.color, boxShadow:`0 0 18px ${exp.color}` }} />

                <div style={{
                  display:'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  justifyContent:'space-between',
                  alignItems: isMobile ? 'flex-start' : 'flex-start',
                  marginBottom:16, gap:12,
                }}>
                  <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                    <span style={{
                      fontSize:22, width:42, height:42, display:'flex',
                      alignItems:'center', justifyContent:'center',
                      background:`${exp.color}14`, border:`1px solid ${exp.color}33`,
                      flexShrink:0,
                    }}>{exp.icon}</span>
                    <h3 style={{ fontFamily:'Outfit,sans-serif', fontSize: isMobile ? 14 : 16, fontWeight:700, color:'var(--text)', lineHeight:1.35 }}>
                      {lang==='en'?exp.role.en:exp.role.vi}
                    </h3>
                  </div>
                  <span style={{
                    fontSize:10, letterSpacing:2, color:exp.color, textTransform:'uppercase',
                    whiteSpace:'nowrap', padding:'5px 12px',
                    border:`1px solid ${exp.color}33`, background:`${exp.color}0d`,
                    flexShrink:0,
                  }}>{exp.period}</span>
                </div>

                <p style={{ color:'var(--muted)', fontSize:13, lineHeight:1.85, marginBottom:20 }}>
                  {lang==='en'?exp.desc.en:exp.desc.vi}
                </p>

                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {exp.tags.map(tag => (
                    <motion.span key={tag} whileHover={{ y:-2 }}
                      style={{
                        padding:'4px 12px', fontSize:10, letterSpacing:1, textTransform:'uppercase',
                        fontFamily:'var(--mono)',
                        border:`1px solid ${exp.color}3a`, background:`${exp.color}0a`, color:exp.color,
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
