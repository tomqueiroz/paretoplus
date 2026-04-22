import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, FileText, ChevronDown, ChevronUp, ExternalLink, Mail, Phone } from 'lucide-react';

/* ── Tokens ── */
const G900 = '#13100C'; const G800 = '#241F1A'; const G600 = '#4A4540';
const G400 = '#8A8278'; const G200 = '#BFB8AE'; const G100 = '#DDD7CF';
const OFF  = '#F8F6F3'; const WHITE = '#FFFFFF';
const LIME = '#CBEC2E'; const LIME_DIM = '#A8C41E';

const ease = [0.16, 1, 0.3, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } };

/* ── Nav por âncoras ── */
const PP_SECTIONS = [
  { id: 'pp-intro',          label: '1. Quem Somos — Controlador dos Dados' },
  { id: 'pp-dados',          label: '2. Dados que Coletamos' },
  { id: 'pp-finalidade',     label: '3. Finalidade e Base Legal (Art. 7º LGPD)' },
  { id: 'pp-marketing',      label: '4. Prospecção e Marketing B2B' },
  { id: 'pp-compartilhamento', label: '5. Compartilhamento de Dados' },
  { id: 'pp-retencao',       label: '6. Retenção e Eliminação' },
  { id: 'pp-cookies',        label: '7. Cookies e Tecnologias de Rastreamento' },
  { id: 'pp-seguranca',      label: '8. Segurança da Informação' },
  { id: 'pp-direitos',       label: '9. Seus Direitos como Titular (Art. 18 LGPD)' },
  { id: 'pp-menores',        label: '10. Dados de Menores' },
  { id: 'pp-alteracoes',     label: '11. Alterações desta Política' },
  { id: 'pp-dpo',            label: '12. Encarregado de Dados (DPO) e Contato' },
];

const TU_SECTIONS = [
  { id: 'tu-objeto',         label: '1. Objeto e Aceitação' },
  { id: 'tu-servicos',       label: '2. Descrição dos Serviços' },
  { id: 'tu-responsabilidades', label: '3. Responsabilidades do Usuário' },
  { id: 'tu-propriedade',    label: '4. Propriedade Intelectual' },
  { id: 'tu-pagamento',      label: '5. Contratação e Pagamento' },
  { id: 'tu-confidencialidade', label: '6. Confidencialidade' },
  { id: 'tu-limitacao',      label: '7. Limitação de Responsabilidade' },
  { id: 'tu-rescisao',       label: '8. Vigência e Rescisão' },
  { id: 'tu-lei',            label: '9. Lei Aplicável e Foro' },
];

/* ── Accordion item ── */
function Accordion({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  // Abre automaticamente se a URL contém o hash correspondente
  const [open, setOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash === `#${id}`;
    }
    return false;
  });

  // Também abre se o hash mudar (clique no índice)
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === `#${id}`) {
        setOpen(true);
        // Aguarda o accordion abrir e depois scrolla
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      }
    };
    window.addEventListener('hashchange', handleHash);
    // Verifica no mount também
    if (window.location.hash === `#${id}`) {
      setOpen(true);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
    return () => window.removeEventListener('hashchange', handleHash);
  }, [id]);

  return (
    <div id={id} style={{ borderBottom: `1px solid ${G100}`, scrollMarginTop: 90 }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'left', gap: 16,
        }}
      >
        <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: G900, lineHeight: 1.3 }}>
          {title}
        </span>
        <span style={{ color: LIME_DIM, flexShrink: 0 }}>
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ overflow: 'hidden', paddingBottom: 24 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

/* ── Badge legal ── */
function LegalBadge({ text }: { text: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '3px 10px', borderRadius: 99,
      background: 'rgba(168,196,30,0.1)', border: `1px solid ${LIME_DIM}40`,
      fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600,
      color: LIME_DIM, letterSpacing: '0.04em', marginRight: 6, marginBottom: 4,
    }}>
      {text}
    </span>
  );
}

