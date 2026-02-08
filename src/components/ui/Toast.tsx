import { useEffect } from 'react'
import { X, CheckCircle, AlertCircle } from 'lucide-react'
import type { Toast as ToastType } from '@/hooks/useToast'
import { cn } from '@/lib/utils'

interface ToastProps {
  toasts: ToastType[]
  dismissToast: (id: string) => void
}

export function ToastContainer({ toasts, dismissToast }: ToastProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={() => dismissToast(toast.id)} />
      ))}
    </div>
  )
}

interface SingleToastProps {
  toast: ToastType
  onDismiss: () => void
}

function Toast({ toast, onDismiss }: SingleToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 5000)
    return () => clearTimeout(timer)
  }, [onDismiss])

  const isDestructive = toast.variant === 'destructive'

  return (
    <div
      className={cn(
        'min-w-[300px] max-w-md p-4 rounded-lg shadow-lg border animate-fade-in flex items-start gap-3',
        isDestructive
          ? 'bg-red-50 border-red-200 text-red-900'
          : 'bg-white border-slate-200 text-slate-900'
      )}
    >
      {isDestructive ? (
        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
      ) : (
        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
      )}
      <div className="flex-1">
        <p className="font-semibold text-sm">{toast.title}</p>
        {toast.description && (
          <p className={cn('text-sm mt-1', isDestructive ? 'text-red-700' : 'text-slate-600')}>
            {toast.description}
          </p>
        )}
      </div>
      <button
        onClick={onDismiss}
        className={cn(
          'p-1 rounded hover:bg-slate-100 transition-colors',
          isDestructive && 'hover:bg-red-100'
        )}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
