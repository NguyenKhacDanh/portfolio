import type { Lang } from '../i18n/translations'
import { t, tr } from '../i18n/translations'
import { profile } from '../data/content'

export default function Footer({ lang }: { lang: Lang }) {
  return (
    <footer style={{ borderTop:'1px solid var(--border)', padding:'36px 0', background:'var(--bg)' }}>
      <div className="container" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16 }}>
        <a href="#" style={{ fontFamily:'Outfit, sans-serif', fontWeight:900, fontSize:22, color:'var(--neon)', letterSpacing:'-1px' }}>
          NKD
        </a>
        <div style={{ textAlign:'center' }}>
          <p style={{ fontSize:11, color:'var(--muted)' }}>{tr(t.footer.built, lang)}</p>
          <p style={{ fontSize:10, color:'var(--dim)', marginTop:4 }}>{tr(t.footer.open, lang)}</p>
        </div>
        <div style={{ display:'flex', gap:20 }}>
          <a href={profile.github}   target="_blank" rel="noopener noreferrer" style={{ fontSize:11, letterSpacing:2, color:'var(--muted)', textTransform:'uppercase', transition:'color .2s' }}
            onMouseEnter={e=>(e.currentTarget.style.color='var(--neon)')} onMouseLeave={e=>(e.currentTarget.style.color='var(--muted)')}>GitHub</a>
          <a href={profile.facebook} target="_blank" rel="noopener noreferrer" style={{ fontSize:11, letterSpacing:2, color:'var(--muted)', textTransform:'uppercase', transition:'color .2s' }}
            onMouseEnter={e=>(e.currentTarget.style.color='var(--neon)')} onMouseLeave={e=>(e.currentTarget.style.color='var(--muted)')}>Facebook</a>
          <a href={`mailto:${profile.email}`} style={{ fontSize:11, letterSpacing:2, color:'var(--muted)', textTransform:'uppercase', transition:'color .2s' }}
            onMouseEnter={e=>(e.currentTarget.style.color='var(--neon)')} onMouseLeave={e=>(e.currentTarget.style.color='var(--muted)')}>Email</a>
        </div>
      </div>
    </footer>
  )
}
