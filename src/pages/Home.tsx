import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MessageCircle, ChevronDown, Calendar, X, Star, Award, Quote } from 'lucide-react';
import { ParticleCanvas } from '@/components/ParticleCanvas';
import {
  WHATSAPP_URL, CALENDLY_URL, CASES, CLIENT_LOGOS, AWARDS, PARTNER_BADGES, KEY_STATS,
  scrollToSection,
} from '@/lib/index';
import { fadeInUp, staggerContainer, staggerItem, scaleIn } from '@/lib/motion';

// ─── Primitives ──────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-8 h-px" style={{ background: '#8800FF' }} />
      <span className="text-xs font-bold tracking-[0.25em] uppercase" style={{ color: '#8800FF' }}>{children}</span>
    </div>
  );
}

function NarrativeBridge({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12%' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="max-w-2xl mx-auto text-center">
      <p className="text-base text-white/50 leading-relaxed italic" style={{ fontWeight: 300 }}>{children}</p>
    </motion.div>
  );
}

function PrimaryButton({ href, onClick, children }: {
  href?: string; onClick?: () => void; children: React.ReactNode;
}) {
  const cls = "inline-flex items-center gap-3 px-8 py-4 rounded-full font-black text-base text-white transition-all duration-300 cursor-pointer";
  const style: React.CSSProperties = {
    background: 'linear-gradient(135deg, #8800FF 0%, #6600CC 100%)',
    boxShadow: '0 0 40px rgba(136,0,255,0.45)',
  };
  const onEnter = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 70px rgba(136,0,255,0.7)';
    (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px) scale(1.02)';
  };
  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(136,0,255,0.45)';
    (e.currentTarget as HTMLElement).style.transform = '';
  };
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls} style={style} onMouseEnter={onEnter} onMouseLeave={onLeave}>{children}</a>;
  return <button onClick={onClick} className={cls} style={style} onMouseEnter={onEnter} onMouseLeave={onLeave}>{children}</button>;
}

function SecondaryButton({ href, onClick, children }: { href?: string; onClick?: () => void; children: React.ReactNode }) {
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white/80 hover:text-white transition-colors"
      style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
      {children}
    </a>
  ) : (
    <button onClick={onClick}
      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white/80 hover:text-white transition-colors"
      style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
      {children}
    </button>
  );
}

function AnimatedNumber({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 2000; const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);
  return <span ref={ref} className="tabular-nums">{prefix}{count}{suffix}</span>;
}

function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeInUp} className={className}>
      {children}
    </motion.div>
  );
}

