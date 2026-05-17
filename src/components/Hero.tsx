import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, GitFork, Mail, ExternalLink } from 'lucide-react'
import type { Lang } from '../i18n/translations'
import { t, tr } from '../i18n/translations'
import { profile } from '../data/content'
import { useIsMobile } from '../hooks/useIsMobile'

const ticker_items = [
  'Microsoft Dynamics AX', 'D365 F&O', 'ERP Developer', 'Automation',
  'Windows Service', 'Hangfire', 'Chatwoot API', '.NET 8',
  'ASP.NET Core', 'ReactJS', 'SQL Server', 'Clean Architecture',
]

export default function Hero({ lang }: { lang: Lang }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef  = useRef({ x: -1000, y: -1000 })
  const isMobile  = useIsMobile()
  const doubled   = [...ticker_items, ...ticker_items]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number
    const particles: Array<{ x:number; y:number; vx:number; vy:number; r:number; color:string }> = []
    const COLORS = ['rgba(0,255,163,', 'rgba(56,189,248,', 'rgba(192,132,252,']

    const init = () => {
      particles.length = 0
      const count = isMobile ? 30 : 55
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.38,
          vy: (Math.random() - 0.5) * 0.38,
          r: Math.random() * 1.3 + 0.4,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        })
      }
    }

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      init()
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        const dx = p.x - mx, dy = p.y - my, d = Math.sqrt(dx*dx+dy*dy)
        if (d < 100 && d > 0) { p.x += (dx/d)*0.9; p.y += (dy/d)*0.9 }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2)
        ctx.fillStyle = p.color + '0.65)'; ctx.shadowBlur = 5; ctx.shadowColor = p.color + '1)'; ctx.fill()
      })
      ctx.shadowBlur = 0

      const maxDist = isMobile ? 80 : 130
      for (let i = 0; i < particles.length; i++) {
        for (let j = i+1; j < particles.length; j++) {
          const dx = particles[i].x-particles[j].x, dy = particles[i].y-particles[j].y
          const dist = Math.sqrt(dx*dx+dy*dy)
          if (dist < maxDist) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0,255,163,${(1-dist/maxDist)*0.12})`; ctx.lineWidth = 0.6; ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }

    resize(); draw()
    const onResize = () => resize()
    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX-rect.left, y: e.clientY-rect.top }
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouse)
    return () => { window.removeEventListener('resize', onResize); window.removeEventListener('mousemove', onMouse); cancelAnimationFrame(animId) }
  }, [isMobile])

  return (
    <section id="hero" style={{ minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', position:'relative', overflow:'hidden', paddingTop:90 }}>
      <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:0, pointerEvents:'none' }} />

      {/* Grid */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:1,
        backgroundImage:'linear-gradient(rgba(0,255,163,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,163,.022) 1px,transparent 1px)',
        backgroundSize:'64px 64px', animation:'grid-pan 12s linear infinite',
        maskImage:'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
      }} />

      {/* Orbs */}
      {!isMobile && <>
        <div style={{ position:'absolute', top:'8%', right:'5%', width:440, height:440, borderRadius:'50%', background:'radial-gradient(circle,rgba(0,255,163,.08) 0%,transparent 65%)', animation:'float-orb 9s ease-in-out infinite', pointerEvents:'none', zIndex:1 }} />
        <div style={{ position:'absolute', bottom:'8%', left:'2%', width:340, height:340, borderRadius:'50%', background:'radial-gradient(circle,rgba(56,189,248,.07) 0%,transparent 65%)', animation:'float-orb 13s ease-in-out infinite reverse', pointerEvents:'none', zIndex:1 }} />
        <div style={{ position:'absolute', top:'40%', left:'38%', width:260, height:260, borderRadius:'50%', background:'radial-gradient(circle,rgba(192,132,252,.05) 0%,transparent 65%)', animation:'float-orb 7s ease-in-out infinite 2s', pointerEvents:'none', zIndex:1 }} />
      </>}

      <div className="container" style={{ position:'relative', zIndex:2, flex:1, display:'flex', flexDirection:'column', justifyContent:'center' }}>

        {/* Available badge */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:.2, duration:.7 }} style={{ marginBottom:24 }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'7px 18px', border:'1px solid rgba(0,255,163,.25)', background:'rgba(0,255,163,.06)', fontSize:11, letterSpacing:2, color:'var(--neon)', textTransform:'uppercase', backdropFilter:'blur(8px)' }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--neon)', boxShadow:'0 0 8px var(--neon)', animation:'blink 1.4s step-end infinite', display:'inline-block' }} />
            {tr(t.hero.available, lang)}
          </span>
        </motion.div>

        {/* Name */}
        <motion.div initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ delay:.35, duration:.8 }}>
          <h1 style={{ fontFamily:'Outfit,sans-serif', fontSize:`clamp(${isMobile?'44px':'52px'},10vw,130px)`, fontWeight:900, lineHeight:.86, letterSpacing: isMobile?'-2px':'-5px', marginBottom:20, position:'relative', userSelect:'none' }}>
            <span style={{ display:'block' }}>NGUYEN</span>
            <span style={{ display:'block', position:'relative' }}>
              <span style={{ color:'transparent', WebkitTextStroke:'1.5px var(--neon)' }}>KHAC</span>
              {' '}
              <span style={{ position:'relative', display:'inline-block' }}>
                DANH
                <span aria-hidden style={{ position:'absolute', inset:0, color:'var(--neon2)', animation:'glitch1 5s infinite', opacity:.5 }}>DANH</span>
                <span aria-hidden style={{ position:'absolute', inset:0, color:'var(--accent)', animation:'glitch2 5s infinite', opacity:.35, transform:'translateX(4px)' }}>DANH</span>
              </span>
            </span>
          </h1>
        </motion.div>

        {/* Role */}
        <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:.5, duration:.7 }}
          style={{ fontSize: isMobile?11:12, letterSpacing:3, textTransform:'uppercase', marginBottom:16 }}>
          <span className="gradient-text" style={{ fontFamily:'Outfit,sans-serif', fontWeight:600 }}>
            {tr(t.hero.role, lang)}
          </span>
        </motion.p>

        {/* Desc */}
        <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:.6, duration:.7 }}
          style={{ maxWidth:520, color:'var(--muted)', lineHeight:1.9, fontSize:13, marginBottom:32 }}>
          {tr(t.hero.desc, lang)}
        </motion.p>

        {/* Stats */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:.65, duration:.7 }}
          style={{ display:'flex', gap: isMobile?20:32, marginBottom:32, flexWrap:'wrap' }}>
          {[
            { n:'5+',  label: lang==='en'?'Years ERP':'Năm ERP',           color:'var(--neon)'   },
            { n:'60%+', label: lang==='en'?'Automation':'Tự động hóa',      color:'var(--neon2)'  },
            { n:'20+',  label: lang==='en'?'Tech Stack':'Công nghệ',        color:'var(--purple)' },
          ].map(s => (
            <div key={s.n} style={{ textAlign:'center' }}>
              <div style={{ fontFamily:'Outfit,sans-serif', fontSize: isMobile?22:28, fontWeight:900, color:s.color, lineHeight:1, textShadow:`0 0 18px ${s.color}` }}>{s.n}</div>
              <div style={{ fontSize:9, letterSpacing:2, color:'var(--muted)', textTransform:'uppercase', marginTop:4 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:.75, duration:.7 }}
          style={{ display:'flex', gap:12, alignItems:'center', flexWrap:'wrap' }}>
          <a href="#projects" className="btn-primary" style={{ fontSize: isMobile?10:11 }}>{tr(t.hero.viewProjects, lang)}</a>
          <a href="#contact"  className="btn-ghost"   style={{ fontSize: isMobile?10:11 }}>{tr(t.hero.contact, lang)}</a>
          <div style={{ display:'flex', gap:14, marginLeft:4 }}>
            {[
              { icon: GitFork,      href: profile.github,          tip:'GitHub' },
              { icon: Mail,         href:`mailto:${profile.email}`, tip:'Email' },
              { icon: ExternalLink, href: profile.facebook,         tip:'Facebook' },
            ].map(({ icon: Icon, href, tip }) => (
              <a key={tip} href={href} target="_blank" rel="noopener noreferrer" title={tip}
                style={{ color:'var(--muted)', transition:'color .2s,transform .2s', display:'flex' }}
                onMouseEnter={e=>{ e.currentTarget.style.color='var(--neon)'; e.currentTarget.style.transform='translateY(-3px)' }}
                onMouseLeave={e=>{ e.currentTarget.style.color='var(--muted)'; e.currentTarget.style.transform='translateY(0)' }}
              ><Icon size={18} /></a>
            ))}
          </div>
        </motion.div>

        {/* Quote */}
        {!isMobile && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.1, duration:1 }}
            style={{ marginTop:44, padding:'16px 22px', borderLeft:'2px solid var(--neon)', background:'rgba(0,255,163,.04)', maxWidth:560, backdropFilter:'blur(6px)' }}>
            <p style={{ fontSize:12, color:'var(--muted)', lineHeight:1.75, fontStyle:'italic' }}>{tr(t.hero.quote, lang)}</p>
          </motion.div>
        )}
      </div>

      {/* Ticker */}
      <div style={{ overflow:'hidden', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)', padding:'12px 0', marginTop:32, background:'rgba(0,255,163,.018)', position:'relative', zIndex:2 }}>
        <div style={{ display:'flex', gap:44, animation:'ticker 32s linear infinite', width:'max-content' }}>
          {doubled.map((item, i) => (
            <span key={i} style={{ fontSize:10, letterSpacing:3, color:'var(--dim)', textTransform:'uppercase', whiteSpace:'nowrap', flexShrink:0 }}>
              <span style={{ color:'var(--neon)', marginRight:10 }}>◆</span>{item}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div animate={{ y:[0,8,0] }} transition={{ repeat:Infinity, duration:2.2 }}
        style={{ position:'absolute', bottom:28, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:5, zIndex:2 }}>
        <span style={{ fontSize:9, letterSpacing:3, color:'var(--dim)', textTransform:'uppercase' }}>scroll</span>
        <ArrowDown size={12} color="var(--neon)" />
      </motion.div>
    </section>
  )
}
