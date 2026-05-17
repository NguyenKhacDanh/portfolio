import { motion } from 'framer-motion'
import { Mail, MapPin, Clock, MessageCircle, GitBranch, ExternalLink } from 'lucide-react'
import type { Lang } from '../i18n/translations'
import { t, tr } from '../i18n/translations'
import { profile } from '../data/content'
import { useIsMobile } from '../hooks/useIsMobile'

export default function Contact({ lang }: { lang: Lang }) {
  const isMobile = useIsMobile()

  const contacts = [
    {
      icon: Mail,
      label: 'Email',
      val: profile.email,
      href: `mailto:${profile.email}`,
      color: 'var(--neon)',
      desc: lang==='en'?'Send me an email':'Gửi email cho tôi',
    },
    {
      icon: MessageCircle,
      label: 'Zalo',
      val: profile.zalo,
      href: `https://zalo.me/${profile.zalo}`,
      color: 'var(--neon2)',
      desc: lang==='en'?'Chat on Zalo':'Nhắn tin Zalo',
    },
    {
      icon: ExternalLink,
      label: 'Facebook',
      val: 'nguyenkhacdanh.1010',
      href: profile.facebook,
      color: 'var(--purple)',
      desc: lang==='en'?'Find me on Facebook':'Tìm tôi trên Facebook',
    },
    {
      icon: GitBranch,
      label: 'GitHub',
      val: 'NguyenKhacDanh',
      href: profile.github,
      color: 'var(--accent)',
      desc: lang==='en'?'Check my code':'Xem code của tôi',
    },
  ]

  return (
    <section id="contact" style={{ background:'var(--bg2)' }}>
      <div className="container">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <p className="section-tag">{tr(t.contact.tag, lang)}</p>
          <h2 style={{ marginBottom:14 }}>
            {tr(t.contact.title, lang)} <span className="stroke">Together</span>
          </h2>
          <p style={{ color:'var(--muted)', fontSize:14, marginBottom:52, maxWidth:480 }}>
            {tr(t.contact.desc, lang)}
          </p>
        </motion.div>

        {/* Contact cards grid */}
        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap:16,
          marginBottom:40,
        }}>
          {contacts.map((c, i) => (
            <motion.a key={i}
              href={c.href}
              target={c.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ delay: i * .1 }}
              whileHover={{ y:-6, scale:1.03 }}
              className="glow-card"
              style={{
                padding: isMobile ? '20px 16px' : 28,
                borderTop:`2px solid ${c.color}`,
                display:'flex', flexDirection:'column', gap:12,
                cursor:'pointer', textDecoration:'none',
              }}
            >
              <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:c.color, boxShadow:`0 0 14px ${c.color}` }} />
              <div style={{
                width:44, height:44, display:'flex', alignItems:'center', justifyContent:'center',
                background:`${c.color}14`, border:`1px solid ${c.color}33`,
                color: c.color,
              }}>
                <c.icon size={20} />
              </div>
              <div>
                <div style={{ fontSize:9, letterSpacing:3, color:'var(--muted)', textTransform:'uppercase', marginBottom:4 }}>{c.label}</div>
                <div style={{ fontSize: isMobile ? 11 : 13, color:'var(--text)', fontWeight:600, wordBreak:'break-all' }}>{c.val}</div>
                <div style={{ fontSize:11, color:c.color, marginTop:4 }}>{c.desc} →</div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Info row */}
        <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={{
            display:'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap:16,
          }}>
          <div className="glow-card" style={{ padding:24, display:'flex', gap:16, alignItems:'center' }}>
            <MapPin size={18} color="var(--neon)" />
            <div>
              <div style={{ fontSize:9, letterSpacing:3, color:'var(--dim)', textTransform:'uppercase', marginBottom:4 }}>{lang==='en'?'Location':'Địa chỉ'}</div>
              <div style={{ fontSize:13 }}>{tr(t.contact.location, lang)}</div>
            </div>
          </div>
          <div className="glow-card" style={{ padding:24, display:'flex', gap:16, alignItems:'center' }}>
            <Clock size={18} color="var(--neon2)" />
            <div>
              <div style={{ fontSize:9, letterSpacing:3, color:'var(--dim)', textTransform:'uppercase', marginBottom:4 }}>{lang==='en'?'Availability':'Tình trạng'}</div>
              <div style={{ fontSize:13, display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--neon)', boxShadow:'0 0 8px var(--neon)', display:'inline-block', animation:'blink 1.4s step-end infinite' }} />
                {tr(t.contact.available, lang)}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
