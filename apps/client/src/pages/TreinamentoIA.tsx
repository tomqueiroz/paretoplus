import { useEffect } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  Check,
  ClipboardCheck,
  Layers3,
  MessageCircle,
  Presentation,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import { useCalendly } from '@/components/CalendlyModal';

const G900 = '#13100C';
const G800 = '#241F1A';
const G600 = '#4A4540';
const G400 = '#8A8278';
const G200 = '#BFB8AE';
const G100 = '#DDD7CF';
const OFF = '#F8F6F3';
const WHITE = '#FFFFFF';
const LIME = '#CBEC2E';
const LIME_DIM = '#A8C41E';

type Program = {
  number: string;
  title: string;
  audience: string;
  description: string;
  deliverable: string;
  icon: typeof Presentation;
};

const programs: Program[] = [
  {
    number: '01',
    title: 'Palestra executiva',
    audience: 'Convenções, kick-offs e fóruns de liderança',
    description: 'Uma conversa de alto impacto para traduzir IA em decisões de negócio, produtividade, marketing e transformação — sem hype e sem jargão desnecessário.',
    deliverable: 'Keynote sob medida, com exemplos do setor, perguntas-guia e próximos passos para a liderança.',
    icon: Presentation,
  },
  {
    number: '02',
    title: 'Executive briefing',
    audience: 'Conselhos, C-level e comitês de inovação',
    description: 'Sessão confidencial para alinhar linguagem, mapear oportunidades e discutir riscos antes de aprovar uma agenda de IA.',
    deliverable: 'Mapa de decisões, hipóteses de valor e recomendações para a próxima reunião executiva.',
    icon: BrainCircuit,
  },
  {
    number: '03',
    title: 'Workshop corporativo',
    audience: 'Times de marketing, vendas, produto, operações ou RH',
    description: 'Aprendizagem prática usando processos, dados e desafios reais da empresa para criar repertório que seja aplicado no dia seguinte.',
    deliverable: 'Playbook de casos de uso, prompts, fluxos de trabalho e critérios de qualidade por função.',
    icon: Layers3,
  },
  {
    number: '04',
    title: 'Academia de IA aplicada',
    audience: 'Programas de upskilling e universidades corporativas',
    description: 'Jornada modular para desenvolver líderes e equipes com uma trilha comum de estratégia, ferramentas, governança e execução.',
    deliverable: 'Arquitetura de trilha, encontros ao vivo, exercícios aplicados e checkpoints de adoção.',
    icon: Users,
  },
  {
    number: '05',
    title: 'AI Marketing Lab',
    audience: 'CMOs, agências e squads de crescimento',
    description: 'Laboratório para acelerar estratégia, pesquisa, copy, conteúdo, mídia, criativos, CRM, SEO, GEO e mensuração com IA.',
    deliverable: 'Sistema de produção de marketing com templates, prompts, gates de revisão e indicadores.',
    icon: Sparkles,
  },
  {
    number: '06',
    title: 'Mentoria e coaching executivo',
    audience: 'Executivos que precisam decidir e liderar a mudança',
    description: 'Acompanhamento individual e confidencial para conectar IA à agenda do executivo, à carreira e às decisões críticas do negócio.',
    deliverable: 'Plano de desenvolvimento, agenda de experimentos e preparação para decisões de alto impacto.',
    icon: Target,
  },
  {
    number: '07',
    title: 'Sprint de transformação',
    audience: 'Empresas com prioridade concreta e prazo definido',
    description: 'Ciclo intensivo para diagnosticar oportunidades, priorizar casos de uso e criar um roadmap de adoção por área.',
    deliverable: 'Diagnóstico, portfólio priorizado, roadmap 30/60/90 dias e plano de governança.',
    icon: BarChart3,
  },
  {
    number: '08',
    title: 'Programa sob medida',
    audience: 'Empresas parceiras e desafios complexos',
    description: 'Desenho customizado para o contexto, a maturidade, o setor, a agenda e as restrições de cada organização.',
    deliverable: 'Proposta modular com escopo, formato, confidencialidade e condições comerciais para parceiros.',
    icon: ClipboardCheck,
  },
];

