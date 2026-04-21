export const locales = {
  'pt-BR': {
    name: 'Português (Brasil)',
    currency: 'BRL',
    symbol: 'R$',
    dashboard: 'Painel de Controle',
    overview: 'Relatório de Impacto',
    balance: 'Saldo Geral',
    expenses: 'Despesas Mês',
    savings: 'Poupança',
    debts: 'Dívidas',
    categories: 'Categorias',
    personal: 'Pessoal',
    family: 'Família',
    newEntry: 'Novo Registro',
    loginMsg: 'O controle financeiro do futuro para você e sua família.'
  },
  'pt-PT': {
    name: 'Português (Portugal)',
    currency: 'EUR',
    symbol: '€',
    dashboard: 'Painel de Controlo',
    overview: 'Relatório de Impacto',
    balance: 'Saldo Geral',
    expenses: 'Gastos Mensais',
    savings: 'Poupança',
    debts: 'Dívidas',
    categories: 'Categorias',
    personal: 'Pessoal',
    family: 'Família',
    newEntry: 'Novo Registo',
    loginMsg: 'O controlo financeiro do futuro para si e para a sua família.'
  },
  'en-US': {
    name: 'English (US)',
    currency: 'USD',
    symbol: '$',
    dashboard: 'Control Panel',
    overview: 'Impact Report',
    balance: 'Total Balance',
    expenses: 'Monthly Expenses',
    savings: 'Savings',
    debts: 'Debts',
    categories: 'Categories',
    personal: 'Personal',
    family: 'Family',
    newEntry: 'New Entry',
    loginMsg: 'The financial control of the future for you and your family.'
  }
};

export const detectLocale = () => {
  if (typeof window === 'undefined') return 'pt-BR';
  const language = navigator.language;
  if (language.startsWith('pt-PT')) return 'pt-PT';
  if (language.startsWith('pt')) return 'pt-BR';
  if (language.startsWith('en')) return 'en-US';
  return 'pt-BR';
};
