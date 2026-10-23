import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Calendar, Star, Award, Zap, Shield, Globe, CheckCircle, ExternalLink } from 'lucide-react';
import { CALENDLY_URL, TESS_MODELS } from '@/lib/index';
import { staggerContainer, staggerItem, scaleIn } from '@/lib/motion';

const G900 = '#13100C'; const G800 = '#241F1A'; const G600 = '#4A4540';
const G400 = '#8A8278'; const G200 = '#BFB8AE'; const G100 = '#DDD7CF';
const OFF = '#F8F6F3'; const WHITE = '#FFFFFF';
const LIME = '#CBEC2E'; const LIME_DIM = '#A8C41E';


const TSVG: Record<string, string> = {
  zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  cpu: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
  brain: 'M12 5a3 3 0 00-3 3v.5a1 1 0 01-1 1H7a2 2 0 100 4h1a1 1 0 011 1v.5a3 3 0 006 0V14a1 1 0 011-1h1a2 2 0 100-4h-1a1 1 0 01-1-1V8a3 3 0 00-3-3z',
  target: 'M22 12h-4 M6 12H2 M12 6V2 M12 22v-4 M12 12m-3 0a3 3 0 106 0 3 3 0 00-6 0 M12 12m-7 0a7 7 0 1014 0 7 7 0 00-14 0',
  globe: 'M12 22a10 10 0 100-20 10 10 0 000 20z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  settings: 'M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z',
  layers: 'M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5',
};
function IconSVG({ name, size = 24, color = 'currentColor' }: { name: string; size?: number; color?: string }) {
  const d = TSVG[name] || TSVG.settings;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      {d.split(' M').map((part, i) => <path key={i} d={i === 0 ? part : 'M' + part} />)}
    </svg>
  );
}

