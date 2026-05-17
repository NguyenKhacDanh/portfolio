import { useEffect, useRef } from 'react'

/* ─── Color themes ─── */
interface Theme {
  inner: string; mid: string; outer: string; border: string
  lInner: string; lMid: string; lOuter: string
  vein: string; spot: string; body: string; glow: string
}

const BLUE: Theme = {
  inner: '#e0f7fa', mid: '#29b6f6', outer: '#1565c0', border: '#0a1f5c',
  lInner: '#e1f5fe', lMid: '#0288d1', lOuter: '#1a237e',
  vein: 'rgba(10,31,92,0.22)', spot: 'rgba(255,255,255,0.88)',
  body: '#1a1a2e', glow: '#29b6f6',
}
const PINK: Theme = {
  inner: '#fce4ec', mid: '#f48fb1', outer: '#c2185b', border: '#880e4f',
  lInner: '#fce4ec', lMid: '#e91e8c', lOuter: '#880e4f',
  vein: 'rgba(136,14,79,0.22)', spot: 'rgba(255,255,255,0.82)',
  body: '#2d1020', glow: '#f06292',
}

/* ─── Petal pool ─── */
interface Petal {
  x: number; y: number; vx: number; vy: number
  rot: number; vrot: number; sz: number; alpha: number
}

function makePetal(cw: number): Petal {
  return {
    x:    Math.random() * cw,
    y:   -20 - Math.random() * 200,
    vx:   (Math.random() - 0.5) * 0.8,
    vy:   0.5 + Math.random() * 1.1,
    rot:  Math.random() * Math.PI * 2,
    vrot: (Math.random() - 0.5) * 0.04,
    sz:   6 + Math.random() * 8,
    alpha:0.55 + Math.random() * 0.4,
  }
}

function drawPetal(ctx: CanvasRenderingContext2D, p: Petal) {
  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.rotate(p.rot)
  ctx.globalAlpha = p.alpha
  // Petal shape: oval with slight notch at top
  const s = p.sz
  ctx.beginPath()
  ctx.moveTo(0, -s)
  ctx.bezierCurveTo(-s * 0.6, -s * 1.2, -s * 1.4, -s * 0.3, -s * 1.3, s * 0.5)
  ctx.bezierCurveTo(-s * 1.1, s * 1.3, -s * 0.5, s * 1.6, 0, s * 1.6)
  ctx.bezierCurveTo(s * 0.5, s * 1.6, s * 1.1, s * 1.3, s * 1.3, s * 0.5)
  ctx.bezierCurveTo(s * 1.4, -s * 0.3, s * 0.6, -s * 1.2, 0, -s)
  ctx.closePath()
  const g = ctx.createRadialGradient(0, 0, s * 0.2, 0, s * 0.4, s * 1.4)
  g.addColorStop(0, '#fce4ec')
  g.addColorStop(0.5, '#f8bbd9')
  g.addColorStop(1, '#f48fb1')
  ctx.fillStyle = g
  ctx.fill()
  ctx.restore()
  ctx.globalAlpha = 1
}

