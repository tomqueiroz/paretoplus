import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { TIMELINE, AWARDS, CLIENT_LOGOS, TESS_MODELS, WHATSAPP_URL, scrollToSection } from '@/lib/index';
import { fadeInUp, staggerContainer, staggerItem, scaleIn } from '@/lib/motion';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-8 h-px" style={{ background: '#8800FF' }} />
      <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#8800FF' }}>{children}</span>
    </div>
  );
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

const TESS_RANKING = [
  { rank: '#6', name: 'Pareto Tess AI', highlight: true },
  { rank: '#10', name: 'ChatGPT', highlight: false },
  { rank: '#22', name: 'Google Gemini', highlight: false },
  { rank: '#28', name: 'IBM Watson', highlight: false },
  { rank: '#45', name: 'Github Copilot', highlight: false },
];

const TESS_BENCHMARKS = [
  { area: 'Context Window', tess: '200k', gpt4: '128k', gemini: '32k', llama: '4k' },
  { area: 'General MMLU', tess: '86.8%', gpt4: '86.4%', gemini: '83.7%', llama: '68.9%' },
  { area: 'Reasoning', tess: '50.4%', gpt4: '35.7%', gemini: 'n/a', llama: 'n/a' },
  { area: 'Math GSM8K', tess: '95.0%', gpt4: '92.0%', gemini: '94.4%', llama: '56.8%' },
  { area: 'Code HumanEval', tess: '84.9%', gpt4: '67.0%', gemini: '74.4%', llama: '29.9%' },
];

