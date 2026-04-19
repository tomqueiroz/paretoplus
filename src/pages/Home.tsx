import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MessageCircle, ChevronDown, Calendar, X, Award, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
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

// ─── Parallax Strips ─────────────────────────────────────────────────────────

function OfficeParallaxStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  return (
    <div ref={ref} className="relative overflow-hidden" style={{ height: '300px' }}>
      <motion.div style={{ y, position: 'absolute', inset: '-12% 0', height: '124%' }}>
        <img src="/images/pareto_office1.png" alt="Escritório Pareto" aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'grayscale(0.3) contrast(1.1)', opacity: 0.35 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(136,0,255,0.30) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,26,26,0.88) 0%, rgba(26,26,26,0.25) 50%, rgba(26,26,26,0.88) 100%)' }} />
      </motion.div>
      <div className="relative z-10 flex items-center justify-center h-full px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="text-xs font-bold tracking-[0.22em] uppercase mb-3" style={{ color: '#8800FF' }}>Pareto · São Paulo</div>
          <p className="text-lg md:text-2xl font-black text-white" style={{ fontFamily: "'Roboto', sans-serif" }}>
            +160 especialistas. Um único objetivo:
            <br /><span style={{ color: '#CDFF00' }}>crescimento mensurável para o seu negócio.</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function BuildingParallaxStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  return (
    <div ref={ref} className="relative overflow-hidden" style={{ height: '260px' }}>
      <motion.div style={{ y, position: 'absolute', inset: '-12% 0', height: '124%' }}>
        <img src="/images/predio.png" alt="Sede Pareto" aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'grayscale(0.4) contrast(1.05)', opacity: 0.38 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(205,255,0,0.18) 0%, transparent 50%, rgba(136,0,255,0.08) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,26,26,0.88) 0%, rgba(26,26,26,0.25) 50%, rgba(26,26,26,0.88) 100%)' }} />
      </motion.div>
      <div className="relative z-10 flex items-center justify-center h-full px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <p className="text-base md:text-lg font-bold text-white/80" style={{ fontFamily: "'Roboto', sans-serif" }}>
            Consolação, São Paulo · Hub de Inovação em IA
          </p>
          <div className="mt-2 text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(205,255,0,0.65)' }}>Pareto HQ · Brasil & Silicon Valley</div>
        </motion.div>
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

// ─── LGPD Banner ──────────────────────────────────────────────────────────────
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

