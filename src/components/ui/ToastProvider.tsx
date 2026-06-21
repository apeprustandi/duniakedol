"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiAlertTriangle,
  FiInfo,
  FiX,
} from "react-icons/fi";

/* ── Types ────────────────────────────────────────────────── */
type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: {
    success: (msg: string) => void;
    error: (msg: string) => void;
    warning: (msg: string) => void;
    info: (msg: string) => void;
  };
}

/* ── Context ──────────────────────────────────────────────── */
const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx.toast;
}

/* ── Provider ─────────────────────────────────────────────── */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (msg: string) => addToast(msg, "success"),
    error: (msg: string) => addToast(msg, "error"),
    warning: (msg: string) => addToast(msg, "warning"),
    info: (msg: string) => addToast(msg, "info"),
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <Toaster toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

/* ── Toaster UI ───────────────────────────────────────────── */
const TOAST_CONFIG: Record<
  ToastType,
  { Icon: React.ElementType; border: string; iconColor: string; bar: string }
> = {
  success: {
    Icon: FiCheckCircle,
    border: "border-[#00ff88]/40",
    iconColor: "text-[#00ff88]",
    bar: "bg-[#00ff88]",
  },
  error: {
    Icon: FiAlertCircle,
    border: "border-red-500/50",
    iconColor: "text-red-400",
    bar: "bg-red-500",
  },
  warning: {
    Icon: FiAlertTriangle,
    border: "border-yellow-500/50",
    iconColor: "text-yellow-400",
    bar: "bg-yellow-500",
  },
  info: {
    Icon: FiInfo,
    border: "border-blue-500/50",
    iconColor: "text-blue-400",
    bar: "bg-blue-500",
  },
};

function Toaster({
  toasts,
  onRemove,
}: {
  toasts: Toast[];
  onRemove: (id: string) => void;
}) {
  if (toasts.length === 0) return null;
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
      {toasts.map((t) => {
        const { Icon, border, iconColor, bar } = TOAST_CONFIG[t.type];
        return (
          <div
            key={t.id}
            className={`toast-enter pointer-events-auto flex items-start gap-3 min-w-[300px] max-w-[400px] bg-[#1a1f1a] border ${border} px-4 py-3 font-mono text-xs shadow-xl`}
          >
            {/* Left accent bar */}
            <div className={`absolute left-0 top-0 h-full w-0.5 ${bar}`} />
            <Icon className={`shrink-0 mt-0.5 text-base ${iconColor}`} />
            <p className="flex-1 text-[#f5f5f5] leading-relaxed">{t.message}</p>
            <button
              onClick={() => onRemove(t.id)}
              className="shrink-0 text-[#52525b] hover:text-[#f5f5f5] transition-colors"
              aria-label="Tutup notifikasi"
            >
              <FiX />
            </button>
          </div>
        );
      })}
    </div>
  );
}
