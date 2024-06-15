import { AxiosError } from 'axios'

export function getErrorMessage(error: AxiosError): string {
  if (
    error.response &&
    error.response.data &&
    (error.response.data as { messages?: string[] }).messages
  ) {
    const messages = (error.response.data as { messages?: string[] }).messages
    return messages && messages.length > 0 ? messages[0] : 'An unknown error occurred'
  } else if (error.message) {
    return error.message
  }
  return 'An unknown error occurred'
}
