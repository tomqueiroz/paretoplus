import { useEffect, type ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Check, ShieldCheck } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';

const G900 = '#13100C';
const G600 = '#4A4540';
const G400 = '#8A8278';
const OFF = '#F8F6F3';
const WHITE = '#FFFFFF';
const LIME = '#CBEC2E';
const LIME_DIM = '#A8C41E';

type AIMRoute = 'home' | 'about' | 'companies' | 'executives' | 'mentoria' | 'pareto' | 'blog';

type Post = {
  slug: string;
  title: string;
  dek: string;
  category: string;
  date: string;
  read: string;
  image: string;
  source: string;
  sourceUrl: string;
  body: string[];
};

const posts: Post[] = [
  {
    slug: 'agentes-de-ia-deixam-de-ser-piloto',
    title: 'A era dos agentes começa quando a empresa muda o trabalho — não quando compra uma ferramenta',
    dek: 'O próximo salto de produtividade não virá de mais um chatbot. Virá de redesenhar decisões, handoffs e responsabilidades com agentes supervisionados.',
    category: 'Estratégia',
    date: '14 set 2026',
    read: '8 min',
    image: '/images/ai-m/ai-engineering.jpg',
    source: 'Anthropic — Economic Index',
    sourceUrl: 'https://www.anthropic.com/research/economic-index',
    body: [
      'A discussão empresarial sobre agentes de IA amadureceu. O ponto já não é demonstrar que um modelo consegue gerar texto, código ou síntese; é decidir quais partes do trabalho podem ser reorganizadas com segurança.',
      'A pergunta executiva é mais exigente: onde uma cadeia de decisão perde tempo, contexto ou qualidade? É aí que um agente pode assumir uma tarefa delimitada, consultar sistemas, registrar evidências e devolver o controle para a pessoa certa.',
      'O desenho começa pelo processo, não pelo modelo. Sem critérios de sucesso, fronteiras de autonomia e governança, um agente vira apenas mais uma camada de complexidade.',
    ],
  },
  {
    slug: 'o-cio-que-o-negocio-precisa',
    title: 'O CIO que o negócio precisa agora é tradutor de capacidade, risco e vantagem',
    dek: 'A agenda de IA desloca tecnologia para o centro da estratégia — e exige uma nova conversa com conselho, finanças e operação.',
    category: 'Liderança',
    date: '11 set 2026',
    read: '7 min',
    image: '/images/ai-m/executive-insights.jpg',
    source: 'MIT Sloan Management Review',
    sourceUrl: 'https://sloanreview.mit.edu/topic/artificial-intelligence/',
    body: [
      'O papel de tecnologia está mudando porque a IA toca receita, experiência, pessoas e risco ao mesmo tempo. A função executiva deixa de ser apenas entregar infraestrutura e passa a orquestrar capacidade organizacional.',
      'Isso pede um vocabulário comum. O conselho quer entender impacto e exposição; a operação quer clareza sobre o que muda amanhã; o time técnico precisa de prioridades e patrocínio.',
      'Líderes que conectam esses três níveis constroem uma vantagem difícil de copiar: velocidade de decisão com responsabilidade.',
    ],
  },
  {
    slug: 'ia-generativa-e-o-novo-design-organizacional',
    title: 'IA generativa está redesenhando o organograma antes de redesenhar os cargos',
    dek: 'Quando o trabalho é aumentado por máquinas, a unidade de transformação deixa de ser a função isolada e passa a ser o sistema de decisão.',
    category: 'Pessoas & trabalho',
    date: '08 set 2026',
    read: '6 min',
    image: '/images/ai-m/human-ai.jpg',
    source: 'World Economic Forum',
    sourceUrl: 'https://www.weforum.org/publications/the-future-of-jobs-report-2025/',
    body: [
      'A adoção de IA não elimina apenas tarefas. Ela redistribui contexto, supervisão e responsabilidade entre pessoas e sistemas.',
      'Por isso, programas de upskilling que ensinam somente prompts ficam curtos. A organização precisa praticar novos rituais: revisão de saída, decisão assistida, documentação de exceções e aprendizado contínuo.',
      'O executivo que lidera essa mudança não promete automação total. Ele constrói uma arquitetura de trabalho em que pessoas saibam quando confiar, questionar e intervir.',
    ],
  },
  {
    slug: 'governanca-sem-paralisia',
    title: 'Governança de IA não pode ser o departamento do “ainda não”',
    dek: 'A melhor governança transforma risco em velocidade seletiva: mais rigor onde o impacto é alto, mais autonomia onde o risco é reversível.',
    category: 'Governança',
    date: '04 set 2026',
    read: '9 min',
    image: '/images/ai-m/executive-hologram.jpg',
    source: 'IBM — AI governance',
    sourceUrl: 'https://www.ibm.com/think/topics/ai-governance',
    body: [
      'Governança funciona quando ajuda a empresa a decidir melhor, e não quando tenta eliminar toda incerteza antes de começar.',
      'Uma matriz simples combina impacto, reversibilidade e sensibilidade dos dados. Casos de alto impacto exigem revisão humana, rastreabilidade e critérios de interrupção.',
      'A maturidade aparece quando cada líder sabe qual é o limite de autonomia do sistema e quem responde por uma decisão.',
    ],
  },
  {
    slug: 'o-verdadeiro-roi-da-capacitacao',
    title: 'O ROI da capacitação executiva aparece na qualidade das decisões que deixam de esperar',
    dek: 'Treinamento de IA precisa ser medido pela agenda que acelera, não pela quantidade de pessoas que assistiram a uma aula.',
    category: 'Upskilling',
    date: '29 ago 2026',
    read: '5 min',
    image: '/images/ai-m/ai-classroom.jpg',
    source: 'Google Cloud — AI adoption',
    sourceUrl: 'https://cloud.google.com/transform/ai',
    body: [
      'O indicador mais sedutor de uma academia corporativa é participação. O mais útil é a mudança de comportamento em decisões reais.',
      'Uma jornada executiva bem desenhada conecta repertório a um desafio do negócio: uma reunião de conselho, um portfólio de casos de uso, uma área com gargalo ou uma nova proposta de valor.',
      'A aprendizagem ganha tração quando cada sessão produz uma decisão, um experimento ou uma capacidade transferível para o time.',
    ],
  },
  {
    slug: 'do-piloto-ao-sistema-operacional',
    title: 'O abismo entre piloto e escala é um problema de gestão, não de tecnologia',
    dek: 'Empresas não escalam experimentos porque faltam mandato, dono, integração e cadência — não porque faltam ideias.',
    category: 'Transformação',
    date: '22 ago 2026',
    read: '8 min',
    image: '/images/ai-m/ml-strategy.jpg',
    source: 'McKinsey — State of AI',
    sourceUrl: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai',
    body: [
      'A maioria dos pilotos é desenhada para provar possibilidade técnica. A escala exige provar repetibilidade, economia, adoção e responsabilidade.',
      'Depois do primeiro protótipo, entram finanças, segurança, operações, jurídico, pessoas e o líder que será cobrado pelo resultado.',
      'O caminho mais curto para escalar é tratar cada piloto como uma tese de negócio com critérios explícitos de continuar, adaptar ou interromper.',
    ],
  },
  {
    slug: 'o-conselho-na-era-da-ia',
    title: 'Cinco perguntas que todo conselho deveria fazer antes de aprovar uma agenda de IA',
    dek: 'A conversa madura não começa por qual modelo comprar. Começa por onde a empresa quer ser diferente daqui a 24 meses.',
    category: 'Conselho',
    date: '15 ago 2026',
    read: '7 min',
    image: '/images/ai-m/executive-network.jpg',
    source: 'Harvard Business Review',
    sourceUrl: 'https://hbr.org/topic/artificial-intelligence',
    body: [
      'Qual vantagem competitiva queremos ampliar? Qual processo crítico precisa ser redesenhado? Qual risco novo aceitamos — e qual não aceitamos?',
      'O conselho também precisa perguntar quem tem mandato para priorizar, como o investimento será medido e qual capacidade permanecerá dentro da organização.',
      'Uma agenda de IA sem essas respostas tende a acumular demonstrações. Uma agenda com clareza cria opções estratégicas.',
    ],
  },
  {
    slug: 'a-nova-camada-de-dados',
    title: 'Sem dados prontos para decisão, a IA só acelera a confusão',
    dek: 'A vantagem não está em ter mais dados, mas em conectar os dados certos ao momento em que uma decisão acontece.',
    category: 'Dados',
    date: '08 ago 2026',
    read: '6 min',
    image: '/images/ai-m/ai-lab.jpg',
    source: 'NVIDIA — Enterprise AI',
    sourceUrl: 'https://www.nvidia.com/en-us/ai-data-science/',
    body: [
      'Projetos de IA frequentemente começam pela pergunta errada: “temos dados suficientes?”. A pergunta mais útil é: quais decisões precisam de melhor contexto?',
      'A partir daí, a empresa identifica fontes, qualidade, permissões e latência. Nem todo dado precisa ser centralizado; precisa ser confiável e acessível no fluxo correto.',
      'A governança de dados ganha valor quando reduz fricção para quem decide, em vez de apenas aumentar a documentação.',
    ],
  },
  {
    slug: 'o-momento-para-uma-mentoria',
    title: 'Quando contratar uma mentoria executiva de IA — e quando não contratar',
    dek: 'Mentoria não é uma aula premium. É um espaço de decisão para quem precisa conectar repertório, contexto e movimento.',
    category: 'Carreira executiva',
    date: '01 ago 2026',
    read: '5 min',
    image: '/images/ai-m/executive-masterclass.jpg',
    source: 'FGV EAESP — Educação executiva',
    sourceUrl: 'https://eaesp.fgv.br/educacao-executiva',
    body: [
      'A mentoria faz sentido quando existe uma agenda real, uma decisão com consequência e disponibilidade para trabalhar entre encontros.',
      'Ela não substitui um time técnico, nem promete respostas prontas. Seu valor é acelerar clareza, priorização e capacidade de liderança.',
      'Para executivos, a customização é o ponto: setor, trajetória, linguagem, confidencialidade e horizonte de decisão precisam entrar no desenho.',
    ],
  },
  {
    slug: 'ia-aplicada-no-brasil',
    title: 'O Brasil não precisa copiar a agenda de IA do Vale do Silício',
    dek: 'A oportunidade local está em combinar escala, criatividade operacional e problemas de negócio que o mundo inteiro precisa resolver.',
    category: 'Brasil & LATAM',
    date: '25 jul 2026',
    read: '8 min',
    image: '/images/ai-m/ai-audience.jpg',
    source: 'Pareto Plus — IA aplicada',
    sourceUrl: 'https://pareto.business/',
    body: [
      'A realidade brasileira impõe restrições e oportunidades específicas: mercados complexos, times enxutos, grande diversidade de clientes e uma cultura forte de adaptação.',
      'Isso favorece soluções aplicadas, mensuráveis e próximas da operação — especialmente quando estratégia e implementação caminham juntas.',
      'A agenda latino-americana pode ser original: menos fascínio por demonstrações, mais foco em produtividade, competitividade e inclusão de capacidade.',
    ],
  },
];

