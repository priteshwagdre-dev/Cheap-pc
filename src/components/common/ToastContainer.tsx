import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl border shadow-2xl backdrop-blur-xl transition-all duration-300 animate-in slide-in-from-bottom-5 ${
              isSuccess
                ? 'bg-dark-card/95 border-emerald-500/40 text-emerald-200 shadow-emerald-950/40'
                : isWarning
                ? 'bg-dark-card/95 border-amber-500/40 text-amber-200 shadow-amber-950/40'
                : 'bg-dark-card/95 border-cyan-500/40 text-cyan-200 shadow-cyan-950/40'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {isSuccess ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : isWarning ? (
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              ) : (
                <Info className="w-5 h-5 text-cyan-400 shrink-0" />
              )}
              <p className="text-xs font-semibold text-slate-100 truncate">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 shrink-0 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
