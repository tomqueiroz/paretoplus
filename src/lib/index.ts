// ─── Route Paths ────────────────────────────────────────────────────────────
export const ROUTE_PATHS = {
  HOME: '/',
  SOBRE: '/sobre',
  PRIVACIDADE: '/privacidade',
} as const;

// ─── Types ───────────────────────────────────────────────────────────────────
export interface ServiceModel {
  id: string;
  name: string;
  badge: string;
  price: string;
  period: string;
  target: string;
  commitment: string;
  description: string;
  features: string[];
  cta: string;
  highlight: boolean;
}

export interface CaseResult {
  sector: string;
  client: string;
  metric: string;
  value: string;
  description: string;
  sign: '+' | '-';
  tags: string[];
}

export interface Award {
  title: string;
  org: string;
  year: string;
  highlight?: boolean;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface PartnerBadge {
  name: string;
  icon: string;
  color: string;
}

export interface ClientLogo {
  name: string;
  type: 'text' | 'image';
}

// ─── Contact ─────────────────────────────────────────────────────────────────
export const WHATSAPP_NUMBER = '5521998514094';
export const WHATSAPP_MESSAGE = encodeURIComponent('Olá! Vi o site da Pareto Plus e quero falar com um especialista sobre implementação de IA na minha empresa. Faturamento acima de R$1M/ano.');
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
export const CALENDLY_URL = 'https://calendly.com/pareto-ai/diagnostico-30min';

// ─── Key Stats (verified from pitch decks) ───────────────────────────────────
export const KEY_STATS = [
  { value: 13, suffix: '+', label: 'Anos no mercado brasileiro', prefix: '' },
  { value: 16, suffix: '', label: 'Prêmios globais Google Awards NY', prefix: '' },
  { value: 300, suffix: '+', label: 'Empresas atendidas', prefix: '' },
  { value: 500, suffix: '+', label: 'Projetos de IA entregues', prefix: '' },
  { value: 3, suffix: 'B+', label: 'Em mídia paga gerenciada', prefix: 'R$' },
  { value: 2, suffix: 'M+', label: 'Usuários Tess AI', prefix: '' },
  { value: 160, suffix: '+', label: 'Especialistas em IA', prefix: '' },
  { value: 6, suffix: 'º', label: 'Melhor IA do mundo G2 2024', prefix: '#' },
];

// ─── Partner Badges ──────────────────────────────────────────────────────────
export const PARTNER_BADGES: PartnerBadge[] = [
  { name: 'Google Premier Partner 2025', icon: 'G', color: '#4285F4' },
  { name: 'Meta Business Partner', icon: 'M', color: '#0866FF' },
  { name: 'TikTok Ads Business Partner', icon: 'T', color: '#ff0050' },
  { name: 'LinkedIn Marketing Partner', icon: 'in', color: '#0A66C2' },
  { name: 'Google AI for Startups', icon: 'G✦', color: '#34A853' },
];

// ─── Awards ──────────────────────────────────────────────────────────────────
export const AWARDS: Award[] = [
  { title: 'International Growth Award', org: 'Google Awards NY', year: '2022', highlight: true },
  { title: 'App Growth Award', org: 'Google Awards NY', year: '2022', highlight: true },
  { title: 'Empresa Mais Premiada do Mundo', org: 'Google Awards 2022', year: '2022', highlight: true },
  { title: '#6 Melhor Produto de IA Global', org: 'G2 Best Software Awards', year: '2024', highlight: true },
  { title: '#1 Global AI Image Product', org: 'G2 Rankings', year: '2024' },
  { title: 'Global AI Product Leader', org: 'G2', year: '2024' },
  { title: 'High Performer — Winter 2024', org: 'G2', year: '2024' },
  { title: 'Leader — Winter 2024', org: 'G2', year: '2024' },
  { title: 'Leader Small Business — Winter 2024', org: 'G2', year: '2024' },
  { title: 'Top 50 Best Software Awards', org: 'G2', year: '2024' },
  { title: 'Invested by Google AI for Startups', org: 'Google', year: '2024' },
];

// ─── Client Logos ────────────────────────────────────────────────────────────
export const CLIENT_LOGOS: ClientLogo[] = [
  { name: 'Netflix', type: 'text' },
  { name: 'PepsiCo', type: 'text' },
  { name: 'Samsung', type: 'text' },
  { name: 'Shopify', type: 'text' },
  { name: 'Nvidia', type: 'text' },
  { name: 'Amazon', type: 'text' },
  { name: 'Puma', type: 'text' },
  { name: 'Spotify', type: 'text' },
  { name: 'Coinbase', type: 'text' },
  { name: 'Stone', type: 'text' },
  { name: 'Porto Seguro', type: 'text' },
  { name: 'Multiplan', type: 'text' },
  { name: 'RE/MAX', type: 'text' },
  { name: 'Hering', type: 'text' },
  { name: 'Universal Music', type: 'text' },
  { name: 'Greenpeace', type: 'text' },
  { name: 'WMcCann', type: 'text' },
  { name: 'Grupo Salta', type: 'text' },
];

// ─── Real Cases ──────────────────────────────────────────────────────────────
export const CASES: CaseResult[] = [
  {
    sector: 'Moda & Fashion',
    client: 'Cliente Fashion',
    metric: 'redução nos custos de fotografia por coleção',
    value: '49',
    sign: '-',
    description: 'IA generativa substituiu sessões de estúdio com imagens de alta qualidade geradas em minutos.',
    tags: ['AI Design', 'Geração de Imagem'],
  },
  {
    sector: 'E-commerce',
    client: 'Plataforma E-com',
    metric: 'aumento no ticket médio',
    value: '70',
    sign: '+',
    description: 'Agentes de IA personalizam jornada do cliente e reduzem abandono de carrinho em -30%.',
    tags: ['AI Workers', 'Personalização'],
  },
  {
    sector: 'Varejo',
    client: 'Rede Varejo',
    metric: 'redução nos custos de catálogo digital',
    value: '90',
    sign: '-',
    description: 'Automação completa da produção de catálogo com IA generativa — de semanas para horas.',
    tags: ['Automação', 'AI Ads'],
  },
  {
    sector: 'Imobiliário',
    client: 'RE/MAX',
    metric: 'aumento no uso do app',
    value: '31',
    sign: '+',
    description: 'Redução de 10% no custo por install com IA preditiva em campanhas de performance.',
    tags: ['AI Ads', 'Performance'],
  },
  {
    sector: 'Farmacêutico',
    client: 'Grupo Prafarma',
    metric: 'especialistas Pareto alocados otimizando custos',
    value: '5',
    sign: '+',
    description: 'Agentes de IA, automações e RPAs que reduziram custo operacional em larga escala.',
    tags: ['AI Workers', 'RPA', 'Alocação'],
  },
  {
    sector: 'Entretenimento',
    client: 'Universal Music',
    metric: 'processos internos automatizados',
    value: '100',
    sign: '+',
    description: 'Agentes inteligentes integrados para automatizar fluxos operacionais e reduzir trabalho manual.',
    tags: ['Agentes de IA', 'Automação'],
  },
];

// ─── Tess AI Models ──────────────────────────────────────────────────────────
export const TESS_MODELS = [
  'GPT-4o', 'Claude 3.5 Sonnet', 'Gemini 1.5 Pro', 'Gemini 1.5 Flash',
  'Claude 3 Opus', 'Llama 3', 'Midjourney', 'DALL-E 3', 'Runway',
  'ElevenLabs', 'Deepgram', 'Stability AI', 'Cohere', 'Ideogram',
];

// ─── Timeline ────────────────────────────────────────────────────────────────
export const TIMELINE: TimelineItem[] = [
  { year: '2011', title: 'Fundação da Pareto', description: 'Nascemos em São Paulo com foco em performance marketing inteligente.' },
  { year: '2013', title: 'Expansão Nacional', description: 'Primeiras parcerias com grandes marcas brasileiras. Metodologia proprietária de marketing.' },
  { year: '2018', title: 'Google Premier Partner', description: 'Reconhecimento como parceiro de primeira linha do Google no Brasil.' },
  { year: '2020', title: 'Lançamento Tess AI v1', description: 'Criação da primeira versão da plataforma de IA proprietária da Pareto.' },
  { year: '2022', title: '16 Prêmios Google Awards NY', description: 'Empresa Mais Premiada do Mundo no Google Awards. International Growth + App Growth Awards.' },
  { year: '2023', title: 'Tess AI atinge 1M usuários', description: '+200 modelos de IA, AI Steps, Brand Voice e AI Studio lançados.' },
  { year: '2024', title: '#6 Melhor IA do Mundo — G2', description: 'G2 Best Software Awards: Tess AI supera ChatGPT (#10), Google Gemini (#22), IBM Watson (#28).' },
  { year: '2025', title: '$5M Seed Round · Google AI for Startups', description: 'Hi Ventures lidera rodada. Investimento do Google AI for Startups. Pareto Plus lançado para PMEs R$1M+.' },
  { year: '2026', title: '300+ empresas · 160+ especialistas', description: 'Expansão para PMEs com faturamento R$1M+. Parceria estratégica de IA para o mercado brasileiro.' },
];

// ─── Service Models ──────────────────────────────────────────────────────────
export const SERVICE_MODELS: ServiceModel[] = [
  {
    id: 'model-c',
    name: 'Sprint de Aceleração IA',
    badge: 'PORTA DE ENTRADA',
    price: 'R$ 4.500',
    period: 'pagamento único',
    target: 'Empresas R$1M–R$20M',
    commitment: 'Entrega em 21 dias',
    description: 'Em 21 dias, identificamos onde você está perdendo receita e implementamos as 3 primeiras vitórias de IA. Clareza total, sem enrolação.',
    features: [
      'Diagnóstico de Vazamento de Receita',
      'Auditoria completa de IA',
      '3 quick wins implementados',
      'Roadmap completo para o Modelo A',
      '55%+ converte para parceria em 30 dias',
    ],
    cta: 'Começar o Sprint',
    highlight: false,
  },
  {
    id: 'model-a',
    name: 'Parceria Estratégica de Marketing IA',
    badge: 'MAIS ESCOLHIDO',
    price: 'R$ 3.900 – R$ 6.500',
    period: '/mês · mínimo 6 meses',
    target: 'Empresas R$1M–R$10M',
    commitment: 'Stack completo customizado',
    description: 'A milky cow. Construímos e gerenciamos seu stack completo de marketing com IA — customizado, em constante aprendizado, focado em receita.',
    features: [
      'Stack completo de marketing IA customizado',
      'Licença Tess AI incluída (+200 modelos)',
      'Motor de conteúdo com IA (10× volume)',
      'Qualificação de leads por IA (2 min response)',
      'Gestão de performance Meta + Google + TikTok',
      'Relatório executivo semanal',
      'Review estratégica mensal com especialista',
    ],
    cta: 'Quero essa Parceria',
    highlight: true,
  },
  {
    id: 'model-b',
    name: 'Transformação IA + Consultoria',
    badge: 'PREMIUM',
    price: 'R$ 8.500 – R$ 18.000',
    period: '/mês · parceria de 12 meses',
    target: 'Empresas R$5M–R$20M',
    commitment: '+ R$12.000–R$35.000 setup estratégico',
    description: 'Para líderes que constroem a vantagem de 2028 agora. Tudo do Modelo A mais consultoria C-suite e BI proprietário.',
    features: [
      'Tudo do Modelo A',
      'Consultoria estratégica C-suite',
      'Dashboard de Business Intelligence customizado',
      'Monitoramento de concorrentes por IA',
      'Redesign completo da arquitetura MarTech',
      'Briefing Trimestral Nova Era (inteligência setorial)',
      'Acesso direto ao time sênior Pareto',
    ],
    cta: 'Falar com Especialista',
    highlight: false,
  },
];

// ─── Competitors ─────────────────────────────────────────────────────────────
export const COMPETITORS = [
  { competitor: 'Agências Digitais', offer: 'Campanhas padronizadas, execução manual', advantage: 'IA customizada, 10× mais output, inteligência que compõe mês a mês' },
  { competitor: 'Consultorias Tradicionais', offer: 'Decks de estratégia, sem execução', advantage: 'Estratégia + construção de IA + execução contínua, tudo integrado' },
  { competitor: 'Freelancers de IA', offer: 'Sem plataforma proprietária, sem escala', advantage: 'Tess AI (#6 global G2 2024) + entrega estruturada em sprints' },
  { competitor: 'Ferramentas DIY (ChatGPT etc.)', offer: 'Genérico, sem integração, sem gestão', advantage: 'Configuração específica + gestão especializada + 160+ especialistas' },
  { competitor: 'Agências Internacionais', offer: 'Sem profundidade no mercado local', advantage: '13 anos de inteligência de mercado brasileiro + 300+ empresas atendidas' },
];

// ─── Utils ───────────────────────────────────────────────────────────────────
export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
