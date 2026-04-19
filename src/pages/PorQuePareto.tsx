import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Calendar, Shield, Zap, Globe, Lock, TrendingUp, Users, Award, Star, CheckCircle, Clock } from 'lucide-react';
import { CALENDLY_URL, WHATSAPP_URL, TIMELINE, AWARDS, COMPETITORS, PILLARS, scrollToSection } from '@/lib/index';
import { staggerContainer, staggerItem, scaleIn, fadeInUp } from '@/lib/motion';

// ─── Primitives ──────────────────────────────────────────────────────────────
function Tag({ children, color = '#8800FF' }: { children: React.ReactNode; color?: string }) {
  return (
    <div className="inline-flex items-center gap-2 mb-5">
      <div className="w-5 h-px" style={{ background: color }} />
      <span className="text-[11px] font-black tracking-[0.3em] uppercase" style={{ color }}>{children}</span>
    </div>
  );
}
function Heading({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-black text-white leading-tight ${className}`}
      style={{ letterSpacing: '-0.03em', fontFamily: 'var(--font-heading)' }}>{children}</h2>
  );
}
function Body({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`leading-relaxed ${className}`}
      style={{ color: 'rgba(255,255,255,0.52)', fontWeight: 300, fontFamily: 'var(--font-heading)' }}>{children}</p>
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
function CTAPrimary({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-black text-sm text-white"
      style={{ background: 'linear-gradient(135deg,#8800FF,#6600CC)', boxShadow: '0 0 40px rgba(136,0,255,0.4)' }}>
      {children}
    </a>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function PorQuePareto() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 140]);

  return (
    <div style={{ background: 'var(--bg-base)', fontFamily: 'var(--font-heading)', color: '#fff' }}>

      {/* ═══ HERO ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-[76vh] flex items-end overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img src="/images/pareto_office1.png" alt="" aria-hidden className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.25) saturate(1.2)' }} />
        </motion.div>
        {/* Purple radial */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 50%, rgba(136,0,255,0.22) 0%, transparent 70%)' }} />
        {/* Grid overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(136,0,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(136,0,255,0.06) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #080808 0%, rgba(8,8,8,0) 60%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-20 pt-36">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.9 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{ border: '1px solid rgba(136,0,255,0.4)', background: 'rgba(136,0,255,0.08)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#8800FF' }} />
              <span className="text-[11px] font-black tracking-[0.25em] uppercase" style={{ color: '#8800FF' }}>
                Holding Pareto · 13 Anos · São Paulo + Palo Alto
              </span>
            </div>
            <h1 className="font-black mb-6" style={{ fontSize: 'clamp(2.6rem, 5vw, 4.5rem)', letterSpacing: '-0.04em', lineHeight: 1.06 }}>
              Por que a Pareto é<br />
              <span style={{ background: 'linear-gradient(95deg, #8800FF 0%, #CDFF00 65%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                o parceiro que você estava procurando.
              </span>
            </h1>
            <p className="max-w-2xl text-base mb-10" style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300, lineHeight: 1.75 }}>
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
      <div style={{ background: 'rgba(10,10,10,1)', borderTop: '1px solid rgba(136,0,255,0.1)', borderBottom: '1px solid rgba(136,0,255,0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap items-center justify-center gap-8">
          {[
            { v: '13+', l: 'Anos ativos com IA aplicada a negócios' },
            { v: '16',  l: 'Prêmios Google Awards NY — Empresa mais premiada do mundo 2022' },
            { v: '#6',  l: 'Melhor IA do mundo — G2 Best Software Awards 2024' },
            { v: '300+',l: 'Empresas transformadas no Brasil' },
            { v: 'US$5M', l: 'Seed round · Hi Ventures · DYDX Capital · 2026' },
          ].map(s => (
            <div key={s.v} className="text-center">
              <div className="text-2xl font-black" style={{ color: '#CDFF00', letterSpacing: '-0.04em' }}>{s.v}</div>
              <div className="text-[10px] mt-1 max-w-[120px]" style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 300, lineHeight: 1.4 }}>{s.l}</div>
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
                <span style={{ color: '#8800FF' }}>Construímos vantagem competitiva.</span>
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
                  { icon: '🧬', text: 'IA customizada nos dados reais do seu negócio' },
                  { icon: '🔗', text: 'Integração total com sua stack atual' },
                  { icon: '🧠', text: 'Transferência de conhecimento para o seu time' },
                  { icon: '📊', text: 'Accountability em receita e custo — não vaidade' },
                ].map(i => (
                  <div key={i.text} className="flex items-start gap-2.5 p-4 rounded-xl"
                    style={{ background: 'rgba(136,0,255,0.06)', border: '1px solid rgba(136,0,255,0.12)' }}>
                    <span className="text-xl flex-shrink-0">{i.icon}</span>
                    <Body className="text-xs">{i.text}</Body>
                  </div>
                ))}
              </div>
            </Reveal>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="relative">
              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(136,0,255,0.2)' }}>
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
                style={{ background: 'rgba(8,8,8,0.97)', border: '1px solid rgba(205,255,0,0.3)', backdropFilter: 'blur(12px)' }}>
                <div className="text-2xl font-black" style={{ color: '#CDFF00' }}>#6</div>
                <div className="text-[10px] font-black text-white">G2 Melhor IA Global</div>
                <div className="text-[9px]" style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 300 }}>2024 · Tess AI</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ METODOLOGIA ════════════════════════════════════════════ */}
      <section className="py-24 relative" style={{ background: 'rgba(10,10,10,0.98)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(136,0,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(136,0,255,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-14">
            <Tag>Metodologia Pareto</Tag>
            <Heading className="text-2xl md:text-3xl mb-5">
              Da visão estratégica à<br />
              <span style={{ color: '#8800FF' }}>execução que gera resultado tangível.</span>
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
                { n: '01', icon: '🔍', title: 'Diagnóstico Profundo de Negócio', time: '1–2 semanas',
                  body: 'Mapeamos sua cadeia de valor completa, identificamos os 3-5 processos com maior potencial de transformação por IA, e estabelecemos o baseline de métricas. Saímos com um mapa claro de onde implementar para ter o maior impacto.' },
                { n: '02', icon: '🗺️', title: 'AI Canvas — Priorização Estratégica', time: '1 semana',
                  body: 'Nosso framework proprietário de priorização. Mapeamos cada iniciativa de IA por potencial de ROI x complexidade de implementação, definindo o roadmap ideal para seus recursos e objetivos.' },
                { n: '03', icon: '🏗️', title: 'Arquitetura de IA Customizada', time: '2–4 semanas',
                  body: 'Desenhamos a arquitetura técnica completa — agentes, modelos, integrações, segurança, governança. Nada de template. Tudo construído sobre os dados e a lógica do seu negócio.' },
                { n: '04', icon: '⚙️', title: 'Implementação com Human-in-the-Loop', time: '4–12 semanas',
                  body: 'Implementação iterativa, validada pelo seu time a cada sprint. A IA executa; o humano valida e corrige. Esse ciclo garante que o modelo aprenda com a inteligência específica do negócio antes de operar de forma autônoma.' },
                { n: '05', icon: '📚', title: 'Capacitação e Transferência de Know-how', time: 'Contínuo até 2028',
                  body: 'Cada colaborador relevante é treinado para operar, orquestrar e coordenar os agentes que foram implementados na sua área. Workshops, documentação viva e suporte de evolução.' },
                { n: '06', icon: '📈', title: 'Accountability e Evolução Contínua', time: 'Mensal',
                  body: 'Medimos impacto real — redução de custo, aumento de produtividade, velocidade de decisão. Reports executivos mensais com o que evoluiu, o que vai evoluir e o próximo ciclo de oportunidades.' },
              ].map((s, idx) => (
                <Reveal key={s.n} delay={idx * 0.08} className={`lg:flex items-start gap-8 ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`flex-1 p-7 rounded-2xl ${idx % 2 === 0 ? 'lg:text-right' : ''}`}
                    style={{ background: 'rgba(16,16,16,0.98)', border: '1px solid rgba(136,0,255,0.12)' }}>
                    <div className={`flex items-start gap-3 mb-4 ${idx % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                      <span className="text-3xl flex-shrink-0">{s.icon}</span>
                      <div>
                        <div className="text-[10px] font-black tracking-widest uppercase mb-1" style={{ color: 'rgba(136,0,255,0.7)' }}>Etapa {s.n}</div>
                        <div className="text-sm font-black text-white">{s.title}</div>
                        <div className="text-xs mt-0.5 flex items-center gap-1" style={{ color: 'rgba(205,255,0,0.6)' }}>
                          <Clock className="w-3 h-3 flex-shrink-0" /> {s.time}
                        </div>
                      </div>
                    </div>
                    <Body className="text-sm">{s.body}</Body>
                  </div>
                  {/* Center circle */}
                  <div className="hidden lg:flex w-10 items-center justify-center flex-shrink-0 mt-6">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-xs"
                      style={{ background: 'linear-gradient(135deg,#8800FF,#6600CC)', color: '#fff', boxShadow: '0 0 20px rgba(136,0,255,0.4)' }}>
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
              <span style={{ color: '#CDFF00' }}>não no discurso.</span>
            </Heading>
          </Reveal>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PILLARS.map(p => (
              <motion.div key={p.title} variants={staggerItem} className="p-7 rounded-2xl"
                style={{ background: 'rgba(14,14,14,0.98)', border: '1px solid rgba(136,0,255,0.1)' }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5"
                  style={{ background: 'rgba(136,0,255,0.1)' }}>{p.icon}</div>
                <div className="text-sm font-black text-white mb-3">{p.title}</div>
                <Body className="text-sm">{p.body}</Body>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ HOLDING: 2 VERTICAIS ════════════════════════════════════ */}
      <section className="py-24 relative" style={{ background: 'rgba(10,10,10,0.98)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-14">
            <Tag>A Holding</Tag>
            <Heading className="text-2xl md:text-3xl mb-5">
              Dois mundos. Um ecossistema.<br />
              <span style={{ color: '#8800FF' }}>Vantagem que nenhum concorrente oferece.</span>
            </Heading>
            <Body className="max-w-2xl mx-auto text-sm">
              A maioria dos fornecedores de IA tem ou consultoria OU plataforma. A Pareto tem as duas —
              construídas, integradas e evoluindo juntas desde 2013.
            </Body>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Pareto Plus */}
            <Reveal>
              <div className="p-8 rounded-2xl h-full" style={{ background: 'rgba(136,0,255,0.06)', border: '1px solid rgba(136,0,255,0.25)' }}>
                <div className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: '#8800FF' }}>Vertical I</div>
                <div className="text-3xl font-black text-white mb-2">Pareto Plus</div>
                <p className="text-sm font-bold mb-5" style={{ color: '#8800FF' }}>Consultoria Estratégica de IA Aplicada</p>
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
                    <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#8800FF' }} />{i}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Tess AI */}
            <Reveal delay={0.1}>
              <div className="p-8 rounded-2xl h-full" style={{ background: 'rgba(205,255,0,0.04)', border: '1px solid rgba(205,255,0,0.22)' }}>
                <div className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: '#CDFF00' }}>Vertical II</div>
                <div className="text-3xl font-black text-white mb-2">Tess AI</div>
                <p className="text-sm font-bold mb-5" style={{ color: '#CDFF00' }}>Plataforma Proprietária · #6 Melhor IA do Mundo</p>
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
                    <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#CDFF00' }} />{i}
                    </li>
                  ))}
                </ul>
                <a href="/tess-ai" className="inline-flex items-center gap-2 mt-6 text-sm font-bold" style={{ color: '#CDFF00' }}>
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
              <span style={{ color: '#CDFF00' }}>não somos mais um fornecedor de 2022.</span>
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
                      style={{ background: 'rgba(14,14,14,0.98)', border: '1px solid rgba(136,0,255,0.1)' }}>
                      <div className="text-xs font-black tracking-widest uppercase mb-2"
                        style={{ color: t.year >= '2024' ? '#CDFF00' : '#8800FF' }}>{t.year}</div>
                      <div className="text-sm font-black text-white mb-2">{t.title}</div>
                      <Body className="text-xs">{t.description}</Body>
                    </div>
                    {/* Dot */}
                    <div className="hidden md:flex w-4 flex-shrink-0 items-start pt-6 justify-center relative">
                      <div className="w-4 h-4 rounded-full border-2 z-10"
                        style={{ background: t.year >= '2024' ? '#CDFF00' : '#8800FF', borderColor: '#080808', boxShadow: `0 0 12px ${t.year >= '2024' ? 'rgba(205,255,0,0.5)' : 'rgba(136,0,255,0.5)'}` }} />
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
      <section className="py-20 relative" style={{ background: 'rgba(10,10,10,0.98)' }}>
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
                style={{ background: 'rgba(14,14,14,0.98)', border: '1px solid rgba(136,0,255,0.12)' }}>
                <Award className="w-5 h-5 mb-3" style={{ color: '#CDFF00' }} />
                <div className="text-xs font-black text-white mb-1">{a.title}</div>
                <div className="text-[10px] font-bold" style={{ color: '#8800FF' }}>{a.org}</div>
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

          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(136,0,255,0.2)' }}>
            <div className="grid grid-cols-3 text-xs font-black uppercase tracking-widest"
              style={{ background: 'rgba(14,14,14,0.98)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="p-4 text-center" style={{ color: 'rgba(255,255,255,0.25)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>O Concorrente</div>
              <div className="p-4 text-center" style={{ color: 'rgba(255,68,68,0.5)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>O que oferecem</div>
              <div className="p-4 text-center" style={{ color: '#CDFF00' }}>O que a Pareto entrega</div>
            </div>
            {COMPETITORS.map((c, i) => (
              <div key={c.competitor} className="grid grid-cols-3"
                style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="p-4 text-xs font-bold text-white" style={{ borderRight: '1px solid rgba(255,255,255,0.04)' }}>{c.competitor}</div>
                <div className="p-4 text-xs leading-snug" style={{ color: 'rgba(255,100,100,0.55)', fontWeight: 300, borderRight: '1px solid rgba(255,255,255,0.04)' }}>{c.offer}</div>
                <div className="p-4 text-xs leading-snug" style={{ color: 'rgba(205,255,0,0.7)', fontWeight: 300 }}>{c.advantage}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SEGURANÇA & LGPD ════════════════════════════════════════ */}
      <section className="py-20 relative" style={{ background: 'rgba(10,10,10,0.98)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-12">
            <Tag>Segurança & Governança</Tag>
            <Heading className="text-xl md:text-2xl mb-4">
              IA segura não é diferencial.<br />
              <span style={{ color: '#8800FF' }}>É fundamento inegociável.</span>
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
                <div className="p-6 rounded-2xl h-full" style={{ background: 'rgba(136,0,255,0.06)', border: '1px solid rgba(136,0,255,0.15)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(136,0,255,0.15)', color: '#a855f7' }}>
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
              <span style={{ color: '#CDFF00' }}>capacitados para operar com IA até 2028.</span>
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
                { icon: '⚙️', level: 'Nível Operacional', desc: 'Uso produtivo de ferramentas de IA no dia a dia da função' },
              ].map(l => (
                <div key={l.level} className="p-6 rounded-2xl text-left"
                  style={{ background: 'rgba(14,14,14,0.98)', border: '1px solid rgba(136,0,255,0.12)' }}>
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
      <section className="py-28 relative overflow-hidden" style={{ background: 'rgba(10,10,10,0.98)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(136,0,255,0.12) 0%, transparent 65%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <Heading className="text-2xl md:text-3xl mb-5">
              Pronto para conhecer<br />
              <span style={{ background: 'linear-gradient(90deg,#8800FF,#CDFF00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
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
