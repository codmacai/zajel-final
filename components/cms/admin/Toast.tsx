'use client';

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { Check, X } from 'lucide-react';

type Kind = 'ok' | 'error';
const ToastContext = createContext<(message: string, kind?: Kind) => void>(() => {});

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ message: string; kind: Kind; id: number } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const show = useCallback((message: string, kind: Kind = 'ok') => {
    clearTimeout(timer.current);
    setToast({ message, kind, id: Date.now() });
    timer.current = setTimeout(() => setToast(null), kind === 'error' ? 6000 : 3200);
  }, []);
  return (
    <ToastContext.Provider value={show}>
      {children}
      {toast && (
        <div key={toast.id} className={`c-toast${toast.kind === 'error' ? ' err' : ''}`} role={toast.kind === 'error' ? 'alert' : 'status'}>
          <i aria-hidden="true">{toast.kind === 'error' ? <X /> : <Check />}</i>
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}