const subnav = [
  ['/quem-somos', 'Quem Somos'],
  ['/empresas', 'Empresas'],
  ['/executivos', 'Executivos'],
  ['/mentoria', 'Formação & Upskilling'],
  ['/pareto-plus', 'AI.M + Pareto'],
  ['/blog', 'Radar AI'],
] as const;

const pageMeta: Record<AIMRoute, { title: string; description: string }> = {
  home: { title: 'IA Aplicada a Negócios | Pareto Plus', description: 'Conteúdo, formação executiva e programas corporativos de IA aplicada a negócios e marketing no Brasil.' },
  about: { title: 'Quem Somos — IA Aplicada | Pareto Plus', description: 'Conheça a visão da Pareto Plus sobre desenvolvimento executivo, transformação e IA aplicada a negócios.' },
  companies: { title: 'IA para Empresas — Formação e Transformação | Pareto Plus', description: 'Programas corporativos de IA aplicada, academias, governança e upskilling para empresas brasileiras.' },
  executives: { title: 'IA para Executivos — Palestras e Advisory | Pareto Plus', description: 'Desenvolvimento executivo, palestras, imersões e advisory para líderes que precisam decidir e conduzir transformação com IA.' },
  mentoria: { title: 'Formação e Upskilling em IA | Pareto Plus', description: 'Mentoria, formação executiva e upskilling aplicado para líderes que querem transformar IA em capacidade de decisão.' },
  pareto: { title: 'AI.M + Pareto Plus — Estratégia e Implementação', description: 'Da decisão executiva ao sistema que opera: estratégia, formação, automação e implementação de IA aplicada.' },
  blog: { title: 'Radar AI — IA Aplicada a Negócios | Pareto Plus', description: 'Leituras editoriais sobre estratégia, pessoas, dados, governança, liderança e transformação com IA.' },
};

