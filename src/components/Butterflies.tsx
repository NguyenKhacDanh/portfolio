import { useEffect, useRef } from 'react'

const css = `
@keyframes wing-left  { 0%,100%{ transform: rotateY(0deg)   scaleX(1)   } 50%{ transform: rotateY(60deg)  scaleX(0.3) } }
@keyframes wing-right { 0%,100%{ transform: rotateY(0deg)   scaleX(-1)  } 50%{ transform: rotateY(-60deg) scaleX(-0.3)} }

@keyframes fly-a {
  0%   { left:8%;  top:18%; }
  12%  { left:22%; top:12%; }
  25%  { left:40%; top:22%; }
  38%  { left:55%; top:14%; }
  50%  { left:50%; top:50%; }
  62%  { left:48%; top:52%; }
  75%  { left:50%; top:50%; }
  88%  { left:30%; top:30%; }
  100% { left:8%;  top:18%; }
}
@keyframes fly-b {
  0%   { left:88%; top:72%; }
  12%  { left:74%; top:78%; }
  25%  { left:60%; top:68%; }
  38%  { left:45%; top:76%; }
  50%  { left:50%; top:50%; }
  62%  { left:52%; top:48%; }
  75%  { left:50%; top:50%; }
  88%  { left:70%; top:70%; }
  100% { left:88%; top:72%; }
}

@keyframes fly-a-mobile {
  0%   { left:5%;  top:20%; }
  25%  { left:30%; top:12%; }
  50%  { left:48%; top:45%; }
  75%  { left:25%; top:35%; }
  100% { left:5%;  top:20%; }
}
@keyframes fly-b-mobile {
  0%   { left:85%; top:65%; }
  25%  { left:60%; top:72%; }
  50%  { left:52%; top:47%; }
  75%  { left:65%; top:60%; }
  100% { left:85%; top:65%; }
}

.butterfly        { position:fixed; pointer-events:none; z-index:5000; width:36px; height:36px; transform:translate(-50%,-50%); }
.butterfly-a      { animation: fly-a 18s ease-in-out infinite; }
.butterfly-b      { animation: fly-b 18s ease-in-out infinite; }
.butterfly-a.mob  { animation: fly-a-mobile 14s ease-in-out infinite; }
.butterfly-b.mob  { animation: fly-b-mobile 14s ease-in-out infinite; }

.wing { position:absolute; top:0; width:18px; height:28px; transform-origin: center; }
.wing-l { left:0;  transform-origin: right center; animation: wing-left  0.42s ease-in-out infinite; }
.wing-r { right:0; transform-origin: left center;  animation: wing-right 0.42s ease-in-out infinite; }
`

function ButterflyShape({ color, size = 36 }: { color: string; size?: number }) {
  const hw = size / 2
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow:'visible' }}>
      {/* Body */}
      <ellipse cx={hw} cy={hw} rx={2.5} ry={hw * 0.55} fill={color} opacity={0.9} />
      {/* Head */}
      <circle cx={hw} cy={hw * 0.28} r={3} fill={color} opacity={0.9} />
      {/* Antennae */}
      <line x1={hw} y1={hw * 0.28} x2={hw - 7} y2={4} stroke={color} strokeWidth={1} opacity={0.7} />
      <line x1={hw} y1={hw * 0.28} x2={hw + 7} y2={4} stroke={color} strokeWidth={1} opacity={0.7} />
      <circle cx={hw - 7} cy={4} r={1.5} fill={color} />
      <circle cx={hw + 7} cy={4} r={1.5} fill={color} />
      {/* Upper wings */}
      <ellipse cx={hw - 9} cy={hw * 0.55} rx={10} ry={12} fill={color} opacity={0.55} transform={`rotate(-18,${hw-9},${hw*0.55})`} />
      <ellipse cx={hw + 9} cy={hw * 0.55} rx={10} ry={12} fill={color} opacity={0.55} transform={`rotate(18,${hw+9},${hw*0.55})`} />
      {/* Lower wings */}
      <ellipse cx={hw - 8} cy={hw * 1.1} rx={8}  ry={9}  fill={color} opacity={0.4}  transform={`rotate(12,${hw-8},${hw*1.1})`} />
      <ellipse cx={hw + 8} cy={hw * 1.1} rx={8}  ry={9}  fill={color} opacity={0.4}  transform={`rotate(-12,${hw+8},${hw*1.1})`} />
      {/* Wing pattern dots */}
      <circle cx={hw - 9} cy={hw * 0.5} r={2} fill="white" opacity={0.3} />
      <circle cx={hw + 9} cy={hw * 0.5} r={2} fill="white" opacity={0.3} />
    </svg>
  )
}

export default function Butterflies() {
  const isMob = typeof window !== 'undefined' && window.innerWidth < 768
  const aRef = useRef<HTMLDivElement>(null)
  const bRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame: number
    const track = () => {
      if (!aRef.current || !bRef.current) { frame = requestAnimationFrame(track); return }
      const ar = aRef.current.getBoundingClientRect()
      const br = bRef.current.getBoundingClientRect()
      const ax = ar.left + ar.width  / 2
      const ay = ar.top  + ar.height / 2
      const bx = br.left + br.width  / 2
      const by = br.top  + br.height / 2
      const dist = Math.sqrt((ax-bx)**2 + (ay-by)**2)
      const alpha = Math.max(0, Math.min(0.7, (160 - dist) / 160))
      aRef.current.style.filter = dist < 60
        ? `drop-shadow(0 0 8px #f472b6) drop-shadow(0 0 20px #f472b6)`
        : `drop-shadow(0 0 4px #f472b6aa)`
      bRef.current.style.filter = dist < 60
        ? `drop-shadow(0 0 8px #c084fc) drop-shadow(0 0 20px #c084fc)`
        : `drop-shadow(0 0 4px #c084fcaa)`
      void alpha
      frame = requestAnimationFrame(track)
    }
    frame = requestAnimationFrame(track)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <>
      <style>{css}</style>
      <div ref={aRef} className={`butterfly butterfly-a${isMob ? ' mob' : ''}`}>
        <ButterflyShape color="#f472b6" size={isMob ? 28 : 36} />
      </div>
      <div ref={bRef} className={`butterfly butterfly-b${isMob ? ' mob' : ''}`}>
        <ButterflyShape color="#c084fc" size={isMob ? 28 : 36} />
      </div>
    </>
  )
}
