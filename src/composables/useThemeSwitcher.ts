import { ref, onMounted } from 'vue'
import { useTheme } from 'vuetify'

export default function useThemeSwitcher() {
  const theme = useTheme()
  const isDarkTheme = ref(theme.global.current.value.dark)

  const toggleTheme = () => {
    isDarkTheme.value = !isDarkTheme.value
    theme.global.name.value = isDarkTheme.value ? 'dark' : 'light'
    localStorage.setItem('theme', isDarkTheme.value ? 'dark' : 'light')
  }

  const checkSystemTheme = () => {
    if (!localStorage.getItem('theme')) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      theme.global.name.value = prefersDark ? 'dark' : 'light'
      isDarkTheme.value = prefersDark
    }
  }

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      isDarkTheme.value = savedTheme === 'dark'
      theme.global.name.value = isDarkTheme.value ? 'dark' : 'light'
    } else {
      checkSystemTheme()
    }
  })

  return { isDarkTheme, toggleTheme }
}
