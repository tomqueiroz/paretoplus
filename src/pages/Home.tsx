import { useEffect, useRef, useState, useCallback } from 'react';
import { insertLead, insertExitLead } from '@/lib/supabase';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Calendar, ChevronDown, X, Award, Quote, Zap, Brain, Settings, Users } from 'lucide-react';
import { ParticleCanvas } from '@/components/ParticleCanvas';
import {
  WHATSAPP_URL, CALENDLY_URL, CASES, CLIENT_LOGOS, AWARDS, PARTNER_BADGES, KEY_STATS,
  scrollToSection,
} from '@/lib/index';

// ─── Design Tokens ────────────────────────────────────────────────────────────
const V = '#6C63FF';   // violet
const C = '#00D4FF';   // cyan
const A = '#FF6B35';   // amber
const BG = '#0B0D14';
const S1 = '#12151F';
const S2 = '#1A1E2E';

const ease = [0.16, 1, 0.3, 1] as const;

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const staggerItem = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.94 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease } } };

// ─── Primitives ───────────────────────────────────────────────────────────────

function Mono({ children, color = C, size = 12 }: { children: React.ReactNode; color?: string; size?: number }) {
  return (
    <span className="eyebrow-text" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: size, fontWeight: 500, color, letterSpacing: '0.04em' }}>
      {children}
    </span>
  );
}

function EyebrowLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
      <div style={{ width: 20, height: 1, background: V, opacity: 0.7 }} />
      <Mono color={C} size={17}>{children}</Mono>
    </div>
  );
}

function H1({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <h1 style={{ fontFamily: "'Montserrat', 'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', letterSpacing: '-0.025em', lineHeight: 1.06, margin: 0, ...style }}>
      {children}
    </h1>
  );
}

function H2({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <h2 style={{ fontFamily: "'Montserrat', 'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.6rem, 3vw, 2.8rem)', letterSpacing: '-0.02em', lineHeight: 1.1, margin: 0, color: '#fff', ...style }}>
      {children}
    </h2>
  );
}

function H3({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', letterSpacing: '-0.015em', lineHeight: 1.25, margin: 0, color: '#fff', ...style }}>
      {children}
    </h3>
  );
}

function Body({ children, muted = false, style = {} }: { children: React.ReactNode; muted?: boolean; style?: React.CSSProperties }) {
  return (
    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.75, color: muted ? 'rgba(136,146,164,0.65)' : '#8892A4', margin: 0, fontWeight: 400, ...style }}>
      {children}
    </p>
  );
}

function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
      <div className={`section-divider ${inView ? 'animate' : ''}`} style={{ transition: 'opacity 0.3s ease', opacity: inView ? 0.4 : 0 }} />
    </div>
  );
}

function Reveal({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-6%' });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} className={className} style={style}>
      {children}
    </motion.div>
  );
}

function AnimatedNumber({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 2200; const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

// Lime-yellow brand color for primary CTAs
const LIME = '#C8F135';

function PrimaryBtn({ href, onClick, children }: { href?: string; onClick?: () => void; children: React.ReactNode }) {
  const base: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '12px 28px', borderRadius: 6, fontFamily: "'Inter', sans-serif",
    fontWeight: 700, fontSize: 14, color: '#0B0D14', textDecoration: 'none', cursor: 'pointer',
    background: LIME, border: 'none', boxShadow: '0 0 0 rgba(200,241,53,0)',
    transition: 'box-shadow 0.25s ease, transform 0.2s ease, background 0.2s ease',
  };
  const enter = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 28px rgba(200,241,53,0.45)';
    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
    (e.currentTarget as HTMLElement).style.background = '#d6f74a';
  };
  const leave = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 rgba(200,241,53,0)';
    (e.currentTarget as HTMLElement).style.transform = '';
    (e.currentTarget as HTMLElement).style.background = LIME;
  };
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" style={base} onMouseEnter={enter} onMouseLeave={leave}>{children}</a>;
  return <button onClick={onClick} style={base} onMouseEnter={enter} onMouseLeave={leave}>{children}</button>;
}

function GhostBtn({ href, onClick, children }: { href?: string; onClick?: () => void; children: React.ReactNode }) {
  const base: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '11px 24px', borderRadius: 6, fontFamily: "'Inter', sans-serif",
    fontWeight: 500, fontSize: 14, color: 'rgba(255,255,255,0.75)',
    textDecoration: 'none', cursor: 'pointer', background: 'rgba(108,99,255,0.05)',
    border: `1px solid rgba(108,99,255,0.25)`, transition: 'all 0.25s ease',
  };
  const enter = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.color = '#fff';
    (e.currentTarget as HTMLElement).style.borderColor = `rgba(108,99,255,0.5)`;
    (e.currentTarget as HTMLElement).style.background = 'rgba(108,99,255,0.10)';
  };
  const leave = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)';
    (e.currentTarget as HTMLElement).style.borderColor = `rgba(108,99,255,0.25)`;
    (e.currentTarget as HTMLElement).style.background = 'rgba(108,99,255,0.05)';
  };
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" style={base} onMouseEnter={enter} onMouseLeave={leave}>{children}</a>;
  return <button onClick={onClick} style={{ ...base, border: `1px solid rgba(108,99,255,0.25)` }} onMouseEnter={enter} onMouseLeave={leave}>{children}</button>;
}

function GlassCard({ children, style = {}, hover = true }: { children: React.ReactNode; style?: React.CSSProperties; hover?: boolean }) {
  return (
    <div className={hover ? 'glass-card' : ''} style={{
      background: 'rgba(18,21,31,0.80)', backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16,
      boxShadow: '0 8px 32px rgba(0,0,0,0.30), 0 1px 0 rgba(255,255,255,0.05) inset',
      ...style,
    }}>
      {children}
    </div>
  );
}

function IconBadge({ icon: Icon, color = V }: { icon: React.ElementType; color?: string }) {
  return (
    <div className="icon-badge" style={{ background: `linear-gradient(135deg, ${color}20, ${C}10)`, borderColor: `${color}30` }}>
      <Icon size={26} />
    </div>
  );
}

// 25 client logo paths
// 22 logos de clientes reais — excluindo plataformas (Spotify=2, Shopify=7, Coinbase=13)
const CLIENT_LOGO_IMGS = [
  '/images/hero-logos/coinbase.png',
  '/images/hero-logos/spotify.png',
  '/images/hero-logos/stone.png',
  '/images/hero-logos/mcd.png',
  '/images/hero-logos/shopify.png',
  '/images/hero-logos/flam.png',
  '/images/hero-logos/remax.png',
  '/images/hero-logos/epic.png',
  '/images/hero-logos/anima.png',
  '/images/hero-logos/sams.png',
  '/images/hero-logos/nivea.png',
  '/images/hero-logos/greenp.png',
  '/images/hero-logos/cea.png',
  '/images/hero-logos/wmc.png',
  '/images/hero-logos/universal.png',
  '/images/hero-logos/itau.png',
  '/images/hero-logos/sg.png',
  '/images/hero-logos/salta.png',
  '/images/hero-logos/publi.png',
  '/images/hero-logos/pepsi.png',
  '/images/hero-logos/hering.png',
  '/images/hero-logos/multip.png',
  '/images/hero-logos/nvidia.png',
  '/images/hero-logos/gpa.png',
];

