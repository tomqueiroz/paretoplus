# Pareto Plus — sincronização do repositório oficial

Atualização em 23/10/2026, diretamente no repositório existente:
https://github.com/tomqueiroz/paretoplus

## Conteúdo atual

O projeto atual está na raiz do repositório, no formato monorepo:

- `apps/client`: frontend React, páginas, estilos, imagens, vídeos e e-book.
- `apps/server`: backend Hono, rotas, serviços, autenticação e migrações.
- `packages/shared`: contratos compartilhados.
- `scripts`: scripts do projeto.
- `documents`: plano de crescimento B2B em DOCX.
- `marketing`: texto final da locução em pt-BR.

O `README.md` original contém as instruções técnicas de configuração.

## Procedência

- Versão do Website: v56.
- Website ID: `01a0914c-2410-73b5-8996-c16f773ac21a`.
- Commit-fonte informado pela plataforma:
  `38e262320d82e7fb544381a5d0846d6cc85b25f9`.
- Commit anterior do GitHub preservado como ancestral:
  `a546bf9a5135c020672f49afca1e7316ec493e81`.

Os 386 arquivos de aplicação recuperados da versão atual correspondem à cópia
local, verificados por SHA-256. A configuração `.gitignore` recebeu exclusões
adicionais para estado privado, certificados e bancos locais.

A estrutura antiga de aplicação única foi substituída pela estrutura atual.
Os arquivos antigos continuam recuperáveis no histórico Git. Não houve
reescrita de histórico nem force push.

## Verificação

O manifesto `backup-manifest.json` registra os hashes dos arquivos desta
sincronização, exceto o próprio manifesto. A cópia foi verificada antes do
commit e submetida a varredura de segredos. A chave Supabase de prefixo
`sb_publishable_` é uma chave pública de cliente, preservada no código.

Não foi executado deploy. Não foram alterados site público, domínio, DNS ou
serviços em produção. Não houve mudança funcional no código da aplicação.
Build e testes não foram reexecutados nesta operação de backup.

## O que não está incluído

Este é um backup versionado de código e arquivos, não um dump dos dados de
produção. Não contém registros de inscritos/leads, bancos vivos, conteúdo
remoto de buckets, segredos de produção, arquivos `.env` privados, caches,
`node_modules`, saídas de build ou metadados privados `.skywork`.

Para restaurar os serviços, as variáveis e os recursos de backend precisam
ser configurados no ambiente de hospedagem. Migrações não substituem dados.
