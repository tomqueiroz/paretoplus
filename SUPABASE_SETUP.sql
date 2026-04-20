-- =====================================================
-- PARETO PLUS — Supabase Setup
-- Execute no SQL Editor do seu projeto Supabase
-- =====================================================

-- 1. Criar tabela de leads
CREATE TABLE IF NOT EXISTS public.leads (
  id          BIGSERIAL PRIMARY KEY,
  nome        TEXT NOT NULL,
  empresa     TEXT NOT NULL,
  email       TEXT NOT NULL,
  telefone    TEXT,
  desafio     TEXT,
  origem      TEXT DEFAULT 'pareto-plus-lp',
  criado_em   TIMESTAMPTZ DEFAULT NOW(),
  status      TEXT DEFAULT 'novo'  -- novo | contatado | qualificado | convertido
);

-- 2. Habilitar Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 3. Permitir INSERT público (anon key pode inserir)
CREATE POLICY "Allow anon insert" ON public.leads
  FOR INSERT TO anon WITH CHECK (true);

-- 4. Apenas usuários autenticados (service_role) podem ler
CREATE POLICY "Allow auth read" ON public.leads
  FOR SELECT TO authenticated USING (true);

-- 5. Índice de busca por email
CREATE INDEX IF NOT EXISTS leads_email_idx ON public.leads (email);
CREATE INDEX IF NOT EXISTS leads_criado_em_idx ON public.leads (criado_em DESC);
