import { useEffect, useRef, useState, useCallback } from 'react';
import { insertLead, insertExitLead } from '@/lib/supabase';
import { useCalendly } from '@/components/CalendlyModal';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Calendar, ChevronDown, X, Award, Quote, Zap, Brain, Settings, Users } from 'lucide-react';
import { ParticleCanvas } from '@/components/ParticleCanvas';
import {
  WHATSAPP_URL, CALENDLY_URL, CASES, CLIENT_LOGOS, AWARDS, PARTNER_BADGES, KEY_STATS,
  scrollToSection,
} from '@/lib/index';

// ─── Design Tokens (Pareto Design System v2 — Light Editorial) ────────────────
const G900 = '#13100C';
const G800 = '#241F1A';
const G600 = '#4A4540';
const G400 = '#8A8278';
const G200 = '#BFB8AE';
const G100 = '#DDD7CF';
const OFF  = '#F8F6F3';
const WHITE = '#FFFFFF';
const LIME  = '#CBEC2E';
const LIME_DIM = '#A8C41E';

// Semantic aliases — mapped to new palette
const V  = G900;       // primary dark (was violet)
const C  = LIME;       // accent lime (was cyan)
const A  = LIME_DIM;   // accent dim (was amber)
const BG = OFF;        // light background
const S1 = WHITE;      // white surface
const S2 = '#EDE9E4';  // g50 surface

const ease = [0.16, 1, 0.3, 1] as const;

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const staggerItem = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.94 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease } } };

// ─── Primitives ───────────────────────────────────────────────────────────────

function Mono({ children, color = C, size = 12 }: { children: React.ReactNode; color?: string; size?: number }) {
  return (
    <span className="eyebrow-text" style={{ fontFamily: "'DM Sans', monospace", fontSize: size, fontWeight: 500, color, letterSpacing: '0.04em' }}>
      {children}
    </span>
  );
}

function EyebrowLabel({ children, dark = false, color }: { children: React.ReactNode; dark?: boolean; color?: string }) {
  const lineColor = dark ? 'rgba(203,236,46,0.6)' : G600;
  const textColor = color ?? (dark ? LIME : G600);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
      <div style={{ width: 20, height: 1, background: color ?? lineColor, opacity: 0.7 }} />
      <Mono color={textColor} size={11}>{children}</Mono>
    </div>
  );
}

function H1({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)', letterSpacing: '-2px', lineHeight: 1.0, margin: 0, color: G900, ...style }}>
      {children}
    </h1>
  );
}

function H2({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 'clamp(1.6rem, 3vw, 2.8rem)', letterSpacing: '-1.5px', lineHeight: 1.1, margin: 0, color: G900, ...style }}>
      {children}
    </h2>
  );
}

function H3({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 18, letterSpacing: '-0.3px', lineHeight: 1.3, margin: 0, color: G900, ...style }}>
      {children}
    </h3>
  );
}

function Body({ children, muted = false, style = {} }: { children: React.ReactNode; muted?: boolean; style?: React.CSSProperties }) {
  return (
    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.75, color: muted ? G400 : G600, margin: 0, fontWeight: 300, ...style }}>
      {children}
    </p>
  );
}

// ─── IconSVG — ícones SVG puros, sem emojis ──────────────────────────────────
const ICON_PATHS: Record<string, string> = {
  settings: 'M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z',
  cpu: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
  brain: 'M9.5 2A2.5 2.5 0 017 4.5v.5H5.5A2.5 2.5 0 003 7.5a2.5 2.5 0 001.5 2.27V12H3v1h1.5v2.23A2.5 2.5 0 003 17.5 2.5 2.5 0 005.5 20H7v.5A2.5 2.5 0 009.5 23h5a2.5 2.5 0 002.5-2.5V20h1.5a2.5 2.5 0 002.5-2.5 2.5 2.5 0 00-1.5-2.27V13H21v-1h-1.5V9.77A2.5 2.5 0 0021 7.5 2.5 2.5 0 0018.5 5H17v-.5A2.5 2.5 0 0014.5 2h-5z M9 12a3 3 0 006 0',
  target: 'M22 12h-4 M6 12H2 M12 6V2 M12 22v-4 M12 12m-3 0a3 3 0 106 0 3 3 0 00-6 0 M12 12m-7 0a7 7 0 1014 0 7 7 0 00-14 0',
  award: 'M12 15a7 7 0 100-14 7 7 0 000 14z M8.21 13.89L7 23l5-3 5 3-1.21-9.12',
  check: 'M20 6L9 17l-5-5',
  zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  users: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75',
  trending: 'M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6',
  chart: 'M18 20V10 M12 20V4 M6 20v-6',
  layers: 'M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  clock: 'M12 22a10 10 0 100-20 10 10 0 000 20z M12 6v6l4 2',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  globe: 'M12 22a10 10 0 100-20 10 10 0 000 20z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z',
  link: 'M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71 M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71',
  mail: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
  phone: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.09 6.09l1.27-.56a2 2 0 012.11.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z',
  calendar: 'M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z M16 2v4 M8 2v4 M3 10h18',
  arrowRight: 'M5 12h14 M12 5l7 7-7 7',
  lock: 'M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z M17 11V7a5 5 0 00-10 0v4',
  lightbulb: 'M9 21h6 M12 3a6 6 0 00-6 6c0 2.22 1.21 4.16 3 5.2V17a1 1 0 001 1h4a1 1 0 001-1v-2.8c1.79-1.04 3-2.98 3-5.2a6 6 0 00-6-6z',
  rocket: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0 M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5',
};

