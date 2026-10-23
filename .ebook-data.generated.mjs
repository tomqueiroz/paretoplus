import { BriefcaseBusiness, FileText, Image as ImageIcon, Linkedin, ListChecks, Network, PenTool, Sparkles, Target, Video, BarChart3, Bot, Database, Globe2, Mail, MessageSquare, Palette, Search, ShieldCheck, Users, } from 'lucide-react';
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
const promptFramework = [
    { label: 'Papel', text: 'Quem a IA deve ser para executar com critério.' },
    { label: 'Resultado', text: 'O resultado de negócio que precisa mudar.' },
    { label: 'Contexto', text: 'Dados, público, canal, mercado e restrições.' },
    { label: 'Método', text: 'O framework, sequência ou processo que deve ser aplicado.' },
    { label: 'Saída', text: 'Formato final, campos, extensão e nível de decisão.' },
    { label: 'Gate de qualidade', text: 'Como revisar, testar, citar fontes e apontar lacunas.' },
];
const coreChapters = [
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
const seed = (title, focus) => ({ title, focus });
const titlePhraseTranslations = [
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
const titleWordTranslations = {
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
function localizePromptTitle(title) {
    const phrase = titlePhraseTranslations.find(([source]) => source.toLowerCase() === title.toLowerCase());
    if (phrase)
        return phrase[1];
    return title.split(' ').map((token) => {
        const clean = token.replace(/[.,:]/g, '');
        return titleWordTranslations[clean] ? token.replace(clean, titleWordTranslations[clean]) : token;
    }).join(' ');
}
const chapterBlueprints = [
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
const corePromptLookup = new Map(coreChapters.flatMap((chapter) => chapter.prompts.map((prompt) => [
    prompt.id,
    { ...prompt, title: localizePromptTitle(prompt.title) },
])));
function buildGeneratedPrompt(blueprint, promptSeed, index) {
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
const chapters = chapterBlueprints.map((blueprint) => {
    const coreItems = blueprint.coreIds
        .map((id) => corePromptLookup.get(id))
        .filter((item) => Boolean(item));
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
export { chapters };
