const ERROR_MESSAGES = {
  BAD_REQUEST: 'Unsuccessfull',
  FAILED_FETCH: 'Failed to fetch the data',
  FORBIDDEN: 'Forbidden. You do not have permission to perform this action.',
  NOT_FOUND: 'Not found. The requested resource could not be found.',
  PAYLOAD_TOO_LARGE:
    'Payload too large. The request entity is larger than limits defined by the server.',
  INTERNAL_SERVER_ERROR: 'Internal server error. Please try again later.',
  BAD_GATEWAY:
    'Bad gateway. The server received an invalid response from an upstream server.',
  SERVICE_UNAVAILABLE:
    'Service unavailable. The server is currently unable to handle the request due to temporary overload or maintenance.',
  GATEWAY_TIMEOUT:
    'Gateway timeout. The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.',
  GENERIC_ERROR: 'An error occurred. Please try again.'
}

export function handleError(message: string): string {
  if (message) {
    switch (message) {
      case 'Response not successful: Received status code 400':
        return ERROR_MESSAGES.BAD_REQUEST
      case 'Failed to fetch':
        return ERROR_MESSAGES.FAILED_FETCH
      default:
        return ERROR_MESSAGES.GENERIC_ERROR
    }
  }
  return ERROR_MESSAGES.GENERIC_ERROR
}
