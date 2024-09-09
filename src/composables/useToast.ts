import { useToast } from 'primevue/usetoast'

export function useToastNotifications() {
  const toast = useToast()

  const showError = (detail: string = 'An error occurred') => {
    toast.add({
      severity: 'error',
      summary: 'Error Message',
      detail,
      life: 3000
    })
  }

  const showSuccessUpload = (detail: string = 'Image was uploaded') => {
    toast.add({
      severity: 'success',
      summary: 'Success Message',
      detail,
      life: 3000
    })
  }

  const showProfileUpdate = (detail: string = 'Profile was updated') => {
    toast.add({
      severity: 'success',
      summary: 'Success Message',
      detail,
      life: 3000
    })
  }

  const showInfo = (detail: string = 'CV is generating...') => {
    toast.add({
      severity: 'info',
      summary: 'Info Message',
      detail,
      life: 4000
    })
  }

  return {
    showError,
    showSuccessUpload,
    showProfileUpdate,
    showInfo
  }
}
