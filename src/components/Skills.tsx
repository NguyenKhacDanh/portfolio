import { motion } from 'framer-motion'
import type { Lang } from '../i18n/translations'
import { t, tr } from '../i18n/translations'
import { skillGroups } from '../data/content'

function Bar({ name, level, color, delay }: { name:string; level:number; color:string; delay:number }) {
  return (
    <motion.div initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay, duration:.45 }} style={{ marginBottom: 18 }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom: 7, fontSize: 12 }}>
        <span style={{ color: 'var(--text)' }}>{name}</span>
        <span style={{ color, fontWeight: 700 }}>{level}%</span>
      </div>
      <div style={{ height: 2, background: 'var(--border)', position: 'relative', overflow: 'visible' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once:true }}
          transition={{ duration: 1.1, delay: delay + .15, ease: 'easeOut' }}
          style={{ height: '100%', background: `linear-gradient(90deg, ${color}88, ${color})`, position: 'relative' }}
        >
          <div style={{ position:'absolute', right: -3, top:'50%', transform:'translateY(-50%)', width: 7, height: 7, borderRadius:'50%', background: color, boxShadow:`0 0 10px ${color}, 0 0 24px ${color}44` }} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Skills({ lang }: { lang: Lang }) {
  return (
    <section id="skills">
      <div className="container">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <p className="section-tag">{tr(t.skills.tag, lang)}</p>
          <h2 style={{ marginBottom: 14 }}>{tr(t.skills.title, lang)}</h2>
          <p style={{ color:'var(--muted)', fontSize:14, marginBottom:60, maxWidth:440 }}>{tr(t.skills.desc, lang)}</p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:28 }}>
          {skillGroups.map((g, gi) => (
            <motion.div key={gi} initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: gi * .12 }}
              className="card" style={{ padding: 30, position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background: g.color, boxShadow:`0 0 18px ${g.color}` }} />
              <h3 style={{ fontFamily:'Outfit, sans-serif', fontSize:17, fontWeight:700, color: g.color, marginBottom:24 }}>
                {typeof g.title === 'object' ? (lang === 'en' ? g.title.en : g.title.vi) : g.title}
              </h3>
              {g.items.map((item, ii) => (
                <Bar key={item.name} name={item.name} level={item.level} color={g.color} delay={gi*.08 + ii*.07} />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
