import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, PiggyBank, CreditCard, 
  Plus, Filter, Users, User as UserIcon,
  Activity, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import AIDoc from '@/components/AIDoc';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

export default function DashboardView({ user, onAddClick }) {
  const [scope, setScope] = useState('family'); // 'family' | 'personal'

  const kpis = [
    { title: 'Saldo Geral', value: 'R$ 15.420,00', icon: <TrendingUp />, color: 'var(--primary)', trend: '+12%', up: true },
    { title: 'Despesas Mês', value: 'R$ 4.120,45', icon: <TrendingDown />, color: 'var(--danger)', trend: '-5%', up: false },
    { title: 'Poupança', value: 'R$ 45.000,00', icon: <PiggyBank />, color: 'var(--success)', trend: '+R$ 2k', up: true },
    { title: 'Dívidas', value: 'R$ 2.400,00', icon: <CreditCard />, color: 'var(--warning)', trend: 'Estável', up: true },
  ];

  const lineData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Receitas',
        data: [12000, 15000, 13000, 17000, 14000, 15420],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Despesas',
        data: [8000, 9500, 7000, 11000, 8500, 4120],
        borderColor: '#ff4d4d',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        tension: 0.4,
      }
    ]
  };

  const donutData = {
    labels: ['Carro', 'Casa', 'Alimentação', 'Lazer', 'Saúde'],
    datasets: [{
      data: [35, 25, 20, 10, 10],
      backgroundColor: [
        '#00f2ff',
        '#ff00d6',
        '#adff2f',
        '#3b82f6',
        '#ffaa00',
      ],
      borderWidth: 0,
      hoverOffset: 20
    }]
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with Switch */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Painel de Controle</h1>
          <p className="text-[var(--text-muted)] flex items-center gap-2 mt-1">
            {scope === 'family' ? <Users size={16} /> : <UserIcon size={16} />}
            Visualizando gastos {scope === 'family' ? 'da Família' : 'Pessoais'}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[var(--bg-card)] p-1 rounded-2xl glass">
          <button 
            onClick={() => setScope('family')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${scope === 'family' ? 'bg-[var(--primary)] text-white' : 'text-[var(--text-muted)]'}`}
          >
            <Users size={18} />
            <span className="font-medium text-sm">Família</span>
          </button>
          <button 
            onClick={() => setScope('personal')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${scope === 'personal' ? 'bg-[var(--primary)] text-white' : 'text-[var(--text-muted)]'}`}
          >
            <UserIcon size={18} />
            <span className="font-medium text-sm">Pessoal</span>
          </button>
        </div>
      </header>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -5 }}
            className="glass p-6 relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div 
                className="p-3 rounded-2xl" 
                style={{ backgroundColor: `${kpi.color}15`, color: kpi.color }}
              >
                {kpi.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${kpi.up ? 'text-[var(--success)]' : 'text-[var(--danger)]'}`}>
                {kpi.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {kpi.trend}
              </div>
            </div>
            <p className="text-sm font-medium text-[var(--text-muted)]">{kpi.title}</p>
            <h3 className="text-2xl font-bold mt-1">{kpi.value}</h3>
            
            {/* Soft Glow */}
            <div 
              className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full opacity-10 filter blur-xl"
              style={{ backgroundColor: kpi.color }}
            />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Activity className="text-[var(--primary)]" /> Fluxo de Caixa
            </h2>
            <div className="flex gap-2">
              <button className="glass p-2 text-[var(--text-muted)] hover:text-white"><Filter size={18} /></button>
              <button 
                onClick={onAddClick}
                className="bg-[var(--primary)] text-white p-2 rounded-xl shadow-glow transition-transform active:scale-95"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
          <div className="h-[300px]">
            <Line 
              data={lineData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
                  x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
                }
              }} 
            />
          </div>
        </div>

        {/* Distribution Chart */}
        <div className="glass p-8">
          <h2 className="text-xl font-bold mb-8">Categorias</h2>
          <div className="h-[250px] relative">
            <Doughnut 
              data={donutData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', usePointStyle: true } } },
                cutout: '75%'
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-xs text-[var(--text-muted)]">Total Mensal</p>
              <p className="text-xl font-bold">R$ 5.4k</p>
            </div>
          </div>
        </div>
      </div>

      <AIDoc />
    </div>
  );
}