// ─── HOME ─────────────────────────────────────────────────────────────────────
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
      <LGPDBanner />

      <main style={{ background: '#1A1A1A', color: '#fff', fontFamily: "'Roboto', sans-serif" }}>

        {/* ═══════════════════════════════════════════════════
            01 · HERO
        ═══════════════════════════════════════════════════ */}
        <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
          {/* Particle canvas background */}
          <div className="absolute inset-0"><ParticleCanvas /></div>

          {/* Radial violet glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 35%, rgba(136,0,255,0.13) 0%, transparent 70%)' }} />

          {/* Gradient fade to bottom */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(26,26,26,0) 45%, rgba(26,26,26,1) 100%)' }} />

          {/* Crystal parallax */}
          <motion.div className="absolute inset-0 pointer-events-none" style={{ y: heroY, opacity: 0.2 }}>
            <img src="/images/hero_crystal.png" alt="" aria-hidden className="w-full h-full object-cover"
              style={{ filter: 'saturate(1.4) contrast(1.15)' }} />
          </motion.div>

          {/* Content */}
          <motion.div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-28" style={{ opacity: heroOpacity }}>

            {/* Badge pill */}
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-10"
              style={{ border: '1px solid rgba(136,0,255,0.4)', background: 'rgba(136,0,255,0.07)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#CDFF00' }} />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/65">
                #1 Brasil em Marketing &amp; IA · 16 Prêmios Google Awards · Tess AI #6 Global G2
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1 initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl font-black mb-8"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', fontFamily: "'Roboto', sans-serif", letterSpacing: '-0.035em', lineHeight: 1.08 }}>
              <span className="text-white block">2026 é o último ano</span>
              <span className="block pareto-gradient-text">em que isso ainda é opcional.</span>
            </motion.h1>

            {/* Subtext */}
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
                Entender o porquê <ChevronDown className="w-4 h-4" />
              </SecondaryButton>
            </motion.div>

            {/* Stats grid */}
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

          {/* Scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
            className="absolute bottom-[320px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection('argumento')}>
            <motion.div animate={{ y: [0, 9, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
              <ChevronDown className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.25)' }} />
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════
            02 · PARTNER BADGES BAR
        ═══════════════════════════════════════════════════ */}
        <div style={{ background: 'rgba(16,16,16,1)', borderTop: '1px solid rgba(136,0,255,0.15)', borderBottom: '1px solid rgba(136,0,255,0.15)' }}>
          <div className="max-w-7xl mx-auto px-6 py-8">
            <p className="text-center text-xs font-bold tracking-[0.22em] uppercase mb-6"
              style={{ color: 'rgba(255,255,255,0.35)' }}>
              Pareto é parceira oficial de todas as grandes plataformas.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {PARTNER_BADGES.map((b) => (
                b.img ? (
                  <div key={b.name} title={b.name} className="pareto-badge-img flex-shrink-0">
                    <img src={b.img} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                ) : (
                  <div key={b.name} className="flex items-center gap-2 px-4 py-2 rounded-full flex-shrink-0"
                    style={{ background: 'rgba(22,22,22,0.9)', border: `1px solid ${b.color}28` }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black"
                      style={{ background: b.color, color: '#fff' }}>{b.icon}</span>
                    <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>{b.name}</span>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            03 · THE COLD NUMBERS
        ═══════════════════════════════════════════════════ */}
        <section id="numeros" className="py-28 md:py-36 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(136,0,255,0.07) 0%, transparent 55%)' }} />
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <RevealSection className="text-center mb-16">
              <SectionLabel>A Lógica Fria dos Números</SectionLabel>
              <p className="text-sm max-w-xl mx-auto leading-relaxed" style={{ fontWeight: 300, color: 'rgba(255,255,255,0.48)' }}>
                Na sua empresa há pelo menos uma pessoa fazendo o que um agente de IA faria em segundos, por uma fração do custo.
              </p>
            </RevealSection>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
              {[
                {
                  stat: '3×', label: 'Custo real de um funcionário',
                  desc: 'Entre encargos, benefícios, equipamentos, gestão e turnover, o custo real de cada colaborador é no mínimo o triplo do salário bruto.',
                  color: '#8800FF',
                },
                {
                  stat: '~40%', label: 'Produtividade efetiva do time',
                  desc: 'Em média, colaboradores gastam 60% do tempo em tarefas repetitivas e retrabalho que a IA executa em segundos — por fração do custo.',
                  color: '#CDFF00',
                },
                {
                  stat: '6–12m', label: 'Payback típico com IA',
                  desc: 'Projetos de automação com IA atingem retorno em 6 a 12 meses e geram impacto mensurável já nos primeiros sprints de entrega.',
                  color: '#8800FF',
                },
              ].map((c) => (
                <motion.div key={c.label} variants={staggerItem}
                  className="pareto-card-hover p-7 rounded-2xl"
                  style={{ background: 'rgba(18,18,18,0.95)', border: `1px solid ${c.color}30` }}>
                  <div className="font-black mb-3" style={{
                    fontSize: 'clamp(2.2rem, 4.5vw, 3rem)', color: c.color,
                    letterSpacing: '-0.04em', fontFamily: "'Roboto', sans-serif"
                  }}>
                    {c.stat}
                  </div>
                  <div className="text-sm font-bold text-white mb-3">{c.label}</div>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{c.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <NarrativeBridge>
              "Na sua empresa há pelo menos uma pessoa fazendo o que um agente de IA faria em segundos, por uma fração do custo."
            </NarrativeBridge>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            04 · THE ARGUMENT — 71%
        ═══════════════════════════════════════════════════ */}
        <section id="argumento" className="py-28 md:py-36 relative overflow-hidden"
          style={{ background: 'rgba(16,16,16,0.98)' }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 60% at 80% 50%, rgba(136,0,255,0.08) 0%, transparent 70%)' }} />
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <RevealSection className="text-center mb-16">
              <SectionLabel>A Ruptura de Mercado</SectionLabel>
              <div className="font-black leading-none mb-6" style={{
                fontSize: 'clamp(4rem, 10vw, 8rem)', color: '#CDFF00',
                fontFamily: "'Roboto', sans-serif", letterSpacing: '-0.05em'
              }}>
                71<span style={{ fontSize: '0.45em', verticalAlign: 'super' }}>%</span>
              </div>
              <p className="text-base font-semibold text-white/80 max-w-2xl mx-auto leading-relaxed mb-5">
                das empresas brasileiras com faturamento acima de R$1M não atingiram suas metas em 2024.
              </p>
              <p className="text-sm max-w-2xl mx-auto leading-relaxed" style={{ fontWeight: 300, color: 'rgba(255,255,255,0.48)' }}>
                Não foi falta de esforço. Não foi falta de verba. Foi o modelo errado — construído para um mercado que não existe mais.
              </p>
            </RevealSection>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  label: 'O que o mercado diz',
                  before: '"Vou contratar uma boa agência digital."',
                  after: 'Resultado: mais do mesmo, relatório bonito, metas não atingidas.',
                  tone: 'dim',
                },
                {
                  label: 'O que os 29% fizeram',
                  before: '"Vou construir inteligência que aprende o meu negócio."',
                  after: 'Resultado: sistema que fica mais inteligente todo mês, com seus dados, para o seu mercado.',
                  tone: 'bright',
                },
                {
                  label: 'O que acontece em 2027',
                  before: '"Não preciso mais disputar — o sistema trabalha enquanto minha equipe decide."',
                  after: 'Resultado: posição de mercado consolidada. Custo para alcançar: inalcançável.',
                  tone: 'urgent',
                },
              ].map((c) => (
                <motion.div key={c.label} variants={staggerItem} className="pareto-card-hover p-7 rounded-2xl"
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
                  <p className="text-xs leading-relaxed"
                    style={{ color: c.tone === 'dim' ? 'rgba(255,100,100,0.7)' : 'rgba(255,255,255,0.5)' }}>
                    {c.after}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            05 · OFFICE PARALLAX STRIP
        ═══════════════════════════════════════════════════ */}
        <OfficeParallaxStrip />

        {/* ═══════════════════════════════════════════════════
            06 · THE PROBLEM — 3 LOSS LAYERS
        ═══════════════════════════════════════════════════ */}
        <section id="problema" className="py-28 relative overflow-hidden" style={{ background: 'rgba(20,20,20,0.95)' }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(136,0,255,0.07) 0%, transparent 70%)' }} />
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
                <motion.div key={s.stage} variants={staggerItem}
                  className="pareto-card-hover rounded-2xl overflow-hidden"
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

        {/* ═══════════════════════════════════════════════════
            07 · THE 4 SOLUTIONS
        ═══════════════════════════════════════════════════ */}
        <section id="solucoes" className="py-24 relative overflow-hidden" style={{ background: 'rgba(16,16,16,0.98)' }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 40% at 80% 50%, rgba(136,0,255,0.08) 0%, transparent 70%)' }} />
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <RevealSection className="text-center mb-14">
              <SectionLabel>O que entregamos</SectionLabel>
              <h2 className="text-xl md:text-2xl font-black text-white mb-4" style={{ lineHeight: 1.2 }}>
                4 formas de devolver tempo<br />
                <span style={{ background: 'linear-gradient(95deg, #8800FF 0%, #CDFF00 65%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>e gerar receita.</span>
              </h2>
              <p className="text-sm max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 300 }}>
                Cada solução é desenhada para gerar retorno financeiro mensurável — não para impressionar em apresentações.
              </p>
            </RevealSection>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
              {[
                { tag: 'Automation', icon: '⚙️', title: 'Processos Automatizados', arrow: '→ Redução de headcount operacional', desc: 'Mapeamos operações que consomem horas de trabalho humano e substituímos por sistemas que rodam 24/7 sem parar. RPA, integrações e workflows inteligentes. Sem contratar mais para crescer.' },
                { tag: 'AI Workers', icon: '🤖', title: 'Colaboradores Digitais', arrow: '→ Capacidade sem custo fixo', desc: 'Agentes autônomos com funções, atribuições e reporte — exatamente como um colaborador, mas disponíveis 24/7 sem férias nem turnover. Cada AI Worker assume tarefas reais e libera seu time para decidir.' },
                { tag: 'AI Agents', icon: '🧠', title: 'Agentes Inteligentes', arrow: '→ Processos que adaptam', desc: 'Desenvolvemos agentes de IA generativa conectados ao seu negócio — treinados com sua base de conhecimento e integrados ao seu CRM, ERP e APIs. Construímos fluxos que pensam e reagem.' },
                { tag: 'Consulting', icon: '🎯', title: 'AI Builders Alocados', arrow: '→ ROI mensurável por sprint', desc: 'Especialistas part-time ou full-time embarcados na sua empresa: mapeando processos, priorizando por impacto financeiro e implementando soluções de IA. Time sênior de IA sem estrutura convencional de contratação.' },
              ].map((s) => (
                <motion.div key={s.tag} variants={staggerItem}
                  className="pareto-card-hover p-6 rounded-2xl h-full flex flex-col"
                  style={{ background: 'rgba(22,22,22,0.95)', border: '1px solid rgba(136,0,255,0.2)' }}>
                  <div className="text-2xl mb-4">{s.icon}</div>
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1 rounded-full self-start mb-4"
                    style={{ background: 'rgba(136,0,255,0.12)', color: '#8800FF', border: '1px solid rgba(136,0,255,0.25)' }}>{s.tag}</span>
                  <h3 className="text-base font-black text-white mb-3">{s.title}</h3>
                  <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: 'rgba(255,255,255,0.48)' }}>{s.desc}</p>
                  <div className="text-xs font-bold" style={{ color: '#CDFF00' }}>{s.arrow}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* 4 Animated stats */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {[
                { num: 13,  suf: '+',  pre: '',   label: 'Anos com IA & ML' },
                { num: 300, suf: '+',  pre: '',   label: 'Empresas atendidas' },
                { num: 500, suf: '+',  pre: '',   label: 'Projetos de IA entregues' },
                { num: 160, suf: '+',  pre: '',   label: 'Especialistas em IA' },
              ].map((s) => (
                <motion.div key={s.label} variants={staggerItem} className="text-center">
                  <div className="text-2xl md:text-3xl font-black text-white mb-1">
                    <AnimatedNumber value={s.num} suffix={s.suf} />
                  </div>
                  <div className="text-xs" style={{ fontWeight: 300, color: 'rgba(255,255,255,0.38)' }}>{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            08 · TESS AI TEASER
        ═══════════════════════════════════════════════════ */}
        <section id="tess" className="py-28 relative overflow-hidden" style={{ background: 'rgba(20,20,20,0.95)' }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 0% 50%, rgba(136,0,255,0.08) 0%, transparent 70%)' }} />
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Left: B&W image + violet overlay */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}>
                <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(136,0,255,0.25)' }}>
                  <img src="/images/tess_ai_illustration.png" alt="Tess AI" className="w-full rounded-2xl"
                    style={{ filter: 'grayscale(0.6) contrast(1.1)', display: 'block' }} loading="lazy" />
                  {/* Absolutely positioned color overlay — NOT box-shadow glow */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(136,0,255,0.25) 0%, rgba(205,255,0,0.08) 100%)', pointerEvents: 'none' }} />
                </div>
              </motion.div>

              {/* Right: text */}
              <RevealSection>
                <SectionLabel>Nossa Plataforma Proprietária</SectionLabel>
                <h3 className="text-lg md:text-2xl font-black text-white mb-6" style={{ lineHeight: 1.3 }}>
                  Tess AI: a plataforma que<br />
                  <span style={{ color: '#8800FF' }}>supera o ChatGPT no ranking.</span>
                </h3>
                <p className="leading-relaxed mb-4 text-sm" style={{ color: 'rgba(255,255,255,0.58)' }}>
                  Quando a Pareto implementa IA na sua empresa, não usa ferramentas de terceiros. Usa sua plataforma proprietária — a Tess AI, eleita em 2024 como o <strong className="text-white">#6 melhor produto de IA do mundo pela G2</strong>. O ChatGPT ficou em 10º. O Google Gemini em 22º.
                </p>
                <p className="leading-relaxed mb-8 text-sm" style={{ color: 'rgba(255,255,255,0.58)' }}>
                  +250 modelos de IA líderes globais em uma única plataforma enterprise com segurança de nível corporativo, Brand Voice treinada para a sua empresa e automação de workflows personalizada.
                </p>

                <div className="grid grid-cols-3 gap-3 mb-8">
                  {[['#6', 'Global G2 2024'], ['+250', 'Modelos IA'], ['+2M', 'Usuários']].map(([v, l]) => (
                    <div key={l} className="pareto-card-hover p-4 rounded-xl text-center"
                      style={{ background: 'rgba(136,0,255,0.08)', border: '1px solid rgba(136,0,255,0.18)' }}>
                      <div className="text-2xl font-black text-white">{v}</div>
                      <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.42)' }}>{l}</div>
                    </div>
                  ))}
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
                  style={{ background: 'rgba(205,255,0,0.08)', border: '1px solid rgba(205,255,0,0.25)' }}>
                  <span className="text-sm font-black" style={{ color: '#CDFF00' }}>#6 melhor IA do mundo G2</span>
                </div>

                <div>
                  <Link to="/tess-ai"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white transition-all"
                    style={{ background: 'linear-gradient(135deg, #8800FF 0%, #6600CC 100%)', boxShadow: '0 0 24px rgba(136,0,255,0.35)' }}>
                    Conhecer a Tess AI <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </RevealSection>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            09 · BUILDING PARALLAX STRIP
        ═══════════════════════════════════════════════════ */}
        <BuildingParallaxStrip />

        {/* ═══════════════════════════════════════════════════
            10 · CASES
        ═══════════════════════════════════════════════════ */}
        <section id="resultados" className="py-28 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(205,255,0,0.04) 0%, transparent 70%)' }} />
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
                <motion.div key={c.client} variants={staggerItem}
                  className="pareto-card-hover rounded-2xl overflow-hidden"
                  style={{ background: 'rgba(18,18,18,0.95)', border: '1px solid rgba(136,0,255,0.2)' }}>
                  <div className="p-8 border-b" style={{ borderColor: 'rgba(136,0,255,0.08)' }}>
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

        {/* ═══════════════════════════════════════════════════
            11 · CLIENTS MARQUEE
        ═══════════════════════════════════════════════════ */}
        <section className="py-16" style={{ background: 'rgba(18,18,18,0.98)' }}>
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
            12 · ABOUT / AWARDS TEASER
        ═══════════════════════════════════════════════════ */}
        <section id="sobre" className="py-28 relative" style={{ background: 'rgba(20,20,20,0.95)' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <RevealSection className="text-center mb-16">
              <SectionLabel>Quem vai implementar</SectionLabel>
              <h2 className="text-xl md:text-2xl font-black text-white mb-6" style={{ lineHeight: 1.2 }}>
                13 anos construindo IA<br />
                <span style={{ color: '#8800FF' }}>para os negócios que lideram o Brasil.</span>
              </h2>
              <p className="text-sm max-w-2xl mx-auto leading-relaxed" style={{ fontWeight: 300, color: 'rgba(255,255,255,0.48)' }}>
                Não somos uma startup de IA que lançou produto em 2023. Somos a empresa que treinou os primeiros algoritmos de marketing com IA no Brasil, criou a 6ª melhor plataforma de IA do mundo e acumula 13 anos de inteligência do mercado brasileiro.
              </p>
            </RevealSection>

            {/* KEY_STATS wall */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {KEY_STATS.map((s) => (
                <motion.div key={s.label} variants={staggerItem}
                  className="pareto-card-hover p-6 rounded-2xl text-center"
                  style={{ background: 'rgba(22,22,22,0.9)', border: '1px solid rgba(136,0,255,0.1)' }}>
                  <div className="text-2xl md:text-3xl font-black mb-2"
                    style={{ background: 'linear-gradient(90deg,#8800FF,#CDFF00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    <AnimatedNumber value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                  <div className="text-xs leading-tight" style={{ fontWeight: 300, color: 'rgba(255,255,255,0.42)' }}>{s.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* AWARDS highlight chips */}
            <RevealSection className="mb-12">
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

            <RevealSection className="text-center">
              <Link to="/sobre"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white/80 hover:text-white transition-colors"
                style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
                Ver história completa da Pareto <ArrowRight className="w-4 h-4" />
              </Link>
            </RevealSection>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            13 · FINAL CTA
        ═══════════════════════════════════════════════════ */}
        <section id="parceria" className="py-32 md:py-48 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 90% 90% at 50% 50%, rgba(136,0,255,0.14) 0%, transparent 70%)' }} />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 40% 40% at 80% 20%, rgba(205,255,0,0.05) 0%, transparent 60%)' }} />

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <RevealSection>
              {/* Dark box with violet glow border */}
              <div className="p-12 md:p-16 rounded-3xl"
                style={{ background: 'rgba(14,14,14,0.97)', border: '1px solid rgba(136,0,255,0.4)', boxShadow: '0 0 80px rgba(136,0,255,0.18)' }}>

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
                  <span style={{ background: 'linear-gradient(95deg,#8800FF 0%,#CDFF00 65%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Agora dê o próximo passo.
                  </span>
                </h2>

                <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  O próximo passo não é uma venda. É uma conversa de 30 minutos com um especialista Pareto que vai mapear onde a IA gera o maior retorno no seu negócio — e o que precisa ser construído primeiro.
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
                    className="inline-flex items-center gap-3 px-7 py-4 rounded-full font-bold text-white transition-all duration-300 hover:bg-white/5"
                    style={{ border: '1px solid rgba(255,255,255,0.18)' }}>
                    <MessageCircle className="w-5 h-5" />
                    Ou falar agora pelo WhatsApp
                  </a>
                </div>

                {/* LGPD note */}
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  Atendemos exclusivamente empresas com faturamento acima de R$1M/ano · Vagas limitadas por trimestre ·{' '}
                  <a href="#/privacidade" className="underline hover:text-white/50 transition-colors" style={{ color: 'rgba(255,255,255,0.25)' }}>LGPD</a>
                </p>
              </div>
            </RevealSection>
          </div>
        </section>

        {/* ─── Awards strip ─────────────────────────────────────────── */}
        <div className="py-6" style={{ background: 'rgba(8,8,8,1)', borderTop: '1px solid rgba(136,0,255,0.08)' }}>
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-5">
            {[
              { icon: <Award className="w-3.5 h-3.5" />, text: '16 Prêmios Google Awards NY' },
              { icon: <Quote className="w-3.5 h-3.5" />, text: 'Tess AI #6 Melhor IA Global — G2 2024' },
              { icon: <Award className="w-3.5 h-3.5" />, text: 'Google Premier Partner 2026' },
              { icon: <Award className="w-3.5 h-3.5" />, text: 'Meta Business Partner' },
              { icon: <Award className="w-3.5 h-3.5" />, text: 'Invested by Google AI for Startups' },
            ].map((a) => (
              <div key={a.text} className="flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.32)' }}>
                <span style={{ color: '#8800FF' }}>{a.icon}</span>{a.text}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
