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
    loginMsg: 'O controle financeiro do futuro para você e sua família.',
    dueDate: 'Vencimento',
    paymentStatus: 'Status de Pagamento',
    pending: 'Pendente',
    paid: 'Pago',
    overdue: 'Atrasado',
    annualProjection: 'Projeção Anual',
    futureEstimate: 'Estimativa Futura',
    availableLimit: 'Limite Disponível',
    savingsTips: 'Dicas de Economia',
    banks: {
      nubank: 'Nubank',
      itau: 'Itaú',
      santander: 'Santander',
      bradesco: 'Bradesco',
      bb: 'Banco do Brasil',
      inter: 'Banco Inter',
      cgd: 'CGD (Portugal)',
      chase: 'Chase (USA)',
      boa: 'Bank of America'
    }
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
    loginMsg: 'O controlo financeiro do futuro para si e para a sua família.',
    dueDate: 'Vencimento',
    paymentStatus: 'Estado de Pagamento',
    pending: 'Pendente',
    paid: 'Pago',
    overdue: 'Atrasado',
    annualProjection: 'Projeção Anual',
    futureEstimate: 'Estimativa Futura',
    availableLimit: 'Limite Disponível',
    savingsTips: 'Dicas de Poupança',
    banks: {
      santander: 'Santander PT',
      cgd: 'Caixa Geral de Depósitos',
      bpi: 'BPI',
      novobanco: 'Novo Banco',
      activo: 'ActivoBank'
    }
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
    loginMsg: 'The financial control of the future for you and your family.',
    dueDate: 'Due Date',
    paymentStatus: 'Payment Status',
    pending: 'Pending',
    paid: 'Paid',
    overdue: 'Overdue',
    annualProjection: 'Annual Projection',
    futureEstimate: 'Future Estimate',
    availableLimit: 'Available Limit',
    savingsTips: 'Saving Tips',
    banks: {
      chase: 'Chase',
      boa: 'Bank of America',
      wellsfargo: 'Wells Fargo',
      amex: 'American Express',
      citi: 'Citibank'
    }
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