function routeForPath(pathname: string): AIMRoute {
  if (pathname === '/quem-somos') return 'about';
  if (pathname === '/empresas') return 'companies';
  if (pathname === '/executivos') return 'executives';
  if (pathname === '/mentoria') return 'mentoria';
  if (pathname === '/pareto-plus') return 'pareto';
  if (pathname === '/blog' || pathname.startsWith('/blog/')) return 'blog';
  return 'home';
}

function ContactBlock() {
  return (
    <section className="aim-cta">
      <div className="aim-shell aim-cta-grid">
        <div>
          <span className="aim-kicker">PRÓXIMO MOVIMENTO</span>
          <h2>Se existe uma decisão de IA na sua agenda, a conversa começa pelo contexto.</h2>
          <p>Conte o desafio, o público e o horizonte. A primeira conversa ajuda a escolher entre palestra, workshop, academia, mentoria, advisory ou implementação.</p>
        </div>
        <div className="aim-contact-card">
          <span>FALE DIRETAMENTE</span>
          <a href="mailto:tom.queiroz@pareto.plus">tom.queiroz@pareto.plus</a>
          <a href="https://wa.me/5511915513210" target="_blank" rel="noopener noreferrer">WhatsApp +55 11 91551-3210</a>
          <Link to="/treinamento-ia-negocios-marketing">Conhecer os formatos de treinamento <ArrowUpRight size={15} /></Link>
        </div>
      </div>
    </section>
  );
}

function EditorialNav({ current }: { current: string }) {
  return (
    <nav className="aim-subnav" aria-label="Subnavegação de IA aplicada">
      <Link className="aim-subnav-brand" to="/"><img src="/images/brand/pareto-logo-light.png" alt="Pareto Plus" /></Link>
      <div className="aim-subnav-links">
        {subnav.map(([href, label]) => <Link className={current === href ? 'is-active' : ''} key={href} to={href}>{label}</Link>)}
      </div>
    </nav>
  );
}

function Hero({ eyebrow, title, lead, image, alt }: { eyebrow: string; title: ReactNode; lead: string; image: string; alt: string }) {
  return (
    <section className="aim-hero">
      <div className="aim-shell aim-hero-grid">
        <div>
          <span className="aim-kicker">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{lead}</p>
          <div className="aim-actions"><Link className="aim-button" to="/empresas">Para empresas <ArrowRight size={15} /></Link><Link className="aim-button secondary" to="/executivos">Para executivos <ArrowRight size={15} /></Link></div>
        </div>
        <figure className="aim-hero-media"><img src={image} alt={alt} width="960" height="640" /><figcaption>IA aplicada · São Paulo · Brasil</figcaption></figure>
      </div>
    </section>
  );
}

