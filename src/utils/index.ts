import type { Ref } from 'vue'

export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (e) {
    return null
  }
}

export const capitalizeFullName = (name: string) => {
  return name
    ?.split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(+dateString)
  return date.toDateString()
}

export function showErrorAfterSubmit(
  error: { message: string },
  errorMessage: { email: string; password: string },
  emailField: Ref<HTMLInputElement | null>
): void {
  switch (error.message) {
    case 'Invalid credentials':
      errorMessage.password = 'Invalid email address or password'
      break
    case 'User already exists':
      errorMessage.email = 'User already exists'
      break
    default:
      errorMessage.password =
        "Something's wrong on the server or problems with network. Try again later!"
      break
  }

  emailField.value?.focus()

  setTimeout(() => {
    errorMessage.email = ''
    errorMessage.password = ''
  }, 3000)
}

export function truncateString(str: string): string {
  return str.length > 40 ? str.slice(0, 38) + '...' : str
}

export const formatDateToMonthYear = (dateString: string): string => {
  const date = new Date(dateString)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${month}.${year}`
}
