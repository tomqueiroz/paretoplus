import { useRef } from 'react';
import { useCalendly } from '@/components/CalendlyModal';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Calendar, Shield, Zap, Globe, Lock, TrendingUp, Users, Award, Star, CheckCircle, Clock } from 'lucide-react';
import { CALENDLY_URL, WHATSAPP_URL, TIMELINE, AWARDS, COMPETITORS, scrollToSection } from '@/lib/index';

const PILLARS = [
  { icon: 'target', title: 'Estratégia Baseada em Dados', body: 'Cada decisão é validada com inteligência real do seu mercado — não por feeling ou benchmark genérico.' },
  { icon: 'cpu', title: 'IA Proprietária (Tess AI)', body: '#6 melhor produto de IA do mundo. +200 modelos integrados. Segurança enterprise. Brand Voice exclusiva.' },
  { icon: 'settings', title: 'Execução em Sprints', body: 'Entregamos resultados em ciclos curtos com accountability real — você vê impacto antes de cada aprovação.' },
  { icon: 'chart', title: 'ROI Mensurável', body: 'Medimos impacto em receita, custo operacional e velocidade de decisão. Nunca em métricas de vaidade.' },
  { icon: 'brain', title: 'Inteligência que Aprende', body: 'Nossos sistemas ficam mais inteligentes mês a mês com os seus dados. O valor compõe — e não pode ser copiado.' },
  { icon: 'users', title: 'Transferência de Conhecimento', body: 'Sua equipe sai mais forte. Treinamos, documentamos e preparamos você para operar com independência.' },
];
import { staggerContainer, staggerItem, scaleIn, fadeInUp } from '@/lib/motion';

// ─── Design tokens ──────────────────────────────────────────────────────────
const G900 = '#13100C'; const G800 = '#241F1A'; const G600 = '#4A4540';
const G400 = '#8A8278'; const G200 = '#BFB8AE'; const G100 = '#DDD7CF';
const OFF = '#F8F6F3'; const WHITE = '#FFFFFF';
const LIME = '#CBEC2E'; const LIME_DIM = '#A8C41E';

// ─── IconSVG ────────────────────────────────────────────────────────────────
const IPATHS: Record<string, string> = {
  target: 'M22 12h-4 M6 12H2 M12 6V2 M12 22v-4 M12 12m-3 0a3 3 0 106 0 3 3 0 00-6 0 M12 12m-7 0a7 7 0 1014 0 7 7 0 00-14 0',
  cpu: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
  settings: 'M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z',
  chart: 'M18 20V10 M12 20V4 M6 20v-6',
  brain: 'M12 5a3 3 0 00-3 3v.5a1 1 0 01-1 1H7a2 2 0 100 4h1a1 1 0 011 1v.5a3 3 0 006 0V14a1 1 0 011-1h1a2 2 0 100-4h-1a1 1 0 01-1-1V8a3 3 0 00-3-3z',
  users: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75',
  layers: 'M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5',
  link: 'M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71 M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  lightbulb: 'M9 21h6 M12 3a6 6 0 00-6 6c0 2.22 1.21 4.16 3 5.2V17a1 1 0 001 1h4a1 1 0 001-1v-2.8c1.79-1.04 3-2.98 3-5.2a6 6 0 00-6-6z',
  trending: 'M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6',
  search: 'M11 17a6 6 0 100-12 6 6 0 000 12z M21 21l-4.35-4.35',
  award: 'M12 15a7 7 0 100-14 7 7 0 000 14z M8.21 13.89L7 23l5-3 5 3-1.21-9.12',
  zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  check: 'M20 6L9 17l-5-5',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  globe: 'M12 22a10 10 0 100-20 10 10 0 000 20z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z',
};
function IconSVG({ name, size = 20, color = 'currentColor', strokeWidth = 1.6 }: { name: string; size?: number; color?: string; strokeWidth?: number }) {
  const d = IPATHS[name] || IPATHS.settings;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      {d.split(' M').map((part, i) => (<path key={i} d={i === 0 ? part : 'M' + part} />))}
    </svg>
  );
}


