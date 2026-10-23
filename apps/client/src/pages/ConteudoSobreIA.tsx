import { useEffect, useState, type CSSProperties } from 'react';
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Check,
  Clipboard,
  FileText,
  Image as ImageIcon,
  Linkedin,
  ListChecks,
  Menu,
  Network,
  PenTool,
  Sparkles,
  Target,
  Video,
  X,
  Zap,
  BarChart3,
  Bot,
  Database,
  Globe2,
  Mail,
  MessageSquare,
  Palette,
  Search,
  ShieldCheck,
  Users,
} from 'lucide-react';

const G900 = '#13100C';
const G800 = '#241F1A';
const G700 = '#332B24';
const G600 = '#4A4540';
const G400 = '#8A8278';
const G200 = '#BFB8AE';
const G100 = '#DDD7CF';
const OFF = '#F8F6F3';
const WHITE = '#FFFFFF';
const LIME = '#CBEC2E';
const LIME_DIM = '#A8C41E';
const BLUE = '#AFC7FF';
const ebookPdfPath = '/downloads/conteudo-sobre-ia-200-prompts-pareto-plus.pdf';

type PromptItem = {
  id: string;
  title: string;
  use: string;
  prompt: string;
  tip: string;
};

type Chapter = {
  id: string;
  number: string;
  label: string;
  intro: string;
  icon: typeof Target;
  prompts: PromptItem[];
};

const promptFramework = [
  { label: 'Papel', text: 'Quem a IA deve ser para executar com critério.' },
  { label: 'Resultado', text: 'O resultado de negócio que precisa mudar.' },
  { label: 'Contexto', text: 'Dados, público, canal, mercado e restrições.' },
  { label: 'Método', text: 'O framework, sequência ou processo que deve ser aplicado.' },
  { label: 'Saída', text: 'Formato final, campos, extensão e nível de decisão.' },
  { label: 'Gate de qualidade', text: 'Como revisar, testar, citar fontes e apontar lacunas.' },
];

const coreChapters: Chapter[] = [
  {
    id: 'os-de-prompting',
    number: '01',
    label: 'Sistema de prompting',
    intro: 'Comece pelo sistema operacional: prompts com papel, objetivo, contexto, método e um contrato de saída que outra pessoa consiga revisar e usar.',
    icon: Target,
    prompts: [
      {
        id: 'strategic-growth-operator',
        title: 'Strategic Growth Operator',
        use: 'Para transformar um briefing confuso em diagnóstico, hipóteses e plano de crescimento acionável.',
        tip: 'Use este prompt como “prompt-mãe”. Substitua os campos entre colchetes e anexe dados reais antes de pedir recomendações.',
        prompt: `You are a senior growth strategist and marketing operating partner for [COMPANY], a [BUSINESS MODEL] serving [TARGET MARKET].

Objective: turn the context below into a decision-ready growth plan for the next [TIME HORIZON].

CONTEXT
- Business goal: [GOAL]
- Revenue model and average order value: [MODEL]
- Current acquisition channels: [CHANNELS]
- Audience and highest-value segments: [AUDIENCE]
- Existing performance data: [DATA]
- Constraints: [BUDGET, TEAM, LEGAL, BRAND, TIMELINE]

METHOD
1. Restate the business problem in one sentence and separate symptoms from root causes.
2. Build a MECE issue tree with no more than four first-level branches.
3. Generate three growth hypotheses and rank them by impact, confidence, effort, and time-to-signal.
4. Define the minimum evidence required to validate each hypothesis.
5. Create a 30/60/90-day plan with owner, deliverable, KPI, dependency, and stop condition.
6. Include a measurement plan with leading indicators, lagging indicators, attribution risks, and experiment design.

OUTPUT
Return Markdown with these sections: Executive diagnosis, Issue tree, Ranked hypotheses, Evidence plan, 30/60/90-day roadmap, KPI scorecard, Risks and decisions required.
Do not invent facts. Mark missing information as [DATA GAP]. Make recommendations specific enough for an executive to approve or reject.`,
      },
      {
        id: 'brief-to-production-system',
        title: 'Brief → production system',
        use: 'Para transformar uma ideia em uma sequência de entregáveis para texto, imagem, vídeo e apresentação.',
        tip: 'Ideal para Skywork, Manus, Claude, Abacus ou qualquer agente capaz de gerar arquivos e assets.',
        prompt: `Act as an integrated creative director, senior copywriter, visual designer, video producer, and production manager.

Create a complete production system for this marketing initiative:
- Initiative: [NAME]
- Business objective: [OBJECTIVE]
- Audience: [AUDIENCE]
- Offer or message: [OFFER]
- Brand personality: [VOICE]
- Channels: [CHANNELS]
- Deadline and team: [DEADLINE / TEAM]

WORKFLOW
1. Convert the brief into one sharp strategic proposition.
2. Create a message hierarchy: promise, proof, reason to believe, objection handling, call to action.
3. Design the content architecture across copy, static imagery, short-form video, landing page, and executive artifact.
4. For every asset, specify purpose, format, dimensions, copy limits, visual direction, production inputs, review criteria, and final file type.
5. Sequence the work so that reusable source material is created once and adapted many times.
6. Add a quality-control checklist covering factual accuracy, brand consistency, accessibility, legal claims, mobile readability, and export quality.

OUTPUT
Return:
A. Creative brief in one page.
B. Asset matrix in a table.
C. Production prompts for each asset.
D. Review checklist.
E. Naming convention and folder structure.
E. A short list of decisions that require human approval.
Use plain language. Do not fabricate performance claims or customer evidence.`,
      },
    ],
  },
  {
    id: 'estrategia-posicionamento',
    number: '02',
    label: 'Estratégia & posicionamento',
    intro: 'Antes de pedir peças, peça clareza. Estes prompts ajudam a escolher território, proposta de valor, ICP, mensagens e ângulos que sustentam uma campanha inteira.',
    icon: BriefcaseBusiness,
    prompts: [
      {
        id: 'positioning-platform',
        title: 'Positioning platform',
        use: 'Para construir posicionamento, category narrative e mensagens por decisor.',
        tip: 'Inclua entrevistas, site, deck comercial e objeções reais para reduzir respostas genéricas.',
        prompt: `You are a B2B positioning strategist. Build a positioning platform for [COMPANY] in [CATEGORY] for [MARKET].

SOURCE MATERIAL
[PASTE WEBSITE COPY, SALES NOTES, CUSTOMER INTERVIEWS, PRODUCT FACTS, AND COMPETITOR CLAIMS]

Analyze the material and produce:
1. Ideal customer profile with firmographic, behavioral, trigger, and disqualifying signals.
2. Top five pains, desired outcomes, anxieties, and buying objections.
3. Category definition: what customers currently compare, what they misunderstand, and what new frame we should own.
4. Positioning statement using: For / Who / The / That / Unlike / Because.
5. Message house with one master narrative, three pillars, proof points, and objection responses.
6. Message variations for CEO, CFO, CMO, operations leader, and end user.
7. Five campaign territories and the strategic risk of each.

Rules:
- Separate verified facts, reasonable inferences, and assumptions.
- Do not use vague claims such as “innovative” without proof.
- End with a concise approval checklist and the exact evidence still missing.`,
      },
      {
        id: 'competitor-analysis',
        title: 'Competitor intelligence matrix',
        use: 'Para analisar concorrentes, diferenciação, narrativa e oportunidades de comunicação.',
        tip: 'Peça pesquisa com fontes e data; use browsing ou anexos atuais. O prompt foi desenhado para não transformar opinião em fato.',
        prompt: `Act as a competitive intelligence lead for [COMPANY] in [MARKET].

Research or analyze only the competitors and sources provided:
[COMPETITOR LIST / URLS / REPORTS]

Build a decision-grade comparison:
1. Normalize each competitor's offer, target segment, pricing logic, proof, distribution, tone, creative patterns, and customer promise.
2. Identify direct, indirect, substitute, and “do nothing” alternatives.
3. Separate observable evidence from interpretation.
4. Map white spaces by customer job, message, audience, channel, and experience.
5. Create a perceptual map with two strategically meaningful axes.
6. Recommend three differentiated positioning plays and the risk of copying category language.
7. Draft a counter-positioning brief and a list of claims that require verification.

OUTPUT
Return a table, then an executive synthesis of no more than 500 words, followed by Sources with URL, publisher, publication date, and access date.
If evidence is unavailable, write [UNVERIFIED] instead of guessing.`,
      },
    ],
  },
  {
    id: 'planejamento-orcamento',
    number: '03',
    label: 'Planejamento, mídia & orçamento',
    intro: 'Use IA para modelar decisões — não para “chutar” números. Os prompts abaixo pedem cenários, premissas, sensibilidade e critérios de parada.',
    icon: ListChecks,
    prompts: [
      {
        id: 'media-budget',
        title: 'Budget architect',
        use: 'Para distribuir orçamento entre canais e transformar metas em cenários executivos.',
        tip: 'Informe histórico por canal; sem dados, solicite cenários de referência, nunca forecast apresentado como certeza.',
        prompt: `You are a performance marketing finance partner. Build a transparent media budget model for [COMPANY].

BUSINESS INPUTS
- Revenue target: [TARGET]
- Contribution margin: [MARGIN]
- Average order value or contract value: [AOV / ACV]
- Current conversion rates: [RATES]
- Historical CAC, ROAS, CPL, or pipeline data: [DATA]
- Total available budget: [BUDGET]
- Channels under consideration: [CHANNELS]
- Planning period: [PERIOD]

Create three scenarios: conservative, base, and aggressive.
For each scenario:
1. State every assumption and formula.
2. Allocate budget by channel and funnel stage.
3. Estimate reach, qualified demand, conversions, customers, revenue, CAC, and payback.
4. Include a sensitivity table for conversion rate, CPM/CPC, and close rate.
5. Define weekly pacing rules, reallocation triggers, and stop-loss conditions.
6. Flag which figures are historical, benchmark-based, or illustrative.

Output an executive summary, a model table, assumptions, sensitivity analysis, and a 90-day measurement plan.
Never present an estimate as a guarantee. If an input is missing, return [INPUT REQUIRED].`,
      },
      {
        id: 'campaign-planner',
        title: 'Campaign planner by framework',
        use: 'Para criar campanhas com funil, mensagens, testes e cadência de produção.',
        tip: 'Troque AIDA por PAS, JTBD ou See-Think-Do-Care se o contexto exigir; peça ao modelo para justificar a escolha.',
        prompt: `Act as a senior integrated campaign planner.

Campaign brief:
- Business goal: [GOAL]
- Audience and job-to-be-done: [AUDIENCE / JOB]
- Offer: [OFFER]
- Market context: [CONTEXT]
- Budget and duration: [BUDGET / DURATION]
- Available proof: [PROOF]
- Channels: [CHANNELS]

Choose and justify the best planning framework among AIDA, PAS, JTBD, See-Think-Do-Care, or a hybrid.
Then deliver:
1. Strategic idea and one-line promise.
2. Funnel architecture with audience, message, asset, CTA, and KPI per stage.
3. Content calendar for four weeks.
4. Test matrix covering creative, audience, offer, landing page, and follow-up.
5. Production brief for each asset.
6. Measurement and learning agenda.
7. Risks, dependencies, and decisions required from the marketing executive.

Keep the plan channel-native but strategically coherent. Separate “must ship” from “nice to have”.`,
      },
    ],
  },
  {
    id: 'copywriting',
    number: '04',
    label: 'Copywriting & campanhas',
    intro: 'Copy de alta performance nasce de tensão, prova e clareza. Aqui a IA trabalha como estrategista de mensagem, não como gerador de frases soltas.',
    icon: PenTool,
    prompts: [
      {
        id: 'copy-system',
        title: 'Copy system with variants',
        use: 'Para gerar sistema de mensagens, headlines, anúncios, e-mails e CTAs sem perder consistência.',
        tip: 'Peça sempre a razão estratégica de cada variação; isso facilita aprovação e aprendizagem.',
        prompt: `You are a direct-response copy chief for [BRAND].

Inputs:
- Audience: [AUDIENCE]
- Awareness level: [UNAWARE / PROBLEM / SOLUTION / PRODUCT / MOST AWARE]
- Core problem: [PROBLEM]
- Desired outcome: [OUTCOME]
- Offer: [OFFER]
- Proof and constraints: [PROOF / LEGAL / BRAND]
- Channel and character limits: [CHANNEL RULES]

Build a copy system:
1. Message hierarchy and primary angle.
2. Ten headline options grouped by mechanism: pain, outcome, contrast, proof, curiosity.
3. Five primary texts with different lengths.
4. Three objection-handling blocks.
5. Five CTA options ranked by friction.
6. Two email subject lines and a three-email sequence.
7. A “do not say” list and claim-verification checklist.

For every option, label the psychological mechanism and intended awareness level.
Use clear Brazilian Portuguese in the final copy, but explain the strategic rationale in English.
Do not invent customer results, statistics, or endorsements.`,
      },
      {
        id: 'linkedin-posts',
        title: 'LinkedIn authority engine',
        use: 'Para transformar experiência executiva em posts com tese, prova, ponto de vista e conversa.',
        tip: 'Alimente o prompt com histórias reais e opinião própria; autoridade não nasce de texto genérico.',
        prompt: `Act as a LinkedIn thought-leadership editor for [EXECUTIVE], a [ROLE] in [INDUSTRY].

Source notes:
[PASTE EXPERIENCE, OBSERVATIONS, CLIENT LESSONS, DATA, AND OPINIONS]

Create a 4-week LinkedIn content system:
1. Define three durable points of view and the audience each one serves.
2. Create 12 posts: 4 insight posts, 3 contrarian takes, 2 case lessons, 2 practical frameworks, and 1 personal leadership story.
3. Each post must include: a sharp opening line, context, useful idea, concrete example, discussion question, and optional CTA.
4. Keep the voice human, precise, and executive. Avoid motivational clichés, fake vulnerability, and empty engagement bait.
5. Add a repurposing map from one long-form insight into carousel, short video, newsletter, and sales enablement asset.

Return posts in Brazilian Portuguese. After each post, add a brief English note explaining the hook, audience tension, and proof strategy.
Use only the supplied facts; mark anything that needs verification.`,
      },
    ],
  },
  {
    id: 'landing-pages-ebooks',
    number: '05',
    label: 'Landing pages & e-books',
    intro: 'Uma boa peça editorial precisa orientar decisão. Estes prompts transformam pesquisa e proposta em páginas e materiais prontos para produção, revisão e exportação.',
    icon: FileText,
    prompts: [
      {
        id: 'landing-page',
        title: 'Landing page that converts',
        use: 'Para criar arquitetura, copy e direção visual de uma landing page B2B.',
        tip: 'Peça também o “anti-brief”: o que a página não deve prometer, esconder ou complicar.',
        prompt: `You are a conversion strategist, UX writer, and senior landing-page designer.

Create a complete landing page for:
- Offer: [OFFER]
- Audience: [AUDIENCE]
- Business goal: [GOAL]
- Traffic source: [SOURCE]
- Proof: [PROOF]
- Brand and visual direction: [BRAND]
- Form fields and compliance constraints: [CONSTRAINTS]

Deliver:
1. Page strategy and visitor intent.
2. Section-by-section wireframe from hero to footer.
3. Final copy in Brazilian Portuguese with headline, subhead, proof, objections, form microcopy, CTA, and FAQ.
4. Interaction and visual direction for desktop and mobile.
5. SEO title, meta description, H1, internal links, and schema suggestions.
6. Accessibility, privacy, and performance checklist.
7. A QA table mapping every claim to its evidence.

Optimize for clarity and qualified action, not hype. Keep the primary CTA singular and explain why each section exists.`,
      },
      {
        id: 'ebook-production',
        title: 'Executive e-book production',
        use: 'Para transformar conhecimento em e-book, white paper ou guia executivo pronto para diagramar.',
        tip: 'Se a ferramenta gerar o arquivo, mantenha o prompt de QA separado para revisar paginação, fontes e fontes bibliográficas.',
        prompt: `Act as an editorial director, subject-matter researcher, and information designer.

Create an executive e-book about [TOPIC] for [AUDIENCE].

Editorial requirements:
- Business objective: [OBJECTIVE]
- Desired length: [PAGES / WORD COUNT]
- Tone: [TONE]
- Evidence and sources: [SOURCES]
- Brand system: [BRAND]
- Desired CTA: [CTA]

Process:
1. Define the promise, reader transformation, and editorial thesis.
2. Build a chapter outline with learning objective, key argument, proof, example, and action per chapter.
3. Draft the full text in Brazilian Portuguese.
4. Add tables, checklists, frameworks, callout boxes, and “next action” moments.
5. Add citations or source notes close to the claims they support.
6. Create a production brief for cover, chapter openers, diagrams, and charts.
7. End with a page-by-page QA checklist for accuracy, hierarchy, readability, accessibility, and export-to-PDF quality.

Do not pad the document. Flag [SOURCE NEEDED] wherever a claim lacks support.`,
      },
    ],
  },
  {
    id: 'imagem',
    number: '06',
    label: 'Imagem & efeitos visuais',
    intro: 'Prompts de imagem funcionam melhor quando descrevem assunto, composição, lente, luz, material, intenção e restrições. O efeito vem da direção, não de adjetivos empilhados.',
    icon: ImageIcon,
    prompts: [
      {
        id: 'hero-image',
        title: 'Premium campaign image',
        use: 'Para imagem de campanha, hero de site, key visual ou anúncio com controle de composição.',
        tip: 'Mude apenas um bloco por iteração: enquadramento, luz, material, cor ou atmosfera. Isso acelera a aprendizagem visual.',
        prompt: `Create a premium advertising image for [BRAND / PRODUCT] targeting [AUDIENCE].

SUBJECT
[Describe the exact subject, action, material, and visual hierarchy.]

COMPOSITION
- Format: [ASPECT RATIO]
- Camera angle: [ANGLE]
- Framing: [CROP / NEGATIVE SPACE]
- Focal point: [FOCAL POINT]
- Leave clean negative space on [LEFT / RIGHT / TOP] for headline placement.

VISUAL DIRECTION
- Art direction: [EDITORIAL / DOCUMENTARY / FUTURIST / MINIMAL / LUXURY]
- Lighting: [LIGHT SOURCE, QUALITY, DIRECTION]
- Palette: [COLORS]
- Materials and textures: [MATERIALS]
- Lens and depth: [LENS, DEPTH OF FIELD]
- Motion or atmosphere: [ATMOSPHERE]

BRAND AND SAFETY
Use a refined, believable visual language. Preserve realistic proportions and coherent shadows. Avoid unreadable text, fake logos, watermarks, duplicated objects, extra fingers, distorted products, generic stock-photo smiles, and visual clutter.

OUTPUT
Return one production-ready image direction and three controlled variations that change only one variable each: composition, lighting, and art direction.`,
      },
      {
        id: 'product-scene',
        title: 'Product scene with controlled effects',
        use: 'Para produto, mockup, social ad e criativo de performance com efeitos visuais consistentes.',
        tip: 'Use imagem de referência e especifique o que não pode mudar: identidade, embalagem, proporção, cor e marca.',
        prompt: `Create a high-end commercial product scene using the supplied reference image of [PRODUCT].

IDENTITY LOCK
Preserve the exact product shape, label hierarchy, colors, logo placement, proportions, and distinctive details. Do not redesign the product.

SCENE
- Environment: [ENVIRONMENT]
- Surface: [SURFACE]
- Supporting objects: [OBJECTS]
- Mood: [MOOD]
- Audience and campaign promise: [AUDIENCE / PROMISE]

EFFECTS
- Primary effect: [REFLECTION / SPLASH / SMOKE / LIGHT TRAIL / PARTICLES / SHADOW]
- Physical behavior: make the effect obey gravity, light direction, scale, and material interaction.
- Lighting: [KEY LIGHT] plus [FILL / RIM LIGHT].
- Camera: [LENS], [ANGLE], [DEPTH OF FIELD].

LAYOUT
Use [ASPECT RATIO] and keep [PERCENTAGE]% uncluttered negative space for copy. The final image must feel like a real premium campaign photograph, not a generic AI illustration.

NEGATIVE CONSTRAINTS
No altered packaging, no invented text, no extra products, no floating objects without physical logic, no watermark, no low-resolution edges, no oversaturated gradients.`,
      },
    ],
  },
  {
    id: 'video',
    number: '07',
    label: 'Vídeo & motion',
    intro: 'Para vídeo, descreva o plano, a ação, a câmera, o ritmo e a transição. Um bom prompt de motion é quase um mini storyboard técnico.',
    icon: Video,
    prompts: [
      {
        id: 'short-form-video',
        title: 'Short-form ad storyboard',
        use: 'Para Reels, TikTok, Shorts, anúncios verticais e vídeos de produto com foco em retenção.',
        tip: 'Gere primeiro o storyboard e só depois o vídeo. Isso reduz retrabalho e deixa claro o papel de cada plano.',
        prompt: `Act as a commercial film director and performance creative strategist.

Create a 20-second vertical video ad for [BRAND / OFFER] targeting [AUDIENCE].

OBJECTIVE
[BUSINESS OBJECTIVE]

RETENTION LOGIC
Design a visual or verbal pattern interrupt in the first 1.5 seconds. Build one clear tension, demonstrate the value, and finish with one action.

STORYBOARD
For each shot, specify:
- Timecode and duration
- Shot size and camera movement
- Subject action and facial/body direction
- Environment, lighting, color, and texture
- On-screen text in Brazilian Portuguese
- Voiceover or natural sound
- Transition and edit rhythm
- What the viewer should understand

PRODUCTION RULES
Keep the product identity consistent across shots. Avoid impossible physics, random wardrobe changes, unreadable captions, and visual elements that compete with the CTA. Design captions for safe zones and sound-off viewing.

OUTPUT
Return three versions: direct-response, brand-building, and founder-led. Include a shot list, voiceover, captions, thumbnail concept, and QA checklist.`,
      },
      {
        id: 'motion-effects',
        title: 'Motion effects direction',
        use: 'Para pedir efeitos visuais de câmera, partículas, morphing, transitions e product reveal com controle.',
        tip: 'Descreva o efeito por causa e consequência: o que inicia, como se move, com que luz interage e onde termina.',
        prompt: `Design a motion-effects treatment for a [DURATION]-second brand film about [SUBJECT].

VISUAL ARC
1. Start with [INITIAL STATE].
2. Introduce [TRIGGER / FORCE].
3. Transform the scene through [EFFECT].
4. Reveal [PRODUCT / MESSAGE].
5. End on [FINAL FRAME / CTA].

For every beat, define:
- Camera path, focal length, and speed
- Subject motion and timing
- Particle, light, liquid, fabric, smoke, or typography behavior
- Material interaction and shadows
- Color and contrast evolution
- Transition logic
- Sound-design cue

The effect must support the message, remain physically coherent, and preserve brand readability. Keep the hero object stable and recognizable.

Return a concise creative treatment, a shot-by-shot table, an editor's timing guide, and a list of effects that should be avoided because they distract from the business objective.`,
      },
    ],
  },
  {
    id: 'linkedin-brand',
    number: '08',
    label: 'LinkedIn & marca executiva',
    intro: 'A melhor otimização de LinkedIn alinha perfil, prova, narrativa e rotina de publicação. O objetivo não é parecer ocupado: é ser encontrado e lembrado pelos decisores certos.',
    icon: Linkedin,
    prompts: [
      {
        id: 'linkedin-optimization',
        title: 'LinkedIn profile optimizer',
        use: 'Para otimizar perfil executivo, headline, About, prova social e termos de busca.',
        tip: 'Anexe CV, bio, resultados comprovados, foco de mercado e exemplos de voz. Sem prova, peça placeholders explícitos.',
        prompt: `Act as a LinkedIn positioning strategist and executive brand editor.

Optimize the profile of [NAME], who is [ROLE] and wants to be known for [POSITIONING] by [TARGET AUDIENCE].

SOURCE MATERIAL
[PASTE CURRENT PROFILE, CV, BIO, PROOF POINTS, CLIENT TYPES, AND CAREER GOALS]

Deliver:
1. Keyword and search-intent map.
2. Five headline options under 220 characters.
3. A rewritten About section with a strong first 300 characters, proof, point of view, and clear contact path.
4. Experience-section rewrites focused on outcomes, scope, and evidence.
5. Featured-section recommendations.
6. Banner and profile-photo creative brief.
7. A 30-day publishing plan aligned to the positioning.

Keep the writing human, specific, and credible. Never invent metrics, clients, titles, awards, or testimonials. Mark missing proof as [EVIDENCE NEEDED]. Return final copy in Brazilian Portuguese and explain the optimization logic in English.`,
      },
    ],
  },
  {
    id: 'blog-automacao',
    number: '09',
    label: 'Blog, SEO & automação',
    intro: 'Use IA para produzir sistemas editoriais e operações repetíveis: pauta, pesquisa, atualização, distribuição, CRM, documentação e handoff entre pessoas e agentes.',
    icon: Network,
    prompts: [
      {
        id: 'seo-blog',
        title: 'Research-backed blog engine',
        use: 'Para criar artigos com intenção de busca, estrutura editorial, fontes e distribuição.',
        tip: 'Sempre inclua URLs e data de acesso. O modelo deve diferenciar fonte primária, secundária e opinião.',
        prompt: `Act as an SEO editor, industry researcher, and subject-matter writer for [BRAND].

Topic: [TOPIC]
Audience: [AUDIENCE]
Business goal: [GOAL]
Primary keyword: [KEYWORD]
Market and geography: [MARKET]
Sources or browsing scope: [SOURCES]

Build a research-backed article:
1. Search intent and reader job.
2. SERP-informed outline with a differentiated angle.
3. Claims inventory: claim, source, source type, date, and confidence.
4. Full article in Brazilian Portuguese with useful examples, tables, and a practical next step.
5. SEO title, meta description, H1, H2s, internal-link ideas, FAQ, and schema suggestions.
6. Distribution plan for LinkedIn, email, short video, and sales enablement.
7. Final fact-check checklist.

Do not cite sources you did not inspect. Do not make current claims without a source date. Mark uncertainty clearly.`,
      },
      {
        id: 'business-automation',
        title: 'Business automation blueprint',
        use: 'Para desenhar automações de marketing e operações que ferramentas como Skywork, Manus, Claude ou Abacus possam executar.',
        tip: 'Descreva o gatilho, os dados, a decisão, o handoff e a exceção. Automação sem exceção vira risco operacional.',
        prompt: `You are an automation architect for a marketing organization.

Process to improve: [PROCESS]
Current tools: [TOOLS]
People involved: [ROLES]
Inputs and outputs: [INPUTS / OUTPUTS]
Business goal: [GOAL]
Compliance and risk constraints: [CONSTRAINTS]

Design an implementation-ready automation:
1. Map the current process and identify waste, delay, and error points.
2. Define trigger, data contract, transformation steps, decision rules, human approvals, exception paths, and final handoff.
3. Recommend where an AI agent, deterministic automation, template, or human should be used.
4. Create the exact prompts and structured fields for each AI step.
5. Define permissions, logging, QA, rollback, and failure alerts.
6. Estimate time saved and the first measurable success criterion.

Return a process diagram in text, a RACI table, step-by-step implementation plan, test cases, and operating instructions in Brazilian Portuguese.
Never recommend autonomous action for irreversible, financial, legal, or customer-facing changes without human approval.`,
      },
    ],
  },
  {
    id: 'artefatos',
    number: '10',
    label: 'Artefatos executivos',
    intro: 'A IA também pode estruturar decks, relatórios, dashboards, propostas e documentos. A regra é tratar o artefato como decisão visual: narrativa, evidência, layout e revisão precisam andar juntos.',
    icon: Sparkles,
    prompts: [
      {
        id: 'executive-deck',
        title: 'Executive deck architect',
        use: 'Para transformar pesquisa e dados em apresentação para diretoria, conselho ou cliente.',
        tip: 'Informe o público, a decisão que precisa ser tomada e o que está fora do escopo; isso evita “deck bonito sem decisão”.',
        prompt: `Act as a senior strategy consultant, data storyteller, and presentation director.

Create an executive presentation for [AUDIENCE] about [TOPIC].

Decision context:
- Decision required: [DECISION]
- Business situation: [SITUATION]
- Evidence and data: [DATA]
- Constraints and sensitivities: [CONSTRAINTS]
- Desired action: [ACTION]

Build:
1. A one-sentence governing thought.
2. A slide-by-slide storyline with title, takeaway, evidence, visual, speaker note, and decision implication.
3. A MECE appendix for assumptions, methodology, sources, and definitions.
4. Recommendations for charts, diagrams, tables, and visual hierarchy.
5. A red-team review listing weak claims, missing data, misleading comparisons, and likely executive questions.
6. A production checklist for editable PPTX or printable PDF.

Use Brazilian Portuguese for the presentation. Keep slide titles as complete conclusions, not topics. Cite sources next to material claims and never fabricate numbers.`,
      },
      {
        id: 'proposal-generator',
        title: 'Proposal and scope generator',
        use: 'Para criar propostas comerciais e escopos claros, com entregáveis, premissas e critérios de sucesso.',
        tip: 'Faça a IA explicitar o que não está incluído; isso protege margem e reduz desalinhamento.',
        prompt: `You are a senior solutions consultant and commercial proposal writer for [COMPANY].

Client context:
[PASTE DISCOVERY NOTES, BUSINESS PROBLEM, CURRENT STATE, DESIRED OUTCOME, STAKEHOLDERS, AND CONSTRAINTS]

Create a proposal with:
1. Executive summary focused on the client's business problem.
2. Situation, implications, and opportunity.
3. Recommended approach with phases, deliverables, dependencies, and client responsibilities.
4. Success metrics and measurement method.
5. Timeline and governance.
6. Investment structure with assumptions and optional modules.
7. Explicit exclusions, risks, and change-control rules.
8. Next steps and approval checklist.

Write in clear Brazilian Portuguese with an executive tone. Avoid generic agency language, invented case studies, and unverified outcomes.
Return both a client-facing version and an internal delivery-risk review.`,
      },
    ],
  },
];

