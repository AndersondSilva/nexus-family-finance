# Nexus Family Finance | SYSTEM DNA & AI GUIDELINES

Este documento serve como a **"Constituição Técnica"** do projeto. Ele foi projetado para que qualquer Inteligência Artificial (como o Antigravity, ChatGPT, Claude ou GitHub Copilot) entenda instantaneamente como o sistema funciona e como deve ser modificado sem quebrar as regras de negócio.

---

## 📑 Visão Geral da Versão
- **Versão Atual**: 1.2.0 (I18n Evolution)
- **Status**: Estável / Global SOTA
- **Autor**: Engenharia Sênior (Antigravity AI)

---

## 🏗️ Arquitetura de Software

### Core Stack
- **Framework**: [Next.js](https://nextjs.org/) (App Router, Versão 14+)
- **Linguagem**: JavaScript (ES6+)
- **Estilização**: CSS Vanilla com Variáveis Dinâmicas (Sistema Neon-Glass)
- **Autenticação & Dados**: [Firebase](https://firebase.google.com/) (Auth Google + Firestore)
- **Animações**: Framer Motion
- **Visualização**: Chart.js + React-Chartjs-2

### O Princípio da Dualidade (Pilar Central)
Toda transação financeira neste sistema **DEVE** possuir um atributo `scope`.
1. **Scope: "personal"**: Visível apenas para o `ownerId` (UID do usuário). Nenhum outro membro da família, nem mesmo o administrador, tem acesso de leitura/escrita a este dado.
2. **Scope: "family"**: Visível para todos os membros que possuem o mesmo `familyId` no perfil de usuário.

---

## 💾 Esquema de Dados (Firestore)

### Coleção `users`
- `uid`: Chave primária (UID do Firebase Auth).
- `displayName`, `email`, `photoURL`.
- `familyId`: ID do grupo familiar vinculado.
- `role`: "admin" | "editor" | "viewer".

### Coleção `transactions`
- `id`: Auto-gerado.
- `description`: String.
- `amount`: Number.
- `category`: String (ex: "Carro", "Saúde").
- `scope`: "personal" | "family".
- `ownerId`: UID do criador.
- `createdAt`: Timestamp.

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

### [1.0.0] - 2026-04-21
- Inicialização do projeto com Next.js.
- Implementação do design Neon-Glass (Glassmorphism).
- Criação da lógica de Escopo Duplo (Pessoal/Familiar).
- Integração de Dashboard estilo Power BI.
- Documentação para IA embarcada.

---

> **Nota para a IA**: Ao modificar este projeto, sempre mantenha o nível de qualidade "11/10" exigido pelo usuário. Priorize a privacidade do escopo pessoal acima de tudo.