function LogoMarqueeRow({ logos, reverse = false, speed = 55 }: { logos: string[]; reverse?: boolean; speed?: number }) {
  const doubled = [...logos, ...logos];
  return (
    <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}>
      <motion.div
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: 0, whiteSpace: 'nowrap', alignItems: 'center' }}>
        {doubled.map((src, i) => (
          <div key={i} className="marquee-card" style={{ flexShrink: 0, width: 220, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px', margin: '0 4px', borderRadius: 10, background: 'rgba(18,21,31,0.55)', border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.25s ease', cursor: 'default' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(108,99,255,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(108,99,255,0.22)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(18,21,31,0.55)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.05)'; }}>
            <img src={src} alt="" className="marquee-card-img" style={{ maxWidth: 180, maxHeight: 72, width: 'auto', height: 'auto', objectFit: 'contain', filter: 'grayscale(1) brightness(1.8)', opacity: 0.5, mixBlendMode: 'screen', transition: 'opacity 0.25s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '1'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0.5'; }} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Client name floating tags for hero right side
const CLIENT_NAMES = ['Itaú','Spotify','Stone','Epic Games','C&A','Animna','Shopify','WMcCann','UMG','RE/MAX','Greenpeace','NVIDIA','Coinbase','Grupo Salta','HERING','GPA','Saint-Gobain','Coinbase','Samsung','PepsiCo','Multiplan','Flamengo','Publicis','NIVEA','McDonald\'s'];

function ClientNamesBg() {
  const items = [
    { x: '54%', y: '9%',  name: 'NVIDIA',     delay: 0,   dur: 20 },
    { x: '72%', y: '5%',  name: 'Samsung',    delay: 1.2, dur: 18 },
    { x: '86%', y: '12%', name: 'Spotify',    delay: 2,   dur: 22 },
    { x: '58%', y: '28%', name: 'McDonald\'s', delay: 0.5, dur: 19 },
    { x: '76%', y: '24%', name: 'RE/MAX',     delay: 3,   dur: 24 },
    { x: '88%', y: '32%', name: 'Shopify',    delay: 1.5, dur: 21 },
    { x: '52%', y: '46%', name: 'PepsiCo',    delay: 2.8, dur: 17 },
    { x: '68%', y: '42%', name: 'HERING',     delay: 0.8, dur: 23 },
    { x: '84%', y: '48%', name: 'Flamengo',   delay: 1.8, dur: 20 },
    { x: '56%', y: '62%', name: 'Stone',      delay: 3.5, dur: 25 },
    { x: '74%', y: '58%', name: 'Publicis',   delay: 1,   dur: 18 },
    { x: '88%', y: '65%', name: 'Greenpeace', delay: 2.2, dur: 22 },
    { x: '62%', y: '76%', name: 'Itaú',       delay: 0.3, dur: 19 },
    { x: '80%', y: '74%', name: 'Epic Games', delay: 4,   dur: 21 },
    { x: '50%', y: '85%', name: 'NIVEA',      delay: 1.6, dur: 23 },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
      {items.map((item, i) => (
        <motion.div key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.22, 0.14, 0.22], y: [0, -12, 0] }}
          transition={{ opacity: { delay: item.delay + 0.6, duration: 2, repeat: Infinity, repeatDelay: 4 }, y: { duration: item.dur, repeat: Infinity, ease: 'easeInOut', delay: item.delay } }}
          style={{ position: 'absolute', left: item.x, top: item.y }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 500, color: 'rgba(200,241,53,0.55)', letterSpacing: '0.08em', whiteSpace: 'nowrap', textTransform: 'uppercase' }}>
            {item.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// 24 logos exatos enviados pelo usuário — nomes próprios, sem numeração
const HERO_LOGO_SRCS = [
  'coinbase','spotify','stone','mcd','shopify','flam','remax','epic',
  'anima','sams','nivea','greenp','cea','wmc','universal','itau',
  'sg','salta','publi','pepsi','hering','multip','nvidia','gpa',
].map((n) => `/images/hero-logos/${n}.png`);

function FloatingLogoBg() {
  // Hidden on mobile via CSS class
  const nodes = [
    // lado direito — toda a altura
    { x: '60%', y: '8%',  dur: 20, delay: 0.0, dy: 10 },
    { x: '74%', y: '5%',  dur: 23, delay: 1.3, dy: 8  },
    { x: '87%', y: '12%', dur: 18, delay: 0.6, dy: 12 },
    { x: '95%', y: '7%',  dur: 21, delay: 2.0, dy: 9  },
    { x: '67%', y: '20%', dur: 17, delay: 0.4, dy: 13 },
    { x: '81%', y: '26%', dur: 25, delay: 1.8, dy: 10 },
    { x: '92%', y: '21%', dur: 19, delay: 3.1, dy: 11 },
    { x: '58%', y: '34%', dur: 22, delay: 0.9, dy: 14 },
    { x: '72%', y: '40%', dur: 20, delay: 2.5, dy: 8  },
    { x: '85%', y: '35%', dur: 24, delay: 0.2, dy: 11 },
    { x: '96%', y: '44%', dur: 18, delay: 1.6, dy: 12 },
    { x: '64%', y: '53%', dur: 21, delay: 3.4, dy: 9  },
    { x: '78%', y: '58%', dur: 19, delay: 0.7, dy: 13 },
    { x: '91%', y: '51%', dur: 26, delay: 2.2, dy: 10 },
    { x: '57%', y: '65%', dur: 17, delay: 1.1, dy: 11 },
    { x: '71%', y: '70%', dur: 22, delay: 0.3, dy: 8  },
    { x: '84%', y: '75%', dur: 20, delay: 2.9, dy: 14 },
    { x: '95%', y: '80%', dur: 23, delay: 1.5, dy: 10 },
    { x: '66%', y: '85%', dur: 18, delay: 3.7, dy: 12 },
    { x: '80%', y: '88%', dur: 25, delay: 0.8, dy: 9  },
    // lado esquerdo — apenas abaixo do texto (y > 73%)
    { x: '7%',  y: '76%', dur: 21, delay: 2.3, dy: 11 },
    { x: '21%', y: '82%', dur: 19, delay: 1.0, dy: 10 },
    { x: '35%', y: '87%', dur: 24, delay: 3.2, dy: 13 },
    { x: '14%', y: '91%', dur: 22, delay: 2.7, dy: 10 },
  ];
  return (
    <div className="floating-logo-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 4 }}>
      {nodes.map((n, i) => (
        <motion.div key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5, y: [0, -n.dy, 0] }}
          transition={{
            opacity: { delay: n.delay + 0.8, duration: 1.0 },
            y: { duration: n.dur, repeat: Infinity, ease: 'easeInOut', delay: n.delay },
          }}
          style={{ position: 'absolute', left: n.x, top: n.y, transform: 'translate(-50%,-50%)', pointerEvents: 'none' }}>
          <img
            src={HERO_LOGO_SRCS[i]}
            alt=""
            style={{ width: 100, height: 'auto', maxHeight: 60, objectFit: 'contain', display: 'block' }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// ─── Parallax image strips ────────────────────────────────────────────────────

function ParallaxStrip({ img, height = 300, overlay, children }: {
  img: string; height?: number;
  overlay?: React.CSSProperties['background'];
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  return (
    <div ref={ref} style={{ position: 'relative', overflow: 'hidden', height }}>
      <motion.div style={{ y, position: 'absolute', inset: '-14% 0', height: '128%' }}>
        <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.32, filter: 'grayscale(0.5) contrast(1.1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: overlay ?? `linear-gradient(135deg, rgba(108,99,255,0.25) 0%, rgba(0,212,255,0.08) 100%)` }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, rgba(11,13,20,0.9) 0%, rgba(11,13,20,0.15) 50%, rgba(11,13,20,0.9) 100%)` }} />
      </motion.div>
      {children && (
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px', textAlign: 'center' }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Partner Badges Bar ───────────────────────────────────────────────────────

function BadgesBar() {
  return (
    <div style={{ background: 'rgba(12,14,22,0.9)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '14px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <Mono color="rgba(136,146,164,0.35)" size={10}>Parceiro oficial:</Mono>
        {PARTNER_BADGES.map((b) =>
          b.img ? (
            <div key={b.name} title={b.name}
              style={{ background: 'rgba(255,255,255,0.97)', borderRadius: 40, width: 54, height: 54, padding: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.5)', flexShrink: 0, transition: 'transform 0.2s ease, box-shadow 0.2s ease', cursor: 'default' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(108,99,255,0.3)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.5)'; }}>
              <img src={b.img} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

// ─── Exit Popup ───────────────────────────────────────────────────────────────

function ExitPopup({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [done, setDone] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await insertExitLead({ email, telefone: phone });
    setDone(true);
    setTimeout(onClose, 2800);
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, background: 'rgba(0,0,0,0.86)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}>
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.88, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'relative', width: '100%', maxWidth: 480, padding: 40, borderRadius: 20, background: S1, border: `1px solid rgba(108,99,255,0.45)`, boxShadow: `0 0 80px rgba(108,99,255,0.22)` }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer' }}>
          <X size={20} />
        </button>
        {!done ? (
          <>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 99, background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.22)', marginBottom: 20 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: C, display: 'inline-block' }} className="pulse-glow" />
              <Mono color={C} size={10}>Antes de sair</Mono>
            </div>
            <H3 style={{ marginBottom: 10 }}>Seu concorrente já agendou.<br /><span style={{ color: V }}>A janela está fechando.</span></H3>
            <Body style={{ marginBottom: 24 }}>Diagnóstico gratuito de 30 minutos: mapeamos onde a IA gera retorno imediato no seu negócio. Sem compromisso. Sem pitch genérico.</Body>
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="E-mail corporativo" autoFocus
                style={{ padding: '12px 16px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(108,99,255,0.25)', color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: 14, outline: 'none' }} />
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="WhatsApp com DDD"
                style={{ padding: '12px 16px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(108,99,255,0.15)', color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: 14, outline: 'none' }} />
              <button type="submit" style={{ padding: '13px', borderRadius: 8, background: V, color: '#fff', fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer', boxShadow: '0 0 24px rgba(108,99,255,0.35)' }}>
                Quero Meu Diagnóstico Gratuito
              </button>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(136,146,164,0.45)', textAlign: 'center' }}>Operações com múltiplos processos manuais · LGPD</p>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
            <H3 style={{ marginBottom: 8 }}>Recebemos seu contato!</H3>
            <Body>Um especialista Pareto entrará em contato em breve.</Body>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── CONTACT FORM → Supabase ──────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', challenge: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 16px', borderRadius: 8, boxSizing: 'border-box',
    background: 'rgba(18,21,31,0.8)', border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: 14, outline: 'none',
    transition: 'border-color 0.2s ease',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600,
    letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(136,146,164,0.7)',
    marginBottom: 6,
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const { error } = await insertLead({
        nome: form.name, empresa: form.company, email: form.email,
        telefone: form.phone, desafio: form.challenge,
        origem: 'pareto-plus-contact-form',
      });
      if (!error) { setStatus('success'); setForm({ name: '', company: '', email: '', phone: '', challenge: '' }); }
      else { setStatus('error'); }
    } catch { setStatus('error'); }
  };
  if (status === 'success') {
    return (
      <GlassCard style={{ padding: '48px 40px', textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
        <H3 style={{ marginBottom: 12 }}>Mensagem recebida!</H3>
        <Body muted>Nossa equipe vai entrar em contato em até 24h para agendar o diagnóstico. Fique atento ao seu e-mail ou WhatsApp.</Body>
        <div style={{ marginTop: 24 }}>
          <GhostBtn href={`https://wa.me/5511915513210?text=${encodeURIComponent('Olá! Acabei de preencher o formulário no site Pareto Plus.')}`}>Confirmar pelo WhatsApp <ArrowRight size={14} /></GhostBtn>
        </div>
      </GlassCard>
    );
  }
  return (
    <GlassCard style={{ padding: '44px 40px', maxWidth: 760, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <EyebrowLabel>Diagnóstico Gratuito</EyebrowLabel>
        <H3 style={{ marginBottom: 10, fontSize: 20 }}>Conte-nos sobre o seu negócio</H3>
        <Body muted>Em 24h um especialista entra em contato para entender seus desafios e mostrar como a IA pode transformar sua operação.</Body>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }} className="grid-cols-1 sm:grid-cols-2">
          <div>
            <label style={labelStyle}>Nome *</label>
            <input required name="name" value={form.name} onChange={handleChange} placeholder="Seu nome" style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(108,99,255,0.5)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }} />
          </div>
          <div>
            <label style={labelStyle}>Empresa *</label>
            <input required name="company" value={form.company} onChange={handleChange} placeholder="Nome da empresa" style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(108,99,255,0.5)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }} />
          </div>
          <div>
            <label style={labelStyle}>E-mail *</label>
            <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="seu@email.com" style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(108,99,255,0.5)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }} />
          </div>
          <div>
            <label style={labelStyle}>WhatsApp</label>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="+55 11 9 0000-0000" style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(108,99,255,0.5)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }} />
          </div>
        </div>
        <div style={{ marginBottom: 28 }}>
          <label style={labelStyle}>Seu maior desafio hoje</label>
          <textarea name="challenge" value={form.challenge} onChange={handleChange} rows={4}
            placeholder="Descreva brevemente: qual processo operacional mais consome tempo/custo na sua empresa?"
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(108,99,255,0.5)'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }} />
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <button type="submit" disabled={status === 'loading'} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 28px', borderRadius: 6, fontFamily: "'Inter', sans-serif",
            fontWeight: 700, fontSize: 14, color: '#0B0D14', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            background: status === 'loading' ? 'rgba(200,241,53,0.5)' : '#C8F135', border: 'none',
            transition: 'all 0.2s ease', opacity: status === 'loading' ? 0.7 : 1,
          }}>
            <Calendar size={15} /> {status === 'loading' ? 'Enviando…' : 'Solicitar Diagnóstico Gratuito'}
          </button>
          <Body muted style={{ fontSize: 12 }}>LGPD Compliant · 100% confidencial</Body>
        </div>
        {status === 'error' && <Body style={{ color: '#ff6b6b', marginTop: 12, fontSize: 13 }}>Erro ao enviar. Tente pelo WhatsApp: +55 11 91551-3210</Body>}
      </form>
    </GlassCard>
  );
}

// ─── BACK TO TOP ──────────────────────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Voltar ao topo"
          style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9999, width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #6C63FF, #00D4FF)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(108,99,255,0.45)', transition: 'transform 0.2s ease' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.12)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 12V4M4 8l4-4 4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 160]);
  const heroOpacity = useTransform(scrollY, [0, 380], [1, 0]);

  const [showExit, setShowExit] = useState(false);
  const exitFired = useRef(false);
  const onMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 5 && !exitFired.current) {
      if (!sessionStorage.getItem('pareto_exit')) { exitFired.current = true; setShowExit(true); }
    }
  }, []);
  useEffect(() => {
    const t = setTimeout(() => document.addEventListener('mouseleave', onMouseLeave), 12000);
    return () => { clearTimeout(t); document.removeEventListener('mouseleave', onMouseLeave); };
  }, [onMouseLeave]);
  const closeExit = () => { sessionStorage.setItem('pareto_exit', '1'); setShowExit(false); };

  const half = Math.ceil(CLIENT_LOGO_IMGS.length / 2);

  return (
    <>
      <AnimatePresence>{showExit && <ExitPopup onClose={closeExit} />}</AnimatePresence>

      <main style={{ background: BG, color: '#fff', fontFamily: "'Inter', sans-serif" }}>

        {/* ══════════════════════════════════════════════════════
            01 · HERO — Deep Space, Neural Network BG
        ══════════════════════════════════════════════════════ */}
        <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>

          {/* Layer 0: hero gradient */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0B0D14 0%, #1A1040 50%, #0D1929 100%)' }} />

          {/* Layer 1: logos dos clientes flutuando */}
          <FloatingLogoBg />

          {/* Layer 3: neural network lines */}
          <div style={{ position: 'absolute', inset: 0 }}><ParticleCanvas /></div>

          {/* Layer 2: data grid */}
          <div className="data-grid" />

          {/* Layer 4: glow orbs — subtle radial blurs only */}
          <div style={{ position: 'absolute', top: '8%', right: '12%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(108,99,255,0.13) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '15%', left: '5%', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,212,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '40%', left: '35%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,107,53,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

          {/* Layer 5: A10 logo grid — right side, white semi-transparent, behind neural lines */}
          <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: '48%', maxWidth: 720, pointerEvents: 'none', zIndex: 2 }}>
            <img
              src="/images/hero_logos_grid.png"
              alt=""
              style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'brightness(10) grayscale(1)', opacity: 0.055, maskImage: 'linear-gradient(to left, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' }}
            />
          </div>

          {/* Fade to next section */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 240, background: `linear-gradient(to bottom, transparent 0%, ${BG} 100%)`, pointerEvents: 'none' }} />

          {/* Hero content */}
          <motion.div style={{ opacity: heroOpacity, position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto', padding: '0 16px', width: '100%', paddingTop: 'clamp(90px, 18vw, 130px)' }}>
            <div style={{ maxWidth: 760 }}>

              {/* Eyebrow */}
              <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6, ease }}>
                <EyebrowLabel>IA Customizada para cada Negócio</EyebrowLabel>
              </motion.div>

              {/* H1 — AI First. GRANDE | H2 — 2026... MENOR */}
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.85, ease }}>
                <h1 className="hero-shimmer-text" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 'clamp(2.8rem, 6.3vw, 5.25rem)', letterSpacing: '-0.04em', lineHeight: 0.92, margin: '0 0 18px 0', display: 'block' }}>AI First.</h1>
                <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', letterSpacing: '-0.025em', lineHeight: 1.12, margin: '0 0 24px 0', color: '#fff' }}>2026 é o último ano<br />em que isso ainda é opcional.</h2>
              </motion.div>

              {/* Subline */}
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.7, ease }}>
                <Body style={{ fontSize: 16, lineHeight: 1.75, marginBottom: 36, maxWidth: 580, color: '#8892A4' }}>
                  A Pareto é a holding especializada em <span style={{ color: '#fff', fontWeight: 500 }}>IA Aplicada a Negócios</span> que opera desde 2013. Não entregamos aplicativos genéricos — entendemos a sua operação em profundidade e construímos inteligência integrada que reduz custo, acelera equipes e gera resultado mensurável, com os seus dados.
                </Body>
              </motion.div>

              {/* CTAs */}
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6, ease }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 32 }} className="cta-row">
                <PrimaryBtn href={CALENDLY_URL}>
                  <Calendar size={16} /> Agendar com Especialista
                </PrimaryBtn>
                <GhostBtn onClick={() => scrollToSection('resultados')}>
                  Principais cases <ArrowRight size={14} />
                </GhostBtn>
              </motion.div>



              {/* Trust badges */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }} className="badges-row">
                {['#6 G2 Best AI 2024', '16 Google Awards', '#1 Brasil Marketing IA', 'US$5M Seed 2025'].map((b) => (
                  <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 99, background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.2)' }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: C }} />
                    <Mono color="rgba(255,255,255,0.55)" size={10}>{b}</Mono>
                  </div>
                ))}
              </motion.div>
            </div>


          </motion.div>

          {/* Scroll down — fixed bottom of hero */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            onClick={() => scrollToSection('sobre-pareto')}
            style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
            <Mono color="rgba(255,255,255,0.3)" size={9}>scroll</Mono>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}>
              <ChevronDown size={20} style={{ color: 'rgba(200,241,53,0.6)' }} />
            </motion.div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════════════════
            01B · DECISÃO — Parallax logo após hero
        ══════════════════════════════════════════════════════ */}
        <ParallaxStrip img="/images/brazil_network.jpg" height={400} overlay="linear-gradient(to right, rgba(11,13,20,0.72) 0%, rgba(108,99,255,0.22) 50%, rgba(0,212,255,0.08) 100%)">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: 760 }}>
            <EyebrowLabel>Decisão</EyebrowLabel>
            <H1 style={{ fontSize: 'clamp(1.9rem, 4vw, 3.4rem)', lineHeight: 1.1, marginBottom: 0 }}>
              O Brasil de 2030 está sendo
              <br />construído agora.
              <br /><span className="hero-shimmer-text">Por quem decidiu em 2026.</span>
            </H1>
          </motion.div>
        </ParallaxStrip>