type PromptSeed = {
  title: string;
  focus: string;
};

type ChapterBlueprint = {
  id: string;
  number: string;
  label: string;
  intro: string;
  icon: typeof Target;
  role: string;
  coreIds: string[];
  seeds: PromptSeed[];
};

const seed = (title: string, focus: string): PromptSeed => ({ title, focus });

const titlePhraseTranslations: Array<[string, string]> = [
  ['Strategic Growth Operator', 'Operador de Crescimento Estratégico'],
  ['Brief → production system', 'Briefing → sistema de produção'],
  ['Positioning platform', 'Plataforma de posicionamento'],
  ['Competitor intelligence matrix', 'Matriz de inteligência competitiva'],
  ['Budget architect', 'Arquiteto de orçamento'],
  ['Campaign planner by framework', 'Planejador de campanhas por framework'],
  ['Copy system with variants', 'Sistema de copy com variações'],
  ['LinkedIn authority engine', 'Motor de autoridade no LinkedIn'],
  ['Landing page that converts', 'Landing page que converte'],
  ['Executive e-book production', 'Produção de e-book executivo'],
  ['Premium campaign image', 'Imagem premium de campanha'],
  ['Product scene with controlled effects', 'Cena de produto com efeitos controlados'],
  ['Short-form ad storyboard', 'Storyboard de anúncio curto'],
  ['Motion effects direction', 'Direção de efeitos de motion'],
  ['LinkedIn profile optimizer', 'Otimizador de perfil do LinkedIn'],
  ['Research-backed blog engine', 'Motor de blog baseado em pesquisa'],
  ['Business automation blueprint', 'Blueprint de automação de negócios'],
  ['Executive deck architect', 'Arquiteto de apresentação executiva'],
  ['Proposal and scope generator', 'Gerador de proposta e escopo'],
  ['Prompt Brief Builder', 'Construtor de briefing de prompt'],
  ['Few-Shot Example Designer', 'Designer de exemplos few-shot'],
  ['Output Schema Architect', 'Arquiteto de schema de saída'],
  ['Grounding and Citation Planner', 'Planejador de fundamentação e citações'],
  ['Model Handoff Translator', 'Tradutor de handoff entre modelos'],
  ['Prompt Test Matrix', 'Matriz de testes de prompts'],
  ['Prompt Library Governance', 'Governança da biblioteca de prompts'],
  ['North-Star Narrative', 'Narrativa norteadora'],
  ['Value Proposition Ladder', 'Escada de proposta de valor'],
  ['JTBD Opportunity Canvas', 'Canvas de oportunidades JTBD'],
  ['Strategic Trade-off Memo', 'Memorando de trade-offs estratégicos'],
  ['Executive One-Page Strategy', 'Estratégia executiva de uma página'],
  ['Voice-of-Customer Miner', 'Minerador da voz do cliente'],
  ['Needs-State Classifier', 'Classificador de estados de necessidade'],
  ['Win-Loss Analyst', 'Analista de ganhos e perdas'],
  ['Pricing Page Decoder', 'Decodificador de página de preços'],
  ['Ad Library Pattern Miner', 'Minerador de padrões da biblioteca de anúncios'],
  ['Share-of-Voice Analyst', 'Analista de participação de voz'],
  ['Counter-positioning Planner', 'Planejador de contraposição'],
  ['Competitor Launch Watch', 'Monitor de lançamentos concorrentes'],
  ['Substitute Threat Scan', 'Varredura de ameaças substitutas'],
  ['Annual Marketing Plan', 'Plano anual de marketing'],
  ['Quarterly OKR Cascade', 'Cascata trimestral de OKRs'],
  ['90-Day Sprint Planner', 'Planejador de sprint de 90 dias'],
  ['Content Operating System', 'Sistema operacional de conteúdo'],
  ['Launch Readiness Planner', 'Planejador de prontidão de lançamento'],
  ['Integrated Calendar Builder', 'Construtor de calendário integrado'],
  ['Experiment Backlog Prioritizer', 'Priorizador de backlog de experimentos'],
  ['Scenario Roadmap', 'Roteiro de cenários'],
  ['Executive Decision Log', 'Registro de decisões executivas'],
  ['Channel Mix Model', 'Modelo de mix de canais'],
  ['CAC Payback Planner', 'Planejador de retorno do CAC'],
  ['Media Pacing Monitor', 'Monitor de ritmo de mídia'],
  ['Incrementality Test Designer', 'Designer de testes de incrementalidade'],
  ['Attribution Risk Review', 'Revisão de riscos de atribuição'],
  ['Forecast Sensitivity Table', 'Tabela de sensibilidade de previsão'],
  ['CFO Marketing Memo', 'Memorando de marketing para CFO'],
  ['Budget Reallocation Trigger', 'Gatilho de realocação de orçamento'],
  ['Unit Economics Interpreter', 'Intérprete de economia unitária'],
  ['Measurement Plan Builder', 'Construtor de plano de mensuração'],
  ['Headline Angle Matrix', 'Matriz de ângulos de headlines'],
  ['Offer Naming Lab', 'Laboratório de nomes de ofertas'],
  ['Problem-Agitate-Solve Writer', 'Redator Problema-Agitação-Solução'],
  ['AIDA Adaptation System', 'Sistema de adaptação AIDA'],
  ['Proof-First Copywriter', 'Copywriter com prova em primeiro lugar'],
  ['Objection Handling Bank', 'Banco de tratamento de objeções'],
  ['CTA Friction Reducer', 'Redutor de fricção do CTA'],
  ['Ad Variant Generator', 'Gerador de variações de anúncios'],
  ['Brand Voice Guardrail', 'Guardrail da voz de marca'],
  ['Copy QA Red Team', 'Red team de QA de copy'],
  ['Welcome Sequence', 'Sequência de boas-vindas'],
  ['Lead Nurture Journey', 'Jornada de nutrição de leads'],
  ['Reactivation Campaign', 'Campanha de reativação'],
  ['Lifecycle Segmentation', 'Segmentação de ciclo de vida'],
  ['Email Subject Test Lab', 'Laboratório de testes de assunto de e-mail'],
  ['CRM Field Taxonomy', 'Taxonomia de campos de CRM'],
  ['Lead Scoring Model', 'Modelo de pontuação de leads'],
  ['Personalization Matrix', 'Matriz de personalização'],
  ['Deliverability Checklist', 'Checklist de entregabilidade'],
  ['Retention Messaging', 'Mensagens de retenção'],
  ['30-Day Content Calendar', 'Calendário de conteúdo de 30 dias'],
  ['Platform Adaptation Engine', 'Motor de adaptação por plataforma'],
  ['Carousel Script Builder', 'Construtor de roteiro de carrossel'],
  ['Short Post Hook Bank', 'Banco de ganchos para posts curtos'],
  ['Community Conversation Planner', 'Planejador de conversas de comunidade'],
  ['UGC Brief Writer', 'Redator de briefing de UGC'],
  ['Social Listening Summary', 'Resumo de escuta social'],
  ['Repurposing Engine', 'Motor de reaproveitamento'],
  ['Creator Brief', 'Briefing para criador'],
  ['Social QA Checklist', 'Checklist de QA social'],
  ['Executive Headline', 'Headline executivo'],
  ['About Section', 'Seção Sobre'],
  ['Authority Pillars', 'Pilares de autoridade'],
  ['Founder Story', 'História do fundador'],
  ['Case Study Post', 'Post de estudo de caso'],
  ['Contrarian Point of View', 'Ponto de vista contrário'],
  ['LinkedIn Newsletter', 'Newsletter do LinkedIn'],
  ['Comment Strategy', 'Estratégia de comentários'],
  ['Profile Keyword Map', 'Mapa de palavras-chave do perfil'],
  ['Thought Leadership Calendar', 'Calendário de liderança de pensamento'],
  ['Keyword Cluster Architect', 'Arquiteto de clusters de palavras-chave'],
  ['SERP Intent Classifier', 'Classificador de intenção SERP'],
  ['Pillar Page', 'Página pilar'],
  ['Internal Link Planner', 'Planejador de links internos'],
  ['FAQ Schema Writer', 'Redator de schema FAQ'],
  ['Refresh Decay Audit', 'Auditoria de declínio e atualização'],
  ['Snippet Optimizer', 'Otimizador de snippets'],
  ['Editorial Brief', 'Briefing editorial'],
  ['Source Credibility Check', 'Verificação de credibilidade de fonte'],
  ['Organic Content Scorecard', 'Scorecard de conteúdo orgânico'],
  ['GEO Entity Profile', 'Perfil de entidade GEO'],
  ['AI Answer Citation Plan', 'Plano de citações para respostas de IA'],
  ['llms.txt Content Map', 'Mapa de conteúdo do llms.txt'],
  ['AI Search FAQ', 'FAQ para busca com IA'],
  ['Brand Mention Monitor', 'Monitor de menções da marca'],
  ['Answer Engine Brief', 'Briefing para mecanismo de respostas'],
  ['Structured Data Planner', 'Planejador de dados estruturados'],
  ['Source-of-Truth Page', 'Página fonte de verdade'],
  ['Prompt Retrieval Test', 'Teste de recuperação de prompt'],
  ['GEO Readiness Audit', 'Auditoria de prontidão GEO'],
  ['Hero Section', 'Seção hero'],
  ['Conversion Friction Audit', 'Auditoria de fricção de conversão'],
  ['Form Field Optimizer', 'Otimizador de campos do formulário'],
  ['Trust Architecture', 'Arquitetura de confiança'],
  ['Mobile CRO', 'CRO mobile'],
  ['A/B Test Brief', 'Briefing de teste A/B'],
  ['Thank-you Page', 'Página de agradecimento'],
  ['Pricing Page', 'Página de preços'],
  ['FAQ Objection Page', 'Página de FAQ e objeções'],
  ['Landing QA', 'QA de landing page'],
  ['White Paper Outline', 'Estrutura de white paper'],
  ['Executive Research Report', 'Relatório executivo de pesquisa'],
  ['Lead Magnet', 'Isca digital'],
  ['Chapter Editor', 'Editor de capítulos'],
  ['Citation Formatter', 'Formatador de citações'],
  ['Case Study Narrative', 'Narrativa de estudo de caso'],
  ['Visual Brief', 'Briefing visual'],
  ['Print QA', 'QA de impressão'],
  ['Content Upgrade', 'Upgrade de conteúdo'],
  ['Ebook Distribution', 'Distribuição de e-book'],
  ['Art Direction Brief', 'Briefing de direção de arte'],
  ['Product Hero', 'Hero de produto'],
  ['Editorial Portrait', 'Retrato editorial'],
  ['Data Visualization Image', 'Imagem de visualização de dados'],
  ['Social Thumbnail', 'Miniatura social'],
  ['Brand Texture System', 'Sistema de texturas de marca'],
  ['Image Variation Matrix', 'Matriz de variações de imagem'],
  ['Negative Prompt', 'Prompt negativo'],
  ['Accessibility Alt Text', 'Texto alternativo acessível'],
  ['Image QA', 'QA de imagem'],
  ['Video Concept', 'Conceito de vídeo'],
  ['Reels Hook', 'Gancho para Reels'],
  ['Founder Video', 'Vídeo do fundador'],
  ['Explainer Script', 'Roteiro explicativo'],
  ['B-Roll Plan', 'Plano de B-roll'],
  ['Sound Design', 'Design de som'],
  ['Motion System', 'Sistema de motion'],
  ['Vertical Ad Cutdown', 'Corte vertical de anúncio'],
  ['Video Caption QA', 'QA de legendas de vídeo'],
  ['Production Handoff', 'Handoff de produção'],
  ['Brand Strategy', 'Estratégia de marca'],
  ['Logo Exploration', 'Exploração de logo'],
  ['Logo Usage Guide', 'Guia de uso do logo'],
  ['Color System', 'Sistema de cores'],
  ['Typography Pairing', 'Combinação tipográfica'],
  ['Brand Asset Audit', 'Auditoria de assets de marca'],
  ['Rebrand Decision Memo', 'Memorando de decisão de rebranding'],
  ['Campaign Key Visual', 'Key visual de campanha'],
  ['Co-branding Rules', 'Regras de co-branding'],
  ['Brand Consistency QA', 'QA de consistência de marca'],
  ['Discovery Call Prep', 'Preparação de discovery call'],
  ['Sales Deck', 'Apresentação comercial'],
  ['Case Study One-Pager', 'One-pager de estudo de caso'],
  ['RFP Response', 'Resposta a RFP'],
  ['Proposal Scope', 'Escopo de proposta'],
  ['Objection Battlecard', 'Battlecard de objeções'],
  ['Account Plan', 'Plano de conta'],
  ['Executive Follow-up', 'Follow-up executivo'],
  ['ROI Business Case', 'Business case de ROI'],
  ['Client Onboarding Brief', 'Briefing de onboarding do cliente'],
  ['Process Map', 'Mapa de processo'],
  ['AI Agent Role', 'Papel do agente de IA'],
  ['Workflow Spec', 'Especificação de workflow'],
  ['Data Contract', 'Contrato de dados'],
  ['Human Approval Gate', 'Gate de aprovação humana'],
  ['Exception Playbook', 'Playbook de exceções'],
  ['No-code Automation', 'Automação no-code'],
  ['CRM Handoff', 'Handoff de CRM'],
  ['Automation ROI', 'ROI de automação'],
  ['Operations SOP', 'SOP de operações'],
  ['Board Memo', 'Memorando para conselho'],
  ['Marketing Dashboard', 'Dashboard de marketing'],
  ['KPI Definition', 'Definição de KPI'],
  ['Forecast Narrative', 'Narrativa de previsão'],
  ['Risk Register', 'Registro de riscos'],
  ['AI Governance Policy', 'Política de governança de IA'],
  ['Prompt Review Board', 'Comitê de revisão de prompts'],
  ['Vendor Selection Matrix', 'Matriz de seleção de fornecedores'],
  ['Change Management', 'Gestão de mudança'],
  ['90-Day AI Adoption Plan', 'Plano de adoção de IA em 90 dias'],
  ['Context Window Planner', 'Planejador de janela de contexto'],
  ['Task Decomposition Coach', 'Mentor de decomposição de tarefas'],
  ['Reasoning Quality Auditor', 'Auditor de qualidade do raciocínio'],
  ['Category Design Strategist', 'Estrategista de design de categoria'],
  ['ICP Prioritization', 'Priorização de ICP'],
  ['Brand Promise Stress Test', 'Teste de estresse da promessa de marca'],
  ['Market Entry Strategy', 'Estratégia de entrada no mercado'],
  ['Growth Moat Mapper', 'Mapeador de vantagens de crescimento'],
  ['Customer Interview Synthesizer', 'Sintetizador de entrevistas com clientes'],
  ['Persona Evidence Builder', 'Construtor de persona baseada em evidências'],
  ['Segment Prioritizer', 'Priorizador de segmentos'],
  ['Buyer Journey Mapper', 'Mapeador da jornada do comprador'],
  ['Objection Taxonomy', 'Taxonomia de objeções'],
  ['Survey Question Designer', 'Designer de perguntas de pesquisa'],
  ['Research Brief Generator', 'Gerador de briefing de pesquisa'],
  ['Competitor Content Audit', 'Auditoria de conteúdo dos concorrentes'],
  ['Differentiation Gap Finder', 'Localizador de lacunas de diferenciação'],
  ['Benchmark Source Checker', 'Verificador de fontes de benchmark'],
  ['Battlecard Writer', 'Redator de battlecards'],
  ['Funnel Architecture', 'Arquitetura de funil'],
];

