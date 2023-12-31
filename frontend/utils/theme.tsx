export function getCurrentTheme(): string {
  if (process.browser) {
    const root = window.document.getElementsByTagName('html')[0]
    return root.getAttribute('data-theme') || 'light'
  }
  return 'light'
}

export function switchTheme() {
  const root = document.getElementsByTagName('html')[0]
  const currentTheme = getCurrentTheme()
  root.setAttribute('data-theme', currentTheme === 'light' ? 'dark' : 'light')
}