const outcomes = [
  'Identificar oportunidades de IA ligadas a crescimento, eficiência, experiência e margem.',
  'Escolher ferramentas e casos de uso com critério, evidência e responsabilidade.',
  'Criar prompts, playbooks e fluxos que equipes consigam repetir e melhorar.',
  'Construir uma roadmap de adoção com donos, métricas, dependências e gates.',
  'Preparar líderes para conduzir mudança, comunicação, governança e experimentação.',
  'Medir produtividade e impacto sem transformar hipótese em promessa de resultado.',
];

const faqs = [
  {
    question: 'Para quem são os treinamentos e mentorias em IA da Pareto Plus?',
    answer: 'Para empresas, executivos e equipes que precisam conectar inteligência artificial a decisões reais de negócio. Atendemos especialmente lideranças de marketing, vendas, produto, operações, RH, inovação e transformação, em jornadas de treinamento, mentoria executiva e aplicação prática.',
  },
  {
    question: 'Qual é a diferença entre uma palestra, um workshop e uma academia corporativa?',
    answer: 'A palestra cria contexto e alinhamento; o workshop transforma um desafio em prática; a academia desenvolve capacidade ao longo de uma jornada modular. O formato é escolhido conforme o objetivo, o público, o tempo e o nível de aplicação desejado.',
  },
  {
    question: 'O programa pode ser personalizado para a minha empresa?',
    answer: 'Sim. O conteúdo pode ser adaptado ao setor, à maturidade, às ferramentas aprovadas, aos processos, aos dados disponíveis e às decisões que a liderança precisa tomar. A personalização é feita sem expor informações confidenciais desnecessárias.',
  },
  {
    question: 'A formação é técnica ou executiva?',
    answer: 'Pode ser executiva, prática ou híbrida. A abordagem começa pelo problema de negócio e adiciona a profundidade técnica necessária para que cada público consiga decidir, aplicar e revisar o uso de IA.',
  },
  {
    question: 'Quais temas podem ser trabalhados em IA aplicada ao marketing?',
    answer: 'Estratégia, posicionamento, pesquisa, copywriting, conteúdo, imagem, vídeo, mídia, CRM, automação, SEO, GEO, AEO, LinkedIn, análise de concorrentes, orçamento, mensuração e governança de marca.',
  },
  {
    question: 'Vocês trabalham de forma presencial, on-line ou híbrida?',
    answer: 'Sim. O desenho pode combinar encontros presenciais, sessões ao vivo on-line, materiais assíncronos e checkpoints de aplicação. O formato final depende da distribuição do público e da agenda da organização.',
  },
  {
    question: 'Como funcionam as condições especiais para empresas parceiras?',
    answer: 'Empresas parceiras podem receber condições comerciais diferenciadas, sujeitas a escopo, volume, calendário e disponibilidade. O desconto não é automático nem cumulativo; ele é definido na proposta após a conversa de qualificação.',
  },
  {
    question: 'O que acontece depois do primeiro contato?',
    answer: 'Fazemos uma conversa de qualificação para entender objetivo, público, urgência, contexto e formato. Em seguida, enviamos uma recomendação de desenho — ou indicamos que outro caminho é mais adequado.',
  },
];

const whatsappUrl = 'https://wa.me/5511915513210?text=Ol%C3%A1!%20Quero%20conversar%20sobre%20treinamento%20de%20IA%20aplicada%20a%20neg%C3%B3cios%20ou%20marketing.';
const pageUrl = 'https://pareto.business/#/treinamento-ia-negocios-marketing';
const pageTitle = 'Treinamentos e Mentorias em IA para Negócios e Marketing | Pareto Plus';
const description = 'Treinamentos e mentorias em IA aplicada a negócios e marketing para empresas e executivos no Brasil, com palestras, workshops, coaching executivo, academias corporativas e programas sob medida conduzidos pelo Prof. Me. Wellington Queiroz, professor, palestrante profissional e CEO / Head of AI Marketing da Pareto Plus.';

