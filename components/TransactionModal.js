import { useState } from 'react';
import { X, DollarSign, Tag, Users, User, Calendar, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TransactionModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    scope: 'family',
    type: 'expense',
    dueDate: '',
    bank: '',
    isRecurring: false
  });

  const categories = [
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
        className="glass w-full max-w-xl p-8 relative border-white/10 shadow-3xl overflow-y-auto max-h-[90vh]"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-[var(--text-muted)] hover:text-white transition-colors">
          <X size={24} />
        </button>

        <h2 className="text-3xl font-black mb-8 flex items-center gap-3 font-heading tracking-tighter">
          <div className="p-2 bg-[var(--accent)]/10 rounded-xl">
             <DollarSign className="text-[var(--accent)]" size={24} />
          </div>
          Novo Lançamento SOTA
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">O que foi comprado?</label>
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 focus-within:border-[var(--accent)]/30 transition-all">
              <FileText size={18} className="text-[var(--primary)]" />
              <input 
                type="text" 
                placeholder="Ex: Fatura Telefone Abril"
                className="bg-transparent border-none outline-none w-full font-semibold"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Valor</label>
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
              <span className="font-bold text-[var(--success)]">R$</span>
              <input 
                type="number" 
                placeholder="0,00"
                className="bg-transparent border-none outline-none w-full font-bold text-xl"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Data de Vencimento</label>
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
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Banco / Cartão</label>
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

          <div className="md:col-span-2 flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
             <div className="flex items-center gap-3">
               <Clock size={18} className="text-[var(--warning)]" />
               <span className="text-xs font-bold text-white uppercase tracking-wider">Conta Recorrente (Mensal)</span>
             </div>
             <input 
                type="checkbox" 
                className="w-5 h-5 accent-[var(--accent)]"
                checked={formData.isRecurring}
                onChange={(e) => setFormData({...formData, isRecurring: e.target.checked})}
             />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Visibilidade</label>
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => setFormData({...formData, scope: 'family'})}
                className={`flex items-center justify-center gap-3 p-4 rounded-2xl border transition-all font-bold text-xs uppercase tracking-widest ${
                  formData.scope === 'family' 
                  ? 'bg-white text-black shadow-2xl border-white' 
                  : 'bg-white/0 border-white/5 text-[var(--text-muted)] hover:bg-white/5'
                }`}
              >
                <Users size={16} /> Família
              </button>
              <button 
                type="button"
                onClick={() => setFormData({...formData, scope: 'personal'})}
                className={`flex items-center justify-center gap-3 p-4 rounded-2xl border transition-all font-bold text-xs uppercase tracking-widest ${
                  formData.scope === 'personal' 
                  ? 'bg-white text-black shadow-2xl border-white' 
                  : 'bg-white/0 border-white/5 text-[var(--text-muted)] hover:bg-white/5'
                }`}
              >
                <User size={16} /> Pessoal
              </button>
            </div>
          </div>

          <button 
            type="button"
            onClick={() => onAdd(formData)}
            className="md:col-span-2 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-black py-5 rounded-2xl shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all mt-4 text-sm uppercase tracking-widest"
          >
            Confirmar Lançamento SOTA
          </button>
        </form>
      </motion.div>
    </div>
  );
}
