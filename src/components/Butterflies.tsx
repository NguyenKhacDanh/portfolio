import { useEffect, useRef } from 'react'

interface Theme {
  inner: string; mid: string; outer: string; border: string
  lInner: string; lMid: string; lOuter: string
  vein: string; spot: string; body: string; glow: string
}

const BLUE: Theme = {
  inner: '#e8f4ff', mid: '#38bdf8', outer: '#1565c0', border: '#0a1a4a',
  lInner: '#dbeafe', lMid: '#2563eb', lOuter: '#1e3a8a',
  vein: 'rgba(147,197,253,0.38)', spot: 'rgba(255,255,255,0.92)',
  body: '#1a1a2e', glow: '#38bdf8',
}
const PINK: Theme = {
  inner: '#fff0f6', mid: '#f472b6', outer: '#be185d', border: '#831843',
  lInner: '#fce7f3', lMid: '#ec4899', lOuter: '#9d174d',
  vein: 'rgba(249,168,212,0.38)', spot: 'rgba(255,255,255,0.88)',
  body: '#2d1020', glow: '#f472b6',
}

interface Petal {
  x: number; y: number; vx: number; vy: number
  rot: number; vrot: number; sz: number; alpha: number; wobble: number
}

function makePetal(cw: number): Petal {
  return {
    x:      Math.random() * cw,
    y:     -30 - Math.random() * 200,
    vx:     (Math.random() - 0.5) * 0.7,
    vy:     0.55 + Math.random() * 1.1,
    rot:    Math.random() * Math.PI * 2,
    vrot:   (Math.random() - 0.5) * 0.04,
    sz:     11 + Math.random() * 13,
    alpha:  0.55 + Math.random() * 0.40,
    wobble: Math.random() * Math.PI * 2,
  }
}

function drawPetal(ctx: CanvasRenderingContext2D, p: Petal) {
  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.rotate(p.rot)
  ctx.globalAlpha = p.alpha
  const s = p.sz

  // Cherry blossom petal: rounded oval with notch at tip
  ctx.beginPath()
  ctx.moveTo(-s * 0.18, -s * 0.12)           // top notch left
  ctx.bezierCurveTo(-s * 0.55, -s * 0.95, -s * 1.15, -s * 0.55, -s, s * 0.10)
  ctx.bezierCurveTo(-s * 0.82, s * 0.72, -s * 0.38, s * 1.15, 0, s * 1.15)
  ctx.bezierCurveTo(s * 0.38, s * 1.15, s * 0.82, s * 0.72, s, s * 0.10)
  ctx.bezierCurveTo(s * 1.15, -s * 0.55, s * 0.55, -s * 0.95, s * 0.18, -s * 0.12)
  ctx.closePath()

  const g = ctx.createRadialGradient(0, s * 0.35, 0, 0, s * 0.35, s * 1.3)
  g.addColorStop(0,    'rgba(255,232,242,1)')
  g.addColorStop(0.42, 'rgba(255,185,215,0.95)')
  g.addColorStop(1,    'rgba(225, 90,140,0.55)')
  ctx.fillStyle = g
  ctx.fill()

  // Center vein
  ctx.strokeStyle = 'rgba(200,90,135,0.22)'
  ctx.lineWidth = 0.7
  ctx.beginPath(); ctx.moveTo(0, -s * 0.05); ctx.lineTo(0, s * 1.0); ctx.stroke()

  ctx.restore()
  ctx.globalAlpha = 1
}

