import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const duration = 1600
    const interval = 25
    const steps = duration / interval
    let step = 0
    const timer = setInterval(() => {
      step++
      const eased = 1 - Math.pow(1 - step / steps, 3)
      const progress = Math.min(Math.round(eased * 100), 100)
      setPct(progress)
      if (progress >= 100) {
        clearInterval(timer)
        setTimeout(() => {
          setExiting(true)
          setTimeout(onDone, 700)
        }, 250)
      }
    }, interval)
    return () => clearInterval(timer)
  }, [onDone])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9000,
            background: 'var(--bg)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            userSelect: 'none',
          }}
        >
          {/* Corner marks */}
          {[
            { top: 24, left: 24, borderTop: '1px solid', borderLeft: '1px solid' },
            { top: 24, right: 24, borderTop: '1px solid', borderRight: '1px solid' },
            { bottom: 24, left: 24, borderBottom: '1px solid', borderLeft: '1px solid' },
            { bottom: 24, right: 24, borderBottom: '1px solid', borderRight: '1px solid' },
          ].map((s, i) => (
            <div key={i} style={{
              position: 'absolute', width: 20, height: 20,
              borderColor: 'rgba(0,255,163,0.3)',
              ...s,
            }} />
          ))}

          <div style={{ textAlign: 'center' }}>
            {/* Big number */}
            <div style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(96px, 20vw, 180px)',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-6px',
              color: 'var(--neon)',
              textShadow: '0 0 80px rgba(0,255,163,0.25)',
              fontVariantNumeric: 'tabular-nums',
            }}>
              {pct.toString().padStart(2, '0')}
              <span style={{
                fontSize: '0.3em',
                color: 'rgba(0,255,163,0.5)',
                letterSpacing: 0,
                marginLeft: 4,
              }}>%</span>
            </div>

            {/* Label */}
            <div style={{
              marginTop: 20,
              fontSize: 10,
              letterSpacing: 5,
              color: 'var(--muted)',
              textTransform: 'uppercase',
            }}>
              NKD · Portfolio
            </div>

            {/* Progress line */}
            <div style={{
              marginTop: 36,
              width: 180,
              height: 1,
              background: 'var(--border)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0,
                background: 'linear-gradient(90deg, var(--neon), var(--neon2))',
                boxShadow: '0 0 12px var(--neon)',
                width: `${pct}%`,
                transition: 'width 0.025s linear',
              }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
