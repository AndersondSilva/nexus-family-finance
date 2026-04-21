import { useState, useEffect } from 'react';
import { X, DollarSign, Tag, Users, User, Calendar, FileText, Plus, Minus, Calculator, Wallet, Briefcase, Gift, Umbrella, Clock, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TransactionModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    description: '',
    amount: 0,
    category: '',
    scope: 'family',
    type: 'expense',
    dueDate: '',
    bank: '',
    isRecurring: false,
    details: {
      base: 0,
      vacation: 0,
      bonus13: 0,
      extra: 0,
      discounts: 0
    }
  });

  const [isDetailedIncome, setIsDetailedIncome] = useState(false);

  useEffect(() => {
    if (isDetailedIncome && formData.type === 'income') {
      const total = (Number(formData.details.base) || 0) + 
                    (Number(formData.details.vacation) || 0) + 
                    (Number(formData.details.bonus13) || 0) + 
                    (Number(formData.details.extra) || 0) - 
                    (Number(formData.details.discounts) || 0);
      setFormData(prev => ({ ...prev, amount: total }));
    }
  }, [formData.details, isDetailedIncome, formData.type]);

  const categories = [
    'Salário',
    'Investimentos',
    'Vendas',
    'Carro (Combustível, Pneus, Mecânico, Prestação)',
    'Casa (Internet, Luz, Gás)',
    'Saúde (Remédios)',
    'Alimentação',
    'Roupas',
    'Lazer',
    'Telefone (Individual)',
    'Extras'
  ];

  const banks = [
    { name: 'Nubank', color: '#8a05be' },
    { name: 'Itaú', color: '#ec7000' },
    { name: 'Santander', color: '#cc0000' },
    { name: 'Banco Inter', color: '#ff7a00' },
    { name: 'CGD (Portugal)', color: '#004b95' },
    { name: 'Chase (USA)', color: '#117aca' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="glass w-full max-w-2xl p-8 relative border-white/10 shadow-3xl overflow-y-auto max-h-[90vh]"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-[var(--text-muted)] hover:text-white transition-colors">
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h2 className="text-3xl font-black flex items-center gap-3 font-heading tracking-tighter">
            <div className="p-2 bg-[var(--accent)]/10 rounded-xl">
               <DollarSign className="text-[var(--accent)]" size={24} />
            </div>
            Nova Transação SOTA
          </h2>

          <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
            <button 
              onClick={() => { setFormData({...formData, type: 'expense'}); setIsDetailedIncome(false); }}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${formData.type === 'expense' ? 'bg-[var(--danger)] text-white shadow-glow' : 'text-[var(--text-muted)]'}`}
            >
              Despesa
            </button>
            <button 
              onClick={() => setFormData({...formData, type: 'income'})}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${formData.type === 'income' ? 'bg-[var(--success)] text-white shadow-glow' : 'text-[var(--text-muted)]'}`}
            >
              Receita
            </button>
          </div>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Descrição / Título</label>
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 focus-within:border-[var(--accent)]/30 transition-all">
              <FileText size={18} className="text-[var(--primary)]" />
              <input 
                type="text" 
                placeholder="Ex: Aluguel Mensal ou Recibo de Vencimento"
                className="bg-transparent border-none outline-none w-full font-semibold"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>

          {/* Seção de Receita Detalhada */}
          {formData.type === 'income' && (
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  <Calculator size={18} className="text-[var(--accent)]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">Detalhamento de Proventos (Férias/13º)</span>
                </div>
                <button 
                  type="button"
                  onClick={() => setIsDetailedIncome(!isDetailedIncome)}
                  className={`px-4 py-1 rounded-lg text-[10px] font-black uppercase transition-all ${isDetailedIncome ? 'bg-[var(--accent)] text-black' : 'bg-white/5 text-[var(--text-muted)]'}`}
                >
                  {isDetailedIncome ? 'Ativado' : 'Ativar Detalhes'}
                </button>
              </div>

              <AnimatePresence>
                {isDetailedIncome && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-hidden"
                  >
                    {[
                      { id: 'base', icon: <Briefcase size={14} />, label: 'Salário Base' },
                      { id: 'vacation', icon: <Umbrella size={14} />, label: 'Férias / Subsídio' },
                      { id: 'bonus13', icon: <Gift size={14} />, label: '13º / Natal' },
                      { id: 'extra', icon: <Plus size={14} />, label: 'Horas Extras / Bônus' },
                      { id: 'discounts', icon: <Minus size={14} />, label: 'Descontos / Retenção', color: 'text-[var(--danger)]' }
                    ].map(field => (
                      <div key={field.id} className="space-y-1">
                        <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-2">{field.label}</label>
                        <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/5">
                          <span className={field.color || 'text-white/30'}>{field.icon}</span>
                          <input 
                            type="number" 
                            className="bg-transparent border-none outline-none w-full text-xs font-bold"
                            value={formData.details[field.id]}
                            onChange={(e) => setFormData({...formData, details: {...formData.details, [field.id]: e.target.value}})}
                          />
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Valor Total</label>
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 shadow-glow-inner">
              <Wallet size={18} className={formData.type === 'income' ? 'text-[var(--success)]' : 'text-[var(--danger)]'} />
              <input 
                type="number" 
                readOnly={isDetailedIncome}
                className={`bg-transparent border-none outline-none w-full font-bold text-xl ${isDetailedIncome ? 'opacity-50' : ''}`}
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Data / Vencimento</label>
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
              <Calendar size={18} className="text-[var(--accent)]" />
              <input 
                type="date" 
                className="bg-transparent border-none outline-none w-full text-sm font-semibold text-white color-scheme-dark"
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Categoria</label>
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
              <Tag size={18} className="text-[var(--secondary)]" />
              <select 
                className="bg-transparent border-none outline-none w-full text-sm font-semibold"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="">Selecione...</option>
                {categories.map(cat => <option key={cat} value={cat} className="bg-[#0A0C11]">{cat}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Banco / Carteira</label>
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
              <CreditCard size={18} className="text-[var(--primary)]" />
              <select 
                className="bg-transparent border-none outline-none w-full text-sm font-semibold"
                value={formData.bank}
                onChange={(e) => setFormData({...formData, bank: e.target.value})}
              >
                <option value="">Dinheiro / Outro</option>
                {banks.map(bank => <option key={bank.name} value={bank.name} className="bg-[#0A0C11]">{bank.name}</option>)}
              </select>
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Pilar de Visibilidade</label>
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => setFormData({...formData, scope: 'family'})}
                className={`flex items-center justify-center gap-3 p-4 rounded-2xl border transition-all font-bold text-xs uppercase tracking-widest ${
                  formData.scope === 'family' ? 'bg-white text-black shadow-2xl border-white' : 'bg-white/0 border-white/5 text-[var(--text-muted)] hover:bg-white/5'
                }`}
              >
                <Users size={16} /> Família
              </button>
              <button 
                type="button"
                onClick={() => setFormData({...formData, scope: 'personal'})}
                className={`flex items-center justify-center gap-3 p-4 rounded-2xl border transition-all font-bold text-xs uppercase tracking-widest ${
                  formData.scope === 'personal' ? 'bg-white text-black shadow-2xl border-white' : 'bg-white/0 border-white/5 text-[var(--text-muted)] hover:bg-white/5'
                }`}
              >
                <User size={16} /> Pessoal
              </button>
            </div>
          </div>

          <button 
            type="button"
            onClick={() => onAdd(formData)}
            className={`md:col-span-2 text-white font-black py-5 rounded-2xl shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all mt-4 text-sm uppercase tracking-widest ${formData.type === 'income' ? 'bg-[var(--success)]' : 'bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]'}`}
          >
            Confirmar Operação Soberana
          </button>
        </form>
      </motion.div>
    </div>
  );
}
