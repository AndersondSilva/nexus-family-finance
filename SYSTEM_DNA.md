# Nexus Family Finance | SYSTEM DNA & AI GUIDELINES

Este documento serve como a **"Constituição Técnica"** do projeto. Ele foi projetado para que qualquer Inteligência Artificial (como o Antigravity, ChatGPT, Claude ou GitHub Copilot) entenda instantaneamente como o sistema funciona e como deve ser modificado sem quebrar as regras de negócio.

---

## 📑 Visão Geral da Versão
- **Versão Atual**: 1.7.0 (Sovereign Unification)
- **Status**: Produção / Resiliência Total
- **Autor**: Julius (Engenharia Soberana)

---

## 🏗️ Arquitetura de Software

### Core Stack
- **Framework**: [Next.js](https://nextjs.org/) (App Router, Versão 14+)
- **Linguagem**: JavaScript (ES6+)
- **Estilização**: CSS Vanilla com Variáveis Dinâmicas (Sistema Neon-Glass)
- **Autenticação & Dados**: [Supabase](https://supabase.com/) (Auth + PostgreSQL com RLS) [MIGRADO]
- **Animações**: Framer Motion
- **Visualização**: Chart.js + React-Chartjs-2

### O Princípio da Dualidade (Pilar Central)
Toda transação financeira neste sistema **DEVE** possuir um atributo `scope`.
1. **Scope: "personal"**: Visível apenas para o `ownerId` (UID do usuário). Nenhum outro membro da família, nem mesmo o administrador, tem acesso de leitura/escrita a este dado.
2. **Scope: "family"**: Visível para todos os membros que possuem o mesmo `familyId` no perfil de usuário.

---

## 💾 Esquema de Dados (Supabase - PostgreSQL)

### Tabela `profiles`
- `id`: UUID (auth.users).
- `display_name`, `email`, `photo_url`.
- `family_id`: UUID do grupo familiar vinculado.
- `role`: "admin" | "editor" | "viewer".

### Tabela `transactions`
- `id`: UUID Primary Key.
- `description`: String.
- `amount`: Numeric(12,2).
- `category_id`: UUID (FK categories).
- `scope`: "personal" | "family".
- `owner_id`: UUID (auth.users).
- `family_id`: UUID (nullable).
- `created_at`: Timestamp.

### Tabela `invitations` (Nova)
- `id`: UUID.
- `from_email`, `to_email`.
- `from_uid`: UUID.
- `status`: "pending" | "accepted" | "rejected".

---

## 🎨 Guia de Estilo para a IA
Se você for solicitado a mudar a aparência:
- **Tema Claro/Escuro**: Use as variáveis CSS definidas em `app/globals.css`. Nunca use cores *hardcoded*.
- **Aesthetics**: Mantenha o efeito **Glassmorphism** (`backdrop-filter: blur()`).
- **Feedback Visual**: Use gradientes entre `--primary` (#3b82f6) e `--accent` (#00f2ff) para destacar elementos positivos.

---

## 🛠️ Guia de Manutenção (Como Mudar o Código)

### Para Adicionar uma Nova Categoria:
1. Vá em `components/TransactionModal.js`.
2. Adicione o novo item no array `categories`.
3. Verifique se a cor correspondente no gráfico de `DashboardView.js` precisa de atualização.

### Para Alterar Lógica de Permissões:
1. A lógica reside principalmente em `lib/permissions.js` (em breve) e nas regras de segurança do Firestore.
2. Certifique-se de que qualquer filtro de dados sempre considere o `scope`.

### Para Mudar o Tema Visual:
1. Modifique os valores hexadecimais em `:root` e `[data-theme='dark']` no arquivo `app/globals.css`.

---

## 📜 Histórico de Versões

### [1.2.0] - 2026-04-21
- **I18n Architecture**: Implementação de sistema multilingue PT-BR, PT-PT e EN-US.
- **Auto-Currency**: Detecção automática de local para formatação de moeda (EUR, BRL, USD).
- **LocaleContext**: Novo contexto global para gerenciamento de tradução e estados regionais.
- **Navbar Selector**: Adição de seletor visual de países/moedas na navegação superior.

### [1.1.0] - 2026-04-21
- **Design Evolution**: Migração para o padrão "Nexus-Stitch" inspirado no Google Stitch.
- **Aurora Mesh**: Implementação de fundos dinâmicos com gradientes Aurora e Dot Grid orbital.
- **Hero Update**: Landing page com animações cinematográficas e elementos 3D flutuantes.
- **Glassmorphism 2.0**: Aumento do blur para 40px-60px e otimização de contraste SOTA.

### [1.7.0] - 2026-04-23
- **Supabase Unification**: Remoção completa do Firebase para evitar erros de state e storage partitioning.
- **Invitations System**: Migração dos convites familiares para tabela nativa com Realtime.
- **Danger Zone**: Implementação do botão "Zerar Minha Conta" para reset de dados de teste.
- **Error Resilience**: Adoção do protocolo de tratamento de erro soberano.

---

## 🛡️ Governança de Julius (Post-Mortem & Aprendizado)

Após auditoria técnica, as seguintes diretrizes foram estabelecidas para evitar falhas de "Automação Estática":

1. **Protocolo "Soul-First"**: Nenhuma interface (UI) deve ser considerada completa sem a integração correspondente no backend. Mockups são permitidos apenas em fase de rascunho.
2. **Validação de Ambiente**: O sistema deve degradar graciosamente ou alertar o usuário se chaves do Firebase estiverem faltando, em vez de apenas travar.
3. **Integridade de Ativos**: Todo ativo visual (logos, ícones) deve ter um caminho canônico definido e verificado em cada compilação.
4. **Segurança por Padrão**: Regras de segurança do Firestore devem ser tratadas como código e versionadas junto com o projeto.
5. **Inteligência de Plataforma**: Consultar sempre o [PLATFORM_INTELLIGENCE.md](file:///C:/Users/ander/.gemini/antigravity/brain/e4574aaf-6daa-4759-ac6d-fc2ab8c42a15/PLATFORM_INTELLIGENCE.md) antes de migrar ou adotar novos serviços.

> **Nota de Julius**: A beleza sem função é uma distração. A força do Nexus reside na sua precisão matemática e segurança soberana.

---

## 🧪 Protocolo de QA Soberano (Julius Mandatário)

Todo ciclo de desenvolvimento deve encerrar com uma bateria de testes que valide:

1.  **Integridade de Autenticação**: Fluxo de login e persistência de sessão.
2.  **Isolamento de Escopo (Familiar/Pessoal)**: Verificação de RLS (Row Level Security) para garantir que dados pessoais não vazem para a família e vice-versa.
3.  **Consistência de Dados**: Verificação de tipos e precisão decimal em transações.
4.  **Feedback de Inteligência**: Validação dos insights gerados pelo Julius Advisor com base em dados reais.
5.  **Learning Loop**: Registro de falhas detectadas para atualização dos padrões de desenvolvimento.