/* ── Texto corrido ── */
function P({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.8, color: G600, margin: '0 0 14px', fontWeight: 300, ...style }}>{children}</p>;
}
function H3({ children }: { children: React.ReactNode }) {
  return <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: G900, margin: '20px 0 8px', letterSpacing: '0.02em' }}>{children}</h3>;
}
function UL({ children }: { children: React.ReactNode }) {
  return <ul style={{ margin: '0 0 14px', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>{children}</ul>;
}
function LI({ children }: { children: React.ReactNode }) {
  return <li style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.75, color: G600, fontWeight: 300 }}>{children}</li>;
}
function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      padding: '14px 18px', borderRadius: 10, marginBottom: 16,
      background: 'rgba(168,196,30,0.06)', border: `1px solid ${LIME_DIM}30`,
    }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.7, color: G600, margin: 0, fontWeight: 300 }}>
        {children}
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════ */
export default function Privacidade() {
  const [activeTab, setActiveTab] = useState<'privacidade' | 'termos'>('privacidade');
  const currentDate = 'Abril de 2026';

  return (
    <main style={{ background: OFF, color: G900, fontFamily: "'DM Sans', sans-serif", minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section style={{ background: G900, paddingTop: 100, paddingBottom: 56, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(168,196,30,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 20, height: 1, background: LIME_DIM }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: LIME_DIM }}>
                Legal · LGPD Compliant
              </span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-1px', color: WHITE, margin: '0 0 12px', lineHeight: 1.1 }}>
              Privacidade & Termos de Uso
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.55)', margin: '0 0 28px', fontWeight: 300 }}>
              Última atualização: {currentDate} · Pareto Plus Ltda.
            </p>

            {/* Badges legais */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
              <LegalBadge text="Lei nº 13.709/2018 (LGPD)" />
              <LegalBadge text="ANPD — Autoridade Nacional" />
              <LegalBadge text="Art. 7º Bases Legais" />
              <LegalBadge text="Art. 18 Direitos do Titular" />
              <LegalBadge text="Art. 9º Transparência" />
            </div>

            {/* Tab selector */}
            <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 4, width: 'fit-content', border: `1px solid ${G800}` }}>
              {[
                { key: 'privacidade', label: 'Política de Privacidade', icon: <Shield size={14} /> },
                { key: 'termos', label: 'Termos de Uso', icon: <FileText size={14} /> },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 7,
                    padding: '10px 20px', borderRadius: 9, border: 'none', cursor: 'pointer',
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13,
                    transition: 'all 0.2s ease',
                    background: activeTab === tab.key ? LIME : 'transparent',
                    color: activeTab === tab.key ? G900 : 'rgba(255,255,255,0.5)',
                  }}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Conteúdo ── */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* ════════════════════════════════════════
            POLÍTICA DE PRIVACIDADE
        ════════════════════════════════════════ */}
        {activeTab === 'privacidade' && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>

            {/* Índice */}
            <div style={{ padding: '20px 24px', borderRadius: 12, background: WHITE, border: `1px solid ${G100}`, marginBottom: 40 }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: G400, textTransform: 'uppercase', letterSpacing: '0.14em', margin: '0 0 12px' }}>Índice</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4px 24px' }}>
                {PP_SECTIONS.map(s => (
                  <a key={s.id} href={`#${s.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.hash = s.id;
                      window.dispatchEvent(new HashChangeEvent('hashchange'));
                    }}
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: LIME_DIM, textDecoration: 'none', display: 'block', padding: '4px 0', fontWeight: 400, cursor: 'pointer' }}
                    onMouseEnter={e => (e.currentTarget.style.color = G900)}
                    onMouseLeave={e => (e.currentTarget.style.color = LIME_DIM)}>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Introdução */}
            <div style={{ padding: '20px 24px', borderRadius: 12, background: 'rgba(168,196,30,0.06)', border: `1px solid ${LIME_DIM}40`, marginBottom: 32 }}>
              <P style={{ margin: 0 }}>
                A <strong style={{ color: G900 }}>Pareto Plus Ltda.</strong>, pessoa jurídica de direito privado, inscrita no CNPJ/MF sob o nº <strong style={{ color: G900 }}>49.512.854/0001-46</strong>, com sede na Avenida Oscar Niemeyer, nº 2.000, Bloco 1, Sala 401, Bairro Santo Cristo, Rio de Janeiro/RJ, CEP 20220-297 ("<strong style={{ color: G900 }}>Pareto</strong>", "<strong style={{ color: G900 }}>nós</strong>" ou "<strong style={{ color: G900 }}>nosso</strong>"), opera as plataformas <strong style={{ color: G900 }}>Pareto.io</strong> e <strong style={{ color: G900 }}>Pareto Plus</strong> e atua como <strong style={{ color: G900 }}>controladora</strong> dos dados pessoais tratados neste site, nos termos do Art. 5º, VI da Lei nº 13.709/2018 (LGPD).
              </P>
              <P style={{ margin: '10px 0 0' }}>
                Esta Política descreve quais dados coletamos, por que coletamos, como são usados, com quem são compartilhados, por quanto tempo são retidos e quais são os seus direitos como titular — em cumprimento ao <strong style={{ color: G900 }}>Art. 9º da LGPD</strong> (dever de transparência).
              </P>
            </div>

            {/* Seções */}
            <div style={{ background: WHITE, borderRadius: 16, border: `1px solid ${G100}`, padding: '0 28px' }}>

              <Accordion id="pp-intro" title="1. Quem Somos — Controlador dos Dados">
                <H3>Controladora</H3>
                <P><strong style={{ color: G900 }}>Pareto Plus Ltda.</strong><br />
CNPJ/MF: 49.512.854/0001-46<br />
Av. Oscar Niemeyer, 2.000, Bloco 1, Sala 401 — Santo Cristo, Rio de Janeiro/RJ, CEP 20220-297<br />
                E-mail do DPO: <a href="mailto:privacidade@pareto.io" style={{ color: LIME_DIM }}>privacidade@pareto.io</a>
                </P>
                <H3>Operadoras</H3>
                <P>A Pareto pode contratar empresas terceiras que atuam como <strong style={{ color: G900 }}>operadoras</strong> (Art. 5º, VII, LGPD) para serviços de CRM, e-mail marketing, analytics e hospedagem. Essas empresas processam dados exclusivamente conforme nossas instruções e com cláusulas contratuais de proteção de dados.</P>
              </Accordion>

              <Accordion id="pp-dados" title="2. Dados que Coletamos">
                <H3>2.1 Dados fornecidos diretamente por você</H3>
                <UL>
                  <LI><strong>Dados de identificação:</strong> nome completo, cargo, empresa (razão social / CNPJ)</LI>
                  <LI><strong>Dados de contato:</strong> e-mail corporativo, telefone/WhatsApp, cidade/UF</LI>
                  <LI><strong>Dados de contexto de negócio:</strong> informações sobre processos operacionais, desafios e metas — fornecidas voluntariamente em formulários de diagnóstico</LI>
                  <LI><strong>Comunicações:</strong> mensagens enviadas por WhatsApp, e-mail ou formulários de contato</LI>
                </UL>
                <H3>2.2 Dados coletados automaticamente</H3>
                <UL>
                  <LI><strong>Dados de navegação:</strong> endereço IP (anonimizado após 90 dias), tipo de dispositivo, navegador, páginas visitadas e tempo de permanência</LI>
                  <LI><strong>Cookies de desempenho e análise:</strong> via Google Analytics / Meta Pixel (ver Seção 7)</LI>
                  <LI><strong>Dados de origem de tráfego:</strong> UTM tags, referral de campanhas</LI>
                </UL>
                <H3>2.3 Dados de fontes públicas (prospecção B2B)</H3>
                <P>Para fins de prospecção comercial B2B, podemos tratar dados profissionais disponíveis publicamente (LinkedIn, CNPJ/RFB, sites corporativos), limitados a nome, cargo, empresa e e-mail corporativo — com fundamento no <strong style={{ color: G900 }}>Legítimo Interesse</strong> (Art. 7º, IX, LGPD). Você pode solicitar a exclusão a qualquer momento (ver Seção 9).</P>
                <InfoBox>⚠️ Não coletamos dados pessoais sensíveis (Art. 5º, II, LGPD) como origem racial, convicção religiosa, saúde, dado biométrico ou orientação sexual. Caso você os mencione espontaneamente, não os armazenamos.</InfoBox>
              </Accordion>

              <Accordion id="pp-finalidade" title="3. Finalidade e Base Legal (Art. 7º LGPD)">
                <P>Conforme o <strong style={{ color: G900 }}>Art. 9º, I e II da LGPD</strong>, informamos a finalidade específica e a base legal para cada tratamento:</P>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', minWidth: 520, borderCollapse: 'collapse', fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
                    <thead>
                      <tr style={{ background: G900 }}>
                        <th style={{ padding: '10px 14px', textAlign: 'left', color: WHITE, fontWeight: 600, whiteSpace: 'nowrap' }}>Finalidade</th>
                        <th style={{ padding: '10px 14px', textAlign: 'left', color: LIME, fontWeight: 600, whiteSpace: 'nowrap' }}>Base Legal (LGPD)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Responder solicitações de contato e diagnóstico', 'Execução de contrato / diligências pré-contratuais (Art. 7º, V)'],
                        ['Envio de propostas comerciais e orçamentos', 'Execução de contrato (Art. 7º, V)'],
                        ['Prospecção e marketing B2B (e-mail, WhatsApp)', 'Legítimo Interesse (Art. 7º, IX) — ver Seção 4'],
                        ['Newsletter e conteúdo educativo (opt-in)', 'Consentimento (Art. 7º, I)'],
                        ['Análise de desempenho do site (analytics)', 'Legítimo Interesse (Art. 7º, IX)'],
                        ['Cumprimento de obrigações legais e fiscais', 'Obrigação Legal (Art. 7º, II)'],
                        ['Prevenção a fraudes e segurança da plataforma', 'Legítimo Interesse / Proteção ao Crédito (Art. 7º, IX e X)'],
                      ].map(([fin, base], i) => (
                        <tr key={fin} style={{ background: i % 2 === 0 ? OFF : WHITE, borderBottom: `1px solid ${G100}` }}>
                          <td style={{ padding: '10px 14px', color: G600, lineHeight: 1.5 }}>{fin}</td>
                          <td style={{ padding: '10px 14px', color: LIME_DIM, fontWeight: 500, lineHeight: 1.5 }}>{base}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Accordion>

              <Accordion id="pp-marketing" title="4. Prospecção e Marketing B2B">
                <InfoBox>
                  Base legal: <strong>Legítimo Interesse (Art. 7º, IX, LGPD)</strong> — conforme o <strong>Guia Orientativo de Legítimo Interesse da ANPD (fev/2024)</strong>, o interesse legítimo autoriza o tratamento de dados para fins de prospecção comercial B2B, desde que atendidos os requisitos de finalidade, necessidade e balanceamento, e garantido o direito de oposição.
                </InfoBox>
                <H3>O que fazemos com seus dados de contato</H3>
                <UL>
                  <LI>Envio de e-mails e mensagens WhatsApp sobre serviços da Pareto.io e Pareto Plus</LI>
                  <LI>Convites para eventos, webinars e conteúdo educativo relevante ao seu setor</LI>
                  <LI>Follow-up de propostas e diagnósticos solicitados</LI>
                  <LI>Compartilhamento de estudos de caso e resultados de clientes</LI>
                </UL>
                <H3>Seus direitos em comunicações de marketing</H3>
                <UL>
                  <LI><strong>Opt-out imediato:</strong> cada comunicação contém link ou instrução de descadastro com efeito imediato (máx. 5 dias úteis)</LI>
                  <LI><strong>Oposição (Art. 18, II, LGPD):</strong> você pode solicitar a cessação do tratamento por e-mail a <a href="mailto:privacidade@pareto.io" style={{ color: LIME_DIM }}>privacidade@pareto.io</a></LI>
                  <LI><strong>Sem venda de dados:</strong> não vendemos, alugamos ou cedemos sua base de contatos a terceiros para fins de marketing</LI>
                </UL>
                <H3>Teste de Balanceamento (LIA)</H3>
                <P>Realizamos avaliação interna de Legítimo Interesse (LIA) considerando: (i) existência de relação comercial prévia ou interesse demonstrado; (ii) volume mínimo de dados (apenas nome, cargo, e-mail e empresa); (iii) impacto mínimo sobre privacidade do contato; (iv) garantia de opt-out efetivo. O LIA está disponível para consulta mediante solicitação ao DPO.</P>
              </Accordion>

              <Accordion id="pp-compartilhamento" title="5. Compartilhamento de Dados">
                <P>Nos termos do <strong style={{ color: G900 }}>Art. 9º, V da LGPD</strong>, informamos com quais terceiros podemos compartilhar seus dados:</P>
                <UL>
                  <LI><strong>Supabase Inc.:</strong> banco de dados e armazenamento (operadora) — servidores com criptografia em repouso</LI>
                  <LI><strong>Google LLC:</strong> Google Analytics (analytics de site, dados anonimizados) e Google Workspace (e-mail corporativo)</LI>
                  <LI><strong>Meta Platforms Inc.:</strong> Meta Pixel / Conversions API — para mensuração de campanhas (dados hashed)</LI>
                  <LI><strong>HubSpot Inc.:</strong> CRM e automação de marketing (operadora)</LI>
                  <LI><strong>Calendly LLC:</strong> agendamento de reuniões</LI>
                  <LI><strong>Autoridades públicas:</strong> quando exigido por lei, ordem judicial ou requisição de autoridade competente (Art. 7º, VI, LGPD)</LI>
                </UL>
                <InfoBox>Todos os fornecedores são contratados com cláusulas de proteção de dados e estão sujeitos a políticas de privacidade próprias. Não realizamos transferências internacionais de dados sem salvaguardas adequadas (Art. 33 a 36, LGPD).</InfoBox>
              </Accordion>

              <Accordion id="pp-retencao" title="6. Retenção e Eliminação de Dados">
                <H3>Prazos de retenção</H3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', minWidth: 400, borderCollapse: 'collapse', fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
                    <thead>
                      <tr style={{ background: G900 }}>
                        <th style={{ padding: '9px 14px', textAlign: 'left', color: WHITE, fontWeight: 600 }}>Categoria de Dado</th>
                        <th style={{ padding: '9px 14px', textAlign: 'left', color: LIME, fontWeight: 600 }}>Prazo de Retenção</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Leads (sem conversão em cliente)', '24 meses ou até opt-out'],
                        ['Dados de clientes ativos', 'Duração do contrato + 5 anos (prescrição civil)'],
                        ['Dados fiscais e NFs', '5 anos (obrigação legal — Lei nº 9.430/1996)'],
                        ['Logs de acesso ao site', '6 meses (Marco Civil da Internet — Lei nº 12.965/2014)'],
                        ['Registros de consentimento', '5 anos após revogação'],
                        ['Dados de cookies analíticos', '13 meses (padrão Google Analytics)'],
                      ].map(([cat, prazo], i) => (
                        <tr key={cat} style={{ background: i % 2 === 0 ? OFF : WHITE, borderBottom: `1px solid ${G100}` }}>
                          <td style={{ padding: '9px 14px', color: G600 }}>{cat}</td>
                          <td style={{ padding: '9px 14px', color: G400 }}>{prazo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <P style={{ marginTop: 14 }}>Após o prazo, os dados são eliminados ou anonimizados de forma irreversível, salvo obrigação legal de retenção.</P>
              </Accordion>

              <Accordion id="pp-cookies" title="7. Cookies e Tecnologias de Rastreamento">
                <InfoBox>Seguimos o <strong>Guia Orientativo de Cookies e Proteção de Dados Pessoais da ANPD (out/2022)</strong>, que classifica cookies e exige opção equivalente de rejeição.</InfoBox>
                <H3>Categorias de cookies utilizados</H3>
                <UL>
                  <LI><strong>Estritamente necessários:</strong> funcionamento do site, segurança de sessão — não requerem consentimento</LI>
                  <LI><strong>Funcionais:</strong> preferências de idioma e personalização — base: Legítimo Interesse</LI>
                  <LI><strong>Analíticos:</strong> Google Analytics (GA4) — mensuração de audiência com IP anonimizado — base: Legítimo Interesse com opt-out disponível</LI>
                  <LI><strong>Marketing / Publicidade:</strong> Meta Pixel, Google Ads — rastreamento para mensuração e remarketing — base: Consentimento</LI>
                </UL>
                <H3>Gerenciamento de cookies</H3>
                <P>Ao acessar o site pela primeira vez, exibimos um banner de cookies com opção de aceitar, personalizar ou rejeitar categorias não essenciais. Você pode alterar suas preferências a qualquer momento nas configurações do seu navegador ou pelo link no rodapé. Para opt-out do Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: LIME_DIM }}>tools.google.com/dlpage/gaoptout</a>.</P>
              </Accordion>

              <Accordion id="pp-seguranca" title="8. Segurança da Informação">
                <UL>
                  <LI><strong>Criptografia em trânsito:</strong> TLS 1.3 em todas as comunicações</LI>
                  <LI><strong>Criptografia em repouso:</strong> AES-256 no banco de dados (Supabase)</LI>
                  <LI><strong>Controle de acesso:</strong> princípio do menor privilégio — acesso aos dados restrito a colaboradores com necessidade comprovada</LI>
                  <LI><strong>Autenticação:</strong> MFA obrigatório para sistemas internos com dados pessoais</LI>
                  <LI><strong>Incidentes:</strong> em caso de violação de dados com risco ou dano relevante, notificamos a ANPD e os titulares afetados em até 72 horas, conforme Art. 48 da LGPD</LI>
                  <LI><strong>Terceiros:</strong> todos os fornecedores passam por avaliação de segurança antes da contratação</LI>
                </UL>
              </Accordion>

              <Accordion id="pp-direitos" title="9. Seus Direitos como Titular (Art. 18 LGPD)">
                <InfoBox>Conforme o <strong>Art. 18 da LGPD</strong>, você tem os seguintes direitos em relação aos seus dados pessoais tratados pela Pareto:</InfoBox>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, marginBottom: 16 }}>
                  {[
                    { right: 'Confirmação de tratamento', desc: 'Saber se tratamos seus dados' },
                    { right: 'Acesso', desc: 'Obter cópia dos dados que temos sobre você' },
                    { right: 'Correção', desc: 'Corrigir dados incompletos ou desatualizados' },
                    { right: 'Anonimização / Bloqueio / Eliminação', desc: 'Dos dados desnecessários ou tratados em desconformidade' },
                    { right: 'Portabilidade', desc: 'Receber seus dados em formato estruturado' },
                    { right: 'Informação sobre compartilhamento', desc: 'Saber com quem compartilhamos seus dados' },
                    { right: 'Revogação do consentimento', desc: 'A qualquer tempo, sem custo, para tratamentos baseados em consentimento' },
                    { right: 'Oposição (Opt-out de marketing)', desc: 'Cessar tratamentos baseados em Legítimo Interesse' },
                    { right: 'Revisão de decisão automatizada', desc: 'Solicitar revisão humana de decisões tomadas com IA' },
                    { right: 'Petição à ANPD', desc: 'Caso não atendido, reclamar à Autoridade Nacional de Proteção de Dados' },
                  ].map(item => (
                    <div key={item.right} style={{ padding: '12px 16px', borderRadius: 10, background: OFF, border: `1px solid ${G100}` }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, color: G900, marginBottom: 4 }}>{item.right}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 12, color: G400, lineHeight: 1.5 }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
                <H3>Como exercer seus direitos</H3>
                <P>Envie solicitação ao DPO pelo e-mail <a href="mailto:privacidade@pareto.io" style={{ color: LIME_DIM }}>privacidade@pareto.io</a> com: nome completo, e-mail cadastrado e descrição do direito que deseja exercer. Respondemos em até <strong style={{ color: G900 }}>15 dias corridos</strong>, conforme Art. 19 da LGPD.</P>
                <P>Caso a solicitação não seja atendida a contento, você pode apresentar petição à <strong style={{ color: G900 }}>ANPD</strong>: <a href="https://www.gov.br/anpd/pt-br/canais_atendimento/canal-do-titular" target="_blank" rel="noopener noreferrer" style={{ color: LIME_DIM }}>gov.br/anpd <ExternalLink size={11} style={{ display: 'inline' }} /></a></P>
              </Accordion>

              <Accordion id="pp-menores" title="10. Dados de Menores de Idade">
                <P>Os serviços da Pareto são destinados exclusivamente a <strong style={{ color: G900 }}>pessoas jurídicas e profissionais adultos</strong> atuando em capacidade corporativa. Não coletamos intencionalmente dados pessoais de menores de 18 anos. Caso identificado tratamento acidental de dados de menor, os dados serão eliminados imediatamente.</P>
              </Accordion>

              <Accordion id="pp-alteracoes" title="11. Alterações desta Política">
                <P>Esta Política pode ser atualizada periodicamente para refletir mudanças operacionais, legais ou tecnológicas. A data da "última atualização" no topo desta página sempre indicará a versão vigente. Alterações materiais serão comunicadas por e-mail aos titulares cadastrados com pelo menos 15 dias de antecedência.</P>
                <P>O uso continuado do site após alterações constitui aceite da versão vigente.</P>
              </Accordion>

              <Accordion id="pp-dpo" title="12. Encarregado de Dados (DPO) e Contato">
                <P>Conforme o <strong style={{ color: G900 }}>Art. 41 da LGPD</strong>, designamos um Encarregado de Proteção de Dados (DPO) para atuar como canal de comunicação entre a Pareto, os titulares de dados e a ANPD.</P>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
                  {[
                    { icon: <Mail size={15} />, label: 'E-mail do DPO', value: 'privacidade@pareto.io', href: 'mailto:privacidade@pareto.io' },
                    { icon: <Phone size={15} />, label: 'WhatsApp', value: '+55 11 91551-3210', href: 'https://wa.me/5511915513210' },
                  ].map(item => (
                    <a key={item.label} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 10, background: OFF, border: `1px solid ${G100}`, textDecoration: 'none' }}>
                      <span style={{ color: LIME_DIM }}>{item.icon}</span>
                      <div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: G400, fontWeight: 500 }}>{item.label}</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: G900, fontWeight: 600 }}>{item.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
                <div style={{ marginTop: 20, padding: '14px 18px', borderRadius: 10, background: 'rgba(168,196,30,0.06)', border: `1px solid ${LIME_DIM}30` }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: G400, margin: 0, lineHeight: 1.7 }}>
                    <strong style={{ color: G600 }}>Referências legais:</strong>{' '}
                    <a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm" target="_blank" rel="noopener noreferrer" style={{ color: LIME_DIM }}>Lei nº 13.709/2018 (LGPD)</a> ·{' '}
                    <a href="https://www.gov.br/anpd/pt-br" target="_blank" rel="noopener noreferrer" style={{ color: LIME_DIM }}>ANPD — gov.br/anpd</a> ·{' '}
                    <a href="https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_legitimo_interesse.pdf" target="_blank" rel="noopener noreferrer" style={{ color: LIME_DIM }}>Guia Legítimo Interesse ANPD 2024</a> ·{' '}
                    <a href="https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-cookies-e-protecao-de-dados-pessoais.pdf" target="_blank" rel="noopener noreferrer" style={{ color: LIME_DIM }}>Guia Cookies ANPD 2022</a>
                  </p>
                </div>
              </Accordion>

            </div>
          </motion.div>
        )}

        {/* ════════════════════════════════════════
            TERMOS DE USO
        ════════════════════════════════════════ */}
        {activeTab === 'termos' && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>

            {/* Índice */}
            <div style={{ padding: '20px 24px', borderRadius: 12, background: WHITE, border: `1px solid ${G100}`, marginBottom: 40 }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: G400, textTransform: 'uppercase', letterSpacing: '0.14em', margin: '0 0 12px' }}>Índice</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4px 24px' }}>
                {TU_SECTIONS.map(s => (
                  <a key={s.id} href={`#${s.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.hash = s.id;
                      window.dispatchEvent(new HashChangeEvent('hashchange'));
                    }}
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: LIME_DIM, textDecoration: 'none', display: 'block', padding: '4px 0', fontWeight: 400, cursor: 'pointer' }}
                    onMouseEnter={e => (e.currentTarget.style.color = G900)}
                    onMouseLeave={e => (e.currentTarget.style.color = LIME_DIM)}>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <div style={{ padding: '18px 24px', borderRadius: 12, background: 'rgba(168,196,30,0.06)', border: `1px solid ${LIME_DIM}40`, marginBottom: 32 }}>
              <P style={{ margin: 0 }}>
                Estes Termos de Uso ("<strong style={{ color: G900 }}>Termos</strong>") regulam o acesso e uso dos sites <strong style={{ color: G900 }}>pareto.io</strong> e <strong style={{ color: G900 }}>paretoplus.com.br</strong>, bem como os serviços de consultoria, automação de IA e plataforma Tess AI prestados pela <strong style={{ color: G900 }}>Pareto Soluções em Tecnologia Ltda.</strong> O acesso ao site implica aceite integral destes Termos. Caso não concorde, não utilize o site.
              </P>
            </div>

            <div style={{ background: WHITE, borderRadius: 16, border: `1px solid ${G100}`, padding: '0 28px' }}>

              <Accordion id="tu-objeto" title="1. Objeto e Aceitação">
                <P>Estes Termos estabelecem as regras e condições para uso dos sites e serviços da Pareto, incluindo:</P>
                <UL>
                  <LI>Site institucional <strong>pareto.io</strong> e <strong>paretoplus.com.br</strong></LI>
                  <LI>Plataforma de IA <strong>Tess AI</strong> (tess.im)</LI>
                  <LI>Serviços de consultoria e implementação de IA (<strong>Pareto Services</strong>)</LI>
                  <LI>Cursos e certificações (<strong>Pareto Academy</strong>)</LI>
                </UL>
                <P>O uso do site pressupõe capacidade civil plena (Art. 3º e 4º do Código Civil Brasileiro) e, quando aplicável, representação legal de pessoa jurídica.</P>
              </Accordion>

              <Accordion id="tu-servicos" title="2. Descrição dos Serviços">
                <H3>2.1 Serviços digitais e de plataforma</H3>
                <P>A Pareto oferece acesso à plataforma Tess AI mediante contrato específico de SaaS (Software as a Service), com condições, limites de uso e SLA definidos no instrumento contratual assinado entre as partes.</P>
                <H3>2.2 Serviços de consultoria e implementação</H3>
                <P>Os serviços de automação de processos, AI Workers, agentes inteligentes e alocação de AI Builders são prestados mediante contrato escrito, proposta comercial aceita e/ou Ordem de Serviço. O escopo, prazo, entregáveis e valores são definidos no instrumento contratual específico.</P>
                <H3>2.3 Cursos e formações</H3>
                <P>Cursos da Pareto Academy são prestados mediante inscrição, pagamento e aceite dos termos específicos de cada produto educacional.</P>
                <H3>2.4 Diagnóstico gratuito</H3>
                <P>O diagnóstico de 30 minutos oferecido no site é uma sessão consultiva inicial, sem custo, sem compromisso de contratação e sem entrega de proposta obrigatória — sujeito à disponibilidade da equipe.</P>
              </Accordion>

              <Accordion id="tu-responsabilidades" title="3. Responsabilidades do Usuário">
                <P>Ao utilizar os sites e serviços da Pareto, você se compromete a:</P>
                <UL>
                  <LI>Fornecer informações verdadeiras, completas e atualizadas nos formulários de contato</LI>
                  <LI>Não utilizar os serviços para fins ilícitos, fraudulentos ou que violem direitos de terceiros</LI>
                  <LI>Não realizar engenharia reversa, scraping automatizado ou tentativas de acesso não autorizado à plataforma</LI>
                  <LI>Não reproduzir, distribuir ou comercializar conteúdos e metodologias proprietárias da Pareto sem autorização escrita</LI>
                  <LI>Manter sigilo das credenciais de acesso a ferramentas e plataformas compartilhadas no âmbito dos serviços contratados</LI>
                  <LI>Garantir que sua empresa possui as autorizações necessárias para compartilhar dados de negócio com a Pareto no âmbito dos projetos</LI>
                </UL>
              </Accordion>

              <Accordion id="tu-propriedade" title="4. Propriedade Intelectual">
                <P>Todo o conteúdo do site (textos, imagens, vídeos, metodologias, marca, logotipo, código-fonte, design) é de propriedade exclusiva da Pareto ou de seus licenciadores, protegido pela <strong style={{ color: G900 }}>Lei nº 9.279/1996 (Lei de Propriedade Industrial)</strong> e pela <strong style={{ color: G900 }}>Lei nº 9.610/1998 (Lei de Direitos Autorais)</strong>.</P>
                <H3>Propriedade dos entregáveis</H3>
                <P>Salvo disposição contratual expressa em contrário, os artefatos de IA, automações, agentes e sistemas desenvolvidos exclusivamente para o cliente tornam-se propriedade do cliente após quitação integral do contrato. Metodologias, frameworks e código-base proprietário da Pareto permanecem como propriedade da Pareto sob licença de uso.</P>
                <H3>Tess AI</H3>
                <P>A plataforma Tess AI é propriedade intelectual da Pareto. O uso é licenciado (não transferido) conforme contrato SaaS específico.</P>
              </Accordion>

              <Accordion id="tu-pagamento" title="5. Contratação e Pagamento">
                <UL>
                  <LI>Os contratos de serviço são formalizados por escrito (digital ou físico) com validade jurídica plena</LI>
                  <LI>Valores, formas de pagamento e prazos são definidos na proposta comercial aceita pelo cliente</LI>
                  <LI>Em caso de inadimplência, aplica-se multa de 2% a.m. + correção pelo IPCA, conforme o Código Civil Brasileiro (Art. 395)</LI>
                  <LI>Reembolsos e cancelamentos seguem as condições do contrato específico de cada serviço</LI>
                  <LI>A Pareto emite NF-e (nota fiscal eletrônica) para todos os serviços prestados</LI>
                </UL>
              </Accordion>

              <Accordion id="tu-confidencialidade" title="6. Confidencialidade">
                <P>As partes se comprometem a manter em sigilo as informações confidenciais trocadas no âmbito da prestação de serviços, incluindo dados estratégicos, financeiros, de clientes e tecnológicos, pelo prazo de <strong style={{ color: G900 }}>5 (cinco) anos</strong> após o término da relação contratual.</P>
                <P>A Pareto trata dados de negócio dos clientes como ativos confidenciais e não os usa para fins além do escopo contratado, em conformidade com o <strong style={{ color: G900 }}>Art. 46 da LGPD</strong> (medidas de segurança) e as obrigações da operadora de dados.</P>
              </Accordion>

              <Accordion id="tu-limitacao" title="7. Limitação de Responsabilidade">
                <P>A Pareto não se responsabiliza por:</P>
                <UL>
                  <LI>Resultados de negócio específicos não previstos no escopo contratual</LI>
                  <LI>Perdas decorrentes do uso inadequado das ferramentas e recomendações pelo cliente</LI>
                  <LI>Interrupções de serviços de terceiros (Google, Meta, plataformas de IA de terceiros) que estejam fora do controle da Pareto</LI>
                  <LI>Danos indiretos, lucros cessantes ou perda de oportunidade não previstos contratualmente</LI>
                </UL>
                <P>A responsabilidade total da Pareto em qualquer caso é limitada ao valor pago pelo cliente nos 6 meses anteriores ao evento danoso, salvo dolo ou culpa grave.</P>
              </Accordion>

              <Accordion id="tu-rescisao" title="8. Vigência e Rescisão">
                <P>Estes Termos entram em vigor na data de aceite (acesso ao site ou assinatura de contrato) e permanecem vigentes enquanto durar a relação contratual ou o uso do site.</P>
                <H3>Rescisão por justa causa</H3>
                <P>Qualquer das partes pode rescindir contratos de serviço em caso de: (i) descumprimento material de obrigações não sanado em 10 dias após notificação; (ii) declaração de insolvência ou falência; (iii) ato ilícito comprovado.</P>
                <H3>Rescisão imotivada</H3>
                <P>Sujeita às condições e prazos de aviso prévio definidos no instrumento contratual específico (geralmente 30 dias).</P>
              </Accordion>

              <Accordion id="tu-lei" title="9. Lei Aplicável e Foro">
                <P>Estes Termos são regidos pelas leis da <strong style={{ color: G900 }}>República Federativa do Brasil</strong>. As partes elegem o foro da <strong style={{ color: G900 }}>Comarca de São Paulo/SP</strong> para dirimir quaisquer controvérsias, com renúncia expressa a qualquer outro, por mais privilegiado que seja.</P>
                <P>Para questões de proteção de dados, aplica-se a <strong style={{ color: G900 }}>Lei nº 13.709/2018 (LGPD)</strong> e a competência administrativa da <strong style={{ color: G900 }}>ANPD</strong>.</P>
                <div style={{ marginTop: 20, padding: '14px 18px', borderRadius: 10, background: 'rgba(168,196,30,0.06)', border: `1px solid ${LIME_DIM}30` }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: G400, margin: 0, lineHeight: 1.7 }}>
                    Última atualização: {currentDate} · Versão 2.0 · Para dúvidas:{' '}
                    <a href="mailto:privacidade@pareto.io" style={{ color: LIME_DIM }}>privacidade@pareto.io</a>
                  </p>
                </div>
              </Accordion>

            </div>
          </motion.div>
        )}

        {/* ── Navegação entre abas no rodapé ── */}
        <div style={{ marginTop: 40, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => { setActiveTab(activeTab === 'privacidade' ? 'termos' : 'privacidade'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '11px 24px', borderRadius: 50, border: `1px solid ${G200}`,
              background: 'transparent', color: G600, fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = LIME_DIM; (e.currentTarget as HTMLElement).style.color = G900; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = G200; (e.currentTarget as HTMLElement).style.color = G600; }}
          >
            {activeTab === 'privacidade' ? <><FileText size={14} /> Ver Termos de Uso</> : <><Shield size={14} /> Ver Política de Privacidade</>}
          </button>
          <Link to="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '11px 24px', borderRadius: 50,
            background: LIME, color: G900,
            fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, textDecoration: 'none',
            transition: 'all 0.2s ease',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(203,236,46,0.35)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
          >
            ← Voltar ao site
          </Link>
        </div>

      </div>
    </main>
  );
}