/* ─── Wing drawing ─── */
function drawOneSide(ctx: CanvasRenderingContext2D, theme: Theme) {
  /* Upper wing ─ bezier path going to negative-x */
  const uw = new Path2D()
  uw.moveTo(0, 0)
  uw.bezierCurveTo(-2, -12, -10, -30, -20, -40)
  uw.bezierCurveTo(-26, -46, -38, -44, -46, -34)
  uw.bezierCurveTo(-54, -22, -52, -10, -44,  -3)
  uw.bezierCurveTo(-34,  6,  -16,  7,   0,   0)
  uw.closePath()

  /* dark border: draw slightly scaled-up version first */
  ctx.save(); ctx.scale(1.04, 1.04)
  ctx.fillStyle = theme.border; ctx.fill(uw)
  ctx.restore()

  /* main gradient */
  const g1 = ctx.createLinearGradient(-44, -36, 0, 0)
  g1.addColorStop(0, theme.border); g1.addColorStop(0.28, theme.outer)
  g1.addColorStop(0.60, theme.mid); g1.addColorStop(1,    theme.inner)
  ctx.fillStyle = g1; ctx.fill(uw)

  /* iridescent sheen */
  const g1s = ctx.createLinearGradient(-22, -42, -4, -4)
  g1s.addColorStop(0, 'rgba(255,255,255,0.30)'); g1s.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g1s; ctx.fill(uw)

  /* vein lines */
  ctx.strokeStyle = theme.vein; ctx.lineWidth = 0.9
  const veins: [number,number,number,number][] = [
    [-2,-6, -38,-24], [-3,-3, -46,-12], [-2, 2, -40,  4],
    [-2,-8, -20,-36], [-8,-4, -36,-30],
  ]
  for (const [x1,y1,x2,y2] of veins) {
    ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke()
  }

  /* margin spots */
  ctx.fillStyle = theme.spot
  const uspots = [[-44,-26],[-50,-14],[-52,-2],[-46, 6],[-38,10]]
  for (const [sx,sy] of uspots) {
    ctx.beginPath(); ctx.ellipse(sx*0.84,sy*0.84, 2.4,1.7, Math.atan2(sy+20,sx), 0, Math.PI*2)
    ctx.fill()
  }

  /* Lower wing */
  const lw = new Path2D()
  lw.moveTo(0, 4)
  lw.bezierCurveTo(-6, 12, -22, 18, -30, 26)
  lw.bezierCurveTo(-40, 36, -44, 52, -30, 58)
  lw.bezierCurveTo(-18, 64, -6, 56,  -2, 46)
  lw.bezierCurveTo( 0, 36,   0, 20,   0,  4)
  lw.closePath()

  ctx.save(); ctx.scale(1.04, 1.04)
  ctx.fillStyle = theme.border; ctx.fill(lw)
  ctx.restore()

  const g2 = ctx.createLinearGradient(-38, 52, 0, 4)
  g2.addColorStop(0, theme.lOuter); g2.addColorStop(0.4, theme.lMid); g2.addColorStop(1, theme.lInner)
  ctx.fillStyle = g2; ctx.fill(lw)

  const g2s = ctx.createLinearGradient(-16, 14, -4, 44)
  g2s.addColorStop(0, 'rgba(255,255,255,0.22)'); g2s.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g2s; ctx.fill(lw)

  ctx.strokeStyle = theme.vein; ctx.lineWidth = 0.9
  ctx.beginPath(); ctx.moveTo(-2,6); ctx.lineTo(-26,32); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(-2,6); ctx.lineTo(-36,18); ctx.stroke()

  ctx.fillStyle = theme.spot
  const lspots = [[-26,32],[-36,42],[-32,54],[-18,58]]
  for (const [sx,sy] of lspots) {
    ctx.beginPath(); ctx.ellipse(sx*0.85,sy*0.85,2,1.5,0,0,Math.PI*2); ctx.fill()
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

  /* right wings (behind left) */
  ctx.save(); ctx.scale(-flapScale, 1); drawOneSide(ctx, theme); ctx.restore()
  /* left wings (in front) */
  ctx.save(); ctx.scale( flapScale, 1); drawOneSide(ctx, theme); ctx.restore()

  /* body segments */
  for (let i = 0; i < 7; i++) {
    const r = 2.8 - i * 0.22
    ctx.beginPath(); ctx.ellipse(0, 8 + i * 4.5, r, r + 0.5, 0, 0, Math.PI * 2)
    ctx.fillStyle = theme.body; ctx.fill()
  }
  /* thorax */
  ctx.beginPath(); ctx.ellipse(0, -3, 4.5, 7, 0, 0, Math.PI * 2)
  ctx.fillStyle = theme.body; ctx.fill()
  /* head */
  ctx.beginPath(); ctx.arc(0, -13, 4, 0, Math.PI * 2)
  ctx.fillStyle = theme.body; ctx.fill()
  /* eyes */
  ctx.fillStyle = 'rgba(255,255,220,0.7)'
  ctx.beginPath(); ctx.arc(-2.2, -14.5, 1.3, 0, Math.PI * 2); ctx.fill()
  ctx.beginPath(); ctx.arc( 2.2, -14.5, 1.3, 0, Math.PI * 2); ctx.fill()
  /* antennae */
  ctx.lineWidth = 1.1; ctx.strokeStyle = theme.body
  for (const sx of [-1, 1]) {
    ctx.beginPath()
    ctx.moveTo(sx * 2, -16)
    ctx.bezierCurveTo(sx * 5, -26, sx * 10, -34, sx * 13, -40)
    ctx.stroke()
    ctx.beginPath(); ctx.arc(sx * 13, -40, 2.3, 0, Math.PI * 2)
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

    /* petals */
    const PETAL_COUNT = 28
    const petals: Petal[] = Array.from({ length: PETAL_COUNT }, () => {
      const p = makePetal(canvas.width); p.y = Math.random() * canvas.height; return p
    })

    /* flight paths */
    const pathA = (t: number) => ({
      x: 0.18 + 0.28 * Math.sin(t * 0.30) + 0.07 * Math.sin(t * 0.82),
      y: 0.22 + 0.20 * Math.cos(t * 0.24) + 0.05 * Math.cos(t * 0.70),
      a: Math.atan2(0.20 * -Math.sin(t*0.24)*0.24, 0.28 * Math.cos(t*0.30)*0.30),
    })
    const pathB = (t: number) => ({
      x: 0.82 - 0.28 * Math.sin(t * 0.30) - 0.07 * Math.sin(t * 0.82),
      y: 0.78 - 0.20 * Math.cos(t * 0.24) - 0.05 * Math.cos(t * 0.70),
      a: Math.PI + Math.atan2(0.20 * -Math.sin(t*0.24)*0.24, 0.28 * Math.cos(t*0.30)*0.30),
    })

    const frame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.011

      const isMob = canvas.width < 768
      const sz    = isMob ? 0.52 : 0.88

      /* petals */
      for (const p of petals) {
        p.x   += p.vx + Math.sin(t * 0.8 + p.rot) * 0.25
        p.y   += p.vy
        p.rot += p.vrot
        if (p.y > canvas.height + 30) { Object.assign(p, makePetal(canvas.width)) }
        drawPetal(ctx, p)
      }

      /* butterflies */
      const a  = pathA(t), b = pathB(t)
      const ax = a.x * canvas.width,  ay = a.y * canvas.height
      const bx = b.x * canvas.width,  by = b.y * canvas.height
      const dist = Math.hypot(ax - bx, ay - by)
      const flap  = Math.sin(t * 6.2) * 0.38 + 0.62   /* 0.24 → 1.0 */

      /* heart glow when close */
      if (dist < 200) {
        const a0 = (1 - dist / 200) * 0.45
        const mx = (ax + bx) / 2, my = (ay + by) / 2
        const grd = ctx.createRadialGradient(mx, my, 0, mx, my, 120)
        grd.addColorStop(0, `rgba(255,170,200,${a0})`); grd.addColorStop(1, 'rgba(255,170,200,0)')
        ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(mx, my, 120, 0, Math.PI * 2); ctx.fill()

        /* extra petals burst near meeting point */
        if (Math.sin(t * 10) > 0.92) {
          const pp = makePetal(canvas.width)
          pp.x = mx + (Math.random() - 0.5) * 60
          pp.y = my + (Math.random() - 0.5) * 60
          pp.sz = 4 + Math.random() * 5
          pp.vy = -0.8 - Math.random() * 1.5
          petals.push(pp)
          if (petals.length > PETAL_COUNT + 30) petals.splice(0, 1)
        }
      }

      /* blue butterfly */
      ctx.save()
      ctx.shadowBlur = dist < 200 ? 30 : 12
      ctx.shadowColor = BLUE.glow
      drawButterfly(ctx, ax, ay, a.a, flap, BLUE, sz)
      ctx.restore()

      /* pink butterfly */
      ctx.save()
      ctx.shadowBlur = dist < 200 ? 30 : 12
      ctx.shadowColor = PINK.glow
      drawButterfly(ctx, bx, by, b.a, flap + 0.3, PINK, sz)
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
