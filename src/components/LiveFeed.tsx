import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Rss, ExternalLink } from 'lucide-react'
import { useIsMobile } from '../hooks/useIsMobile'

interface Coin {
  id: string
  symbol: string
  current_price: number
  price_change_percentage_24h: number
}

interface NewsItem {
  title: string
  link: string
  pubDate: string
}

const COINS = 'bitcoin,ethereum,binancecoin,solana'
const COIN_LABELS: Record<string, string> = { bitcoin:'BTC', ethereum:'ETH', binancecoin:'BNB', solana:'SOL' }

export default function LiveFeed({ lang }: { lang: 'en' | 'vi' }) {
  const isMobile = useIsMobile()
  const [coins,     setCoins]     = useState<Coin[]>([])
  const [news,      setNews]      = useState<NewsItem[]>([])
  const [coinErr,   setCoinErr]   = useState(false)
  const [newsErr,   setNewsErr]   = useState(false)
  const [coinLoad,  setCoinLoad]  = useState(true)
  const [newsLoad,  setNewsLoad]  = useState(true)

  const fetchCoins = async () => {
    try {
      const r = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COINS}&order=market_cap_desc&per_page=4&page=1&price_change_percentage=24h`
      )
      if (!r.ok) throw new Error()
      setCoins(await r.json())
      setCoinErr(false)
    } catch {
      setCoinErr(true)
    } finally {
      setCoinLoad(false)
    }
  }

  const fetchNews = async () => {
    try {
      const r = await fetch(
        'https://api.rss2json.com/v1/api.json?rss_url=https://feeds.feedburner.com/TechCrunch&count=5'
      )
      if (!r.ok) throw new Error()
      const data = await r.json()
      setNews((data.items || []).slice(0, 5).map((it: any) => ({
        title: it.title,
        link:  it.link,
        pubDate: it.pubDate?.slice(0, 10) ?? '',
      })))
      setNewsErr(false)
    } catch {
      setNewsErr(true)
    } finally {
      setNewsLoad(false)
    }
  }

  useEffect(() => {
    fetchCoins()
    fetchNews()
    const t = setInterval(fetchCoins, 60_000)
    return () => clearInterval(t)
  }, [])

  const fmt = (n: number) =>
    n >= 1000 ? `$${(n / 1000).toFixed(2)}k` : `$${n.toLocaleString('en-US', { maximumFractionDigits: 2 })}`

  return (
    <section id="live" style={{ background:'var(--bg)', borderTop:'1px solid var(--border)' }}>
      <div className="container">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <p className="section-tag">
            {lang==='en'?'Live Data':'Dữ liệu trực tiếp'}
          </p>
          <h2 style={{ marginBottom:14 }}>
            {lang==='en'?'Market':'Thị trường'}{' '}
            <span className="stroke">{lang==='en'?'& News':'& Tin tức'}</span>
          </h2>
          <p style={{ color:'var(--muted)', fontSize:14, marginBottom:48, maxWidth:480 }}>
            {lang==='en'
              ? 'Live crypto prices (CoinGecko) and latest tech news.'
              : 'Giá crypto trực tiếp (CoinGecko) và tin công nghệ mới nhất.'}
          </p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.4fr', gap:32 }}>

          {/* === CRYPTO === */}
          <div>
            <div style={{ fontSize:9, letterSpacing:4, color:'var(--neon)', textTransform:'uppercase', marginBottom:16, display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--neon)', boxShadow:'0 0 6px var(--neon)', animation:'blink 1.4s step-end infinite', display:'inline-block' }} />
              {lang==='en'?'Crypto — Live':'Tiền mã hóa — Trực tiếp'}
            </div>

            {coinLoad ? (
              <div style={{ color:'var(--muted)', fontSize:12, padding:'32px 0' }}>Loading...</div>
            ) : coinErr ? (
              <div style={{ color:'var(--accent)', fontSize:12, padding:'32px 0' }}>
                {lang==='en'?'Unable to load prices':'Không tải được giá'}
              </div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {coins.map((c, i) => {
                  const up = c.price_change_percentage_24h >= 0
                  return (
                    <motion.div key={c.id}
                      initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
                      transition={{ delay: i * .08 }}
                      className="glow-card"
                      style={{ padding:'16px 20px', display:'flex', justifyContent:'space-between', alignItems:'center' }}
                    >
                      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                        <div style={{
                          width:36, height:36, borderRadius:'50%',
                          background: up ? 'rgba(0,255,163,.1)' : 'rgba(251,146,60,.1)',
                          border: `1px solid ${up?'rgba(0,255,163,.3)':'rgba(251,146,60,.3)'}`,
                          display:'flex', alignItems:'center', justifyContent:'center',
                          fontSize:14, fontWeight:700,
                          color: up ? 'var(--neon)' : 'var(--accent)',
                          fontFamily:'Outfit,sans-serif',
                        }}>
                          {COIN_LABELS[c.id] ?? c.symbol.toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontSize:13, fontWeight:700, fontFamily:'Outfit,sans-serif' }}>{fmt(c.current_price)}</div>
                          <div style={{ fontSize:9, letterSpacing:1, color:'var(--muted)', textTransform:'uppercase' }}>{c.id}</div>
                        </div>
                      </div>
                      <div style={{ display:'flex', alignItems:'center', gap:5, color: up?'var(--neon)':'var(--accent)', fontSize:13, fontWeight:700 }}>
                        {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {up?'+':''}{c.price_change_percentage_24h.toFixed(2)}%
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}

            <div style={{ fontSize:9, letterSpacing:1, color:'var(--dim)', marginTop:12 }}>
              {lang==='en'?'Source: CoinGecko · auto-refresh 60s':'Nguồn: CoinGecko · tự làm mới 60s'}
            </div>
          </div>

          {/* === NEWS === */}
          <div>
            <div style={{ fontSize:9, letterSpacing:4, color:'var(--neon2)', textTransform:'uppercase', marginBottom:16, display:'flex', alignItems:'center', gap:10 }}>
              <Rss size={10} color="var(--neon2)" />
              {lang==='en'?'Tech News — TechCrunch':'Tin công nghệ — TechCrunch'}
            </div>

            {newsLoad ? (
              <div style={{ color:'var(--muted)', fontSize:12, padding:'32px 0' }}>Loading...</div>
            ) : newsErr ? (
              <div style={{ color:'var(--accent)', fontSize:12, padding:'32px 0' }}>
                {lang==='en'?'Unable to load news':'Không tải được tin tức'}
              </div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {news.map((item, i) => (
                  <motion.a key={i}
                    href={item.link} target="_blank" rel="noopener noreferrer"
                    initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                    transition={{ delay: i * .07 }}
                    whileHover={{ x:4 }}
                    className="glow-card"
                    style={{ padding:'14px 18px', display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12, cursor:'pointer', textDecoration:'none' }}
                  >
                    <div style={{ flex:1 }}>
                      <p style={{ fontSize:13, color:'var(--text)', lineHeight:1.5, marginBottom:6 }}>{item.title}</p>
                      <span style={{ fontSize:9, letterSpacing:1, color:'var(--muted)' }}>{item.pubDate}</span>
                    </div>
                    <ExternalLink size={12} color="var(--muted)" style={{ flexShrink:0, marginTop:2 }} />
                  </motion.a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