function IconSVG({ name, size = 20, color = 'currentColor', strokeWidth = 1.6 }: { name: string; size?: number; color?: string; strokeWidth?: number }) {
  const d = ICON_PATHS[name] || ICON_PATHS.settings;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      {d.split(' M').map((part, i) => (
        <path key={i} d={i === 0 ? part : 'M' + part} />
      ))}
    </svg>
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

// Primary CTA color — from Design System

function PrimaryBtn({ href, onClick, children }: { href?: string; onClick?: () => void; children: React.ReactNode }) {
  const base: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '14px 32px', borderRadius: 50, fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500, fontSize: 14, letterSpacing: '0.04em', textTransform: 'uppercase',
    color: LIME, textDecoration: 'none', cursor: 'pointer',
    background: G900, border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
    transition: 'box-shadow 0.25s ease, transform 0.2s ease, background 0.2s ease',
  };
  const enter = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)';
    (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
    (e.currentTarget as HTMLElement).style.background = G800;
  };
  const leave = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)';
    (e.currentTarget as HTMLElement).style.transform = '';
    (e.currentTarget as HTMLElement).style.background = G900;
  };
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" style={base} onMouseEnter={enter} onMouseLeave={leave}>{children}</a>;
  return <button onClick={onClick} style={base} onMouseEnter={enter} onMouseLeave={leave}>{children}</button>;
}

// Wrapper que reutiliza PrimaryBtn mas abre o Calendly em popup
function CalendlyPrimaryBtn({ children }: { children: React.ReactNode }) {
  const { open } = useCalendly();
  return <PrimaryBtn onClick={open}>{children}</PrimaryBtn>;
}

function GhostBtn({ href, onClick, children, white = false }: { href?: string; onClick?: () => void; children: React.ReactNode; white?: boolean }) {
  const base: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '11px 24px', borderRadius: 50, fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500, fontSize: 14, color: white ? WHITE : G600,
    textDecoration: 'none', cursor: 'pointer', background: 'transparent',
    border: `1px solid ${white ? 'rgba(255,255,255,0.4)' : G200}`, transition: 'all 0.25s ease',
  };
  const enter = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.color = white ? WHITE : G900;
    (e.currentTarget as HTMLElement).style.borderColor = white ? 'rgba(255,255,255,0.85)' : G400;
    (e.currentTarget as HTMLElement).style.background = white ? 'rgba(255,255,255,0.1)' : WHITE;
  };
  const leave = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.color = white ? WHITE : G600;
    (e.currentTarget as HTMLElement).style.borderColor = white ? 'rgba(255,255,255,0.4)' : G200;
    (e.currentTarget as HTMLElement).style.background = 'transparent';
  };
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" style={base} onMouseEnter={enter} onMouseLeave={leave}>{children}</a>;
  return <button onClick={onClick} style={{ ...base, border: `1px solid ${G200}` }} onMouseEnter={enter} onMouseLeave={leave}>{children}</button>;
}

function GlassCard({ children, style = {}, hover = true }: { children: React.ReactNode; style?: React.CSSProperties; hover?: boolean }) {
  return (
    <div className={hover ? 'glass-card' : ''} style={{
      background: WHITE,
      border: `1px solid ${G100}`,
      borderRadius: 16,
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      ...style,
    }}>
      {children}
    </div>
  );
}

