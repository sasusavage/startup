import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

type QuoteContextValue = {
  /** Text the hero's quote card hands to the contact form. */
  prefill: string;
  setPrefill: (value: string) => void;
};

const QuoteContext = createContext<QuoteContextValue>({
  prefill: '',
  setPrefill: () => {},
});

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [prefill, setPrefill] = useState('');
  const value = useMemo(() => ({ prefill, setPrefill }), [prefill]);

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  return useContext(QuoteContext);
}