const titleWordTranslations: Record<string, string> = {
  Context: 'Contexto', Window: 'Janela', Planner: 'Planejador', Example: 'Exemplo', Designer: 'Designer',
  Task: 'Tarefa', Decomposition: 'Decomposição', Coach: 'Mentor', Quality: 'Qualidade', Auditor: 'Auditor',
  Reasoning: 'Raciocínio', Design: 'Design', Promise: 'Promessa', Stress: 'Estresse', Survey: 'Pesquisa',
  Question: 'Pergunta', Finder: 'Localizador', Matrix: 'Matriz', Checklist: 'Checklist', QA: 'QA',
  Grounding: 'Fundamentação', Citation: 'Citação', Model: 'Modelo', Translator: 'Tradutor', Library: 'Biblioteca',
  Governance: 'Governança', Category: 'Categoria', Strategist: 'Estrategista', ICP: 'ICP', Prioritization: 'Priorização',
  Market: 'Mercado', Entry: 'Entrada', Growth: 'Crescimento', Moat: 'Vantagem', Mapper: 'Mapeador',
  Customer: 'Cliente', Interview: 'Entrevista', Synthesizer: 'Sintetizador', Persona: 'Persona', Evidence: 'Evidência',
  Segment: 'Segmento', Prioritizer: 'Priorizador', Buyer: 'Comprador', Journey: 'Jornada', Objection: 'Objeção',
  Taxonomy: 'Taxonomia', Classifier: 'Classificador', Research: 'Pesquisa', Brief: 'Briefing', Competitor: 'Concorrente',
  Content: 'Conteúdo', Audit: 'Auditoria', Pricing: 'Preços', Page: 'Página', Decoder: 'Decodificador', Pattern: 'Padrões',
  Analyst: 'Analista', Differentiation: 'Diferenciação', Gap: 'Lacuna', Benchmark: 'Benchmark', Source: 'Fonte',
  Checker: 'Verificador', Launch: 'Lançamento', Watch: 'Monitoramento', Substitute: 'Substituto', Threat: 'Ameaça',
  Scan: 'Varredura', Battlecard: 'Battlecard', Annual: 'Anual', Marketing: 'Marketing', Plan: 'Plano', Quarterly: 'Trimestral',
  Cascade: 'Cascata', Sprint: 'Sprint', Funnel: 'Funil', Architecture: 'Arquitetura', Operating: 'Operacional',
  System: 'Sistema', Readiness: 'Prontidão', Integrated: 'Integrado', Calendar: 'Calendário', Builder: 'Construtor',
  Experiment: 'Experimento', Backlog: 'Backlog', Scenario: 'Cenário', Roadmap: 'Roteiro', Decision: 'Decisão', Log: 'Registro',
  Channel: 'Canal', Mix: 'Mix', Payback: 'Retorno', Media: 'Mídia', Pacing: 'Ritmo', Monitor: 'Monitor', Test: 'Teste',
  Incrementality: 'Incrementalidade', Attribution: 'Atribuição', Risk: 'Risco', Review: 'Revisão', Forecast: 'Previsão',
  Sensitivity: 'Sensibilidade', Table: 'Tabela', Reallocation: 'Realocação', Trigger: 'Gatilho', Unit: 'Unidade',
  Economics: 'Economia', Interpreter: 'Intérprete', Measurement: 'Mensuração', Headline: 'Headline', Angle: 'Ângulo',
  Offer: 'Oferta', Naming: 'Nomeação', Lab: 'Laboratório', Writer: 'Redator', Adaptation: 'Adaptação', 'Proof-First': 'Prova em primeiro lugar',
  Copywriter: 'Copywriter', Handling: 'Tratamento', Bank: 'Banco', Reducer: 'Redutor', Variant: 'Variação',
  Generator: 'Gerador', Voice: 'Voz', Guardrail: 'Guardrail', Red: 'Red', Team: 'Team', Welcome: 'Boas-vindas',
  Sequence: 'Sequência', Lead: 'Lead', Nurture: 'Nutrição', Reactivation: 'Reativação', Campaign: 'Campanha',
  Lifecycle: 'Ciclo de vida', Segmentation: 'Segmentação', Email: 'E-mail', Subject: 'Assunto', Scoring: 'Pontuação',
  Field: 'Campo', Personalization: 'Personalização', Deliverability: 'Entregabilidade', Retention: 'Retenção',
  Social: 'Social', Platform: 'Plataforma', Carousel: 'Carrossel', Script: 'Roteiro', Hook: 'Gancho', Post: 'Post',
  Community: 'Comunidade', Conversation: 'Conversa', Listening: 'Escuta', Summary: 'Resumo', Repurposing: 'Reaproveitamento',
  Creator: 'Criador', Executive: 'Executivo', About: 'Sobre', Section: 'Seção', Authority: 'Autoridade', Pillars: 'Pilares',
  Founder: 'Fundador', Story: 'História', Case: 'Caso', Study: 'Estudo', Contrarian: 'Contrário', Point: 'Ponto',
  View: 'Vista', Newsletter: 'Newsletter', Comment: 'Comentário', Strategy: 'Estratégia', Profile: 'Perfil', Keyword: 'Palavra-chave',
  Thought: 'Pensamento', Leadership: 'Liderança', Cluster: 'Cluster', Intent: 'Intenção', Pillar: 'Pilar', Internal: 'Interno',
  Link: 'Link', FAQ: 'FAQ', Refresh: 'Atualização', Decay: 'Declínio', Snippet: 'Snippet', Organic: 'Orgânico',
  Scorecard: 'Scorecard', Entity: 'Entidade', Search: 'Busca', Answer: 'Resposta', Engine: 'Motor', Mention: 'Menção',
  Structured: 'Estruturado', Data: 'Dados', Retrieval: 'Recuperação', Hero: 'Hero', Conversion: 'Conversão', Form: 'Formulário',
  Optimizer: 'Otimizador', Trust: 'Confiança', Mobile: 'Mobile', 'Thank-you': 'Agradecimento', White: 'White', Paper: 'Paper',
  Outline: 'Estrutura', Chapter: 'Capítulo', Editor: 'Editor', Formatter: 'Formatador', Visual: 'Visual', Print: 'Impressão',
  Upgrade: 'Upgrade', Distribution: 'Distribuição', Art: 'Arte', Direction: 'Direção', Product: 'Produto', Portrait: 'Retrato',
  Image: 'Imagem', Thumbnail: 'Miniatura', Texture: 'Textura', Variation: 'Variação', Negative: 'Negativo', Accessibility: 'Acessibilidade',
  Alt: 'Alt', Video: 'Vídeo', Concept: 'Conceito', Reels: 'Reels', Explainer: 'Explicativo', 'B-Roll': 'B-roll', Sound: 'Som',
  Motion: 'Motion', Vertical: 'Vertical', Ad: 'Anúncio', Cutdown: 'Corte', Caption: 'Legenda', Production: 'Produção',
  Handoff: 'Handoff', Brand: 'Marca', Identity: 'Identidade', Logo: 'Logo', Usage: 'Uso', Guide: 'Guia', Color: 'Cor',
  Typography: 'Tipografia', Pairing: 'Combinação', Asset: 'Asset', Rebrand: 'Rebranding', Key: 'Key',
  'Co-branding': 'Co-branding', Consistency: 'Consistência', Discovery: 'Discovery', Call: 'Call', Sales: 'Vendas', Deck: 'Deck',
  'One-Pager': 'One-pager', Response: 'Resposta', Proposal: 'Proposta', Scope: 'Escopo', Account: 'Conta', 'Follow-up': 'Follow-up',
  Client: 'Cliente', Onboarding: 'Onboarding', Process: 'Processo', Agent: 'Agente', Role: 'Papel', Workflow: 'Workflow',
  Spec: 'Especificação', Contract: 'Contrato', Human: 'Humana', Approval: 'Aprovação', Gate: 'Gate', Exception: 'Exceções',
  Playbook: 'Playbook', 'No-code': 'No-code', Operations: 'Operações', SOP: 'SOP', Board: 'Conselho', Dashboard: 'Dashboard',
  Definition: 'Definição', Register: 'Registro', Policy: 'Política', Vendor: 'Fornecedor', Selection: 'Seleção', Change: 'Mudança',
  Management: 'Gestão', Adoption: 'Adoção',
};

