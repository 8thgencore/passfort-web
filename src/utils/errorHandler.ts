import { AxiosError } from 'axios'

export function getErrorMessage(error: AxiosError): string {
  if (
    error.response &&
    error.response.data &&
    (error.response.data as { message?: string }).message
  ) {
    return (error.response.data as { message?: string }).message ?? error.message
  } else if (error.message) {
    return error.message
  }
  return 'An unknown error occurred'
}