function IconBadge({ icon: Icon, color = V }: { icon: React.ElementType; color?: string }) {
  return (
    <div className="icon-badge" style={{ background: OFF, borderColor: G100 }}>
      <Icon size={22} style={{ color: G900 }} />
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
          <div key={i} className="marquee-card" style={{ flexShrink: 0, width: 220, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px', margin: '0 4px', borderRadius: 10, background: G900, border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.25s ease', cursor: 'default' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(108,99,255,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(108,99,255,0.22)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(18,21,31,0.55)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.05)'; }}>
            <img src={src} alt="" className="marquee-card-img" style={{ maxWidth: 180, maxHeight: 72, width: 'auto', height: 'auto', objectFit: 'contain', filter: 'grayscale(1) brightness(1.8)', opacity: 0.45, mixBlendMode: 'screen', transition: 'all 0.25s ease' }}
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
          <span style={{ fontFamily: "'DM Sans', monospace", fontSize: 11, fontWeight: 500, color: 'rgba(200,241,53,0.55)', letterSpacing: '0.08em', whiteSpace: 'nowrap', textTransform: 'uppercase' }}>
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
          animate={{ opacity: 0.4, y: [0, -n.dy, 0] }}
          transition={{
            opacity: { delay: n.delay + 0.8, duration: 1.0 },
            y: { duration: n.dur, repeat: Infinity, ease: 'easeInOut', delay: n.delay },
          }}
          style={{ position: 'absolute', left: n.x, top: n.y, transform: 'translate(-50%,-50%)', pointerEvents: 'none' }}>
          <img
            src={HERO_LOGO_SRCS[i]}
            alt=""
            style={{ width: 125, height: 'auto', maxHeight: 75, objectFit: 'contain', display: 'block', filter: 'grayscale(1) brightness(10)', opacity: 0.55 }}
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
        <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, filter: 'grayscale(1) contrast(1.0) brightness(0.8)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,9,8,0.55)' }} />
      </motion.div>
      {children && (
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px', textAlign: 'center', color: '#fff' }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Partner Badges Bar ───────────────────────────────────────────────────────

function BadgesBar() {
  return (
    <div style={{ background: G900, borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '14px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <Mono color={WHITE} size={10}>Parceiro oficial:</Mono>
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
        style={{ position: 'relative', width: '100%', maxWidth: 480, padding: 40, borderRadius: 20, background: WHITE, border: `1px solid ${G100}`, boxShadow: '0 16px 48px rgba(0,0,0,0.12)' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer' }}>
          <X size={20} />
        </button>
        {!done ? (
          <>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 99, background: OFF, border: `1px solid ${G100}`, marginBottom: 20 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: C, display: 'inline-block' }} className="pulse-glow" />
              <Mono color={G600} size={10}>Antes de sair</Mono>
            </div>
            <H3 style={{ marginBottom: 10 }}>Seu concorrente já agendou.<br /><span style={{ color: V }}>A janela está fechando.</span></H3>
            <Body style={{ marginBottom: 24 }}>Diagnóstico gratuito de 30 minutos: mapeamos onde a IA gera retorno imediato no seu negócio. Sem compromisso. Sem pitch genérico.</Body>
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="E-mail corporativo" autoFocus
                style={{ padding: '12px 16px', borderRadius: 8, background: OFF, border: `1px solid ${G100}`, color: G900, fontFamily: "'Inter', sans-serif", fontSize: 14, outline: 'none' }} />
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="WhatsApp com DDD"
                style={{ padding: '12px 16px', borderRadius: 8, background: OFF, border: `1px solid ${G100}`, color: G900, fontFamily: "'Inter', sans-serif", fontSize: 14, outline: 'none' }} />
              <button type="submit" style={{ padding: '13px', borderRadius: 50, background: G900, color: LIME, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer', boxShadow: '0 0 24px rgba(108,99,255,0.35)' }}>
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
function CasesPopupButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '12px 28px', borderRadius: 8, border: `1px solid ${LIME_DIM}`,
        background: WHITE, color: LIME_DIM,
        fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14,
        letterSpacing: '0.02em', cursor: 'pointer', transition: 'all 0.22s ease',
      }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(200,241,53,0.18)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(200,241,53,0.08)'; (e.currentTarget as HTMLElement).style.transform = ''; }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={LIME_DIM} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        Ver todos os Cases
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
            onClick={() => setOpen(false)}>
            <motion.div initial={{ scale: 0.92, opacity: 0, y: 24 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              style={{ position: 'relative', width: '100%', maxWidth: 1100, height: '85vh', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(200,241,53,0.25)', boxShadow: '0 0 80px rgba(200,241,53,0.12)' }}>
              <button onClick={() => setOpen(false)} style={{ position: 'absolute', top: 14, right: 14, zIndex: 10, background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, color: '#fff', cursor: 'pointer', padding: '6px 12px', fontFamily: "'Inter', sans-serif", fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                <X size={16} /> Fechar
              </button>
              <iframe src="https://cases.pareto.io/" title="Pareto AI Cases" style={{ width: '100%', height: '100%', border: 'none', background: '#fff' }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', challenge: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 16px', borderRadius: 8, boxSizing: 'border-box',
    background: OFF, border: `1px solid ${G100}`,
    color: G900, fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: 'none',
    transition: 'border-color 0.2s ease',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600,
    letterSpacing: '0.15em', textTransform: 'uppercase', color: G400,
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
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(203,236,46,0.12)', border: `1px solid ${LIME_DIM}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, marginLeft: 'auto', marginRight: 'auto' }}><IconSVG name="check" size={22} color={LIME_DIM} /></div>
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
              onFocus={(e) => { e.currentTarget.style.borderColor = G400; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = G100; }} />
          </div>
          <div>
            <label style={labelStyle}>Empresa *</label>
            <input required name="company" value={form.company} onChange={handleChange} placeholder="Nome da empresa" style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = G400; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = G100; }} />
          </div>
          <div>
            <label style={labelStyle}>E-mail *</label>
            <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="seu@email.com" style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = G400; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = G100; }} />
          </div>
          <div>
            <label style={labelStyle}>WhatsApp</label>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="+55 11 9 0000-0000" style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = G400; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = G100; }} />
          </div>
        </div>
        <div style={{ marginBottom: 28 }}>
          <label style={labelStyle}>Seu maior desafio hoje</label>
          <textarea name="challenge" value={form.challenge} onChange={handleChange} rows={4}
            placeholder="Descreva brevemente: qual processo operacional mais consome tempo/custo na sua empresa?"
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
            onFocus={(e) => { e.currentTarget.style.borderColor = G400; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = G100; }} />
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <button type="submit" disabled={status === 'loading'} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 28px', borderRadius: 6, fontFamily: "'Inter', sans-serif",
            fontWeight: 500, fontSize: 14, cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            background: status === 'loading' ? G800 : G900, color: LIME, border: 'none',
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
          style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9999, width: 44, height: 44, borderRadius: '50%', background: G900, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.25)', transition: 'transform 0.2s ease' }}
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

      <main style={{ background: OFF, color: G900, fontFamily: "'DM Sans', sans-serif" }}>

        {/* ══════════════════════════════════════════════════════
            01 · HERO — Deep Space, Neural Network BG
        ══════════════════════════════════════════════════════ */}
        <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>

          {/* Layer 0: vídeo abstrato P&B em loop */}
          <video
            autoPlay muted loop playsInline
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1) brightness(0.55)', opacity: 0.7, zIndex: 0 }}
            aria-hidden="true">
            <source src="/videos/hero_abstract.mp4" type="video/mp4" />
          </video>

          {/* Overlay escuro */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1 }} />

          {/* Layer 1: logos dos clientes flutuando — em verde da marca */}
          <FloatingLogoBg />

          {/* Layer 4: glow orbs LIME suaves */}
          <div style={{ position: 'absolute', top: '8%', right: '12%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(203,236,46,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 3 }} />
          <div style={{ position: 'absolute', bottom: '15%', left: '5%', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(203,236,46,0.04) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 3 }} />

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
          <motion.div style={{ opacity: heroOpacity, position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto', padding: '0 16px', width: '100%', paddingTop: 'clamp(90px, 18vw, 130px)', paddingBottom: 'clamp(48px,8vw,80px)' }}>
            <div style={{ maxWidth: 760 }}>

              {/* Eyebrow */}
              <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6, ease }}>
                <EyebrowLabel color={WHITE}>IA Customizada para cada Negócio</EyebrowLabel>
              </motion.div>

              {/* H1 — AI First. GRANDE | H2 — 2026... MENOR */}
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.85, ease }}>
                <h1 className="hero-shimmer-text" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 'clamp(2.8rem, 6.3vw, 5.25rem)', letterSpacing: '-0.04em', lineHeight: 0.92, margin: '0 0 18px 0', display: 'block' }}>AI First.</h1>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', letterSpacing: '-1px', lineHeight: 1.12, margin: '0 0 24px 0', color: '#fff' }}>2026 é o último ano<br />em que isso ainda é opcional.</h2>
              </motion.div>

              {/* Subline */}
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.7, ease }}>
                <Body style={{ fontSize: 16, lineHeight: 1.75, marginBottom: 36, maxWidth: 580, color: WHITE }}>
                  A Pareto é a holding especializada em <span style={{ color: LIME, fontWeight: 500 }}>IA Aplicada a Negócios</span> que opera desde 2013. Não entregamos aplicativos genéricos — entendemos a sua operação em profundidade e construímos inteligência integrada que reduz custo, acelera equipes e gera resultado mensurável, com os seus dados.
                </Body>
              </motion.div>

              {/* CTAs */}
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6, ease }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 32 }} className="cta-row">
                <CalendlyPrimaryBtn>
                  <Calendar size={16} /> Agendar com Especialista
                </CalendlyPrimaryBtn>
                <GhostBtn onClick={() => scrollToSection('resultados')} white>
                  Principais cases <ArrowRight size={14} />
                </GhostBtn>
              </motion.div>



              {/* Trust badges */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }} className="badges-row">
                {['#6 G2 Best AI 2024', '16 Google Awards', '#1 Brasil Marketing IA', 'US$5M Seed 2025'].map((b) => (
                  <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 99, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
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
            <EyebrowLabel dark>Decisão</EyebrowLabel>
            <H1 style={{ fontSize: 'clamp(1.9rem, 4vw, 3.4rem)', lineHeight: 1.1, marginBottom: 0, color: WHITE }}>
              O Brasil de 2030 está sendo
              <br />construído agora.
              <br /><span className="hero-shimmer-text">Por quem decidiu em 2026.</span>
            </H1>
          </motion.div>
        </ParallaxStrip>

<SectionDivider />
        <section id="argumento" style={{ padding: '96px 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'none', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>

            <Reveal className="text-center" style={{ marginBottom: 64 }}>
              <EyebrowLabel>A Lógica Fria dos Números</EyebrowLabel>
              <div style={{ fontFamily: "'DM Sans', monospace", fontWeight: 600, fontSize: 'clamp(4rem, 10vw, 8rem)', color: LIME, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 20 }}>
                71<span style={{ fontSize: '0.42em', verticalAlign: 'super' }}>%</span>
              </div>
              <H2 style={{ marginBottom: 16, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
                das empresas brasileiras não atingiram suas metas de marketing em 2025.
              </H2>
              <Body style={{ maxWidth: 520, margin: '0 auto', color: G400 }}>
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
                    <div style={{ fontFamily: "'DM Sans', monospace", fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 600, color: c.accent, letterSpacing: '-0.03em', marginBottom: 10 }}>
                      {c.stat}
                    </div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14, color: G900, marginBottom: 10 }}>{c.label}</div>
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
                  tone: 'dimWhite',
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
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: c.tone === 'bright' ? V : c.tone === 'urgent' ? A : WHITE, marginBottom: 16 }}>
                      {c.label}
                    </div>
                    <blockquote style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 500, color: (c.tone === 'dim' || c.tone === 'dimWhite') ? 'rgba(255,255,255,0.9)' : 'rgba(160,170,160,0.9)', lineHeight: 1.6, marginBottom: 14, fontStyle: 'italic' }}>
                      {c.quote}
                    </blockquote>
                    <Body muted style={{ fontSize: 12, color: (c.tone === 'dim' || c.tone === 'dimWhite') ? 'rgba(255,100,100,0.65)' : 'rgba(136,146,164,0.7)' }}>{c.result}</Body>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Parallax: Escritório ──────────────────────────────── */}
        <ParallaxStrip img="/images/pareto_office1.png" height={300}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Mono color={WHITE} size={10} >Pareto · São Paulo · Est. 2011</Mono>
            <H2 style={{ marginTop: 12, marginBottom: 10, color: WHITE }}>
              +160 especialistas.<br />
              <span style={{ color: C }}>Um único KPI: resultado financeiro.</span>
            </H2>
            <Body muted style={{ color: WHITE }}>300+ empresas transformadas · R$3B+ em mídia gerenciada · 13 anos de operação</Body>
          </motion.div>
        </ParallaxStrip>

        {/* ══════════════════════════════════════════════════════
            03 · O PROBLEMA — TRÊS CAMADAS DE PERDA
        ══════════════════════════════════════════════════════ */}
        <SectionDivider />
        {/* ══════════════════════════════════════════════════════
            02 · SOBRE A PARETO — Terceira dobra
        ══════════════════════════════════════════════════════ */}
        <section id="sobre-pareto" style={{ padding: '80px 24px 72px', position: 'relative', overflow: 'hidden', background: WHITE }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 55% at 80% 50%, rgba(203,236,46,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>

            {/* Header — coluna única centralizada */}
            <Reveal style={{ textAlign: 'center', marginBottom: 48 }}>
              <EyebrowLabel color={G600}>Pareto · AI for Business</EyebrowLabel>
              <H2 style={{ marginBottom: 16, color: G900 }}>
                <span style={{ color: G900 }}>Inteligência Artificial</span><br />
                como ativo estratégico.
              </H2>
              <Body style={{ fontSize: 16, lineHeight: 1.8, color: G600, maxWidth: 640, margin: '0 auto 28px' }}>
                Expandindo internacionalmente com sua plataforma proprietária <span style={{ color: G900, fontWeight: 600 }}>Tess AI</span>, a Pareto implementa IA que gera retorno financeiro mensurável — não projetos-piloto sem fim. 13 anos de operação. 300+ empresas. Tess AI, a <span style={{ color: LIME_DIM, fontWeight: 600 }}>6ª melhor plataforma de IA do mundo</span> (G2 2024).
              </Body>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                <CalendlyPrimaryBtn><Calendar size={15} /> Agendar com Especialista</CalendlyPrimaryBtn>
                <GhostBtn onClick={() => scrollToSection('solucoes')}>Ver soluções <ArrowRight size={13} /></GhostBtn>
              </div>
            </Reveal>

            {/* Grid 2 colunas — ícones e métricas */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(24px,5vw,64px)', alignItems: 'start' }} className="grid-cols-1 lg:grid-cols-2">
            <Reveal>
              {/* 4 ícones Premium — o que a Pareto faz */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
                {[
                  { icon: 'settings', label: 'Automação de Processos', desc: 'RPA, workflows e integrações 24/7 sem headcount extra' },
                  { icon: 'cpu', label: 'AI Workers', desc: 'Colaboradores digitais com funções e reporte real' },
                  { icon: 'brain', label: 'Agentes Inteligentes', desc: 'IA generativa integrada ao seu ERP, CRM e dados' },
                  { icon: 'target', label: 'AI Builders Alocados', desc: 'Time sênior embarcado com ROI rastreado por sprint' },
                ].map((item) => (
                  <GlassCard key={item.label} style={{ padding: '20px 18px 18px', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start', position: 'relative', paddingTop: 32, background: OFF, border: `1px solid ${G100}` }} hover={false}>
                    <div style={{ position: 'absolute', top: -16, left: 18, width: 36, height: 36, borderRadius: 10, background: G900, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }}>
                      <IconSVG name={item.icon} size={18} color={LIME} />
                    </div>
                    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 14, color: G900, lineHeight: 1.3 }}>{item.label}</div>
                    <Body muted style={{ fontSize: 11, color: G400 }}>{item.desc}</Body>
                  </GlassCard>
                ))}
              </div>
            </Reveal>

              {/* Right — visual metrics premium */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}
              style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Big stat card */}
              <GlassCard style={{ padding: '32px 36px', textAlign: 'center', background: OFF, border: `1px solid ${G100}` }}>
                <div style={{ fontFamily: "'DM Sans', monospace", fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 600, color: LIME_DIM, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 10 }}>
                  <AnimatedNumber value={285} suffix="%" />
                </div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14, color: G900, marginBottom: 6 }}>ROI médio com stack de IA bem implementado</div>
                <Body muted style={{ fontSize: 12, color: G400 }}>vs. abaixo do custo de aquisição sem IA estruturada</Body>
              </GlassCard>

              {/* 3 mini stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12 }}>
                {[
                  { v: '3×',   l: 'Custo real por colaborador',     c: LIME_DIM },
                  { v: '~40%', l: 'Tempo em tarefas repetitivas',   c: G900 },
                  { v: '12m',  l: 'Payback médio de automação IA',   c: LIME_DIM },
                ].map((s) => (
                  <GlassCard key={s.l} style={{ padding: '18px 14px', textAlign: 'center', background: OFF, border: `1px solid ${G100}` }}>
                    <div style={{ fontFamily: "'DM Sans', monospace", fontSize: '1.4rem', fontWeight: 700, color: s.c, marginBottom: 6 }}>{s.v}</div>
                    <Body muted style={{ fontSize: 10, lineHeight: 1.45, color: G400 }}>{s.l}</Body>
                  </GlassCard>
                ))}
              </div>

              {/* Tess AI badge */}
              <GlassCard style={{ padding: '20px 24px', textAlign: 'center', background: G900, border: `1px solid ${G800}` }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(203,236,46,0.12)', border: `1px solid ${LIME_DIM}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconSVG name="award" size={24} color={LIME} /></div>
                </div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, color: '#fff', marginBottom: 3 }}>Tess AI — G2 Best Software Awards 2024</div>
                <Body muted style={{ fontSize: 12, color: WHITE }}>#6 Melhor IA do mundo · Acima do ChatGPT (#10) e Google Gemini (#22)</Body>
              </GlassCard>
            </motion.div>
          </div>{/* fim grid 2 colunas */}
          </div>{/* fim maxWidth */}
        </section>

        {/* ─── Partner Badges Bar ──────────────────────────── */}
        <BadgesBar />

        {/* ══════════════════════════════════════════════════════
            02 · O ARGUMENTO — A LÓGICA DOS NÚMEROS
        ══════════════════════════════════════════════════════ */}
        
        <section id="problema" style={{ padding: '96px 24px', position: 'relative', background: WHITE }}>
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
                        <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: "3.2rem", color: LIME, lineHeight: 1, letterSpacing: "-2px" }}>{s.num}</span>
                      </div>
                      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.45rem", letterSpacing: "-0.5px", lineHeight: 1.2, margin: "0 0 8px", color: G900 }}>{s.title}</h3>
                      <Body muted style={{ fontSize: 12, fontStyle: 'italic', color: G600 }}>{s.headline}</Body>
                    </div>
                    <ul style={{ padding: '20px 28px', listStyle: 'none', margin: 0, display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
                      {s.items.map((item) => (
                        <li key={item} style={{ display: 'flex', gap: 10, fontFamily: "'Inter', sans-serif", fontSize: 13, lineHeight: 1.65, color: G400 }}>
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
              <CalendlyPrimaryBtn><Calendar size={15} /> Diagnosticar Minha Operação</CalendlyPrimaryBtn>
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
                      <span style={{ fontFamily: "'DM Sans', monospace", fontSize: 9, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 99, background: OFF, color: G600, border: `1px solid ${G200}` }}>
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
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 'clamp(1.4rem, 3vw, 3.2rem)', letterSpacing: '-1.5px', lineHeight: 1.0, margin: '0 0 6px', color: G900 }}>4 etapas. Sem overhead desnecessário.</h3>
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
                    <div style={{ fontFamily: "'DM Sans', monospace", fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', fontWeight: 800, color: LIME, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 4 }}>{s.n}</div>
                    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 15, color: LIME_DIM, margin: '4px 0 8px', letterSpacing: '-0.01em' }}>{s.t}</div>
                    <Body muted style={{ fontSize: 12, color: G400 }}>{s.d}</Body>
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
        <section id="pareto" style={{ padding: '96px 24px', position: 'relative', background: OFF }}>
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
                    <div style={{ fontFamily: "'DM Sans', monospace", fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 6 }}
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
                  <div key={a.title} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 14px', borderRadius: 99, background: WHITE, border: `1px solid ${G100}` }}>
                    <Award size={13} style={{ color: LIME_DIM, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: G900 }}>{a.title}</span>
                    <Mono color={G600} size={11}>— {a.org} {a.year}</Mono>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Tess AI */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <Reveal>
                <EyebrowLabel>Plataforma Proprietária</EyebrowLabel>
                <H2 style={{ marginBottom: 18 }}>Tess AI: acima do ChatGPT<br /><span style={{ color: LIME }}>no ranking global.</span></H2>
                <Body style={{ marginBottom: 14 }}>
                  A Pareto não usa ferramentas de terceiros como core. A Tess AI, nossa plataforma proprietária, foi eleita pelo G2 Awards 2024 como o <span style={{ color: LIME_DIM, fontWeight: 600 }}>6º melhor produto de IA do mundo</span> — à frente do ChatGPT (10º), Google Gemini (22º) e IBM Watson (28º).
                </Body>
                <Body style={{ marginBottom: 28 }}>
                  Isso significa acesso unificado a +200 modelos líderes — GPT-4o, Claude 3.5, Gemini, Midjourney, Runway — com segurança enterprise, Brand Voice exclusiva e automação de workflows personalizada para o seu negócio.
                </Body>
              <div style={{ marginTop: 32, padding: '20px 24px', borderRadius: 12, background: G900, border: `1px solid ${G800}`, textAlign: 'center' }}>
                <blockquote style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: '#fff', margin: 0, lineHeight: 1.35 }}>
                  <span className="hero-shimmer-text">"O futuro da IA é colaborativo."</span>
                </blockquote>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: WHITE, marginTop: 8, marginBottom: 0 }}>— Pareto · Tess AI Platform Philosophy</p>
              </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 12 }}>
                  {[['#6', 'Global G2 2024'], ['+200', 'Modelos de IA'], ['+2M', 'Usuários Ativos']].map(([v, l]) => (
                    <GlassCard key={l} style={{ padding: '16px 12px', textAlign: 'center', background: OFF, border: `1px solid ${G100}` }}>
                      <div style={{ fontFamily: "'DM Sans', monospace", fontSize: '1.4rem', fontWeight: 700, color: LIME_DIM, marginBottom: 4 }}>{v}</div>
                      <Body muted style={{ fontSize: 11 }}>{l}</Body>
                    </GlassCard>
                  ))}
                </div>
              </Reveal>
              {/* Tess AI image — below text, full width */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}>
                <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: `1px solid ${G100}`, maxWidth: 720, margin: '0 auto' }}>
                  <img src="/images/tess_ai_illustration.png" alt="Tess AI" style={{ width: '100%', display: 'block', filter: 'grayscale(1) contrast(1.05) brightness(0.7)' }} loading="lazy" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(108,99,255,0.22) 0%, rgba(0,212,255,0.08) 100%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 50px rgba(108,99,255,0.22)', pointerEvents: 'none' }} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Client Marquee ───────────────────────────────────── */}
        <SectionDivider />
        <section style={{ padding: '56px 0', background: OFF }}>
          <Reveal style={{ textAlign: 'center', marginBottom: 32, padding: '0 24px' }}>
            <Mono color={LIME} size={20}>Portfólio</Mono>
            <Body muted style={{ marginTop: 6 }}>As marcas mais exigentes do mundo escolheram a Pareto.</Body>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <LogoMarqueeRow logos={CLIENT_LOGO_IMGS.slice(0, half)} speed={30} />
            <LogoMarqueeRow logos={CLIENT_LOGO_IMGS.slice(half)} reverse speed={25} />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            McKINSEY — 80% fracassam
        ══════════════════════════════════════════════════════ */}
        <section style={{ padding: '80px 24px', background: G900, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(108,99,255,0.09) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div className="data-grid" />
          <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <Reveal>
              <div style={{ fontFamily: "'DM Sans', monospace", fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 800, color: 'rgba(255,255,255,0.06)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 8, userSelect: 'none' }}>80%</div>
              <blockquote style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 'clamp(1.4rem, 3vw, 2.4rem)', color: '#fff', lineHeight: 1.25, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
                "80% dos projetos de IA fracassam."
              </blockquote>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(136,146,164,0.6)', marginBottom: 32, fontStyle: 'italic' }}>
                — McKinsey &amp; Company. The State of AI.
              </p>
              <div style={{ width: 48, height: 2, background: G900, margin: '0 auto 32px' }} />
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', color: '#fff', lineHeight: 1.4, marginBottom: 40 }}>
                Seja cliente Pareto e esteja entre os <span style={{ color: LIME }}>20%</span>.
              </p>
              <CalendlyPrimaryBtn>
                <Calendar size={16} /> Quero meu Diagnóstico Gratuito
              </CalendlyPrimaryBtn>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: WHITE, marginTop: 16 }}>
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
                    <GlassCard style={{ overflow: 'hidden', background: WHITE, border: `1px solid ${G100}` }}>
                    <div style={{ padding: '28px 28px 20px', borderBottom: `1px solid ${G100}` }}>
                      <div style={{ fontFamily: "'DM Sans', monospace", fontSize: 'clamp(2.4rem, 5vw, 3.2rem)', fontWeight: 700, color: LIME_DIM, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 6 }}>
                        {c.sign}<AnimatedNumber value={parseInt(c.value)} suffix={parseInt(c.value) > 9 ? '%' : ''} />
                      </div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: G600, marginBottom: 2 }}>{c.sector}</div>
                    </div>
                    <div style={{ padding: '20px 28px' }}>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14, color: G900, marginBottom: 8, lineHeight: 1.4 }}>{c.metric}</div>
                      <Body muted style={{ fontSize: 12, marginBottom: 16, color: G400 }}>{c.description}</Body>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {c.tags.map((t) => (
                          <span key={t} style={{ padding: '3px 10px', borderRadius: 99, fontFamily: "'Inter', sans-serif", fontSize: 11, background: 'rgba(168,196,30,0.08)', color: LIME_DIM, border: `1px solid rgba(168,196,30,0.2)` }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>

            <Reveal style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(136,146,164,0.55)', maxWidth: 520, margin: '0 auto 24px', lineHeight: 1.7, fontStyle: 'italic' }}>
                "Esses resultados não são exceção. São o que acontece quando IA é implementada com metodologia correta, dados reais e equipe sênior dedicada."
              </p>
              {/* Cases popup button */}
              <CasesPopupButton />
            </Reveal>
          </div>
        </section>

        {/* ── Parallax: Prédio ──────────────────────────────────── */}
        <ParallaxStrip img="/images/predio.png" height={260}>
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 400, color: 'rgba(255,255,255,0.90)', lineHeight: 1.5, margin: '0 0 6px' }}>Consolação, São Paulo · <em>Hub</em> de Inovação em IA</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, color: LIME, letterSpacing: '0.04em', margin: 0, fontStyle: 'italic' }}>Pareto HQ · <em>Brasil &amp; Silicon Valley</em></p>
          </motion.div>
        </ParallaxStrip>

        {/* ══════════════════════════════════════════════════════
            07 · A PARCERIA
        ══════════════════════════════════════════════════════ */}
        <SectionDivider />
        <section id="parceria" style={{ padding: '96px 24px', position: 'relative', background: OFF }}>
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
                        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, color: G900, marginBottom: 4 }}>{item.title}</div>
                        <Body muted style={{ fontSize: 12 }}>{item.text}</Body>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </Reveal>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{
                    padding: '32px 32px 28px',
                    borderRadius: 16,
                    background: G900,
                    border: `1px solid ${G800}`,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                  }}>
                  <Quote size={24} style={{ color: LIME_DIM, marginBottom: 16, opacity: 0.7 }} />
                  <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, fontSize: 16, color: '#FFFFFF', lineHeight: 1.65, marginBottom: 20, fontStyle: 'italic' }}>
                    "Contratar a Pareto em 2026 não é uma decisão de marketing. É um investimento estratégico na posição que sua empresa vai ocupar no mercado em 2029."
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, borderTop: `1px solid ${G800}` }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: G800, border: `1px solid ${LIME_DIM}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, color: LIME }}>P</div>
                    <div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, color: WHITE }}>Pareto Plus</div>
                      <Body muted style={{ fontSize: 11, color: G400 }}>Estratégia de Parceria</Body>
                    </div>
                  </div>
                </div>

                {/* AI agents image */}
                <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(0,212,255,0.18)' }}>
                  <img src="/images/ai_agents_illustration.png" alt="AI Agents" style={{ width: '100%', display: 'block', filter: 'grayscale(1) contrast(1.05) brightness(0.7)' }} loading="lazy" />
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
                  <GlassCard style={{ display: 'flex', gap: 14, padding: '14px 18px', background: item.ok ? 'rgba(19,16,12,0.03)' : 'rgba(255,100,100,0.03)', borderColor: item.ok ? G100 : 'rgba(220,80,80,0.2)' }} hover={false}>
                    <span style={{ fontSize: 15, flexShrink: 0, color: item.ok ? LIME_DIM : '#B53030', fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>{item.ok ? '✓' : '✗'}</span>
                    <Body style={{ fontSize: 13, color: item.ok ? G600 : 'rgba(180,50,50,0.75)' }}>{item.text}</Body>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>

            <Reveal>
              <CalendlyPrimaryBtn><Calendar size={15} /> Quero Meu Diagnóstico Gratuito</CalendlyPrimaryBtn>
              <Body muted style={{ marginTop: 14, fontSize: 12 }}>30 minutos · Sem compromisso · LGPD Compliant</Body>
            </Reveal>
          </div>
        </section>

        {/* ── Parallax: AI Business ─────────────────────────────── */}
        <ParallaxStrip img="/images/ai_business1.jpg" height={300} overlay="linear-gradient(to right, rgba(255,107,53,0.2) 0%, rgba(108,99,255,0.15) 100%)">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: 600 }}>
            <H2 style={{ marginBottom: 12, color: WHITE }}>
              Cada processo manual na sua operação<br />
              <span style={{ color: A }}>é custo que você escolhe manter.</span>
            </H2>
            <Body muted style={{ color: WHITE }}>Diagnóstico gratuito em 30 minutos. Mapa de impacto real — sem pitch genérico.</Body>
          </motion.div>
        </ParallaxStrip>

        {/* ══════════════════════════════════════════════════════
            09 · PARCERIA SOB CONSULTA + FORM
        ══════════════════════════════════════════════════════ */}
        <SectionDivider />
        <section id="modelos" style={{ padding: '96px 24px', position: 'relative', background: OFF }}>
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
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, color: G900, margin: '12px 0 10px' }}>{s.title}</div>
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
        <section style={{ padding: '120px 24px', position: 'relative', overflow: 'hidden', background: OFF }}>
          <div className="data-grid" />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(108,99,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 2, maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
            <Reveal>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', marginBottom: 28 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: C, display: 'inline-block' }} className="pulse-glow" />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 10, letterSpacing: '0.12em', color: G800, fontStyle: 'italic' }}>#timeback</span>
              </div>
              <H1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginBottom: 20, lineHeight: 1.12 }}>
                Quanto custa, por mês,<br />
                <span className="shimmer-text">não ter IA na sua operação?</span>
              </H1>
              <Body style={{ fontSize: 16, maxWidth: 520, margin: '0 auto 40px', color: G400 }}>
                Em 30 minutos de diagnóstico, nossos especialistas identificam onde a IA gera retorno imediato no seu negócio. Sem pitch genérico. Sem compromisso. Com clareza real sobre o seu cenário específico.
              </Body>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <CalendlyPrimaryBtn><Calendar size={16} /> Quero meu diagnóstico gratuito</CalendlyPrimaryBtn>
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
