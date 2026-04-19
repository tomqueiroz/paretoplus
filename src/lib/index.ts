// ─── Route Paths ─────────────────────────────────────────────────────────────
export const ROUTE_PATHS = {
  HOME: '/',
  SOBRE: '/sobre',
  PRIVACIDADE: '/privacidade',
} as const;

// ─── Types ────────────────────────────────────────────────────────────────────
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
  img?: string;
}
export interface ClientLogo {
  name: string;
  type: 'text' | 'image';
  src?: string;
}
export interface AIModel {
  name: string;
  category: string;
}
export interface Pillar {
  icon: string;
  title: string;
  body: string;
}
export interface VerticalCard {
  id: string;
  label: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  color: string;
  stats: { value: string; label: string }[];
}

// ─── Contact ──────────────────────────────────────────────────────────────────
export const WHATSAPP_NUMBER  = '5511915513210';
export const WHATSAPP_MESSAGE = encodeURIComponent('Olá! Vi o site pareto.business e quero falar com um especialista sobre implementação de IA na minha empresa. Faturamento acima de R$1M/ano.');
export const WHATSAPP_URL     = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
export const CALENDLY_URL     = 'https://calendly.com/pareto-ai/diagnostico-30min';
export const CONTACT_EMAIL    = 'tom.queiroz@pareto.plus';
export const CONTACT_PHONE    = '+55 (11) 91551-3210';
export const CONTACT_ADDRESS  = 'Av. Paulista, 2202 — Consolação, São Paulo / SP';
export const SITE_DOMAIN      = 'pareto.business';

// ─── Key Stats ────────────────────────────────────────────────────────────────
export const KEY_STATS = [
  { value: 13,  suffix: '+', prefix: '',   label: 'Anos com IA & ML aplicados a negócios' },
  { value: 16,  suffix: '',  prefix: '',   label: 'Prêmios globais Google Awards NY' },
  { value: 300, suffix: '+', prefix: '',   label: 'Empresas transformadas no Brasil' },
  { value: 250, suffix: '+', prefix: '',   label: 'Modelos de IA na plataforma Tess AI' },
  { value: 5,   suffix: '',  prefix: 'US$', label: 'Milhões captados — rodada seed 2026' },
  { value: 2,   suffix: 'M+',prefix: '',   label: 'Usuários Tess AI globalmente' },
  { value: 160, suffix: '+', prefix: '',   label: 'Especialistas de IA no time' },
  { value: 6,   suffix: 'º', prefix: '#',  label: 'Melhor produto de IA do mundo — G2 2024' },
];

// ─── Two Verticals (Holding) ──────────────────────────────────────────────────
export const VERTICALS: VerticalCard[] = [
  {
    id: 'pareto-plus',
    label: 'Consultoria & Implementação',
    name: 'Pareto Plus',
    tagline: 'AI First para o seu negócio.',
    description: 'A vertical de consultoria estratégica da holding. Customizamos, implementamos e transferimos inteligência artificial para cada processo do seu negócio — com accountabiliy de resultado e transferência real de conhecimento.',
    url: 'https://pareto.business',
    color: '#8800FF',
    stats: [
      { value: '13+', label: 'Anos ativos' },
      { value: '300+', label: 'Empresas' },
      { value: 'SP · Palo Alto', label: 'Escritórios' },
    ],
  },
  {
    id: 'tess-ai',
    label: 'Plataforma Proprietária de IA',
    name: 'Tess AI',
    tagline: '#6 Melhor IA do mundo. Feita no Brasil.',
    description: 'Nossa plataforma proprietária com +250 modelos de IA em um único ambiente enterprise. Agentic orchestration, Brand Voice, Model Council e execução autônoma. Captou US$5M com Hi Ventures & DYDX Capital.',
    url: 'https://tess.im',
    color: '#CDFF00',
    stats: [
      { value: '#6', label: 'G2 Global 2024' },
      { value: '250+', label: 'Modelos de IA' },
      { value: 'US$5M', label: 'Seed round' },
    ],
  },
];