function scrollToContact() {
  document.getElementById('treinamento-ia-contato')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function TreinamentoIA() {
  const { open: openCalendly } = useCalendly();

  useEffect(() => {
    const previousTitle = document.title;
    const selectors = [
      { selector: 'meta[name="description"]', attrs: { name: 'description' }, content: description },
      {
        selector: 'meta[name="keywords"]',
        attrs: { name: 'keywords' },
        content: 'treinamentos e mentorias em IA, treinamento de IA para empresas, mentoria executiva em IA, mentoria de IA aplicada ao marketing, IA aplicada aos negócios, IA aplicada ao marketing, palestra de IA no Brasil, coaching executivo de IA, workshop corporativo de IA, academia corporativa de IA, educação executiva em IA, treinamento in-company, AI marketing Brazil, Wellington Queiroz, Pareto Plus',
      },
      { selector: 'meta[name="author"]', attrs: { name: 'author' }, content: 'Prof. Me. Wellington Queiroz — CEO / Head of AI Marketing, Pareto Plus' },
      { selector: 'meta[name="robots"]', attrs: { name: 'robots' }, content: 'index, follow, max-image-preview:large' },
      { selector: 'meta[property="og:title"]', attrs: { property: 'og:title' }, content: pageTitle },
      { selector: 'meta[property="og:description"]', attrs: { property: 'og:description' }, content: description },
      { selector: 'meta[property="og:url"]', attrs: { property: 'og:url' }, content: pageUrl },
      { selector: 'meta[property="og:type"]', attrs: { property: 'og:type' }, content: 'website' },
      { selector: 'meta[property="og:image"]', attrs: { property: 'og:image' }, content: 'https://pareto.business/images/og-pareto-plus.jpg' },
      { selector: 'meta[name="twitter:title"]', attrs: { name: 'twitter:title' }, content: pageTitle },
      { selector: 'meta[name="twitter:description"]', attrs: { name: 'twitter:description' }, content: description },
      { selector: 'meta[name="twitter:image"]', attrs: { name: 'twitter:image' }, content: 'https://pareto.business/images/og-pareto-plus.jpg' },
    ];
    const previousMeta = new Map<string, { element: HTMLMetaElement | null; content: string | null }>();
    selectors.forEach(({ selector, attrs, content }) => {
      const current = document.head.querySelector<HTMLMetaElement>(selector);
      previousMeta.set(selector, { element: current, content: current?.getAttribute('content') ?? null });
      const element = current ?? document.createElement('meta');
      Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
      element.setAttribute('content', content);
      if (!current) document.head.appendChild(element);
    });

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const canonicalBefore = canonical?.getAttribute('href') ?? null;
    if (canonical) canonical.href = pageUrl;

    const structuredData = document.getElementById('site-structured-data');
    const structuredBefore = structuredData?.textContent ?? null;
    if (structuredData) {
      structuredData.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': 'https://pareto.business/#organization',
            name: 'Pareto Plus',
            url: 'https://pareto.business/',
            description: 'IA aplicada ao marketing e implementação de inteligência artificial para negócios no Brasil.',
            areaServed: { '@type': 'Country', name: 'Brazil' },
          },
          {
            '@type': 'Person',
            '@id': `${pageUrl}#author`,
            name: 'Prof. Me. Wellington Queiroz',
            jobTitle: 'CEO / Head of AI Marketing',
            description: 'Professor e palestrante profissional especializado em IA aplicada a negócios e marketing no Brasil.',
            worksFor: { '@id': 'https://pareto.business/#organization' },
            knowsAbout: ['AI Applied to Business', 'AI Applied to Marketing', 'Prompt Engineering', 'Executive Education', 'GEO', 'SEO', 'AEO'],
            knowsLanguage: ['pt-BR', 'en-US'],
          },
          {
            '@type': 'Service',
            '@id': `${pageUrl}#service`,
            name: 'Treinamentos e mentorias em IA aplicada a negócios e marketing',
            url: pageUrl,
            provider: { '@id': 'https://pareto.business/#organization' },
            serviceType: [
              'Treinamentos corporativos de IA',
              'Mentorias executivas em IA',
              'Mentoria de IA aplicada ao marketing',
              'Corporate AI training',
              'Executive coaching',
              'AI marketing workshop',
              'Executive keynote',
            ],
            description,
            areaServed: { '@type': 'Country', name: 'Brazil' },
            audience: [
              { '@type': 'BusinessAudience', audienceType: 'Empresas e times corporativos' },
              { '@type': 'BusinessAudience', audienceType: 'Executivos e líderes seniores' },
            ],
            availableLanguage: ['pt-BR', 'en-US'],
          },
          {
            '@type': 'FAQPage',
            '@id': `${pageUrl}#faq`,
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          },
        ],
      }).replace(/</g, '\\u003c');
    }

    document.title = pageTitle;
    return () => {
      document.title = previousTitle;
      previousMeta.forEach(({ element, content }, selector) => {
        if (element && content !== null) element.setAttribute('content', content);
        else if (element && content === null) element.removeAttribute('content');
        else document.head.querySelector(selector)?.remove();
      });
      if (canonical && canonicalBefore !== null) canonical.href = canonicalBefore;
      if (structuredData && structuredBefore !== null) structuredData.textContent = structuredBefore;
    };
  }, []);

  return (
    <main className="training-page" style={{ background: OFF, color: G900, minHeight: '100vh', paddingTop: 56 }}>
      <style>{`
        .training-shell { width: min(1180px, calc(100% - 48px)); margin: 0 auto; }
        .training-eyebrow { display: inline-block; font: 500 11px/1.2 'DM Sans', sans-serif; letter-spacing: .22em; text-transform: uppercase; color: ${LIME_DIM}; }
        .training-hero { position: relative; overflow: hidden; background: ${G900}; color: ${WHITE}; padding: clamp(28px, 3.2vw, 48px) 0 18px; }
        .training-hero-grid { display: grid; grid-template-columns: minmax(0, 1.12fr) minmax(300px, .88fr); gap: clamp(28px, 5vw, 70px); align-items: center; }
        .training-hero h1 { max-width: 760px; margin: 14px 0 18px; font: 700 clamp(42px, 6.5vw, 82px)/.98 'Playfair Display', Georgia, serif; letter-spacing: -.045em; }
        .training-hero h1 em { color: ${LIME}; font-style: italic; }
        .training-hero p { max-width: 660px; margin: 0; color: rgba(255,255,255,.72); font: 300 clamp(17px, 2vw, 21px)/1.6 'DM Sans', sans-serif; }
        .training-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
        .training-button { display: inline-flex; align-items: center; gap: 9px; border-radius: 3px; padding: 14px 20px; border: 1px solid ${LIME}; background: ${LIME}; color: ${G900}; font: 500 12px/1.2 'DM Sans', sans-serif; letter-spacing: .08em; text-transform: uppercase; text-decoration: none; cursor: pointer; transition: transform .2s ease, box-shadow .2s ease, background .2s ease; }
        .training-button:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(203,236,46,.2); }
        .training-button.secondary { background: transparent; color: ${WHITE}; border-color: rgba(255,255,255,.28); }
        .training-hero-note { display: flex; gap: 12px; align-items: flex-start; margin-top: 20px; color: rgba(255,255,255,.52); font: 300 13px/1.55 'DM Sans', sans-serif; }
        .training-hero-note svg { flex: 0 0 auto; color: ${LIME}; margin-top: 2px; }
        .training-hero-visual { position: relative; min-height: 360px; }
        .training-hero-visual img { width: 100%; height: 360px; object-fit: cover; border: 1px solid rgba(255,255,255,.14); filter: saturate(.82) contrast(1.04); }
        .training-hero-visual::after { content: ''; position: absolute; inset: 18px -18px -18px 18px; border: 1px solid rgba(203,236,46,.38); pointer-events: none; }
        .training-visual-label { position: absolute; left: -18px; bottom: 24px; max-width: 230px; padding: 15px 17px; background: ${LIME}; color: ${G900}; font: 500 12px/1.35 'DM Sans', sans-serif; text-transform: uppercase; letter-spacing: .08em; }
        .training-section { padding: 92px 0; }
        .training-section.dark { background: ${G900}; color: ${WHITE}; }
        .training-section.soft { background: ${OFF}; }
        .training-section-head { display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr); gap: 50px; align-items: end; margin-bottom: 42px; }
        .training-section h2 { max-width: 760px; margin: 13px 0 0; font: 700 clamp(34px, 4.6vw, 58px)/1.04 'Playfair Display', Georgia, serif; letter-spacing: -.04em; }
        .training-section-head p { max-width: 540px; margin: 0; color: ${G600}; font: 300 17px/1.7 'DM Sans', sans-serif; }
        .training-section.dark .training-section-head p { color: rgba(255,255,255,.68); }
        .training-stat-band { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: ${G100}; border: 1px solid ${G100}; margin-top: 58px; }
        .training-stat { background: ${WHITE}; padding: 23px 22px; }
        .training-stat strong { display: block; color: ${G900}; font: 700 30px/1 'Playfair Display', Georgia, serif; }
        .training-stat span { display: block; margin-top: 9px; color: ${G600}; font: 300 12px/1.45 'DM Sans', sans-serif; }
        .training-program-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
        .training-program { position: relative; display: flex; flex-direction: column; min-height: 300px; padding: 28px; background: ${WHITE}; border: 1px solid ${G100}; transition: transform .22s ease, border-color .22s ease, box-shadow .22s ease; }
        .training-program:hover { transform: translateY(-4px); border-color: ${G200}; box-shadow: 0 16px 36px rgba(19,16,12,.08); }
        .training-program-top { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .training-program-number { color: ${LIME_DIM}; font: 600 12px/1 'JetBrains Mono', monospace; letter-spacing: .12em; }
        .training-program-icon { width: 42px; height: 42px; display: grid; place-items: center; color: ${G900}; background: ${LIME}; border-radius: 50%; }
        .training-program h3 { margin: 30px 0 8px; font: 700 25px/1.1 'Playfair Display', Georgia, serif; }
        .training-program-audience { margin: 0 0 14px; color: ${LIME_DIM}; font: 500 11px/1.45 'DM Sans', sans-serif; letter-spacing: .08em; text-transform: uppercase; }
        .training-program p { margin: 0; color: ${G600}; font: 300 15px/1.65 'DM Sans', sans-serif; }
        .training-program-deliverable { display: flex; gap: 8px; margin-top: auto; padding-top: 22px; color: ${G900}; font: 500 13px/1.5 'DM Sans', sans-serif; }
        .training-program-deliverable svg { flex: 0 0 auto; color: ${LIME_DIM}; margin-top: 3px; }
        .training-outcome-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1px; background: rgba(255,255,255,.12); margin-top: 42px; }
        .training-outcome { display: flex; gap: 14px; padding: 24px; background: rgba(255,255,255,.04); color: rgba(255,255,255,.8); font: 300 15px/1.6 'DM Sans', sans-serif; }
        .training-outcome svg { flex: 0 0 auto; color: ${LIME}; margin-top: 3px; }
        .training-method-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1px; background: ${G100}; margin-top: 42px; }
        .training-method { min-height: 220px; padding: 22px; background: ${WHITE}; border-top: 3px solid transparent; }
        .training-method:hover { border-top-color: ${LIME}; }
        .training-method b { color: ${LIME_DIM}; font: 600 12px/1 'JetBrains Mono', monospace; }
        .training-method h3 { margin: 32px 0 10px; font: 700 22px/1.1 'Playfair Display', Georgia, serif; }
        .training-method p { margin: 0; color: ${G600}; font: 300 14px/1.6 'DM Sans', sans-serif; }
        .training-author { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, .9fr); gap: 54px; align-items: center; }
        .training-author-photo { min-height: 360px; background: ${G800}; }
        .training-author-photo img { display: block; width: 100%; height: 360px; object-fit: cover; opacity: .96; }
        .training-author h2 { color: ${WHITE}; }
        .training-author p { color: rgba(255,255,255,.7); font: 300 16px/1.75 'DM Sans', sans-serif; }
        .training-author-list { display: grid; gap: 13px; margin: 28px 0 0; padding: 0; list-style: none; }
        .training-author-list li { display: flex; gap: 10px; color: rgba(255,255,255,.78); font: 300 14px/1.5 'DM Sans', sans-serif; }
        .training-author-list svg { flex: 0 0 auto; color: ${LIME}; margin-top: 2px; }
        .training-faq-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 42px; }
        .training-faq { padding: 22px 24px; background: ${WHITE}; border: 1px solid ${G100}; }
        .training-faq summary { cursor: pointer; color: ${G900}; font: 600 16px/1.4 'DM Sans', sans-serif; list-style: none; }
        .training-faq summary::-webkit-details-marker { display: none; }
        .training-faq summary::after { content: '+'; float: right; color: ${LIME_DIM}; font: 500 22px/1 'DM Sans', sans-serif; }
        .training-faq[open] summary::after { content: '−'; }
        .training-faq p { margin: 15px 28px 0 0; color: ${G600}; font: 300 14px/1.65 'DM Sans', sans-serif; }
        .training-contact { background: ${LIME}; color: ${G900}; padding: 82px 0; }
        .training-contact-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(280px, .72fr); gap: 60px; align-items: end; }
        .training-contact h2 { max-width: 740px; margin: 15px 0 16px; font: 700 clamp(36px, 5vw, 64px)/1.02 'Playfair Display', Georgia, serif; letter-spacing: -.04em; }
        .training-contact p { max-width: 600px; margin: 0; font: 300 17px/1.7 'DM Sans', sans-serif; }
        .training-contact-card { padding: 25px; background: rgba(19,16,12,.94); color: ${WHITE}; }
        .training-contact-card span { display: block; color: ${LIME}; font: 500 11px/1.2 'DM Sans', sans-serif; letter-spacing: .17em; text-transform: uppercase; }
        .training-contact-card a { display: block; margin-top: 14px; color: ${WHITE}; font: 400 16px/1.4 'DM Sans', sans-serif; text-decoration: none; }
        .training-contact-card a:hover { color: ${LIME}; }
        @media (max-width: 820px) {
          .training-shell { width: min(100% - 32px, 680px); }
          .training-hero-grid, .training-section-head, .training-author, .training-contact-grid { grid-template-columns: 1fr; }
          .training-hero-visual { min-height: 300px; }
          .training-hero-visual img { height: 300px; }
          .training-hero-visual::after { inset: 12px -10px -10px 12px; }
          .training-visual-label { left: 12px; bottom: 14px; }
          .training-stat-band, .training-program-grid, .training-outcome-grid, .training-faq-grid { grid-template-columns: 1fr; }
          .training-method-grid { grid-template-columns: repeat(2, 1fr); }
          .training-section { padding: 68px 0; }
        }
        @media (max-width: 520px) {
          .training-actions { flex-direction: column; align-items: stretch; }
          .training-button { justify-content: center; }
          .training-method-grid { grid-template-columns: 1fr; }
          .training-program { min-height: auto; }
        }
        @media print {
          .training-hero { padding: 24px 0; background: white !important; color: ${G900}; }
          .training-hero h1, .training-hero p, .training-hero-note { color: ${G900} !important; }
          .training-hero-visual, .training-actions, .training-contact-card { display: none; }
          .training-section.dark, .training-contact { background: white !important; color: ${G900}; }
          .training-section.dark .training-section-head p, .training-author p, .training-author-list li { color: ${G600}; }
          .training-program, .training-faq, .training-stat, .training-method { box-shadow: none; break-inside: avoid; }
        }
      `}</style>

      <section className="training-hero">
        <div className="training-shell training-hero-grid">
          <div>
            <span className="training-eyebrow">TREINAMENTOS E MENTORIAS EM IA · COACHING · PALESTRAS</span>
            <h1>Treinamentos e mentorias em IA para empresas que precisam <em>transformar decisão em capacidade.</em></h1>
            <p>Programas sob medida de AI Applied to Business e AI Applied to Marketing para executivos, líderes e times que querem aprender com contexto — e aplicar com responsabilidade, governança e impacto mensurável.</p>
            <div className="training-actions">
              <button className="training-button" type="button" onClick={scrollToContact}>Desenhar meu programa <ArrowRight size={16} /></button>
              <a className="training-button secondary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Falar no WhatsApp <MessageCircle size={16} /></a>
            </div>
            <div className="training-hero-note"><ShieldCheck size={16} /><span>Conteúdo adaptado ao negócio, com confidencialidade, linguagem executiva e aplicação prática. Condições especiais podem ser avaliadas para empresas parceiras.</span></div>
          </div>
          <figure className="training-hero-visual" style={{ margin: 0 }}>
            <img data-image-slot="training-ia.hero.executive" src="/images/exec_ai.jpg" alt="Executivo analisando uma interface de inteligência artificial para decisões de negócio" width="640" height="450" />
            <figcaption className="training-visual-label">A agenda de IA começa com uma decisão clara.</figcaption>
          </figure>
        </div>
      </section>

      <section className="training-section soft">
        <div className="training-shell">
          <div className="training-section-head">
            <div><span className="training-eyebrow">PARA QUEM DECIDE</span><h2>Não é um curso genérico. É uma jornada de treinamento e mentoria conectada ao seu mandato.</h2></div>
            <p>O mesmo tema pode exigir uma palestra para a diretoria, um laboratório para o marketing, uma academia corporativa ou uma mentoria executiva individual. Começamos pelo resultado que precisa mudar.</p>
          </div>
          <div className="training-stat-band">
            <div className="training-stat"><strong>Executivos</strong><span>C-level, diretores, fundadores e líderes em transição.</span></div>
            <div className="training-stat"><strong>Times</strong><span>Marketing, vendas, produto, operações, RH e inovação.</span></div>
            <div className="training-stat"><strong>Formatos</strong><span>Presencial, ao vivo on-line, híbrido ou modular.</span></div>
            <div className="training-stat"><strong>Foco</strong><span>Decidir, aplicar, medir e escalar com critério.</span></div>
          </div>
        </div>
      </section>

      <section className="training-section">
        <div className="training-shell">
          <div className="training-section-head">
            <div><span className="training-eyebrow">ARQUITETURA DE PROGRAMAS</span><h2>Escolha o ponto de entrada. A profundidade acompanha o desafio.</h2></div>
            <p>Os formatos abaixo são referências de desenho. Escopo, agenda, número de participantes e materiais são definidos após a conversa de qualificação.</p>
          </div>
          <div className="training-program-grid">
            {programs.map((program) => {
              const Icon = program.icon;
              return (
                <article className="training-program" key={program.number}>
                  <div className="training-program-top"><span className="training-program-number">{program.number}</span><span className="training-program-icon"><Icon size={20} /></span></div>
                  <h3>{program.title}</h3>
                  <p className="training-program-audience">{program.audience}</p>
                  <p>{program.description}</p>
                  <div className="training-program-deliverable"><Check size={16} /><span>{program.deliverable}</span></div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="training-section dark">
        <div className="training-shell">
          <div className="training-section-head">
            <div><span className="training-eyebrow">O QUE A EMPRESA LEVA</span><h2>Fluência para agir — não apenas repertório para conversar.</h2></div>
            <p>O objetivo é sair com decisões melhores, linguagem comum, práticas reutilizáveis e um próximo movimento que possa ser acompanhado.</p>
          </div>
          <div className="training-outcome-grid">
            {outcomes.map((outcome) => <div className="training-outcome" key={outcome}><Check size={17} /><span>{outcome}</span></div>)}
          </div>
        </div>
      </section>

      <section className="training-section soft">
        <div className="training-shell">
          <div className="training-section-head">
            <div><span className="training-eyebrow">MÉTODO DE APLICAÇÃO</span><h2>Da pergunta certa ao hábito que permanece.</h2></div>
            <p>Uma sequência simples para conectar estratégia, pessoas, processos, dados, ferramentas e governança.</p>
          </div>
          <div className="training-method-grid">
            {[
              ['01', 'Diagnosticar', 'Entender contexto, objetivo, maturidade, restrições e sinais de valor.'],
              ['02', 'Priorizar', 'Escolher os casos de uso e públicos que merecem foco primeiro.'],
              ['03', 'Praticar', 'Aplicar em problemas reais com templates, prompts e revisão humana.'],
              ['04', 'Medir', 'Definir indicadores, evidências, riscos e critérios de parada.'],
              ['05', 'Escalar', 'Transferir capacidade, governança e cadência para a organização.'],
            ].map(([number, title, text]) => <article className="training-method" key={number}><b>{number}</b><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="training-section dark">
        <div className="training-shell training-author">
          <div className="training-author-photo">
            <img data-image-slot="training-ia.author.wellington" src="/images/speaking/tom-speaking-11.png" alt="Prof. Me. Wellington Queiroz conduzindo uma palestra executiva sobre inteligência artificial" width="640" height="360" loading="lazy" />
          </div>
          <div>
            <span className="training-eyebrow">AUTORIA E CONDUÇÃO</span>
            <h2>Prof. Me. Wellington Queiroz</h2>
            <p>Professor, palestrante profissional e CEO / Head of AI Marketing da Pareto Plus. Sua abordagem conecta repertório acadêmico, marketing, negócios e produção aplicada para ajudar empresas brasileiras a transformar IA em uma capacidade de decisão e execução.</p>
            <ul className="training-author-list">
              <li><Check size={16} /> Linguagem executiva com aplicação por função e contexto.</li>
              <li><Check size={16} /> Experiência editorial em IA aplicada ao marketing e à produtividade.</li>
              <li><Check size={16} /> Conteúdo em português do Brasil, com prompts e frameworks reutilizáveis.</li>
              <li><Check size={16} /> Posicionamento independente: sem alegar vínculo, certificação ou endosso de terceiros.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="training-section soft">
        <div className="training-shell">
          <div className="training-section-head">
            <div><span className="training-eyebrow">PERGUNTAS FREQUENTES</span><h2>O que você precisa saber antes de contratar treinamentos e mentorias em IA.</h2></div>
            <p>Respostas objetivas para facilitar a decisão de RH, universidade corporativa, marketing ou liderança.</p>
          </div>
          <div className="training-faq-grid">
            {faqs.map((faq) => <details className="training-faq" key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="training-contact" id="treinamento-ia-contato">
        <div className="training-shell training-contact-grid">
          <div>
            <span className="training-eyebrow" style={{ color: G900 }}>PRÓXIMO PASSO</span>
            <h2>Vamos desenhar a formação que a sua agenda pede?</h2>
            <p>Conte o público, o desafio, o prazo e o formato imaginado. A primeira conversa serve para qualificar o contexto e indicar a melhor combinação entre palestra, workshop, academia, coaching ou sprint.</p>
            <div className="training-actions">
              <button className="training-button" type="button" onClick={openCalendly} style={{ background: G900, borderColor: G900, color: LIME }}>Agendar conversa de 30 min <ArrowUpRight size={16} /></button>
              <button className="training-button" type="button" onClick={scrollToContact} style={{ background: 'transparent', borderColor: G900, color: G900 }}>Ver contatos <ArrowRight size={16} /></button>
            </div>
          </div>
          <div className="training-contact-card">
            <span>Fale diretamente</span>
            <a href="mailto:tom.queiroz@pareto.plus">tom.queiroz@pareto.plus</a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp +55 11 91551-3210</a>
            <small style={{ display: 'block', marginTop: 18, color: 'rgba(255,255,255,.62)', font: '300 12px/1.5 DM Sans, sans-serif' }}>Condições especiais para empresas parceiras são avaliadas caso a caso, conforme escopo e disponibilidade.</small>
          </div>
        </div>
      </section>
    </main>
  );
}
