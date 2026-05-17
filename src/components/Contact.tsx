import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Clock, Send, Link2 } from 'lucide-react'
import type { Lang } from '../i18n/translations'
import { t, tr } from '../i18n/translations'
import { profile } from '../data/content'

export default function Contact({ lang }: { lang: Lang }) {
  const [status, setStatus] = useState<'idle'|'sending'|'sent'>('idle')
  const [form, setForm]   = useState({ name:'', email:'', message:'' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    await new Promise(r => setTimeout(r, 1600))
    setStatus('sent')
  }

  const input: React.CSSProperties = {
    width:'100%', padding:'13px 16px',
    background:'rgba(255,255,255,.025)',
    border:'1px solid var(--border)',
    color:'var(--text)',
    fontFamily:'JetBrains Mono, monospace',
    fontSize:13, outline:'none',
    transition:'border-color .2s',
  }

  const infoRows = [
    { icon: Mail,     label: 'Email',    val: profile.email,    href: `mailto:${profile.email}` },
    { icon: Link2, label: 'Facebook', val: 'nguyenkhacdanh.1010', href: profile.facebook },
    { icon: MapPin,   label: lang==='en' ? 'Location' : 'Địa chỉ', val: tr(t.contact.location, lang), href: null },
    { icon: Clock,    label: lang==='en' ? 'Timezone' : 'Múi giờ',  val: tr(t.contact.timezone, lang), href: null },
  ]

  return (
    <section id="contact">
      <div className="container">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <p className="section-tag">{tr(t.contact.tag, lang)}</p>
          <h2 style={{ marginBottom:14 }}>{tr(t.contact.title, lang)} <span className="stroke">Together</span></h2>
          <p style={{ color:'var(--muted)', fontSize:14, marginBottom:60, maxWidth:480 }}>{tr(t.contact.desc, lang)}</p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.6fr', gap:60, alignItems:'start' }}>
          {/* Info */}
          <motion.div initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
            {infoRows.map(({ icon: Icon, label, val, href }) => (
              <div key={label} style={{ display:'flex', gap:16, marginBottom:28, alignItems:'flex-start' }}>
                <div style={{ padding:11, border:'1px solid var(--border)', color:'var(--neon)', flexShrink:0 }}>
                  <Icon size={15} />
                </div>
                <div>
                  <div style={{ fontSize:9, letterSpacing:3, color:'var(--dim)', textTransform:'uppercase', marginBottom:4 }}>{label}</div>
                  {href
                    ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontSize:13, color:'var(--neon2)', transition:'color .2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color='var(--neon)')}
                        onMouseLeave={e => (e.currentTarget.style.color='var(--neon2)')}>{val}</a>
                    : <span style={{ fontSize:13 }}>{val}</span>
                  }
                </div>
              </div>
            ))}

            <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:.3 }}
              style={{ padding:20, border:'1px solid rgba(0,255,163,.18)', background:'rgba(0,255,163,.04)', marginTop:8 }}>
              <div style={{ fontSize:9, letterSpacing:3, color:'var(--neon)', textTransform:'uppercase', marginBottom:8 }}>
                {lang === 'en' ? 'Availability' : 'Tình trạng'}
              </div>
              <div style={{ fontSize:12, color:'var(--text)', lineHeight:1.7 }}>
                <span style={{ color:'var(--neon)', marginRight:8 }}>●</span>
                {tr(t.contact.available, lang)}
              </div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
            {status === 'sent' ? (
              <motion.div initial={{ opacity:0, scale:.92 }} animate={{ opacity:1, scale:1 }}
                style={{ padding:56, border:'1px solid var(--neon)', textAlign:'center' }}>
                <div style={{ fontSize:48, marginBottom:16 }}>✓</div>
                <h3 style={{ fontFamily:'Outfit,sans-serif', fontSize:26, marginBottom:10 }}>{tr(t.contact.sent, lang)}</h3>
                <p style={{ color:'var(--muted)', fontSize:13 }}>{tr(t.contact.sentSub, lang)}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
                  {[
                    { key:'name',  label:tr(t.contact.nameLbl,lang),  ph:tr(t.contact.namePh,lang),  type:'text'  },
                    { key:'email', label:tr(t.contact.emailLbl,lang),  ph:'you@example.com',           type:'email' },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ fontSize:9, letterSpacing:3, color:'var(--muted)', textTransform:'uppercase', display:'block', marginBottom:7 }}>{f.label}</label>
                      <input style={input} type={f.type} placeholder={f.ph} required
                        value={(form as any)[f.key]}
                        onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                        onFocus={e => (e.target.style.borderColor='var(--neon)')}
                        onBlur={e  => (e.target.style.borderColor='var(--border)')}
                      />
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom:20 }}>
                  <label style={{ fontSize:9, letterSpacing:3, color:'var(--muted)', textTransform:'uppercase', display:'block', marginBottom:7 }}>{tr(t.contact.msgLbl,lang)}</label>
                  <textarea style={{ ...input, minHeight:150, resize:'vertical' }}
                    placeholder={tr(t.contact.msgPh,lang)} required
                    value={form.message}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    onFocus={e => (e.target.style.borderColor='var(--neon)')}
                    onBlur={e  => (e.target.style.borderColor='var(--border)')}
                  />
                </div>
                <button type="submit" disabled={status==='sending'} className="btn-primary" style={{ width:'100%', justifyContent:'center' }}>
                  {status==='sending' ? tr(t.contact.sending,lang) : <><Send size={13} /> {tr(t.contact.send,lang)}</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
