import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ruhcerckawabobodxksl.supabase.co';
const SUPABASE_KEY = 'sb_publishable_4F0D2W0c4QS5cTUbLtJmEw_edKUNEsQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── Table helpers ────────────────────────────────────────────────────────────
export async function insertLead(data: {
  nome: string;
  empresa?: string;
  email: string;
  telefone?: string;
  desafio?: string;
  origem?: string;
}) {
  return supabase.from('leads').insert({
    ...data,
    origem: data.origem ?? 'pareto-plus-lp',
    criado_em: new Date().toISOString(),
  });
}

export async function insertExitLead(data: {
  email: string;
  telefone?: string;
}) {
  return supabase.from('leads').insert({
    ...data,
    origem: 'pareto-plus-exit-popup',
    criado_em: new Date().toISOString(),
  });
}

export async function insertMetaDayRsvp(data: {
  nomeCompleto: string;
  cpf: string;
  empresa: string;
  cargo: string;
  email: string;
  whatsapp: string;
  parceriaInstitucional: 'abrava' | 'anapp' | 'sindratar_sp' | 'outra';
  outraParceria: string;
}) {
  return supabase.from('leads').insert({
    nome: data.nomeCompleto,
    empresa: data.empresa,
    email: data.email,
    telefone: data.whatsapp,
    desafio: JSON.stringify({
      evento: 'PARETO + META DAY',
      cpf: data.cpf.replace(/\D/g, ''),
      cargo: data.cargo,
      parceria_institucional: data.parceriaInstitucional === 'abrava'
        ? 'ABRAVA'
        : data.parceriaInstitucional === 'anapp'
          ? 'ANAPP'
          : data.parceriaInstitucional === 'sindratar_sp'
            ? 'SINDRATAR-SP'
          : 'Outra parceria institucional',
      outra_parceria_institucional: data.parceriaInstitucional === 'outra'
        ? data.outraParceria
        : null,
      empresa_associada_anapp: data.parceriaInstitucional === 'anapp',
      consentimento_lgpd: true,
      finalidade_cpf: 'Controle de acesso ao edifício da Meta Brasil',
    }),
    origem: 'pareto-meta-day-rsvp',
    criado_em: new Date().toISOString(),
  });
}
