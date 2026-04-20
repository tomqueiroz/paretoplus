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
