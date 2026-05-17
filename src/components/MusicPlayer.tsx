import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, X } from 'lucide-react'

const YOUTUBE_ID = 'F5tS5m86bOI'

const css = `
@keyframes music-ring {
  0%   { transform: translate(-50%, -50%) scale(1);   opacity: .5; }
  100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0;  }
}
@keyframes note-float {
  0%   { transform: translateY(0)    opacity: 1; }
  100% { transform: translateY(-28px); opacity: 0; }
}
`

export default function MusicPlayer() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position:'fixed', bottom:24, right:24, zIndex:7000 }}>
      <style>{css}</style>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, scale:.85, y:16 }}
            animate={{ opacity:1, scale:1, y:0 }}
            exit={{ opacity:0, scale:.85, y:16 }}
            transition={{ duration:.22 }}
            style={{
              position:'absolute', bottom:68, right:0,
              width:300,
              background:'rgba(5,8,13,.95)',
              border:'1px solid rgba(0,255,163,.3)',
              backdropFilter:'blur(20px)',
              overflow:'hidden',
              boxShadow:'0 24px 64px rgba(0,0,0,.7), 0 0 40px rgba(0,255,163,.1)',
            }}
          >
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 14px', borderBottom:'1px solid rgba(0,255,163,.12)', background:'rgba(0,255,163,.04)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--neon)', boxShadow:'0 0 8px var(--neon)', animation:'blink 1.4s step-end infinite', display:'inline-block' }} />
                <span style={{ fontSize:10, letterSpacing:2, color:'var(--neon)', textTransform:'uppercase' }}>Now Playing</span>
              </div>
              <button onClick={() => setOpen(false)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--muted)', padding:2, display:'flex' }}>
                <X size={14} />
              </button>
            </div>

            <iframe
              width="300" height="170"
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&loop=1&playlist=${YOUTUBE_ID}`}
              title="NKD Music"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ display:'block' }}
            />

            <div style={{ padding:'10px 14px', fontSize:11, color:'var(--muted)', background:'rgba(0,0,0,.3)' }}>
              🎵 <span style={{ color:'var(--text)' }}>Coding playlist · Danh's pick</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulsing ring (only when closed) */}
      {!open && (
        <>
          <span style={{
            position:'absolute', top:'50%', left:'50%',
            width:48, height:48, borderRadius:'50%',
            border:'1px solid rgba(0,255,163,.5)',
            animation:'music-ring 1.8s ease-out infinite',
            pointerEvents:'none',
          }} />
          <span style={{
            position:'absolute', top:'50%', left:'50%',
            width:48, height:48, borderRadius:'50%',
            border:'1px solid rgba(0,255,163,.3)',
            animation:'music-ring 1.8s ease-out infinite .6s',
            pointerEvents:'none',
          }} />
        </>
      )}

      {/* Main button */}
      <motion.button
        whileHover={{ scale:1.12 }}
        whileTap={{ scale:.92 }}
        onClick={() => setOpen(v => !v)}
        title="🎵 Music Player"
        style={{
          width:48, height:48, borderRadius:'50%',
          background: open ? 'var(--neon)' : 'rgba(5,8,13,.9)',
          border:`1.5px solid ${open ? 'var(--neon)' : 'rgba(0,255,163,.5)'}`,
          cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow: open
            ? '0 0 30px rgba(0,255,163,.6)'
            : '0 0 16px rgba(0,255,163,.25)',
          backdropFilter:'blur(8px)',
          position:'relative', zIndex:1,
        }}
      >
        {open
          ? <X size={18} color="var(--bg)" />
          : <motion.div animate={{ rotate:[0,8,-8,0] }} transition={{ repeat:Infinity, duration:2.5, repeatDelay:2 }}>
              <Music size={18} color="var(--neon)" />
            </motion.div>
        }
      </motion.button>

      {/* Label */}
      {!open && (
        <motion.div
          initial={{ opacity:0, x:10 }}
          animate={{ opacity:1, x:0 }}
          style={{
            position:'absolute', right:58, top:'50%', transform:'translateY(-50%)',
            background:'rgba(5,8,13,.9)',
            border:'1px solid rgba(0,255,163,.25)',
            padding:'4px 10px',
            fontSize:9, letterSpacing:2, color:'var(--neon)', textTransform:'uppercase',
            whiteSpace:'nowrap', backdropFilter:'blur(8px)',
          }}
        >🎵 Music</motion.div>
      )}
    </div>
  )
}