// ─── Partner Badges ───────────────────────────────────────────────────────────
export const PARTNER_BADGES: PartnerBadge[] = [
  { name: 'Google Premier Partner 2026', icon: 'G',  color: '#4285F4', img: '/images/badge_google.png' },
  { name: 'Meta Business Partner',        icon: 'M',  color: '#0866FF', img: '/images/badge_meta.png' },
  { name: 'TikTok Marketing Partner',     icon: 'T',  color: '#ff0050', img: '/images/badge_tiktok.png' },
  { name: 'LinkedIn Marketing Partner',   icon: 'in', color: '#0A66C2', img: '/images/badge_linkedin.png' },
  { name: 'Kwai Business Partner',        icon: 'K',  color: '#FF7B00', img: '/images/badge_kwai.png' },
  { name: 'Pinterest Marketing Partners', icon: 'P',  color: '#E60023', img: '/images/badge_pinterest.png' },
];

// ─── Awards ───────────────────────────────────────────────────────────────────
export const AWARDS: Award[] = [
  { title: 'International Growth Award',     org: 'Google Awards NY',        year: '2022', highlight: true },
  { title: 'App Growth Award',               org: 'Google Awards NY',        year: '2022', highlight: true },
  { title: 'Empresa Mais Premiada do Mundo', org: 'Google Awards',           year: '2022', highlight: true },
  { title: '#6 Melhor IA Global',            org: 'G2 Best Software Awards', year: '2024', highlight: true },
  { title: '#1 AI Image Product Global',     org: 'G2',                      year: '2024', highlight: true },
  { title: 'G2 Leader — Winter',             org: 'G2',                      year: '2024', highlight: true },
  { title: 'Invested by Google AI for Startups', org: 'Google',             year: '2024', highlight: true },
  { title: 'US$5M Seed Round',               org: 'Hi Ventures · DYDX',     year: '2026', highlight: true },
  { title: 'Gartner 4.7/5',                 org: 'Gartner',                 year: '2024' },
  { title: 'G2 4.8/5',                      org: 'G2',                      year: '2024' },
];

// ─── Client Logos ─────────────────────────────────────────────────────────────
export const CLIENT_LOGOS: ClientLogo[] = [
  { name: 'Netflix',         type: 'image', src: '/images/logos/logo_netflix.svg' },
  { name: 'PepsiCo',         type: 'image', src: '/images/logos/logo_pepsico.png' },
  { name: 'Samsung',         type: 'image', src: '/images/logos/logo_samsung.svg' },
  { name: 'Shopify',         type: 'image', src: '/images/logos/logo_shopify.svg' },
  { name: 'Nvidia',          type: 'image', src: '/images/logos/logo_nvidia.svg' },
  { name: 'Amazon',          type: 'image', src: '/images/logos/logo_amazon.png' },
  { name: 'Puma',            type: 'image', src: '/images/logos/logo_puma.svg' },
  { name: 'Spotify',         type: 'image', src: '/images/logos/logo_spotify.svg' },
  { name: 'Coinbase',        type: 'image', src: '/images/logos/logo_coinbase.svg' },
  { name: 'Stone',           type: 'image', src: '/images/logos/logo_stone.png' },
  { name: 'Porto Seguro',    type: 'image', src: '/images/logos/logo_portoseguro.png' },
  { name: 'RE/MAX',          type: 'image', src: '/images/logos/logo_remax.png' },
  { name: 'Hering',          type: 'image', src: '/images/logos/logo_hering.png' },
  { name: 'Universal Music', type: 'image', src: '/images/logos/logo_universalmusic.png' },
  { name: 'Greenpeace',      type: 'image', src: '/images/logos/logo_greenpeace.png' },
  { name: 'WMcCann',         type: 'text' },
  { name: 'Multiplan',       type: 'text' },
  { name: 'Grupo Salta',     type: 'text' },
];

