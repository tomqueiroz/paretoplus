import { useEffect, useState, type CSSProperties, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { ROUTE_PATHS } from '@/lib/index';

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

// 30 de setembro de 2026, 23h59 no horário de Brasília.
const REGISTRATION_DEADLINE = new Date('2026-10-01T02:59:59Z');

type RsvpForm = {
  nomeCompleto: string;
  cpf: string;
  empresa: string;
  cargo: string;
  email: string;
  whatsapp: string;
  parceriaInstitucional: '' | 'abrava' | 'anapp' | 'sindratar_sp' | 'outra';
  outraParceria: string;
  consentimento: boolean;
};

const initialForm: RsvpForm = {
  nomeCompleto: '',
  cpf: '',
  empresa: '',
  cargo: '',
  email: '',
  whatsapp: '',
  parceriaInstitucional: '',
  outraParceria: '',
  consentimento: false,
};

function onlyDigits(value: string) {
  return value.replace(/\D/g, '');
}

function formatCpf(value: string) {
  const digits = onlyDigits(value).slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function formatWhatsapp(value: string) {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 10) {
    return digits
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }
  return digits
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');
}

function isValidCpf(value: string) {
  const cpf = onlyDigits(value);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  const calculateDigit = (length: number) => {
    let sum = 0;
    for (let index = 0; index < length; index += 1) {
      sum += Number(cpf[index]) * (length + 1 - index);
    }
    const remainder = (sum * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };

  return calculateDigit(9) === Number(cpf[9]) && calculateDigit(10) === Number(cpf[10]);
}

function FieldLabel({ children, required = true }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label style={{
      display: 'block',
      marginBottom: 7,
      color: G800,
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.02em',
    }}>
      {children}{required && <span style={{ color: LIME_DIM }}> *</span>}
    </label>
  );
}

const inputStyle: CSSProperties = {
  width: '100%',
  minHeight: 48,
  border: `1px solid ${G200}`,
  borderRadius: 8,
  background: WHITE,
  color: G900,
  padding: '12px 14px',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 15,
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
};

function InfoItem({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof CalendarDays;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
      <div style={{
        width: 40,
        height: 40,
        borderRadius: 10,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(203,236,46,0.1)',
        border: '1px solid rgba(203,236,46,0.28)',
        color: LIME,
      }}>
        <Icon size={18} />
      </div>
      <div>
        <div style={{
          color: WHITE,
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 14,
          fontWeight: 600,
          marginBottom: 4,
        }}>
          {title}
        </div>
        <div style={{
          color: 'rgba(255,255,255,0.68)',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          lineHeight: 1.6,
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function MetaDay() {
  const [form, setForm] = useState<RsvpForm>(initialForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'closed'>('idle');
  const [message, setMessage] = useState('');
  const [registrationOpen, setRegistrationOpen] = useState(true);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'PARETO + META DAY — Inscrição com RSVP';
    setRegistrationOpen(Date.now() <= REGISTRATION_DEADLINE.getTime());
    return () => {
      document.title = previousTitle;
    };
  }, []);

  const updateField = <K extends keyof RsvpForm>(field: K, value: RsvpForm[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (status === 'error') {
      setStatus('idle');
      setMessage('');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Date.now() > REGISTRATION_DEADLINE.getTime()) {
      setRegistrationOpen(false);
      setStatus('closed');
      setMessage('O prazo de inscrições foi encerrado.');
      return;
    }

    if (
      !form.nomeCompleto.trim()
      || !form.empresa.trim()
      || !form.cargo.trim()
      || !form.email.trim()
      || !form.whatsapp.trim()
      || !form.parceriaInstitucional
      || !form.consentimento
    ) {
      setStatus('error');
      setMessage('Preencha todos os campos obrigatórios e confirme o consentimento para continuar.');
      return;
    }

    if (form.parceriaInstitucional === 'outra' && !form.outraParceria.trim()) {
      setStatus('error');
      setMessage('Informe o nome da outra parceria institucional.');
      return;
    }

    if (!isValidCpf(form.cpf)) {
      setStatus('error');
      setMessage('Informe um CPF válido. O documento será utilizado exclusivamente para o controle de acesso ao edifício.');
      return;
    }

    if (onlyDigits(form.whatsapp).length < 10) {
      setStatus('error');
      setMessage('Informe um número de WhatsApp válido, incluindo o DDD.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await apiFetch('/meta-day-rsvps', {
        method: 'POST',
        auth: false,
        silent: true,
        signal: AbortSignal.timeout(20000),
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.nomeCompleto.trim(),
          cpf: onlyDigits(form.cpf),
          company: form.empresa.trim(),
          jobTitle: form.cargo.trim(),
          email: form.email.trim().toLowerCase(),
          whatsapp: onlyDigits(form.whatsapp),
          institutionalPartner: form.parceriaInstitucional,
          otherPartner: form.outraParceria.trim() || undefined,
          consent: true,
        }),
      });

      const payload = (await response.json().catch((): null => null)) as {
        ok?: boolean;
        error?: { message?: string };
      } | null;
      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.error?.message || 'Não foi possível concluir a inscrição.');
      }

      setStatus('success');
      setForm(initialForm);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof DOMException && error.name === 'TimeoutError'
          ? 'A conexão demorou mais que o esperado. Tente novamente; se seus dados já tiverem sido recebidos, o reenvio será reconhecido sem duplicar a inscrição.'
          : error instanceof Error
          ? error.message
          : 'Não foi possível concluir a inscrição agora. Tente novamente ou entre em contato com Tom Queiroz.',
      );
    }
  };

  return (
    <main style={{ background: OFF, minHeight: '100vh', paddingTop: 56 }}>
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        background: G900,
        padding: 'clamp(38px, 5vw, 68px) 24px clamp(46px, 6vw, 72px)',
      }}>
        <div style={{
          position: 'absolute',
          width: 560,
          height: 560,
          borderRadius: '50%',
          right: '-12%',
          top: '-35%',
          background: 'radial-gradient(circle, rgba(203,236,46,0.14) 0%, transparent 68%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.17,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'linear-gradient(to bottom, black, transparent)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'clamp(14px, 2.5vw, 24px)',
            marginBottom: 28,
          }}>
            <img
              data-image-slot="brand.pareto.logo.light"
              src="/images/brand/pareto-logo-light.png"
              alt="Pareto Plus"
              style={{
                display: 'block',
                width: 'clamp(150px, 20vw, 210px)',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
            <span
              aria-hidden="true"
              style={{
                width: 1,
                height: 38,
                background: 'rgba(255,255,255,0.24)',
              }}
            />
            <img
              data-image-slot="brand.meta.logo.white"
              src="/images/brand/meta-logo-white.png"
              alt="Meta"
              style={{
                display: 'block',
                width: 'clamp(145px, 18vw, 190px)',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '7px 13px',
            marginBottom: 24,
            borderRadius: 99,
            color: LIME,
            background: 'rgba(203,236,46,0.08)',
            border: '1px solid rgba(203,236,46,0.28)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: LIME }} />
            Clientes e convidados Pareto · RSVP obrigatório
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(40px, 7vw, 88px)',
            alignItems: 'end',
          }}>
            <div>
              <div style={{
                margin: '0 0 16px',
                color: LIME,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 'clamp(0.78rem, 1.5vw, 1rem)',
                fontWeight: 700,
                letterSpacing: '0.1em',
              }}>
                13/OUT/26&nbsp;&nbsp;|&nbsp;&nbsp;13H30–18H
              </div>
              <h1 style={{
                margin: '0 0 24px',
                color: WHITE,
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(3.2rem, 8vw, 7.4rem)',
                fontWeight: 700,
                letterSpacing: '-0.055em',
                lineHeight: 0.86,
              }}>
                META<br /><span style={{ color: LIME }}>DAY.</span>
              </h1>
              <p style={{
                margin: 0,
                maxWidth: 650,
                color: 'rgba(255,255,255,0.78)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                lineHeight: 1.7,
              }}>
                Uma experiência exclusiva, das 13h30 às 18h, para clientes e convidados Pareto
                que querem transformar inteligência, contexto e tecnologia em decisões que movem negócios.
              </p>
            </div>

            <div style={{
              padding: '26px 28px',
              borderRadius: 16,
              background: 'rgba(255,255,255,0.045)',
              border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(16px)',
            }}>
              <InfoItem icon={CalendarDays} title="Data do evento">
                13 de outubro de 2026.
              </InfoItem>
              <div style={{ height: 20 }} />
              <InfoItem icon={CalendarDays} title="Prazo de inscrição">
                Até 30 de setembro de 2026 ou enquanto houver vagas disponíveis.
              </InfoItem>
              <div style={{ height: 20 }} />
              <InfoItem icon={Clock3} title="Horário do evento">
                Das 13h30 às 18h.
              </InfoItem>
              <div style={{ height: 20 }} />
              <InfoItem icon={UserCheck} title="Público">
                Evento exclusivo para clientes e convidados Pareto.
              </InfoItem>
              <div style={{ height: 20 }} />
              <InfoItem icon={UserCheck} title="Participação sujeita a confirmação">
                O preenchimento do formulário não garante reserva de convite. As confirmações de RSVP serão enviadas por e-mail após o encerramento das inscrições.
              </InfoItem>
              <div style={{ height: 20 }} />
              <InfoItem icon={MapPin} title="Acesso ao edifício da Meta Brasil">
                Será necessário apresentar documento oficial com o mesmo CPF informado na inscrição.
              </InfoItem>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(64px, 9vw, 104px) 24px' }}>
        <div style={{
          maxWidth: 1180,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: 'clamp(40px, 7vw, 84px)',
          alignItems: 'start',
        }}>
          <div>
            <div style={{
              color: LIME_DIM,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              marginBottom: 14,
            }}>
              Inteligência aplicada
            </div>
            <h2 style={{
              margin: '0 0 22px',
              color: G900,
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.04em',
            }}>
              O problema não é a IA.<br />
              É decidir onde ela gera vantagem.
            </h2>
            <p style={{
              margin: '0 0 36px',
              color: G600,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              lineHeight: 1.75,
              maxWidth: 560,
            }}>
              O PARETO + META DAY foi pensado para aproximar líderes, repertório de plataforma
              e casos reais de transformação. Um encontro para sair da abstração e discutir
              como estratégia, dados e execução se convertem em sistemas úteis para o negócio.
            </p>

            <div style={{ display: 'grid', gap: 16 }}>
              {[
                {
                  icon: Building2,
                  title: 'Evento exclusivo',
                  text: 'O PARETO + META DAY é reservado a clientes e convidados Pareto, das 13h30 às 18h.',
                },
                {
                  icon: Mail,
                  title: 'Confirmação individual',
                  text: 'Após o fim do prazo de inscrições, os participantes confirmados receberão o e-mail de RSVP.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Acesso seguro',
                  text: 'O CPF será utilizado para identificação e liberação de acesso ao edifício da Meta Brasil.',
                },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} style={{
                  display: 'flex',
                  gap: 14,
                  padding: 18,
                  background: WHITE,
                  border: `1px solid ${G100}`,
                  borderRadius: 12,
                }}>
                  <Icon size={20} style={{ color: LIME_DIM, flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{
                      color: G900,
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 14,
                      fontWeight: 600,
                      marginBottom: 4,
                    }}>
                      {title}
                    </div>
                    <div style={{
                      color: G600,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      lineHeight: 1.55,
                    }}>
                      {text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 34,
              paddingTop: 26,
              borderTop: `1px solid ${G200}`,
              color: G600,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              lineHeight: 1.7,
            }}>
              <strong style={{ color: G900 }}>Dúvidas sobre o evento?</strong><br />
              Tom Queiroz · <a href="mailto:tom.queiroz@pareto.plus" style={{ color: G900 }}>tom.queiroz@pareto.plus</a><br />
              <a
                href="https://wa.me/5511915513210?text=Ol%C3%A1%2C%20Tom.%20Tenho%20uma%20d%C3%BAvida%20sobre%20o%20PARETO%20%2B%20META%20DAY."
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: G900 }}
              >
                WhatsApp: (11) 91551-3210
              </a>
            </div>
          </div>

          <div style={{
            padding: 'clamp(24px, 5vw, 44px)',
            borderRadius: 18,
            background: WHITE,
            border: `1px solid ${G100}`,
            boxShadow: '0 24px 70px rgba(19,16,12,0.1)',
          }}>
            {status === 'success' ? (
              <div style={{ minHeight: 520, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  margin: '0 auto 22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: G900,
                  color: LIME,
                }}>
                  <CheckCircle2 size={30} />
                </div>
                <h2 style={{
                  margin: '0 0 14px',
                  color: G900,
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  lineHeight: 1.05,
                }}>
                  Solicitação de RSVP recebida.
                </h2>
                <p style={{
                  margin: '0 auto 28px',
                  maxWidth: 420,
                  color: G600,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  lineHeight: 1.7,
                }}>
                  O preenchimento do formulário não garante reserva de convite. Após o fim do prazo de
                  inscrições, os participantes confirmados receberão por e-mail o RSVP de confirmação.
                </p>
                <Link to={ROUTE_PATHS.HOME} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  alignSelf: 'center',
                  padding: '13px 22px',
                  borderRadius: 8,
                  background: G900,
                  color: LIME,
                  textDecoration: 'none',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                }}>
                  Voltar ao site <ArrowRight size={15} />
                </Link>
              </div>
            ) : (
              <>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 9,
                  color: LIME_DIM,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginBottom: 12,
                }}>
                  <Clock3 size={14} />
                  13h30–18h · clientes e convidados Pareto
                </div>
                <h2 style={{
                  margin: '0 0 10px',
                  color: G900,
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.035em',
                }}>
                  Solicite sua participação.
                </h2>
                <p style={{
                  margin: '0 0 30px',
                  color: G600,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  lineHeight: 1.65,
                }}>
                  Preencha os dados abaixo. O preenchimento do formulário não garante reserva de convite
                  nem confirmação automática da vaga.
                </p>

                {!registrationOpen || status === 'closed' ? (
                  <div style={{
                    padding: 20,
                    borderRadius: 12,
                    color: G900,
                    background: 'rgba(203,236,46,0.12)',
                    border: '1px solid rgba(168,196,30,0.35)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    lineHeight: 1.65,
                  }}>
                    <strong>Inscrições encerradas.</strong><br />
                    Entre em contato com Tom Queiroz para verificar eventual disponibilidade.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div style={{ display: 'grid', gap: 19 }}>
                      <div>
                        <FieldLabel>Nome completo</FieldLabel>
                        <input
                          value={form.nomeCompleto}
                          onChange={(event) => updateField('nomeCompleto', event.target.value)}
                          style={inputStyle}
                          autoComplete="name"
                          placeholder="Seu nome completo"
                        />
                      </div>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                        gap: 16,
                      }}>
                        <div>
                          <FieldLabel>CPF</FieldLabel>
                          <input
                            value={form.cpf}
                            onChange={(event) => updateField('cpf', formatCpf(event.target.value))}
                            style={inputStyle}
                            inputMode="numeric"
                            autoComplete="off"
                            placeholder="000.000.000-00"
                          />
                        </div>
                        <div>
                          <FieldLabel>WhatsApp</FieldLabel>
                          <input
                            value={form.whatsapp}
                            onChange={(event) => updateField('whatsapp', formatWhatsapp(event.target.value))}
                            style={inputStyle}
                            inputMode="tel"
                            autoComplete="tel"
                            placeholder="(11) 99999-9999"
                          />
                        </div>
                      </div>

                      <div>
                        <FieldLabel>Empresa</FieldLabel>
                        <input
                          value={form.empresa}
                          onChange={(event) => updateField('empresa', event.target.value)}
                          style={inputStyle}
                          autoComplete="organization"
                          placeholder="Nome da empresa"
                        />
                      </div>

                      <div>
                        <FieldLabel>Cargo</FieldLabel>
                        <input
                          value={form.cargo}
                          onChange={(event) => updateField('cargo', event.target.value)}
                          style={inputStyle}
                          autoComplete="organization-title"
                          placeholder="Seu cargo atual"
                        />
                      </div>

                      <div>
                        <FieldLabel>E-mail corporativo</FieldLabel>
                        <input
                          value={form.email}
                          onChange={(event) => updateField('email', event.target.value)}
                          style={inputStyle}
                          type="email"
                          autoComplete="email"
                          placeholder="nome@empresa.com.br"
                        />
                      </div>

                      <div>
                        <FieldLabel>A empresa é associada a qual entidade?</FieldLabel>
                        <select
                          name="parceriaInstitucional"
                          value={form.parceriaInstitucional}
                          onChange={(event) => updateField(
                            'parceriaInstitucional',
                            event.target.value as RsvpForm['parceriaInstitucional'],
                          )}
                          style={{ ...inputStyle, cursor: 'pointer' }}
                        >
                          <option value="">Selecione uma opção</option>
                          <option value="abrava">ABRAVA</option>
                          <option value="anapp">ANAPP</option>
                          <option value="sindratar_sp">SINDRATAR-SP</option>
                          <option value="outra">Outra parceria institucional</option>
                        </select>
                      </div>

                      {form.parceriaInstitucional === 'outra' && (
                        <div>
                          <FieldLabel>Qual parceria institucional?</FieldLabel>
                          <input
                            name="outraParceria"
                            value={form.outraParceria}
                            onChange={(event) => updateField('outraParceria', event.target.value)}
                            style={inputStyle}
                            type="text"
                            autoComplete="organization"
                            placeholder="Informe o nome da entidade"
                          />
                        </div>
                      )}

                      <label style={{
                        display: 'flex',
                        gap: 11,
                        alignItems: 'flex-start',
                        padding: 14,
                        borderRadius: 10,
                        background: OFF,
                        border: `1px solid ${G100}`,
                        cursor: 'pointer',
                      }}>
                        <input
                          type="checkbox"
                          checked={form.consentimento}
                          onChange={(event) => updateField('consentimento', event.target.checked)}
                          style={{ marginTop: 3, accentColor: G900 }}
                        />
                        <span style={{
                          color: G600,
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 12,
                          lineHeight: 1.6,
                        }}>
                          Autorizo o tratamento dos dados informados para gestão do RSVP, comunicação
                          sobre o evento e controle de acesso ao edifício da Meta Brasil, conforme a{' '}
                          <Link to={ROUTE_PATHS.PRIVACIDADE} style={{ color: G900 }}>
                            Política de Privacidade
                          </Link>.
                        </span>
                      </label>

                      {status === 'error' && (
                        <div role="alert" style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 9,
                          padding: 13,
                          borderRadius: 9,
                          color: '#7A271A',
                          background: '#FFF1EE',
                          border: '1px solid #F5C5BA',
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 12,
                          lineHeight: 1.55,
                        }}>
                          <AlertCircle size={17} style={{ flexShrink: 0 }} />
                          {message}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        style={{
                          minHeight: 52,
                          border: 'none',
                          borderRadius: 8,
                          background: status === 'loading' ? G600 : G900,
                          color: LIME,
                          cursor: status === 'loading' ? 'wait' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 10,
                          padding: '14px 20px',
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 14,
                          fontWeight: 700,
                          letterSpacing: '0.02em',
                        }}
                      >
                        {status === 'loading' ? 'Enviando solicitação…' : 'Solicitar RSVP'}
                        {status !== 'loading' && <ArrowRight size={17} />}
                      </button>

                      <div style={{
                        display: 'flex',
                        gap: 8,
                        color: G400,
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 11,
                        lineHeight: 1.55,
                      }}>
                        <ShieldCheck size={15} style={{ flexShrink: 0 }} />
                        O CPF será utilizado para o controle de acesso e não será exibido publicamente.
                      </div>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 24px 96px', background: OFF }}>
        <div style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '30px clamp(22px, 5vw, 44px)',
          borderRadius: 16,
          background: G900,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 24,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{
              color: LIME,
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 17,
              fontWeight: 600,
              marginBottom: 4,
            }}>
              Precisa falar com a organização?
            </div>
            <div style={{
              color: 'rgba(255,255,255,0.62)',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
            }}>
              Tom Queiroz responde dúvidas sobre inscrição, RSVP e acesso.
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <a
              href="mailto:tom.queiroz@pareto.plus"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '11px 16px',
                borderRadius: 8,
                color: WHITE,
                border: '1px solid rgba(255,255,255,0.18)',
                textDecoration: 'none',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
              }}
            >
              <Mail size={15} /> E-mail
            </a>
            <a
              href="https://wa.me/5511915513210?text=Ol%C3%A1%2C%20Tom.%20Tenho%20uma%20d%C3%BAvida%20sobre%20o%20PARETO%20%2B%20META%20DAY."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '11px 16px',
                borderRadius: 8,
                color: G900,
                background: LIME,
                textDecoration: 'none',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              <MessageCircle size={15} /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