function localizePromptTitle(title: string): string {
  const phrase = titlePhraseTranslations.find(([source]) => source.toLowerCase() === title.toLowerCase());
  if (phrase) return phrase[1];
  return title.split(' ').map((token) => {
    const clean = token.replace(/[.,:]/g, '');
    return titleWordTranslations[clean] ? token.replace(clean, titleWordTranslations[clean]) : token;
  }).join(' ');
}

const chapterBlueprints: ChapterBlueprint[] = [
  {
    id: 'prompt-engineering',
    number: '01',
    label: 'Prompt engineering aplicado',
    intro: 'A base para escrever instruções que modelos e agentes conseguem executar, revisar e transformar em trabalho de marketing.',
    icon: Target,
    role: 'prompt engineer and marketing operations strategist',
    coreIds: ['strategic-growth-operator', 'brief-to-production-system'],
    seeds: [
      seed('Prompt Brief Builder', 'turn an ambiguous request into a complete executable brief'),
      seed('Context Window Planner', 'select, compress, and order the context that the model needs'),
      seed('Few-Shot Example Designer', 'design examples that teach the desired quality without overfitting'),
      seed('Task Decomposition Coach', 'break a complex marketing job into safe, verifiable steps'),
      seed('Output Schema Architect', 'define a structured output contract that teams can reuse'),
      seed('Reasoning Quality Auditor', 'audit assumptions, evidence, and decision quality without hidden leaps'),
      seed('Grounding and Citation Planner', 'plan source collection, citations, and freshness controls'),
      seed('Model Handoff Translator', 'adapt one prompt for chat, agent, image, video, and document tools'),
      seed('Prompt Test Matrix', 'create test cases and scoring criteria for prompt iterations'),
      seed('Prompt Library Governance', 'organize naming, ownership, versioning, and retirement rules'),
    ],
  },
  {
    id: 'estrategia-posicionamento-200',
    number: '02',
    label: 'Estratégia & posicionamento',
    intro: 'Construa território, proposta de valor e narrativa antes de acelerar a produção de peças.',
    icon: BriefcaseBusiness,
    role: 'senior marketing strategist and positioning consultant',
    coreIds: ['positioning-platform'],
    seeds: [
      seed('Category Design Strategist', 'define the category frame the brand should own'),
      seed('Value Proposition Ladder', 'connect functional value to emotional and economic value'),
      seed('ICP Prioritization', 'rank ideal customer segments by fit, value, urgency, and access'),
      seed('North-Star Narrative', 'write the strategic narrative that aligns teams and channels'),
      seed('Brand Promise Stress Test', 'test a promise against proof, objections, and competitive alternatives'),
      seed('Market Entry Strategy', 'design a market entry path with milestones and evidence gates'),
      seed('Growth Moat Mapper', 'map defensible capabilities, data, distribution, and relationships'),
      seed('JTBD Opportunity Canvas', 'find underserved jobs and moments that can create demand'),
      seed('Strategic Trade-off Memo', 'make explicit what the strategy will and will not prioritize'),
      seed('Executive One-Page Strategy', 'compress the marketing strategy into a decision-ready one-pager'),
    ],
  },
  {
    id: 'pesquisa-audiencia',
    number: '03',
    label: 'Pesquisa & audiência',
    intro: 'Transforme entrevistas, dados, CRM e sinais de mercado em decisões de segmentação que alguém consiga defender.',
    icon: Users,
    role: 'customer researcher and audience intelligence lead',
    coreIds: [],
    seeds: [
      seed('Customer Interview Synthesizer', 'synthesize interviews into needs, triggers, language, and contradictions'),
      seed('Persona Evidence Builder', 'build evidence-based personas with buying and disqualifying signals'),
      seed('Voice-of-Customer Miner', 'extract exact phrases that can improve marketing messages'),
      seed('Segment Prioritizer', 'rank segments using fit, value, urgency, and reachable demand'),
      seed('Buyer Journey Mapper', 'map moments, questions, anxieties, and proof across the journey'),
      seed('Objection Taxonomy', 'classify objections by risk, stage, and response strategy'),
      seed('Needs-State Classifier', 'classify audiences by situation, intent, and desired outcome'),
      seed('Win-Loss Analyst', 'analyze wins and losses to find repeatable commercial patterns'),
      seed('Survey Question Designer', 'design unbiased questions that produce decision-quality evidence'),
      seed('Research Brief Generator', 'turn a business question into a focused research plan'),
    ],
  },
  {
    id: 'inteligencia-competitiva',
    number: '04',
    label: 'Inteligência competitiva',
    intro: 'Separe observação de interpretação para entender mensagens, ofertas, criativos, preço e espaços de diferenciação.',
    icon: Search,
    role: 'competitive intelligence analyst and category strategist',
    coreIds: ['competitor-analysis'],
    seeds: [
      seed('Competitor Content Audit', 'compare competitor content themes, formats, proof, and gaps'),
      seed('Pricing Page Decoder', 'decode pricing logic, packaging, anchors, and friction'),
      seed('Ad Library Pattern Miner', 'identify repeatable patterns in competitor advertising'),
      seed('Share-of-Voice Analyst', 'estimate visible share of voice with explicit evidence limits'),
      seed('Differentiation Gap Finder', 'find customer jobs and messages that competitors under-serve'),
      seed('Benchmark Source Checker', 'verify benchmark quality, recency, comparability, and bias'),
      seed('Counter-positioning Planner', 'build a credible response without copying category language'),
      seed('Competitor Launch Watch', 'monitor launches and translate signals into action'),
      seed('Substitute Threat Scan', 'map indirect alternatives and the cost of doing nothing'),
      seed('Battlecard Writer', 'create sales battlecards with proof, questions, and risk notes'),
    ],
  },
  {
    id: 'planejamento-campanhas',
    number: '05',
    label: 'Planejamento & campanhas',
    intro: 'Crie planos integrados com prioridade, cadência, teste e decisão clara sobre o que realmente precisa ser produzido.',
    icon: ListChecks,
    role: 'integrated campaign planner and growth strategist',
    coreIds: ['campaign-planner'],
    seeds: [
      seed('Annual Marketing Plan', 'build an annual plan with strategic pillars and operating cadence'),
      seed('Quarterly OKR Cascade', 'translate business goals into marketing objectives and key results'),
      seed('90-Day Sprint Planner', 'design a focused 90-day plan with owners, milestones, and stop rules'),
      seed('Funnel Architecture', 'connect awareness, consideration, conversion, and retention activities'),
      seed('Content Operating System', 'design a repeatable system for briefs, production, approval, and reuse'),
      seed('Launch Readiness Planner', 'check whether the offer, audience, proof, channel, and team are ready'),
      seed('Integrated Calendar Builder', 'create a channel calendar with dependencies and repurposing'),
      seed('Experiment Backlog Prioritizer', 'rank experiments by impact, confidence, effort, and learning speed'),
      seed('Scenario Roadmap', 'create base, upside, and downside roadmaps with decision gates'),
      seed('Executive Decision Log', 'capture decisions, assumptions, owners, and follow-up evidence'),
    ],
  },
  {
    id: 'orcamento-midia-metricas',
    number: '06',
    label: 'Orçamento, mídia & métricas',
    intro: 'Use IA para modelar premissas e sensibilidade — nunca para mascarar incerteza com números bonitos.',
    icon: BarChart3,
    role: 'marketing finance partner and measurement strategist',
    coreIds: ['media-budget'],
    seeds: [
      seed('Channel Mix Model', 'allocate investment across channels and funnel stages'),
      seed('CAC Payback Planner', 'connect acquisition cost, margin, retention, and payback'),
      seed('Media Pacing Monitor', 'define pacing rules, alerts, and reallocation thresholds'),
      seed('Incrementality Test Designer', 'design a test that distinguishes incrementality from correlation'),
      seed('Attribution Risk Review', 'identify attribution blind spots and decision risks'),
      seed('Forecast Sensitivity Table', 'model how changes in conversion, price, and media cost affect outcomes'),
      seed('CFO Marketing Memo', 'explain marketing investment in financial language'),
      seed('Budget Reallocation Trigger', 'define objective rules for moving budget safely'),
      seed('Unit Economics Interpreter', 'translate unit economics into marketing action'),
      seed('Measurement Plan Builder', 'create a measurement system with owners and review cadence'),
    ],
  },
  {
    id: 'copywriting-mensagens',
    number: '07',
    label: 'Copywriting & mensagens',
    intro: 'Gere sistemas de mensagem com tensão, prova, clareza e variações nativas para cada canal.',
    icon: PenTool,
    role: 'direct-response copy chief and brand messaging strategist',
    coreIds: ['copy-system'],
    seeds: [
      seed('Headline Angle Matrix', 'generate and rank headline angles by audience tension'),
      seed('Offer Naming Lab', 'name offers with clarity, distinction, and category fit'),
      seed('Problem-Agitate-Solve Writer', 'write PAS copy without exaggeration or invented pain'),
      seed('AIDA Adaptation System', 'adapt a message through attention, interest, desire, and action'),
      seed('Proof-First Copywriter', 'lead with evidence and convert proof into persuasive copy'),
      seed('Objection Handling Bank', 'create responses to high-friction buying objections'),
      seed('CTA Friction Reducer', 'reduce uncertainty and effort around the next action'),
      seed('Ad Variant Generator', 'create channel-native variants while preserving the core promise'),
      seed('Brand Voice Guardrail', 'turn a brand voice into usable writing rules and examples'),
      seed('Copy QA Red Team', 'attack copy for ambiguity, unsupported claims, and conversion friction'),
    ],
  },
  {
    id: 'email-crm-lifecycle',
    number: '08',
    label: 'E-mail, CRM & lifecycle',
    intro: 'Estruture jornadas de relacionamento com relevância, timing, segmentação e governança de dados.',
    icon: Mail,
    role: 'CRM strategist and lifecycle marketing operator',
    coreIds: [],
    seeds: [
      seed('Welcome Sequence', 'build a welcome journey that sets expectations and creates momentum'),
      seed('Lead Nurture Journey', 'design a nurture sequence tied to intent and evidence'),
      seed('Reactivation Campaign', 'reactivate dormant contacts without sounding desperate'),
      seed('Lifecycle Segmentation', 'define lifecycle segments and their next best message'),
      seed('Email Subject Test Lab', 'create subject-line tests with a learning hypothesis'),
      seed('CRM Field Taxonomy', 'design a clean taxonomy for marketing and sales handoff'),
      seed('Lead Scoring Model', 'score leads with transparent behavioral and fit signals'),
      seed('Personalization Matrix', 'personalize content without inventing individual facts'),
      seed('Deliverability Checklist', 'review sender reputation, content, consent, and list hygiene'),
      seed('Retention Messaging', 'create retention messages around value realization and risk'),
    ],
  },
  {
    id: 'social-conteudo',
    number: '09',
    label: 'Social media & conteúdo',
    intro: 'Planeje conteúdo que respeite o comportamento de cada plataforma e ainda acumule ativos para a marca.',
    icon: MessageSquare,
    role: 'social content director and community strategist',
    coreIds: [],
    seeds: [
      seed('30-Day Content Calendar', 'build a 30-day calendar with strategic themes and formats'),
      seed('Platform Adaptation Engine', 'adapt one idea natively for multiple social platforms'),
      seed('Carousel Script Builder', 'turn a point of view into a useful swipeable carousel'),
      seed('Short Post Hook Bank', 'create concise hooks that earn attention without clickbait'),
      seed('Community Conversation Planner', 'design prompts and responses that build meaningful conversation'),
      seed('UGC Brief Writer', 'brief creators with a clear story, proof, and usage guardrails'),
      seed('Social Listening Summary', 'turn social signals into insight, risk, and opportunity'),
      seed('Repurposing Engine', 'repurpose one source asset into a coherent content system'),
      seed('Creator Brief', 'write an executable brief for an external creator or partner'),
      seed('Social QA Checklist', 'review copy, visuals, accessibility, links, and claims before publishing'),
    ],
  },
  {
    id: 'linkedin-marca-executiva',
    number: '10',
    label: 'LinkedIn & marca executiva',
    intro: 'Posicione especialistas e líderes com uma combinação de descoberta, autoridade, prova e consistência editorial.',
    icon: Linkedin,
    role: 'executive brand strategist and LinkedIn thought-leadership editor',
    coreIds: ['linkedin-posts', 'linkedin-optimization'],
    seeds: [
      seed('Executive Headline', 'write a searchable executive headline with a clear promise'),
      seed('About Section', 'rewrite an About section around point of view, proof, and contact'),
      seed('Authority Pillars', 'define durable points of view and the audience for each'),
      seed('Founder Story', 'turn a founder experience into a credible leadership narrative'),
      seed('Case Study Post', 'write a case lesson without exposing confidential information'),
      seed('Contrarian Point of View', 'build a useful contrarian position with evidence and nuance'),
      seed('LinkedIn Newsletter', 'create a recurring editorial format that earns return readers'),
      seed('Comment Strategy', 'design thoughtful comments that create professional visibility'),
      seed('Profile Keyword Map', 'map search terms to profile sections and proof'),
      seed('Thought Leadership Calendar', 'plan a month of authority content with a coherent arc'),
    ],
  },
  {
    id: 'blog-seo-organico',
    number: '11',
    label: 'Blog & SEO orgânico',
    intro: 'Crie conteúdo encontrável, útil e verificável — da intenção de busca ao refresh editorial.',
    icon: Globe2,
    role: 'SEO editor, organic growth strategist, and subject-matter writer',
    coreIds: ['seo-blog'],
    seeds: [
      seed('Keyword Cluster Architect', 'organize keywords into topical clusters and content priorities'),
      seed('SERP Intent Classifier', 'classify search intent and define the page job'),
      seed('Pillar Page', 'build a pillar page that earns depth and internal links'),
      seed('Internal Link Planner', 'create an internal-link architecture that supports discovery'),
      seed('FAQ Schema Writer', 'write useful FAQs and schema-ready answers without stuffing'),
      seed('Refresh Decay Audit', 'find declining pages and specify evidence-based refresh actions'),
      seed('Snippet Optimizer', 'improve the chance of earning featured snippets ethically'),
      seed('Editorial Brief', 'create a brief that aligns SEO, expertise, and reader value'),
      seed('Source Credibility Check', 'evaluate source quality, freshness, and applicability'),
      seed('Organic Content Scorecard', 'score content for usefulness, authority, discoverability, and action'),
    ],
  },
  {
    id: 'geo-ai-search',
    number: '12',
    label: 'GEO, AI search & entidades',
    intro: 'Prepare páginas e fontes para serem compreendidas, recuperadas e citadas por mecanismos de resposta com IA.',
    icon: Bot,
    role: 'GEO strategist and AI search information architect',
    coreIds: [],
    seeds: [
      seed('GEO Entity Profile', 'define the entity, attributes, relationships, and proof a model should retrieve'),
      seed('AI Answer Citation Plan', 'create a plan that makes claims easy to verify and cite'),
      seed('llms.txt Content Map', 'organize a machine-readable map of the most useful site resources'),
      seed('AI Search FAQ', 'answer high-intent questions in concise, source-grounded language'),
      seed('Brand Mention Monitor', 'track how a brand appears in AI answers and third-party sources'),
      seed('Answer Engine Brief', 'write content designed for retrieval, context, and follow-up questions'),
      seed('Structured Data Planner', 'select honest schema types and fields for a public page'),
      seed('Source-of-Truth Page', 'build a canonical page that consolidates facts and terminology'),
      seed('Prompt Retrieval Test', 'test whether a model can find and accurately summarize the page'),
      seed('GEO Readiness Audit', 'audit entities, evidence, crawlability, and answer usefulness'),
    ],
  },
  {
    id: 'landing-conversao',
    number: '13',
    label: 'Landing pages & conversão',
    intro: 'Transforme intenção em ação com arquitetura, prova, microcopy, acessibilidade e uma hipótese clara de conversão.',
    icon: FileText,
    role: 'conversion strategist, UX writer, and landing-page designer',
    coreIds: ['landing-page'],
    seeds: [
      seed('Hero Section', 'create a hero that aligns promise, audience, proof, and action'),
      seed('Conversion Friction Audit', 'find and prioritize friction across the user journey'),
      seed('Form Field Optimizer', 'choose fields that balance qualification and completion'),
      seed('Trust Architecture', 'place proof, risk reducers, and reassurance at the right moments'),
      seed('Mobile CRO', 'optimize a page for small screens, thumb reach, and scanning'),
      seed('A/B Test Brief', 'design a test with a clear hypothesis, metric, and guardrail'),
      seed('Thank-you Page', 'turn confirmation into a useful next step without over-selling'),
      seed('Pricing Page', 'explain value, packaging, and trade-offs with transparent copy'),
      seed('FAQ Objection Page', 'answer objections with evidence and concise decision support'),
      seed('Landing QA', 'review claims, forms, links, accessibility, speed, and analytics'),
    ],
  },
  {
    id: 'ebooks-editorial',
    number: '14',
    label: 'E-books & materiais editoriais',
    intro: 'Produza guias, white papers, relatórios e estudos que tenham tese, evidência, utilidade e acabamento executivo.',
    icon: FileText,
    role: 'editorial director, researcher, and information designer',
    coreIds: ['ebook-production'],
    seeds: [
      seed('White Paper Outline', 'build a rigorous outline for a decision-oriented white paper'),
      seed('Executive Research Report', 'turn research into an executive report with implications'),
      seed('Lead Magnet', 'create a useful lead magnet that earns a qualified next step'),
      seed('Chapter Editor', 'edit a chapter for logic, clarity, evidence, and flow'),
      seed('Citation Formatter', 'format and place citations with traceable source details'),
      seed('Case Study Narrative', 'shape a case study around situation, action, and evidence'),
      seed('Visual Brief', 'brief cover, diagrams, charts, and chapter openers'),
      seed('Print QA', 'review typography, hierarchy, pagination, and PDF export risks'),
      seed('Content Upgrade', 'turn a long asset into checklists, templates, and worksheets'),
      seed('Ebook Distribution', 'plan launch, capture, nurture, and repurposing for the asset'),
    ],
  },
  {
    id: 'imagem-direcao-visual',
    number: '15',
    label: 'Imagem & direção visual',
    intro: 'Descreva assunto, composição, material, luz, lente, efeito e restrições para gerar imagens consistentes com a marca.',
    icon: ImageIcon,
    role: 'commercial art director and AI image prompt designer',
    coreIds: ['hero-image', 'product-scene'],
    seeds: [
      seed('Art Direction Brief', 'translate a campaign idea into a precise visual direction'),
      seed('Product Hero', 'create a premium product hero while locking identity and proportions'),
      seed('Editorial Portrait', 'direct a credible portrait with controlled expression and light'),
      seed('Data Visualization Image', 'turn a data story into an editorial visual without distorting facts'),
      seed('Social Thumbnail', 'design a scroll-stopping thumbnail with safe negative space'),
      seed('Brand Texture System', 'create a repeatable texture, material, and lighting language'),
      seed('Image Variation Matrix', 'generate controlled variations that change one variable at a time'),
      seed('Negative Prompt', 'define precise exclusions for anatomy, text, logos, and artifacts'),
      seed('Accessibility Alt Text', 'write useful alt text that reflects the visual and its purpose'),
      seed('Image QA', 'review visual fidelity, composition, crop, legibility, and brand safety'),
    ],
  },
  {
    id: 'video-motion',
    number: '16',
    label: 'Vídeo, motion & storytelling',
    intro: 'Planeje planos, ação, ritmo, transições, som e safe zones antes de pedir um vídeo final.',
    icon: Video,
    role: 'commercial film director, motion designer, and performance creative strategist',
    coreIds: ['short-form-video', 'motion-effects'],
    seeds: [
      seed('Video Concept', 'turn a business objective into a filmable visual concept'),
      seed('Reels Hook', 'design the first seconds for attention and retention'),
      seed('Founder Video', 'shape a founder-led story with credible authority and warmth'),
      seed('Explainer Script', 'explain a complex product through a simple visual narrative'),
      seed('B-Roll Plan', 'plan supporting footage that makes editing efficient'),
      seed('Sound Design', 'specify voice, music, ambience, and transitions for meaning'),
      seed('Motion System', 'create reusable motion rules for titles, transitions, and reveals'),
      seed('Vertical Ad Cutdown', 'adapt a long video into channel-native vertical versions'),
      seed('Video Caption QA', 'review captions for accuracy, timing, safe zones, and readability'),
      seed('Production Handoff', 'create a handoff package for director, editor, and client approval'),
    ],
  },
  {
    id: 'marca-identidade',
    number: '17',
    label: 'Marca, logos & identidade',
    intro: 'Use IA para explorar e documentar sistemas de marca sem perder consistência, legibilidade ou controle humano.',
    icon: Palette,
    role: 'brand identity director and visual systems strategist',
    coreIds: [],
    seeds: [
      seed('Brand Strategy', 'define the strategic and verbal foundation of a brand'),
      seed('Logo Exploration', 'generate concept directions while respecting a supplied identity'),
      seed('Logo Usage Guide', 'document clear, incorrect, light, dark, and small-size applications'),
      seed('Color System', 'build semantic color roles with accessibility and contrast'),
      seed('Typography Pairing', 'select a type system for editorial, digital, and presentation use'),
      seed('Brand Asset Audit', 'inventory assets, gaps, duplicates, and governance needs'),
      seed('Rebrand Decision Memo', 'assess whether a rebrand solves a real business problem'),
      seed('Campaign Key Visual', 'translate a brand system into a campaign-level visual language'),
      seed('Co-branding Rules', 'define hierarchy, spacing, and contrast for partner marks'),
      seed('Brand Consistency QA', 'review a set of assets against a shared visual system'),
    ],
  },
  {
    id: 'vendas-propostas',
    number: '18',
    label: 'Vendas, propostas & enablement',
    intro: 'Conecte marketing e vendas com discovery, propostas, battlecards, casos e decisões comerciais mais claras.',
    icon: BriefcaseBusiness,
    role: 'senior solutions consultant and commercial enablement strategist',
    coreIds: ['proposal-generator'],
    seeds: [
      seed('Discovery Call Prep', 'prepare questions, hypotheses, and listening goals for discovery'),
      seed('Sales Deck', 'build a sales narrative that earns the next conversation'),
      seed('Case Study One-Pager', 'compress a real case into a credible sales asset'),
      seed('RFP Response', 'answer an RFP with traceable requirements and risks'),
      seed('Proposal Scope', 'define deliverables, dependencies, assumptions, and exclusions'),
      seed('Objection Battlecard', 'equip sales with concise responses and proof paths'),
      seed('Account Plan', 'plan an account around stakeholders, trigger events, and value'),
      seed('Executive Follow-up', 'write a follow-up that confirms decisions and next actions'),
      seed('ROI Business Case', 'build an evidence-based business case with sensitivity'),
      seed('Client Onboarding Brief', 'turn a signed scope into an executable onboarding plan'),
    ],
  },
  {
    id: 'automacao-operacoes',
    number: '19',
    label: 'Automação & operações',
    intro: 'Desenhe automações com gatilho, dados, decisões, aprovação humana, exceções, logs e rollback.',
    icon: Database,
    role: 'marketing automation architect and AI operations designer',
    coreIds: ['business-automation'],
    seeds: [
      seed('Process Map', 'map the current process and identify waste, delay, and risk'),
      seed('AI Agent Role', 'define a bounded role for an AI agent with explicit permissions'),
      seed('Workflow Spec', 'write an implementation-ready workflow specification'),
      seed('Data Contract', 'define fields, formats, validation, and ownership between systems'),
      seed('Human Approval Gate', 'design approval points for sensitive or irreversible actions'),
      seed('Exception Playbook', 'handle missing data, failures, edge cases, and escalations'),
      seed('No-code Automation', 'design a safe automation using available no-code tools'),
      seed('CRM Handoff', 'connect marketing signals to a useful sales handoff'),
      seed('Automation ROI', 'estimate time saved, quality, and cost with explicit assumptions'),
      seed('Operations SOP', 'turn a repeatable process into a standard operating procedure'),
    ],
  },
  {
    id: 'executivo-finance-governanca',
    number: '20',
    label: 'Executivo, finanças & governança',
    intro: 'Leve a IA para a sala de decisão com dashboards, memorandos, riscos, políticas, adoção e prestação de contas.',
    icon: ShieldCheck,
    role: 'executive advisor for AI-enabled marketing, finance, and governance',
    coreIds: [],
    seeds: [
      seed('Board Memo', 'write a concise board memo that separates facts, implications, and decisions'),
      seed('Marketing Dashboard', 'design a dashboard that supports weekly decisions'),
      seed('KPI Definition', 'define metrics with formula, owner, source, and decision use'),
      seed('Forecast Narrative', 'explain a forecast with drivers, uncertainty, and actions'),
      seed('Risk Register', 'create a risk register for AI-enabled marketing operations'),
      seed('AI Governance Policy', 'write practical policy for safe and accountable AI use'),
      seed('Prompt Review Board', 'create a review process for high-impact prompts and agents'),
      seed('Vendor Selection Matrix', 'compare AI tools with weighted criteria and evidence'),
      seed('Change Management', 'plan adoption, training, champions, and feedback loops'),
      seed('90-Day AI Adoption Plan', 'move a marketing team from pilots to repeatable practice'),
    ],
  },
];

