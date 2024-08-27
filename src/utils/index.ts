export const parseJwt = (token) => {
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