/* ─── Wing drawing ─── */
function drawOneSide(ctx: CanvasRenderingContext2D, theme: Theme) {
  // Upper forewing — large, sweeping to negative-x
  const uw = new Path2D()
  uw.moveTo(0, 0)
  uw.bezierCurveTo(-18, -42, -65, -115, -138, -148)
  uw.bezierCurveTo(-182, -168, -242, -156, -258, -100)
  uw.bezierCurveTo(-270, -52, -248, 2, -196, 26)
  uw.bezierCurveTo(-150, 48, -82, 48, -38, 27)
  uw.bezierCurveTo(-16, 17, -4, 7, 0, 0)
  uw.closePath()

  // Dark border (slightly scaled up)
  ctx.save(); ctx.scale(1.035, 1.035)
  ctx.fillStyle = theme.border; ctx.fill(uw)
  ctx.restore()

  // Main wing gradient
  const g1 = ctx.createLinearGradient(-248, -115, 0, 0)
  g1.addColorStop(0,    theme.border)
  g1.addColorStop(0.18, theme.outer)
  g1.addColorStop(0.54, theme.mid)
  g1.addColorStop(1,    theme.inner)
  ctx.fillStyle = g1; ctx.fill(uw)

  // Iridescent sheen
  const g1s = ctx.createLinearGradient(-110, -150, -18, -8)
  g1s.addColorStop(0, 'rgba(255,255,255,0.38)')
  g1s.addColorStop(0.5,'rgba(255,255,255,0.10)')
  g1s.addColorStop(1,  'rgba(255,255,255,0)')
  ctx.fillStyle = g1s; ctx.fill(uw)

  // Vein lines
  ctx.strokeStyle = theme.vein; ctx.lineWidth = 1.1
  const veins: [number,number,number,number][] = [
    [-4,-7, -196,-72], [-4,-3, -238,-26], [-3, 5, -206, 22],
    [-7,-12,-96,-142],  [-11,-5,-175,-128], [-5,-1,-254,-52],
  ]
  for (const [x1,y1,x2,y2] of veins) {
    ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke()
  }

  // Margin spots
  ctx.fillStyle = theme.spot
  for (const [sx,sy,sr] of [
    [-212,-88,4], [-238,-44,3.5], [-252,-4,3.2], [-238,18,3],
    [-205,28,2.8],[-165,36,2.5], [-126,43,2.5],[-88,45,2],
  ] as [number,number,number][]) {
    ctx.beginPath(); ctx.arc(sx, sy, sr, 0, Math.PI*2); ctx.fill()
  }

  // Lower hindwing
  const lw = new Path2D()
  lw.moveTo(0, 12)
  lw.bezierCurveTo(-28, 54, -82, 88, -128, 118)
  lw.bezierCurveTo(-168, 146, -192, 188, -162, 224)
  lw.bezierCurveTo(-135, 254, -86, 252, -46, 224)
  lw.bezierCurveTo(-12, 200, 6, 156, 8, 98)
  lw.bezierCurveTo(10, 52, 5, 24, 0, 12)
  lw.closePath()

  ctx.save(); ctx.scale(1.035, 1.035)
  ctx.fillStyle = theme.border; ctx.fill(lw)
  ctx.restore()

  const g2 = ctx.createLinearGradient(-168, 218, 0, 12)
  g2.addColorStop(0, theme.lOuter); g2.addColorStop(0.35, theme.lMid); g2.addColorStop(1, theme.lInner)
  ctx.fillStyle = g2; ctx.fill(lw)

  const g2s = ctx.createLinearGradient(-58, 18, -10, 160)
  g2s.addColorStop(0, 'rgba(255,255,255,0.28)'); g2s.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g2s; ctx.fill(lw)

  ctx.strokeStyle = theme.vein; ctx.lineWidth = 1.1
  ctx.beginPath(); ctx.moveTo(-4,14); ctx.lineTo(-136,158); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(-4,14); ctx.lineTo(-178, 98); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(-4,14); ctx.lineTo(-98,198); ctx.stroke()

  ctx.fillStyle = theme.spot
  for (const [sx,sy,sr] of [
    [-142,152,3], [-166,188,2.8], [-156,218,3], [-118,238,2.5], [-78,245,2.2],
  ] as [number,number,number][]) {
    ctx.beginPath(); ctx.arc(sx, sy, sr, 0, Math.PI*2); ctx.fill()
  }
}

function drawButterfly(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, angle: number,
  flapScale: number, theme: Theme, size: number
) {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate(angle)
  ctx.scale(size, size)

  // Right wings (behind)
  ctx.save(); ctx.scale(-flapScale, 1); drawOneSide(ctx, theme); ctx.restore()
  // Left wings (front)
  ctx.save(); ctx.scale( flapScale, 1); drawOneSide(ctx, theme); ctx.restore()

  // Body segments
  for (let i = 0; i < 9; i++) {
    const r = 5 - i * 0.3
    ctx.beginPath(); ctx.ellipse(0, 15 + i * 8, r, r + 1, 0, 0, Math.PI * 2)
    ctx.fillStyle = theme.body; ctx.fill()
  }
  // Thorax
  ctx.beginPath(); ctx.ellipse(0, -4, 7, 12, 0, 0, Math.PI * 2)
  ctx.fillStyle = theme.body; ctx.fill()
  // Head
  ctx.beginPath(); ctx.arc(0, -20, 6.5, 0, Math.PI * 2)
  ctx.fillStyle = theme.body; ctx.fill()
  // Eyes
  ctx.fillStyle = 'rgba(255,255,200,0.75)'
  ctx.beginPath(); ctx.arc(-3, -22, 2, 0, Math.PI * 2); ctx.fill()
  ctx.beginPath(); ctx.arc( 3, -22, 2, 0, Math.PI * 2); ctx.fill()
  // Antennae
  ctx.lineWidth = 1.5; ctx.strokeStyle = theme.body
  for (const sx of [-1, 1]) {
    ctx.beginPath()
    ctx.moveTo(sx * 3, -25)
    ctx.bezierCurveTo(sx * 8, -42, sx * 16, -58, sx * 22, -68)
    ctx.stroke()
    ctx.beginPath(); ctx.arc(sx * 22, -68, 3.5, 0, Math.PI * 2)
    ctx.fillStyle = theme.body; ctx.fill()
  }

  ctx.restore()
}