function SplitSection({ kicker, title, copy, image, alt, reverse = false }: { kicker: string; title: string; copy: string; image: string; alt: string; reverse?: boolean }) {
  return (
    <section className={`aim-split ${reverse ? 'reverse' : ''}`}>
      <div className="aim-shell aim-split-grid">
        <div className="aim-split-copy"><span className="aim-kicker">{kicker}</span><h2>{title}</h2><p>{copy}</p></div>
        <figure><img data-image-slot={`ai-m.split.${kicker.toLowerCase().replace(/\s+/g, '-')}`} src={image} alt={alt} width="760" height="520" loading="lazy" /></figure>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Hero eyebrow="IA APLICADA A NEGÓCIOS E TRANSFORMAÇÃO" title={<>Inteligência aplicada para empresas e líderes que precisam <em>competir de outro modo.</em></>} lead="A Pareto Plus conecta repertório, capacidade e implementação para transformar IA em decisões melhores, operações mais competitivas e marketing que aprende." image="/images/speaking/tom-speaking-11.png" alt="Prof. Me. Wellington Queiroz palestrando para uma audiência executiva" />
      <section className="aim-light"><div className="aim-shell"><span className="aim-kicker dark">O QUE A PARETO PLUS FAZ</span><h2>Mais do que introduzir IA: preparar quem precisa fazer a mudança acontecer.</h2><p className="aim-lead-dark">Não existe transformação competitiva quando IA está isolada em uma ferramenta, uma área ou uma apresentação. O trabalho começa onde há liderança, mandato, decisões e capacidade de execução.</p><div className="aim-problem-grid">{[['01', 'IA sem mandato', 'Iniciativas isoladas não mudam a forma como uma empresa decide, prioriza ou opera.'], ['02', 'Capacitação sem aplicação', 'Conteúdo não basta quando líderes precisam transformar uma agenda real em ação responsável.'], ['03', 'Tecnologia sem adoção', 'Valor aparece quando estratégia, pessoas, dados e execução avançam na mesma cadência.']].map(([n, t, d]) => <article key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>
      <SplitSection kicker="INTELIGÊNCIA EM CONTEXTO" title="Tecnologia só importa quando amplia a qualidade da decisão." copy="A agenda de IA precisa partir da pergunta decisiva: onde a organização deve priorizar, testar, capacitar e transformar primeiro?" image="/images/ai-m/ml-strategy.jpg" alt="Estratégia de IA aplicada a decisões de negócio" />
      <section className="aim-dark"><div className="aim-shell"><span className="aim-kicker">DOIS PONTOS DE ENTRADA</span><h2>O formato acompanha a decisão que está sobre a sua mesa.</h2><div className="aim-audience-grid"><article><span>PARA EMPRESAS</span><h3>Transformação corporativa com IA aplicada.</h3><p>Programas sob medida para alinhar liderança, priorizar casos de uso, desenvolver capacidade e acelerar adoção.</p><Link to="/empresas">Explorar soluções para empresas <ArrowUpRight size={14} /></Link></article><article><span>PARA EXECUTIVOS</span><h3>Repertório para decidir e liderar a nova era.</h3><p>Palestras, imersões e advisory para quem precisa aprofundar capacidade de IA com contexto, trajetória e impacto.</p><Link to="/executivos">Explorar soluções para executivos <ArrowUpRight size={14} /></Link></article></div></div></section>
      <ContactBlock />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <Hero eyebrow="QUEM SOMOS" title={<>Uma visão brasileira de IA aplicada a negócios, marketing e desenvolvimento executivo.</>} lead="A Pareto Plus aproxima quem decide de quem constrói a nova infraestrutura competitiva — com linguagem executiva, prática aplicada e responsabilidade." image="/images/speaking/tom-speaking-young.png" alt="Prof. Me. Wellington Queiroz em uma apresentação executiva" />
      <section className="aim-light"><div className="aim-shell"><span className="aim-kicker dark">NOSSA TESE</span><h2>Repertório global só gera valor quando encontra a realidade do negócio.</h2><p className="aim-lead-dark">Combinamos estratégia, inovação, marketing, IA responsável e educação executiva com problemas, dados, equipes e decisões concretas de organizações brasileiras.</p><div className="aim-problem-grid"><article><b>01</b><h3>Desenvolver</h3><p>Executivos e times capazes de ler, decidir e aplicar IA com intenção de negócio.</p></article><article><b>02</b><h3>Conectar</h3><p>Especialistas, repertório e contexto aos desafios em que experiência cria vantagem.</p></article><article><b>03</b><h3>Transformar</h3><p>Ambição em priorização, capacidade e movimento, em parceria com quem implementa.</p></article></div></div></section>
      <SplitSection kicker="O ECOSSISTEMA EM MOVIMENTO" title="O futuro não é uma palestra: é uma capacidade que precisa circular." copy="Palestras, programas, mentorias e projetos de implementação funcionam melhor quando liderança, processo, dados e pessoas avançam juntos." image="/images/ai-m/ai-audience.jpg" alt="Líderes discutindo IA aplicada em um ambiente corporativo" reverse />
      <section className="aim-dark"><div className="aim-shell aim-author-grid"><div><span className="aim-kicker">PROF. ME. WELLINGTON QUEIROZ</span><h2>Professor, palestrante e profissional de IA aplicada ao marketing no Brasil.</h2></div><div><p>CEO / Head of AI Marketing da Pareto Plus, Wellington conduz experiências para líderes e equipes que precisam transformar IA em capacidade de decisão, criação e execução.</p><ul className="aim-check-list"><li><Check size={16} /> Conteúdo orientado a decisões reais.</li><li><Check size={16} /> Formação em português do Brasil, com frameworks e prompts reutilizáveis.</li><li><Check size={16} /> Palestras e programas com abordagem independente, sem alegar endossos não comprovados.</li></ul></div></div></section>
      <ContactBlock />
    </>
  );
}

function CompaniesPage() {
  const offerings = [
    ['01', 'Diagnóstico & tese de IA', 'Leitura do contexto, maturidade, decisões em jogo, oportunidades e critérios para definir onde a IA gera valor.'],
    ['02', 'Academia corporativa', 'Desenvolvimento de líderes e times com repertório aplicado por função, área ou desafio estratégico.'],
    ['03', 'Governança & aceleração', 'Portfólio de iniciativas, rituais de gestão, responsabilidades e sinais de progresso para sustentar adoção.'],
  ];
  return (
    <>
      <Hero eyebrow="PARA EMPRESAS" title={<>Transformação de IA não é um projeto de tecnologia. É uma <em>decisão de liderança.</em></>} lead="A Pareto Plus apoia empresas a transformar ambição em capacidade: diagnóstico, alinhamento executivo, programas de upskilling e uma cadência conectada à execução." image="/images/ai-m/executive-hologram.jpg" alt="Executivo observando uma visualização de inteligência artificial" />
      <section className="aim-dark"><div className="aim-shell"><span className="aim-kicker">ARQUITETURA CORPORATIVA</span><h2>Da ambição à capacidade, sem importar um modelo pronto.</h2><div className="aim-offering-grid">{offerings.map(([n, t, d]) => <article key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>
      <section className="aim-light"><div className="aim-shell"><span className="aim-kicker dark">MÉTODO</span><h2>Um caminho que transforma intenção em movimento.</h2><div className="aim-method-grid">{[['01', 'Diagnóstico', 'O que precisa ser decidido, por quem, com qual risco e qual potencial de valor?'], ['02', 'Prioridades', 'Quais públicos, processos e casos de uso merecem foco primeiro?'], ['03', 'Capacitação', 'Como líderes e times desenvolvem linguagem, critério e prática?'], ['04', 'Movimento', 'Como decisões, governança e execução permanecem conectadas depois da formação?']].map(([n, t, d]) => <article key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>
      <SplitSection kicker="CAPACIDADE APLICADA" title="A empresa aprende enquanto cria sua próxima vantagem operacional." copy="O desenvolvimento executivo ganha força quando líderes, dados, processos e times avançam juntos sobre prioridades concretas." image="/images/ai-m/ai-lab.jpg" alt="Laboratório corporativo para experimentação de inteligência artificial" />
      <ContactBlock />
    </>
  );
}

function ExecutivesPage() {
  return (
    <>
      <Hero eyebrow="PARA EXECUTIVOS" title={<>Liderar a era da IA exige mais do que conhecer ferramentas.</>} lead="Palestras, imersões e advisory para executivos que precisam conduzir transformação — na própria carreira e no negócio." image="/images/speaking/tom-speaking-11.png" alt="Prof. Me. Wellington Queiroz falando em um palco para executivos" />
      <section className="aim-dark"><div className="aim-shell"><span className="aim-kicker">DESENVOLVIMENTO EXECUTIVO</span><h2>Escolha o formato que cabe na agenda e importa para o mandato.</h2><div className="aim-offering-grid"><article><b>01</b><h3>Palestra executiva</h3><p>Contexto, linguagem e decisões para convenções, fóruns de liderança e kick-offs.</p><Link to="/treinamento-ia-negocios-marketing">Ver formatos <ArrowRight size={14} /></Link></article><article><b>02</b><h3>Imersões executivas</h3><p>Sessões selecionadas para confrontar escolhas, construir linguagem comum e sair com próximos passos.</p><Link to="/treinamento-ia-negocios-marketing">Consultar formato <ArrowRight size={14} /></Link></article><article><b>03</b><h3>Advisory de carreira e agenda</h3><p>Uma parceria de pensamento para posicionamento, repertório, prioridades e movimentos na economia da IA.</p><Link to="/treinamento-ia-negocios-marketing">Solicitar conversa <ArrowRight size={14} /></Link></article></div></div></section>
      <SplitSection kicker="A AGENDA MAIS DIFÍCIL" title="A decisão certa merece uma conversa de alto nível." copy="Para C-level, vice-presidentes, diretores e fundadores com uma decisão, transição ou transformação concreta sobre a mesa." image="/images/ai-m/ai-classroom.jpg" alt="Sala de aula executiva sobre inteligência artificial" reverse />
      <section className="aim-light"><div className="aim-shell"><span className="aim-kicker dark">PARA QUEM É</span><h2>Uma jornada seletiva por uma razão: precisa caber na agenda e importar para o mandato.</h2><ul className="aim-large-list"><li>Você precisa ligar IA a estratégia, P&L, produto, operação ou pessoas.</li><li>Você quer aprender fazendo, com o próprio contexto.</li><li>Você valoriza discrição, preparação e conversa de alto nível.</li></ul></div></section>
      <ContactBlock />
    </>
  );
}

function MentoriaPage() {
  return (
    <>
      <Hero eyebrow="FORMAÇÃO & UPSKILLING" title={<>Uma formação executiva para quem precisa transformar IA em <em>capacidade de decisão.</em></>} lead="Mentoria, jornadas de upskilling e experiências de aprendizagem para líderes que querem conectar repertório, contexto e movimento." image="/images/speaking/tom-speaking-young.png" alt="Prof. Me. Wellington Queiroz em um contexto de formação executiva" />
      <section className="aim-light"><div className="aim-shell"><span className="aim-kicker dark">O PROGRAMA</span><h2>Não é uma aula premium. É um espaço para decidir melhor.</h2><p className="aim-lead-dark">A jornada combina conversa, estudo aplicado, casos, prompts, experimentos e preparação para decisões reais de liderança, negócio e transformação.</p><div className="aim-program-grid">{[['01', 'Contexto', 'Mapear agenda, trajetória, desafio e critérios de sucesso.'], ['02', 'Repertório', 'Construir linguagem de IA aplicada a negócio, marketing, operação e pessoas.'], ['03', 'Aplicação', 'Trabalhar com casos, processos e decisões do próprio executivo.'], ['04', 'Movimento', 'Transformar insight em experimento, decisão e capacidade transferível.']].map(([n, t, d]) => <article key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>
      <section className="aim-dark"><div className="aim-shell aim-author-grid"><div><span className="aim-kicker">CONFIDENCIALIDADE</span><h2>Discrição faz parte da experiência.</h2></div><div><p>A jornada pode operar com protocolos de confidencialidade e NDA quando a agenda envolver decisões, dados ou movimentos sensíveis.</p><ul className="aim-check-list"><li><ShieldCheck size={16} /> Contexto tratado com discrição.</li><li><ShieldCheck size={16} /> Agenda personalizada por mandato.</li><li><ShieldCheck size={16} /> Aplicação com revisão humana e critérios claros.</li></ul></div></div></section>
      <ContactBlock />
    </>
  );
}

function ParetoPage() {
  return (
    <>
      <Hero eyebrow="AI.M + PARETO PLUS" title={<>Estratégia de IA que <em>chega à operação.</em></>} lead="A formação prepara liderança, prioridades e capacidade. A Pareto Plus entra para implementar inteligência aplicada, automação, agentes, dados e sistemas." image="/images/ai-m/ai-engineering.jpg" alt="Engenharia e implementação de inteligência artificial" />
      <section className="aim-dark"><div className="aim-shell aim-partnership-grid"><div><span className="aim-kicker">COMPLEMENTARIDADE</span><h2>Da decisão executiva ao sistema que opera todos os dias.</h2><p>Para empresas que precisam sair da intenção, a parceria organiza transformação liderada e implementação aplicada ao negócio.</p><Link className="aim-button" to="/">Conhecer Pareto Plus <ArrowUpRight size={15} /></Link></div><div className="aim-partnership-list"><article><span>AI.M / FORMAÇÃO</span><h3>Estratégia, desenvolvimento e adoção.</h3><p>Alinhamento executivo, tese de valor, formação aplicada, governança e capacidade organizacional.</p></article><article><span>PARETO PLUS / IMPLEMENTAÇÃO</span><h3>Aceleração competitiva.</h3><p>Automação de processos, agentes, dados, integrações e times especializados na operação.</p></article></div></div></section>
      <section className="aim-light"><div className="aim-shell"><span className="aim-kicker dark">COMO A PARCERIA ATUA</span><h2>Por departamento ou como agenda corporativa.</h2><div className="aim-method-grid">{[['01', 'Diagnóstico de oportunidade', 'Mapeamos custo oculto, atrito operacional, receita não capturada e capacidades prioritárias.'], ['02', 'Desenho de transformação', 'Conectamos ambição, áreas, responsáveis, dados, governança e sequência prática.'], ['03', 'Implementação aplicada', 'Transformamos prioridades em automações, agentes e sistemas integrados.'], ['04', 'Transferência de capacidade', 'Liderança e equipes aprendem a decidir, operar e evoluir a nova capacidade.']].map(([n, t, d]) => <article key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>
      <ContactBlock />
    </>
  );
}

function BlogPage({ post }: { post?: Post }) {
  if (post) {
    return <main className="aim-blog-article"><div className="aim-shell aim-article-grid"><article><span className="aim-kicker">{post.category} · {post.date}</span><h1>{post.title}</h1><p className="aim-article-dek">{post.dek}</p><img className="aim-article-image" data-image-slot={`ai-m.article.${post.slug}`} src={post.image} alt="" width="1100" height="620" /><div className="aim-prose">{post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className="aim-source">Fonte de referência: <a href={post.sourceUrl} target="_blank" rel="noreferrer">{post.source}</a>.</div><Link className="aim-text-link" to="/blog">← Voltar para o Radar AI</Link></article><aside className="aim-blog-aside"><span className="aim-kicker">SOBRE O RADAR</span><p>Leituras para transformar sinais de mercado em decisões mais claras.</p><Link to="/executivos">Falar com especialista <ArrowUpRight size={14} /></Link></aside></div></main>;
  }
  const featured = posts[0];
  return <main className="aim-blog"><section className="aim-blog-hero"><div className="aim-shell aim-blog-hero-grid"><div><span className="aim-kicker">RADAR AI · IA APLICADA A NEGÓCIOS</span><h1>O que muda quando a inteligência artificial chega à decisão.</h1><p>Leituras curadas para líderes que precisam entender impacto, escolher onde agir e construir capacidade que permanece.</p></div><div className="aim-blog-note">01<strong>Clareza para a próxima decisão.</strong><small>Estratégia · Pessoas · Dados · Governança · Operação</small></div></div></section><section className="aim-blog-content"><div className="aim-shell"><article className="aim-featured"><img src={featured.image} alt="" width="720" height="420" /><div><span className="aim-kicker">{featured.category} · {featured.date}</span><h2>{featured.title}</h2><p>{featured.dek}</p><Link className="aim-text-link" to={`/blog/${featured.slug}`}>Ler análise completa <ArrowUpRight size={14} /></Link></div></article><div className="aim-post-grid">{posts.slice(1).map((item) => <article className="aim-post-card" key={item.slug}><img data-image-slot={`ai-m.blog.${item.slug}`} src={item.image} alt="" width="360" height="220" loading="lazy" /><div><span>{item.category} · {item.read}</span><h3>{item.title}</h3><p>{item.dek}</p><Link to={`/blog/${item.slug}`}>Ler artigo <ArrowUpRight size={13} /></Link></div></article>)}</div></div></section><ContactBlock /></main>;
}

function Styles() {
  return <style>{`
    .aim-page { background:${G900}; color:${WHITE}; min-height:100vh; padding-top:56px; }
    .aim-shell { width:min(1180px,calc(100% - 48px)); margin:0 auto; }
    .aim-subnav { display:flex; align-items:center; gap:25px; min-height:62px; padding:0 max(24px,calc((100% - 1180px)/2)); background:rgba(19,16,12,.95); border-bottom:1px solid rgba(255,255,255,.1); overflow:auto; }
    .aim-subnav-brand img { width:108px; height:34px; object-fit:contain; }
    .aim-subnav-links { display:flex; gap:20px; white-space:nowrap; }
    .aim-subnav-links a { color:rgba(255,255,255,.62); font:500 11px/1.2 'DM Sans',sans-serif; letter-spacing:.06em; text-transform:uppercase; }
    .aim-subnav-links a:hover,.aim-subnav-links a.is-active { color:${LIME}; }
    .aim-kicker { display:inline-block; color:${LIME}; font:500 11px/1.2 'DM Sans',sans-serif; letter-spacing:.2em; text-transform:uppercase; }
    .aim-kicker.dark { color:${LIME_DIM}; }
    .aim-hero { padding:clamp(38px,5vw,68px) 0 62px; background:linear-gradient(125deg,#0d0d0d,#1c1712); }
    .aim-hero-grid { display:grid; grid-template-columns:1.1fr .9fr; gap:clamp(28px,5vw,58px); align-items:center; }
    .aim-hero h1,.aim-light h2,.aim-dark h2,.aim-cta h2,.aim-blog-hero h1,.aim-blog h2,.aim-blog-article h1 { margin:18px 0; font:700 clamp(38px,5vw,68px)/1 'Playfair Display',Georgia,serif; letter-spacing:-.045em; }
    .aim-hero h1 em { color:${LIME}; font-style:italic; }
    .aim-hero p,.aim-split-copy p,.aim-dark p,.aim-cta p { max-width:650px; color:rgba(255,255,255,.7); font:300 17px/1.7 'DM Sans',sans-serif; }
    .aim-actions { display:flex; flex-wrap:wrap; gap:10px; margin-top:30px; }
    .aim-button { display:inline-flex; align-items:center; gap:8px; padding:13px 17px; border:1px solid ${LIME}; background:${LIME}; color:${G900}; font:500 11px/1.2 'DM Sans',sans-serif; letter-spacing:.08em; text-transform:uppercase; text-decoration:none; }
    .aim-button.secondary { background:transparent; border-color:rgba(255,255,255,.3); color:${WHITE}; }
    .aim-button:hover { transform:translateY(-2px); }
    .aim-hero-media { position:relative; margin:0; border:1px solid rgba(203,236,46,.38); }
    .aim-hero-media img { display:block; width:100%; height:440px; object-fit:cover; }
    .aim-hero-media figcaption { position:absolute; left:14px; bottom:14px; padding:9px 11px; background:${LIME}; color:${G900}; font:500 10px/1.2 'DM Sans',sans-serif; letter-spacing:.09em; text-transform:uppercase; }
    .aim-light { padding:90px 0; background:${OFF}; color:${G900}; }
    .aim-light h2,.aim-dark h2,.aim-cta h2 { max-width:780px; }
    .aim-lead-dark { max-width:690px; color:${G600}; font:300 17px/1.7 'DM Sans',sans-serif; }
    .aim-problem-grid,.aim-audience-grid,.aim-offering-grid,.aim-method-grid,.aim-program-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; margin-top:45px; background:rgba(19,16,12,.16); }
    .aim-problem-grid article,.aim-method-grid article,.aim-program-grid article { min-height:220px; padding:25px; background:${OFF}; }
    .aim-problem-grid b,.aim-method-grid b,.aim-program-grid b { color:${LIME_DIM}; font:600 12px/1 'JetBrains Mono',monospace; }
    .aim-problem-grid h3,.aim-method-grid h3,.aim-program-grid h3 { margin:45px 0 9px; font:700 27px/1.05 'Playfair Display',Georgia,serif; }
    .aim-problem-grid p,.aim-method-grid p,.aim-program-grid p { margin:0; color:${G600}; font:300 14px/1.6 'DM Sans',sans-serif; }
    .aim-dark { padding:90px 0; background:#15120f; }
    .aim-audience-grid,.aim-offering-grid { grid-template-columns:repeat(2,1fr); background:rgba(255,255,255,.13); }
    .aim-audience-grid article,.aim-offering-grid article { display:flex; flex-direction:column; min-height:280px; padding:28px; background:#1d1914; border:1px solid rgba(255,255,255,.08); }
    .aim-audience-grid article>span,.aim-partnership-list span { color:${LIME}; font:500 10px/1.2 'DM Sans',sans-serif; letter-spacing:.15em; text-transform:uppercase; }
    .aim-audience-grid h3,.aim-offering-grid h3,.aim-partnership-list h3 { margin:38px 0 12px; font:700 30px/1.02 'Playfair Display',Georgia,serif; }
    .aim-audience-grid p,.aim-offering-grid p,.aim-partnership-list p { margin:0; color:rgba(255,255,255,.68); font:300 14px/1.6 'DM Sans',sans-serif; }
    .aim-audience-grid a,.aim-offering-grid a,.aim-partnership-list a { display:inline-flex; align-items:center; gap:6px; margin-top:auto; padding-top:22px; color:${LIME}; font:500 12px/1.2 'DM Sans',sans-serif; }
    .aim-split { padding:90px 0; background:#181511; }
    .aim-split.reverse { background:#211b14; }
    .aim-split-grid { display:grid; grid-template-columns:.8fr 1.2fr; gap:62px; align-items:center; }
    .aim-split.reverse .aim-split-copy { order:2; }.aim-split.reverse figure { order:1; }
    .aim-split h2 { max-width:650px; margin:17px 0; font:700 clamp(35px,4.5vw,55px)/1.02 'Playfair Display',Georgia,serif; letter-spacing:-.04em; }
    .aim-split figure { margin:0; min-height:350px; border:1px solid rgba(203,236,46,.25); overflow:hidden; }
    .aim-split figure img { display:block; width:100%; height:100%; min-height:350px; object-fit:cover; }
    .aim-author-grid,.aim-partnership-grid { display:grid; grid-template-columns:1fr 1fr; gap:70px; align-items:center; }
    .aim-check-list,.aim-large-list { display:grid; gap:13px; margin:22px 0 0; padding:0; list-style:none; }
    .aim-check-list li { display:flex; align-items:flex-start; gap:9px; color:rgba(255,255,255,.75); font:300 14px/1.55 'DM Sans',sans-serif; }
    .aim-check-list svg { flex:0 0 auto; color:${LIME}; margin-top:2px; }
    .aim-large-list li { padding:13px 0; border-top:1px solid rgba(19,16,12,.17); color:${G600}; font:300 16px/1.55 'DM Sans',sans-serif; }
    .aim-cta { padding:82px 0; background:${LIME}; color:${G900}; }
    .aim-cta-grid { display:grid; grid-template-columns:1fr .7fr; gap:60px; align-items:end; }
    .aim-cta h2 { color:${G900}; }
    .aim-cta p { color:rgba(19,16,12,.72); }
    .aim-contact-card { padding:22px; background:rgba(19,16,12,.94); color:${WHITE}; }
    .aim-contact-card>span { display:block; color:${LIME}; font:500 10px/1.2 'DM Sans',sans-serif; letter-spacing:.15em; }
    .aim-contact-card a { display:flex; align-items:center; gap:6px; margin-top:14px; color:${WHITE}; font:400 15px/1.3 'DM Sans',sans-serif; text-decoration:none; }
    .aim-contact-card a:hover { color:${LIME}; }
    .aim-partnership-list { display:grid; gap:1px; background:rgba(255,255,255,.12); }
    .aim-partnership-list article { padding:25px; background:#1d1914; }
    .aim-blog { background:#121316; }
    .aim-blog-hero { padding:clamp(48px,6vw,70px) 0 56px; background:linear-gradient(135deg,#111216,#211b14); }
    .aim-blog-hero-grid { display:grid; grid-template-columns:1.2fr .8fr; gap:55px; align-items:end; }
    .aim-blog-hero h1 { max-width:790px; }.aim-blog-hero p { max-width:620px; color:rgba(255,255,255,.68); font:300 18px/1.6 'DM Sans',sans-serif; }
    .aim-blog-note { display:grid; gap:12px; padding-top:18px; border-top:1px solid rgba(203,236,46,.45); color:${LIME_DIM}; font:500 12px/1.2 'JetBrains Mono',monospace; }
    .aim-blog-note strong { color:${WHITE}; font:700 30px/1.05 'Playfair Display',Georgia,serif; }
    .aim-blog-note small { color:rgba(255,255,255,.55); font:300 11px/1.5 'DM Sans',sans-serif; }
    .aim-blog-content { padding:70px 0; }
    .aim-featured { display:grid; grid-template-columns:1fr 1fr; gap:30px; padding-bottom:55px; border-bottom:1px solid rgba(255,255,255,.13); }
    .aim-featured img { width:100%; height:330px; object-fit:cover; filter:saturate(.75); }
    .aim-featured h2 { margin:17px 0 13px; font:700 43px/1.03 'Playfair Display',Georgia,serif; letter-spacing:-.04em; }
    .aim-featured p,.aim-post-card p,.aim-blog-aside p { color:rgba(255,255,255,.62); font:300 14px/1.6 'DM Sans',sans-serif; }
    .aim-text-link { display:inline-flex; align-items:center; gap:6px; margin-top:16px; color:${LIME}; font:500 12px/1.2 'DM Sans',sans-serif; text-decoration:none; }
    .aim-post-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:28px; padding-top:45px; }
    .aim-post-card { display:grid; grid-template-columns:135px 1fr; gap:17px; padding-top:16px; border-top:1px solid rgba(255,255,255,.13); }
    .aim-post-card img { width:135px; height:135px; object-fit:cover; filter:saturate(.72); }
    .aim-post-card>div>span { color:${LIME_DIM}; font:500 10px/1.2 'DM Sans',sans-serif; letter-spacing:.1em; text-transform:uppercase; }
    .aim-post-card h3 { margin:10px 0 8px; font:700 25px/1.05 'Playfair Display',Georgia,serif; }
    .aim-post-card a { display:inline-flex; align-items:center; gap:5px; margin-top:12px; color:${LIME}; font:500 11px/1.2 'DM Sans',sans-serif; }
    .aim-blog-article { padding:clamp(48px,6vw,72px) 0; background:#121316; min-height:80vh; }
    .aim-article-grid { display:grid; grid-template-columns:minmax(0,780px) 240px; gap:75px; }
    .aim-blog-article h1 { max-width:760px; }.aim-article-dek { max-width:680px; color:rgba(255,255,255,.67); font:300 19px/1.6 'DM Sans',sans-serif; }
    .aim-article-image { display:block; width:100%; max-height:520px; margin:38px 0; object-fit:cover; filter:saturate(.75); }
    .aim-prose { max-width:680px; }.aim-prose p { color:rgba(255,255,255,.78); font:300 17px/1.75 'DM Sans',sans-serif; }
    .aim-source { margin-top:30px; padding-top:17px; border-top:1px solid rgba(255,255,255,.13); color:${G400}; font:300 11px/1.5 'DM Sans',sans-serif; }.aim-source a { color:${LIME}; }
    .aim-blog-aside { align-self:start; padding-top:20px; border-top:1px solid rgba(203,236,46,.45); }.aim-blog-aside a { display:inline-flex; align-items:center; gap:6px; margin-top:16px; color:${LIME}; font:500 12px/1.2 'DM Sans',sans-serif; }
    @media(max-width:820px){.aim-shell{width:min(100% - 32px,680px)}.aim-subnav{padding:0 16px}.aim-subnav-links{gap:14px}.aim-hero-grid,.aim-split-grid,.aim-author-grid,.aim-partnership-grid,.aim-cta-grid,.aim-blog-hero-grid,.aim-article-grid{grid-template-columns:1fr;gap:36px}.aim-hero-media img{height:320px}.aim-problem-grid,.aim-audience-grid,.aim-offering-grid,.aim-method-grid,.aim-program-grid,.aim-post-grid{grid-template-columns:1fr}.aim-featured{grid-template-columns:1fr}.aim-post-card{grid-template-columns:100px 1fr}.aim-post-card img{width:100px;height:100px}.aim-split.reverse .aim-split-copy,.aim-split.reverse figure{order:initial}.aim-cta{padding:65px 0}.aim-light,.aim-dark,.aim-split{padding:65px 0}}
  `}</style>;
}

export default function AIMSubpages() {
  const location = useLocation();
  const params = useParams<{ slug?: string }>();
  const route = routeForPath(location.pathname);
  const post = route === 'blog' && params.slug ? posts.find((item) => item.slug === params.slug) : undefined;
  const metadata = pageMeta[route];
  const resolvedTitle = post ? `${post.title} | Radar AI — Pareto Plus` : metadata.title;
  const resolvedDescription = post?.dek || metadata.description;
  const pageUrl = `https://pareto.business/#${location.pathname}`;

  useEffect(() => {
    const previousTitle = document.title;
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const canonicalBefore = canonical?.getAttribute('href') ?? null;
    const previousMeta = new Map<string, { element: HTMLMetaElement | null; content: string | null }>();
    const metaUpdates = [
      { selector: 'meta[name="description"]', attrs: { name: 'description' }, content: resolvedDescription },
      { selector: 'meta[name="keywords"]', attrs: { name: 'keywords' }, content: 'IA aplicada ao marketing no Brasil, treinamento corporativo de IA, palestra de IA, coaching executivo, educação executiva, prompt engineering, GEO, SEO, transformação de negócios, Wellington Queiroz, Pareto Plus' },
      { selector: 'meta[name="author"]', attrs: { name: 'author' }, content: 'Prof. Me. Wellington Queiroz — Pareto Plus' },
      { selector: 'meta[name="robots"]', attrs: { name: 'robots' }, content: 'index, follow, max-image-preview:large' },
      { selector: 'meta[property="og:title"]', attrs: { property: 'og:title' }, content: resolvedTitle },
      { selector: 'meta[property="og:description"]', attrs: { property: 'og:description' }, content: resolvedDescription },
      { selector: 'meta[property="og:url"]', attrs: { property: 'og:url' }, content: pageUrl },
      { selector: 'meta[property="og:type"]', attrs: { property: 'og:type' }, content: post ? 'article' : 'website' },
      { selector: 'meta[property="og:image"]', attrs: { property: 'og:image' }, content: 'https://pareto.business/images/og-pareto-plus.jpg' },
      { selector: 'meta[name="twitter:title"]', attrs: { name: 'twitter:title' }, content: resolvedTitle },
      { selector: 'meta[name="twitter:description"]', attrs: { name: 'twitter:description' }, content: resolvedDescription },
    ];
    metaUpdates.forEach(({ selector, attrs, content }) => {
      const current = document.head.querySelector<HTMLMetaElement>(selector);
      previousMeta.set(selector, { element: current, content: current?.getAttribute('content') ?? null });
      const element = current ?? document.createElement('meta');
      Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
      element.setAttribute('content', content);
      if (!current) document.head.appendChild(element);
    });
    if (canonical) canonical.href = pageUrl;
    document.title = resolvedTitle;
    document.documentElement.lang = 'pt-BR';
    const structured = document.getElementById('site-structured-data');
    const before = structured?.textContent ?? null;
    if (structured) structured.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Organization', '@id': 'https://pareto.business/#organization', name: 'Pareto Plus', url: 'https://pareto.business/', areaServed: { '@type': 'Country', name: 'Brasil' } },
        { '@type': 'Person', '@id': 'https://pareto.business/#wellington-queiroz', name: 'Prof. Me. Wellington Queiroz', jobTitle: 'Professor, palestrante profissional e CEO / Head of AI Marketing', worksFor: { '@id': 'https://pareto.business/#organization' }, knowsAbout: ['AI Applied to Business', 'AI Applied to Marketing', 'Executive Education', 'Prompt Engineering', 'GEO', 'SEO', 'AEO'], knowsLanguage: ['pt-BR', 'en-US'] },
        { '@type': post ? 'Article' : 'Service', '@id': `${pageUrl}#entity`, name: resolvedTitle, url: pageUrl, description: resolvedDescription, inLanguage: 'pt-BR', author: { '@id': 'https://pareto.business/#wellington-queiroz' }, publisher: { '@id': 'https://pareto.business/#organization' }, areaServed: { '@type': 'Country', name: 'Brasil' } },
      ],
    }).replace(/</g, '\\u003c');
    return () => {
      document.title = previousTitle;
      previousMeta.forEach(({ element, content }, selector) => {
        if (element && content !== null) element.setAttribute('content', content);
        else if (element && content === null) element.removeAttribute('content');
        else document.head.querySelector(selector)?.remove();
      });
      if (canonical && canonicalBefore !== null) canonical.href = canonicalBefore;
      if (structured && before !== null) structured.textContent = before;
    };
  }, [location.pathname, pageUrl, post?.dek, resolvedDescription, resolvedTitle, route]);

  const content = route === 'about' ? <AboutPage /> : route === 'companies' ? <CompaniesPage /> : route === 'executives' ? <ExecutivesPage /> : route === 'mentoria' ? <MentoriaPage /> : route === 'pareto' ? <ParetoPage /> : route === 'blog' ? <BlogPage post={post} /> : <HomePage />;
  return <div className="aim-page"><Styles /><EditorialNav current={location.pathname.startsWith('/blog') ? '/blog' : location.pathname} />{content}</div>;
}
