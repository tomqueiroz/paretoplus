import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/motion';
import { CONTACT_EMAIL, SITE_DOMAIN } from '@/lib/index';

export default function Privacidade() {
  return (
    <div className="min-h-screen py-24 px-6" style={{ background: '#0A0A0A', fontFamily: "'Roboto', sans-serif" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="w-6 h-px" style={{ background: '#8800FF' }} />
            <span className="text-[11px] font-black tracking-[0.3em] uppercase" style={{ color: '#8800FF' }}>Legal</span>
          </div>
          <h1 className="font-black text-white mb-3"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
            Política de Privacidade
          </h1>
          <p className="text-sm mb-12" style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 300 }}>
            Última atualização: Abril de 2026 · Conforme Lei Geral de Proteção de Dados (LGPD) — Lei nº 13.709/2018
          </p>

          <div className="space-y-10 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>
            {[
              {
                title: '1. Quem somos',
                body: `A Pareto Plus (${SITE_DOMAIN}) é uma holding especializada em Inteligência Artificial Aplicada a Negócios, composta pelas verticais Pareto Plus (consultoria estratégica) e Tess AI (plataforma proprietária de IA). Somos responsáveis pelo tratamento dos dados pessoais coletados neste site.`,
              },
              {
                title: '2. Quais dados coletamos',
                body: `Coletamos dados que você fornece voluntariamente ao preencher formulários ou entrar em contato conosco: nome, e-mail corporativo, telefone, empresa e segmento de atuação. Também coletamos automaticamente dados técnicos como endereço IP, navegador, sistema operacional e páginas visitadas, para fins analíticos e de segurança.`,
              },
              {
                title: '3. Como usamos os dados',
                body: `Utilizamos seus dados para: (a) responder a solicitações e agendar diagnósticos; (b) enviar materiais relevantes sobre IA aplicada a negócios, mediante consentimento; (c) melhorar a experiência no site; (d) cumprir obrigações legais. Não compartilhamos seus dados com terceiros para fins comerciais sem seu consentimento explícito.`,
              },
              {
                title: '4. Base legal (LGPD)',
                body: `O tratamento de dados é realizado com base nas seguintes hipóteses legais previstas na LGPD: (I) consentimento do titular para envio de comunicações; (II) execução de contrato ou de procedimentos preliminares relacionados a contratos; (III) legítimo interesse, para fins de melhoria do serviço e segurança da plataforma.`,
              },
              {
                title: '5. Retenção de dados',
                body: `Mantemos seus dados pelo período necessário para a finalidade para a qual foram coletados ou conforme exigido por lei. Dados de leads não convertidos são excluídos após 24 meses de inatividade. Você pode solicitar a exclusão antecipada a qualquer momento.`,
              },
              {
                title: '6. Seus direitos',
                body: `Conforme a LGPD, você tem direito a: confirmar a existência de tratamento; acessar seus dados; corrigir dados incompletos ou incorretos; solicitar anonimização, bloqueio ou eliminação; portabilidade; revogar consentimento a qualquer momento. Para exercer esses direitos, entre em contato: ${CONTACT_EMAIL}`,
              },
              {
                title: '7. Cookies',
                body: `Utilizamos cookies técnicos (essenciais para funcionamento do site) e cookies analíticos (para entender como os visitantes interagem com o conteúdo). Você pode gerenciar suas preferências de cookies a qualquer momento. Ao continuar navegando, você consente com o uso de cookies conforme esta política.`,
              },
              {
                title: '8. Segurança',
                body: `Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição, incluindo criptografia, controle de acesso e auditoria de logs.`,
              },
              {
                title: '9. Contato e DPO',
                body: `Dúvidas, solicitações ou exercício de direitos LGPD: ${CONTACT_EMAIL} — A Pareto Plus nomeia encarregado de dados (DPO) responsável pela supervisão do tratamento de dados pessoais conforme exigido pela LGPD.`,
              },
            ].map(s => (
              <div key={s.title} className="pb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <h2 className="font-black text-white text-base mb-3">{s.title}</h2>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
