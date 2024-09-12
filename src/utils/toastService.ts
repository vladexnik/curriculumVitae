import { useToast } from 'primevue/usetoast'

let toastInstance: ReturnType<typeof useToast> | null = null

export function setToastInstance(toast: ReturnType<typeof useToast>) {
  toastInstance = toast
}

type ToastSeverity =
  | 'secondary'
  | 'success'
  | 'info'
  | 'warn'
  | 'error'
  | 'contrast'

export function showToast(
  severity: ToastSeverity,
  summary: string,
  detail: string,
  life = 3000
) {
  if (toastInstance) {
    toastInstance.add({ severity, summary, detail, life })
  } else {
    console.error('Toast instance is not set.')
  }
}