// ─── Real Cases ───────────────────────────────────────────────────────────────
export const CASES: CaseResult[] = [
  { sector: 'Moda & Fashion',    client: 'Cliente Fashion',    metric: 'Redução nos custos de fotografia por coleção',   value: '49', sign: '-', description: 'IA generativa substituiu sessões de estúdio — imagens de alta qualidade geradas em minutos, no padrão de cada coleção.', tags: ['AI Generativa', 'Produção Visual'] },
  { sector: 'E-commerce',        client: 'Plataforma E-com',   metric: 'Aumento no ticket médio',                       value: '70', sign: '+', description: 'Agentes de IA personalizam a jornada do cliente em tempo real, reduzindo abandono de carrinho em 30%.', tags: ['Agentes AI', 'Personalização'] },
  { sector: 'Varejo',            client: 'Rede de Varejo',     metric: 'Redução nos custos de catálogo digital',        value: '90', sign: '-', description: 'Automação completa da produção de catálogo: de semanas para horas. Zero intervenção manual nos SKUs recorrentes.', tags: ['Automação', 'AI Ads'] },
  { sector: 'Imobiliário',       client: 'RE/MAX Brasil',      metric: 'Aumento no uso do app',                         value: '31', sign: '+', description: 'IA preditiva em campanhas de performance reduziu custo por install em 10% e aumentou engajamento qualificado.', tags: ['AI Ads', 'Performance'] },
  { sector: 'Farmacêutico',      client: 'Grupo Prafarma',     metric: 'Especialistas Pareto alocados',                 value: '5',  sign: '+', description: 'Time dedicado de IA, RPAs e agentes autônomos reduziram custo operacional em escala — sem demissões.', tags: ['AI Workers', 'RPA'] },
  { sector: 'Entretenimento',    client: 'Universal Music',    metric: 'Processos internos automatizados',              value: '100',sign: '+', description: 'Agentes inteligentes integrados para automatizar fluxos operacionais — de aprovação de contratos a relatórios.', tags: ['Agentes IA', 'Automação'] },
];

// ─── AI Models in Tess ────────────────────────────────────────────────────────
export const TESS_MODELS = [
  'GPT-4o', 'GPT-5', 'Claude 4 Sonnet', 'Claude 3.5 Opus', 'Gemini 2.5 Pro',
  'Gemini 1.5 Flash', 'Llama 4', 'Mistral Large', 'Midjourney', 'DALL-E 3',
  'Runway Gen-3', 'ElevenLabs', 'Kling AI', 'Luma Labs', 'Leonardo AI',
  'HeyGen', 'Ideogram', 'Stability AI', 'Deepgram', 'Cohere',
];

// ─── Integration Platforms ────────────────────────────────────────────────────
export const INTEGRATIONS = [
  { name: 'OpenAI',     src: '/images/logos/badge_openai.svg' },
  { name: 'Anthropic',  src: '/images/logos/badge_anthropic.svg' },
  { name: 'Google',     src: '/images/logos/social_google.svg' },
  { name: 'Zapier',     src: '/images/logos/badge_zapier.svg' },
  { name: 'n8n',        src: '/images/logos/badge_n8n.svg' },
  { name: 'Make',       src: '/images/logos/badge_make.svg' },
  { name: 'Salesforce', src: '/images/logos/badge_salesforce.svg' },
  { name: 'LinkedIn',   src: '/images/logos/social_linkedin.svg' },
  { name: 'Meta',       src: '/images/logos/social_facebook.svg' },
  { name: 'TikTok',     src: '/images/logos/social_tiktok.svg' },
];

