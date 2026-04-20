import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Award, ExternalLink, ArrowRight, Calendar, Zap, Brain, Settings, Users } from 'lucide-react';
import { TIMELINE, AWARDS, TESS_MODELS, WHATSAPP_URL, CALENDLY_URL, KEY_STATS } from '@/lib/index';

// ─── Design Tokens (same as Home) ────────────────────────────────────────────
const V = '#6C63FF';
const C = '#00D4FF';
const A = '#FF6B35';
const BG = '#0B0D14';
const S1 = '#12151F';
const ease = [0.16, 1, 0.3, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const staggerItem = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };

const WA_LINK = 'https://api.whatsapp.com/send/?phone=5511915513210&text&type=phone_number&app_absent=0';
// Mesma ordem da Home — premium brands first, logos circulares de plataformas ao final
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

function Reveal({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-6%' });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} style={style}>
      {children}
    </motion.div>
  );
}

function Mono({ children, color = C, size = 12 }: { children: React.ReactNode; color?: string; size?: number }) {
  return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: size, fontWeight: 500, color, letterSpacing: '0.04em' }}>{children}</span>;
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
  return <h1 style={{ fontFamily: "'Montserrat', 'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', letterSpacing: '-0.025em', lineHeight: 1.06, margin: 0, ...style }}>{children}</h1>;
}

function H2({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <h2 style={{ fontFamily: "'Montserrat', 'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.6rem, 3vw, 2.8rem)', letterSpacing: '-0.02em', lineHeight: 1.1, margin: 0, color: '#fff', ...style }}>{children}</h2>;
}

function H3({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <h3 style={{ fontFamily: "'Montserrat', 'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', letterSpacing: '-0.015em', lineHeight: 1.25, margin: 0, color: '#fff', ...style }}>{children}</h3>;
}

function Body({ children, muted = false, style = {} }: { children: React.ReactNode; muted?: boolean; style?: React.CSSProperties }) {
  return <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.75, color: muted ? 'rgba(136,146,164,0.65)' : '#8892A4', margin: 0, fontWeight: 400, ...style }}>{children}</p>;
}

function GlassCard({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div className="glass-card" style={{ background: 'rgba(18,21,31,0.80)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.30)', ...style }}>
      {children}
    </div>
  );
}

function PrimaryBtn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 6, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14, color: '#0B0D14', textDecoration: 'none', background: '#C8F135', border: 'none', transition: 'all 0.2s ease' }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(200,241,53,0.45)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}>
      {children}
    </a>
  );
}

const TESS_RANKING = [
  { rank: '#6',  name: 'Pareto Tess AI',  highlight: true },
  { rank: '#10', name: 'ChatGPT',          highlight: false },
  { rank: '#22', name: 'Google Gemini',    highlight: false },
  { rank: '#28', name: 'IBM Watson',       highlight: false },
  { rank: '#45', name: 'Github Copilot',   highlight: false },
];

const TESS_BENCHMARKS = [
  { area: 'Context Window', tess: '200k',  gpt4: '128k',  gemini: '32k',  llama: '4k' },
  { area: 'General MMLU',  tess: '86.8%', gpt4: '86.4%', gemini: '83.7%', llama: '68.9%' },
  { area: 'Reasoning',     tess: '50.4%', gpt4: '35.7%', gemini: 'n/a',   llama: 'n/a' },
  { area: 'Math GSM8K',    tess: '95.0%', gpt4: '92.0%', gemini: '94.4%', llama: '56.8%' },
  { area: 'Code HumanEval',tess: '84.9%', gpt4: '67.0%', gemini: '74.4%', llama: '29.9%' },
];

const SOLUTIONS = [
  {
    tag: 'Produto', icon: Brain, color: V,
    name: 'Pareto AI',
    headline: 'A infraestrutura essencial para quem constrói com IA.',
    desc: 'Tudo que AI Builders precisam para construir, testar e escalar sistemas inteligentes. Metodologias, frameworks operacionais, agentes inteligentes e workflows — em um único ambiente.',
    items: ['Frameworks operacionais de IA', 'Agentes inteligentes prontos para uso', 'Workflows estruturados e escaláveis', 'Infraestrutura para desenvolvedores'],
    link: 'https://pareto.io/solutions',
  },
  {
    tag: 'Formação', icon: Users, color: C,
    name: 'Pareto Academy',
    headline: 'AI Training for Professionals and Teams.',
    desc: 'Certificações para quem deseja se tornar um AI Builder e treinamentos corporativos personalizados para o seu time — online ou presenciais.',
    items: ['Certificações em IA para profissionais', 'Treinamentos corporativos customizados', 'Formação de AI Builders internos', 'Mentoria com especialistas sênior'],
    link: 'https://metodo.pareto.io/',
  },
  {
    tag: 'Consultoria', icon: Settings, color: A,
    name: 'Pareto Services',
    headline: 'IA implementada. Resultado mensurável.',
    desc: 'Especialistas em IA, negócios e tecnologia proprietária que automatizam processos críticos, reduzem custos, aumentam a produtividade e receita.',
    items: ['Diagnóstico operacional profundo', 'Automação de processos críticos', 'Redução de custos com IA', 'ROI rastreado por sprint'],
    link: WA_LINK,
  },
  {
    tag: 'Automação', icon: Zap, color: '#C8F135',
    name: 'AI Workers',
    headline: 'Colaboradores digitais que executam tarefas reais, sozinhos.',
    desc: 'Sua equipe para de operar e começa a decidir. AI Workers assumem tarefas operacionais completas — analisando, decidindo e agindo sem intervenção humana.',
    items: ['Execução autônoma de processos', 'Integração com seus sistemas existentes', 'Capacidade produtiva ilimitada', 'Sem vínculo CLT, sem turnover'],
    link: WA_LINK,
  },
];

export default function Sobre() {
  return (
    <main style={{ background: BG, color: '#fff', fontFamily: "'Inter', sans-serif" }}>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '60vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: 100 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0B0D14 0%, #1A1040 50%, #0D1929 100%)' }} />
        <div className="data-grid" />
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(108,99,255,0.13) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,212,255,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        {/* A10 logo grid — right side, white semi-transparent */}
        <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: '45%', maxWidth: 660, pointerEvents: 'none', zIndex: 2 }}>
          <img src="/images/hero_logos_grid.png" alt="" style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'brightness(10) grayscale(1)', opacity: 0.05, maskImage: 'linear-gradient(to left, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto', padding: '48px 24px 80px', width: '100%' }}>
          <motion.div initial="hidden" animate="visible" variants={stagger} style={{ maxWidth: 760 }}>
            <motion.div variants={staggerItem}><EyebrowLabel>Perfil Institucional · Pareto Plus 2026</EyebrowLabel></motion.div>
            <motion.div variants={staggerItem}>
              <H1 style={{ marginBottom: 20 }}>
                13 Anos Construindo<br />
                <span className="hero-shimmer-text">o Futuro do Brasil.</span>
              </H1>
            </motion.div>
            <motion.div variants={staggerItem}>
              <Body style={{ fontSize: 17, lineHeight: 1.8, maxWidth: 580, marginBottom: 36, color: '#8892A4' }}>
                A Pareto é a nº 1 do Brasil em Serviços de Marketing e IA. Criadora do Tess AI — a 6ª melhor IA do mundo segundo o G2 2024, com +2 milhões de usuários e +200 modelos de IA.
              </Body>
            </motion.div>
            <motion.div variants={staggerItem} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <PrimaryBtn href={WA_LINK}><Calendar size={15} /> Falar com Especialista</PrimaryBtn>
              <a href="https://tess.im" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', borderRadius: 6, border: '1px solid rgba(108,99,255,0.3)', color: 'rgba(255,255,255,0.75)', fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'all 0.2s ease' }}>
                Conhecer a Tess AI <ExternalLink size={13} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── KEY STATS ────────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 72px', position: 'relative' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {KEY_STATS.slice(0, 4).map((s) => (
              <motion.div key={s.label} variants={staggerItem}>
                <GlassCard style={{ padding: '24px 20px', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 600, color: C, letterSpacing: '-0.02em', marginBottom: 6 }}>{s.prefix}{s.value}{s.suffix}</div>
                  <Body muted style={{ fontSize: 12 }}>{s.label}</Body>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SOLUÇÕES ─────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px', background: `${S1}60`, position: 'relative', overflow: 'hidden' }}>
        <div className="data-grid" />
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: 56 }}>
            <EyebrowLabel>O que fazemos</EyebrowLabel>
            <H2 style={{ marginBottom: 16 }}>Quatro formas de<br /><span className="gradient-text">devolver seu tempo.</span></H2>
            <Body style={{ maxWidth: 520, margin: '0 auto' }}>Cada solução foi desenhada para eliminar desperdício, acelerar decisões e devolver o recurso mais valioso que existe: o seu tempo.</Body>
          </Reveal>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {SOLUTIONS.map((s) => (
              <motion.div key={s.name} variants={staggerItem}>
                <GlassCard style={{ padding: '28px 24px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: `${s.color}15`, border: `1px solid ${s.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <s.icon size={18} style={{ color: s.color }} />
                    </div>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: s.color, padding: '3px 8px', borderRadius: 4, background: `${s.color}12`, border: `1px solid ${s.color}20` }}>{s.tag}</span>
                  </div>
                  <H3 style={{ fontSize: 18, marginBottom: 8, color: '#fff' }}>{s.name}</H3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: s.color, fontWeight: 600, marginBottom: 10, lineHeight: 1.5 }}>{s.headline}</p>
                  <Body muted style={{ fontSize: 13, flex: 1, marginBottom: 18 }}>{s.desc}</Body>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {s.items.map((item) => (
                      <li key={item} style={{ display: 'flex', gap: 8, fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#8892A4' }}>
                        <span style={{ color: C, flexShrink: 0 }}>✓</span>{item}
                      </li>
                    ))}
                  </ul>
                  <a href={s.link} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: s.color, textDecoration: 'none', marginTop: 'auto' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = '10px'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = '6px'; }}>
                    Explorar <ArrowRight size={13} />
                  </a>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── AWARDS ───────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px', position: 'relative' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: 48 }}>
            <EyebrowLabel>Reconhecimento Global</EyebrowLabel>
            <H2>Prêmios que Falam por Si.</H2>
          </Reveal>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
            {AWARDS.map((award) => (
              <motion.div key={award.title} variants={staggerItem}>
                <GlassCard style={{ padding: '20px 22px', display: 'flex', gap: 14, alignItems: 'flex-start', background: award.highlight ? 'rgba(108,99,255,0.08)' : undefined, borderColor: award.highlight ? 'rgba(108,99,255,0.3)' : undefined }}>
                  <div style={{ flexShrink: 0, padding: 8, borderRadius: 8, background: award.highlight ? 'rgba(108,99,255,0.15)' : 'rgba(255,255,255,0.04)' }}>
                    <Award size={16} style={{ color: award.highlight ? '#C8F135' : 'rgba(255,255,255,0.3)' }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 4, lineHeight: 1.4 }}>{award.title}</div>
                    <Mono color="rgba(136,146,164,0.5)" size={11}>{award.org} · {award.year}</Mono>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESS AI ──────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px', background: `${S1}80`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 60% 50%, rgba(108,99,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', marginBottom: 64 }}>
            <Reveal>
              <EyebrowLabel>Tess AI — Nossa Plataforma</EyebrowLabel>
              <H2 style={{ marginBottom: 20 }}>A Maior Rede de IA<br /><span style={{ color: V }}>do Mundo. Num Único Lugar.</span></H2>
              <Body style={{ marginBottom: 16 }}>A Tess AI consolida +200 modelos de IA líderes globais — GPT-4o, Claude 3.5, Gemini, Midjourney, Runway e mais — em uma única plataforma enterprise com segurança, Brand Voice e automação de workflows.</Body>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 24 }}>
                {[['+2M', 'Usuários ativos'], ['+200', 'Modelos de IA'], ['200k', 'Janela de contexto'], ['#6', 'Ranking G2 2024']].map(([v, l]) => (
                  <GlassCard key={l} style={{ padding: '16px 14px', textAlign: 'center' }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.4rem', fontWeight: 600, color: C, marginBottom: 4 }}>{v}</div>
                    <Body muted style={{ fontSize: 11 }}>{l}</Body>
                  </GlassCard>
                ))}
              </div>
              <div style={{ padding: '18px 22px', borderRadius: 12, background: 'rgba(108,99,255,0.07)', border: '1px solid rgba(108,99,255,0.18)', textAlign: 'center', marginBottom: 20 }}>
                <blockquote style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 'clamp(1rem, 1.8vw, 1.35rem)', color: '#fff', margin: 0 }} className="hero-shimmer-text">"O futuro da IA é colaborativo."</blockquote>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(136,146,164,0.5)', marginTop: 6, marginBottom: 0 }}>— Pareto · Tess AI Platform Philosophy</p>
              </div>
              <a href="https://tess.im" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: V, textDecoration: 'none' }}>Conhecer a Tess AI <ExternalLink size={13} /></a>
            </Reveal>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
              <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(108,99,255,0.2)' }}>
                <img src="/images/tess_ai_illustration.png" alt="Tess AI" style={{ width: '100%', display: 'block', filter: 'grayscale(0.4) contrast(1.08)' }} loading="lazy" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(108,99,255,0.22) 0%, rgba(0,212,255,0.08) 100%)', pointerEvents: 'none' }} />
              </div>
            </motion.div>
          </div>
          {/* G2 Ranking */}
          <Reveal style={{ marginBottom: 48 }}>
            <H3 style={{ textAlign: 'center', marginBottom: 24 }}>Ranking G2 — Melhores Produtos de IA 2024</H3>
            <div style={{ maxWidth: 560, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {TESS_RANKING.map((r) => (
                <GlassCard key={r.rank} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px', background: r.highlight ? 'rgba(108,99,255,0.1)' : undefined, borderColor: r.highlight ? 'rgba(108,99,255,0.4)' : undefined }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: '1.4rem', width: 56, flexShrink: 0, textAlign: 'center', color: r.highlight ? '#C8F135' : 'rgba(255,255,255,0.25)' }}>{r.rank}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, color: r.highlight ? '#fff' : 'rgba(255,255,255,0.45)' }}>{r.name}</div>
                  {r.highlight && <div style={{ marginLeft: 'auto', padding: '3px 10px', borderRadius: 99, background: V, fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, color: '#fff', letterSpacing: '0.1em' }}>NOSSA PLATAFORMA</div>}
                </GlassCard>
              ))}
            </div>
          </Reveal>
          {/* Benchmark */}
          <Reveal>
            <H3 style={{ textAlign: 'center', marginBottom: 24 }}>Benchmark de Performance — Tess AI v3</H3>
            <GlassCard style={{ overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <th style={{ textAlign: 'left', padding: '14px 20px', fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(136,146,164,0.5)', fontWeight: 500 }}>Área</th>
                    {[{ l: 'Tess AI v3', c: '#C8F135' }, { l: 'GPT-4 Turbo', c: 'rgba(136,146,164,0.5)' }, { l: 'Gemini Ultra', c: 'rgba(136,146,164,0.5)' }, { l: 'Llama 2', c: 'rgba(136,146,164,0.5)' }].map((h) => (
                      <th key={h.l} style={{ textAlign: 'center', padding: '14px 16px', fontFamily: "'Inter', sans-serif", fontSize: 12, color: h.c, fontWeight: 700 }}>{h.l}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TESS_BENCHMARKS.map((b, i) => (
                    <tr key={b.area} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '12px 20px', fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.65)', fontWeight: 600 }}>{b.area}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#C8F135', fontWeight: 700 }}>{b.tess}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: 'rgba(136,146,164,0.5)' }}>{b.gpt4}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: 'rgba(136,146,164,0.5)' }}>{b.gemini}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: 'rgba(136,146,164,0.5)' }}>{b.llama}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassCard>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(136,146,164,0.35)', textAlign: 'center', marginTop: 12 }}>AES-256 · SOC 2 compliant · Dados de clientes não usados para treino de modelos</p>
          </Reveal>
        </div>
      </section>

      {/* ── CLIENTES (logos) ─────────────────────────────────────── */}
      <section style={{ padding: '72px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: 48 }}>
            <EyebrowLabel>Portfólio</EyebrowLabel>
            <H2 style={{ marginBottom: 12 }}>As Melhores Marcas do Mundo<br /><span style={{ color: C }}>Crescem com a Pareto.</span></H2>
          </Reveal>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
            {CLIENT_LOGO_IMGS.map((src, i) => (
              <motion.div key={i} variants={staggerItem}>
                <div style={{ padding: '16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 72, background: 'rgba(18,21,31,0.80)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, transition: 'all 0.25s ease' }}
                  onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.borderColor = 'rgba(108,99,255,0.3)'; e.currentTarget.style.background = 'rgba(108,99,255,0.06)'; }}
                  onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(18,21,31,0.80)'; }}>
                  <img src={src} alt="" style={{ maxWidth: 96, maxHeight: 36, objectFit: 'contain', filter: 'grayscale(1) brightness(1.8)', opacity: 0.5, mixBlendMode: 'screen', transition: 'opacity 0.25s' }}
                    onMouseEnter={(e: React.MouseEvent<HTMLImageElement>) => { e.currentTarget.style.opacity = '1'; }}
                    onMouseLeave={(e: React.MouseEvent<HTMLImageElement>) => { e.currentTarget.style.opacity = '0.5'; }} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────── */}
      <section id="timeline" style={{ padding: '80px 24px', background: `${S1}60` }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: 56 }}>
            <EyebrowLabel>Nossa História</EyebrowLabel>
            <H2>De 2011 a Hoje:<br /><span style={{ color: V }}>13 Anos de Liderança.</span></H2>
          </Reveal>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 32, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, ${V}, ${C})` }} />
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} variants={stagger} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {TIMELINE.map((item, i) => (
                <motion.div key={item.year} variants={staggerItem} style={{ display: 'flex', gap: 32, paddingLeft: 32, position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 0, top: 12, width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 800, flexShrink: 0, background: i === TIMELINE.length - 1 ? `linear-gradient(135deg, ${V}, ${C})` : 'rgba(108,99,255,0.15)', border: '2px solid rgba(108,99,255,0.4)', color: i === TIMELINE.length - 1 ? '#000' : V }}>{item.year}</div>
                  <div style={{ paddingTop: 12, paddingBottom: 24, marginLeft: 40 }}>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff', marginBottom: 8 }}>{item.title}</div>
                    <Body muted style={{ fontSize: 13 }}>{item.description}</Body>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────── */}
      <section style={{ padding: '96px 24px', textAlign: 'center', background: BG, position: 'relative', overflow: 'hidden' }}>
        <div className="data-grid" />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(108,99,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 680, margin: '0 auto' }}>
          <Reveal>
            <EyebrowLabel>Próximo Passo</EyebrowLabel>
            <H2 style={{ marginBottom: 20 }}>Pronto para recuperar<br /><span className="hero-shimmer-text">seu tempo?</span></H2>
            <Body style={{ marginBottom: 36, maxWidth: 480, margin: '0 auto 36px' }}>Converse com nosso time e descubra qual solução se encaixa na sua operação.</Body>
            <PrimaryBtn href={WA_LINK}><Calendar size={15} /> Falar com Especialista Pareto</PrimaryBtn>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
