import type { Ref } from 'vue'

export const REQUIRED_FIELD = 'Required field'
export const INVALID_EMAIL = 'Invalid email address'

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
