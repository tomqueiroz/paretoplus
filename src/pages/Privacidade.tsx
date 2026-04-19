import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

const sections = [
  { id: 'lgpd', title: '1. Proteção de Dados Pessoais (LGPD)' },
  { id: 'coleta', title: '2. Dados que Coletamos' },
  { id: 'uso', title: '3. Como Usamos seus Dados' },
  { id: 'compartilhamento', title: '4. Compartilhamento de Dados' },
  { id: 'seguranca', title: '5. Segurança dos Dados' },
  { id: 'direitos', title: '6. Seus Direitos' },
  { id: 'cookies', title: '7. Cookies e Rastreamento' },
  { id: 'retencao', title: '8. Retenção de Dados' },
  { id: 'contato', title: '9. Contato do DPO' },
];

export default function Privacidade() {
  return (
    <main className="min-h-screen pt-28 pb-24" style={{ background: '#0D0D0D', color: '#fff', fontFamily: "'Roboto', sans-serif" }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ background: '#8800FF' }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#8800FF' }}>Legal · LGPD</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Política de Privacidade</h1>
          <p className="text-white/50 text-lg">Última atualização: Abril de 2026</p>
          <p className="text-white/60 mt-4 leading-relaxed">
            A Pareto Soluções em Tecnologia Ltda. ("Pareto", "nós", "nosso") respeita sua privacidade e está comprometida com a proteção dos seus dados pessoais em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018) e demais normas aplicáveis.
          </p>
        </motion.div>

        {/* Index */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="p-6 rounded-2xl mb-12"
          style={{ background: 'rgba(136,0,255,0.06)', border: '1px solid rgba(136,0,255,0.2)' }}
        >
          <h2 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4">Índice</h2>
          <ul className="space-y-2">
            {sections.map((s) => (
              <motion.li key={s.id} variants={staggerItem}>
                <a
                  href={`#${s.id}`}
                  className="text-sm hover:text-white transition-colors"
                  style={{ color: 'rgba(136,0,255,0.8)' }}
                >
                  {s.title}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Sections */}
        <div className="space-y-12 text-white/70 leading-relaxed">

          <section id="lgpd">
            <h2 className="text-2xl font-black text-white mb-4">1. Proteção de Dados Pessoais (LGPD)</h2>
            <p>Esta Política de Privacidade descreve como a Pareto coleta, usa, armazena e protege seus dados pessoais. Ao utilizar nosso site, formulários de contato, WhatsApp ou qualquer serviço oferecido pela Pareto, você concorda com os termos desta política.</p>
            <p className="mt-4">A base legal para o tratamento de dados pessoais inclui: (a) consentimento do titular; (b) legítimo interesse do controlador; (c) execução de contrato; (d) cumprimento de obrigação legal.</p>
          </section>

          <section id="coleta">
            <h2 className="text-2xl font-black text-white mb-4">2. Dados que Coletamos</h2>
            <p className="mb-4">Coletamos os seguintes tipos de dados pessoais:</p>
            <ul className="space-y-2 pl-4">
              {[
                'Dados de identificação: nome completo, cargo, empresa',
                'Dados de contato: e-mail, telefone/WhatsApp, endereço',
                'Dados financeiros básicos: faturamento anual aproximado (para qualificação de lead)',
                'Dados de navegação: endereço IP, tipo de navegador, páginas visitadas, tempo de sessão',
                'Dados de comunicação: mensagens enviadas via formulário, WhatsApp ou e-mail',
                'Dados de cookies e rastreamento (veja seção 7)',
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm">
                  <span style={{ color: '#8800FF' }}>→</span> {item}
                </li>
              ))}
            </ul>
          </section>

          <section id="uso">
            <h2 className="text-2xl font-black text-white mb-4">3. Como Usamos seus Dados</h2>
            <p className="mb-4">Seus dados são utilizados exclusivamente para:</p>
            <ul className="space-y-2 pl-4">
              {[
                'Responder solicitações de diagnóstico e contato comercial',
                'Enviar informações sobre serviços Pareto solicitadas pelo titular',
                'Agendar reuniões e calls com especialistas Pareto',
                'Enviar comunicações de marketing (somente com consentimento)',
                'Melhorar a experiência de navegação no site',
                'Cumprir obrigações legais e regulatórias',
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm">
                  <span style={{ color: '#CDFF00' }}>✓</span> {item}
                </li>
              ))}
            </ul>
            <p className="mt-4">Nunca vendemos dados pessoais a terceiros.</p>
          </section>

          <section id="compartilhamento">
            <h2 className="text-2xl font-black text-white mb-4">4. Compartilhamento de Dados</h2>
            <p>Compartilhamos dados pessoais apenas nas seguintes situações:</p>
            <ul className="space-y-2 pl-4 mt-4">
              {[
                'Com fornecedores de serviços que nos auxiliam na operação (CRM, e-mail marketing, plataformas de análise), sempre sob contrato de confidencialidade e proteção de dados',
                'Com parceiros tecnológicos (Google, Meta, LinkedIn) para veiculação de anúncios — apenas dados pseudonimizados',
                'Quando exigido por lei, ordem judicial ou autoridade regulatória competente',
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm">
                  <span style={{ color: '#8800FF' }}>→</span> {item}
                </li>
              ))}
            </ul>
          </section>

          <section id="seguranca">
            <h2 className="text-2xl font-black text-white mb-4">5. Segurança dos Dados</h2>
            <p>Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais, incluindo:</p>
            <ul className="space-y-2 pl-4 mt-4 text-sm">
              <li className="flex gap-2"><span style={{ color: '#CDFF00' }}>✓</span> Criptografia em trânsito (TLS 1.2+) e em repouso (AES-256)</li>
              <li className="flex gap-2"><span style={{ color: '#CDFF00' }}>✓</span> Controle de acesso baseado em funções (RBAC)</li>
              <li className="flex gap-2"><span style={{ color: '#CDFF00' }}>✓</span> Auditorias de segurança periódicas</li>
              <li className="flex gap-2"><span style={{ color: '#CDFF00' }}>✓</span> Conformidade SOC 2 (plataforma Tess AI)</li>
              <li className="flex gap-2"><span style={{ color: '#CDFF00' }}>✓</span> Dados de clientes não utilizados para treinamento de modelos de IA</li>
            </ul>
          </section>

          <section id="direitos">
            <h2 className="text-2xl font-black text-white mb-4">6. Seus Direitos (LGPD Art. 18)</h2>
            <p className="mb-4">Você tem direito a:</p>
            <ul className="space-y-2 pl-4 text-sm">
              {[
                'Confirmação da existência de tratamento de dados',
                'Acesso aos seus dados pessoais',
                'Correção de dados incompletos, inexatos ou desatualizados',
                'Anonimização, bloqueio ou eliminação de dados desnecessários',
                'Portabilidade dos dados a outro fornecedor de serviço',
                'Eliminação dos dados pessoais tratados com consentimento',
                'Informação sobre entidades com quem seus dados foram compartilhados',
                'Revogação do consentimento a qualquer momento',
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span style={{ color: '#8800FF' }}>→</span> {item}
                </li>
              ))}
            </ul>
            <p className="mt-4">Para exercer seus direitos, entre em contato pelo e-mail: <strong className="text-white">privacidade@pareto.io</strong></p>
          </section>

          <section id="cookies">
            <h2 className="text-2xl font-black text-white mb-4">7. Cookies e Rastreamento</h2>
            <p>Utilizamos cookies e tecnologias similares para:</p>
            <ul className="space-y-2 pl-4 mt-4 text-sm">
              <li className="flex gap-2"><span style={{ color: '#8800FF' }}>→</span> <strong className="text-white">Cookies Essenciais:</strong> necessários para funcionamento do site</li>
              <li className="flex gap-2"><span style={{ color: '#8800FF' }}>→</span> <strong className="text-white">Cookies de Análise:</strong> Google Analytics 4 (anonimizado) para entender uso do site</li>
              <li className="flex gap-2"><span style={{ color: '#8800FF' }}>→</span> <strong className="text-white">Cookies de Marketing:</strong> Meta Pixel, Google Ads, LinkedIn Insight Tag — ativados somente com consentimento</li>
            </ul>
            <p className="mt-4">Você pode gerenciar cookies a qualquer momento através das configurações do seu navegador ou através do nosso banner de consentimento.</p>
          </section>

          <section id="retencao">
            <h2 className="text-2xl font-black text-white mb-4">8. Retenção de Dados</h2>
            <p>Mantemos seus dados pelo período necessário para as finalidades descritas nesta política ou conforme exigido por lei:</p>
            <ul className="space-y-2 pl-4 mt-4 text-sm">
              <li className="flex gap-2"><span style={{ color: '#8800FF' }}>→</span> Dados de leads não convertidos: até 2 anos</li>
              <li className="flex gap-2"><span style={{ color: '#8800FF' }}>→</span> Dados de clientes ativos: durante a vigência do contrato + 5 anos</li>
              <li className="flex gap-2"><span style={{ color: '#8800FF' }}>→</span> Dados de navegação: até 26 meses</li>
              <li className="flex gap-2"><span style={{ color: '#8800FF' }}>→</span> Comunicações de marketing: até revogação do consentimento</li>
            </ul>
          </section>

          <section id="contato">
            <h2 className="text-2xl font-black text-white mb-4">9. Contato do DPO (Encarregado de Dados)</h2>
            <div
              className="p-6 rounded-2xl"
              style={{ background: 'rgba(136,0,255,0.06)', border: '1px solid rgba(136,0,255,0.2)' }}
            >
              <p className="text-white font-bold mb-2">Pareto Soluções em Tecnologia Ltda.</p>
              <p>Rio de Janeiro · São Paulo, Brasil</p>
              <p className="mt-2">E-mail do DPO: <strong className="text-white">privacidade@pareto.io</strong></p>
              <p>Site: <a href="https://pareto.io" className="hover:text-white transition-colors" style={{ color: '#8800FF' }}>pareto.io</a></p>
              <p className="mt-4 text-sm text-white/50">
                Para reclamações à Autoridade Nacional de Proteção de Dados (ANPD): <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer" className="hover:text-white" style={{ color: '#8800FF' }}>www.gov.br/anpd</a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white mb-4">10. Atualizações desta Política</h2>
            <p>Esta política pode ser atualizada periodicamente. Alterações significativas serão comunicadas por e-mail ou aviso no site. A versão atual estará sempre disponível em pareto.io/privacidade.</p>
          </section>

        </div>
      </div>
    </main>
  );
}