export default function Sobre() {
  return (
    <main className="min-h-screen" style={{ background: '#0D0D0D', color: '#fff', fontFamily: "'Roboto', sans-serif" }}>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(136,0,255,0.1) 0%, transparent 70%)',
        }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl">
            <motion.div variants={staggerItem}>
              <SectionLabel>Perfil Institucional 2026</SectionLabel>
            </motion.div>
            <motion.h1 variants={staggerItem} className="font-black text-white mb-6" style={{ fontSize: 'clamp(2.7rem,5.25vw,4.5rem)', letterSpacing: '-0.035em', lineHeight: 1.1 }}>
              13 Anos Construindo<br />
              <span style={{ background: 'linear-gradient(90deg, #8800FF, #CDFF00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                o Futuro do Brasil.
              </span>
            </motion.h1>
            <motion.p variants={staggerItem} className="text-xl text-white/60 max-w-2xl leading-relaxed mb-8">
              A Pareto é a nº 1 do Brasil em Serviços de Marketing e IA. Criadora do Tess AI — a 6ª melhor IA do mundo segundo o G2 2024, com +2 milhões de usuários e +200 modelos de IA.
            </motion.p>
            <motion.div variants={staggerItem} className="flex gap-4 flex-wrap">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full font-bold text-white text-sm flex items-center gap-2"
                style={{ background: 'linear-gradient(135deg, #8800FF, #6600CC)', boxShadow: '0 0 32px rgba(136,0,255,0.4)' }}>
                Falar com Especialista
              </a>
              <button onClick={() => scrollToSection('timeline')}
                className="px-7 py-3.5 rounded-full font-bold text-white text-sm border border-white/20 hover:border-white/40 transition-colors">
                Ver Nossa História
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── AWARDS WALL ──────────────────────────────────────────── */}
      <section className="py-24" style={{ background: 'rgba(18,18,18,0.8)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <RevealSection className="text-center mb-12">
            <SectionLabel>Reconhecimento Global</SectionLabel>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
              Prêmios que Falam por Si.
            </h2>
          </RevealSection>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {AWARDS.map((award) => (
              <motion.div
                key={award.title}
                variants={staggerItem}
                className="p-6 rounded-2xl flex gap-4 items-start"
                style={{
                  background: award.highlight ? 'rgba(136,0,255,0.08)' : 'rgba(22,22,22,0.9)',
                  border: award.highlight ? '1px solid rgba(136,0,255,0.35)' : '1px solid rgba(255,255,255,0.06)',
                  boxShadow: award.highlight ? '0 0 30px rgba(136,0,255,0.1)' : 'none',
                }}
              >
                <div className="mt-1 flex-shrink-0 p-2 rounded-lg" style={{ background: award.highlight ? 'rgba(136,0,255,0.15)' : 'rgba(255,255,255,0.05)' }}>
                  <Award className="w-5 h-5" style={{ color: award.highlight ? '#CDFF00' : 'rgba(255,255,255,0.3)' }} />
                </div>
                <div>
                  <div className="text-sm font-black text-white leading-tight mb-1">{award.title}</div>
                  <div className="text-xs text-white/40">{award.org} · {award.year}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESS AI PROFILE ──────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 60% 50% at 60% 50%, rgba(136,0,255,0.08) 0%, transparent 70%)',
        }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <RevealSection>
              <SectionLabel>Tess AI — Nossa Plataforma</SectionLabel>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                A Maior Rede de IA<br />
                <span style={{ color: '#8800FF' }}>do Mundo.</span><br />
                Num Único Lugar.
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-6">
                A Tess AI consolida +200 modelos de IA líderes globais — GPT-4o, Claude 3.5, Gemini, Midjourney, Runway e mais — em uma única plataforma enterprise com segurança, Brand Voice e automação de workflows.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { v: '+2M', l: 'Usuários ativos' },
                  { v: '+200', l: 'Modelos de IA' },
                  { v: '200k', l: 'Janela de contexto' },
                  { v: 'R$300', l: 'Por seat/mês (Enterprise)' },
                ].map((s) => (
                  <div key={s.l} className="p-4 rounded-xl" style={{ background: 'rgba(22,22,22,0.9)', border: '1px solid rgba(136,0,255,0.12)' }}>
                    <div className="text-2xl font-black mb-1" style={{ color: '#CDFF00' }}>{s.v}</div>
                    <div className="text-xs text-white/40">{s.l}</div>
                  </div>
                ))}
              </div>
              <a href="https://tess.im" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: '#8800FF' }}>
                Conhecer a Tess AI <ExternalLink className="w-4 h-4" />
              </a>
            </RevealSection>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}>
              <img
                src="/images/tess_ai_illustration.png"
                alt="Tess AI Platform"
                className="w-full rounded-2xl"
                style={{ border: '1px solid rgba(136,0,255,0.2)', boxShadow: '0 0 60px rgba(136,0,255,0.15)' }}
                loading="lazy"
              />
            </motion.div>
          </div>

          {/* G2 Ranking */}
          <RevealSection className="mb-16">
            <h3 className="text-2xl font-black text-white mb-6 text-center">Ranking G2 — Melhores Produtos de IA 2024</h3>
            <div className="max-w-2xl mx-auto space-y-3">
              {TESS_RANKING.map((r) => (
                <div
                  key={r.rank}
                  className="flex items-center gap-4 p-4 rounded-xl"
                  style={{
                    background: r.highlight ? 'rgba(136,0,255,0.1)' : 'rgba(22,22,22,0.6)',
                    border: r.highlight ? '1px solid rgba(136,0,255,0.4)' : '1px solid rgba(255,255,255,0.05)',
                    boxShadow: r.highlight ? '0 0 30px rgba(136,0,255,0.12)' : 'none',
                  }}
                >
                  <div className="text-2xl font-black w-16 flex-shrink-0 text-center" style={{ color: r.highlight ? '#CDFF00' : 'rgba(255,255,255,0.3)' }}>
                    {r.rank}
                  </div>
                  <div className="font-bold" style={{ color: r.highlight ? '#fff' : 'rgba(255,255,255,0.5)' }}>{r.name}</div>
                  {r.highlight && (
                    <div className="ml-auto px-3 py-1 rounded-full text-xs font-black" style={{ background: '#8800FF', color: '#fff' }}>
                      NOSSA PLATAFORMA
                    </div>
                  )}
                </div>
              ))}
            </div>
          </RevealSection>

          {/* Benchmark Table */}
          <RevealSection>
            <h3 className="text-2xl font-black text-white mb-6 text-center">Benchmark de Performance — Tess AI v3</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <th className="text-left p-4 text-sm text-white/40 font-medium">Área</th>
                    <th className="text-center p-4 text-sm font-bold" style={{ color: '#CDFF00' }}>Tess AI v3</th>
                    <th className="text-center p-4 text-sm text-white/40 font-medium">GPT-4 Turbo</th>
                    <th className="text-center p-4 text-sm text-white/40 font-medium">Gemini Ultra</th>
                    <th className="text-center p-4 text-sm text-white/40 font-medium">Llama 2</th>
                  </tr>
                </thead>
                <tbody>
                  {TESS_BENCHMARKS.map((b, i) => (
                    <tr key={b.area} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td className="p-4 text-sm font-semibold text-white/70">{b.area}</td>
                      <td className="p-4 text-sm text-center font-black" style={{ color: '#CDFF00' }}>{b.tess}</td>
                      <td className="p-4 text-sm text-center text-white/40">{b.gpt4}</td>
                      <td className="p-4 text-sm text-center text-white/40">{b.gemini}</td>
                      <td className="p-4 text-sm text-center text-white/40">{b.llama}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-white/30 mt-3 text-center">Fonte: Tess AI Technical Documentation · AES-256 encryption · SOC 2 compliant · Dados de clientes não usados para treino de modelos</p>
          </RevealSection>

          {/* AI Models Grid */}
          <RevealSection className="mt-12">
            <h3 className="text-xl font-black text-white mb-6 text-center">+200 Modelos Disponíveis — Uma Seleção:</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {TESS_MODELS.map((model) => (
                <span key={model} className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(136,0,255,0.1)', border: '1px solid rgba(136,0,255,0.25)', color: 'rgba(255,255,255,0.7)' }}>
                  {model}
                </span>
              ))}
              <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(205,255,0,0.1)', border: '1px solid rgba(205,255,0,0.3)', color: '#CDFF00' }}>
                +186 mais
              </span>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────── */}
      <section id="timeline" className="py-24" style={{ background: 'rgba(18,18,18,0.6)' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <RevealSection className="text-center mb-16">
            <SectionLabel>Nossa História</SectionLabel>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
              De 2011 a Hoje:<br />
              <span style={{ color: '#8800FF' }}>13 Anos de Liderança.</span>
            </h2>
          </RevealSection>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, #8800FF, #CDFF00)' }} />
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }}
              variants={staggerContainer}
              className="space-y-8"
            >
              {TIMELINE.map((item, i) => (
                <motion.div key={item.year} variants={staggerItem} className="flex gap-8 pl-8 relative">
                  <div
                    className="absolute left-0 top-3 w-16 h-16 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                    style={{
                      background: i === TIMELINE.length - 1 ? 'linear-gradient(135deg, #8800FF, #CDFF00)' : 'rgba(136,0,255,0.15)',
                      border: '2px solid rgba(136,0,255,0.4)',
                      color: i === TIMELINE.length - 1 ? '#000' : '#8800FF',
                    }}
                  >
                    {item.year}
                  </div>
                  <div className="pt-3 pb-8 ml-10">
                    <h3 className="text-lg font-black text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-white/55 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CLIENTS ──────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <RevealSection className="text-center mb-12">
            <SectionLabel>Clientes</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              As Melhores Marcas do Mundo<br />
              <span style={{ color: '#CDFF00' }}>Crescem com a Pareto.</span>
            </h2>
          </RevealSection>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4"
          >
            {CLIENT_LOGOS.map((client) => (
              <motion.div
                key={client.name}
                variants={staggerItem}
                className="p-4 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(22,22,22,0.8)', border: '1px solid rgba(255,255,255,0.06)', minHeight: '64px' }}
              >
                <span className="text-xs font-bold text-white/50 text-center leading-tight">{client.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="py-24 text-center" style={{ background: 'rgba(13,13,13,1)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <RevealSection>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Pronto para ser o próximo<br />
              <span style={{ color: '#CDFF00' }}>caso de sucesso?</span>
            </h2>
            <p className="text-white/60 mb-8">Empresas com faturamento R$1M+/ano. Vagas limitadas por trimestre.</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #8800FF, #6600CC)', boxShadow: '0 0 40px rgba(136,0,255,0.4)' }}>
              Falar com Especialista Pareto
            </a>
          </RevealSection>
        </div>
      </section>
    </main>
  );
}