const corePromptLookup = new Map(
  coreChapters.flatMap((chapter) => chapter.prompts.map((prompt) => [
    prompt.id,
    { ...prompt, title: localizePromptTitle(prompt.title) },
  ] as const)),
);

function buildGeneratedPrompt(
  blueprint: ChapterBlueprint,
  promptSeed: PromptSeed,
  index: number,
): PromptItem {
  const safeId = `${blueprint.id}-${String(index + 1).padStart(2, '0')}`;
  return {
    id: safeId,
    title: localizePromptTitle(promptSeed.title),
    use: `Use para estruturar ${blueprint.label.toLowerCase()} com uma saída que possa ser revisada, aprovada e aplicada pelo time.`,
    tip: `Preencha os campos entre colchetes com dados reais. Exija fontes, marque lacunas e aprove manualmente qualquer decisão de alto impacto antes de publicar.`,
    prompt: `You are a ${blueprint.role} supporting a Brazilian marketing executive.

BUSINESS CONTEXT
- Company, product, or initiative: [COMPANY / INITIATIVE]
- Business objective and decision required: [OBJECTIVE / DECISION]
- Audience, market, and funnel stage: [AUDIENCE / MARKET / STAGE]
- Channel, format, and deadline: [CHANNEL / FORMAT / DEADLINE]
- Evidence, source material, and current performance: [EVIDENCE]
- Brand, legal, budget, and operational constraints: [CONSTRAINTS]

FOCUS
${promptSeed.focus}

METHOD
1. Restate the business problem, desired outcome, and decision in one concise paragraph.
2. Separate verified facts, reasonable inferences, assumptions, and [DATA GAP] items.
3. Apply a suitable marketing framework, explain why it fits, and show the key trade-offs.
4. Develop the solution in sequenced steps, prioritizing actions that create evidence quickly.
5. Make every recommendation specific to the audience, market, channel, and operating constraints.
6. Add owners, dependencies, success measures, risks, and a clear next action.

OUTPUT
Return a decision-ready Markdown deliverable with:
- Executive summary
- Working assumptions and evidence table
- ${promptSeed.title} analysis or deliverable
- Prioritized recommendations
- Implementation checklist
- Measurement and learning plan
- Risks, approvals, and unresolved questions

QUALITY GATE
Do not invent facts, metrics, sources, customers, awards, or performance claims. Cite every external source with publisher, URL, publication date, and access date when available. If browsing or source material is unavailable, write [SOURCE NEEDED]. Keep the final business-facing copy in Brazilian Portuguese unless the requested channel requires another language. Make the result useful for a human team using Skywork, Manus, Claude, Abacus, or a comparable AI workflow.`,
  };
}

const chapters: Chapter[] = chapterBlueprints.map((blueprint) => {
  const coreItems = blueprint.coreIds
    .map((id) => corePromptLookup.get(id))
    .filter((item): item is PromptItem => Boolean(item));
  const generatedCount = Math.max(0, 10 - coreItems.length);
  const generatedItems = blueprint.seeds
    .slice(0, generatedCount)
    .map((promptSeed, index) => buildGeneratedPrompt(blueprint, promptSeed, index));

  return {
    id: blueprint.id,
    number: blueprint.number,
    label: blueprint.label,
    intro: blueprint.intro,
    icon: blueprint.icon,
    prompts: [...coreItems, ...generatedItems],
  };
});

const sourceLinks = [
  {
    label: 'OpenAI · Boas práticas de prompt engineering',
    url: 'https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api',
  },
  {
    label: 'Microsoft · Técnicas de prompt engineering',
    url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering',
  },
];

type VisualExample = {
  id: string;
  title: string;
  label: string;
  description: string;
  image: string;
  prompt: string;
};

const visualExamples: VisualExample[] = [
  {
    id: 'direcao-imagem',
    title: 'Direção de imagem para campanha',
    label: 'Imagem & efeitos visuais',
    description: 'Exemplo de como um prompt transforma intenção de campanha em composição, luz, textura e espaço para copy.',
    image: '/images/ai_agents_illustration.png',
    prompt: 'Create a premium campaign illustration with a clear focal point, cinematic lighting, controlled depth of field, and clean negative space for a headline. Preserve realistic proportions, coherent shadows, and a restrained black, white, gray, and lime palette.',
  },
  {
    id: 'artefato-executivo',
    title: 'Visual para artefato executivo',
    label: 'Dashboards & decisões',
    description: 'Exemplo de referência visual para transformar dados e decisões em uma composição executiva clara.',
    image: '/images/ai_dashboard.jpg',
    prompt: 'Design an executive visual system for a marketing performance dashboard. Use a clear hierarchy, restrained contrast, readable labels, decision-focused charts, and one highlighted recommendation. Avoid decorative noise and unsupported metrics.',
  },
  {
    id: 'sistema-ia',
    title: 'Ilustração de sistema de IA',
    label: 'Automação & operações',
    description: 'Exemplo de linguagem visual para explicar agentes, fluxos, automações e handoffs sem depender de jargão.',
    image: '/images/tess_ai_illustration.png',
    prompt: 'Create an editorial illustration explaining an AI-enabled marketing workflow: trigger, data, agent action, human approval, and final handoff. Use a refined technical aesthetic, clean connectors, consistent scale, and accessible contrast.',
  },
];

type SupercoolPrompt = PromptItem & {
  category: string;
  mode: string;
};