function Tag({ children, color = '#CDFF00' }: { children: React.ReactNode; color?: string }) {
  return (
    <div className="inline-flex items-center gap-2 mb-5">
      <div className="w-5 h-px" style={{ background: color }} />
      <span className="text-[11px] font-black tracking-[0.3em] uppercase" style={{ color }}>{children}</span>
    </div>
  );
}
function Heading({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-black leading-tight ${className}`}
      style={{ letterSpacing: '-0.03em', fontFamily: 'var(--font-heading)', color: G900 }}>{children}</h2>
  );
}
function Body({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`leading-relaxed ${className}`}
      style={{ color: G600, fontWeight: 300, fontFamily: 'var(--font-heading)' }}>{children}</p>
  );
}
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay }} className={className}>
      {children}
    </motion.div>
  );
}

const FEATURES = [
  { icon: '🤝', name: 'Model Council', tag: 'Tess Consensus',
    title: 'Três modelos debatem. O melhor vence.',
    desc: 'Model Council orquestra múltiplos modelos (GPT-5, Claude 4, Gemini 3) em debate paralelo. O sistema identifica consenso, divergências e o resultado mais confiável. Reduz alucinações e aumenta drasticamente a precisão em tarefas críticas.',
    highlight: true, color: '#CDFF00' },
  { icon: 'zap', name: 'Agentic Execution', tag: 'Agent Computer',
    title: 'Até 40 operações autônomas por chamada.',
    desc: 'Um único agente executa tarefas longas e complexas de forma autônoma em uma VM isolada: pesquisa profunda, planilhas, dashboards, relatórios, código. Sem necessidade de supervisão humana a cada passo.',
    highlight: true, color: '#8800FF' },
  { icon: 'star', name: 'Brand Voice', tag: 'Memory Collections',
    title: 'IA que fala com a voz da sua marca.',
    desc: 'O sistema assimila tom de voz, diretrizes, persona e restrições da sua marca em todas as interações. Cada output respeita sua identidade — sem treinamento técnico, sem código.',
    color: '#CDFF00' },
  { icon: 'settings', name: 'AI Studio', tag: 'Agent Studio',
    title: 'Crie agentes de IA sem programar.',
    desc: 'Ambiente no-code para criação de agentes personalizados para cada workflow do negócio. Qualquer analista consegue criar, testar e publicar automações em horas.',
    color: '#8800FF' },
  { icon: 'layers', name: 'AI Steps', tag: 'Skills',
    title: 'Procedimentos modulares de IA para cada processo.',
    desc: 'Skills são roteiros modulares que guiam a IA na execução de tarefas complexas com revelação progressiva de contexto. Precisão de um especialista humano, velocidade de uma máquina.',
    color: '#CDFF00' },
  { icon: 'shield', name: 'Enterprise Security', tag: 'SOC2 · LGPD · GDPR',
    title: 'Dados que nunca saem do seu ambiente.',
    desc: 'Arquitetura de isolamento por cliente. Seus dados não treinam nenhum modelo de terceiro. SOC2, LGPD, GDPR. SSO, audit trail, criptografia em trânsito e em repouso.',
    color: '#8800FF' },
];

const RANKINGS = [
  { rank: '#6', name: 'Tess AI', platform: 'G2 Best Software 2024', color: '#CDFF00', highlight: true },
  { rank: '#10', name: 'ChatGPT', platform: 'G2', color: 'rgba(255,255,255,0.3)', highlight: false },
  { rank: '#22', name: 'Google Gemini', platform: 'G2', color: 'rgba(255,255,255,0.3)', highlight: false },
  { rank: '#28', name: 'IBM Watson', platform: 'G2', color: 'rgba(255,255,255,0.3)', highlight: false },
];

const MODELS_CATEGORIES = [
  { cat: 'Linguagem & Raciocínio', models: ['GPT-5', 'GPT-4o', 'Claude 4 Sonnet', 'Claude 3.5 Opus', 'Gemini 2.5 Pro', 'Gemini 1.5 Flash', 'Llama 4', 'Mistral Large', 'Grok 4.1', 'DeepSeek 3.2', 'Cohere'], color: '#8800FF' },
  { cat: 'Imagem & Design', models: ['Midjourney', 'DALL-E 3', 'Stable Diffusion 3', 'Ideogram 3', 'Leonardo AI', 'Flux 2 PRO'], color: '#CDFF00' },
  { cat: 'Vídeo & Animação', models: ['Runway Gen-3', 'Sora 2 PRO', 'Kling AI', 'Luma Labs', 'VEO 3.1'], color: '#8800FF' },
  { cat: 'Voz & Áudio', models: ['ElevenLabs', 'Deepgram', 'Whisper', 'HeyGen', 'Nano Banana PRO'], color: '#CDFF00' },
  { cat: 'Código & Automação', models: ['Copilot', 'CodeLlama', 'DeepSeek Coder', 'Replit AI', 'Codestral'], color: '#8800FF' },
];

export default function TessAI() {
  const [activeModel, setActiveModel] = useState<string | null>(null);

  return (
    <div style={{ background: 'var(--bg-base)', fontFamily: 'var(--font-heading)', color: '#13100C' }}>

      {/* ═══ HERO ════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Particle background */}
        <div className="absolute inset-0">
          <img src="/images/ai_platform.jpg" alt="" aria-hidden className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.2) saturate(1.5) hue-rotate(230deg)', opacity: 0.8 }} />
        </div>
        {/* Grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'none',
          backgroundSize: '48px 48px'
        }} />
        {/* Glows */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 70% at 70% 40%, rgba(205,255,0,0.08) 0%, transparent 70%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 60% at 30% 60%, rgba(136,0,255,0.12) 0%, transparent 70%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,8,10,0) 50%, rgba(8,8,10,1) 100%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1 }}>
            <div className="flex flex-wrap gap-2 mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ border: '1px solid rgba(205,255,0,0.4)', background: 'rgba(205,255,0,0.08)' }}>
                <Star className="w-3 h-3" style={{ color: '#CDFF00' }} />
                <span className="text-[11px] font-black tracking-[0.2em] uppercase" style={{ color: '#CDFF00' }}>
                  #6 Melhor IA do Mundo · G2 2024
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ border: '1px solid rgba(136,0,255,0.3)', background: 'rgba(136,0,255,0.06)' }}>
                <span className="text-[11px] font-bold" style={{ color: 'rgba(136,0,255,0.9)' }}>
                  US$5M Seed · Palo Alto · 2M+ Usuários
                </span>
              </div>
            </div>

            <h1 className="font-black mb-6" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.6rem)', letterSpacing: '-0.04em', lineHeight: 1.06 }}>
              <span className="block text-white">Tess AI:</span>
              <span style={{ background: 'linear-gradient(90deg,#CDFF00,#8800FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                250+ modelos.<br />Um ambiente.
              </span>
              <span className="block text-white">Execução autônoma.</span>
            </h1>

            <p className="text-base mb-10" style={{ color: 'rgba(255,255,255,0.52)', fontWeight: 300, lineHeight: 1.8, fontFamily: 'var(--font-heading)' }}>
              A única plataforma de IA enterprise que orquestra os melhores modelos do mundo
              em um único ambiente seguro — com <strong className="text-white">Model Council</strong>,{' '}
              <strong className="text-white">Agentic Execution</strong> e <strong className="text-white">Brand Voice</strong> nativos.
              Feita no Brasil. Reconhecida globalmente.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="https://tess.im" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-black text-sm text-black"
                style={{ background: '#CDFF00', boxShadow: '0 0 40px rgba(205,255,0,0.3)' }}>
                <ExternalLink className="w-4 h-4" /> Acessar a Tess AI
              </a>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-7 py-4 rounded-full font-black text-sm text-white"
                style={{ border: '1px solid rgba(205,255,0,0.3)', background: 'rgba(205,255,0,0.06)' }}>
                <Calendar className="w-4 h-4" /> Ver demonstração
              </a>
            </div>
          </motion.div>

          {/* Ranking visual */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 1 }}>
            <div className="p-7 rounded-3xl" style={{ background: 'rgba(14,14,16,0.97)', border: '1px solid rgba(205,255,0,0.15)', backdropFilter: 'blur(20px)' }}>
              <div className="text-xs font-black tracking-widest uppercase mb-5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                G2 Best Software Awards 2024 · AI Category
              </div>
              <div className="space-y-3">
                {RANKINGS.map(r => (
                  <div key={r.name} className="flex items-center gap-4 p-4 rounded-xl"
                    style={{ background: r.highlight ? 'rgba(205,255,0,0.08)' : 'rgba(255,255,255,0.02)', border: `1px solid ${r.highlight ? 'rgba(205,255,0,0.25)' : 'rgba(255,255,255,0.05)'}` }}>
                    <div className={`text-2xl font-black w-14 flex-shrink-0 ${r.highlight ? '' : 'opacity-40'}`} style={{ color: r.color }}>{r.rank}</div>
                    <div>
                      <div className={`text-sm font-black ${r.highlight ? 'text-white' : 'text-white/40'}`}>{r.name}</div>
                      <div className="text-[10px]" style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 300 }}>{r.platform}</div>
                    </div>
                    {r.highlight && <div className="ml-auto"><Star className="w-5 h-5" style={{ color: '#CDFF00' }} /></div>}
                  </div>
                ))}
              </div>
              <div className="mt-5 p-4 rounded-xl text-center" style={{ background: 'rgba(205,255,0,0.06)', border: '1px solid rgba(205,255,0,0.15)' }}>
                <div className="text-sm font-black text-white mb-1">4.8/5 no G2 · 4.7/5 no Gartner</div>
                <Body className="text-xs">19 reviews verificados · 2M+ usuários · 140 países</Body>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Stats bar ──────────────────────────────────── */}
      <div style={{ background: 'rgba(10,10,12,1)', borderTop: '1px solid rgba(205,255,0,0.1)', borderBottom: '1px solid rgba(205,255,0,0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap justify-center gap-8">
          {[
            { v: '250+', l: 'Modelos de IA' },
            { v: '2M+', l: 'Usuários globais' },
            { v: '600K+', l: 'Tarefas autônomas/mês' },
            { v: '140', l: 'Países ativos' },
            { v: 'US$5M', l: 'Seed · 2026' },
            { v: '#6', l: 'G2 Global 2024' },
          ].map(s => (
            <div key={s.v} className="text-center">
              <div className="text-2xl font-black" style={{ color: '#CDFF00', letterSpacing: '-0.04em' }}>{s.v}</div>
              <div className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 300 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ 6 FEATURES PRINCIPAIS ═══════════════════════════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(205,255,0,0.04) 0%, transparent 70%)' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-14">
            <Tag>Funcionalidades Core</Tag>
            <Heading className="text-2xl md:text-3xl mb-5">
              O que separa a Tess AI<br />
              <span style={{ color: '#CDFF00' }}>de qualquer outra plataforma.</span>
            </Heading>
            <Body className="max-w-2xl mx-auto text-sm">
              Enquanto outros oferecem um chatbot com superpoderes, a Tess AI é uma
              camada de orquestração que faz os melhores modelos do mundo trabalharem juntos.
            </Body>
          </Reveal>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(f => (
              <motion.div key={f.name} variants={staggerItem} className="p-7 rounded-2xl relative overflow-hidden"
                style={{ background: WHITE, border: `1px solid ${f.highlight ? f.color + '30' : 'rgba(255,255,255,0.07)'}` }}>
                {f.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${f.color}, transparent)` }} />
                )}
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-3xl flex-shrink-0"><IconSVG name={f.icon as string} size={28} color={f.color} /></span>
                  <div>
                    <div className="text-[10px] font-black tracking-widest uppercase mb-0.5" style={{ color: `${f.color}90` }}>{f.tag}</div>
                    <div className="text-sm font-black text-white">{f.name}</div>
                  </div>
                </div>
                <div className="text-sm font-bold text-white mb-3" style={{ lineHeight: 1.4 }}>{f.title}</div>
                <Body className="text-xs">{f.desc}</Body>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ COMO FUNCIONA A ORQUESTRAÇÃO ════════════════════════ */}
      <section className="py-24 relative" style={{ background: 'rgba(10,10,12,0.98)' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-14">
            <Tag>Arquitetura</Tag>
            <Heading className="text-2xl md:text-3xl mb-5">
              Como a Tess AI funciona<br />
              <span style={{ color: '#CDFF00' }}>por baixo do capô.</span>
            </Heading>
          </Reveal>

          {/* Architecture diagram */}
          <Reveal>
            <div className="p-8 rounded-2xl" style={{ background: WHITE, border: '1px solid rgba(205,255,0,0.15)' }}>
              {/* Layer 1: Input */}
              <div className="text-center mb-6">
                <div className="inline-block px-6 py-3 rounded-xl text-sm font-black"
                  style={{ background: 'rgba(136,0,255,0.15)', border: '1px solid rgba(136,0,255,0.3)', color: '#a855f7' }}>
                  🧑‍💼 Seu Negócio — Dados, Processos, Contexto
                </div>
              </div>
              {/* Arrow */}
              <div className="flex justify-center mb-6">
                <div className="flex flex-col items-center gap-1">
                  {[0, 1, 2].map(i => <div key={i} className="w-px h-4" style={{ background: 'rgba(136,0,255,0.4)' }} />)}
                  <ArrowRight className="w-4 h-4 rotate-90" style={{ color: '#8800FF' }} />
                </div>
              </div>
              {/* Layer 2: Tess Orchestration */}
              <div className="p-5 rounded-xl mb-6" style={{ background: 'rgba(205,255,0,0.05)', border: '1px solid rgba(205,255,0,0.2)' }}>
                <div className="text-xs font-black tracking-widest uppercase text-center mb-4" style={{ color: '#CDFF00' }}>
                  Tess AI — Camada de Orquestração
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Model Council', 'AI Steps (Skills)', 'Brand Voice', 'AI Studio'].map(f => (
                    <div key={f} className="px-3 py-2 rounded-lg text-center text-xs font-bold"
                      style={{ background: 'rgba(205,255,0,0.06)', border: '1px solid rgba(205,255,0,0.15)', color: 'rgba(255,255,255,0.7)' }}>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              {/* Arrow */}
              <div className="flex justify-center mb-6">
                <div className="flex flex-col items-center gap-1">
                  {[0, 1, 2].map(i => <div key={i} className="w-px h-4" style={{ background: 'rgba(205,255,0,0.4)' }} />)}
                  <ArrowRight className="w-4 h-4 rotate-90" style={{ color: '#CDFF00' }} />
                </div>
              </div>
              {/* Layer 3: Models */}
              <div className="p-5 rounded-xl" style={{ background: 'rgba(136,0,255,0.06)', border: '1px solid rgba(136,0,255,0.2)' }}>
                <div className="text-xs font-black tracking-widest uppercase text-center mb-4" style={{ color: '#8800FF' }}>
                  250+ Modelos Disponíveis
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {TESS_MODELS.slice(0, 16).map(m => (
                    <span key={m} className="px-3 py-1 rounded-full text-xs"
                      style={{ background: 'rgba(136,0,255,0.1)', border: '1px solid rgba(136,0,255,0.2)', color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>
                      {m}
                    </span>
                  ))}
                  <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(136,0,255,0.15)', border: '1px solid rgba(136,0,255,0.3)', color: '#a855f7' }}>
                    +234 mais
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ MODELOS POR CATEGORIA ════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-14">
            <Tag>Modelos Disponíveis</Tag>
            <Heading className="text-xl md:text-2xl mb-4">
              250+ modelos. Todas as categorias.<br />
              <span style={{ color: '#CDFF00' }}>Um único acesso.</span>
            </Heading>
            <Body className="max-w-xl mx-auto text-sm">
              Da criação de conteúdo à análise de dados, do vídeo ao código.
              Nenhuma outra plataforma no mundo reúne este ecossistema.
            </Body>
          </Reveal>

          <div className="space-y-4">
            {MODELS_CATEGORIES.map(cat => (
              <Reveal key={cat.cat}>
                <div className="p-6 rounded-2xl" style={{ background: WHITE, border: `1px solid ${cat.color}18` }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-xs font-black tracking-widest uppercase" style={{ color: cat.color }}>{cat.cat}</div>
                    <div className="h-px flex-1" style={{ background: `${cat.color}18` }} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.models.map(m => (
                      <span key={m} className="px-3 py-1.5 rounded-full text-xs font-semibold cursor-default"
                        style={{ background: `${cat.color}08`, border: `1px solid ${cat.color}20`, color: 'rgba(255,255,255,0.6)' }}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ENTERPRISE + SECURITY ═══════════════════════════════ */}
      <section className="py-24 relative" style={{ background: 'rgba(10,10,12,0.98)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-14">
            <Tag>Enterprise & Segurança</Tag>
            <Heading className="text-xl md:text-2xl mb-4">
              Construída para o padrão enterprise<br />
              <span style={{ color: '#8800FF' }}>desde o primeiro dia.</span>
            </Heading>
          </Reveal>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <Shield className="w-5 h-5" />, title: 'SOC2 Type II', body: 'Auditoria de segurança independente. Controles rigorosos de acesso, disponibilidade e confidencialidade.', color: '#CDFF00' },
              { icon: <Globe className="w-5 h-5" />, title: 'LGPD + GDPR Nativo', body: 'Conformidade regulatória brasileira e europeia by design. Nenhum dado seus processa fora das regras vigentes.', color: '#8800FF' },
              { icon: <Shield className="w-5 h-5" />, title: 'Isolamento de Dados', body: 'Seu ambiente é completamente isolado. Dados de um cliente nunca tocam o ambiente de outro.', color: '#CDFF00' },
              { icon: <Zap className="w-5 h-5" />, title: 'Seatless Model', body: 'Cobrança por impacto, não por assento. Usuários ilimitados no workspace sem custo adicional por "cadeira".', color: '#8800FF' },
              { icon: <Globe className="w-5 h-5" />, title: 'SSO Corporativo', body: 'Integração nativa com Google Workspace, Microsoft Azure AD e qualquer IdP SAML 2.0 / OIDC.', color: '#CDFF00' },
              { icon: <CheckCircle className="w-5 h-5" />, title: 'Zero Lock-in', body: 'Todos os agentes e arquiteturas são exportáveis. Transparência total de custos: API + 20% de margem.', color: '#8800FF' },
            ].map(item => (
              <motion.div key={item.title} variants={staggerItem} className="p-6 rounded-2xl"
                style={{ background: WHITE, border: `1px solid ${item.color}18` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${item.color}12`, color: item.color }}>
                  {item.icon}
                </div>
                <div className="text-sm font-black text-white mb-2">{item.title}</div>
                <Body className="text-xs">{item.body}</Body>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ INVESTIMENTO & EXPANSÃO ════════════════════════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(205,255,0,0.06) 0%, transparent 70%)' }} />
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-12">
            <Tag>O Momento da Tess AI</Tag>
            <Heading className="text-2xl md:text-3xl mb-5">
              US$5M. Palo Alto. Expansão global.<br />
              <span style={{ color: '#CDFF00' }}>O Brasil exportando IA para o mundo.</span>
            </Heading>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Reveal>
              <div className="p-7 rounded-2xl" style={{ background: 'rgba(205,255,0,0.05)', border: '1px solid rgba(205,255,0,0.2)' }}>
                <div className="text-5xl font-black mb-3" style={{ color: '#CDFF00', letterSpacing: '-0.05em' }}>US$5M</div>
                <div className="text-sm font-black text-white mb-2">Seed Round · Março 2026</div>
                <Body className="text-sm mb-4">
                  Liderada por <strong className="text-white">Hi Ventures</strong> (Federico Antoni e Jimena Pardo)
                  e <strong className="text-white">DYDX Capital</strong> (Ryan Nichols, ex-Salesforce),
                  com participação de Honeystone Ventures.
                </Body>
                <a href="https://siliconangle.com/2026/03/02/tess-ai-raises-5m-expand-enterprise-agent-orchestration-platform/"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold" style={{ color: '#CDFF00' }}>
                  <ExternalLink className="w-3.5 h-3.5" /> Ver no SiliconAngle
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="p-7 rounded-2xl" style={{ background: 'rgba(136,0,255,0.06)', border: '1px solid rgba(136,0,255,0.2)' }}>
                <div className="text-3xl font-black text-white mb-3" style={{ letterSpacing: '-0.04em' }}>Palo Alto<br />+ São Paulo</div>
                <div className="text-sm font-black mb-2" style={{ color: '#8800FF' }}>Nova sede no Vale do Silício</div>
                <Body className="text-sm">
                  A Tess AI fundou sua entidade nos EUA para acelerar a expansão enterprise global.
                  O desenvolvimento da plataforma é centralizado em Palo Alto.
                  A operação de consultoria Pareto Plus continua de São Paulo para o Brasil e América Latina.
                </Body>
              </div>
            </Reveal>
          </div>

          {/* Quote */}
          <Reveal>
            <div className="p-7 rounded-2xl" style={{ background: WHITE, border: '1px solid rgba(205,255,0,0.15)' }}>
              <div className="text-3xl mb-4" style={{ color: 'rgba(205,255,0,0.3)', fontFamily: 'Georgia, serif' }}>"</div>
              <p className="text-base font-bold text-white italic mb-5 leading-relaxed">
                "Enquanto os grandes players tentam empurrar IA em projetos top-down — que frequentemente geram
                ondas de demissões — a Pareto ganha porque são os próprios colaboradores que criam e implementam
                os agentes. Isso permite transformação real sem resistência organizacional."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm"
                  style={{ background: 'linear-gradient(135deg,#8800FF,#CDFF00)', color: '#000' }}>F</div>
                <div>
                  <div className="text-sm font-black text-white">Federico Antoni</div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>Co-founder & Managing Partner, Hi Ventures · Lead Investor Tess AI</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ CTA FINAL ══════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'rgba(10,10,12,0.98)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(205,255,0,0.07) 0%, transparent 65%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <Heading className="text-2xl md:text-3xl mb-5">
              Experimente a Tess AI no<br />
              <span style={{ color: '#CDFF00' }}>contexto real do seu negócio.</span>
            </Heading>
            <Body className="mb-8 text-sm max-w-xl mx-auto">
              A Pareto implementa e customiza a Tess AI para cada processo da sua operação.
              Agende um diagnóstico e veja na prática o que 250+ modelos em um ambiente enterprise fazem pelo seu negócio.
            </Body>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-black text-sm text-black"
                style={{ background: '#CDFF00', boxShadow: '0 0 40px rgba(205,255,0,0.3)' }}>
                <Calendar className="w-5 h-5" /> Ver Tess AI em ação
              </a>
              <a href="https://tess.im" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-bold text-sm"
                style={{ border: '1px solid rgba(205,255,0,0.25)', color: 'rgba(255,255,255,0.6)' }}>
                Acessar tess.im <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
