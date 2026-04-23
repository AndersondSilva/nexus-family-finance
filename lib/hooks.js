import { useEffect, useRef } from 'react';

/**
 * Hook para detectar ociosidade e executar uma ação.
 * @param {Function} onIdle - Função executada quando o tempo expira.
 * @param {number} timeoutMs - Tempo em milissegundos (padrão 30 minutos).
 */
export function useIdleTimer(onIdle, timeoutMs = 30 * 60 * 1000) {
  const timerRef = useRef(null);

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onIdle();
    }, timeoutMs);
  };

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    const handleActivity = () => resetTimer();

    // Iniciar timer
    resetTimer();

    // Adicionar listeners
    events.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [onIdle, timeoutMs]);
}