const supercoolPrompts: SupercoolPrompt[] = [
  {
    id: 'supercool-poster-to-3d-motion',
    category: 'Vídeo · 3D motion',
    mode: 'Upload de poster',
    title: 'Poster → 3D Motion Graphics',
    use: 'Transforma um poster de produto em um comercial vertical de 10 segundos em que o produto rompe o plano 2D e ganha volume, materiais e movimento de câmera.',
    tip: 'Suba somente o poster final. O prompt preserva produto, embalagem, logo, textos, tipografia, cores e proporções; não é um simples zoom ou parallax.',
    prompt: `Create a high-impact, premium 10-second vertical 3D commercial from the uploaded poster. The uploaded poster is the only source of truth. Keep the product, packaging, logo, text, typography, colors, proportions, numbers, prices, and claims exactly as shown. No redesign, no invented feature, no altered word, no new product, no extra brand element.

CONCEPT
The flat poster physically breaks apart and the original product bursts fully into 3D space. This must be a true dimensional breakout with visible depth, sides, materials, reflections, contact shadows, and perspective — not a weak 2.5D parallax effect, not a plain zoom, and not a generic template animation.

TIMING
0–2 seconds — BREAKOUT: start on the complete flat poster; push the camera in with energy; split the poster into dimensional layers as the product punches through the surface and crosses clearly beyond the original plane.
2–4 seconds — HERO REVEAL: orbit or dolly around the now-three-dimensional product; show realistic materials, scale, texture, reflections, and details hidden by the flat poster.
4–6 seconds — MACRO DETAIL: move into an extreme close-up of the product’s strongest real detail — condensation, metal, fabric, texture, liquid, gloss, or label detail, whichever is actually present. Use shallow depth of field and a precise rack focus.
6–8 seconds — PRODUCT MOMENT: pull back slightly and reveal the product in a confident, high-impact composition while preserving every original text element and visual claim.
8–10 seconds — FINAL LOCKUP: settle on a readable hero frame with the original poster identity intact, no new words, no altered numbers, and no invented CTA.

VISUAL DIRECTION
Photorealistic 3D rendering, cinematic lighting and shadows, premium reflections, deep perspective, controlled motion blur, shallow depth of field, realistic materials, physically coherent paper tearing, professional commercial pacing, and a new visual beat every few seconds. Match the poster’s message: refreshment becomes crisp and cool; luxury becomes slow and elegant; energy becomes fast and dynamic; taste emphasizes appetizing texture; performance emphasizes form and motion; launch or promotion builds anticipation while preserving the original copy.

HARD CONSTRAINTS
Do not use weak parallax-only motion, a plain zoom, random VFX, cartoon physics, fake reflections, duplicated objects, warped logos, altered typography, changed prices, invented claims, or a redesigned poster. Keep all original words and numbers legible. Preserve the original product identity in every shot. No spoken dialogue or voiceover in this shot. Only ambient sound and SFX.`,
  },
  {
    id: 'supercool-liquid-chrome',
    category: 'Imagem · produto',
    mode: 'Upload de imagem',
    title: 'Liquid chrome hero reveal',
    use: 'Transforma uma única foto de produto em uma cena premium com metal líquido, reflexos controlados e impacto de campanha.',
    tip: 'Suba uma imagem frontal ou em três quartos. O prompt já define luz, lente, fundo, reflexos e limites de preservação do produto.',
    prompt: `Use the uploaded product image as the only source. Preserve the exact product identity, proportions, materials, colors, logo placement, labels, and visible details. Create a premium 16:9 campaign still where liquid chrome flows around the product like a controlled wave, forming a clean pedestal and subtle reflective arcs. Use black and graphite background, one restrained Pareto-lime accent light, cinematic rim lighting, realistic contact shadow, sharp product focus, shallow depth of field, and high-end commercial photography. Keep the product fully recognizable and undistorted. Do not add text, extra logos, invented features, people, or packaging. The final image must look like a finished advertising key visual, not a concept sketch.`,
  },
  {
    id: 'supercool-prism-product',
    category: 'Imagem · efeitos',
    mode: 'Upload de imagem',
    title: 'Prism light refraction',
    use: 'Cria refrações prismáticas, halos e faixas de luz sem perder a leitura do produto ou da marca.',
    tip: 'Funciona especialmente bem com eletrônicos, cosméticos, bebidas e produtos com superfícies reflexivas.',
    prompt: `Use the uploaded product image as the only source. Keep the product exactly as photographed, including shape, texture, colors, labels, and logo. Rebuild the scene as a minimal luxury studio with transparent glass prisms, controlled rainbow refractions, soft volumetric beams, floating dust particles, and a precise spotlight on the product. Use a dark charcoal background with white, silver, and a single electric-lime highlight. Create realistic optical dispersion and reflections, but never cover the main product or make it look damaged. No text, no extra objects, no invented brand elements, no surreal deformation. Deliver a polished 4:5 social-commerce image with strong negative space for optional copy.`,
  },
  {
    id: 'supercool-ink-to-logo',
    category: 'Imagem · logo',
    mode: 'Upload de logo',
    title: 'Ink-to-light logo transformation',
    use: 'Converte um logo enviado em uma marca visual de tinta, fumaça e luz — mantendo o desenho original legível.',
    tip: 'Envie o PNG transparente do logo. O efeito é pensado para abertura de vídeo, thumbnail ou capa de campanha.',
    prompt: `Use the uploaded logo as the only source and preserve its exact geometry, lettering, spacing, and proportions. Create a dramatic 1:1 brand reveal where the logo appears to emerge from a controlled cloud of black ink and fine white particles, then becomes a crisp luminous mark with a subtle lime edge light. Keep the original logo perfectly readable and centered. Use a deep black background, realistic smoke physics, premium studio contrast, and a clean final frame. Do not redraw, spell, redesign, distort, add taglines, add symbols, or introduce any other brand. The final image must look like a finished motion-design keyframe ready for animation.`,
  },
  {
    id: 'supercool-holographic-mark',
    category: 'Imagem · logo',
    mode: 'Upload de logo',
    title: 'Holographic identity lockup',
    use: 'Gera uma versão holográfica sofisticada para logos de tecnologia, eventos e experiências digitais.',
    tip: 'O prompt já bloqueia deformação do logo e excesso de cores; basta subir o arquivo original.',
    prompt: `Use the uploaded logo as the only source. Preserve the exact logo artwork, letterforms, proportions, and negative space. Create a premium holographic presentation on a dark architectural background: thin cyan and lime scan lines, glass-like depth, a soft volumetric glow, subtle chromatic aberration at the edges, and a precise reflection below the mark. Keep the logo face readable, clean, and undistorted. Use restrained colors, realistic light behavior, and a high-end technology brand aesthetic. No extra text, no fake certification, no additional symbols, no background clutter. The output must be a finished 16:9 hero frame for a brand intro.`,
  },
  {
    id: 'supercool-sculptural-product',
    category: 'Imagem · direção',
    mode: 'Upload de imagem',
    title: 'Sculptural product orbit',
    use: 'Coloca o produto em uma escultura visual com arcos, gravidade e composição editorial.',
    tip: 'Use uma imagem com o objeto isolado ou sobre fundo simples para obter o recorte mais limpo.',
    prompt: `Use the uploaded product image as the only source and preserve the product's identity, materials, color, logo, and proportions. Place it in a sculptural editorial scene with matte black curved ribbons orbiting around it, one transparent acrylic arc, soft directional light from above, a grounded contact shadow, and a subtle lime accent reflection. The product must remain the unmistakable focal point and must not be hidden by the ribbons. Use a clean off-black background, premium art direction, realistic scale, and a 3:2 composition. Do not add text, extra products, extra logos, hands, or invented product claims.`,
  },
  {
    id: 'supercool-kinetic-poster',
    category: 'Imagem · campanha',
    mode: 'Upload de imagem',
    title: 'Kinetic poster freeze-frame',
    use: 'Cria um frame de pôster com sensação de velocidade, streaks e energia congelada.',
    tip: 'Ideal para lançamentos, esporte, entretenimento e produtos que precisam parecer rápidos e desejáveis.',
    prompt: `Use the uploaded image as the only source and preserve the main subject exactly. Create a finished 9:16 campaign freeze-frame with directional motion streaks, layered exposure trails behind the subject, controlled sparks, a clean dark-to-light gradient, and sharp focus on the original subject. Make the image feel like a high-budget commercial captured at the exact peak of movement. Keep faces, logos, product details, and proportions intact. No extra words, no random typography, no invented objects, no duplicated limbs, no warped edges. Deliver a visually complete social cover with safe negative space at the top and bottom.`,
  },
  {
    id: 'supercool-depth-parallax',
    category: 'Vídeo · 4 segundos',
    mode: 'Upload de vídeo',
    title: 'Depth parallax push-in',
    use: 'Transforma um vídeo comum em um plano curto com parallax, profundidade e câmera premium.',
    tip: 'Suba um vídeo de até alguns segundos; o prompt preserva o áudio original e trabalha apenas o movimento visual.',
    prompt: `Use the uploaded video as the only source. Preserve the original subject, identity, logo, colors, audio, and timing. Create a polished 4-second vertical motion treatment with a slow cinematic push-in, realistic depth parallax between foreground and background, subtle floating particles, a controlled lime light sweep, and gentle lens breathing. Keep the original subject sharp and stable while background layers move naturally at different speeds. No cuts, no extra text, no new people, no invented objects, no face changes, no logo deformation. End on a clean 12-frame hold that keeps the subject perfectly readable. No spoken dialogue or voiceover in this shot. Only ambient sound and SFX.`,
  },
  {
    id: 'supercool-liquid-morph',
    category: 'Vídeo · transformação',
    mode: 'Upload de vídeo',
    title: 'Liquid morph transition',
    use: 'Aplica uma transição líquida contínua que parece pronta para um anúncio de marca global.',
    tip: 'Use um vídeo com movimento claro de produto, pessoa ou logo para o efeito acompanhar a silhueta.',
    prompt: `Use the uploaded video as the only source. Preserve the original subject, motion, logo, colors, and audio. Turn the first 4 seconds into a seamless liquid-morph effect: a glossy black and silver fluid briefly wraps around the subject, follows its silhouette, creates realistic highlights, then clears to reveal the original subject unchanged. The motion must feel physically coherent, premium, and intentional, with no jump cuts and no melting of faces, hands, letters, or product geometry. Keep the original framing and finish with a crisp hero hold. No spoken dialogue or voiceover in this shot. Only ambient sound and SFX.`,
  },
  {
    id: 'supercool-glitch-scan',
    category: 'Vídeo · logo',
    mode: 'Upload de vídeo',
    title: 'Glitch scan reveal',
    use: 'Gera uma abertura de logo com scanlines, glitch controlado e recuperação limpa do desenho original.',
    tip: 'Suba um vídeo ou logo animado. O resultado é pensado para uma abertura de até quatro segundos.',
    prompt: `Use the uploaded video as the only source. Preserve the exact logo artwork, lettering, spacing, and colors. Create a finished 4-second logo reveal with restrained digital scanlines, a brief RGB split, thin lime signal traces, a single controlled glitch interruption, and a clean recovery into the original logo. Keep the logo readable for at least the final second. Motion must be sharp and rhythmic, with no random letters, no extra symbols, no redesign, no stretching, and no flicker that makes the mark unreadable. Preserve the original audio if present. No spoken dialogue or voiceover in this shot. Only ambient sound and SFX.`,
  },
  {
    id: 'supercool-light-trail',
    category: 'Vídeo · motion',
    mode: 'Upload de vídeo',
    title: 'Light-trail acceleration',
    use: 'Adiciona trilhas de luz e aceleração a um vídeo de produto sem perder o realismo do movimento.',
    tip: 'Ideal para carros, tênis, tecnologia, bebidas e qualquer produto que já tenha deslocamento no vídeo.',
    prompt: `Use the uploaded video as the only source. Preserve the original subject, camera framing, logo, colors, and audio. Add elegant long-exposure light trails that originate from the subject's real movement, accelerate for a moment, and then dissolve naturally. Use white, silver, and one restrained lime trail, realistic motion blur, coherent shadows, and a premium commercial finish. Keep the original subject sharp, correctly proportioned, and fully recognizable. Do not add text, extra products, fake reflections, impossible physics, or new camera cuts. Make the effect complete within 4 seconds. No spoken dialogue or voiceover in this shot. Only ambient sound and SFX.`,
  },
  {
    id: 'supercool-cel-shade',
    category: 'Vídeo · animação',
    mode: 'Upload de vídeo',
    title: 'Editorial cel-shade snap',
    use: 'Converte o vídeo em uma animação editorial com contornos, halftone e transição de volta ao real.',
    tip: 'Use um take estável e com boa separação do sujeito para um resultado mais limpo.',
    prompt: `Use the uploaded video as the only source. Preserve the original subject and action. Create a polished 4-second editorial animation treatment: for the first two seconds, apply clean cel-shading, controlled halftone texture, bold but accurate contour lines, and graphic shadow blocks; then smoothly transition back to the original realistic footage for the final two seconds. Preserve faces, logos, product geometry, colors, and timing. Keep the transition fluid and intentional, not noisy. No new characters, no extra text, no invented objects, and no deformation. Preserve the original audio if present. No spoken dialogue or voiceover in this shot. Only ambient sound and SFX.`,
  },
  {
    id: 'supercool-particle-bloom',
    category: 'Vídeo · atmosfera',
    mode: 'Upload de vídeo',
    title: 'Particle bloom impact',
    use: 'Cria um impacto visual de partículas que nasce do próprio sujeito e termina com uma imagem limpa.',
    tip: 'Funciona bem para lançamentos, eventos, logos e produtos fotografados com espaço ao redor.',
    prompt: `Use the uploaded video as the only source. Preserve the original subject, colors, logo, timing, and audio. Add a premium particle bloom that begins at the subject's edges, expands in a controlled wave, catches light like fine metallic dust, and gently settles before the final frame. Use a dark cinematic grade, white and silver particles, one subtle lime glint, realistic depth of field, and smooth temporal motion. Keep the subject readable and unchanged throughout. No explosions, no smoke covering the subject, no extra objects, no text, no fake claims, and no camera cuts. Complete the full effect in 4 seconds. No spoken dialogue or voiceover in this shot. Only ambient sound and SFX.`,
  },
  {
    id: 'supercool-portal-reveal',
    category: 'Vídeo · storytelling',
    mode: 'Upload de imagem ou vídeo',
    title: 'Portal reveal with final lockup',
    use: 'Transforma uma imagem ou vídeo em uma mini-narrativa visual de entrada, revelação e assinatura final.',
    tip: 'Use uma imagem ou vídeo de logo, produto ou pessoa; o prompt já define a sequência completa.',
    prompt: `Use the uploaded image or video as the only source. Create a complete 4-second visual story in one continuous shot: begin with a dark circular portal of soft volumetric light, reveal the original subject through the portal with a subtle camera push, add a controlled orbit of thin luminous lines around the subject, and finish with a clean centered hero lockup. Preserve the exact identity, face, logo, colors, proportions, and original details. Use premium black, graphite, white, and one lime accent. No extra text, no invented symbols, no duplicated elements, no cuts, no deformation, and no fake brand association. Keep the final frame readable for one second. No spoken dialogue or voiceover in this shot. Only ambient sound and SFX.`,
  },
];

type SupercoolDemo = {
  id: string;
  title: string;
  label: string;
  description: string;
  asset: string;
  kind: 'image' | 'video';
  effect: string;
  filter: string;
};

const supercoolDemos: SupercoolDemo[] = [
  {
    id: 'puma-chrome',
    title: 'Logo em liquid chrome',
    label: 'Antes → depois · demonstração conceitual',
    description: 'A mesma marca, com leitura preservada e uma camada de metal líquido para uma abertura premium.',
    asset: '/images/logos/logo_puma.svg',
    kind: 'image',
    effect: 'drop-shadow(0 0 16px rgba(203,236,46,.9)) brightness(1.45) contrast(1.15)',
    filter: 'grayscale(1) contrast(.8) brightness(1.3)',
  },
  {
    id: 'spotify-hologram',
    title: 'Logo em holografia',
    label: 'Antes → depois · demonstração conceitual',
    description: 'Scanlines, glow e profundidade de vidro para testar um reveal de marca em quatro segundos.',
    asset: '/images/logos/logo_spotify.svg',
    kind: 'image',
    effect: 'drop-shadow(0 0 18px rgba(126,255,219,.9)) saturate(1.8) brightness(1.35)',
    filter: 'grayscale(1) brightness(1.8)',
  },
  {
    id: 'nvidia-scan',
    title: 'Logo com scan digital',
    label: 'Antes → depois · demonstração conceitual',
    description: 'Uma aplicação visual para testar glitch controlado, linhas de sinal e final limpo.',
    asset: '/images/logos/logo_nvidia.svg',
    kind: 'image',
    effect: 'drop-shadow(0 0 14px rgba(203,236,46,.95)) saturate(1.5) brightness(1.25)',
    filter: 'grayscale(1) brightness(1.5)',
  },
  {
    id: 'abstract-motion',
    title: 'Vídeo com parallax e light trails',
    label: 'Preview · primeiros 4 segundos',
    description: 'Preview curto de motion para visualizar ritmo, profundidade e trilhas de luz antes de aplicar o prompt ao seu vídeo.',
    asset: '/images/supercool-preview-4s.jpg',
    kind: 'image',
    effect: 'contrast(1.16) saturate(1.18) brightness(1.08)',
    filter: 'grayscale(.7) brightness(.8)',
  },
];

const sectionTitleStyle: CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontWeight: 500,
  letterSpacing: '-0.04em',
};

function PromptCard({
  item,
  copied,
  onCopy,
}: {
  item: PromptItem;
  copied: boolean;
  onCopy: (item: PromptItem) => void;
}) {
  return (
    <article style={{
      background: WHITE,
      border: `1px solid ${G100}`,
      borderRadius: 18,
      overflow: 'hidden',
      boxShadow: '0 18px 55px rgba(19,16,12,0.08)',
      breakInside: 'avoid',
    }}>
      <div style={{ padding: '24px 24px 18px', borderBottom: `1px solid ${G100}` }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 16,
        }}>
          <div>
            <div style={{
              color: LIME_DIM,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}>
              Prompt operacional · inglês-US
            </div>
            <h3 style={{
              ...sectionTitleStyle,
              margin: 0,
              color: G900,
              fontSize: 'clamp(1.45rem, 3vw, 2rem)',
              lineHeight: 1.05,
            }}>
              {item.title}
            </h3>
          </div>
          <button
            onClick={() => onCopy(item)}
            aria-label={`Copiar ${item.title}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              flexShrink: 0,
              padding: '9px 12px',
              borderRadius: 8,
              border: `1px solid ${G200}`,
              background: copied ? G900 : OFF,
              color: copied ? LIME : G900,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
            }}>
            {copied ? <Check size={14} /> : <Clipboard size={14} />}
            {copied ? 'Copiado' : 'Copiar'}
          </button>
        </div>
        <p style={{
          margin: '16px 0 0',
          color: G600,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          lineHeight: 1.65,
        }}>
          {item.use}
        </p>
      </div>
      <div style={{ padding: 24, background: '#FCFBF9' }}>
        <pre style={{
          margin: 0,
          color: G800,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          lineHeight: 1.68,
          whiteSpace: 'pre-wrap',
          overflowWrap: 'anywhere',
        }}>
          {item.prompt}
        </pre>
      </div>
      <div style={{
        display: 'flex',
        gap: 10,
        padding: '16px 24px 20px',
        borderTop: `1px solid ${G100}`,
        color: G600,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13,
        lineHeight: 1.55,
      }}>
        <Zap size={16} color={LIME_DIM} style={{ flexShrink: 0, marginTop: 2 }} />
        <span><strong style={{ color: G900 }}>Como usar:</strong> {item.tip}</span>
      </div>
    </article>
  );
}

function SupercoolPromptCard({
  item,
  copied,
  onCopy,
}: {
  item: SupercoolPrompt;
  copied: boolean;
  onCopy: (item: PromptItem) => void;
}) {
  return (
    <article style={{
      background: '#171713',
      color: WHITE,
      border: '1px solid rgba(203,236,46,0.22)',
      borderRadius: 18,
      overflow: 'hidden',
      boxShadow: '0 18px 55px rgba(19,16,12,0.16)',
      breakInside: 'avoid',
    }}>
      <div style={{ padding: '22px 22px 17px', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 12,
        }}>
          <div>
            <div style={{
              color: LIME,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}>
              {item.category} · {item.mode}
            </div>
            <h3 style={{
              ...sectionTitleStyle,
              margin: 0,
              color: WHITE,
              fontSize: 'clamp(1.3rem, 2.8vw, 1.85rem)',
              lineHeight: 1.05,
            }}>
              {item.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onCopy(item)}
            aria-label={`Copiar ${item.title}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              flexShrink: 0,
              padding: '8px 10px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.18)',
              background: copied ? LIME : 'rgba(255,255,255,0.06)',
              color: copied ? G900 : WHITE,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10,
              fontWeight: 700,
              cursor: 'pointer',
            }}>
            {copied ? <Check size={13} /> : <Clipboard size={13} />}
            {copied ? 'Copiado' : 'Copiar'}
          </button>
        </div>
        <p style={{
          margin: '14px 0 0',
          color: 'rgba(255,255,255,0.68)',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          lineHeight: 1.58,
        }}>
          {item.use}
        </p>
      </div>
      <div style={{ padding: 20, background: '#0F100D' }}>
        <pre style={{
          margin: 0,
          color: '#F5F3EF',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          lineHeight: 1.62,
          whiteSpace: 'pre-wrap',
          overflowWrap: 'anywhere',
        }}>
          {item.prompt}
        </pre>
      </div>
      <div style={{
        display: 'flex',
        gap: 9,
        padding: '14px 20px 17px',
        borderTop: '1px solid rgba(255,255,255,0.12)',
        color: 'rgba(255,255,255,0.62)',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 12,
        lineHeight: 1.5,
      }}>
        <Zap size={15} color={LIME} style={{ flexShrink: 0, marginTop: 2 }} />
        <span><strong style={{ color: WHITE }}>Como usar:</strong> {item.tip}</span>
      </div>
    </article>
  );
}

