const { createClient } = require('@supabase/supabase-js');

// O Node.js v20+ suporta --env-file para carregar variáveis do .env automaticamente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Erro: Variáveis de ambiente do Supabase não encontradas.");
  console.error("Certifique-se de rodar com: node --env-file=.env scratch/qa_supabase.js");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function runQA() {
  console.log("🚀 Iniciando QA Soberano - Nexus Finance");
  console.log("URL:", supabaseUrl);

  try {
    // 1. Verificar Conexão e Tabela Profiles
    const { data: profiles, error: pError } = await supabase.from('profiles').select('*').limit(1);
    if (pError) {
      console.error("❌ Erro ao acessar 'profiles':", pError.message);
    } else {
      console.log("✅ Conexão com 'profiles' estabelecida.");
    }

    // 2. Verificar Tabela Invitations (Nova)
    // Nota: Pode falhar se o usuário ainda não rodou o SQL no console do Supabase
    const { data: invites, error: iError } = await supabase.from('invitations').select('*').limit(1);
    if (iError) {
      console.warn("⚠️ Tabela 'invitations' não encontrada ou sem permissão RLS.");
      console.warn("Lembre-se de rodar o SQL em 'lib/schema.sql' no console do Supabase.");
    } else {
      console.log("✅ Tabela 'invitations' detectada e acessível.");
    }

    // 3. Verificar Tabela Transactions
    const { data: trans, error: tError } = await supabase.from('transactions').select('*').limit(1);
    if (tError) {
      console.error("❌ Erro ao acessar 'transactions':", tError.message);
    } else {
      console.log("✅ Tabela 'transactions' detectada.");
    }

    // 4. Verificar Tabela Feedback (Nova)
    const { data: feed, error: fError } = await supabase.from('feedback').select('*').limit(1);
    if (fError) {
      console.error("❌ Erro ao acessar 'feedback':", fError.message);
    } else {
      console.log("✅ Tabela 'feedback' detectada.");
    }

  } catch (err) {
    console.error("❌ Erro inesperado durante o QA:", err.message);
  }

  console.log("\n🏁 QA Finalizado.");
}

runQA();
