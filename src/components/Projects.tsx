import { motion } from 'framer-motion'
import { GitFork, ExternalLink, Star } from 'lucide-react'
import type { Lang } from '../i18n/translations'
import { t, tr } from '../i18n/translations'
import { projects, enterpriseProjects } from '../data/content'

export default function Projects({ lang }: { lang: Lang }) {
  return (
    <section id="projects" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <p className="section-tag">{tr(t.projects.tag, lang)}</p>
          <h2 style={{ marginBottom:14 }}>{tr(t.projects.title, lang)}</h2>
          <p style={{ color:'var(--muted)', fontSize:14, marginBottom:48, maxWidth:480 }}>{tr(t.projects.desc, lang)}</p>
        </motion.div>

        {/* Enterprise projects grid */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} style={{ marginBottom:56 }}>
          <div style={{ fontSize:9, letterSpacing:4, color:'var(--muted)', textTransform:'uppercase', marginBottom:20, display:'flex', alignItems:'center', gap:12 }}>
            <span style={{ width:20, height:1, background:'var(--muted)', display:'inline-block' }} />
            {lang === 'en' ? 'Enterprise systems delivered' : 'Hệ thống doanh nghiệp đã triển khai'}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:12 }}>
            {enterpriseProjects.map((ep, i) => (
              <motion.div key={i}
                initial={{ opacity:0, scale:.95 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }}
                transition={{ delay: i * .05 }}
                whileHover={{ y:-3, scale:1.02 }}
                className="glow-card"
                style={{ padding:'18px 20px', borderLeft:`2px solid ${ep.color}` }}
              >
                <div style={{ fontSize:22, marginBottom:8 }}>{ep.icon}</div>
                <div style={{ fontSize:12, fontFamily:'Outfit,sans-serif', fontWeight:700, color:'var(--text)', marginBottom:4, lineHeight:1.3 }}>
                  {lang === 'en' ? ep.name.en : ep.name.vi}
                </div>
                <div style={{ fontSize:10, color: ep.color, letterSpacing:.5 }}>{ep.tech}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* OSS projects */}
        <div style={{ fontSize:9, letterSpacing:4, color:'var(--muted)', textTransform:'uppercase', marginBottom:20, display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ width:20, height:1, background:'var(--muted)', display:'inline-block' }} />
          {lang === 'en' ? 'Open source repos' : 'Dự án mã nguồn mở'}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:20 }}>
          {projects.map((p, i) => (
            <motion.div key={p.num}
              initial={{ opacity:0, y:28 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ delay: i * .09 }}
              whileHover={{ y:-4 }}
              className="glow-card"
              style={{
                padding:28,
                gridColumn: p.featured ? 'span 2' : 'span 1',
                borderTop: p.featured ? '2px solid var(--neon)' : '1px solid var(--border)',
              }}
            >
              {p.featured && (
                <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'var(--neon)', boxShadow:'0 0 16px var(--neon)' }} />
              )}

              {/* watermark */}
              <span style={{ position:'absolute', top:12, right:20, fontFamily:'Outfit,sans-serif', fontSize:72, fontWeight:900, color:'rgba(0,255,163,.025)', lineHeight:1, userSelect:'none', pointerEvents:'none' }}>{p.num}</span>

              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
                <div style={{ display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' }}>
                  {p.featured && (
                    <span style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:9, letterSpacing:2, color:'var(--neon)', textTransform:'uppercase', border:'1px solid rgba(0,255,163,.25)', padding:'3px 10px' }}>
                      <Star size={9} fill="var(--neon)" /> {lang === 'en' ? 'Featured' : 'Nổi bật'}
                    </span>
                  )}
                  {p.community && (
                    <span style={{ fontSize:9, letterSpacing:2, color:'var(--neon2)', textTransform:'uppercase', border:'1px solid rgba(56,189,248,.25)', padding:'3px 10px' }}>
                      {tr(t.projects.opensource, lang)}
                    </span>
                  )}
                  {p.forked && (
                    <span style={{ fontSize:9, letterSpacing:2, color:'var(--accent)', textTransform:'uppercase', border:'1px solid rgba(251,146,60,.25)', padding:'3px 10px', display:'flex', alignItems:'center', gap:4 }}>
                      <GitFork size={9} /> {tr(t.projects.forked, lang)}
                    </span>
                  )}
                </div>
                <a href={p.url} target="_blank" rel="noopener noreferrer"
                  style={{ color:'var(--muted)', transition:'color .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color='var(--neon)')}
                  onMouseLeave={e => (e.currentTarget.style.color='var(--muted)')}
                ><ExternalLink size={15} /></a>
              </div>

              <h3 style={{ fontFamily:'Outfit,sans-serif', fontWeight:800, fontSize: p.featured ? 22 : 17, marginBottom:10, lineHeight:1.2 }}>
                {lang === 'en' ? p.name : p.nameVi}
              </h3>
              <p style={{ color:'var(--muted)', fontSize:13, lineHeight:1.8, marginBottom:22 }}>
                {lang === 'en' ? p.desc.en : p.desc.vi}
              </p>

              <div style={{ display:'flex', gap:10, alignItems:'center', justifyContent:'space-between', flexWrap:'wrap' }}>
                <span className="lang-badge" style={{ borderColor: p.langColor + '55', color: p.langColor }}>
                  <span style={{ display:'inline-block', width:8, height:8, borderRadius:'50%', background: p.langColor, marginRight:6, boxShadow:`0 0 6px ${p.langColor}` }} />
                  {p.lang}
                </span>
                <a href={p.url} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize:11, letterSpacing:2, color:'var(--neon)', textTransform:'uppercase', display:'flex', alignItems:'center', gap:6, transition:'gap .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.gap='10px')}
                  onMouseLeave={e => (e.currentTarget.style.gap='6px')}
                >
                  {tr(t.projects.viewCode, lang)} <ExternalLink size={11} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
