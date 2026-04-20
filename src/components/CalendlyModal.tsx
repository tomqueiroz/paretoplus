import { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { CALENDLY_URL } from '@/lib/index';

// ─── Context ────────────────────────────────────────────────────────────────
interface CalendlyCtx { open: () => void; }
const CalendlyContext = createContext<CalendlyCtx>({ open: () => {} });

export function useCalendly() { return useContext(CalendlyContext); }

// ─── Provider + Modal ────────────────────────────────────────────────────────
export function CalendlyProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CalendlyContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 20000,
              background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(14px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
            }}
            onClick={() => setIsOpen(false)}>
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative', width: '100%', maxWidth: 900,
                height: 'min(85vh, 700px)', borderRadius: 16, overflow: 'hidden',
                border: '1px solid rgba(200,241,53,0.25)',
                boxShadow: '0 0 80px rgba(108,99,255,0.25)',
              }}>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  position: 'absolute', top: 12, right: 12, zIndex: 10,
                  background: 'rgba(11,13,20,0.85)', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 8, color: '#fff', cursor: 'pointer',
                  padding: '6px 12px', fontFamily: "'Inter', sans-serif",
                  fontSize: 13, display: 'flex', alignItems: 'center', gap: 6,
                }}>
                <X size={15} /> Fechar
              </button>
              <iframe
                src={CALENDLY_URL}
                title="Agendar com Especialista Pareto"
                style={{ width: '100%', height: '100%', border: 'none', background: '#fff' }}
                allow="camera; microphone; autoplay; encrypted-media"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </CalendlyContext.Provider>
  );
}

// ─── Drop-in button ──────────────────────────────────────────────────────────
export function CalendlyBtn({
  children, style = {}, className = '',
}: { children: ReactNode; style?: React.CSSProperties; className?: string }) {
  const { open } = useCalendly();
  return (
    <button onClick={open} className={className}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer',
        ...style,
      }}>
      {children}
    </button>
  );
}
