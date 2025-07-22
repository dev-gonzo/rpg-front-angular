export class ThemeService {
  setTheme(theme: 'light' | 'dark') {
    document.documentElement.setAttribute('data-theme', theme);
  }
}