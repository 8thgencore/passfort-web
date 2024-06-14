import { useNotification } from '@kyvg/vue3-notification'

const { notify } = useNotification()

export const showSuccessNotification = (title: string, text: string) => {
  notify({ type: 'success', title, text })
}

export const showErrorNotification = (title: string, text: string) => {
  notify({ type: 'error', title, text })
}