function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)' }}>
      <motion.div
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        className="flex gap-5 whitespace-nowrap">
        {doubled.map((item, i) => (
          <div key={i} className="flex-shrink-0 px-6 py-3 rounded-xl text-sm font-semibold"
            style={{ background: 'rgba(22,22,22,0.9)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.45)' }}>
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Exit Popup ──────────────────────────────────────────────────────────────
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}>
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.88, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        className="relative w-full max-w-lg p-10 rounded-3xl"
        style={{ background: '#0C0C0C', border: '1px solid rgba(136,0,255,0.45)', boxShadow: '0 0 100px rgba(136,0,255,0.3)' }}
        onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-5 right-5 p-1.5 text-white/30 hover:text-white/70 transition-colors">
          <X className="w-5 h-5" />
        </button>

        {!done ? (
          <>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
              style={{ background: 'rgba(205,255,0,0.08)', border: '1px solid rgba(205,255,0,0.25)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#CDFF00' }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#CDFF00' }}>Antes de sair</span>
            </div>
            <h3 className="text-2xl font-black text-white leading-tight mb-3">
              Seu concorrente acabou de<br />
              <span style={{ color: '#8800FF' }}>agendar com a Pareto.</span>
            </h3>
            <p className="text-white/55 text-sm leading-relaxed mb-8">
              Em 30 minutos de diagnóstico gratuito, um especialista mapeia onde a IA gera retorno financeiro real no seu negócio. Sem apresentação de prateleira. Sem compromisso. Com clareza total.
            </p>
            <form onSubmit={submit} className="space-y-3">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                placeholder="E-mail corporativo" autoFocus
                className="w-full px-5 py-3.5 rounded-xl text-sm text-white placeholder-white/30 outline-none"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(136,0,255,0.3)' }} />
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                placeholder="WhatsApp com DDD"
                className="w-full px-5 py-3.5 rounded-xl text-sm text-white placeholder-white/30 outline-none"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(136,0,255,0.2)' }} />
              <button type="submit" className="w-full py-4 rounded-full font-black text-white text-sm tracking-wide"
                style={{ background: 'linear-gradient(135deg,#8800FF,#6600CC)', boxShadow: '0 0 40px rgba(136,0,255,0.4)' }}>
                Quero Meu Diagnóstico Gratuito
              </button>
              <p className="text-xs text-white/25 text-center">Apenas para empresas com faturamento R$1M+/ano · LGPD</p>
            </form>
          </>
        ) : (
          <div className="text-center py-10">
            <div className="text-6xl mb-5">✓</div>
            <h3 className="text-2xl font-black text-white mb-2">Recebemos seu contato!</h3>
            <p className="text-white/55">Um especialista Pareto entrará em contato em breve.</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Parallax Strips ─────────────────────────────────────────────────────────

function OfficeStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  return (
    <div ref={ref} style={{ position: 'relative', overflow: 'hidden', height: 300 }}>
      <motion.div style={{ y, position: 'absolute', inset: '-12% 0', height: '124%' }}>
        <img src="/images/pareto_office1.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, filter: 'grayscale(0.35)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(136,0,255,0.3) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,26,26,0.8) 0%, rgba(26,26,26,0.25) 50%, rgba(26,26,26,0.8) 100%)' }} />
      </motion.div>
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#8800FF', marginBottom: 12 }}>Pareto · São Paulo</div>
          <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 900, color: '#fff', fontFamily: "'Roboto', sans-serif" }}>
            +160 especialistas. Um único objetivo:<br />
            <span style={{ color: '#CDFF00' }}>resultado financeiro mensurável.</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function BuildingStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  return (
    <div ref={ref} style={{ position: 'relative', overflow: 'hidden', height: 260 }}>
      <motion.div style={{ y, position: 'absolute', inset: '-12% 0', height: '124%' }}>
        <img src="/images/predio.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.38, filter: 'grayscale(0.4) contrast(1.05)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(136,0,255,0.25) 0%, transparent 50%, rgba(205,255,0,0.08) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.2) 50%, rgba(26,26,26,0.85) 100%)' }} />
      </motion.div>
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontFamily: "'Roboto', sans-serif" }}>Consolação, São Paulo · Hub de Inovação em IA</p>
          <div style={{ marginTop: 8, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(205,255,0,0.65)' }}>Pareto HQ · Brasil & Silicon Valley</div>
        </motion.div>
      </div>
    </div>
  );
}

function QuoteBreak() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  return (
    <div ref={ref} style={{ position: 'relative', overflow: 'hidden', height: 320 }}>
      <motion.div style={{ y, position: 'absolute', inset: '-15% 0', height: '130%' }}>
        <img src="/images/brazil_business_futurism.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, filter: 'grayscale(0.5)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(136,0,255,0.35) 0%, rgba(0,0,0,0.1) 50%, rgba(205,255,0,0.1) 100%)', mixBlendMode: 'multiply' as const }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(26,26,26,0.9) 0%, rgba(26,26,26,0.3) 40%, rgba(26,26,26,0.9) 100%)' }} />
      </motion.div>
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', maxWidth: 700 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8800FF', marginBottom: 16 }}>Decisão</div>
          <p style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 900, color: '#fff', fontFamily: "'Roboto', sans-serif", lineHeight: 1.2 }}>
            O Brasil de 2030 já está sendo construído.<br />
            <span style={{ background: 'linear-gradient(90deg, #8800FF 0%, #CDFF00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Por quem agiu em 2026.
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// ─── HOME ────────────────────────────────────────────────────────────────────
export default function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0]);

  const [showExit, setShowExit] = useState(false);
  const exitFired = useRef(false);
  const onMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 5 && !exitFired.current) {
      const d = sessionStorage.getItem('pareto_exit');
      if (!d) { exitFired.current = true; setShowExit(true); }
    }
  }, []);
  useEffect(() => {
    const t = setTimeout(() => document.addEventListener('mouseleave', onMouseLeave), 10000);
    return () => { clearTimeout(t); document.removeEventListener('mouseleave', onMouseLeave); };
  }, [onMouseLeave]);
  const closeExit = () => { sessionStorage.setItem('pareto_exit', '1'); setShowExit(false); };

  const clients = CLIENT_LOGOS.map((c) => c.name);
  const half = Math.ceil(clients.length / 2);

  return (
    <>
      <AnimatePresence>{showExit && <ExitPopup onClose={closeExit} />}</AnimatePresence>

      <main style={{ background: '#1A1A1A', color: '#fff', fontFamily: "'Roboto', sans-serif" }}>

        {/* ═══════════════════════════════════════════════════
            01 · HERO — A ERA QUE DEFINE QUEM SOBREVIVE
        ═══════════════════════════════════════════════════ */}
        <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
          <div className="absolute inset-0"><ParticleCanvas /></div>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 35%, rgba(136,0,255,0.13) 0%, transparent 70%)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(26,26,26,0) 45%, rgba(26,26,26,1) 100%)' }} />
          <motion.div className="absolute inset-0 opacity-20 pointer-events-none" style={{ y: heroY }}>
            <img src="/images/hero_crystal.png" alt="" className="w-full h-full object-cover" aria-hidden
              style={{ filter: 'saturate(1.4) contrast(1.15)' }} />
          </motion.div>

          <motion.div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-28" style={{ opacity: heroOpacity }}>
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-10"
              style={{ border: '1px solid rgba(136,0,255,0.4)', background: 'rgba(136,0,255,0.07)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#CDFF00' }} />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/65">
                #1 Brasil em Marketing &amp; IA · 16 Prêmios Google Awards · Tess AI #6 Global G2
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl font-black mb-8"
              style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3.2rem)', fontFamily: "'Roboto', sans-serif", letterSpacing: '-0.035em', lineHeight: 1.08 }}>
              <span className="text-white block">2026 é o último ano</span>
              <span className="block" style={{ background: 'linear-gradient(95deg, #8800FF 0%, #CDFF00 65%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                em que isso ainda é opcional.
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.52 }}
              className="max-w-xl text-base leading-relaxed mb-14" style={{ color: 'rgba(255,255,255,0.52)', fontWeight: 300 }}>
              As empresas brasileiras com faturamento R$1M+ que integram IA customizada em seus processos competitivos agora
              <span className="text-white font-semibold"> são as que vão ditar as regras do setor de 2027 a 2030</span>.
              As que esperarem, comprarão do concorrente que não esperou.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4 items-center">
              <PrimaryButton href={CALENDLY_URL}>
                <Calendar className="w-5 h-5" />
                Agendar com Especialista Pareto
              </PrimaryButton>
              <SecondaryButton onClick={() => scrollToSection('argumento')}>
                Entender o porquê
                <ChevronDown className="w-4 h-4" />
              </SecondaryButton>
            </motion.div>

            {/* Stats row */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-24 pt-8"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {KEY_STATS.slice(0, 4).map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-black text-white">
                    <AnimatedNumber value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                  <div className="text-xs mt-1 leading-tight" style={{ fontWeight: 300, color: 'rgba(255,255,255,0.38)' }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
            className="absolute bottom-[320px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection('argumento')}>
            <motion.div animate={{ y: [0, 9, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
              <ChevronDown className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.25)' }} />
            </motion.div>
          </motion.div>
        </section>

        {/* ─── Partner Badges Bar ─── */}
        <div style={{ background: 'rgba(16,16,16,1)', borderTop: '1px solid rgba(136,0,255,0.15)', borderBottom: '1px solid rgba(136,0,255,0.15)', padding: '18px 24px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.35)', marginRight: 8 }}>Parceiro oficial:</span>
            {PARTNER_BADGES.map((b) => (
              b.img ? (
                <div key={b.name} title={b.name} style={{ background: 'rgba(255,255,255,0.97)', borderRadius: 40, width: 58, height: 58, padding: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.5)', flexShrink: 0, transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(136,0,255,0.3)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.5)'; }}>
                  <img src={b.img} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
              ) : (
                <div key={b.name} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 99, background: 'rgba(22,22,22,0.9)', border: `1px solid ${b.color}30` }}>
                  <span style={{ width: 18, height: 18, borderRadius: '50%', background: b.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 900 }}>{b.icon}</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{b.name}</span>
                </div>
              )
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            02 · O ARGUMENTO — A LÓGICA FRIA DOS NÚMEROS
        ═══════════════════════════════════════════════════ */}
        <section id="argumento" className="py-28 md:py-40 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(136,0,255,0.07) 0%, transparent 55%)' }} />
          <div className="max-w-5xl mx-auto px-6 lg:px-8">

            {/* The stat */}
            <RevealSection className="text-center mb-20">
              <SectionLabel>A Lógica Fria dos Números</SectionLabel>
              <div className="font-black leading-none mb-6" style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)', color: '#CDFF00', fontFamily: "'Roboto', sans-serif", letterSpacing: '-0.05em' }}>
                71<span style={{ fontSize: '0.45em', verticalAlign: 'super' }}>%</span>
              </div>
              <p className="text-base font-semibold text-white/80 max-w-2xl mx-auto leading-relaxed mb-5" style={{ fontFamily: "'Roboto', sans-serif" }}>
                das empresas brasileiras com faturamento acima de R$1M não atingiram suas metas de marketing em 2024.
              </p>
              <p className="text-sm max-w-2xl mx-auto leading-relaxed" style={{ fontWeight: 300, color: 'rgba(255,255,255,0.48)' }}>
                Não foi falta de esforço. Não foi falta de verba. Foi o modelo errado — construído para um mercado que não existe mais.
              </p>
            </RevealSection>

            {/* Stats from pareto.io/ai-for-business */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} variants={staggerContainer}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 64 }}>
              {[
                { stat: '3×', label: 'Custo real de um funcionário', desc: 'Entre encargos, benefícios, equipamento, gestão e turnover, o custo real é no mínimo o triplo do salário bruto.', color: '#8800FF' },
                { stat: '~40%', label: 'Produtividade efetiva do time', desc: 'Colaboradores gastam 60% do tempo em tarefas repetitivas que a IA executa em segundos — por fração do custo.', color: '#CDFF00' },
                { stat: '6–12m', label: 'Payback típico com IA', desc: 'Projetos de automação com IA atingem retorno em 6 a 12 meses com impacto mensurável nos primeiros sprints.', color: '#8800FF' },
              ].map((c) => (
                <motion.div key={c.label} variants={staggerItem} style={{ padding: 28, borderRadius: 20, background: 'rgba(18,18,18,0.95)', border: `1px solid ${c.color}25` }}>
                  <div style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', fontWeight: 900, color: c.color, letterSpacing: '-0.04em', fontFamily: "'Roboto', sans-serif", marginBottom: 8 }}>{c.stat}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{c.label}</div>
                  <p style={{ fontSize: 12, lineHeight: 1.65, color: 'rgba(255,255,255,0.5)' }}>{c.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Narrative bridge */}
            <NarrativeBridge>
              Os 29% que acertaram não encontraram uma agência melhor. Eles mudaram o modelo. Trocaram campanhas por infraestrutura. Trocaram tática por aprendizado permanente. E a distância entre eles e os outros está crescendo todo mês — sem parar.
            </NarrativeBridge>

            {/* The shift cards */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-20">
              {[
                {
                  label: 'O que o mercado diz', before: '"Vou contratar uma boa agência digital."',
                  after: 'Resultado: mais do mesmo, relatório bonito, metas não atingidas.',
                  tone: 'dim',
                },
                {
                  label: 'O que os 29% fizeram', before: '"Vou construir inteligência que aprende o meu negócio."',
                  after: 'Resultado: sistema que fica mais inteligente todo mês, com seus dados, para o seu mercado.',
                  tone: 'bright',
                },
                {
                  label: 'O que acontece em 2027', before: '"Não preciso mais disputar — o sistema trabalha enquanto minha equipe decide."',
                  after: 'Resultado: posição de mercado consolidada. Custo para alcançar: inalcançável.',
                  tone: 'urgent',
                },
              ].map((c) => (
                <motion.div key={c.label} variants={staggerItem} className="p-7 rounded-2xl"
                  style={{
                    background: c.tone === 'bright' ? 'rgba(136,0,255,0.09)' : c.tone === 'urgent' ? 'rgba(205,255,0,0.04)' : 'rgba(18,18,18,0.9)',
                    border: c.tone === 'bright' ? '1px solid rgba(136,0,255,0.4)' : c.tone === 'urgent' ? '1px solid rgba(205,255,0,0.2)' : '1px solid rgba(255,255,255,0.06)',
                  }}>
                  <div className="text-xs font-bold tracking-widest uppercase mb-5"
                    style={{ color: c.tone === 'bright' ? '#8800FF' : c.tone === 'urgent' ? '#CDFF00' : 'rgba(255,255,255,0.3)' }}>
                    {c.label}
                  </div>
                  <blockquote className="text-sm font-bold text-white leading-relaxed mb-4 italic">
                    {c.before}
                  </blockquote>
                  <p className="text-xs leading-relaxed" style={{ color: c.tone === 'dim' ? 'rgba(255,100,100,0.7)' : 'rgba(255,255,255,0.5)' }}>
                    {c.after}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── Office parallax strip ─── */}
        <OfficeStrip />

        {/* ═══════════════════════════════════════════════════
            03 · O VAZAMENTO — TRÊS CAMADAS DE PERDA REAL
        ═══════════════════════════════════════════════════ */}
        <section id="problema" className="py-28 relative overflow-hidden" style={{ background: 'rgba(20,20,20,0.95)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(136,0,255,0.07) 0%, transparent 70%)' }} />
          <div className="max-w-7xl mx-auto px-6 lg:px-8">

            <RevealSection className="text-center mb-6">
              <SectionLabel>O Custo do Statu Quo</SectionLabel>
              <h2 className="text-xl md:text-2xl font-black text-white mb-4">
                Três Camadas de Perda.<br />
                <span style={{ color: '#CDFF00' }}>Você Provavelmente Tem as Três.</span>
              </h2>
            </RevealSection>

            <RevealSection className="text-center mb-16">
              <p className="text-sm max-w-2xl mx-auto leading-relaxed" style={{ fontWeight: 300, color: 'rgba(255,255,255,0.48)' }}>
                Não é fraqueza do seu time. É uma questão de modelo. O modelo atual de marketing digital foi desenhado para um mercado de 2019. Aplicar esse modelo em 2026 é como usar internet discada para operar em fibra.
              </p>
            </RevealSection>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  stage: '01', color: '#CDFF00', label: 'Hoje',
                  title: 'Perda Operacional',
                  headline: 'Dinheiro saindo pelo ralo agora — corrigível em 14 dias.',
                  items: [
                    'Leads não qualificados consomem 60% do tempo de vendas',
                    'Sua equipe responde leads em horas. Com IA: 2 minutos. O resultado: você perde o cliente ainda quente.',
                    '35–50% do orçamento em mídia paga não gera pipeline real',
                    'Conteúdo manual: 4 peças por semana. IA treinada: 40 peças por semana, na sua voz.',
                  ],
                },
                {
                  stage: '02', color: '#8800FF', label: 'Acumulando',
                  title: 'Lacuna Estratégica',
                  headline: 'Um gap invisível que compõe todo mês — enquanto seu concorrente aprende.',
                  items: [
                    'Cada mês que passa, o sistema de IA do concorrente aprende mais sobre o mercado que você divide com ele.',
                    'ROI médio de stack MarTech com IA implementada: 285%. Sem IA: abaixo do custo de aquisição.',
                    'Mês 1: 5% de diferença. Mês 6: 35%. Mês 12: 65% de gap — e crescendo.',
                    'Esse gap não é recuperável com mais investimento depois. Dados de hoje só existem hoje.',
                  ],
                },
                {
                  stage: '03', color: '#ff5555', label: '2027–2030',
                  title: 'Risco Existencial',
                  headline: 'A bifurcação de mercado que vai dividir cada setor em vencedores e perdedores.',
                  items: [
                    'IA não será diferencial competitivo em 2027. Será infraestrutura básica — como ter CNPJ.',
                    'O modelo de negócio de cada setor vai se reorganizar em torno de quem tem inteligência operacional.',
                    'Empresa sem IA customizada em 2027 = empresa sem site em 2012.',
                    'A janela para entrar como first-mover no seu setor não é infinita. E está fechando.',
                  ],
                },
              ].map((s) => (
                <motion.div key={s.stage} variants={staggerItem} className="rounded-2xl overflow-hidden"
                  style={{ background: 'rgba(18,18,18,0.95)', border: `1px solid ${s.color}20` }}>
                  <div className="px-7 pt-7 pb-4" style={{ borderBottom: `1px solid ${s.color}15` }}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full"
                        style={{ background: `${s.color}15`, color: s.color }}>{s.label}</span>
                      <span className="text-2xl font-black" style={{ color: `${s.color}30` }}>{s.stage}</span>
                    </div>
                    <h3 className="text-xl font-black text-white mb-2">{s.title}</h3>
                    <p className="text-xs leading-relaxed italic" style={{ color: `${s.color}80` }}>{s.headline}</p>
                  </div>
                  <ul className="p-7 space-y-4">
                    {s.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.58)' }}>
                        <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>

            <RevealSection className="text-center mt-16">
              <p className="text-sm mb-8 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.38)' }}>
                Se ao ler isto você reconheceu pelo menos dois desses cenários na sua empresa, você está exatamente no momento certo para a próxima conversa.
              </p>
              <PrimaryButton href={CALENDLY_URL}>
                <Calendar className="w-5 h-5" /> Quero Diagnosticar Minha Empresa Agora
              </PrimaryButton>
            </RevealSection>
          </div>
        </section>

        {/* ═══ 4 SOLUÇÕES (AI for Business) ═══ */}
        <section id="solucoes" style={{ padding: '80px 24px', background: 'rgba(16,16,16,0.98)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 40% at 80% 50%, rgba(136,0,255,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <RevealSection className="text-center mb-14">
              <SectionLabel>O que entregamos</SectionLabel>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: 16 }}>
                4 formas de devolver tempo<br />
                <span style={{ background: 'linear-gradient(90deg, #8800FF 0%, #CDFF00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>e gerar receita.</span>
              </h2>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontWeight: 300, maxWidth: 520, margin: '0 auto' }}>
                Cada solução é desenhada para gerar retorno financeiro mensurável — não para impressionar em apresentações.
              </p>
            </RevealSection>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} variants={staggerContainer}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 56 }}>
              {[
                { tag: 'Automation', emoji: '⚙️', title: 'Processos Automatizados', arrow: '→ Redução de headcount operacional', desc: 'Substituímos tarefas manuais por sistemas 24/7. RPA, integrações, workflows inteligentes. Sem contratar mais para crescer.' },
                { tag: 'AI Workers', emoji: '🤖', title: 'Colaboradores Digitais', arrow: '→ Capacidade sem custo fixo', desc: 'Agentes autônomos com funções, atribuições e reporte. Disponíveis 24/7 sem férias nem turnover. Trabalham enquanto seu time decide.' },
                { tag: 'AI Agents', emoji: '🧠', title: 'Agentes Inteligentes', arrow: '→ Processos que adaptam', desc: 'IA generativa conectada ao seu negócio — treinada com seus dados, integrada ao CRM, ERP e APIs. Fluxos que pensam e reagem.' },
                { tag: 'Consulting', emoji: '🎯', title: 'AI Builders Alocados', arrow: '→ ROI mensurável por sprint', desc: 'Especialistas embarcados na sua empresa. Mapeamento de processos, priorização por impacto financeiro, implementação em sprints.' },
              ].map((s) => (
                <motion.div key={s.tag} variants={staggerItem}
                  style={{ padding: 24, borderRadius: 20, background: 'rgba(22,22,22,0.95)', border: '1px solid rgba(136,0,255,0.2)', display: 'flex', flexDirection: 'column' as const, height: '100%' }}>
                  <div style={{ fontSize: 28, marginBottom: 14 }}>{s.emoji}</div>
                  <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase' as const, padding: '4px 10px', borderRadius: 99, background: 'rgba(136,0,255,0.1)', color: '#8800FF', border: '1px solid rgba(136,0,255,0.25)', alignSelf: 'flex-start', marginBottom: 14 }}>{s.tag}</span>
                  <h3 style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ fontSize: 12, lineHeight: 1.65, color: 'rgba(255,255,255,0.48)', flex: 1, marginBottom: 14 }}>{s.desc}</p>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#CDFF00' }}>{s.arrow}</div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }} className="md:grid-cols-4">
              {[{ num: 12, suf: '+', label: 'Anos de operação' }, { num: 300, suf: '+', label: 'Empresas atendidas' }, { num: 500, suf: '+', label: 'Projetos de IA entregues' }, { num: 160, suf: '+', label: 'Especialistas em IA' }].map((s) => (
                <motion.div key={s.label} variants={staggerItem} style={{ textAlign: 'center', padding: '20px 16px', borderRadius: 16, background: 'rgba(22,22,22,0.8)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', fontWeight: 900, color: '#fff', marginBottom: 4 }}>
                    <AnimatedNumber value={s.num} suffix={s.suf} />
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', fontWeight: 300 }}>{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            04 · A VIRADA — POR QUE PADRONIZAÇÃO MATOU O CRESCIMENTO
        ═══════════════════════════════════════════════════ */}
        <section className="py-28 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none opacity-20"
            style={{ background: 'radial-gradient(ellipse 80% 80% at 100% 50%, rgba(136,0,255,0.3) 0%, transparent 70%)' }} />
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <RevealSection>
                <SectionLabel>A Ruptura de Modelo</SectionLabel>
                <h2 className="text-xl md:text-2xl font-black text-white mb-8" style={{ lineHeight: 1.2 }}>
                  A padronização foi
                  <br />boa enquanto durou.
                  <br />
                  <span style={{ color: '#8800FF' }}>Ela acabou em 2024.</span>
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      label: 'O velho modelo',
                      text: 'Você contratava uma agência. Ela aplicava o mesmo playbook que aplicou para outros 40 clientes. Você competia com todo mundo usando as mesmas ferramentas, os mesmos criativos, a mesma lógica de segmentação. O resultado era mediano — porque todos eram medianos juntos.',
                      tone: 'dim',
                    },
                    {
                      label: 'O novo modelo',
                      text: 'IA treinada nos seus dados específicos cria uma curva de aprendizado proprietária. Mês a mês, o sistema entende mais sobre quem compra de você, por que compra, quando está pronto para comprar. Essa inteligência não pode ser copiada — porque foi construída com os dados do seu negócio, não de outro.',
                      tone: 'bright',
                    },
                    {
                      label: 'A vantagem que você constrói',
                      text: 'Enquanto concorrentes pagam por leads genéricos, você qualifica automaticamente. Enquanto eles briefam criativos, você entrega 40 peças por semana no tom exato da sua marca. Enquanto eles revisam relatórios mensais, você age em tempo real. A diferença cresce todo mês. Sem parar.',
                      tone: 'urgent',
                    },
                  ].map((item) => (
                    <div key={item.label} className="p-6 rounded-2xl"
                      style={{
                        background: item.tone === 'bright' ? 'rgba(136,0,255,0.07)' : item.tone === 'urgent' ? 'rgba(205,255,0,0.04)' : 'rgba(255,255,255,0.03)',
                        border: item.tone === 'bright' ? '1px solid rgba(136,0,255,0.25)' : item.tone === 'urgent' ? '1px solid rgba(205,255,0,0.15)' : '1px solid rgba(255,255,255,0.05)',
                      }}>
                      <div className="text-xs font-bold tracking-widest uppercase mb-3"
                        style={{ color: item.tone === 'bright' ? '#8800FF' : item.tone === 'urgent' ? '#CDFF00' : 'rgba(255,255,255,0.3)' }}>
                        {item.label}
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: item.tone === 'dim' ? 'rgba(255,100,100,0.65)' : 'rgba(255,255,255,0.62)' }}>
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </RevealSection>

              {/* Comparison table */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}
                className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(136,0,255,0.2)' }}>
                <div className="grid grid-cols-2">
                  <div className="p-5 text-xs font-black tracking-widest uppercase text-center" style={{ background: 'rgba(255,100,100,0.08)', color: 'rgba(255,100,100,0.7)', borderRight: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Agência padrão</div>
                  <div className="p-5 text-xs font-black tracking-widest uppercase text-center" style={{ background: 'rgba(136,0,255,0.1)', color: '#8800FF', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Pareto Plus</div>
                </div>
                {[
                  ['Template genérico do setor', 'Construída sobre seus dados reais'],
                  ['Conteúdo manual, 2–4 peças/semana', 'IA treinada na sua marca, 10× volume'],
                  ['Resposta a leads: 4–8 horas', 'Qualificação IA: 2 minutos, 24/7'],
                  ['Otimização: revisão semanal', 'Ajuste em tempo real, hora a hora'],
                  ['Relatório mensal de vaidade', 'BI ao vivo, alertas preditivos'],
                  ['Reseta com cada novo gestor', 'Aprende e compõe — para sempre'],
                  ['Serve 40 clientes com o mesmo playbook', 'Inteligência exclusiva do seu negócio'],
                ].map(([before, after], i) => (
                  <div key={before} className="grid grid-cols-2"
                    style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="p-4 text-xs leading-snug pr-3" style={{ color: 'rgba(255,100,100,0.6)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>{before}</div>
                    <div className="p-4 text-xs leading-snug pl-3" style={{ color: 'rgba(205,255,0,0.75)' }}>{after}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            05 · A PARETO — 13 ANOS DE PROVA, NÃO PROMESSA
        ═══════════════════════════════════════════════════ */}
        <section id="pareto" className="py-28 relative" style={{ background: 'rgba(20,20,20,0.95)' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <RevealSection className="text-center mb-20">
              <SectionLabel>Quem vai implementar</SectionLabel>
              <h2 className="text-xl md:text-2xl font-black text-white mb-6" style={{ lineHeight: 1.2 }}>
                13 anos construindo IA<br />
                <span style={{ color: '#8800FF' }}>para os negócios que lideram o Brasil.</span>
              </h2>
              <p className="text-sm max-w-2xl mx-auto leading-relaxed" style={{ fontWeight: 300, color: 'rgba(255,255,255,0.48)' }}>
                Não somos uma startup de IA que lançou produto em 2023 e está aprendendo com seus clientes. Somos a empresa que treinou os primeiros algoritmos de marketing com IA no Brasil, que criou a 6ª melhor plataforma de IA do mundo e que acumula 13 anos de inteligência do mercado brasileiro. Você não vai errar na escolha.
              </p>
            </RevealSection>

            {/* Numbers wall */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
              {KEY_STATS.map((s) => (
                <motion.div key={s.label} variants={staggerItem} className="p-6 rounded-2xl text-center group transition-all duration-300"
                  style={{ background: 'rgba(22,22,22,0.9)', border: '1px solid rgba(136,0,255,0.1)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(136,0,255,0.4)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(136,0,255,0.1)'; }}>
                  <div className="text-2xl md:text-3xl font-black mb-2"
                    style={{ background: 'linear-gradient(90deg,#8800FF,#CDFF00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    <AnimatedNumber value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                  <div className="text-xs leading-tight" style={{ fontWeight: 300, color: 'rgba(255,255,255,0.42)' }}>{s.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Awards */}
            <RevealSection className="mb-20">
              <h3 className="text-sm font-bold tracking-widest uppercase text-center mb-8" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Reconhecimento global que valida cada conversa
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {AWARDS.filter((a) => a.highlight).map((a) => (
                  <div key={a.title} className="flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{ background: 'rgba(136,0,255,0.08)', border: '1px solid rgba(136,0,255,0.25)' }}>
                    <Award className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#CDFF00' }} />
                    <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.65)' }}>{a.title}</span>
                    <span className="text-xs font-bold" style={{ color: '#8800FF' }}>— {a.org} {a.year}</span>
                  </div>
                ))}
              </div>
            </RevealSection>

            {/* Tess AI */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}>
                <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(136,0,255,0.25)' }}>
                  <img src="/images/tess_ai_illustration.png" alt="Tess AI" className="w-full" style={{ display: 'block', filter: 'grayscale(0.65) contrast(1.1)' }} loading="lazy" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(136,0,255,0.28) 0%, rgba(205,255,0,0.08) 100%)', mixBlendMode: 'multiply' as const, pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 60px rgba(136,0,255,0.3)', pointerEvents: 'none' }} />
                </div>
              </motion.div>
              <RevealSection>
                <SectionLabel>Nossa Plataforma Proprietária</SectionLabel>
                <h3 className="text-lg md:text-xl font-black text-white mb-6" style={{ lineHeight: 1.3 }}>
                  Tess AI: a plataforma que<br />
                  <span style={{ color: '#8800FF' }}>supera o ChatGPT no ranking.</span>
                </h3>
                <p className="text-white/58 leading-relaxed mb-6">
                  Quando a Pareto implementa IA na sua empresa, não usa ferramentas de terceiros. Usa sua plataforma proprietária — a Tess AI, eleita em 2024 como o 6º melhor produto de IA do mundo pela G2. O ChatGPT ficou em 10º. O Google Gemini em 22º.
                </p>
                <p className="text-white/58 leading-relaxed mb-8">
                  Isso significa que você tem acesso a +200 modelos de IA líderes globais — GPT-4o, Claude 3.5, Gemini, Midjourney, Runway e outros — em uma única plataforma com segurança enterprise, Brand Voice treinada para a sua empresa e automação de workflows personalizada.
                </p>
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {[['#6', 'Global G2 2024'], ['+200', 'Modelos IA'], ['+2M', 'Usuários']].map(([v, l]) => (
                    <div key={l} className="p-4 rounded-xl text-center" style={{ background: 'rgba(136,0,255,0.08)', border: '1px solid rgba(136,0,255,0.18)' }}>
                      <div className="text-2xl font-black text-white">{v}</div>
                      <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.42)' }}>{l}</div>
                    </div>
                  ))}
                </div>
              </RevealSection>
            </div>
          </div>
        </section>

        {/* ─── Client Marquee ──────────────────────────────────────── */}
        <section className="py-16" style={{ background: 'rgba(17,17,17,0.98)' }}>
          <RevealSection className="max-w-3xl mx-auto px-6 text-center mb-10">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'rgba(136,0,255,0.6)' }}>Portfólio de Clientes</p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>As melhores marcas do mundo crescem com a Pareto. Sua empresa pode ser a próxima.</p>
          </RevealSection>
          <div className="space-y-3">
            <Marquee items={clients.slice(0, half)} />
            <Marquee items={clients.slice(half)} reverse />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            06 · RESULTADOS REAIS — PROVA ANTES DO COMPROMETIMENTO
        ═══════════════════════════════════════════════════ */}
        <section id="resultados" className="py-28 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(205,255,0,0.04) 0%, transparent 70%)' }} />
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <RevealSection className="text-center mb-6">
              <SectionLabel>Casos Reais</SectionLabel>
              <h2 className="text-xl md:text-2xl font-black text-white mb-4">
                Não são promessas.<br />
                <span style={{ color: '#CDFF00' }}>São contratos encerrados com prova.</span>
              </h2>
            </RevealSection>
            <RevealSection className="text-center mb-16">
              <p className="text-sm max-w-xl mx-auto leading-relaxed" style={{ fontWeight: 300, color: 'rgba(255,255,255,0.45)' }}>
                Esses resultados não vieram de ferramentas genéricas. Vieram de IA construída especificamente para cada negócio, em cada setor, com os dados reais de cada cliente.
              </p>
            </RevealSection>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {CASES.map((c) => (
                <motion.div key={c.client} variants={staggerItem} className="rounded-2xl overflow-hidden"
                  style={{ background: 'rgba(18,18,18,0.95)', border: '1px solid rgba(205,255,0,0.1)' }}>
                  <div className="p-8 border-b" style={{ borderColor: 'rgba(205,255,0,0.07)' }}>
                    <div className="text-5xl font-black mb-1" style={{ color: '#CDFF00' }}>
                      {c.sign}<AnimatedNumber value={parseInt(c.value)} suffix={parseInt(c.value) > 9 ? '%' : ''} />
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.38)' }}>{c.sector}</div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm font-semibold text-white mb-2 leading-snug">{c.metric}</p>
                    <p className="text-xs leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.45)' }}>{c.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {c.tags.map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded-full text-xs"
                          style={{ background: 'rgba(136,0,255,0.1)', color: 'rgba(136,0,255,0.75)', border: '1px solid rgba(136,0,255,0.2)' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <NarrativeBridge>
              Esses números representam negócios reais que decidiram que IA customizada não era um experimento — era a próxima vantagem competitiva. Você está vendo os resultados. A pergunta é: quando o seu setor vai ver os seus?
            </NarrativeBridge>
          </div>
        </section>

        {/* ─── Building parallax strip ─── */}
        <BuildingStrip />

        {/* ═══════════════════════════════════════════════════
            07 · O QUE É A PARCERIA — NÃO UMA AGÊNCIA, UMA TRANSFORMAÇÃO
        ═══════════════════════════════════════════════════ */}
        <section id="parceria" className="py-28 relative" style={{ background: 'rgba(20,20,20,0.98)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(136,0,255,0.07) 0%, transparent 70%)' }} />
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

              <RevealSection>
                <SectionLabel>O que você está contratando</SectionLabel>
                <h2 className="text-lg md:text-xl font-black text-white mb-8" style={{ lineHeight: 1.3 }}>
                  Não uma agência.<br />
                  <span style={{ color: '#8800FF' }}>Um parceiro que transfere conhecimento</span>
                  <br />e prepara você para a nova ordem.
                </h2>
                <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  A Pareto não executa e vai embora. Ela entra na operação, entende o seu negócio em profundidade, constrói sistemas de IA que aprendem com os seus dados e treina sua equipe para operar nessa nova lógica. O objetivo final é que você seja independente — mais forte, mais rápido e mais inteligente do que era antes.
                </p>
                <div className="space-y-4 mb-10">
                  {[
                    { title: 'Diagnóstico real, não de prateleira', text: 'Começamos mapeando os processos que geram mais custo oculto ou mais receita não capturada no seu negócio.' },
                    { title: 'Construção customizada, não genérica', text: 'Cada sistema de IA é construído para a sua empresa, seu setor, sua linguagem de marca e seus dados históricos.' },
                    { title: 'Execução com accountability de resultado', text: 'Medimos impacto em receita, custo operacional e velocidade de decisão. Não em impressões ou alcance.' },
                    { title: 'Transferência de conhecimento real', text: 'Sua equipe aprende a operar com IA. Você sai mais forte e mais independente do que entrou.' },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4 p-5 rounded-xl"
                      style={{ background: 'rgba(136,0,255,0.06)', border: '1px solid rgba(136,0,255,0.15)' }}>
                      <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: '#CDFF00' }} />
                      <div>
                        <div className="text-sm font-bold text-white mb-1">{item.title}</div>
                        <div className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </RevealSection>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="space-y-5">
                {/* Quote card */}
                <div className="p-8 rounded-2xl" style={{ background: 'rgba(136,0,255,0.07)', border: '1px solid rgba(136,0,255,0.25)', boxShadow: '0 0 60px rgba(136,0,255,0.1)' }}>
                  <Quote className="w-8 h-8 mb-4" style={{ color: 'rgba(136,0,255,0.5)' }} />
                  <p className="text-lg font-bold text-white leading-relaxed mb-5 italic">
                    "Contratar a Pareto em 2026 não é uma decisão de marketing. É um investimento estratégico na posição competitiva que sua empresa vai ocupar em 2028."
                  </p>
                  <div className="flex items-center gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-xs"
                      style={{ background: 'linear-gradient(135deg,#8800FF,#CDFF00)', color: '#000' }}>P</div>
                    <div>
                      <div className="text-sm font-bold text-white">Pareto Plus</div>
                      <div className="text-xs" style={{ color: 'rgba(255,255,255,0.38)' }}>Estratégia de Parceria</div>
                    </div>
                  </div>
                </div>
                {/* AI agents visual */}
                <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(205,255,0,0.2)' }}>
                  <img src="/images/ai_agents_illustration.png" alt="AI Agents" className="w-full" style={{ display: 'block', filter: 'grayscale(0.6) contrast(1.05)' }} loading="lazy" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(136,0,255,0.2) 0%, rgba(205,255,0,0.18) 100%)', mixBlendMode: 'color' as const, pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 50px rgba(205,255,0,0.15)', pointerEvents: 'none' }} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            08 · QUALIFICAÇÃO — NÃO É PARA TODOS
        ═══════════════════════════════════════════════════ */}
        <section className="py-28 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(136,0,255,0.08) 0%, transparent 50%, rgba(205,255,0,0.04) 100%)' }} />
          <div className="max-w-4xl mx-auto px-6 text-center">
            <RevealSection>
              <SectionLabel>Quem é esta parceria</SectionLabel>
              <h2 className="text-xl md:text-2xl font-black text-white mb-6" style={{ lineHeight: 1.2 }}>
                Esta não é uma oferta
                <br />para quem ainda está
                <br />
                <span style={{ color: '#CDFF00' }}>em dúvida.</span>
              </h2>
              <p className="text-sm max-w-2xl mx-auto leading-relaxed mb-14" style={{ fontWeight: 300, color: 'rgba(255,255,255,0.52)' }}>
                A Pareto Plus existe para empresas cujos líderes já entenderam que o período 2026–2030 é o mais crítico para o seu setor em décadas — e que precisam de um parceiro que já fez isso antes, que tem a tecnologia proprietária para isso e que vai colocar equipe sênior no seu negócio para garantir a entrega.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left mb-14">
                <div className="p-7 rounded-2xl" style={{ background: 'rgba(205,255,0,0.05)', border: '1px solid rgba(205,255,0,0.2)' }}>
                  <h4 className="font-black mb-5 text-sm tracking-widest uppercase" style={{ color: '#CDFF00' }}>✓ Esta parceria é para você se:</h4>
                  <ul className="space-y-3">
                    {[
                      'Faturamento acima de R$1M/ano e visão clara de crescimento',
                      'Você tomou a decisão de investir na competitividade do seu negócio — não está avaliando',
                      'Você quer um parceiro que sente na mesa executiva e fala receita',
                      'Você entende que IA customizada é infraestrutura, não bônus',
                      'Você quer o melhor ROI — não a solução mais barata',
                      'Você quer que sua equipe aprenda e evolua no processo',
                    ].map((i) => (
                      <li key={i} className="flex gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                        <span className="flex-shrink-0 mt-0.5" style={{ color: '#CDFF00' }}>→</span>{i}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-7 rounded-2xl" style={{ background: 'rgba(255,68,68,0.04)', border: '1px solid rgba(255,68,68,0.15)' }}>
                  <h4 className="font-black mb-5 text-sm tracking-widest uppercase text-red-400">✗ Não é para você se:</h4>
                  <ul className="space-y-3">
                    {[
                      'Está avaliando o menor preço do mercado',
                      'Quer solução temporária ou teste sem compromisso',
                      'Não tem disposição para mudança de processo e modelo',
                      'Faturamento abaixo de R$1M/ano',
                      'Ainda está convencendo a liderança de que IA tem valor',
                      'Está em dúvida se este é o momento certo',
                    ].map((i) => (
                      <li key={i} className="flex gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        <span className="flex-shrink-0 text-red-400">✗</span>{i}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="text-sm mb-10 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Se você se reconheceu na coluna da esquerda, você está pronto para a próxima conversa.
              </p>
              <PrimaryButton href={CALENDLY_URL}>
                <Calendar className="w-5 h-5" />
                Agendar com Especialista Pareto
              </PrimaryButton>
            </RevealSection>
          </div>
        </section>

        {/* ─── Quote Break (replaces static futurism image break) ─── */}
        <QuoteBreak />

        {/* ═══════════════════════════════════════════════════
            09 · A JANELA — URGÊNCIA RACIONAL
        ═══════════════════════════════════════════════════ */}
        <section className="py-28 relative" style={{ background: 'rgba(20,20,20,1)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <RevealSection className="text-center mb-20">
              <SectionLabel>A Janela de First-Mover</SectionLabel>
              <h2 className="text-xl md:text-2xl font-black text-white mb-6" style={{ lineHeight: 1.2 }}>
                Por que 2026 é o ano decisivo<br />
                <span style={{ color: '#8800FF' }}>— e não 2027.</span>
              </h2>
              <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                A vantagem de IA é cumulativa. O sistema que você inicia hoje vai ter 12 meses de aprendizado a mais do que quem começa em 2027. Esses 12 meses de dados proprietários não podem ser comprados nem imitados. São seus — e só seus.
              </p>
            </RevealSection>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
              {[
                { year: '2026', label: 'Janela aberta', desc: 'First-mover por setor. Quem entra agora define o benchmark do mercado.', highlight: true },
                { year: '2027', label: 'Janela estreitando', desc: 'Primeiros resultados dos líderes visíveis. Vantagem de dados de 12 meses.', highlight: false },
                { year: '2028', label: 'Barreira de entrada', desc: 'Gap de inteligência entre líderes e seguidores torna-se difícil de fechar.', highlight: false },
                { year: '2030', label: 'Nova ordem definida', desc: 'Posições consolidadas. Empresas sem IA customizada perdem share estruturalmente.', highlight: false },
              ].map((item) => (
                <motion.div key={item.year} variants={staggerItem} className="p-6 rounded-2xl"
                  style={{
                    background: item.highlight ? 'rgba(136,0,255,0.1)' : 'rgba(18,18,18,0.9)',
                    border: item.highlight ? '1px solid rgba(136,0,255,0.45)' : '1px solid rgba(255,255,255,0.06)',
                    boxShadow: item.highlight ? '0 0 40px rgba(136,0,255,0.15)' : 'none',
                  }}>
                  <div className="text-3xl font-black mb-2 text-white">{item.year}</div>
                  <div className="text-xs font-black tracking-widest uppercase mb-3"
                    style={{ color: item.highlight ? '#CDFF00' : 'rgba(255,255,255,0.3)' }}>{item.label}</div>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <NarrativeBridge>
              Cada empresa do seu setor que a Pareto onboarda antes de você tem 12, 18, 24 meses de vantagem de dados. Não é tarde — mas não é cedo. A janela está aberta. A questão é quanto tempo vai demorar para você caminhar até ela.
            </NarrativeBridge>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            10 · FINAL CTA — A DECISÃO
        ═══════════════════════════════════════════════════ */}
        <section id="contato" className="py-32 md:py-48 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 90% 90% at 50% 50%, rgba(136,0,255,0.14) 0%, transparent 70%)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 40% 40% at 80% 20%, rgba(205,255,0,0.05) 0%, transparent 60%)' }} />
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <RevealSection>
              <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-10"
                style={{ border: '1px solid rgba(205,255,0,0.3)', background: 'rgba(205,255,0,0.06)' }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#CDFF00' }} />
                <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#CDFF00' }}>
                  A janela está aberta. Ela não vai ficar aberta para sempre.
                </span>
              </div>

              <h2 className="font-black text-white mb-8"
                style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3rem)', fontFamily: "'Roboto', sans-serif", letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                Você já tomou<br />a decisão.<br />
                <span style={{ background: 'linear-gradient(90deg,#8800FF 0%,#CDFF00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Agora dê o próximo passo.
                </span>
              </h2>

              <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
                O próximo passo não é uma venda. É uma conversa de 30 minutos com um especialista Pareto que vai mapear, com dados do seu setor, onde a IA gera o maior retorno no seu negócio — e o que precisa ser construído primeiro.
              </p>
              <p className="text-base max-w-xl mx-auto leading-relaxed mb-14" style={{ color: 'rgba(255,255,255,0.38)' }}>
                Sem apresentação genérica. Sem proposta de prateleira. Com o compromisso de ser honesto sobre o que faz sentido para o seu momento.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center mb-8">
                <PrimaryButton href={CALENDLY_URL}>
                  <Calendar className="w-5 h-5" />
                  Agendar Diagnóstico com Especialista
                </PrimaryButton>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-7 py-4 rounded-full font-bold text-white transition-all duration-300"
                  style={{ border: '1px solid rgba(255,255,255,0.18)' }}>
                  <MessageCircle className="w-5 h-5" />
                  Ou falar agora pelo WhatsApp
                </a>
              </div>

              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                Atendemos exclusivamente empresas com faturamento acima de R$1M/ano · Vagas limitadas por trimestre
              </p>
            </RevealSection>
          </div>
        </section>

        {/* ─── Awards strip ─────────────────────────────────────────── */}
        <div className="py-6" style={{ background: 'rgba(8,8,8,1)', borderTop: '1px solid rgba(136,0,255,0.08)' }}>
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-5">
            {[
              { icon: <Award className="w-3.5 h-3.5" />, text: '16 Prêmios Google Awards NY' },
              { icon: <Star className="w-3.5 h-3.5" />, text: 'Tess AI #6 Melhor IA Global — G2 2024' },
              { icon: <Award className="w-3.5 h-3.5" />, text: 'Google Premier Partner 2025' },
              { icon: <Star className="w-3.5 h-3.5" />, text: 'Meta Business Partner' },
              { icon: <Award className="w-3.5 h-3.5" />, text: 'Invested by Google AI for Startups' },
            ].map((a) => (
              <div key={a.text} className="flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.32)' }}>
                <span style={{ color: '#8800FF' }}>{a.icon}</span>{a.text}
              </div>
            ))}
          </div>
        </div>

        {/* ─── LGPD ─────────────────────────────────────────────────── */}
        <LGPDBanner />
      </main>
    </>
  );
}

// ─── LGPD Banner ─────────────────────────────────────────────────────────────
function LGPDBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem('pareto_lgpd')) setTimeout(() => setVisible(true), 2500);
  }, []);
  const accept = () => { localStorage.setItem('pareto_lgpd', '1'); setVisible(false); };
  if (!visible) return null;
  return (
    <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-sm z-50 p-6 rounded-2xl"
      style={{ background: 'rgba(18,18,18,0.97)', border: '1px solid rgba(136,0,255,0.25)', backdropFilter: 'blur(20px)', boxShadow: '0 0 40px rgba(136,0,255,0.15)' }}>
      <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.65)' }}>
        <span className="font-bold text-white">🔒 LGPD</span> — Usamos cookies para melhorar sua experiência. Dados tratados conforme a{' '}
        <a href="#/privacidade" className="underline" style={{ color: '#8800FF' }}>Política de Privacidade</a> e Lei nº 13.709/2018.
      </p>
      <div className="flex gap-3">
        <button onClick={accept} className="flex-1 py-2.5 rounded-full text-xs font-bold text-white"
          style={{ background: 'linear-gradient(135deg,#8800FF,#6600CC)' }}>
          Aceitar
        </button>
        <a href="#/privacidade" className="flex-1 py-2.5 rounded-full text-xs text-center transition-colors"
          style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.45)' }}>
          Ver política
        </a>
      </div>
    </motion.div>
  );
}