// ─── Pillars of the Partnership ───────────────────────────────────────────────
export const PILLARS: Pillar[] = [
  { icon: '🧬', title: 'IA Customizada por Processo', body: 'Nenhum template genérico. Cada agente, automação e modelo é construído sobre os dados e a lógica real do seu negócio.' },
  { icon: '🔐', title: 'Segurança & Governança Enterprise', body: 'Arquitetura de dados com isolamento por cliente, SSO, audit trail, LGPD/GDPR — IA segura não é opcional, é fundamento.' },
  { icon: '🔗', title: 'Integração Total na sua Stack', body: 'Conectamos com seu ERP, CRM, dados proprietários e qualquer API. Zero fricção operacional — sem trocar o que já funciona.' },
  { icon: '🧠', title: 'Transferência de Know-how Real', body: 'Até 2028 seu time opera, orquestra e coordena agentes de IA. Não criamos dependência — criamos independência.' },
  { icon: '🇧🇷', title: 'Expertise no Ambiente Brasileiro', body: 'Soluções padronizadas para economias estáveis não funcionam aqui. Temos 13 anos de inteligência do mercado brasileiro — fiscal, regulatório, cultural.' },
  { icon: '📊', title: 'Accountability de Resultado', body: 'Medimos impacto em receita, custo operacional e velocidade de decisão. Nunca em métricas de vaidade.' },
];

// ─── Timeline ─────────────────────────────────────────────────────────────────
export const TIMELINE: TimelineItem[] = [
  { year: '2013', title: 'Fundação — AI-first desde o início', description: 'Nascemos com machine learning e IA aplicados a marketing e negócios. Quando o mercado ainda debatia "big data".' },
  { year: '2018', title: 'Google Premier Partner', description: 'Reconhecimento como top partner no Brasil. Metodologia proprietária de performance com IA.' },
  { year: '2020', title: 'Lançamento da Tess AI v1', description: 'Nossa plataforma proprietária de IA começa a tomar forma — o início da segunda vertical da holding.' },
  { year: '2022', title: '16 Prêmios em Nova York', description: 'Empresa Mais Premiada do Mundo no Google Awards NY. International Growth + App Growth Awards.' },
  { year: '2023', title: 'Tess AI atinge 1M de usuários', description: '+200 modelos, AI Steps, Brand Voice e AI Studio lançados. Crescimento orgânico global.' },
  { year: '2024', title: '#6 Melhor IA do Mundo — G2', description: 'G2 Best Software Awards: Tess AI supera ChatGPT (#10), Google Gemini (#22), IBM Watson (#28). Invested by Google AI for Startups.' },
  { year: '2025', title: 'US$5M Seed · Hi Ventures · DYDX Capital', description: 'Rodada liderada por Hi Ventures e DYDX Capital, com participação de Honeystone Ventures. Expansão global acelerada.' },
  { year: '2026', title: 'Holding: Pareto Plus + Tess AI · Nova sede Palo Alto', description: 'A holding estrutura duas verticais. Tess AI funda entidade em Palo Alto para concentrar expansão enterprise global. Pareto Plus foca transformação AI First no Brasil.' },
];

// ─── Competitors ──────────────────────────────────────────────────────────────
export const COMPETITORS = [
  { competitor: 'Agências Digitais',           offer: 'Campanhas padronizadas, sem IA real',       advantage: 'IA customizada por processo, output 10× e inteligência que compõe mês a mês' },
  { competitor: 'Consultorias Tradicionais',   offer: 'Decks de estratégia, zero execução',         advantage: 'Estratégia + construção de IA + execução + transferência de conhecimento integrados' },
  { competitor: 'Ferramentas DIY / ChatGPT',   offer: 'Genérico, sem customização, sem gestão',    advantage: 'Tess AI (#6 global) + agentes customizados + 160 especialistas de execução' },
  { competitor: 'Startups de IA (pós-2022)',   offer: 'Sem histórico, sem prova, sem localização', advantage: '13 anos de track record brasileiro + $5M investidos + expertise no mercado nacional' },
  { competitor: 'Soluções Internacionais',     offer: 'Desconhecem o ambiente de negócios BR',     advantage: '13 anos de inteligência regulatória, fiscal e cultural do mercado brasileiro' },
];

// ─── Utils ─────────────────────────────────────────────────────────────────────
export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
