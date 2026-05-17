import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, X, Play } from 'lucide-react'

const YOUTUBE_ID = 'F5tS5m86bOI'

export default function MusicPlayer() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position:'fixed', bottom:28, right:28, zIndex:7000 }}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, scale:.85, y:20 }}
            animate={{ opacity:1, scale:1, y:0 }}
            exit={{ opacity:0, scale:.85, y:20 }}
            transition={{ duration:.25 }}
            style={{
              position:'absolute', bottom:60, right:0,
              width:300, borderRadius:2,
              background:'rgba(8,12,19,.92)',
              border:'1px solid rgba(0,255,163,.25)',
              backdropFilter:'blur(16px)',
              overflow:'hidden',
              boxShadow:'0 20px 60px rgba(0,0,0,.6), 0 0 30px rgba(0,255,163,.08)',
            }}
          >
            {/* Header */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 14px', borderBottom:'1px solid rgba(0,255,163,.12)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--neon)', boxShadow:'0 0 8px var(--neon)', animation:'blink 1.4s step-end infinite', display:'inline-block' }} />
                <span style={{ fontSize:10, letterSpacing:2, color:'var(--neon)', textTransform:'uppercase' }}>Now Playing</span>
              </div>
              <button onClick={() => setOpen(false)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--muted)', padding:2, display:'flex' }}>
                <X size={14} />
              </button>
            </div>
            {/* YouTube embed */}
            <iframe
              width="300"
              height="168"
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&loop=1&playlist=${YOUTUBE_ID}`}
              title="NKD Music"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ display:'block' }}
            />
            <div style={{ padding:'10px 14px', fontSize:11, color:'var(--muted)', letterSpacing:.5 }}>
              🎵 {' '}
              <span style={{ color:'var(--text)' }}>Coding playlist</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale:1.1 }}
        whileTap={{ scale:.95 }}
        onClick={() => setOpen(v => !v)}
        style={{
          width:48, height:48, borderRadius:'50%',
          background: open ? 'var(--neon)' : 'rgba(0,255,163,.1)',
          border:'1px solid rgba(0,255,163,.35)',
          cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow: open ? '0 0 24px rgba(0,255,163,.5)' : '0 0 12px rgba(0,255,163,.15)',
          transition:'background .25s, box-shadow .25s',
          backdropFilter:'blur(8px)',
        }}
      >
        {open
          ? <X size={18} color="var(--bg)" />
          : (
            <motion.div animate={{ rotate:[0,0,5,-5,0] }} transition={{ repeat:Infinity, duration:2, repeatDelay:3 }}>
              {open ? <Play size={18} color="var(--neon)" /> : <Music size={18} color="var(--neon)" />}
            </motion.div>
          )
        }
      </motion.button>
    </div>
  )
}
