# Protocolo de Tratamento de Erros Soberano | Nexus Finance

Este documento serve como diretriz para identificar, antecipar e remediar erros técnicos, transformando falhas em aprendizado para o ecossistema Julius.

## 1. O Erro de "Missing Initial State" (Firebase Legacy)

### Sintoma
O usuário clica em um link de login/convite e recebe: `Unable to process request due to missing initial state. This may happen if browser sessionStorage is inaccessible...`

### Causa Raiz
*   **Storage Partitioning**: Navegadores modernos (Chrome, Safari) bloqueiam o acesso ao `sessionStorage` em contextos cross-site para evitar rastreamento.
*   **Redirect vs Popup**: O método `signInWithRedirect` do Firebase depende de cookies de terceiros para manter o estado entre o redirecionamento do IDP (Google) e o retorno ao app.

### Prevenção Soberana
1.  **Unificação de Provedor**: Migramos para **Supabase Auth** que utiliza fluxos PKCE mais resilientes e não depende de cookies de terceiros da mesma forma que o Firebase legatário.
2.  **Abandono de Fallbacks**: Removemos inicializações do Firebase para evitar que o SDK tente recuperar estados fantasmas no carregamento da página.

## 2. Diretrizes Gerais de Antecipação

> [!TIP]
> **Antecipe o Vácuo**: Sempre assuma que o `localStorage` ou `sessionStorage` pode ser limpo pelo usuário ou bloqueado pelo navegador (Modo Incógnito).

*   **Validação de Estado Inicial**: Antes de processar um convite, verifique se a sessão de usuário está ativa e se o `family_id` no banco condiz com o estado esperado.
*   **Fail Fast, Explain Well**: Se uma transação falhar, não mostre apenas "Erro". Explique se é conexão, permissão (RLS) ou dados duplicados.
*   **Idempotência**: Operações sensíveis (como aceitar convite) devem ser seguras para serem repetidas caso o usuário atualize a página no meio do processo.

## 3. Fluxo de Aprendizado Contínuo

Toda vez que um erro novo for detectado:
1.  **Isolamento**: Identificar se é erro de *Cliente* (browser), *API* (Network) ou *Banco* (RLS/Schema).
2.  **Ingestão no DNA**: Atualizar o arquivo `SYSTEM_DNA.md` ou este guia com a lição aprendida.
3.  **Correção Estrutural**: Priorizar mudanças na arquitetura (ex: migrar para Supabase) em vez de "remendos" rápidos.

## 4. Checklist para Novos Agentes (QA)

- [ ] Testar fluxos em **Modo Incógnito**.
- [ ] Testar com **Cookies de Terceiros bloqueados**.
- [ ] Verificar se há logs claros no Console em caso de falha de RLS.
- [ ] Garantir que o botão de "Zerar Conta" peça confirmação dupla.