<SectionDivider />
        <section id="argumento" style={{ padding: '96px 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 50% at 20% 50%, rgba(108,99,255,0.07) 0%, transparent 70%)`, pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>

            <Reveal className="text-center" style={{ marginBottom: 64 }}>
              <EyebrowLabel>A Lógica Fria dos Números</EyebrowLabel>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 'clamp(4rem, 10vw, 8rem)', color: C, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 20 }}>
                71<span style={{ fontSize: '0.42em', verticalAlign: 'super' }}>%</span>
              </div>
              <H2 style={{ marginBottom: 16, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
                das empresas brasileiras não atingiram suas metas de marketing em 2024.
              </H2>
              <Body style={{ maxWidth: 520, margin: '0 auto', color: '#8892A4' }}>
                Não foi falta de esforço. Não foi falta de verba. Foi o modelo errado — construído para um mercado que não existe mais.
              </Body>
            </Reveal>

            {/* AI for Business cost cards */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} variants={stagger}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 64 }}>
              {[
                { stat: '3×',     label: 'Custo real por colaborador',         desc: 'Entre encargos, benefícios, rotatividade e gestão, o custo efetivo de um funcionário supera em 3× o salário bruto.', accent: V },
                { stat: '~40%',   label: 'Produtividade efetiva do time',      desc: 'Em média, 60% do expediente é consumido por tarefas repetitivas que a IA executa em segundos — a custo marginal zero.', accent: C },
                { stat: '6–12m',  label: 'Payback típico de automação com IA', desc: 'Implementações bem estruturadas atingem break-even em 6 a 12 meses, com resultados visíveis já nos primeiros sprints.', accent: A },
              ].map((c) => (
                <motion.div key={c.label} variants={staggerItem}>
                  <GlassCard style={{ padding: 28 }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 600, color: c.accent, letterSpacing: '-0.03em', marginBottom: 10 }}>
                      {c.stat}
                    </div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 14, color: '#fff', marginBottom: 10 }}>{c.label}</div>
                    <Body muted style={{ fontSize: 13 }}>{c.desc}</Body>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>

            {/* Shift cards */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} variants={stagger}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {[
                {
                  label: 'O modelo que virou commodity',
                  quote: '"Contrato uma agência, ela executa um playbook padrão, reporta métricas de vaidade."',
                  result: 'Resultado: o mesmo pacote vendido para 40 clientes do mesmo segmento. Diferencial zero.',
                  tone: 'dim',
                },
                {
                  label: 'O modelo que constrói vantagem',
                  quote: '"Implemento IA treinada nos meus dados, que aprende o meu negócio e melhora todo mês."',
                  result: 'Resultado: inteligência proprietária que nenhum concorrente pode replicar ou comprar pronta.',
                  tone: 'bright',
                },
                {
                  label: 'O que acontece a partir de 2027',
                  quote: '"O sistema opera enquanto meu time toma decisões — não executa tarefas manuais."',
                  result: 'Resultado: posição consolidada com vantagem composta. Gap intransponível para quem ficou parado.',
                  tone: 'urgent',
                },
              ].map((c) => (
                <motion.div key={c.label} variants={staggerItem}>
                  <GlassCard style={{
                    padding: 28, height: '100%',
                    background: c.tone === 'bright' ? 'rgba(108,99,255,0.08)' : c.tone === 'urgent' ? 'rgba(255,107,53,0.05)' : 'rgba(18,21,31,0.8)',
                    borderColor: c.tone === 'bright' ? 'rgba(108,99,255,0.35)' : c.tone === 'urgent' ? 'rgba(255,107,53,0.2)' : 'rgba(255,255,255,0.07)',
                  }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: c.tone === 'bright' ? V : c.tone === 'urgent' ? A : 'rgba(136,146,164,0.5)', marginBottom: 16 }}>
                      {c.label}
                    </div>
                    <blockquote style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 500, color: '#fff', lineHeight: 1.6, marginBottom: 14, fontStyle: 'italic' }}>
                      {c.quote}
                    </blockquote>
                    <Body muted style={{ fontSize: 12, color: c.tone === 'dim' ? 'rgba(255,100,100,0.65)' : 'rgba(136,146,164,0.7)' }}>{c.result}</Body>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Parallax: Escritório ──────────────────────────────── */}
        <ParallaxStrip img="/images/pareto_office1.png" height={300}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Mono color={V} size={10} >Pareto · São Paulo · Est. 2011</Mono>
            <H2 style={{ marginTop: 12, marginBottom: 10 }}>
              +160 especialistas.<br />
              <span style={{ color: C }}>Um único KPI: resultado financeiro.</span>
            </H2>
            <Body muted>300+ empresas transformadas · R$3B+ em mídia gerenciada · 13 anos de operação</Body>
          </motion.div>
        </ParallaxStrip>

        {/* ══════════════════════════════════════════════════════
            03 · O PROBLEMA — TRÊS CAMADAS DE PERDA
        ══════════════════════════════════════════════════════ */}
        <SectionDivider />
        {/* ══════════════════════════════════════════════════════
            02 · SOBRE A PARETO — Terceira dobra
        ══════════════════════════════════════════════════════ */}
        <section id="sobre-pareto" style={{ padding: '80px 24px 72px', position: 'relative', overflow: 'hidden', background: 'rgba(18,21,31,0.55)' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 55% at 80% 50%, rgba(108,99,255,0.09) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div className="data-grid" />
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(24px,5vw,64px)', alignItems: 'center' }} className="grid-cols-1 lg:grid-cols-2">

            {/* Left — texto */}
            <Reveal>
              <EyebrowLabel>Pareto · AI for Business</EyebrowLabel>
              <H2 style={{ marginBottom: 20 }}>
                <span className="gradient-text">Inteligência Artificial</span><br />
                como ativo estratégico.
              </H2>
              <Body style={{ fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>
                Expandindo internacionalmente com sua plataforma proprietária <span style={{ color: '#fff', fontWeight: 500 }}>Tess AI</span>, a Pareto implementa IA que gera retorno financeiro mensurável — não projetos-piloto sem fim. 13 anos de operação. 300+ empresas. Tess AI, a <span style={{ color: '#00D4FF', fontWeight: 500 }}>6ª melhor plataforma de IA do mundo</span> (G2 2024).
              </Body>

              {/* 4 ícones Premium — o que a Pareto faz */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, marginBottom: 32 }}>
                {[
                  { icon: '⚙️', label: 'Automação de Processos', desc: 'RPA, workflows e integrações 24/7 sem headcount extra' },
                  { icon: '🤖', label: 'AI Workers', desc: 'Colaboradores digitais com funções e reporte real' },
                  { icon: '🧠', label: 'Agentes Inteligentes', desc: 'IA generativa integrada ao seu ERP, CRM e dados' },
                  { icon: '🎯', label: 'AI Builders Alocados', desc: 'Time sênior embarcado com ROI rastreado por sprint' },
                ].map((item) => (
                  <GlassCard key={item.label} style={{ padding: '16px 18px', display: 'flex', gap: 12 }} hover={false}>
                    <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 12, color: '#fff', marginBottom: 3 }}>{item.label}</div>
                      <Body muted style={{ fontSize: 11 }}>{item.desc}</Body>
                    </div>
                  </GlassCard>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <PrimaryBtn href={CALENDLY_URL}><Calendar size={15} /> Agendar com Especialista</PrimaryBtn>
                <GhostBtn onClick={() => scrollToSection('solucoes')}>Ver soluções <ArrowRight size={13} /></GhostBtn>
              </div>
            </Reveal>

            {/* Right — visual metrics premium */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}
              style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Big stat card */}
              <GlassCard style={{ padding: '32px 36px', textAlign: 'center', background: 'rgba(108,99,255,0.07)', borderColor: 'rgba(108,99,255,0.3)' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 600, color: V, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 10 }}>
                  <AnimatedNumber value={285} suffix="%" />
                </div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 14, color: '#fff', marginBottom: 6 }}>ROI médio com stack de IA bem implementado</div>
                <Body muted style={{ fontSize: 12 }}>vs. abaixo do custo de aquisição sem IA estruturada</Body>
              </GlassCard>

              {/* 3 mini stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12 }}>
                {[
                  { v: '3×',   l: 'Custo real por colaborador',     c: V },
                  { v: '~40%', l: 'Tempo em tarefas repetitivas',   c: C },
                  { v: '12m',  l: 'Payback médio de automação IA',   c: A },
                ].map((s) => (
                  <GlassCard key={s.l} style={{ padding: '18px 14px', textAlign: 'center' }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4rem', fontWeight: 600, color: s.c, marginBottom: 6 }}>{s.v}</div>
                    <Body muted style={{ fontSize: 10, lineHeight: 1.45 }}>{s.l}</Body>
                  </GlassCard>
                ))}
              </div>

              {/* Tess AI badge */}
              <GlassCard style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `linear-gradient(135deg, ${V}25, ${C}12)`, border: `1px solid ${V}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>🏆</div>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, color: '#fff', marginBottom: 3 }}>Tess AI — G2 Best Software Awards 2024</div>
                  <Body muted style={{ fontSize: 12 }}>#6 Melhor IA do mundo · Acima do ChatGPT (#10) e Google Gemini (#22)</Body>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* ─── Partner Badges Bar ──────────────────────────── */}
        <BadgesBar />

        {/* ══════════════════════════════════════════════════════
            02 · O ARGUMENTO — A LÓGICA DOS NÚMEROS
        ══════════════════════════════════════════════════════ */}
        
        <section id="problema" style={{ padding: '96px 24px', position: 'relative', background: `${S1}80` }}>
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 70% 50% at 50% 100%, rgba(0,212,255,0.05) 0%, transparent 70%)`, pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Reveal style={{ textAlign: 'center', marginBottom: 64 }}>
              <EyebrowLabel>O Custo do Statu Quo</EyebrowLabel>
              <H2 style={{ marginBottom: 14 }}>Três camadas de perda.<br /><span style={{ color: C }}>Operacional, estratégica e existencial.</span></H2>
              <Body style={{ maxWidth: 540, margin: '0 auto' }}>
                O modelo de marketing e operações construído pré-2020 não foi projetado para o ambiente competitivo de 2026. Usar essa estrutura hoje é equivalente a competir com os recursos de uma geração anterior.
              </Body>
            </Reveal>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} variants={stagger}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
              {[
                {
                  num: '01', color: C, label: 'Agora',
                  title: 'Perda Operacional',
                  headline: 'Custos corrigíveis em 30 dias.',
                  items: [
                    'Leads não qualificados consomem mais de 60% do tempo da equipe de vendas',
                    'Resposta a novos contatos em horas — concorrente com IA responde em 2 minutos',
                    '35–50% da verba de mídia paga não gera pipeline comercial real',
                    'Produção de conteúdo manual: 4 peças/semana vs. 40 peças/semana com IA',
                  ],
                },
                {
                  num: '02', color: V, label: 'Acumulando',
                  title: 'Lacuna Estratégica',
                  headline: 'Um gap que compõe silenciosamente todo mês.',
                  items: [
                    'Cada mês, o sistema de IA do concorrente aprende mais sobre o mercado que você compartilha',
                    'ROI médio de stack com IA: 285%. ROI médio sem: abaixo do custo de aquisição',
                    'Mês 1: diferença de 5%. Mês 12: 65% de gap estrutural — e crescendo',
                    'Dados de comportamento de clientes gerados hoje não estarão disponíveis amanhã',
                  ],
                },
                {
                  num: '03', color: A, label: '2027–2030',
                  title: 'Risco de Mercado',
                  headline: 'A bifurcação que vai reorganizar cada setor.',
                  items: [
                    'IA não será diferencial em 2027 — será infraestrutura básica, como ter um site funcional',
                    'Empresas com inteligência operacional consolidada vão ditar precificação e condições do setor',
                    'A janela de first-mover no seu segmento já está parcialmente fechada — e fecha mais rápido a cada mês',
                    'Não é sobre tecnologia: é sobre qual empresa vai operar com 40% mais eficiência estrutural',
                  ],
                },
              ].map((s) => (
                <motion.div key={s.num} variants={staggerItem}>
                  <GlassCard style={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }} hover={false}>
                    <div style={{ padding: '24px 28px 16px', borderBottom: `1px solid ${s.color}18` }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 99, background: `${s.color}15`, color: s.color }}>{s.label}</span>
                        <Mono color={`${s.color}25`} size={20}>{s.num}</Mono>
                      </div>
                      <H3 style={{ marginBottom: 8 }}>{s.title}</H3>
                      <Body muted style={{ fontSize: 12, fontStyle: 'italic', color: `${s.color}80` }}>{s.headline}</Body>
                    </div>
                    <ul style={{ padding: '20px 28px', listStyle: 'none', margin: 0, display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
                      {s.items.map((item) => (
                        <li key={item} style={{ display: 'flex', gap: 10, fontFamily: "'Inter', sans-serif", fontSize: 13, lineHeight: 1.65, color: '#8892A4' }}>
                          <span style={{ flexShrink: 0, marginTop: 6, width: 5, height: 5, borderRadius: '50%', background: s.color, display: 'inline-block' }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>

            <Reveal style={{ textAlign: 'center', marginTop: 56 }}>
              <Body style={{ marginBottom: 28, maxWidth: 480, margin: '0 auto 28px', color: 'rgba(136,146,164,0.6)' }}>
                Se você identificou pelo menos dois desses padrões na sua operação, a próxima conversa importa.
              </Body>
              <PrimaryBtn href={CALENDLY_URL}><Calendar size={15} /> Diagnosticar Minha Operação</PrimaryBtn>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            04 · 4 SOLUÇÕES
        ══════════════════════════════════════════════════════ */}
        <SectionDivider />
        <section id="solucoes" style={{ padding: '96px 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: 0, top: 0, width: '40%', height: '100%', background: `radial-gradient(ellipse 80% 80% at 100% 40%, rgba(108,99,255,0.07) 0%, transparent 70%)`, pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Reveal style={{ textAlign: 'center', marginBottom: 64 }}>
              <EyebrowLabel>O que entregamos</EyebrowLabel>
              <H2 style={{ marginBottom: 14 }}>Quatro vetores de retorno sobre IA.<br /><span className="gradient-text">Todos com impacto mensurável.</span></H2>
              <Body style={{ maxWidth: 500, margin: '0 auto' }}>
                Cada solução é desenhada com um único critério de sucesso: gerar retorno financeiro comprovável — não impressionar em reuniões.
              </Body>
            </Reveal>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} variants={stagger}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 56 }}>
              {[
                { icon: Settings,  tag: 'Automation',  title: 'Processos Automatizados',  result: '→ Headcount operacional reduzido',  desc: 'Mapeamos onde o trabalho humano é substituível por sistemas 24/7. RPA, integrações e workflows inteligentes que não tiram férias, não adoecem e não pedem aumento.' },
                { icon: Users,     tag: 'AI Workers',   title: 'Colaboradores Digitais',    result: '→ Capacidade sem custo fixo',        desc: 'Agentes autônomos com funções, responsabilidades e reporte — equivalentes funcionais de um colaborador, disponíveis 24/7, sem vínculo CLT, sem turnover.' },
                { icon: Brain,     tag: 'AI Agents',    title: 'Agentes Inteligentes',      result: '→ Operações que raciocinam',         desc: 'IA generativa integrada ao seu ERP, CRM e fontes de dados. Fluxos que analisam, decidem e agem — treinados com o conhecimento específico da sua operação.' },
                { icon: Zap,       tag: 'AI Builders',  title: 'Equipe Alocada de IA',      result: '→ ROI rastreado por sprint',         desc: 'Especialistas sênior embarcados na sua empresa. Mapeamento por impacto financeiro, priorização sem achismo, implementação com entregáveis semanais.' },
              ].map((s) => (
                <motion.div key={s.tag} variants={staggerItem}>
                  <GlassCard style={{ padding: 26, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <IconBadge icon={s.icon} />
                    <div style={{ marginTop: 18, marginBottom: 10 }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 99, background: `${V}12`, color: V, border: `1px solid ${V}22` }}>
                        {s.tag}
                      </span>
                    </div>
                    <H3 style={{ fontSize: 15, marginBottom: 10 }}>{s.title}</H3>
                    <Body muted style={{ fontSize: 13, flex: 1, marginBottom: 16 }}>{s.desc}</Body>
                    <Mono color={C} size={11}>{s.result}</Mono>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>

            {/* How it works — 4 steps */}
            <Reveal style={{ textAlign: 'center', marginBottom: 28 }}>
              <EyebrowLabel>Do diagnóstico ao caixa</EyebrowLabel>
              <H3 style={{ marginBottom: 6 }}>4 etapas. Sem overhead desnecessário.</H3>
            </Reveal>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
              {[
                { n: '01', t: 'Diagnóstico',   d: '1–2 semanas. Imersão operacional real. Mapeamos custos ocultos e onde a IA gera retorno mais rápido.' },
                { n: '02', t: 'Priorização',   d: 'Selecionamos o que implementar primeiro com critério matemático: maior impacto, menor tempo.' },
                { n: '03', t: 'Implementação', d: 'Sprints com entregáveis concretos. Você acompanha em tempo real e aprova cada etapa.' },
                { n: '04', t: 'Escala',        d: 'Com resultados validados, expandimos para outras áreas sem aumentar o risco da operação.' },
              ].map((s) => (
                <motion.div key={s.n} variants={staggerItem}>
                  <GlassCard style={{ padding: '20px 18px' }} hover={false}>
                    <Mono color={V} size={11}>{s.n}</Mono>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14, color: '#fff', margin: '8px 0' }}>{s.t}</div>
                    <Body muted style={{ fontSize: 12 }}>{s.d}</Body>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Parallax quote — REMOVIDA daqui, movida para logo após hero ── */}

        {/* ══════════════════════════════════════════════════════
            05 · A PARETO — PROVA, NÃO PROMESSA
        ══════════════════════════════════════════════════════ */}
        <SectionDivider />
        <section id="pareto" style={{ padding: '96px 24px', position: 'relative', background: `${S1}60` }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Reveal style={{ textAlign: 'center', marginBottom: 64 }}>
              <EyebrowLabel>Quem implementa</EyebrowLabel>
              <H2 style={{ marginBottom: 14 }}>13 anos construindo IA<br /><span style={{ color: V }}>para quem lidera o mercado brasileiro.</span></H2>
              <Body style={{ maxWidth: 580, margin: '0 auto' }}>
                Não somos uma startup de IA que surgiu após o ChatGPT. Desenvolvemos os primeiros algoritmos de marketing com aprendizado de máquina no Brasil em 2013. Criamos a plataforma que virou a 6ª melhor IA do mundo. E acumulamos 13 anos de inteligência do mercado brasileiro — algo que não se replica com prompt engineering.
              </Body>
            </Reveal>

            {/* Numbers */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} variants={stagger}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 56 }} className="sm:grid-cols-4">
              {KEY_STATS.map((s) => (
                <motion.div key={s.label} variants={staggerItem}>
                  <GlassCard style={{ padding: '24px 20px', textAlign: 'center' }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 6 }}
                      className="gradient-text">
                      <AnimatedNumber value={s.value} prefix={s.prefix} suffix={s.suffix} />
                    </div>
                    <Body muted style={{ fontSize: 11, lineHeight: 1.45 }}>{s.label}</Body>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>

            {/* Awards */}
            <Reveal style={{ marginBottom: 64 }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(136,146,164,0.4)', textAlign: 'center', marginBottom: 20 }}>
                Reconhecimento que valida cada conversa
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
                {AWARDS.filter((a) => a.highlight).map((a) => (
                  <div key={a.title} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 14px', borderRadius: 99, background: 'rgba(108,99,255,0.07)', border: '1px solid rgba(108,99,255,0.2)' }}>
                    <Award size={13} style={{ color: C, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>{a.title}</span>
                    <Mono color={V} size={11}>— {a.org} {a.year}</Mono>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Tess AI */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(24px,5vw,64px)', alignItems: 'center' }} className="grid-cols-1 lg:grid-cols-2">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}>
                <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(108,99,255,0.2)' }}>
                  <img src="/images/tess_ai_illustration.png" alt="Tess AI" style={{ width: '100%', display: 'block', filter: 'grayscale(0.55) contrast(1.08)' }} loading="lazy" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(108,99,255,0.22) 0%, rgba(0,212,255,0.08) 100%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 50px rgba(108,99,255,0.22)', pointerEvents: 'none' }} />
                </div>
              </motion.div>
              <Reveal>
                <EyebrowLabel>Plataforma Proprietária</EyebrowLabel>
                <H2 style={{ marginBottom: 18 }}>Tess AI: acima do ChatGPT<br /><span style={{ color: V }}>no ranking global.</span></H2>
                <Body style={{ marginBottom: 14 }}>
                  A Pareto não usa ferramentas de terceiros como core. A Tess AI, nossa plataforma proprietária, foi eleita pelo G2 Awards 2024 como o <span style={{ color: '#fff' }}>6º melhor produto de IA do mundo</span> — à frente do ChatGPT (10º), Google Gemini (22º) e IBM Watson (28º).
                </Body>
                <Body style={{ marginBottom: 28 }}>
                  Isso significa acesso unificado a +200 modelos líderes — GPT-4o, Claude 3.5, Gemini, Midjourney, Runway — com segurança enterprise, Brand Voice exclusiva e automação de workflows personalizada para o seu negócio.
                </Body>
              <div style={{ marginTop: 32, padding: '20px 24px', borderRadius: 12, background: 'rgba(108,99,255,0.07)', border: '1px solid rgba(108,99,255,0.18)', textAlign: 'center' }}>
                <blockquote style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: '#fff', margin: 0, lineHeight: 1.35 }}>
                  <span className="hero-shimmer-text">"O futuro da IA é colaborativo."</span>
                </blockquote>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(136,146,164,0.55)', marginTop: 8, marginBottom: 0 }}>— Pareto · Tess AI Platform Philosophy</p>
              </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 12 }}>
                  {[['#6', 'Global G2 2024'], ['+200', 'Modelos de IA'], ['+2M', 'Usuários Ativos']].map(([v, l]) => (
                    <GlassCard key={l} style={{ padding: '16px 12px', textAlign: 'center' }}>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4rem', fontWeight: 600, color: C, marginBottom: 4 }}>{v}</div>
                      <Body muted style={{ fontSize: 11 }}>{l}</Body>
                    </GlassCard>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ─── Client Marquee ───────────────────────────────────── */}
        <SectionDivider />
        <section style={{ padding: '56px 0', background: `${BG}` }}>
          <Reveal style={{ textAlign: 'center', marginBottom: 32, padding: '0 24px' }}>
            <Mono color="rgba(108,99,255,0.55)" size={10}>Portfólio</Mono>
            <Body muted style={{ marginTop: 6 }}>As marcas mais exigentes do mundo escolheram a Pareto.</Body>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <LogoMarqueeRow logos={CLIENT_LOGO_IMGS.slice(0, half)} speed={60} />
            <LogoMarqueeRow logos={CLIENT_LOGO_IMGS.slice(half)} reverse speed={50} />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            McKINSEY — 80% fracassam
        ══════════════════════════════════════════════════════ */}
        <section style={{ padding: '80px 24px', background: 'rgba(11,13,20,0.95)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(108,99,255,0.09) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div className="data-grid" />
          <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <Reveal>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 800, color: 'rgba(255,255,255,0.06)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 8, userSelect: 'none' }}>80%</div>
              <blockquote style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 'clamp(1.4rem, 3vw, 2.4rem)', color: '#fff', lineHeight: 1.25, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
                "80% dos projetos de IA fracassam."
              </blockquote>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(136,146,164,0.6)', marginBottom: 32, fontStyle: 'italic' }}>
                — McKinsey &amp; Company. The State of AI.
              </p>
              <div style={{ width: 48, height: 2, background: 'linear-gradient(to right, #6C63FF, #00D4FF)', margin: '0 auto 32px' }} />
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', color: '#fff', lineHeight: 1.4, marginBottom: 40 }}>
                Seja cliente Pareto e esteja entre os <span style={{ color: '#C8F135' }}>20%</span>.
              </p>
              <PrimaryBtn href={CALENDLY_URL}>
                <Calendar size={16} /> Quero meu Diagnóstico Gratuito
              </PrimaryBtn>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(136,146,164,0.45)', marginTop: 16 }}>
                30 min · Sem compromisso · LGPD Compliant
              </p>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            06 · RESULTADOS REAIS
        ══════════════════════════════════════════════════════ */}
        <SectionDivider />
        <section id="resultados" style={{ padding: '96px 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)`, pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Reveal style={{ textAlign: 'center', marginBottom: 14 }}>
              <EyebrowLabel>Casos Reais</EyebrowLabel>
              <H2 style={{ marginBottom: 14 }}>Não são projeções.<br /><span style={{ color: C }}>São resultados reais entregues,</span><br /><span style={{ color: C }}>customizados para cada cliente.</span></H2>
            </Reveal>
            <Reveal style={{ textAlign: 'center', marginBottom: 56 }}>
              <Body style={{ maxWidth: 520, margin: '0 auto' }}>
                Cada número abaixo veio de IA construída para aquele negócio específico, naquele setor, com aqueles dados. Não existem atalhos genéricos que repliquem isso.
              </Body>
            </Reveal>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} variants={stagger}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 56 }}>
              {CASES.map((c) => (
                <motion.div key={c.client} variants={staggerItem}>
                  <GlassCard style={{ overflow: 'hidden' }}>
                    <div style={{ padding: '28px 28px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(2.4rem, 5vw, 3.2rem)', fontWeight: 600, color: C, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 6 }}>
                        {c.sign}<AnimatedNumber value={parseInt(c.value)} suffix={parseInt(c.value) > 9 ? '%' : ''} />
                      </div>
                      <Mono color="rgba(136,146,164,0.55)" size={10}>{c.sector}</Mono>
                    </div>
                    <div style={{ padding: '20px 28px' }}>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 14, color: '#fff', marginBottom: 8, lineHeight: 1.4 }}>{c.metric}</div>
                      <Body muted style={{ fontSize: 12, marginBottom: 16 }}>{c.description}</Body>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {c.tags.map((t) => (
                          <span key={t} style={{ padding: '3px 10px', borderRadius: 99, fontFamily: "'Inter', sans-serif", fontSize: 11, background: `${V}10`, color: `${V}CC`, border: `1px solid ${V}20` }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>

            <Reveal style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(136,146,164,0.55)', maxWidth: 520, margin: '0 auto 8px', lineHeight: 1.7, fontStyle: 'italic' }}>
                "Esses resultados não são exceção. São o que acontece quando IA é implementada com metodologia correta, dados reais e equipe sênior dedicada."
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Parallax: Prédio ──────────────────────────────────── */}
        <ParallaxStrip img="/images/predio.png" height={260}>
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Body style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)' }}>Consolação, São Paulo · Hub de Inovação em IA</Body>
            <Mono color={`${C}80`} size={10}>Pareto HQ · Brasil & Silicon Valley</Mono>
          </motion.div>
        </ParallaxStrip>

        {/* ══════════════════════════════════════════════════════
            07 · A PARCERIA
        ══════════════════════════════════════════════════════ */}
        <SectionDivider />
        <section id="parceria" style={{ padding: '96px 24px', position: 'relative', background: `${S1}60` }}>
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 55% 45% at 15% 50%, rgba(108,99,255,0.07) 0%, transparent 70%)`, pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(24px,5vw,80px)', alignItems: 'center' }} className="grid-cols-1 lg:grid-cols-2">

              <Reveal>
                <EyebrowLabel>O que você está contratando</EyebrowLabel>
                <H2 style={{ marginBottom: 24 }}>
                  Não uma agência.<br />
                  <span style={{ color: V }}>Uma transformação operacional.</span>
                </H2>
                <Body style={{ marginBottom: 28 }}>
                  A Pareto não entrega relatórios e vai embora. Entra na operação, entende o seu negócio em profundidade, constrói sistemas de IA que aprendem com os seus dados e treina sua equipe para operar nessa nova estrutura. O objetivo: você fica mais eficiente, mais independente e mais difícil de ser copiado.
                </Body>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[
                    { title: 'Diagnóstico real, não de prateleira', text: 'Começamos mapeando onde há maior custo oculto ou maior receita não capturada na sua operação específica.' },
                    { title: 'Construção exclusiva, não replicável', text: 'Cada sistema é treinado com os seus dados, no seu setor, na sua linguagem de marca. Não existe template para isso.' },
                    { title: 'Resultado em receita ou custo', text: 'Medimos impacto em R$ — não em impressões, alcance ou engajamento. KPIs que aparecem no balanço.' },
                    { title: 'Transferência real de conhecimento', text: 'Sua equipe opera com IA ao final do projeto. Você não fica refém de um fornecedor externo.' },
                  ].map((item) => (
                    <GlassCard key={item.title} style={{ padding: '16px 20px', display: 'flex', gap: 14 }} hover={false}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: C, flexShrink: 0, marginTop: 6 }} />
                      <div>
                        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, color: '#fff', marginBottom: 4 }}>{item.title}</div>
                        <Body muted style={{ fontSize: 12 }}>{item.text}</Body>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </Reveal>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <GlassCard style={{ padding: 32 }}>
                  <Quote size={28} style={{ color: `${V}60`, marginBottom: 18 }} />
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 16, color: '#fff', lineHeight: 1.65, marginBottom: 20, fontStyle: 'italic' }}>
                    "Contratar a Pareto em 2026 não é uma decisão de marketing. É um investimento estratégico na posição que sua empresa vai ocupar no mercado em 2029."
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, ${V}, ${C})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, color: '#000' }}>P</div>
                    <div>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, color: '#fff' }}>Pareto Plus</div>
                      <Body muted style={{ fontSize: 11 }}>Estratégia de Parceria</Body>
                    </div>
                  </div>
                </GlassCard>

                {/* AI agents image */}
                <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(0,212,255,0.18)' }}>
                  <img src="/images/ai_agents_illustration.png" alt="AI Agents" style={{ width: '100%', display: 'block', filter: 'grayscale(0.55) contrast(1.06)' }} loading="lazy" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(108,99,255,0.2) 0%, rgba(0,212,255,0.14) 100%)', mixBlendMode: 'color', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 40px rgba(0,212,255,0.12)', pointerEvents: 'none' }} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            08 · QUALIFICAÇÃO
        ══════════════════════════════════════════════════════ */}
        <SectionDivider />
        <section style={{ padding: '96px 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, rgba(108,99,255,0.07) 0%, transparent 50%, rgba(255,107,53,0.04) 100%)`, pointerEvents: 'none' }} />
          <div style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
            <Reveal>
              <EyebrowLabel>Quem é esta parceria</EyebrowLabel>
              <H2 style={{ marginBottom: 20 }}>
                Esta não é uma oferta para qualquer empresa.<br />
                <span style={{ color: A }}>E isso não é modéstia — é precisão.</span>
              </H2>
              <Body style={{ maxWidth: 600, margin: '0 auto 48px', fontSize: 16 }}>
                A Pareto Plus existe para empresas cujos líderes já entenderam que o período 2026–2030 é decisivo para o seu setor — e que precisam de um parceiro com histórico real, tecnologia proprietária e equipe sênior para garantir a entrega.
              </Body>
            </Reveal>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14, marginBottom: 48, textAlign: 'left' }}>
              {[
                { ok: true,  text: 'Faturamento relevante com múltiplos processos operacionais' },
                { ok: true,  text: 'Decisão de eficiência ou crescimento no horizonte de 12 meses' },
                { ok: true,  text: 'Liderança que entende que IA é infraestrutura, não experimento' },
                { ok: true,  text: 'Disposição para construir inteligência proprietária, não comprar templates' },
                { ok: false, text: 'Se você ainda está avaliando se IA "realmente funciona"' },
                { ok: false, text: 'Se você busca resultados sem processo, sem dados e sem comprometimento' },
              ].map((item) => (
                <motion.div key={item.text} variants={staggerItem}>
                  <GlassCard style={{ display: 'flex', gap: 14, padding: '14px 18px', background: item.ok ? 'rgba(0,212,255,0.04)' : 'rgba(255,100,100,0.04)', borderColor: item.ok ? 'rgba(0,212,255,0.15)' : 'rgba(255,100,100,0.15)' }} hover={false}>
                    <span style={{ fontSize: 15, flexShrink: 0 }}>{item.ok ? '✓' : '✕'}</span>
                    <Body style={{ fontSize: 13, color: item.ok ? 'rgba(255,255,255,0.72)' : 'rgba(255,100,100,0.62)' }}>{item.text}</Body>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>

            <Reveal>
              <PrimaryBtn href={CALENDLY_URL}><Calendar size={15} /> Quero Meu Diagnóstico Gratuito</PrimaryBtn>
              <Body muted style={{ marginTop: 14, fontSize: 12 }}>30 minutos · Sem compromisso · LGPD Compliant</Body>
            </Reveal>
          </div>
        </section>

        {/* ── Parallax: AI Business ─────────────────────────────── */}
        <ParallaxStrip img="/images/ai_business1.jpg" height={300} overlay="linear-gradient(to right, rgba(255,107,53,0.2) 0%, rgba(108,99,255,0.15) 100%)">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: 600 }}>
            <H2 style={{ marginBottom: 12 }}>
              Cada processo manual na sua operação<br />
              <span style={{ color: A }}>é custo que você escolhe manter.</span>
            </H2>
            <Body muted>Diagnóstico gratuito em 30 minutos. Mapa de impacto real — sem pitch genérico.</Body>
          </motion.div>
        </ParallaxStrip>

        {/* ══════════════════════════════════════════════════════
            09 · PARCERIA SOB CONSULTA + FORM
        ══════════════════════════════════════════════════════ */}
        <SectionDivider />
        <section id="modelos" style={{ padding: '96px 24px', position: 'relative', background: `${S1}50` }}>
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 65% 50% at 50% 0%, rgba(108,99,255,0.08) 0%, transparent 65%)`, pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <Reveal style={{ textAlign: 'center', marginBottom: 56 }}>
              <EyebrowLabel>Como trabalhamos</EyebrowLabel>
              <H2 style={{ marginBottom: 20 }}>Tudo sob consulta.<br /><span className="gradient-text">Especialmente feito para cada empresa.</span></H2>
              <Body style={{ maxWidth: 620, margin: '0 auto', fontSize: 16, lineHeight: 1.8 }}>
                Não existem pacotes de prateleira na Pareto. Nossa missão é capacitar cada empresa a remodelar seu modelo de negócio para a nova era da IA como diferencial competitivo — e isso exige entender profundamente seus desafios e recursos antes de qualquer proposta.
              </Body>
            </Reveal>

            {/* 3 pilares */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} variants={stagger}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 72 }}>
              {[
                { n: '01', title: 'Diagnóstico real', desc: 'Imersão na sua operação. Mapeamos custos ocultos, gargalos e onde a IA gera o maior retorno mais rápido — antes de qualquer proposta.' },
                { n: '02', title: 'Solução exclusiva', desc: 'Cada sistema é construído com seus dados, no seu setor, na sua linguagem. Não existe template para o que fazemos.' },
                { n: '03', title: 'Resultado em receita', desc: 'Medimos impacto em R$ — não em impressões ou engajamento. KPIs que aparecem no balanço da sua empresa.' },
              ].map((s) => (
                <motion.div key={s.n} variants={staggerItem}>
                  <GlassCard style={{ padding: '28px 24px', height: '100%' }}>
                    <Mono color={V} size={11}>{s.n}</Mono>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, color: '#fff', margin: '12px 0 10px' }}>{s.title}</div>
                    <Body muted style={{ fontSize: 13 }}>{s.desc}</Body>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>

            {/* Form de contato → Supabase */}
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            10 · CTA FINAL
        ══════════════════════════════════════════════════════ */}
        <SectionDivider />
        <section style={{ padding: '120px 24px', position: 'relative', overflow: 'hidden', background: `${BG}` }}>
          <div className="data-grid" />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(108,99,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 2, maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
            <Reveal>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', marginBottom: 28 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: C, display: 'inline-block' }} className="pulse-glow" />
                <Mono color={C} size={10}>#timeback</Mono>
              </div>
              <H1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginBottom: 20, lineHeight: 1.12 }}>
                Quanto custa, por mês,<br />
                <span className="shimmer-text">não ter IA na sua operação?</span>
              </H1>
              <Body style={{ fontSize: 16, maxWidth: 520, margin: '0 auto 40px', color: '#8892A4' }}>
                Em 30 minutos de diagnóstico, nossos especialistas identificam onde a IA gera retorno imediato no seu negócio. Sem pitch genérico. Sem compromisso. Com clareza real sobre o seu cenário específico.
              </Body>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <PrimaryBtn href={CALENDLY_URL}><Calendar size={16} /> Quero meu diagnóstico gratuito</PrimaryBtn>
                <GhostBtn href={WHATSAPP_URL}>WhatsApp <ArrowRight size={14} /></GhostBtn>
              </div>
              <Body muted style={{ marginTop: 20, fontSize: 12 }}>LGPD Compliant · Privacidade garantida</Body>
            </Reveal>
          </div>
        </section>

        {/* ─── Footer badge strip ──────────────────────────────── */}
        <BadgesBar />

      </main>

      {/* ─── Back to Top ─────────────────────────────────────── */}
      <BackToTop />
    </>
  );
}