// ─── Primitives ──────────────────────────────────────────────────────────────
function Tag({ children, color = '#8800FF' }: { children: React.ReactNode; color?: string }) {
  return (
    <div className="inline-flex items-center gap-2 mb-5">
      <div className="w-5 h-px" style={{ background: color }} />
      <span className="text-[17px] font-black tracking-[0.3em] uppercase" style={{ color: color === "#8800FF" ? G900 : color }}>{children}</span>
    </div>
  );
}
function Heading({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-black text-white leading-tight ${className}`}
      style={{ letterSpacing: '-0.03em', fontFamily: "'Playfair Display', Georgia, serif" }}>{children}</h2>
  );
}
function Body({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`leading-relaxed ${className}`}
      style={{ color: '#8A8278', fontWeight: 300, fontFamily: "'Playfair Display', Georgia, serif" }}>{children}</p>
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
function CTAPrimary({ children }: { href?: string; children: React.ReactNode }) {
  const { open } = useCalendly();
  return (
    <button onClick={open}
      className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-black text-sm text-white"
      style={{ background: '#13100C', boxShadow: '0 0 40px rgba(136,0,255,0.4)', border: 'none', cursor: 'pointer' }}>
      {children}
    </button>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function PorQuePareto() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 140]);

  return (
    <div style={{ background: '#F8F6F3', fontFamily: "'Playfair Display', Georgia, serif", color: G900 }}>

      {/* ═══ HERO ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-[76vh] flex items-end overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img src="/images/pareto_office1.png" alt="" aria-hidden className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.2) saturate(1.1)' }} />
        </motion.div>
        {/* Purple radial */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 50%, rgba(19,16,12,0.22) 0%, transparent 70%)' }} />
        {/* grid overlay removido */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #080808 0%, rgba(8,8,8,0) 60%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-20 pt-36">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.9 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{ border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#CBEC2E' }} />
              <span className="text-[11px] font-black tracking-[0.25em] uppercase" style={{ color: '#F8F6F3' }}>
                Holding Pareto · 13 Anos · São Paulo + Palo Alto
              </span>
            </div>
            <h1 className="mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 'clamp(2.6rem, 5vw, 4.5rem)', letterSpacing: '-2px', lineHeight: 1.05, color: G900 }}>
              Por que a Pareto é<br />
              <span style={{ color: '#CBEC2E' }}>
                o parceiro que você estava procurando.
              </span>
            </h1>
            <p className="max-w-2xl text-base mb-10" style={{ color: '#8A8278', fontWeight: 300, lineHeight: 1.75 }}>
              Não somos uma agência. Não somos uma ferramenta. Somos a holding que une consultoria estratégica e
              tecnologia proprietária para transformar sua operação com IA — de forma customizada, segura e com
              transferência real de conhecimento para o seu time.
            </p>
            <div className="flex flex-wrap gap-4">
              <CTAPrimary href={CALENDLY_URL}><Calendar className="w-4 h-4" /> Agendar Diagnóstico</CTAPrimary>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full font-bold text-sm"
                style={{ border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.65)' }}>
                Falar no WhatsApp <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ PROOF STRIP ════════════════════════════════════════════ */}
      <div style={{ background: '#13100C', borderTop: '1px solid rgba(136,0,255,0.1)', borderBottom: '1px solid rgba(136,0,255,0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap items-center justify-center gap-8">
          {[
            { v: '13+', l: 'Anos ativos com IA aplicada a negócios' },
            { v: '16',  l: 'Prêmios Google Awards NY — Empresa mais premiada do mundo 2022' },
            { v: '#6',  l: 'Melhor IA do mundo — G2 Best Software Awards 2024' },
            { v: '300+',l: 'Empresas transformadas no Brasil' },
            { v: 'US$5M', l: 'Seed round · Hi Ventures · DYDX Capital · 2026' },
          ].map(s => (
            <div key={s.v} className="text-center">
              <div className="text-2xl font-black" style={{ color: '#CBEC2E', letterSpacing: '-0.04em' }}>{s.v}</div>
              <div className="text-[10px] mt-1 max-w-[120px]" style={{ color: '#8A8278', fontWeight: 300, lineHeight: 1.4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ QUEM SOMOS DE VERDADE ══════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 80% 50%, rgba(136,0,255,0.07) 0%, transparent 70%)' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <Tag>Quem Somos de Verdade</Tag>
              <Heading className="text-2xl md:text-3xl mb-6">
                Construímos muito mais que<br />aplicativos e agentes de IA.<br />
                <span style={{ color: '#F8F6F3' }}>Construímos vantagem competitiva.</span>
              </Heading>
              <Body className="mb-5">
                A Pareto não cria soluções de prateleira. Antes de escrever uma linha de código,
                antes de configurar um único agente, nossos especialistas mergulham na sua operação:
                entendem a cadeia de valor, os gargalos reais, a visão estratégica de médio e longo prazo.
              </Body>
              <Body className="mb-5">
                O resultado não é uma ferramenta que você precisa aprender a usar. É uma transformação
                que integra inteligência nos processos que mais importam — com impacto mensurável em
                receita, custo operacional e velocidade de decisão.
              </Body>
              <Body className="mb-8">
                E quando o projeto termina, o know-how fica com você. Seu time opera, evolui e dá
                continuidade — sem dependência de nenhum fornecedor, incluindo a Pareto.
              </Body>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: 'layers', text: 'IA customizada nos dados reais do seu negócio' },
                  { icon: 'link', text: 'Integração total com sua stack atual' },
                  { icon: 'brain', text: 'Transferência de conhecimento para o seu time' },
                  { icon: 'chart', text: 'Accountability em receita e custo — não vaidade' },
                ].map(i => (
                  <div key={i.text} className="flex items-start gap-2.5 p-4 rounded-xl"
                    style={{ background: '#F8F6F3', border: `1px solid #DDD7CF` }}>
                    <IconSVG name={i.icon} size={18} color={LIME_DIM} />
                    <Body className="text-xs">{i.text}</Body>
                  </div>
                ))}
              </div>
            </Reveal>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="relative">
              <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid #BFB8AE` }}>
                <img src="/images/pareto_office2.jpg" alt="Escritório Pareto" className="w-full object-cover"
                  style={{ filter: 'brightness(0.55) saturate(1.1)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.9) 0%, transparent 50%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-sm font-black text-white mb-1">Av. Paulista, 2202 — São Paulo</div>
                  <Body className="text-xs">160+ especialistas. 13 anos de inteligência do mercado brasileiro.</Body>
                </div>
              </div>
              {/* Floating proof */}
              <div className="absolute -top-4 -right-4 p-4 rounded-xl"
                style={{ background: 'rgba(8,8,8,0.97)', border: `1px solid #BFB8AE`, backdropFilter: 'blur(12px)' }}>
                <div className="text-2xl font-black" style={{ color: '#CBEC2E' }}>#6</div>
                <div className="text-[10px] font-black text-white">G2 Melhor IA Global</div>
                <div className="text-[9px]" style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 300 }}>2024 · Tess AI</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ METODOLOGIA ════════════════════════════════════════════ */}
      <section className="py-24 relative" style={{ background: '#FFFFFF' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(19,16,12,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(19,16,12,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-14">
            <Tag>Metodologia Pareto</Tag>
            <Heading className="text-2xl md:text-3xl mb-5">
              Da visão estratégica à<br />
              <span style={{ color: '#F8F6F3' }}>execução que gera resultado tangível.</span>
            </Heading>
            <Body className="max-w-2xl mx-auto text-sm">
              Nosso processo de transformação AI First não começa com ferramentas.
              Começa com a compreensão profunda da sua operação e da sua ambição de negócio.
            </Body>
          </Reveal>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px hidden lg:block"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(136,0,255,0.3) 10%, rgba(136,0,255,0.3) 90%, transparent)' }} />

            <div className="space-y-6 lg:space-y-0">
              {[
                { n: '01', icon: 'search', title: 'Diagnóstico Profundo de Negócio', time: '1–2 semanas',
                  body: 'Mapeamos sua cadeia de valor completa, identificamos os 3-5 processos com maior potencial de transformação por IA, e estabelecemos o baseline de métricas. Saímos com um mapa claro de onde implementar para ter o maior impacto.' },
                { n: '02', icon: 'layers', title: 'AI Canvas — Priorização Estratégica', time: '1 semana',
                  body: 'Nosso framework proprietário de priorização. Mapeamos cada iniciativa de IA por potencial de ROI x complexidade de implementação, definindo o roadmap ideal para seus recursos e objetivos.' },
                { n: '03', icon: 'shield', title: 'Arquitetura de IA Customizada', time: '2–4 semanas',
                  body: 'Desenhamos a arquitetura técnica completa — agentes, modelos, integrações, segurança, governança. Nada de template. Tudo construído sobre os dados e a lógica do seu negócio.' },
                { n: '04', icon: 'settings', title: 'Implementação com Human-in-the-Loop', time: '4–12 semanas',
                  body: 'Implementação iterativa, validada pelo seu time a cada sprint. A IA executa; o humano valida e corrige. Esse ciclo garante que o modelo aprenda com a inteligência específica do negócio antes de operar de forma autônoma.' },
                { n: '05', icon: 'lightbulb', title: 'Capacitação e Transferência de Know-how', time: 'Contínuo até 2028',
                  body: 'Cada colaborador relevante é treinado para operar, orquestrar e coordenar os agentes que foram implementados na sua área. Workshops, documentação viva e suporte de evolução.' },
                { n: '06', icon: 'trending', title: 'Accountability e Evolução Contínua', time: 'Mensal',
                  body: 'Medimos impacto real — redução de custo, aumento de produtividade, velocidade de decisão. Reports executivos mensais com o que evoluiu, o que vai evoluir e o próximo ciclo de oportunidades.' },
              ].map((s, idx) => (
                <Reveal key={s.n} delay={idx * 0.08} className={`lg:flex items-start gap-8 ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`flex-1 p-7 rounded-2xl ${idx % 2 === 0 ? 'lg:text-right' : ''}`}
                    style={{ background: '#FFFFFF', border: `1px solid #DDD7CF` }}>
                    <div className={`flex items-start gap-3 mb-4 ${idx % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                      <IconSVG name={s.icon} size={28} color={LIME_DIM} />
                      <div>
                        <div className="text-[10px] font-black tracking-widest uppercase mb-1" style={{ color: G600 }}>Etapa {s.n}</div>
                        <div className="text-sm font-black" style={{ color: G900 }}>{s.title}</div>
                        <div className="text-xs mt-0.5 flex items-center gap-1" style={{ color: G400 }}>
                          <Clock className="w-3 h-3 flex-shrink-0" /> {s.time}
                        </div>
                      </div>
                    </div>
                    <Body className="text-sm">{s.body}</Body>
                  </div>
                  {/* Center circle */}
                  <div className="hidden lg:flex w-10 items-center justify-center flex-shrink-0 mt-6">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-xs"
                      style={{ background: '#13100C', color: '#CBEC2E', boxShadow: 'none' }}>
                      {s.n}
                    </div>
                  </div>
                  <div className="flex-1 hidden lg:block" />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ OS 6 PILARES ═══════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(136,0,255,0.07) 0%, transparent 70%)' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-14">
            <Tag>Os 6 Pilares</Tag>
            <Heading className="text-2xl md:text-3xl mb-5">
              O que nos diferencia na prática —<br />
              <span style={{ color: '#CBEC2E' }}>não no discurso.</span>
            </Heading>
          </Reveal>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PILLARS.map((p: { icon: string; title: string; body: string }) => (
              <motion.div key={p.title} variants={staggerItem} className="p-7 rounded-2xl"
                style={{ background: '#FFFFFF', border: `1px solid #DDD7CF` }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5"
                  style={{ background: '#F8F6F3' }}>{p.icon}</div>
                <div className="text-sm font-black text-white mb-3">{p.title}</div>
                <Body className="text-sm">{p.body}</Body>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ HOLDING: 2 VERTICAIS ════════════════════════════════════ */}
      <section className="py-24 relative" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-14">
            <Tag>A Holding</Tag>
            <Heading className="text-2xl md:text-3xl mb-5">
              Dois mundos. Um ecossistema.<br />
              <span style={{ color: '#F8F6F3' }}>Vantagem que nenhum concorrente oferece.</span>
            </Heading>
            <Body className="max-w-2xl mx-auto text-sm">
              A maioria dos fornecedores de IA tem ou consultoria OU plataforma. A Pareto tem as duas —
              construídas, integradas e evoluindo juntas desde 2013.
            </Body>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Pareto Plus */}
            <Reveal>
              <div className="p-8 rounded-2xl h-full" style={{ background: '#F8F6F3', border: `1px solid #BFB8AE` }}>
                <div className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: '#F8F6F3' }}>Vertical I</div>
                <div className="text-3xl font-black text-white mb-2">Pareto Plus</div>
                <p className="text-sm font-bold mb-5" style={{ color: '#F8F6F3' }}>Consultoria Estratégica de IA Aplicada</p>
                <Body className="text-sm mb-6">
                  Time de 160+ especialistas que entra na operação, entende o negócio em profundidade e
                  implementa soluções de IA customizadas — com responsabilidade de resultado e
                  transferência de know-how para o time do cliente.
                </Body>
                <ul className="space-y-2">
                  {['Diagnóstico e priorização de uso de IA por processo',
                    'Implementação de agentes, automações e modelos customizados',
                    'Capacitação do time — do nível estratégico ao operacional',
                    'Accountability mensal: receita, custo e velocidade de decisão',
                    'Inteligência profunda do mercado e regulatório brasileiro'].map(i => (
                    <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: '#8A8278', fontWeight: 300 }}>
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#F8F6F3' }} />{i}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Tess AI */}
            <Reveal delay={0.1}>
              <div className="p-8 rounded-2xl h-full" style={{ background: 'rgba(205,255,0,0.04)', border: `1px solid #DDD7CF` }}>
                <div className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: '#CBEC2E' }}>Vertical II</div>
                <div className="text-3xl font-black text-white mb-2">Tess AI</div>
                <p className="text-sm font-bold mb-5" style={{ color: '#CBEC2E' }}>Plataforma Proprietária · #6 Melhor IA do Mundo</p>
                <Body className="text-sm mb-6">
                  +250 modelos de IA em um único ambiente enterprise. G2 eleiu a Tess AI o 6º melhor produto de IA do mundo em 2024
                  — à frente do ChatGPT (#10), Gemini (#22) e IBM Watson (#28). Sede em Palo Alto · US$5M seed round · 2M+ usuários.
                </Body>
                <ul className="space-y-2">
                  {['Model Council: 3 modelos revisam cada tarefa em paralelo',
                    'Agentic Execution: até 40 operações autônomas por chamada',
                    'Brand Voice: IA que fala com a voz da sua marca',
                    'AI Studio: criação de agentes no-code para seu negócio',
                    'SSO, isolamento de dados, LGPD/GDPR nativo — zero lock-in'].map(i => (
                    <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: '#8A8278', fontWeight: 300 }}>
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#CBEC2E' }} />{i}
                    </li>
                  ))}
                </ul>
                <a href="/tess-ai" className="inline-flex items-center gap-2 mt-6 text-sm font-bold" style={{ color: '#CBEC2E' }}>
                  Ver tudo sobre a Tess AI <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE HISTÓRICO ══════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(136,0,255,0.06) 0%, transparent 70%)' }} />
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-14">
            <Tag>13 Anos de História</Tag>
            <Heading className="text-2xl md:text-3xl mb-5">
              A trajetória que prova que<br />
              <span style={{ color: '#CBEC2E' }}>não somos mais um fornecedor de 2022.</span>
            </Heading>
          </Reveal>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(136,0,255,0.4) 5%, rgba(136,0,255,0.4) 95%, transparent)' }} />

            <div className="space-y-8">
              {TIMELINE.map((t, idx) => (
                <Reveal key={t.year} delay={idx * 0.06}>
                  <div className={`flex gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Content */}
                    <div className={`flex-1 ml-14 md:ml-0 p-6 rounded-2xl ${idx % 2 === 0 ? 'md:text-right' : ''}`}
                      style={{ background: '#FFFFFF', border: `1px solid #DDD7CF` }}>
                      <div className="text-xs font-black tracking-widest uppercase mb-2"
                        style={{ color: t.year >= '2024' ? '#CDFF00' : '#8800FF' }}>{t.year}</div>
                      <div className="text-sm font-black text-white mb-2">{t.title}</div>
                      <Body className="text-xs">{t.description}</Body>
                    </div>
                    {/* Dot */}
                    <div className="hidden md:flex w-4 flex-shrink-0 items-start pt-6 justify-center relative">
                      <div className="w-4 h-4 rounded-full border-2 z-10"
                        style={{ background: `${t.year >= '2024' ? LIME : G900}`, borderColor: '#080808', boxShadow: `0 0 12px ${t.year >= '2024' ? 'rgba(205,255,0,0.5)' : 'rgba(136,0,255,0.5)'}` }} />
                    </div>
                    <div className="flex-1 hidden md:block" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ RECONHECIMENTOS ═════════════════════════════════════════ */}
      <section className="py-20 relative" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-12">
            <Tag>Credenciais Verificadas</Tag>
            <Heading className="text-xl md:text-2xl mb-4">Prêmios e reconhecimentos que importam.</Heading>
            <Body className="max-w-lg mx-auto text-sm">
              Não por vaidade — para que você saiba que está escolhendo um parceiro que foi avaliado e validado
              pelos melhores do mundo, repetidamente.
            </Body>
          </Reveal>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AWARDS.filter(a => a.highlight).map(a => (
              <motion.div key={a.title} variants={staggerItem} className="p-5 rounded-2xl"
                style={{ background: '#FFFFFF', border: `1px solid #DDD7CF` }}>
                <Award className="w-5 h-5 mb-3" style={{ color: '#CBEC2E' }} />
                <div className="text-xs font-black text-white mb-1">{a.title}</div>
                <div className="text-[10px] font-bold" style={{ color: '#F8F6F3' }}>{a.org}</div>
                <div className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 300 }}>{a.year}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ PARETO VS MERCADO ═══════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(205,255,0,0.04) 0%, transparent 70%)' }} />
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-12">
            <Tag>Pareto vs Mercado</Tag>
            <Heading className="text-xl md:text-2xl mb-4">Por que a Pareto. Não os outros.</Heading>
          </Reveal>

          <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid #BFB8AE` }}>
            <div className="grid grid-cols-3 text-xs font-black uppercase tracking-widest"
              style={{ background: '#FFFFFF', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="p-4 text-center" style={{ color: '#8A8278', borderRight: '1px solid rgba(255,255,255,0.06)' }}>O Concorrente</div>
              <div className="p-4 text-center" style={{ color: 'rgba(180,60,60,0.7)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>O que oferecem</div>
              <div className="p-4 text-center" style={{ color: '#CBEC2E' }}>O que a Pareto entrega</div>
            </div>
            {COMPETITORS.map((c, i) => (
              <div key={c.competitor} className="grid grid-cols-3"
                style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="p-4 text-xs font-bold text-white" style={{ borderRight: '1px solid rgba(255,255,255,0.04)' }}>{c.competitor}</div>
                <div className="p-4 text-xs leading-snug" style={{ color: 'rgba(255,100,100,0.55)', fontWeight: 300, borderRight: '1px solid rgba(255,255,255,0.04)' }}>{c.offer}</div>
                <div className="p-4 text-xs leading-snug" style={{ color: '#A8C41E', fontWeight: 300 }}>{c.advantage}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SEGURANÇA & LGPD ════════════════════════════════════════ */}
      <section className="py-20 relative" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-12">
            <Tag>Segurança & Governança</Tag>
            <Heading className="text-xl md:text-2xl mb-4">
              IA segura não é diferencial.<br />
              <span style={{ color: '#F8F6F3' }}>É fundamento inegociável.</span>
            </Heading>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Lock className="w-5 h-5" />, title: 'Isolamento por Cliente', body: 'Seus dados nunca são misturados com dados de outros clientes ou usados para treinar modelos de terceiros.' },
              { icon: <Shield className="w-5 h-5" />, title: 'SSO + Audit Trail', body: 'Single Sign-On corporativo, controle de acesso por papel e log completo de todas as operações.' },
              { icon: <Globe className="w-5 h-5" />, title: 'LGPD + GDPR Nativo', body: 'Arquitetura desenhada para conformidade regulatória brasileira e europeia desde a fundação.' },
              { icon: <Zap className="w-5 h-5" />, title: 'Zero Lock-in', body: 'Toda a arquitetura é documentada e transferida. Você pode mudar de fornecedor a qualquer momento sem perder o investimento.' },
            ].map(item => (
              <Reveal key={item.title}>
                <div className="p-6 rounded-2xl h-full" style={{ background: '#F8F6F3', border: '1px solid rgba(136,0,255,0.15)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: '#DDD7CF', color: '#a855f7' }}>
                    {item.icon}
                  </div>
                  <div className="text-sm font-black text-white mb-2">{item.title}</div>
                  <Body className="text-xs">{item.body}</Body>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CAPACITAÇÃO 2028 ════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(136,0,255,0.1) 0%, transparent 70%)' }} />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <Tag>Meta 2028</Tag>
            <Heading className="text-2xl md:text-3xl mb-6">
              1 milhão de profissionais<br />
              <span style={{ color: '#CBEC2E' }}>capacitados para operar com IA até 2028.</span>
            </Heading>
            <Body className="max-w-2xl mx-auto mb-8">
              Por meio da Pareto Academy e AI Hub, desenvolvemos trilhas de capacitação para
              todos os níveis organizacionais — do CEO ao operacional. Até 2028, cada
              colaborador deve ser capaz de interagir com agentes de IA, coordenar workflows
              inteligentes e tomar decisões mais ágeis com suporte de inteligência artificial.
            </Body>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {[
                { icon: '👔', level: 'Nível Executivo', desc: 'Estratégia AI First, indicadores, governança e decisão com IA' },
                { icon: '🧑‍💼', level: 'Nível Gerencial', desc: 'Orquestração de agentes, análise de outputs e liderança de times com IA' },
                { icon: 'settings', level: 'Nível Operacional', desc: 'Uso produtivo de ferramentas de IA no dia a dia da função' },
              ].map(l => (
                <div key={l.level} className="p-6 rounded-2xl text-left"
                  style={{ background: '#FFFFFF', border: `1px solid #DDD7CF` }}>
                  <span className="text-3xl block mb-3">{l.icon}</span>
                  <div className="text-sm font-black text-white mb-2">{l.level}</div>
                  <Body className="text-xs">{l.desc}</Body>
                </div>
              ))}
            </div>
            <CTAPrimary href={CALENDLY_URL}>
              <Calendar className="w-5 h-5" /> Iniciar a Transformação do Meu Time
            </CTAPrimary>
          </Reveal>
        </div>
      </section>

      {/* ═══ CTA FINAL ═══════════════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden" style={{ background: '#FFFFFF' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(136,0,255,0.12) 0%, transparent 65%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <Heading className="text-2xl md:text-3xl mb-5">
              Pronto para conhecer<br />
              <span style={{ color: '#CBEC2E', background: 'none', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                o parceiro certo para sua transformação?
              </span>
            </Heading>
            <Body className="mb-8 text-sm max-w-xl mx-auto">
              30 minutos com um especialista Pareto. O mapa de onde a IA gera o maior retorno
              para o seu negócio — com os dados do seu setor e da sua realidade operacional.
            </Body>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAPrimary href={CALENDLY_URL}><Calendar className="w-5 h-5" /> Agendar Diagnóstico Gratuito</CTAPrimary>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-bold text-sm"
                style={{ border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.6)' }}>
                Falar no WhatsApp <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