function SupercoolDemoCard({ demo }: { demo: SupercoolDemo }) {
  const media = (after: boolean) => demo.kind === 'video' ? (
    <video
      src={demo.asset}
      autoPlay
      muted
      loop
      playsInline
      onTimeUpdate={(event) => {
        const video = event.currentTarget;
        if (video.currentTime >= 4) video.currentTime = 0;
      }}
      aria-label={`${demo.title} — ${after ? 'depois' : 'antes'}`}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
        filter: after ? demo.effect : demo.filter,
      }}
    />
  ) : (
    <img
      src={demo.asset}
      alt={`${demo.title} — ${after ? 'depois' : 'antes'}`}
      style={{
        width: '72%',
        height: '72%',
        objectFit: 'contain',
        display: 'block',
        filter: after ? demo.effect : demo.filter,
      }}
    />
  );

  return (
    <article style={{
      overflow: 'hidden',
      borderRadius: 16,
      border: `1px solid ${G100}`,
      background: WHITE,
      boxShadow: '0 14px 40px rgba(19,16,12,0.08)',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: G100 }}>
        <div style={{ position: 'relative', minHeight: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ECE9E3' }}>
          <div style={{
            position: 'absolute',
            left: 12,
            top: 10,
            zIndex: 1,
            padding: '4px 7px',
            borderRadius: 99,
            background: 'rgba(19,16,12,0.72)',
            color: WHITE,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 8,
            letterSpacing: '0.12em',
          }}>
            ANTES
          </div>
          {media(false)}
        </div>
        <div style={{ position: 'relative', minHeight: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#161712' }}>
          <div style={{
            position: 'absolute',
            left: 12,
            top: 10,
            zIndex: 1,
            padding: '4px 7px',
            borderRadius: 99,
            background: LIME,
            color: G900,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 8,
            fontWeight: 700,
            letterSpacing: '0.12em',
          }}>
            DEPOIS
          </div>
          {media(true)}
        </div>
      </div>
      <div style={{ padding: '15px 16px 17px' }}>
        <div style={{
          color: LIME_DIM,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: 7,
        }}>
          {demo.label}
        </div>
        <h3 style={{
          margin: 0,
          color: G900,
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 16,
          lineHeight: 1.2,
        }}>
          {demo.title}
        </h3>
        <p style={{
          margin: '8px 0 0',
          color: G600,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          lineHeight: 1.5,
        }}>
          {demo.description}
        </p>
      </div>
    </article>
  );
}

export default function ConteudoSobreIA() {
  const [copied, setCopied] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visualPreview, setVisualPreview] = useState<VisualExample | null>(null);
  const promptCount = chapters.reduce((total, chapter) => total + chapter.prompts.length, 0);

  useEffect(() => {
    const titleBefore = document.title;
    const pageUrl = 'https://pareto.business/#/conteudo-sobre-ia';
    const description = 'Biblioteca premium com 200 prompts em inglês-US para estratégia, copywriting, campanhas, SEO, GEO, imagem, vídeo, automação e artefatos executivos. Curadoria de Prof. Me. Wellington Queiroz, professor, palestrante e CEO / Head of AI Marketing da Pareto Plus.';
    const metaUpdates = [
      { selector: 'meta[name="description"]', attrs: { name: 'description' }, content: description },
      { selector: 'meta[name="keywords"]', attrs: { name: 'keywords' }, content: 'IA aplicada ao marketing no Brasil, prompts de marketing, prompt engineering, GEO, SEO, AI marketing, inteligência artificial para marketing, Prof. Wellington Queiroz, Pareto Plus, automação de marketing, criatividade com IA' },
      { selector: 'meta[name="author"]', attrs: { name: 'author' }, content: 'Prof. Me. Wellington Queiroz — CEO / Head of AI Marketing, Pareto Plus' },
      { selector: 'meta[property="og:title"]', attrs: { property: 'og:title' }, content: 'Conteúdo Sobre IA | 200 Prompts de Marketing com IA — Pareto Plus' },
      { selector: 'meta[property="og:description"]', attrs: { property: 'og:description' }, content: description },
      { selector: 'meta[property="og:url"]', attrs: { property: 'og:url' }, content: pageUrl },
      { selector: 'meta[property="og:type"]', attrs: { property: 'og:type' }, content: 'article' },
      { selector: 'meta[name="twitter:title"]', attrs: { name: 'twitter:title' }, content: '200 Prompts de Marketing com IA | Pareto Plus' },
      { selector: 'meta[name="twitter:description"]', attrs: { name: 'twitter:description' }, content: description },
      { selector: 'meta[name="robots"]', attrs: { name: 'robots' }, content: 'index, follow, max-image-preview:large' },
    ];
    const previousMeta = new Map<string, { element: HTMLMetaElement | null; content: string | null }>();
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const canonicalBefore = canonical?.getAttribute('href') ?? null;

    metaUpdates.forEach(({ selector, attrs, content }) => {
      const current = document.head.querySelector<HTMLMetaElement>(selector);
      previousMeta.set(selector, { element: current, content: current?.getAttribute('content') ?? null });
      const element = current ?? document.createElement('meta');
      Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
      element.setAttribute('content', content);
      if (!current) document.head.appendChild(element);
    });
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
            description: 'Pareto Plus — IA aplicada ao marketing e implementação de inteligência artificial para negócios no Brasil.',
            areaServed: { '@type': 'Country', name: 'Brazil' },
          },
          {
            '@type': 'Article',
            '@id': `${pageUrl}#article`,
            headline: 'Conteúdo Sobre IA — 200 prompts de marketing aplicados',
            description,
            inLanguage: 'pt-BR',
            url: pageUrl,
            author: { '@id': `${pageUrl}#author` },
            publisher: { '@id': 'https://pareto.business/#organization' },
            about: ['Artificial intelligence', 'Marketing', 'Prompt engineering', 'Generative AI'],
            keywords: 'IA aplicada ao marketing, prompts de marketing, SEO, GEO, automação',
          },
          {
            '@type': 'Person',
            '@id': `${pageUrl}#author`,
            name: 'Prof. Me. Wellington Queiroz',
            jobTitle: 'CEO / Head of AI Marketing',
            description: 'Professor, palestrante e executivo especializado em IA aplicada ao marketing no Brasil.',
            worksFor: { '@type': 'Organization', name: 'Pareto Plus', url: 'https://pareto.business/' },
            knowsAbout: ['AI Applied to Marketing', 'Prompt Engineering', 'Generative AI', 'Marketing Strategy', 'GEO', 'SEO'],
            knowsLanguage: ['pt-BR', 'en-US'],
          },
        ],
      }).replace(/</g, '\\u003c');
    }

    document.title = 'Conteúdo Sobre IA | 200 Prompts de Marketing com IA — Pareto Plus';

    return () => {
      document.title = titleBefore;
      previousMeta.forEach(({ element, content }, selector) => {
        if (element && content !== null) element.setAttribute('content', content);
        else if (element && content === null) element.removeAttribute('content');
        else document.head.querySelector(selector)?.remove();
      });
      if (canonical && canonicalBefore !== null) canonical.href = canonicalBefore;
      if (structuredData && structuredBefore !== null) structuredData.textContent = structuredBefore;
    };
  }, []);

  const copyPrompt = async (item: PromptItem) => {
    try {
      await navigator.clipboard.writeText(item.prompt);
      setCopied(item.id);
      window.setTimeout(() => setCopied((current) => current === item.id ? null : current), 1800);
    } catch {
      setCopied(null);
    }
  };

  const scrollToChapter = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main style={{ background: OFF, color: G900, minHeight: '100vh', paddingTop: 56 }}>
      <style>{`
        .prompt-visual-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .prompt-visual-modal-grid { grid-template-columns: minmax(0, 1.1fr) minmax(260px, 0.9fr); }
        .supercool-demo-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .supercool-prompt-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        @media (max-width: 1060px) {
          .supercool-demo-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 820px) {
          .prompt-visual-grid { grid-template-columns: 1fr; }
          .prompt-visual-modal-grid { grid-template-columns: 1fr; }
          .supercool-demo-grid,
          .supercool-prompt-grid { grid-template-columns: 1fr !important; }
          .prompt-supercool > div > div:first-child { grid-template-columns: 1fr !important; }
          .prompt-hero-featured { align-items: flex-start !important; flex-wrap: wrap; }
          .prompt-hero-featured button { margin-left: 56px !important; }
          .prompt-hero-video { opacity: 0.18 !important; }
          .prompt-hero { padding-bottom: 52px !important; }
          .prompt-hero-grid { grid-template-columns: 1fr !important; }
          .prompt-hero-media-column { justify-items: start !important; }
          .prompt-hero-vertical-media { width: min(100%, 260px) !important; }
          .prompt-shell { grid-template-columns: 1fr !important; }
          .prompt-sidebar {
            position: relative !important;
            top: auto !important;
            max-height: 250px !important;
            overflow-y: auto !important;
            overscroll-behavior: contain;
          }
        }
        .prompt-print-cover,
        .prompt-print-toc {
          display: none;
        }
        .prompt-hero-vertical-media { width: min(100%, 240px) !important; }
        .prompt-hero-media-column > div:last-child { width: min(100%, 240px) !important; }
        @media (max-width: 820px) {
          .prompt-hero-vertical-media { width: min(100%, 260px) !important; }
          .prompt-hero-media-column > div:last-child { width: min(100%, 100%) !important; }
        }
        @media print {
          @page {
            size: A4;
            margin: 20mm;
          }
          html {
            background: #ffffff !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          header, footer, .prompt-no-print, .prompt-sidebar, .prompt-copy-button, .prompt-progress { display: none !important; }
          main { padding-top: 0 !important; background: white !important; }
          .prompt-hero, .prompt-visual-examples { display: none !important; }
          .prompt-print-cover {
            display: flex !important;
            min-height: 245mm;
            box-sizing: border-box;
            flex-direction: column;
            justify-content: space-between;
            break-after: page;
            page-break-after: always;
            padding: 28mm 16mm 30mm;
            background: #13100C !important;
            color: #ffffff !important;
          }
          .prompt-print-cover * { color: #ffffff !important; }
          .prompt-print-cover .prompt-print-accent { color: #CBEC2E !important; }
          .prompt-print-toc {
            display: block !important;
            min-height: 245mm;
            box-sizing: border-box;
            break-after: page;
            page-break-after: always;
            padding: 8mm 0 0;
            break-inside: avoid;
            page-break-inside: avoid;
          }
          .prompt-print-toc h2 { margin: 0 0 7mm; }
          .prompt-print-toc-list { display: grid; gap: 0; }
          .prompt-print-toc-list a {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            gap: 12mm;
            padding: 4mm 0;
            border-bottom: 1px solid #DDD7CF;
            color: #13100C !important;
            text-decoration: none;
            font-size: 11pt;
          }
          .prompt-print-toc-list a span:last-child {
            color: #4A4540 !important;
            font-size: 9pt;
            white-space: nowrap;
          }
          .prompt-shell { display: block !important; }
          .prompt-content { width: 100% !important; }
          .prompt-framework { break-before: page; page-break-before: always; }
          .prompt-chapter {
            break-before: page;
            page-break-before: always;
            scroll-margin-top: 0 !important;
          }
          .prompt-chapter:first-of-type { break-before: auto; page-break-before: auto; }
          .prompt-chapter > div:first-child { break-inside: avoid; page-break-inside: avoid; }
          .prompt-card { box-shadow: none !important; border: 1px solid #BFB8AE !important; page-break-inside: avoid; }
          .prompt-card pre { font-size: 8.5pt !important; line-height: 1.5 !important; }
          .prompt-card > div { border-radius: 0 !important; }
          .prompt-content section { max-width: none !important; }
          a { color: #13100C !important; }
        }
      `}</style>

      <section className="prompt-print-cover" aria-hidden="true">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20 }}>
          <img src="/images/brand/pareto-logo-light.png" alt="" style={{ width: 170, height: 'auto' }} />
          <span className="prompt-print-accent" style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
          }}>
            E-book · edição 2026–2027
          </span>
        </div>
        <div style={{ maxWidth: 150 }}>
          <div className="prompt-print-accent" style={{
            marginBottom: 12,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            Pareto Plus · Editorial AI
          </div>
          <h1 style={{
            margin: 0,
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(44px, 8vw, 78px)',
            lineHeight: 0.92,
            letterSpacing: '-0.05em',
          }}>
            Conteúdo<br /><span className="prompt-print-accent">Sobre IA.</span>
          </h1>
          <p style={{
            margin: '18mm 0 0',
            maxWidth: 125,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.76)',
          }}>
            200 prompts operacionais para marketing, negócios, criatividade e produção de artefatos com inteligência artificial.
          </p>
        </div>
      </section>

      <section className="prompt-print-toc" aria-label="Índice do e-book">
        <div style={{
          color: LIME_DIM,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginBottom: 7,
        }}>
          Conteúdo Sobre IA · índice
        </div>
        <h2 style={{
          ...sectionTitleStyle,
          color: G900,
          fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
          lineHeight: 0.98,
        }}>
          Seções e categorias de prompts
        </h2>
        <p style={{
          maxWidth: 560,
          margin: '0 0 9mm',
          color: G600,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          lineHeight: 1.6,
        }}>
          Clique em uma seção no PDF para ir diretamente ao capítulo correspondente. Cada categoria reúne prompts em inglês-US, orientação em português e critérios de aplicação.
        </p>
        <nav className="prompt-print-toc-list">
          {chapters.map((chapter) => (
            <a key={chapter.id} href={`#${chapter.id}`}>
              <span><strong style={{ color: LIME_DIM, marginRight: 10 }}>{chapter.number}</strong>{chapter.label}</span>
              <span>{chapter.prompts.length} prompts</span>
            </a>
          ))}
        </nav>
      </section>

      <section className="prompt-hero" style={{
        position: 'relative',
        overflow: 'hidden',
        background: G900,
        color: WHITE,
        padding: 'clamp(22px, 2.2vw, 32px) 24px 12px',
      }}>
        <video
          className="prompt-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/supercool-poster-3d-poster.jpg"
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: 0.24,
            filter: 'saturate(0.86) contrast(1.06)',
            pointerEvents: 'none',
          }}>
          <source src="/videos/supercool-poster-3d-bg.webm" type="video/webm" />
          <source src="/videos/supercool-poster-3d-bg.mp4" type="video/mp4" />
        </video>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(19,16,12,0.96) 0%, rgba(19,16,12,0.82) 44%, rgba(19,16,12,0.56) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          width: 700,
          height: 700,
          right: '-18%',
          top: '-45%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(203,236,46,0.18) 0%, rgba(203,236,46,0) 68%)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.16,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'linear-gradient(to bottom, black, transparent)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 18,
            marginBottom: 18,
          }}>
            <div style={{
              color: LIME,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}>
              Pareto Plus · Editorial AI
            </div>
            <a
              className="prompt-no-print"
              href={ebookPdfPath}
              download
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                border: '1px solid rgba(255,255,255,0.24)',
                borderRadius: 8,
                padding: '10px 13px',
                color: WHITE,
                background: 'rgba(255,255,255,0.06)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                cursor: 'pointer',
                textDecoration: 'none',
              }}>
              <FileText size={15} />
              Baixar e-book em PDF
            </a>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(280px, 0.85fr)',
            gap: 'clamp(34px, 8vw, 110px)',
            alignItems: 'start',
          }} className="prompt-hero-grid">
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '7px 12px',
                marginBottom: 22,
                border: '1px solid rgba(203,236,46,0.3)',
                borderRadius: 99,
                color: LIME,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                <Sparkles size={13} />
                Biblioteca de prompts de negócios 2026–2027 · {promptCount} prompts
              </div>
              <h1 style={{
                ...sectionTitleStyle,
                margin: 0,
                maxWidth: 800,
                color: WHITE,
                fontSize: 'clamp(2.8rem, 7vw, 6rem)',
                lineHeight: 0.92,
              }}>
                Conteúdo<br /><span style={{ color: LIME }}>Sobre IA.</span>
              </h1>
              <p style={{
                maxWidth: 700,
                margin: '28px 0 0',
                color: 'rgba(255,255,255,0.76)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(1rem, 2vw, 1.22rem)',
                lineHeight: 1.72,
              }}>
                Uma biblioteca editorial para profissionais de marketing que precisam transformar
                estratégia, pesquisa e criatividade em entregáveis reais — com mais velocidade,
                clareza e critério.
              </p>
              <p style={{
                margin: '20px 0 0',
                color: 'rgba(255,255,255,0.55)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                lineHeight: 1.7,
              }}>
                Criado por <strong style={{ color: 'rgba(255,255,255,0.86)' }}>Prof. Me. Wellington Queiroz</strong> · professor, palestrante profissional e
                referência brasileira em IA aplicada ao marketing · CEO / Head of AI Marketing · Pareto Plus
              </p>
              <div className="prompt-hero-featured" style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                maxWidth: 680,
                marginTop: 24,
                padding: '14px 15px',
                border: '1px solid rgba(203,236,46,0.36)',
                borderRadius: 13,
                background: 'rgba(19,16,12,0.58)',
                backdropFilter: 'blur(10px)',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 42,
                  height: 42,
                  flexShrink: 0,
                  borderRadius: 10,
                  background: LIME,
                  color: G900,
                }}>
                  <Video size={19} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{
                    color: LIME,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    marginBottom: 4,
                  }}>
                    Destaque Supercool
                  </div>
                  <div style={{
                    color: WHITE,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 16,
                    lineHeight: 1.2,
                  }}>
                    Poster → 3D Motion Graphics
                  </div>
                  <div style={{
                    marginTop: 4,
                    color: 'rgba(255,255,255,.62)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    lineHeight: 1.4,
                  }}>
                    Um poster de produto rompendo o plano 2D em um comercial vertical de 10 segundos.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToChapter('supercool-prompts')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    flexShrink: 0,
                    marginLeft: 'auto',
                    padding: '9px 11px',
                    border: '1px solid rgba(203,236,46,.55)',
                    borderRadius: 8,
                    background: 'transparent',
                    color: LIME,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}>
                  Ver prompt <ArrowRight size={13} />
                </button>
              </div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 8,
                marginTop: 18,
              }}>
                {['AI Applied to Marketing', 'Prompt Engineering', 'GEO & SEO para negócios'].map((item) => (
                  <span key={item} style={{
                    border: '1px solid rgba(203,236,46,0.28)',
                    borderRadius: 999,
                    padding: '6px 10px',
                    color: 'rgba(255,255,255,0.74)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                  }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="prompt-hero-media-column" style={{
              display: 'grid',
              justifyItems: 'end',
              gap: 16,
            }}>
              <div className="prompt-hero-vertical-media" style={{
                position: 'relative',
                width: 'min(100%, 300px)',
                aspectRatio: '9 / 16',
                overflow: 'hidden',
                borderRadius: 18,
                border: '1px solid rgba(203,236,46,0.4)',
                background: '#070706',
                boxShadow: '0 24px 70px rgba(0,0,0,0.34)',
              }}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/images/supercool-poster-3d-poster.jpg"
                  aria-label="Demonstração vertical do efeito Poster para 3D Motion Graphics"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}>
                  <source src="/videos/supercool-poster-3d-bg.webm" type="video/webm" />
                  <source src="/videos/supercool-poster-3d-bg.mp4" type="video/mp4" />
                </video>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(19,16,12,0.04) 48%, rgba(19,16,12,0.8) 100%)',
                  pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'absolute',
                  left: 14,
                  right: 14,
                  bottom: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 10,
                }}>
                  <span style={{
                    color: LIME,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                  }}>
                    9:16 · preview
                  </span>
                  <span style={{
                    color: 'rgba(255,255,255,.72)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                  }}>
                    sem áudio
                  </span>
                </div>
              </div>
              <div style={{
                width: 'min(100%, 300px)',
                padding: 20,
                borderRadius: 18,
                border: '1px solid rgba(255,255,255,0.14)',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(16px)',
              }}>
              <div style={{
                color: BLUE,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.13em',
                textTransform: 'uppercase',
                marginBottom: 14,
              }}>
                O método em uma linha
              </div>
              <p style={{
                margin: 0,
                color: WHITE,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 20,
                lineHeight: 1.35,
              }}>
                Contexto certo → processo explícito → output revisável.
              </p>
              <div style={{
                display: 'grid',
                gap: 10,
                marginTop: 22,
              }}>
                {['Prompts em inglês-US', 'Orientação e checklists em pt-BR', 'Prontos para adaptar e copiar'].map((item) => (
                  <div key={item} style={{
                    display: 'flex',
                    gap: 9,
                    alignItems: 'center',
                    color: 'rgba(255,255,255,0.72)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                  }}>
                    <Check size={15} color={LIME} />
                    {item}
                  </div>
                ))}
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '38px 24px 0' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div className="prompt-no-print" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            padding: '15px 18px',
            background: WHITE,
            border: `1px solid ${G100}`,
            borderRadius: 12,
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              color: G600,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
            }}>
              <BookOpen size={17} color={LIME_DIM} />
              Navegue por capítulo ou use a busca do navegador para encontrar um prompt.
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                border: 'none',
                background: 'none',
                color: G900,
                cursor: 'pointer',
              }}
              className="prompt-mobile-menu-button">
              {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </section>

      <section className="prompt-visual-examples" style={{ padding: '42px 24px 0' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 20,
            marginBottom: 20,
          }}>
            <div>
              <div style={{
                color: LIME_DIM,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: 8,
              }}>
                Exemplos visuais
              </div>
              <h2 style={{
                ...sectionTitleStyle,
                margin: 0,
                color: G900,
                fontSize: 'clamp(1.9rem, 4vw, 3rem)',
                lineHeight: 1,
              }}>
                Veja o tipo de resultado que o prompt pode orientar.
              </h2>
            </div>
            <p style={{
              maxWidth: 370,
              margin: 0,
              color: G600,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              lineHeight: 1.6,
            }}>
              Abra um exemplo para visualizar a referência e copiar a instrução-base. As imagens são demonstrações de direção — não substituem a revisão humana nem os assets oficiais de uma marca.
            </p>
          </div>
          <div className="prompt-visual-grid" style={{
            display: 'grid',
            gap: 16,
          }}>
            {visualExamples.map((example) => (
              <button
                key={example.id}
                type="button"
                onClick={() => setVisualPreview(example)}
                style={{
                  padding: 0,
                  border: `1px solid ${G100}`,
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: WHITE,
                  textAlign: 'left',
                  cursor: 'pointer',
                  boxShadow: '0 12px 34px rgba(19,16,12,0.07)',
                }}
                aria-label={`Abrir exemplo: ${example.title}`}>
                <div style={{ height: 170, background: G900 }}>
                  <img
                    src={example.image}
                    alt={example.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div style={{ padding: '16px 17px 18px' }}>
                  <div style={{
                    color: LIME_DIM,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.11em',
                    textTransform: 'uppercase',
                    marginBottom: 8,
                  }}>
                    {example.label}
                  </div>
                  <div style={{
                    color: G900,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 15,
                    fontWeight: 600,
                    lineHeight: 1.3,
                  }}>
                    {example.title}
                  </div>
                  <div style={{
                    marginTop: 9,
                    color: G600,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    lineHeight: 1.55,
                  }}>
                    Abrir exemplo →
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="supercool-prompts" className="prompt-supercool prompt-no-print" style={{
        marginTop: 58,
        padding: '72px 24px 78px',
        background: G900,
        color: WHITE,
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.1fr) minmax(260px, .9fr)',
            gap: 'clamp(28px, 7vw, 90px)',
            alignItems: 'end',
            marginBottom: 30,
          }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                color: LIME,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}>
                <Sparkles size={14} />
                Laboratório visual · subseção especial
              </div>
              <h2 style={{
                ...sectionTitleStyle,
                margin: 0,
                color: WHITE,
                fontSize: 'clamp(2.3rem, 5vw, 4.8rem)',
                lineHeight: .94,
              }}>
                Supercool<br /><span style={{ color: LIME }}>Prompts.</span>
              </h2>
              <p style={{
                maxWidth: 660,
                margin: '22px 0 0',
                color: 'rgba(255,255,255,.72)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                lineHeight: 1.65,
              }}>
                Prompts completos para transformar uma única imagem ou vídeo em efeitos de liquid chrome, holografia, glitch, parallax, light trails, partículas e animações editoriais. Suba o arquivo, cole o prompt e deixe o modelo executar a direção visual.
              </p>
            </div>
            <div style={{
              padding: 20,
              border: '1px solid rgba(203,236,46,.28)',
              borderRadius: 14,
              background: 'rgba(255,255,255,.05)',
            }}>
              <div style={{
                color: LIME,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                marginBottom: 9,
              }}>
                Regra de uso
              </div>
              <p style={{
                margin: 0,
                color: 'rgba(255,255,255,.78)',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 18,
                lineHeight: 1.35,
              }}>
                Um upload. Um prompt fechado. Um resultado visual pronto para revisar.
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 15,
            color: 'rgba(255,255,255,.62)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            letterSpacing: '.12em',
            textTransform: 'uppercase',
          }}>
            <span style={{ width: 28, height: 1, background: LIME, display: 'inline-block' }} />
            Antes → depois · veja a linguagem do efeito
          </div>
          <div className="supercool-demo-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: 14,
            marginBottom: 50,
          }}>
            {supercoolDemos.map((demo) => <SupercoolDemoCard key={demo.id} demo={demo} />)}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'end',
            gap: 18,
            marginBottom: 18,
          }}>
            <div>
              <div style={{
                color: LIME,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                marginBottom: 8,
              }}>
                Biblioteca pronta
              </div>
              <h3 style={{
                ...sectionTitleStyle,
                margin: 0,
                color: WHITE,
                fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
                lineHeight: 1,
              }}>
                12 prompts para efeitos que chamam atenção.
              </h3>
            </div>
            <p style={{
              maxWidth: 330,
              margin: 0,
              color: 'rgba(255,255,255,.58)',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              lineHeight: 1.55,
            }}>
              Os exemplos usam assets públicos já presentes no site apenas para demonstração conceitual. Não representam parceria ou endosso das marcas exibidas.
            </p>
          </div>
          <div className="supercool-prompt-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 16,
          }}>
            {supercoolPrompts.map((item) => (
              <SupercoolPromptCard
                key={item.id}
                item={item}
                copied={copied === item.id}
                onCopy={copyPrompt}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="prompt-body" style={{ padding: '54px 24px 88px' }}>
        <div className="prompt-shell" style={{
          maxWidth: 1180,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '250px minmax(0, 1fr)',
          gap: 'clamp(28px, 6vw, 72px)',
          alignItems: 'start',
        }}>
          <aside className="prompt-sidebar prompt-no-print" aria-label="Índice navegável dos capítulos" style={{
            position: 'sticky',
            top: 90,
            display: 'grid',
            gap: 7,
            maxHeight: 'calc(100vh - 118px)',
            overflowY: 'auto',
            overscrollBehavior: 'contain',
            paddingRight: 8,
            scrollbarGutter: 'stable',
          }}>
            <div style={{
              padding: '0 0 12px 12px',
              color: G400,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
            }}>
              Índice editorial
            </div>
            <button
              type="button"
              onClick={() => scrollToChapter('supercool-prompts')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                padding: '10px 12px',
                border: '1px solid rgba(203,236,46,0.35)',
                borderRadius: 8,
                background: G900,
                color: LIME,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                textAlign: 'left',
                cursor: 'pointer',
              }}>
              <Sparkles size={15} />
              Supercool Prompts
            </button>
            {chapters.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => scrollToChapter(chapter.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                  padding: '10px 12px',
                  border: 'none',
                  borderRadius: 8,
                  background: 'transparent',
                  color: G600,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.background = WHITE;
                  event.currentTarget.style.color = G900;
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.background = 'transparent';
                  event.currentTarget.style.color = G600;
                }}>
                <span style={{
                  color: LIME_DIM,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  fontWeight: 700,
                }}>
                  {chapter.number}
                </span>
                {chapter.label}
              </button>
            ))}
          </aside>

          <div className="prompt-content">
            <section className="prompt-framework" style={{
              marginBottom: 66,
              padding: '28px 30px',
              background: G900,
              borderRadius: 18,
              color: WHITE,
            }}>
              <div style={{
                color: LIME,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}>
                Framework universal
              </div>
              <h2 style={{
                ...sectionTitleStyle,
                margin: '0 0 14px',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: 1,
              }}>
                O prompt é um briefing executável.
              </h2>
              <p style={{
                margin: '0 0 24px',
                maxWidth: 760,
                color: 'rgba(255,255,255,0.68)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                lineHeight: 1.7,
              }}>
                Bons resultados não dependem de uma frase mágica. Eles aparecem quando o profissional
                explicita o problema, fornece contexto, pede método, define o formato de saída e cria
                uma etapa de revisão. Use o roteiro abaixo em qualquer ferramenta.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: 10,
              }}>
                {promptFramework.map((item, index) => (
                  <div key={item.label} style={{
                    minHeight: 108,
                    padding: 14,
                    borderRadius: 10,
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}>
                    <div style={{
                      color: LIME,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      fontWeight: 700,
                      marginBottom: 8,
                    }}>
                      0{index + 1} · {item.label}
                    </div>
                    <div style={{
                      color: 'rgba(255,255,255,0.66)',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      lineHeight: 1.45,
                    }}>
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {chapters.map((chapter) => {
              const Icon = chapter.icon;
              return (
                <section className="prompt-chapter" key={chapter.id} id={chapter.id} style={{
                  scrollMarginTop: 90,
                  marginBottom: 76,
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 14,
                    marginBottom: 24,
                  }}>
                    <div style={{
                      width: 44,
                      height: 44,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      borderRadius: 12,
                      background: G900,
                      color: LIME,
                    }}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <div style={{
                        color: LIME_DIM,
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        marginBottom: 8,
                      }}>
                        Capítulo {chapter.number}
                      </div>
                      <h2 style={{
                        ...sectionTitleStyle,
                        margin: 0,
                        color: G900,
                        fontSize: 'clamp(2rem, 4vw, 3.4rem)',
                        lineHeight: 1,
                      }}>
                        {chapter.label}
                      </h2>
                    </div>
                  </div>
                  <p style={{
                    maxWidth: 790,
                    margin: '0 0 28px 58px',
                    color: G600,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 15,
                    lineHeight: 1.75,
                  }}>
                    {chapter.intro}
                  </p>
                  <div style={{ display: 'grid', gap: 22 }}>
                    {chapter.prompts.map((item) => (
                      <div className="prompt-card" key={item.id}>
                        <PromptCard
                          item={item}
                          copied={copied === item.id}
                          onCopy={copyPrompt}
                        />
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}

            <section style={{
              padding: '30px',
              borderTop: `1px solid ${G200}`,
            }}>
              <div style={{
                color: LIME_DIM,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}>
                Referências e benchmark de prompting
              </div>
              <h2 style={{
                ...sectionTitleStyle,
                margin: '0 0 14px',
                color: G900,
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                lineHeight: 1,
              }}>
                Use fontes, não folclore.
              </h2>
              <p style={{
                maxWidth: 780,
                margin: '0 0 20px',
                color: G600,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                lineHeight: 1.7,
              }}>
                A biblioteca combina padrões recorrentes em guias técnicos: instruções claras,
                contexto separado, exemplos, decomposição de tarefas, formato de saída explícito,
                grounding, citações e validação humana. Cada prompt deve ser adaptado ao modelo,
                à ferramenta e ao risco do caso de uso.
              </p>
              <div style={{ display: 'grid', gap: 10 }}>
                {sourceLinks.map((source) => (
                  <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    color: G900,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    textDecoration: 'none',
                  }}>
                    <ArrowRight size={15} color={LIME_DIM} />
                    {source.label}
                  </a>
                ))}
              </div>
            </section>

            <div className="prompt-no-print" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 20,
              marginTop: 24,
              padding: '22px 24px',
              borderRadius: 14,
              background: G900,
              color: WHITE,
            }}>
              <div>
                <div style={{
                  color: LIME,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: 7,
                }}>
                  Próximo passo
                </div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 18,
                }}>
                  Escolha um prompt, adicione contexto e peça a primeira versão.
                </div>
              </div>
              <a href={ebookPdfPath} download style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                flexShrink: 0,
                padding: '11px 14px',
                border: 'none',
                borderRadius: 8,
                background: LIME,
                color: G900,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                textDecoration: 'none',
              }}>
                <FileText size={15} />
                Baixar PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {visualPreview && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Exemplo visual: ${visualPreview.title}`}
          onClick={() => setVisualPreview(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 11000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            background: 'rgba(19,16,12,0.82)',
            backdropFilter: 'blur(12px)',
          }}>
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: 'min(940px, 100%)',
              maxHeight: 'calc(100vh - 40px)',
              overflowY: 'auto',
              borderRadius: 18,
              background: OFF,
              boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
            }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              padding: '16px 18px',
              background: G900,
              color: WHITE,
            }}>
              <div>
                <div style={{
                  color: LIME,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}>
                  {visualPreview.label}
                </div>
                <div style={{
                  marginTop: 5,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 18,
                }}>
                  {visualPreview.title}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setVisualPreview(null)}
                aria-label="Fechar exemplo visual"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  border: '1px solid rgba(255,255,255,0.22)',
                  borderRadius: 9,
                  background: 'rgba(255,255,255,0.06)',
                  color: WHITE,
                  cursor: 'pointer',
                }}>
                <X size={18} />
              </button>
            </div>
            <div className="prompt-visual-modal-grid" style={{
              display: 'grid',
              gap: 22,
              padding: 22,
            }}>
              <img
                src={visualPreview.image}
                alt={visualPreview.title}
                style={{
                  width: '100%',
                  aspectRatio: '4 / 3',
                  objectFit: 'cover',
                  borderRadius: 12,
                  background: G900,
                }}
              />
              <div>
                <p style={{
                  margin: '0 0 16px',
                  color: G600,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  lineHeight: 1.7,
                }}>
                  {visualPreview.description}
                </p>
                <div style={{
                  marginBottom: 8,
                  color: G900,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}>
                  Prompt-base · inglês-US
                </div>
                <pre style={{
                  margin: 0,
                  padding: 14,
                  borderRadius: 10,
                  background: WHITE,
                  border: `1px solid ${G100}`,
                  color: G800,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                  overflowWrap: 'anywhere',
                }}>
                  {visualPreview.prompt}
                </pre>
                <button
                  type="button"
                  onClick={() => copyPrompt({
                    id: `visual-${visualPreview.id}`,
                    title: visualPreview.title,
                    use: visualPreview.description,
                    tip: '',
                    prompt: visualPreview.prompt,
                  })}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    marginTop: 14,
                    padding: '10px 13px',
                    border: 'none',
                    borderRadius: 8,
                    background: G900,
                    color: LIME,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}>
                  <Clipboard size={14} />
                  Copiar prompt-base
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
