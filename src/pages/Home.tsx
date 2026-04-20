import { useEffect, useRef, useState, useCallback } from 'react';
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
    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: size, fontWeight: 500, color, letterSpacing: '0.04em' }}>
      {children}
    </span>
  );
}

function EyebrowLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
      <div style={{ width: 20, height: 1, background: V, opacity: 0.7 }} />
      <Mono color={C} size={11}>{children}</Mono>
    </div>
  );
}

function H1({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', letterSpacing: '-0.025em', lineHeight: 1.06, margin: 0, ...style }}>
      {children}
    </h1>
  );
}

function H2({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 'clamp(1.6rem, 3vw, 2.8rem)', letterSpacing: '-0.02em', lineHeight: 1.1, margin: 0, color: '#fff', ...style }}>
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
const CLIENT_LOGO_IMGS = Array.from({ length: 25 }, (_, i) => `/images/clients/logo_${i + 1}.png`);

function LogoMarqueeRow({ logos, reverse = false, speed = 55 }: { logos: string[]; reverse?: boolean; speed?: number }) {
  const doubled = [...logos, ...logos];
  return (
    <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}>
      <motion.div
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: 0, whiteSpace: 'nowrap', alignItems: 'center' }}>
        {doubled.map((src, i) => (
          <div key={i} style={{ flexShrink: 0, width: 140, height: 68, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px', margin: '0 4px', borderRadius: 10, background: 'rgba(18,21,31,0.55)', border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.25s ease', cursor: 'default' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(108,99,255,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(108,99,255,0.22)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(18,21,31,0.55)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.05)'; }}>
            <img src={src} alt="" style={{ maxWidth: 90, maxHeight: 36, width: 'auto', height: 'auto', objectFit: 'contain', filter: 'grayscale(1) brightness(1.8)', opacity: 0.5, mixBlendMode: 'screen', transition: 'opacity 0.25s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '1'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0.5'; }} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Floating logos for hero background — premium social proof texture
// No boxes — logos only, grayscale, low opacity, 250% bigger than before
function FloatingLogoBg() {
  const positions = [
    { x: '6%',   y: '15%', w: 130, delay: 0,   dur: 18 },
    { x: '20%',  y: '70%', w: 110, delay: 2.5, dur: 22 },
    { x: '36%',  y: '10%', w: 120, delay: 1,   dur: 20 },
    { x: '53%',  y: '62%', w: 100, delay: 3,   dur: 25 },
    { x: '66%',  y: '18%', w: 140, delay: 0.8, dur: 19 },
    { x: '78%',  y: '52%', w: 110, delay: 1.8, dur: 21 },
    { x: '88%',  y: '28%', w: 120, delay: 4,   dur: 23 },
    { x: '12%',  y: '43%', w: 100, delay: 2,   dur: 20 },
    { x: '46%',  y: '78%', w: 110, delay: 3.5, dur: 24 },
    { x: '70%',  y: '76%', w: 100, delay: 1.2, dur: 18 },
    { x: '30%',  y: '38%', w: 90,  delay: 2.8, dur: 22 },
    { x: '86%',  y: '8%',  w: 105, delay: 0.5, dur: 26 },
  ];
  const picks = [0,2,5,7,9,11,14,16,18,20,22,24];
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
      {positions.map((p, i) => (
        <motion.div key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -16, 0] }}
          transition={{ opacity: { delay: p.delay + 0.8, duration: 1 }, y: { duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay } }}
          style={{ position: 'absolute', left: p.x, top: p.y }}>
          <img
            src={CLIENT_LOGO_IMGS[picks[i]]}
            alt=""
            style={{ width: p.w, height: 'auto', objectFit: 'contain', filter: 'grayscale(1) brightness(2)', opacity: 0.12, mixBlendMode: 'screen' }}
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
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
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

          {/* Layer 1: floating client logos — premium social proof texture */}
          <FloatingLogoBg />

          {/* Layer 2: data grid */}
          <div className="data-grid" />

          {/* Layer 4: glow orbs — subtle radial blurs only */}
          <div style={{ position: 'absolute', top: '8%', right: '12%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(108,99,255,0.13) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '15%', left: '5%', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,212,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '40%', left: '35%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,107,53,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

          {/* Fade to next section */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 240, background: `linear-gradient(to bottom, transparent 0%, ${BG} 100%)`, pointerEvents: 'none' }} />

          {/* Hero content */}
          <motion.div style={{ opacity: heroOpacity, position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto', padding: '0 24px', width: '100%', paddingTop: 120, paddingBottom: 100 }}>
            <div style={{ maxWidth: 760 }}>

              {/* Eyebrow */}
              <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6, ease }}>
                <EyebrowLabel>IA Aplicada a Negócios</EyebrowLabel>
              </motion.div>

              {/* H1 */}
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.85, ease }}>
                <H1 style={{ marginBottom: 24 }}>
                  <span style={{ color: '#fff', display: 'block', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1 }}>AI First.</span>
                  <span className="hero-shimmer-text" style={{ display: 'block', marginTop: 4 }}>2026 é o último ano<br />em que isso ainda é opcional.</span>
                </H1>
              </motion.div>

              {/* Subline */}
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.7, ease }}>
                <Body style={{ fontSize: 16, lineHeight: 1.75, marginBottom: 36, maxWidth: 580, color: '#8892A4' }}>
                  A Pareto é a holding especializada em <span style={{ color: '#fff', fontWeight: 500 }}>IA Aplicada a Negócios</span> que opera desde 2013. Não entregamos aplicativos genéricos — entendemos a sua operação em profundidade e construímos inteligência integrada que reduz custo, acelera equipes e gera resultado mensurável, com os seus dados.
                </Body>
              </motion.div>

              {/* CTAs */}
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6, ease }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 32 }}>
                <PrimaryBtn href={CALENDLY_URL}>
                  <Calendar size={16} /> Agendar com Especialista
                </PrimaryBtn>
                <GhostBtn onClick={() => scrollToSection('resultados')}>
                  Principais cases <ArrowRight size={14} />
                </GhostBtn>
              </motion.div>

              {/* Scroll down — visível acima da dobra */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
                onClick={() => scrollToSection('sobre-pareto')}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6, cursor: 'pointer', marginBottom: 40 }}>
                <Mono color="rgba(108,99,255,0.45)" size={10}>scroll</Mono>
                <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
                  <ChevronDown size={18} style={{ color: 'rgba(108,99,255,0.4)' }} />
                </motion.div>
              </motion.div>

              {/* Trust badges */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['#6 G2 Best AI 2024', '16 Google Awards', '#1 Brasil Marketing IA', 'US$5M Seed 2025'].map((b) => (
                  <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 99, background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.2)' }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: C }} />
                    <Mono color="rgba(255,255,255,0.55)" size={10}>{b}</Mono>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Stats row */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px 40px', marginTop: 72, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.05)', maxWidth: 600 }}
              className="sm:grid-cols-4">
              {KEY_STATS.slice(0, 4).map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 600, color: C, letterSpacing: '-0.02em', marginBottom: 4 }}>
                    <AnimatedNumber value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                  <Body muted style={{ fontSize: 12, lineHeight: 1.4 }}>{s.label}</Body>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* scroll indicator moved inline above */}
        </section>

        {/* ══════════════════════════════════════════════════════
            01B · SOBRE A PARETO — Segunda dobra
        ══════════════════════════════════════════════════════ */}
        <section id="sobre-pareto" style={{ padding: '80px 24px 72px', position: 'relative', overflow: 'hidden', background: 'rgba(18,21,31,0.55)' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 55% at 80% 50%, rgba(108,99,255,0.09) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div className="data-grid" />
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="grid-cols-1 lg:grid-cols-2">

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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
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

        {/* ── Parallax quote ────────────────────────────────────── */}
        <ParallaxStrip img="/images/brazil_network.jpg" height={340} overlay="linear-gradient(to right, rgba(108,99,255,0.28) 0%, rgba(0,212,255,0.1) 100%)">
          <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: 680 }}>
            <Mono color={V} size={10}>Decisão</Mono>
            <H2 style={{ marginTop: 14, lineHeight: 1.18 }}>
              O Brasil de 2030 está sendo construído agora.<br />
              <span className="gradient-text">Por quem decidiu em 2026.</span>
            </H2>
          </motion.div>
        </ParallaxStrip>

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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="grid-cols-1 lg:grid-cols-2">
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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
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
            06 · RESULTADOS REAIS
        ══════════════════════════════════════════════════════ */}
        <SectionDivider />
        <section id="resultados" style={{ padding: '96px 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)`, pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Reveal style={{ textAlign: 'center', marginBottom: 14 }}>
              <EyebrowLabel>Casos Reais</EyebrowLabel>
              <H2 style={{ marginBottom: 14 }}>Não são apresentações.<br /><span style={{ color: C }}>São contratos encerrados com prova.</span></H2>
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="grid-cols-1 lg:grid-cols-2">

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
            09 · MODELOS DE PARCERIA
        ══════════════════════════════════════════════════════ */}
        <SectionDivider />
        <section id="modelos" style={{ padding: '96px 24px', position: 'relative', background: `${S1}50` }}>
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 65% 50% at 50% 0%, rgba(108,99,255,0.08) 0%, transparent 65%)`, pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Reveal style={{ textAlign: 'center', marginBottom: 56 }}>
              <EyebrowLabel>Modelos de Parceria</EyebrowLabel>
              <H2 style={{ marginBottom: 14 }}>Três portas de entrada.<br /><span className="gradient-text">Uma transformação.</span></H2>
              <Body style={{ maxWidth: 480, margin: '0 auto' }}>
                Cada modelo foi desenhado para um estágio diferente de maturidade em IA — do primeiro diagnóstico à parceria estratégica de longo prazo.
              </Body>
            </Reveal>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} variants={stagger}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              {[
                {
                  badge: 'PORTA DE ENTRADA',
                  name: 'Sprint de Aceleração IA',
                  price: 'R$ 4.500', period: 'pagamento único',
                  desc: 'Em 21 dias, mapeamos onde há vazamento de receita e implementamos as 3 primeiras vitórias de IA no seu negócio.',
                  features: ['Diagnóstico de Vazamento de Receita', 'Auditoria completa da operação', '3 quick wins implementados', 'Roadmap priorizado por ROI', '55%+ dos clientes avança para parceria'],
                  highlight: false, cta: 'Começar o Sprint',
                },
                {
                  badge: 'MAIS ESCOLHIDO',
                  name: 'Parceria Estratégica de Marketing IA',
                  price: 'R$ 3.900 – R$ 6.500', period: '/mês · mínimo 6 meses',
                  desc: 'Stack completo de marketing com IA — construído nos seus dados, em constante aprendizado, com foco em receita mensurável.',
                  features: ['Stack de marketing IA customizado', 'Tess AI incluída (+200 modelos)', 'Motor de conteúdo 10× volume', 'Qualificação de leads em 2 minutos', 'Gestão Meta + Google + TikTok', 'Review estratégica mensal'],
                  highlight: true, cta: 'Quero essa Parceria',
                },
                {
                  badge: 'PREMIUM',
                  name: 'Transformação IA + Consultoria',
                  price: 'R$ 8.500 – R$ 18.000', period: '/mês · 12 meses',
                  desc: 'Para líderes que estão construindo vantagem competitiva estrutural. Operacional + estratégico + inteligência de mercado.',
                  features: ['Tudo do modelo anterior', 'Consultoria estratégica C-suite', 'BI customizado ao vivo', 'Monitoramento de concorrentes por IA', 'Briefing Trimestral Nova Era', 'Acesso direto ao time sênior Pareto'],
                  highlight: false, cta: 'Falar com Especialista',
                },
              ].map((m) => (
                <motion.div key={m.name} variants={staggerItem}>
                  <GlassCard style={{ display: 'flex', flexDirection: 'column', height: '100%', background: m.highlight ? 'rgba(108,99,255,0.08)' : 'rgba(18,21,31,0.8)', borderColor: m.highlight ? 'rgba(108,99,255,0.45)' : 'rgba(255,255,255,0.07)', boxShadow: m.highlight ? `0 0 60px rgba(108,99,255,0.14), 0 8px 32px rgba(0,0,0,0.30)` : '0 8px 32px rgba(0,0,0,0.30)' }} hover={false}>
                    <div style={{ padding: '28px 28px 0', flex: 1 }}>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 600, letterSpacing: '0.2em', color: m.highlight ? C : 'rgba(136,146,164,0.45)', marginBottom: 16 }}>
                        {m.badge}
                      </div>
                      <H3 style={{ fontSize: 16, marginBottom: 10 }}>{m.name}</H3>
                      <div style={{ marginBottom: 16 }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.3rem', fontWeight: 600, color: '#fff' }}>{m.price}</span>
                        <Body muted style={{ fontSize: 11, display: 'inline', marginLeft: 8 }}>{m.period}</Body>
                      </div>
                      <Body muted style={{ fontSize: 13, marginBottom: 20 }}>{m.desc}</Body>
                      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {m.features.map((f) => (
                          <li key={f} style={{ display: 'flex', gap: 8, fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#8892A4' }}>
                            <span style={{ color: C, flexShrink: 0 }}>✓</span>{f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ padding: '0 28px 28px' }}>
                      <PrimaryBtn href={CALENDLY_URL}>{m.cta} <ArrowRight size={14} /></PrimaryBtn>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            10 · CTA FINAL
        ══════════════════════════════════════════════════════ */}
        <SectionDivider />
        <section style={{ padding: '120px 24px', position: 'relative', overflow: 'hidden', background: `${BG}` }}>
          <div className="starfield" />
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
    </>
  );
}