/* ─── Main component ─── */
export default function Butterflies() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx    = canvas.getContext('2d')!
    let animId: number
    let t = 0

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const PETAL_COUNT = 32
    const petals: Petal[] = Array.from({ length: PETAL_COUNT }, () => {
      const p = makePetal(canvas.width); p.y = Math.random() * canvas.height; return p
    })

    const pathA = (t: number) => ({
      x: 0.18 + 0.26 * Math.sin(t * 0.28) + 0.06 * Math.sin(t * 0.75),
      y: 0.25 + 0.18 * Math.cos(t * 0.22) + 0.04 * Math.cos(t * 0.65),
      a: Math.atan2(0.18 * -Math.sin(t*0.22)*0.22, 0.26 * Math.cos(t*0.28)*0.28),
    })
    const pathB = (t: number) => ({
      x: 0.82 - 0.26 * Math.sin(t * 0.28) - 0.06 * Math.sin(t * 0.75),
      y: 0.75 - 0.18 * Math.cos(t * 0.22) - 0.04 * Math.cos(t * 0.65),
      a: Math.PI + Math.atan2(0.18 * -Math.sin(t*0.22)*0.22, 0.26 * Math.cos(t*0.28)*0.28),
    })

    const frame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.010

      const isMob = canvas.width < 768
      const sz    = isMob ? 0.22 : 0.44

      // Petals
      for (const p of petals) {
        p.wobble += 0.038
        p.x   += p.vx + Math.sin(p.wobble) * 0.45
        p.y   += p.vy
        p.rot += p.vrot
        if (p.y > canvas.height + 40) { Object.assign(p, makePetal(canvas.width)) }
        drawPetal(ctx, p)
      }

      const a  = pathA(t), b = pathB(t)
      const ax = a.x * canvas.width,  ay = a.y * canvas.height
      const bx = b.x * canvas.width,  by = b.y * canvas.height
      const dist = Math.hypot(ax - bx, ay - by)
      const flap = Math.sin(t * 5.8) * 0.36 + 0.64

      // Heart glow when close
      if (dist < 260) {
        const a0 = (1 - dist / 260) * 0.50
        const mx = (ax + bx) / 2, my = (ay + by) / 2
        const grd = ctx.createRadialGradient(mx, my, 0, mx, my, 160)
        grd.addColorStop(0, `rgba(255,160,200,${a0})`); grd.addColorStop(1, 'rgba(255,160,200,0)')
        ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(mx, my, 160, 0, Math.PI * 2); ctx.fill()

        if (Math.sin(t * 9) > 0.90) {
          const pp = makePetal(canvas.width)
          pp.x  = mx + (Math.random() - 0.5) * 80
          pp.y  = my + (Math.random() - 0.5) * 80
          pp.sz = 8 + Math.random() * 8
          pp.vy = -1.2 - Math.random() * 2
          petals.push(pp)
          if (petals.length > PETAL_COUNT + 40) petals.splice(0, 1)
        }
      }

      // Blue butterfly
      ctx.save()
      ctx.shadowBlur  = dist < 260 ? 45 : 20
      ctx.shadowColor = BLUE.glow
      drawButterfly(ctx, ax, ay, a.a, flap, BLUE, sz)
      ctx.restore()

      // Pink butterfly
      ctx.save()
      ctx.shadowBlur  = dist < 260 ? 45 : 20
      ctx.shadowColor = PINK.glow
      drawButterfly(ctx, bx, by, b.a, flap + 0.25, PINK, sz)
      ctx.restore()

      animId = requestAnimationFrame(frame)
    }

    frame()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId) }
  }, [])

  return (
    <canvas ref={ref} style={{
      position: 'fixed', inset: 0, width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 5000,
    }} />
  )
}
