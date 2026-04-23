'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { locales, detectLocale } from '@/lib/locales';

const LocaleContext = createContext();

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState('pt-BR');

  useEffect(() => {
    const saved = localStorage.getItem('locale');
    if (saved) {
      setLocale(saved);
    } else {
      setLocale(detectLocale());
    }
  }, []);

  const changeLocale = async (newLocale, userId = null) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    
    if (userId) {
      const { updateUserCurrency } = await import('@/lib/db');
      await updateUserCurrency(userId, newLocale);
    }
  };

  const t = locales[locale] || locales['pt-BR'];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: t.currency
    }).format(value);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale: changeLocale, t, formatCurrency }}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);
