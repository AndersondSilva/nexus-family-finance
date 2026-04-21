import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { 
  format, addMonths, subMonths, 
  startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, 
  isSameMonth, isSameDay, 
  addDays, eachDayOfInterval 
} from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import { useLocale } from '@/context/LocaleContext';

export default function CalendarView({ user, transactions = [] }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { locale, t, formatCurrency } = useLocale();

  const getDateLocale = () => {
    if (locale === 'en-US') return enUS;
    return ptBR;
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // Mock due dates for demonstration (will be fed with Firestore data later)
  const dueDates = [
    { date: new Date(2026, currentMonth.getMonth(), 5), title: 'Internet', amount: 150, status: 'paid' },
    { date: new Date(2026, currentMonth.getMonth(), 10), title: 'Luz', amount: 320, status: 'pending' },
    { date: new Date(2026, currentMonth.getMonth(), 15), title: 'Aluguel', amount: 2500, status: 'pending' },
    { date: new Date(2026, currentMonth.getMonth(), 20), title: 'Nubank', amount: 1200, status: 'overdue' },
  ];

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-8 px-2">
        <div>
          <h2 className="text-3xl font-black font-heading tracking-tighter uppercase">
            {format(currentMonth, 'MMMM yyyy', { locale: getDateLocale() })}
          </h2>
          <p className="text-[var(--text-muted)] text-xs font-bold tracking-widest uppercase mt-1">Sovereign Timeline</p>
        </div>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="glass-interactive p-3 rounded-xl"><ChevronLeft size={20} /></button>
          <button onClick={nextMonth} className="glass-interactive p-3 rounded-xl"><ChevronRight size={20} /></button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateLocale = getDateLocale();
    const startDate = startOfWeek(startOfMonth(currentMonth), { locale: dateLocale });

    for (let i = 0; i < 7; i++) {
        days.push(
            <div key={i} className="text-center text-[10px] uppercase font-black tracking-widest text-[var(--text-muted)] pb-4">
                {format(addDays(startDate, i), 'eee', { locale: dateLocale })}
            </div>
        );
    }
    return <div className="grid grid-cols-7">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'd');
        const cloneDay = day;
        const dayDueDates = dueDates.filter(d => isSameDay(d.date, cloneDay));

        days.push(
          <div
            key={day}
            className={`relative min-h-[100px] p-2 border border-white/5 transition-all duration-300 ${
              !isSameMonth(day, monthStart) ? 'opacity-20 pointer-events-none' : 'hover:bg-white/5'
            }`}
          >
            <span className={`text-xs font-bold ${isSameDay(day, new Date()) ? 'text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-1 rounded-lg' : 'text-[var(--text-muted)]'}`}>
              {formattedDate}
            </span>
            
            <div className="mt-2 space-y-1">
              {dayDueDates.map((due, idx) => (
                <div 
                  key={idx} 
                  className={`text-[9px] font-bold p-1 rounded border leading-tight ${
                    due.status === 'paid' ? 'bg-[var(--success)]/10 border-[var(--success)]/20 text-[var(--success)]' :
                    due.status === 'overdue' ? 'bg-[var(--danger)]/10 border-[var(--danger)]/20 text-[var(--danger)]' :
                    'bg-[var(--primary)]/10 border-[var(--primary)]/20 text-[var(--primary)]'
                  }`}
                >
                  {due.title}: {formatCurrency(due.amount)}
                </div>
              ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }
    return <div className="glass overflow-hidden rounded-3xl border-white/10">{rows}</div>;
  };

  return (
    <div className="animate-fade-in pb-12">
      {renderHeader()}
      {renderDays()}
      {renderCells()}

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 flex items-center gap-4 border-l-4 border-[var(--success)]">
          <CheckCircle2 className="text-[var(--success)]" size={24} />
          <div>
            <h4 className="text-xs font-black uppercase text-[var(--text-muted)]">Total Pago este Mês</h4>
            <p className="text-2xl font-black font-heading text-white">{formatCurrency(150)}</p>
          </div>
        </div>
        <div className="glass p-6 flex items-center gap-4 border-l-4 border-[var(--primary)]">
          <Clock className="text-[var(--primary)]" size={24} />
          <div>
            <h4 className="text-xs font-black uppercase text-[var(--text-muted)]">Próximos Vencimentos</h4>
            <p className="text-2xl font-black font-heading text-white">{formatCurrency(2820)}</p>
          </div>
        </div>
        <div className="glass p-6 flex items-center gap-4 border-l-4 border-[var(--danger)]">
          <AlertCircle className="text-[var(--danger)]" size={24} />
          <div>
            <h4 className="text-xs font-black uppercase text-[var(--text-muted)]">Vencidos (Ação Necessária)</h4>
            <p className="text-2xl font-black font-heading text-white">{formatCurrency(1200)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
